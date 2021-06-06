import { promises as fs } from 'fs'
import paths from 'path'
import { Home } from '../template/home'
import { resizeImage } from './image'
import { Article } from '../template/article'
import { IGraph } from '../types'
import { withProgress } from '../reporter'
import { Directory } from '../graph/util'
import { List } from '../template/list'

interface Args {
    graph: IGraph
    dist: Directory
}

export async function exportAll({ graph, dist }: Args) {
    await withProgress('Clear and recreate output folders', async () => {
        await dist.deleteAllDescendants()
        dist.subdirectory('blog').createIfMissing()
        dist.subdirectory('tag').createIfMissing()
    })

    await withProgress('Copying public files verbatim', async (progress) => {
        for (const file of graph.public) {
            progress(graph.public.length)
            const destinationFile = paths.join(
                dist.path,
                paths.basename(file.originalPath)
            )
            await fs.copyFile(file.originalPath, destinationFile)
        }
    })

    await withProgress('Export home page', async () => {
        await dist
            .file('index.html')
            .writeContent(
                Home({ articles: graph.articles, about: graph.about })
            )
    })

    await withProgress('Export lists', async (progress) => {
        await dist.file('blog', 'index.html').writeContent(
            List({
                articles: graph.articles,
                about: graph.about,
            })
        )

        for (const tag of graph.tags) {
            progress(graph.tags.length)
            await dist.file('tag', `${tag.key}.html`).writeContent(
                List({
                    articles: graph.articles,
                    about: graph.about,
                    tag,
                })
            )
        }
    })

    await withProgress('Export articles', async (progress) => {
        for (const article of graph.articles) {
            progress(graph.articles.length)

            const articleFolder = await dist
                .subdirectory('blog', article.id)
                .createIfMissing()

            await articleFolder
                .file(`${article.slug}.html`)
                .writeContent(Article({ article, about: graph.about }))
        }
    })

    await withProgress('Export optimized images', async (progress) => {
        for await (const image of graph.images) {
            progress(graph.images.length)
            await resizeImage({ image, dist })
        }
    })
}

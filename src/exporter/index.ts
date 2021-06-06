import { promises as fs } from 'fs'
import paths from 'path'
import { Home } from '../template/home'
import { resizeImage } from './image'
import { Article } from '../template/article'
import { IGraph } from '../types'
import { elapsed, reportProgress } from './util'
import { Directory, File } from '../graph/util'
import { performance } from 'perf_hooks'
import { List } from '../template/list'

export async function exportAll(graph: IGraph, dist: Directory) {
    const startTime = performance.now()

    await reportProgress('Clear output folders', async () => {
        await fs.rmdir(dist.path, { recursive: true })
        await fs.mkdir(dist.path, { recursive: true })
    })

    await reportProgress('Copying public files verbatim', async (progress) => {
        for (const file of graph.public) {
            progress(graph.public.length)
            const destinationFile = paths.join(
                dist.path,
                paths.basename(file.originalPath)
            )
            await fs.copyFile(file.originalPath, destinationFile)
        }
    })

    await reportProgress('Export home page', async () => {
        await new File(dist.path, 'index.html').writeContent(
            Home({ articles: graph.articles, about: graph.about })
        )
    })

    await reportProgress('Export lists', async () => {
        await new File(dist.path, `/tag/index.html`).writeContent(
            List({
                articles: graph.articles,
                about: graph.about,
            })
        )

        for (const tag of graph.tags) {
            await new File(dist.path, `/tag/${tag.key}.html`).writeContent(
                List({
                    articles: graph.articles,
                    about: graph.about,
                    tag,
                })
            )
        }
    })

    await reportProgress('Export articles', async (progress) => {
        for (const article of graph.articles) {
            progress(graph.articles.length)

            await fs.mkdir(paths.join(dist.path, 'blog', article.id), {
                recursive: true,
            })

            await new File(
                dist.path,
                'blog',
                article.id,
                `${article.slug}.html`
            ).writeContent(Article({ article, about: graph.about }))
        }
    })

    await reportProgress('Export optimized images', async (progress) => {
        for await (const image of graph.images) {
            progress(graph.images.length)
            await resizeImage(image, dist.path)
        }
    })

    console.log(`🎉 Exported successfully in ${elapsed(startTime)}`)
}

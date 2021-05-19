import { promises as fs } from 'fs'
import paths from 'path'
import { Home } from '../template/home'
import { resizeImage } from './image'
import { Article } from '../template/article'
import { IGraph } from '../types'
import { DRY_RUN, reportProgress } from './util'
import { Directory } from '../graph/util'

export async function exportAll(graph: IGraph, dist: Directory) {
    await reportProgress('Clear output folders', async () => {
        if (!DRY_RUN) {
            await fs.rmdir(dist.path, { recursive: true })
            await fs.mkdir(dist.path)
        }
    })

    await reportProgress('Copying public files verbatim', async (progress) => {
        for (const file of graph.public) {
            progress(graph.public.length)
            const destinationFile = paths.join(
                dist.path,
                paths.basename(file.originalPath)
            )
            !DRY_RUN && (await fs.copyFile(file.originalPath, destinationFile))
        }
    })

    await reportProgress('Export home page', async () => {
        const homeHtml = Home({ articles: graph.articles })
        const outputFile = paths.join(dist.path, 'index.html')
        !DRY_RUN && (await fs.writeFile(outputFile, homeHtml))
    })

    // export each article
    await reportProgress('Export articles', async (progress) => {
        for (const article of graph.articles) {
            progress(graph.articles.length)

            if (!DRY_RUN) {
                await fs.mkdir(paths.join(dist.path, 'blog', article.id), {
                    recursive: true,
                })
            }

            const articleHtml = Article(article)
            const outputFile = paths.join(
                dist.path,
                'blog',
                article.id,
                `${article.slug}.html`
            )

            !DRY_RUN && (await fs.writeFile(outputFile, articleHtml))
        }
    })

    await reportProgress('Export optimized images', async (progress) => {
        for await (const image of graph.images) {
            progress(graph.images.length)
            !DRY_RUN &&
                (await resizeImage(image, dist.path, !!process.env.SKIP_IMAGES))
        }
    })

    console.log('🎉 Export Complete!')
}

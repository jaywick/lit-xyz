import { promises as fs } from 'fs'
import paths from 'path'
import { Home } from '../template/home'
import { resizeImage } from './image'
import { Article } from '../template/article'
import { IGraph } from '../types'
import { elapsed, reportProgress } from './util'
import { Directory, File } from '../graph/util'
import { performance } from 'perf_hooks'

export async function exportAll(graph: IGraph, dist: Directory) {
    const startTime = performance.now()

    await reportProgress('Clear output folders', async () => {
        if (!global.args.dryRun) {
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
            !global.args.dryRun &&
                (await fs.copyFile(file.originalPath, destinationFile))
        }
    })

    await reportProgress('Export home page', async () => {
        const homeHtml = Home({ articles: graph.articles, about: graph.about })
        const outputFile = paths.join(dist.path, 'index.html')
        !global.args.dryRun && (await fs.writeFile(outputFile, homeHtml))
    })

    await reportProgress('Export articles', async (progress) => {
        for (const article of graph.articles) {
            progress(graph.articles.length)

            if (!global.args.dryRun) {
                await fs.mkdir(paths.join(dist.path, 'blog', article.id), {
                    recursive: true,
                })
            }

            const articleHtml = Article({ article, about: graph.about })
            const outputFile = new File(
                dist.path,
                'blog',
                article.id,
                `${article.slug}.html`
            )

            !global.args.dryRun && (await outputFile.writeContent(articleHtml))
        }
    })

    await reportProgress('Export optimized images', async (progress) => {
        for await (const image of graph.images) {
            progress(graph.images.length)
            !global.args.dryRun && (await resizeImage(image, dist.path))
        }
    })

    // if (didFail) {f
    //     console.warn(`⚠️ Export complete with failures ${elapsed(startTime)}`)
    //     return
    // }

    console.log(`🎉 Exported successfully in ${elapsed(startTime)}`)
}

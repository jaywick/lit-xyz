import { promises as fs } from 'fs'
import paths from 'path'
import { IGraph } from './graph'
import { Home } from './home'
import { resizeImage } from './image'
import { Page } from './page'
import ora, { Ora } from 'ora'
import { performance } from 'perf_hooks'

export async function exportData(graph: IGraph) {
    const outputFolder = paths.resolve(__dirname, '../dist')

    await reportProgress('Clear output folders', async () => {
        await fs.rmdir(outputFolder, { recursive: true })
        await fs.mkdir(outputFolder)
    })

    await reportProgress('Copying public files verbatim', async (progress) => {
        const publicFolder = paths.resolve(__dirname, '../public')
        const publicFiles = await fs.readdir(publicFolder)
        for (const file of publicFiles) {
            progress(publicFiles.length)
            const sourceFile = paths.join(publicFolder, file)
            const destinationFile = paths.join(
                outputFolder,
                paths.basename(file)
            )
            fs.copyFile(sourceFile, destinationFile)
        }
    })

    await reportProgress('Export home page', async () => {
        const homeHtml = Home({ articles: graph.articles })
        const outputFile = paths.join(outputFolder, 'index.html')
        await fs.writeFile(outputFile, homeHtml)
    })

    // export each article
    await reportProgress('Export articles', async (progress) => {
        for (const article of graph.articles) {
            progress(graph.articles.length)
            await fs.mkdir(paths.join(outputFolder, 'blog', article.id), {
                recursive: true,
            })

            const articleHtml = Page(article)
            const outputFile = paths.join(
                outputFolder,
                'blog',
                article.id,
                `${article.slug}.html`
            )
            await fs.writeFile(outputFile, articleHtml)
        }
    })

    // export each image
    await reportProgress('Export optimized images', async (progress) => {
        for await (const image of graph.images) {
            progress(graph.images.length)
            await resizeImage(image, !!process.env.SKIP_IMAGES)
        }
    })

    console.log('🎉 Export successful!')
}

async function reportProgress(
    title: string,
    work: (progress: (total: number) => void) => void | Promise<void>
) {
    const reporter = ora(title)
    const startTime = performance.now()
    reporter.start(title)

    try {
        let progressReporter: Ora
        let i = 0
        const progressFn = (total: number) => {
            if (!progressReporter) {
                progressReporter = ora(title)
                progressReporter.prefixText = ' '
                progressReporter.start()
            }

            progressReporter.text = `${Math.round((i / total) * 100)}%`
            ++i
        }
        await Promise.resolve(work(progressFn))
        // @ts-ignore
        progressReporter?.stop()
    } catch (err) {
        console.error(err)
        reporter.fail(`${title} (${elapsed(startTime)}ms)`)
        return
    }

    reporter.succeed(`${title} (${elapsed(startTime)}ms)`)
}

function elapsed(startTime: number) {
    return Math.round(performance.now() - startTime)
}

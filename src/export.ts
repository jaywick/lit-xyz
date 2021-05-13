import { promises as fs } from 'fs'
import paths from 'path'
import { IGraph } from './graph'
import { Home } from './home'
import { Page } from './page'

export async function exportData(graph: IGraph) {
    // clear output folder
    const outputFolder = paths.resolve(__dirname, '../dist')
    await fs.rmdir(outputFolder, { recursive: true })
    await fs.mkdir(outputFolder)

    // copy public files verbatim
    const publicFolder = paths.resolve(__dirname, '../public')
    const publicFiles = await fs.readdir(publicFolder)
    for (const file of publicFiles) {
        const sourceFile = paths.join(publicFolder, file)
        const destinationFile = paths.join(outputFolder, paths.basename(file))
        fs.copyFile(sourceFile, destinationFile)
    }

    // export home page
    const homeHtml = Home({ articles: graph.articles })
    const outputFile = paths.join(outputFolder, 'index.html')
    await fs.writeFile(outputFile, homeHtml)

    // export each article
    for (const article of graph.articles) {
        await fs.mkdir(paths.join(outputFolder, 'blog', article.id), {
            recursive: true,
        })

        const articleHtml = Page(article)
        const outputFile = paths.join(
            outputFolder,
            'blog',
            article.id,
            'index.html'
        )
        await fs.writeFile(outputFile, articleHtml)
    }

    // export each image
    for (const image of graph.images) {
        const outputFile = paths.join(
            outputFolder,
            'blog',
            paths.basename(paths.dirname(image.originalPath)),
            paths.basename(image.originalPath)
        )
        await fs.copyFile(image.originalPath, outputFile)
    }
}

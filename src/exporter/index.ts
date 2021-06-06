import { promises as fs } from 'fs'
import paths from 'path'
import { Home } from '../template/home'
import { resizeImage } from './image'
import { Article } from '../template/article'
import { List } from '../template/list'
import { IContext } from '..'
import Listr, { ListrTask } from 'listr'

export async function exportAll(context: IContext) {
    const {
        graph,
        filesystem: { dist },
        args: { skipExport },
    } = context

    return new Listr<IContext>([
        {
            title: 'Clear and recreate output folders',
            task: async () => {
                await dist.deleteAllDescendants()
                dist.subdirectory('blog').createIfMissing()
                dist.subdirectory('tag').createIfMissing()
            },
        },
        {
            title: 'Copying public files verbatim',
            task: async () => {
                for (const file of graph.public) {
                    const destinationFile = paths.join(
                        dist.path,
                        paths.basename(file.originalPath)
                    )
                    await fs.copyFile(file.originalPath, destinationFile)
                }
            },
        },
        {
            title: 'Export home page',
            task: async () => {
                await dist
                    .file('index.html')
                    .writeContent(
                        Home({ articles: graph.articles, about: graph.about })
                    )
            },
        },
        {
            title: 'Export lists',
            task: async () => {
                await dist.file('blog', 'index.html').writeContent(
                    List({
                        articles: graph.articles,
                        about: graph.about,
                    })
                )

                for (const tag of graph.tags) {
                    await dist.file('tag', `${tag.key}.html`).writeContent(
                        List({
                            articles: graph.articles,
                            about: graph.about,
                            tag,
                        })
                    )
                }
            },
        },
        {
            title: 'Export articles',
            task: async () => {
                for (const article of graph.articles) {
                    const articleFolder = await dist
                        .subdirectory('blog', article.id)
                        .createIfMissing()

                    await articleFolder
                        .file(`${article.slug}.html`)
                        .writeContent(Article({ article, about: graph.about }))
                }
            },
        },
        {
            title: 'Export optimized images',
            task: async ({ args }) => {
                for await (const image of graph.images) {
                    await resizeImage({
                        image,
                        dist,
                        skipResize: args.skipImages,
                    })
                }
            },
        },
    ])
}

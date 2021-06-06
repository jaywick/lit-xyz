import { Header } from './components/header'
import { IAbout, IArticle, ITag } from '../types'
import { byDateDescSorter, html } from './utils'
import { Footer } from './components/footer'
import { Head } from './components/head'

interface ListArgs {
    articles: IArticle[]
    about: IAbout
    tag?: ITag
}

const AllArticles: ITag = {
    aliases: [],
    hero: '',
    key: '',
    name: 'All Articles',
    story: 'All blog posts',
    urls: [],
}

export const List = ({ articles, about, tag = AllArticles }: ListArgs) => {
    return html`<!DOCTYPE html>
        <html lang="en">
            ${Head({
                title: `Jay Wick | ${tag.name}`,
                description: tag.story,
                themeColor: about.themeColor,
            })}
            <body>
                ${Header()}
                <main>
                    <section>
                        <h2>${tag.name}</h2>
                        <ul>
                            ${articles.sort(byDateDescSorter).map(
                                ({ id, title, url }) => html`
                                    <li key="${id}">
                                        <a href="${url}">${title} </a>
                                    </li>
                                `
                            )}
                        </ul>
                    </section>
                </main>
                ${Footer({ author: about.author })}
            </body>
        </html>`
}

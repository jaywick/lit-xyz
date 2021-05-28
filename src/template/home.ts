import { Footer, Head, Header } from './components'
import { IAbout, IArticle } from '../types'
import { byDateDescSorter, html } from './utils'

interface HomeArgs {
    articles: IArticle[]
    about: IAbout
}

export const Home = ({ articles, about }: HomeArgs) => html`<!DOCTYPE html>
    <html lang="en">
        ${Head({
            title: 'Jay Wick',
            description: about.description,
            themeColor: about.themeColor,
        })}
        <body>
            ${Header()}
            <main>
                <section>
                    <h1 class="title">${about.title}</h1>
                    <p class="tagline">${about.tagline}</p>
                </section>
                <section>
                    <h2>Blog Posts</h2>
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

import { Footer, Head, Header } from './components'
import { IArticle } from '../types'
import { html } from './utils'

interface HomeArgs {
    articles: IArticle[]
}

export const Home = ({ articles }: HomeArgs) => html`<!DOCTYPE html>
    <html lang="en">
        ${Head({ title: 'Jay Wick' })}
        <body>
            ${Header()}
            <main>
                <section>
                    <h1 class="title">Jay Wick</h1>
                    <p class="tagline">
                        UX developer, amateur designer, and technology
                        apologist. This is my blog and portfolio.
                    </p>
                </section>
                <section>
                    <h2>Blog Posts</h2>
                    <ul>
                        ${articles.sort(byDateDesc).map(
                            ({ id, title, url }) => html`
                                <li key="${id}">
                                    <a href="${url}">${title} </a>
                                </li>
                            `
                        )}
                    </ul>
                </section>
            </main>
            ${Footer()}
        </body>
    </html>`

const byDateDesc = (a: IArticle, b: IArticle) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()

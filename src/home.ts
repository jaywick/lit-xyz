import { Footer, Head, Header } from './components'
import { html } from './render'

interface HomeArgs {
    articles: {
        id: string
        title: string
        author: string
        date: string
        readTime: number
        htmlContent: string
        slug: string
        heroAlt: string
        heroStaticPath: string
        tag: string
    }[]
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
                        ${articles.map(
                            ({ id, slug, title }) => html`
                                <li key="${id}">
                                    <a href="${`/blog/${id}/${slug}`}">
                                        ${title}
                                    </a>
                                </li>
                            `
                        )}
                    </ul>
                </section>
            </main>
            ${Footer()}
        </body>
    </html>`

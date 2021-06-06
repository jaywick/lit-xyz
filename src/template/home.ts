import { Header } from './components/header'
import { IAbout, IArticle } from '../types'
import { byDateDescSorter, html } from './utils'
import { Footer } from './components/footer'
import { Head } from './components/head'

interface HomeArgs {
    articles: IArticle[]
    about: IAbout
}

export const Home = ({ articles, about }: HomeArgs) => {
    const projectArticles = articles.filter((a) =>
        [
            'vizr',
            'feeds',
            'kalq',
            'jaywick-xyz',
            'its-time',
            'blackstorm-alpha',
            'car-pc',
            'opencity',
            'other-projects',
            'university',
        ].includes(a.tag)
    )

    const lifeArticles = articles.filter((a) =>
        ['opinion', 'life', 'pro-tip', 'gadgets'].includes(a.tag)
    )

    return html`<!DOCTYPE html>
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
                        <h2>Recent Posts</h2>
                        <ul>
                            ${lifeArticles.sort(byDateDescSorter).map(
                                ({ id, title, url }) => html`
                                    <li key="${id}">
                                        <a href="${url}">${title} </a>
                                    </li>
                                `
                            )}
                        </ul>
                    </section>
                    <section>
                        <h2>Projects</h2>
                        <ul>
                            ${projectArticles.sort(byDateDescSorter).map(
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

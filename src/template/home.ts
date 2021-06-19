import { Header } from './components/header'
import { IAbout, IArticle, ITag } from '../types'
import { byDateDescSorter, html } from './utils'
import { Footer } from './components/footer'
import { Head } from './components/head'
import { Card } from './components/card'

interface HomeArgs {
    articles: IArticle[]
    about: IAbout
    tags: ITag[]
}

export const Home = ({ articles, about, tags }: HomeArgs) => {
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
                        <ul class="card-grid">
                            ${articles
                                .sort(byDateDescSorter)
                                .slice(0, 9)
                                .map(
                                    ({
                                        title,
                                        readableDate,
                                        heroUrl,
                                        readTime,
                                        url,
                                    }) =>
                                        Card({
                                            title,
                                            url,
                                            subtitle: [
                                                readableDate,
                                                `${readTime} min read`,
                                            ],
                                            heroUrl,
                                        })
                                )}
                        </ul>
                    </section>
                    <section>
                        <h2>Projects</h2>
                        <ul class="card-grid">
                            ${tags.slice(0, 9).map(({ heroUrl, name, url }) =>
                                Card({
                                    title: name,
                                    url,
                                    heroUrl,
                                })
                            )}
                        </ul>
                    </section>
                </main>
                ${Footer({ author: about.author })}
            </body>
        </html>`
}

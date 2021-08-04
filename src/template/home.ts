import { Header } from './components/header'
import { IAbout, IArticle, ITag } from '../types'
import { byDateDescSorter, html } from './utils'
import { Footer } from './components/footer'
import { Head } from './components/head'
import { Card } from './components/card'
import { Chip } from './components/chip'

interface HomeArgs {
    articles: IArticle[]
    about: IAbout
    tags: ITag[]
}

export const Home = ({ articles, about, tags }: HomeArgs) => {
    return html`<!DOCTYPE html>
        <html lang="en">
            ${Head({
                title: about.title,
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
                        <h2>Articles</h2>
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
                        <ul class="chip-grid">
                            ${tags.slice(0, 9).map(({ heroUrl, name, url }) =>
                                Chip({
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

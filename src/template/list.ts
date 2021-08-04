import { Header } from './components/header'
import { IAbout, IArticle, IImage, ITag } from '../types'
import { byDateDescSorter, html } from './utils'
import { Footer } from './components/footer'
import { Head } from './components/head'
import { Card } from './components/card'
import { Series } from './components/series'

interface ListArgs {
    articles: IArticle[]
    about: IAbout
    tag?: ITag
    images: IImage[]
}

const allArticles: ITag = {
    name: 'Articles',
    aliases: [],
    hero: '',
    heroUrl: '',
    key: '',
    story: 'All blog posts',
    url: '',
    urls: [],
}

export const List = ({ articles, about, tag = allArticles }: ListArgs) => {
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
                    ${Series({ tag, related: [] })}
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
                </main>
                ${Footer({ author: about.author })}
            </body>
        </html>`
}

import { Header } from './components/header'
import { IAbout, IArticle, IImage, ITag } from '../types'
import { html } from './utils'
import { Footer } from './components/footer'
import { Head } from './components/head'
import { Series } from './components/series'
import { Hero } from './components/hero'

interface ListArgs {
    articles: IArticle[]
    about: IAbout
    tag?: ITag
    images: IImage[]
}

export const List = ({ articles, about, images, tag }: ListArgs) => {
    return html`<!DOCTYPE html>
        <html lang="en">
            ${Head({
                title: `Jay Wick | ${tag?.name || 'Blog Posts'}`,
                description: tag?.story ?? 'Blog Posts',
                themeColor: about.themeColor,
            })}
            <body>
                ${Header()} ${tag && Series({ tag, related: [] })}
                ${articles.map(
                    (article) => html`
                        <article class="list-article">
                            <h1>
                                <a href="${article.url}">${article.title}</a>
                            </h1>
                            <div class="byline">
                                <address class="author">
                                    ${article.author}
                                </address>
                                &bull;
                                <time datetime="{date}">
                                    ${article.readableDate}
                                </time>
                                &bull;
                                <span>${article.readTime} min read</span>
                            </div>
                            ${Hero({
                                url: article.heroUrl,
                                alt: article.heroAlt,
                                images,
                            })}
                            <div aria-roledescription="article content">
                                ${article.htmlSnippet}
                            </div>
                        </article>
                    `
                )}
                ${Footer({ author: about.author })}
            </body>
        </html>`
}

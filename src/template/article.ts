import { IAbout, IArticle, IImage, ITag } from '../types'
import { Footer } from './components/footer'
import { Head } from './components/head'
import { Header } from './components/header'
import { Hero } from './components/hero'
import { Series } from './components/series'
import { html } from './utils'

interface ArticleArgs {
    article: IArticle
    about: IAbout
    images: IImage[]
}

export const Article = ({
    article,
    about,
    images,
}: ArticleArgs) => html`<!DOCTYPE html>
    <html lang="en">
        ${Head({
            title: article.title,
            description: article.excerpt,
            themeColor: about.themeColor,
            shouldIncludeCodeCss: true,
        })}
        <body>
            ${Header()}
            <article>
                <h1>${article.title}</h1>
                <div class="byline">
                    <address class="author">${article.author}</address>
                    &bull;
                    <time datetime="{date}"> ${article.readableDate} </time>
                    &bull;
                    <span>${article.readTime} min read</span>
                </div>
                ${Hero({
                    url: article.heroStaticPath,
                    alt: article.heroAlt,
                    images,
                })}
                <div aria-roledescription="article content">
                    ${article.htmlContent}
                </div>
                ${article.resolvedTag &&
                Series({
                    tag: article.resolvedTag!,
                    related: article.related,
                })}
            </article>
            ${Footer({ author: about.author })}
        </body>
    </html>`

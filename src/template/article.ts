import { IAbout, IArticle, IImage, ITag } from '../types'
import { Footer } from './components/footer'
import { Head } from './components/head'
import { Header } from './components/header'
import { Image } from './components/image'
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
                ${Image({
                    url: article.heroUrl,
                    alt: article.heroAlt,
                    imageSizes: images,
                    className: 'hero',
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

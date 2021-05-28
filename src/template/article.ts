import { IAbout, IArticle } from '../types'
import { Head, Series, Footer, Header } from './components'
import { html } from './utils'

interface ArticleArgs {
    article: IArticle
    about: IAbout
}

export const Article = ({ article, about }: ArticleArgs) => html`<!DOCTYPE html>
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
                <img
                    class="hero"
                    src="${article.heroStaticPath}"
                    alt="${article.heroAlt}"
                />
                <div aria-roledescription="article content">
                    ${article.htmlContent}
                </div>
                ${Series({ tag: article.tag, related: article.related })}
            </article>
            ${Footer({ author: about.author })}
        </body>
    </html>`

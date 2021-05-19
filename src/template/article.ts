import { IArticle } from '../types'
import { Head, Series, Footer, Header } from './components'
import { html } from './utils'

export const Article = ({
    title,
    author,
    readableDate,
    readTime,
    htmlContent,
    heroStaticPath,
    heroAlt,
    tag,
    related,
}: IArticle) => html`<!DOCTYPE html>
    <html lang="en">
        ${Head({ title })}
        <body>
            ${Header()}
            <article>
                <h1>${title}</h1>
                <div class="byline">
                    <address class="author">${author}</address>
                    &bull;
                    <time datetime="{date}"> ${readableDate} </time>
                    &bull;
                    <span>${readTime} min read</span>
                </div>
                <img class="hero" src="${heroStaticPath}" alt="${heroAlt}" />
                <div aria-roledescription="article content">${htmlContent}</div>
                ${Series({ tag, related })}
            </article>
            ${Footer()}
        </body>
    </html>`

import { Head, Series, Footer, Header } from './components'
import { html } from './render'

interface PageArg {
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
    related: {
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
        url: string
        readableDate: string
    }[]
}

export const Page = ({
    title,
    author,
    date,
    readTime,
    htmlContent,
    heroStaticPath,
    heroAlt,
    tag,
    related,
}: PageArg) => html`<!DOCTYPE html>
    <html lang="en">
        ${Head({ title })}
        <body>
            ${Header()}
            <article>
                <h1>${title}</h1>
                <div class="byline">
                    <address class="author">${author}</address>
                    &bull;
                    <time datetime="{date}">
                        ${new Date(date).toLocaleDateString()}
                    </time>
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

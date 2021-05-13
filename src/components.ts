import { html } from './render'

export const Logo = () => html`<svg
    class="main-logo"
    width="60"
    height="40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <circle cx="21.6923" cy="20.4615" r="5.71154" strokeWidth="1.5"></circle>
    <circle cx="37.3077" cy="20.4615" r="5.71154" strokeWidth="1.5"></circle>
    <line
        x1="12"
        y1="20.7885"
        x2="16.8462"
        y2="20.7885"
        strokeWidth="1.5"
    ></line>
    <line
        x1="42.1538"
        y1="20.7885"
        x2="47"
        y2="20.7885"
        strokeWidth="1.5"
    ></line>
    <path
        d="M27.3462 19.9231C27.9205 19.1104 29.8554 17.9726 31.9231 19.9231"
        strokeWidth="1.5"
    ></path>
</svg>`

interface SeriesArgs {
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

export const Series = ({ tag, related }: SeriesArgs) => {
    if (!related || !related.length) {
        return null
    }

    return html`
        <section class="series">
            <div>More articles about <strong class="tag">${tag}</strong></div>
            <ul>
                ${related.map(
                    ({ id, title, url, readableDate }) => html`
                        <li key="${id}">
                            <a href="${url}">${title}</a>
                            <span class="subtitle">${readableDate}</span>
                        </li>
                    `
                )}
            </ul>
        </section>
    `
}

export const Footer = () =>
    html`<footer>&copy; ${new Date().getFullYear()} Jay Wick</footer>`

interface HeadArgs {
    title: string
}

export const Head = ({ title }: HeadArgs) => html` <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
        name="description"
        content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link
        rel="stylesheet"
        type="text/css"
        href="/theme-dark.css"
        media="screen and (prefers-color-scheme: dark)"
    />
    <link
        rel="stylesheet"
        type="text/css"
        href="/theme-light.css"
        media="screen and (prefers-color-scheme: light)"
    />
    <link rel="stylesheet" type="text/css" href="/styles.css" />
    <link
        rel="stylesheet"
        type="text/css"
        href="//fonts.googleapis.com/css?family=Roboto+Slab&display=swap"
    />
    <link
        href="//unpkg.com/prism-theme-night-owl@1.4.0/build/style.css"
        media="screen and (prefers-color-scheme: dark)"
        rel="stylesheet"
    />
    <link
        href="//unpkg.com/prism-theme-night-owl@1.4.0/build/light.css"
        media="screen and (prefers-color-scheme: light)"
        rel="stylesheet"
    />
    <title>${title}</title>
</head>`

export const Header = () => html`<header>
    <a href="/" title="Back to home page"> ${Logo()} </a>
</header>`

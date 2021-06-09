import { html } from '../utils'

interface HeadArgs {
    title: string
    description: string
    themeColor: string
    shouldIncludeCodeCss?: boolean
}

export const Head = ({
    title,
    description,
    themeColor,
    shouldIncludeCodeCss = false,
}: HeadArgs) => html` <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="${themeColor}" />
    <meta name="description" content="${description}" />
    <link rel="apple-touch-icon" href="/logo192.png" />
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
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet"
    />
    ${shouldIncludeCodeCss &&
    html`<link
            href="//unpkg.com/prism-theme-night-owl@1.4.0/build/style.css"
            media="screen and (prefers-color-scheme: dark)"
            rel="stylesheet"
        />
        <link
            href="//unpkg.com/prism-theme-night-owl@1.4.0/build/light.css"
            media="screen and (prefers-color-scheme: light)"
            rel="stylesheet"
        />`}
    <title>${title}</title>
</head>`

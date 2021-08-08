import { html } from '../utils'

interface HeadArgs {
    title: string
    description: string
    themeColor: string
    shouldIncludeCodeCss?: boolean
    colorScheme?: 'dark' | 'light' | 'auto'
}

export const Head = ({
    title,
    description,
    themeColor,
    shouldIncludeCodeCss = false,
    colorScheme = 'auto',
}: HeadArgs) => html` <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="${themeColor}" />
    <meta name="description" content="${description}" />
    <link rel="apple-touch-icon" href="/logo192.png" />
    ${ThemeStyles({ colorScheme })}
    <link media="screen" rel="stylesheet" type="text/css" href="/styles.css" />
    ${shouldIncludeCodeCss &&
    html`<link
            href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/style.css"
            media="screen and (prefers-color-scheme: dark)"
            rel="stylesheet"
        />
        <link
            href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/light.css"
            media="screen and (prefers-color-scheme: light)"
            rel="stylesheet"
        />`}
    <title>${title}</title>
</head>`

function ThemeStyles({
    colorScheme,
}: {
    colorScheme: 'dark' | 'light' | 'auto'
}) {
    switch (colorScheme) {
        case 'dark':
            return html`<link
                rel="stylesheet"
                type="text/css"
                href="/theme-dark.css"
            />`
        case 'light':
            return html`<link
                rel="stylesheet"
                type="text/css"
                href="/theme-light.css"
            />`
        case 'auto':
            return html` <link
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
                />`
        default:
            return ''
    }
}

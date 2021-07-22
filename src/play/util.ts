import { Head } from '../template/components/head'
import { html } from '../template/utils'

export type Playground = {
    templateFn: () => string
    name: string
    filename: string
}

export type PlaygroundMap = Record<string, Playground[]>

export const injectIntoHead = (template: string, insertion: string) => {
    return template.replace(/<\/head>/i, insertion + '</head>')
}

export const wrapComponentInHtml = (template: string) => {
    return html`<!DOCTYPE html>
        <html lang="en">
            ${Head({
                title: 'Playground',
                description: '',
                themeColor: '',
                shouldIncludeCodeCss: true,
            })}
            <style>
                html {
                    background: #505050;
                }
            </style>
            <body>
                ${template}
            </body>
        </html>`
}

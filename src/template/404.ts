import { IAbout } from '../types'
import { Head } from './components/head'
import { html } from './utils'

interface NotFoundArgs {
    about: IAbout
}

export const NotFound = ({ about }: NotFoundArgs) => html`<!DOCTYPE html>
    <html lang="en">
        ${Head({
            title: 'Ohnoes',
            description: 'Could not find the right page',
            themeColor: about.themeColor,
        })}
        <body>
            <main class="error">
                <h1>This is a little bit akward...</h1>
                <p class="byline">This URL doesnt match any page we expected</p>
            </main>
        </body>
    </html>`

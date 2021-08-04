import { startCase, upperFirst } from 'lodash'
import { attr, css, html } from '../template/utils'
import { PlaygroundMap } from './util'

interface PlaygroundPageArgs {
    playgrounds: PlaygroundMap
    hash: string
}

export const PlaygroundPage = ({
    playgrounds,
    hash,
}: PlaygroundPageArgs) => html` <!DOCTYPE html>
    <html lang="en">
        <head>
            ${Styles()}
            <script>
                // reloader
                setInterval(async () => {
                    const currentHash = '${hash}'
                    const serverHash = await fetch('/version')
                        .then((x) => x.text())
                        .catch(() => 'network-fail')

                    if (
                        serverHash !== 'network-fail' &&
                        serverHash !== currentHash
                    ) {
                        location.reload()
                    }
                }, 1000)

                // playground loader
                window.addEventListener('DOMContentLoaded', (event) => {
                    document.querySelector('#content-frame').src =
                        location.search + '&inline=true'
                    document.querySelector(
                        'li a[href="' + location.search + '"]'
                    ).parentElement.className = 'selected'
                })
                //
            </script>
        </head>
        <body>
            <aside>
                <h1>Playground</h1>
                <ul class="plays">
                    ${Object.keys(playgrounds).flatMap((filename) =>
                        playgrounds[filename].map(
                            (p, i) => html`<li>
                                <a
                                    href="?path=${filename}&name=${p.name}"
                                    ${attr({ class: i > 0 && 'nested' })}
                                    >${startCase(p.name)}</a
                                >
                            </li>`
                        )
                    )}
                </ul>
            </aside>
            <main>
                <iframe id="content-frame" src="#" title="description"></iframe>
            </main>
        </body>
    </html>`

function Styles() {
    return css`
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                'Segoe UI Emoji', 'Segoe UI Symbol';
            display: grid;
            height: 100vh;
            padding: 0;
            margin: 0;
            grid-template-columns: 200px 1fr;
        }

        iframe#content-frame {
            border: 0;
            width: 100%;
            height: calc(100% - 4px);
        }

        ul.plays {
            padding: 0.5rem;
            margin: 0;
            list-style: none;
        }

        ul.plays > li {
            padding: 0.5rem;
            border-radius: 10px;
        }

        ul.plays > li:hover {
            background: #eceff1;
            cursor: pointer;
        }

        ul.plays > li.selected {
            background: #64c4ff;
        }

        ul.plays > li > a.nested {
            padding-left: 1rem;
        }

        ul.plays > li > a {
            color: unset;
            font-size: 1rem;
            text-decoration: unset;
        }
    `
}

import { attr, html } from '../template/utils'
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
            <style>
                body {
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
                }

                ul.plays > li.nested {
                    padding-left: 1rem;
                }

                ul.plays > li > a {
                    font-family: monospace;
                    color: unset;
                    font-size: 1rem;
                }
            </style>
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
                            (p, i) => html`<li
                                ${attr({ class: i > 0 && 'nested' })}
                            >
                                <a href="?path=${filename}&name=${p.name}"
                                    >${p.name}</a
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

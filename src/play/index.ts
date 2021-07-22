import chalk from 'chalk'
import { createServer } from 'http'
import { Directory } from '../graph/util'
import { v4 as uuid } from 'uuid'
import { Playground, PlaygroundMap, wrapComponentInHtml } from './util'
import { PlaygroundPage } from './playground'
import { URLSearchParams } from 'url'

export async function play() {
    const publicDir = new Directory(__dirname, '..', '..', 'public')
    const templatesDir = new Directory(__dirname, '..', '..', 'src', 'template')

    const playgrounds: PlaygroundMap = {}
    for (const playFile of await templatesDir.glob('**/*.play.ts')) {
        const playModule = await import(playFile.path)
        const playNames = Object.keys(playModule)

        playgrounds[playFile.name] = playNames.map((p) => ({
            name: p,
            templateFn: playModule[p],
            filename: playFile.name,
        }))
    }

    const hash = uuid()

    const server = createServer(async (req, res) => {
        if (!req.url) {
            return
        }

        if (req.url === '/version') {
            res.end(hash)
        }

        const searchParams = getSearchParams(req.url)

        if (
            req.url === '/' ||
            (req.url.startsWith('/?') && searchParams['inline'] !== 'true')
        ) {
            return res.end(PlaygroundPage({ hash, playgrounds }))
        }

        const publicFile = publicDir.file(req.url.slice(1))

        if (publicFile.exists()) {
            return res.end(await publicFile.streamContent())
        }

        const filename = searchParams['path']
        const playname = searchParams['name']
        const inline = searchParams['inline']

        const playMatch =
            inline === 'true' &&
            filename != null &&
            playname != null &&
            playgrounds[filename]?.find((p) => p.name === playname)

        if (playMatch) {
            const template = playMatch.templateFn()

            if (!template.includes('<html>')) {
                // component
                return res.end(wrapComponentInHtml(template))
            }
            res.end(template)
        }

        return res.end('Not found')
    })

    console.log(chalk.blue`ℹ️ Playground loaded at http://localhost:8000`)
    server.listen(8000)
}

function getSearchParams(url?: string) {
    const params: Record<string, string> = {}

    if (url == null || url === '/') {
        return params
    }

    new URLSearchParams(url.slice(1)).forEach((value, name) => {
        params[name] = value
    })

    return params
}

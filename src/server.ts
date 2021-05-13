import { createServer } from 'http'
import { promises as fs } from 'fs'
import paths from 'path'
import { match as splatMatch } from 'path-to-regexp'
import { StaticHtml } from './render'

export class Redirect {
    public statusCode = 308
    constructor(public url: string) {}
}

export class NotFound {
    public statusCode = 404
    constructor() {}
}

export async function serve(componentRoutes: {
    [path: string]: (
        params: Record<string, string>
    ) => StaticHtml | Redirect | NotFound | null
}) {
    const server = createServer(async (req, res) => {
        if (!req.url) {
            return res.end(400)
        }

        // component routes
        for (const path in componentRoutes) {
            const match = splatMatch(path)(req.url)

            if (match) {
                const responseData = componentRoutes[path](
                    match.params as Record<string, string>
                )

                if (responseData == null) {
                    continue
                } else if (responseData instanceof NotFound) {
                    res.writeHead(responseData.statusCode)
                    res.end()
                    return
                } else if (responseData instanceof Redirect) {
                    res.writeHead(responseData.statusCode, {
                        Location: responseData.url,
                    })
                    res.end()
                    return
                }

                return res.end(responseData)
            }
        }

        // public files
        const publicFiles = await listFilesnames(__dirname, '..', 'public')

        for (const filename of publicFiles) {
            if (`/${filename}` === req.url) {
                res.end(await readFile(__dirname, '..', 'public', filename))
                return
            }
        }

        // catch all for not-found
        res.writeHead(404)
        res.end()
    })

    console.log('Serving on http://localhost:8000')
    server.listen(8000)
}

async function listFilesnames(...pathParts: string[]) {
    return await fs.readdir(paths.resolve(...pathParts))
}

async function readFile(...pathParts: string[]) {
    return await fs
        .readFile(paths.resolve(...pathParts))
        .then((x) => x.toString())
}

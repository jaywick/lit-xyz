import { createServer } from 'http'
import { promises as fs } from 'fs'
import paths from 'path'
import { Directory, File } from '../graph/util'

export async function serve(dist: Directory) {
    const server = createServer(async (req, res) => {
        if (!req.url) {
            console.error(`URL expected. Was empty`)
            return res.end(400)
        }

        const path = req.url.slice(1) // removes leading `/`

        const exactFile = new File(dist.path, path)

        if (exactFile.exists()) {
            return res.end(await exactFile.streamContent())
        }

        const indexFile = new File(dist.path, path, 'index.html')

        if (indexFile.exists()) {
            const data = await indexFile.streamContent()
            return res.end(data)
        }

        const addHtml = new File(dist.path, `${path}.html`)

        if (addHtml.exists()) {
            const data = await addHtml.streamContent()
            return res.end(data)
        }

        // catch all for not-found
        console.error(`404 Not Found: ${req.url}`)
        res.writeHead(404)
        return res.end()
    })

    console.log('Serving on http://localhost:8000')
    server.listen(8000)
    return server
}

async function listFilesnames(...pathParts: string[]) {
    return fs.readdir(paths.resolve(...pathParts))
}

async function readFile(...pathParts: string[]) {
    return await fs
        .readFile(paths.resolve(...pathParts))
        .then((x) => x.toString())
}

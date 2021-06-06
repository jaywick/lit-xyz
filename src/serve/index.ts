import { createServer } from 'http'
import { ListrTask } from 'listr'
import { IContext } from '..'
import { Directory, File } from '../graph/util'

interface Args {
    dist: Directory
}

export async function serve(context: IContext) {
    const {
        filesystem: { dist },
        args: { serve },
    } = context

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

    server.listen(8000)
}

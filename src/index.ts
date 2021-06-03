import { exportAll } from './exporter'
import { generateGraph } from './graph'
import { Directory, File } from './graph/util'
import { Command } from 'commander'
import { serve } from './serve'
import util from 'util'

main()

async function main() {
    global.args = new Command()
        .option('--skip-images', 'skip image processing', false)
        .option(
            '--mock-data',
            'process mock data instead of actual articles',
            false
        )
        .option(
            '--dry-run',
            'run commands without making changes to filesystem',
            false
        )
        .option('--serve', 'serves generated items for local testing', false)
        .allowUnknownOption(true)
        .parse(process.argv)
        .opts() as IArgs

    console.info('Running with options: ' + JSON.stringify(global.args))

    const publics = new Directory(__dirname, '../public').ensureExists()
    let docs = new Directory(__dirname, '../doc/articles').ensureExists()
    let tags = new Directory(__dirname, '../doc/tags').ensureExists()
    let about = new File(__dirname, '../doc/about.yml').ensureExists()

    if (global.args.mockData) {
        docs = new Directory(
            __dirname,
            './mock-data/docs/articles/'
        ).ensureExists()
        tags = new Directory(__dirname, './mock-data/docs/tags/').ensureExists()
        about = new File(__dirname, './mock-data/docs/about.yml').ensureExists()
    }

    const graph = await generateGraph({ docs, tags, about, publics })

    const dist = new Directory(__dirname, '../dist')

    if (global.args.serve) {
        const cache = new File(__dirname, '../.graph')

        const prevCache = await cache.readContentOrEmpty()
        if (prevCache !== util.inspect(cache)) {
            console.log('Graph content unchanged, export skipped')
        } else {
            await exportAll(graph, dist)
        }

        cache.writeContent(util.inspect(graph))

        await serve(dist)
    } else {
        await exportAll(graph, dist)
    }
}

interface IArgs {
    skipImages: boolean
    mockData: boolean
    dryRun: boolean
    serve: boolean
    watch: boolean
}

declare global {
    namespace NodeJS {
        interface Global {
            args: IArgs
        }
    }
}

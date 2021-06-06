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
        .option('--skip-lint', 'skip markdown linting', false)
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
        .option('--serve-only', 'only serves and never runs anything', false)
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

    const dist = new Directory(__dirname, '../dist')

    if (!global.args.serveOnly) {
        const graph = await generateGraph({ docs, tags, about, publics })
        await exportAll(graph, dist)
    }

    if (global.args.serveOnly || global.args.serve) {
        await serve(dist)
    }
}

interface IArgs {
    skipImages: boolean
    mockData: boolean
    dryRun: boolean
    serve: boolean
    watch: boolean
    serveOnly: boolean
    skipLint: boolean
}

declare global {
    namespace NodeJS {
        interface Global {
            args: IArgs
        }
    }
}

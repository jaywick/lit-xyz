import { exportAll } from './exporter'
import { generateGraph } from './graph'
import { Directory } from './graph/util'
import { Command } from 'commander'
import { serve } from './serve'
import { log } from './reporter'

main()

async function main() {
    resolveCommandLineArgs()
    const { publics, docs, tags, about, dist } = resolveFilesystemPaths()

    if (!global.args.serveOnly) {
        const graph = await generateGraph({
            docs,
            tags,
            about,
            publics,
        })

        if (!global.args.skipExport) {
            await exportAll({ graph, dist })
        }
    }

    if (global.args.serveOnly || global.args.serve) {
        await serve({ dist })
    }
}

function resolveCommandLineArgs() {
    global.args = new Command()
        .option('--skip-images', 'skip image processing', false)
        .option('--skip-lint', 'skip markdown linting', false)
        .option(
            '--mock-data',
            'process mock data instead of actual articles',
            false
        )
        .option('--skip-export', 'skips export to file system step', false)
        .option('--serve', 'serves generated items for local testing', false)
        .option('--serve-only', 'only serves and never runs anything', false)
        .allowUnknownOption(true)
        .parse(process.argv)
        .opts() as IArgs

    log('INFO', {
        message: 'Running with options',
        data: { args: global.args },
    })
}

function resolveFilesystemPaths() {
    const docRoot = global.args.mockData
        ? new Directory(__dirname, './mock-data/docs')
        : new Directory(__dirname, '../doc')

    return {
        publics: new Directory(__dirname, '../public').ensureExists(),
        dist: new Directory(__dirname, '../dist'),
        docs: docRoot.subdirectory('articles').ensureExists(),
        tags: docRoot.subdirectory('tags').ensureExists(),
        about: docRoot.file('about.yml').ensureExists(),
    }
}

interface IArgs {
    skipImages: boolean
    mockData: boolean
    serve: boolean
    watch: boolean
    skipExport: boolean
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

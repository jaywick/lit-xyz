import { exportAll } from './exporter'
import { generateGraph } from './graph'
import { Directory, File } from './graph/util'
import { Command } from 'commander'
import { serve } from './serve'
import { log } from './reporter'
import Listr from 'listr'
import { IGraph } from './types'

main()

export interface IContext {
    args: IArgs
    graph: IGraph
    filesystem: IFilesystem
}

async function main() {
    new Listr<IContext>(
        [
            {
                title: 'Calcualting tasks',
                task: resolveCommandLineArgs,
            },
            {
                title: 'Resolving file system paths',
                task: resolveFilesystemPaths,
            },
            {
                title: 'Generating data graph',
                task: generateGraph,
            },
            {
                title: 'Exporting to filesystem',
                task: exportAll,
                skip: (context) => context.args?.skipExport || false,
            },
            {
                title: 'Starting test server',
                task: serve,
                enabled: (context) => context.args?.serve || false,
            },
        ],
        { concurrent: false }
    )
        .run()
        .catch((err) => {
            log('ERROR', { message: err.message, data: err })
        })
}

function resolveCommandLineArgs(context: IContext) {
    context.args = new Command()
        .option('--skip-images', 'skip image processing', false)
        .option('--skip-lint', 'skip markdown linting', false)
        .option(
            '--mock-data',
            'process mock data instead of actual articles',
            false
        )
        .option('--skip-export', 'skips export to file system step', false)
        .option('--serve', 'serves generated items for local testing', false)
        .allowUnknownOption(true)
        .parse(process.argv)
        .opts() as IArgs

    log('INFO', {
        message: 'Running with options',
        data: context.args,
    })
}

function resolveFilesystemPaths(context: IContext) {
    const docRoot = context.args.mockData
        ? new Directory(__dirname, './mock-data/docs')
        : new Directory(__dirname, '../doc')

    context.filesystem = {
        publics: new Directory(__dirname, '../public').ensureExists(),
        dist: new Directory(__dirname, '../dist'),
        docs: docRoot.subdirectory('articles').ensureExists(),
        tags: docRoot.subdirectory('tags').ensureExists(),
        about: docRoot.file('about.yml').ensureExists(),
    }
}

interface IArgs {
    skipImages: boolean
    skipLint: boolean
    mockData: boolean
    skipExport: boolean
    serve: boolean
}

interface IFilesystem {
    publics: Directory
    dist: Directory
    docs: Directory
    tags: Directory
    about: File
}

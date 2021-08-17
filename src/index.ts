// @ts-ignore
import VerboseRenderer from 'listr-verbose-renderer'
import { exportAll } from './exporter'
import { generateGraph } from './graph'
import { Directory, File } from './graph/util'
import { Command } from 'commander'
import { serve } from './serve'
import { play } from './play'
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
    log('INFO', {
        message: 'Starting up...',
    })
    new Listr<IContext>(
        [
            {
                title: 'Calcualting tasks',
                task: resolveCommandLineArgs,
            },
            {
                title: 'Resolving file system paths',
                task: resolveFilesystemPaths,
                skip: (context) => context.args?.playground,
            },
            {
                title: 'Generating data graph',
                task: generateGraph,
                skip: (context) => context.args?.playground,
            },
            {
                title: 'Exporting to filesystem',
                task: exportAll,
                skip: (context) =>
                    context.args?.skipExport ||
                    context.args?.playground ||
                    false,
            },
            {
                title: 'Starting test server',
                task: serve,
                enabled: (context) => context.args?.serve || false,
                skip: (context) => context.args?.playground,
            },
            {
                title: 'Starting playground',
                task: play,
                enabled: (context) => context.args?.playground || false,
            },
        ],
        {
            concurrent: false,
            renderer: VerboseRenderer,
            // @ts-ignore
            collapse: false,
        }
    )
        .run()
        .then(() =>
            log('INFO', {
                message: '...and finished',
            })
        )
        .catch((err) => {
            log('ERROR', {
                message: err.message,
                data: err,
                group: 'main',
                filepath: __filename,
            })
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
        .option('--no-log-data', 'skips logging data objects in logs', false)
        .option(
            '--playground',
            'Creates a playground to test template files with mock data',
            false
        )
        .allowUnknownOption(true)
        .parse(process.argv)
        .opts() as IArgs

    log('INFO', {
        message: 'Running with options',
        data: context.args,
        group: 'resolve-commandline-args',
        filepath: __filename,
    })
}

function resolveFilesystemPaths(context: IContext) {
    const docRoot = context.args?.mockData
        ? new Directory(__dirname, './mock-data/docs')
        : new Directory(__dirname, '../doc')

    context.filesystem = {
        publics: new Directory(__dirname, '../public').ensureExists(),
        dist: new Directory(__dirname, '../dist'),
        templates: new Directory(__dirname, '../src'),
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
    noLogData: boolean
    serve: boolean
    playground: boolean
}

interface IFilesystem {
    publics: Directory
    dist: Directory
    docs: Directory
    tags: Directory
    about: File
    templates: Directory
}

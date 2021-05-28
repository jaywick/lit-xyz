import { exportAll } from './exporter'
import { generateGraph } from './graph'
import { Directory, File } from './graph/util'
import { Command } from 'commander'

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
        .allowUnknownOption(true)
        .parse(process.argv)
        .opts() as IArgs

    console.info('Running with options: ' + JSON.stringify(global.args))

    const publics = new Directory(__dirname, '../public').ensureExists()
    let docs = new Directory(__dirname, '../doc/articles').ensureExists()
    let about = new File(__dirname, '../doc/about.yml').ensureExists()

    if (global.args.mockData) {
        docs = new Directory(
            __dirname,
            './mock-data/docs/articles/'
        ).ensureExists()
        about = new File(__dirname, './mock-data/docs/about.yml').ensureExists()
    }

    const graph = await generateGraph(docs, about, publics)

    const dist = new Directory(__dirname, '../dist').ensureExists()
    await exportAll(graph, dist)
}

interface IArgs {
    skipImages: boolean
    mockData: boolean
    dryRun: boolean
}

declare global {
    namespace NodeJS {
        interface Global {
            args: IArgs
        }
    }
}

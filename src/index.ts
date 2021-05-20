import { exportAll } from './exporter'
import { generateGraph } from './graph'
import { Directory } from './graph/util'
import { Command } from 'commander'

main()

async function main() {
    global.args = new Command()
        .option('--skip-images', 'skip image processing', false)
        .option('--pick <article>', 'process single article by id', false)
        .option(
            '--dry-run',
            'run commands without making changes to filesystem',
            false
        )
        .allowUnknownOption(true)
        .parse(process.argv)
        .opts() as IArgs

    console.info('Running with options: ' + JSON.stringify(global.args))

    const docs = new Directory(__dirname, '../doc/articles')
    const publics = new Directory(__dirname, '../public')
    const graph = await generateGraph(docs, publics)

    const dist = new Directory(__dirname, '../dist')
    await exportAll(graph, dist)
}

interface IArgs {
    skipImages: boolean
    pick: string | false
    dryRun: boolean
}

declare global {
    namespace NodeJS {
        interface Global {
            args: IArgs
        }
    }
}

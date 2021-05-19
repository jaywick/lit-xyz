import { exportAll } from './exporter'
import { generateGraph } from './graph'
import { Directory } from './graph/util'

main()

async function main() {
    const docs = new Directory(__dirname, '../doc/articles') // use "mock-data/docs/blog" for testing
    const publics = new Directory(__dirname, '../public')
    const graph = await generateGraph(docs, publics)

    const dist = new Directory(__dirname, '../dist')
    await exportAll(graph, dist)
}

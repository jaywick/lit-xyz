import { exportData } from './export'
import { generateGraph } from './graph'

main()

async function main() {
    const graph = await generateGraph()
    await exportData(graph)
}

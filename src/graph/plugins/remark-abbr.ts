import { Plugin } from 'unified'
import { Node } from 'unist'
import visit from 'unist-util-visit'
import { log } from '../../reporter'
import { html } from '../../template/utils'

interface LinkNode extends Node {
    url: string
    children: (Node & { value: string })[]
}

export const remarkAbbr: Plugin<[]> = () => (tree: Node) =>
    visit(tree, 'link', (node: LinkNode) => {
        const url = node.url

        if (
            !url &&
            node.children.length === 0 &&
            node.children[0].type !== 'text' &&
            !node.children[0].value.startsWith(':')
        ) {
            return
        }

        if (node.children.length > 1) {
            log('WARN', {
                message:
                    'Unexpected ABBR syntax. Expected 1 child of type text.',
                data: node,
            })
        }

        const content = node.children[0].value.slice(1) // ignore leading `:`

        node.type = 'html'
        node.value = html`<abbr title="${String(node.url)}">${content}</abbr>`
    })

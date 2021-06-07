import { Node } from 'unist-builder'
import visit from 'unist-util-visit'
import { html } from '../../template/utils'

interface CodeNode extends Node {
    lang: string
}

export default function remarkBanner() {
    return function transformer(tree: Node) {
        visit(tree, 'code', (node: CodeNode) => {
            let { lang, value, meta } = node
            if (!lang || !value || !['info', 'error', 'warn'].includes(lang)) {
                return
            }

            node.type = `html`
            node.value = html`<div class="banner-${lang}">
                ${String(value)}
            </div>`
        })

        return tree
    }
}

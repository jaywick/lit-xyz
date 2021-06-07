import { Node } from 'unist-builder'
import visit from 'unist-util-visit'
import { Banner } from '../../template/components/banner'
import { html } from '../../template/utils'

interface CodeNode extends Node {
    lang: string
}

export default function remarkBanner() {
    return function transformer(tree: Node) {
        visit(tree, 'code', (node: CodeNode) => {
            let { lang, value, meta } = node
            if (
                !lang ||
                !value ||
                !['info', 'error', 'warn', 'tip'].includes(lang)
            ) {
                return
            }

            node.type = `html`
            node.value = Banner({
                title: String(meta),
                kind: lang as any,
                content: String(value),
            })
        })

        return tree
    }
}

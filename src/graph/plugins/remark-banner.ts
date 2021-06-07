import { Node } from 'unist-builder'
import visit from 'unist-util-visit'
import { log } from '../../reporter'
import { Banner } from '../../template/components/banner'

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

            if (meta == null) {
                log('ERROR', {
                    message:
                        'Missing banner meta, expected syntax is "```kind meta"',
                    data: node,
                })
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

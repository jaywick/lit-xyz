import { Plugin } from 'unified'
import { Node } from 'unist-builder'
import visit from 'unist-util-visit'
import { log } from '../../reporter'
import { Banner } from '../../template/components/banner'

interface CodeNode extends Node {
    lang: string
}

interface RemarkBannerOptions {
    sourceFile: string
}

export const remarkBanner: Plugin<[RemarkBannerOptions]> =
    ({ sourceFile }) =>
    (tree: Node) => {
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
                    group: 'remark-banner',
                    filepath: sourceFile,
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

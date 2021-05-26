// @ts-ignore
import rule from 'unified-lint-rule'
import visit from 'unist-util-visit'
import { Node } from 'unist'
import { VFile } from 'vfile'

/**
 *   Fork of remark-lint-no-html by @TitusWormer
 *
 *   Warns on HTML elements except specific ones determined here
 *
 * @example {"name": "ok.md"}
 *
 *   # Hello
 *
 *   <!--Comments are also OK-->
 *
 * @example {"name": "not-ok.md", "label": "input"}
 *
 *   <h1>Hello</h1>
 *
 * @example {"name": "not-ok.md", "label": "output"}
 *
 *   1:1-1:15: Do not use HTML in markdown
 */
function noIllegalHTML(tree: Node, file: VFile) {
    visit(tree, 'html', visitor)

    function visitor(node: Node) {
        const outterHtml = String(node.value).toLowerCase().trim()
        const allowedTags = ['!--', 'sup', 'sub', 'cite', 'kbd']

        if (
            !allowedTags.some(
                (x) =>
                    outterHtml.startsWith(`<${x}`) ||
                    outterHtml.startsWith(`</${x}`)
            )
        ) {
            file.message(
                `Illegal HTML tag found in markdown: ${node.value}`,
                node
            )
        }
    }
}

export default rule('remark-lint:no-illegal-html', noIllegalHTML)

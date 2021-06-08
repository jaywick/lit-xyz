import { Plugin } from 'unified'
import { Node } from 'unist'
import visit from 'unist-util-visit'
import { log } from '../../reporter'
import { html } from '../../template/utils'

interface ImageNode extends Node {
    url?: string
    alt?: string
    title?: string
}

interface RemarkImageCaptionOptions {
    sourceFile: string
}

export const remarkImageCaption: Plugin<[RemarkImageCaptionOptions]> =
    ({ sourceFile }) =>
    (tree: ImageNode) =>
        visit(tree, 'image', (node: ImageNode) => {
            const { url, alt, title } = node

            if (!url) {
                log('ERROR', {
                    message: 'Image with no URL found',
                    data: node,
                    filepath: sourceFile,
                })
                return
            }

            if (!alt && !title) {
                log('WARN', {
                    message: 'Alt or titles are required for images',
                    data: node,
                    filepath: sourceFile,
                })
            }

            node.type = `html`
            node.value = html`<figure>
                <img src="${url}" alt="${alt || ''}" />
                <figcaption>${title || alt}</figcaption>
            </figure>`
        })

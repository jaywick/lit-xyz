import { Plugin } from 'unified'
import { Node } from 'unist'
import visit from 'unist-util-visit'
import { html } from '../../template/utils'

interface ImageNode extends Node {
    url?: string
}

export const remarkVideo: Plugin<[]> = () => (tree: ImageNode) =>
    visit(tree, ['image'], (node: ImageNode) => {
        const url = node.url

        if (!url) {
            return
        }

        const rendered = YouTube({ src: url }) || Vimeo({ src: url })

        if (rendered) {
            node.type = `html`
            node.value = rendered
        }
    })

const Vimeo = (args: { src: string }) => {
    const { id } = extract(args.src, /vimeo.com\/(?<id>\d+)/i)

    if (!id) {
        return null
    }

    return html`<iframe
        src="https://player.vimeo.com/video/${id}"
        width="800"
        height="${(800 * 9) / 16}"
        frameborder="0"
        allowfullscreen
    ></iframe>`
}

const YouTube = (args: { src: string }) => {
    const { id } = extract(args.src, /(youtube.com|youtu.be)\/(?<id>\d+)/i)

    if (!id) {
        return null
    }

    return html`<iframe
        width="800"
        height="${(800 * 9) / 16}"
        src="https://www.youtube-nocookie.com/embed/${id}"
        frameborder="0"
        allow="picture-in-picture"
        allowfullscreen
    ></iframe>`
}

const extract = (
    text: string,
    patternWithNamedGroups: RegExp
): Record<string, string> => {
    return text.match(patternWithNamedGroups)?.groups || {}
}

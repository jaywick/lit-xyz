import { Node } from 'unist'
import paths from 'path'
import visit from 'unist-util-visit'
import { Plugin } from 'unified'
import { IImage } from '../../types'

type ImageNode = Node & {
    tagName: string
    properties: { [key: string]: string | null }
}

interface RehypeLazyImageOptions {
    images: IImage[]
}

export const rehypeLazyImages: Plugin<[RehypeLazyImageOptions]> =
    ({ images }) =>
    (tree: Node) => {
        visit(tree, ['element'], visitor)

        function visitor({ tagName, properties }: ImageNode) {
            if (tagName !== 'img') {
                return
            }

            if (!properties.loading) {
                properties.loading = 'lazy'
            }

            if (!properties.srcSet && properties.src) {
                const isExternal =
                    properties.src.startsWith('http') ||
                    properties.src.startsWith('//')

                if (!isExternal) {
                    const { base, name, ext } = paths.parse(properties.src)

                    const image = images.find((x) => x.imageUrl.endsWith(base))

                    if (image) {
                        properties.width = String(image.width)
                        properties.height = String(image.height)
                    }

                    properties.srcSet = ['320w', '480w', '768w', '1024w']
                        .map((size) => `${name}-${size}${ext} ${size}`)
                        .concat(`${name}${ext} 1200w`)
                        .join(', ')
                    properties.sizes = '100vw'
                }
            }
        }
    }

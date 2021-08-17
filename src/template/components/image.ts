import { attr, html } from '../utils'
import paths from 'path'
import { IImage } from '../../types'

interface ImgArgs {
    url: string
    alt: string
    className?: string
    imageSizes?: IImage[]
    lazy?: boolean
}

export function Image({
    url,
    alt,
    className,
    imageSizes = [],
    lazy = true,
}: ImgArgs) {
    const { base, name, ext, dir } = paths.parse(url)

    const image = imageSizes.find((x) => x.imageUrl.endsWith(base))

    const otherAttrs = attr({
        class: className,
        loading: lazy && 'lazy',
        width: image && String(image.width),
        height: image && String(image.height),
    })

    const srcSet = ['320w', '480w', '768w', '1024w']
        .map((size) => `${dir}/${name}-${size}${ext} ${size}`)
        .concat(`${dir}/${name}${ext} 1200w`)
        .join(', ')

    return html`<img
        src="${url}"
        alt="${alt}"
        srcset="${srcSet}"
        sizes="100vw"
        ${otherAttrs}
    />`
}

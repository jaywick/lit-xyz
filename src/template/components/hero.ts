import { html } from '../utils'
import { parse as parsePath } from 'path'
import { IImage } from '../../types'

interface HeroArgs {
    url: string
    alt: string
    images: IImage[]
}

export function Hero({ url, alt, images }: HeroArgs) {
    const { base, name, ext } = parsePath(url)

    const { width, height } =
        images.find((x) => x.relativePath.endsWith(base)) || {}

    const srcSet = ['320w', '480w', '768w', '1024w']
        .map((size) => `${name}-${size}${ext} ${size}`)
        .concat(`${name}${ext} 1200w`)
        .join(', ')

    return html`
        <img
            class="hero"
            src="${url}"
            alt="${alt}"
            loading="lazy"
            srcset="${srcSet}"
            sizes="100vw"
            ${width && html`width="${width}"`}
            ${height && html`height="${height}"`}
        />
    `
}

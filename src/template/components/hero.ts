import { html } from '../utils'
import { parse as parsePath, resolve as resolvePath } from 'path'
import { IImage } from '../../types'

interface HeroArgs {
    url: string
    alt: string
    images: IImage[]
}

export function Hero({ url, alt, images }: HeroArgs) {
    const { base, name, ext, dir } = parsePath(url)

    if (url.startsWith('http:') || url.startsWith('https:')) {
        return html`<img
            class="hero"
            src="${url}"
            loading="lazy"
            sizes="100vw"
        />`
    }

    const { width, height } =
        images.find((x) => x.imageUrl.endsWith(base)) || {}

    const filePathWithNoExt = resolvePath(dir, name)

    const srcSet = ['320w', '480w', '768w', '1024w']
        .map((size) => `${filePathWithNoExt}-${size}${ext} ${size}`)
        .concat(`${filePathWithNoExt}${ext} 1200w`)
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

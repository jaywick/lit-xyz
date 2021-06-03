import { html } from '../utils'
import { parse as parsePath } from 'path'

interface HeroArgs {
    url: string
    alt: string
}

export function Hero({ url, alt }: HeroArgs) {
    const { name, ext } = parsePath(url)

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
        />
    `
}

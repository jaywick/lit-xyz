import { html } from '../utils'
import { Image } from './image'

interface ChipArgs {
    title: string
    url: string
    heroUrl: string
    heroAlt: string
}

export function Chip({ title, url, heroUrl, heroAlt }: ChipArgs) {
    return html`<li class="chip">
        <a href="${url}">
            <div class="chip-inner">
                ${Image({
                    url: heroUrl,
                    alt: heroAlt,
                    className: 'chip-thumbnail',
                })}
                <div class="chip-title">${title}</div>
            </div>
        </a>
    </li>`
}

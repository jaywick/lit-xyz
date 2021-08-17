import { html } from '../utils'
import { Image } from './image'

interface CardArgs {
    title: string
    url: string
    heroUrl: string
    heroAlt: string
    subtitle?: string | string[]
    isCompact?: boolean
}

export function Card({
    title,
    heroUrl,
    heroAlt,
    url,
    isCompact = false,
    subtitle = [],
}: CardArgs) {
    const flattenedSubtitle = [subtitle].flatMap((x) => x)
    const classPrefix = isCompact ? 'mini-card' : 'card'

    return html`<li class="${classPrefix}">
        <a href="${url}">
            ${Image({
                url: heroUrl,
                alt: heroAlt,
                className: classPrefix + '-thumbnail',
            })}
            <div class="${classPrefix}-text">
                <div class="${classPrefix}-title">${title}</div>
                ${flattenedSubtitle.length > 0 &&
                html`<div class="${classPrefix}-details">
                    ${flattenedSubtitle.join(' &bullet; ')}
                </div>`}
            </div>
        </a>
    </li>`
}

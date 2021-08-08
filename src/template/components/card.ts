import { html } from '../utils'

interface CardArgs {
    title: string
    url: string
    heroUrl: string
    subtitle?: string | string[]
    isCompact?: boolean
}

export function Card({
    title,
    heroUrl,
    url,
    isCompact = false,
    subtitle = [],
}: CardArgs) {
    const flattenedSubtitle = [subtitle].flatMap((x) => x)
    const classPrefix = isCompact ? 'mini-card' : 'card'

    return html`<li class="${classPrefix}">
        <a href="${url}">
            <img src="${heroUrl}" class="${classPrefix}-thumbnail" />
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

import { html } from '../utils'

interface CardArgs {
    title: string
    url: string
    heroUrl: string
    subtitle?: string | string[]
}

export function Card({ title, heroUrl, url, subtitle = [] }: CardArgs) {
    const flattenedSubtitle = [subtitle].flatMap((x) => x)
    return html`<li class="card">
        <a href="${url}">
            <img src="${heroUrl}" class="card-thumbnail" />
            <div class="card-text">
                <div class="card-title">${title}</div>
                ${flattenedSubtitle.length > 0 &&
                html`<div class="card-details">
                    ${flattenedSubtitle.join(' &bullet; ')}
                </div>`}
            </div>
        </a>
    </li>`
}

import { html } from '../utils'

interface ChipArgs {
    title: string
    url: string
    heroUrl: string
}

export function Chip({ title, url, heroUrl }: ChipArgs) {
    return html`<li class="chip">
        <a href="${url}">
            <div class="chip-inner">
                <img src="${heroUrl}" class="chip-thumbnail" />
                <div class="chip-title">${title}</div>
            </div>
        </a>
    </li>`
}

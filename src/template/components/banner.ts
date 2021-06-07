import { html } from '../utils'

interface BannerArgs {
    title: string
    kind: 'info' | 'warn' | 'error' | 'tip'
    content: string
}

const icons = {
    info: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/information_2139-fe0f.png',
    warn: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/warning_26a0-fe0f.png',
    error: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/stop-sign_1f6d1.png',
    tip: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/light-bulb_1f4a1.png',
}

export function Banner({ title, kind, content }: BannerArgs) {
    return html`<div class="banner banner-${kind}">
        <div class="banner-header">
            <img
                class="banner-icon"
                src="${icons[kind] || icons['info']}"
                width="24"
                height="24"
                alt="${kind} symbol"
            />
            <h3 class="banner-title">${title}</h3>
        </div>
        <p class="banner-content">${content}</p>
    </div>`
}

import { attr, html } from '../utils'

interface BannerArgs {
    title: string
    kind: 'info' | 'warn' | 'error' | 'tip'
    content: string
}

export function Banner({ title, kind, content }: BannerArgs) {
    return html`<div class="banner banner-${kind}">
        <div class="banner-header">
            <svg width="24" height="24">${Shape({ kind })}</svg>
            <h3 class="banner-title">${title}</h3>
        </div>
        <p class="banner-content">${content}</p>
    </div>`
}

interface ShapeArgs {
    kind: 'info' | 'warn' | 'error' | 'tip'
}

function Shape({ kind }: ShapeArgs) {
    const svgAttrs = { viewBox: '0 0 24 24', width: '24', height: '24' }

    switch (kind) {
        case 'error':
            return html`<svg ${attr(svgAttrs)}>
                <rect width="24" height="24" />
            </svg>`
        case 'info':
            return html`<svg ${attr(svgAttrs)}>
                <circle cx="12" cy="12" r="12" width="24" height="24" />
            </svg>`
        case 'tip':
            return html`<svg ${attr({ ...svgAttrs, viewBox: '0 0 32 32' })}>
                <path
                    d="M 0,14.355469 2.2460938,7.421875 C 7.4218645,9.2448552 11.181626,10.82363 13.525391,12.158203 12.906885,6.2663426 12.581365,2.2136123 12.548828,0 l 7.080078,0 c -0.09768,3.2227258 -0.472027,7.2591801 -1.123047,12.109375 3.35284,-1.692646 7.193982,-3.2551444 11.523438,-4.6875 l 2.246094,6.933594 c -4.134146,1.367244 -8.186877,2.278702 -12.158204,2.734375 1.985652,1.725314 4.785129,4.801483 8.398438,9.228515 L 22.65625,30.46875 C 20.768205,27.89718 18.53839,24.397835 15.966797,19.970703 13.557926,24.560595 11.442043,28.059941 9.6191406,30.46875 L 3.8574219,26.318359 C 7.6334528,21.663463 10.335273,18.587294 11.962891,17.089844 7.763661,16.276098 3.7760348,15.364641 0,14.355469"
                />
            </svg>`
        default:
            return html`<svg ${attr({ ...svgAttrs, viewBox: '0 0 60 60' })}>
                <polygon points="0,52 30,0 60,52" />
            </svg>`
    }
}

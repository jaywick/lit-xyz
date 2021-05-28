import { Logo } from './logo'
import { html } from '../utils'

export const Header = () => html`<header>
    <a href="/" title="Back to home page"> ${Logo()} </a>
</header>`

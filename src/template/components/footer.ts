import { html } from '../utils'

interface FooterArgs {
    author: string
}

export const Footer = ({ author }: FooterArgs) =>
    html`<footer>&copy; ${new Date().getFullYear()} ${author}</footer>`

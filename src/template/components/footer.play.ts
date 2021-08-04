import { mockAbout } from '../../mock-data/mocks'
import { Footer as FooterView } from './footer'

export const Footer = () =>
    FooterView({
        author: mockAbout.author,
    })

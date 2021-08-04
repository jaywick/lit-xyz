import { mockTags } from '../../mock-data/mocks'
import { html } from '../utils'
import { Chip as ChipView } from './chip'

export const Chips = () => html`<ul class="chip-grid" style="max-width: 1000px">
    ${mockTags.map(({ name, url, heroUrl }) =>
        ChipView({
            title: name,
            url,
            heroUrl,
        })
    )}
</ul>`

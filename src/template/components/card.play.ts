import { mockImages } from '../../mock-data/mocks'
import { html } from '../utils'
import { Card as CardView } from './card'

export const Card = () =>
    html`<ul class="card-grid">
        ${CardView({
            heroUrl: mockImages.sampleImage1,
            title: 'Do eu deserunt aute amet do enim',
            url: 'url/to/this/article',
            subtitle:
                'Tempor deserunt reprehenderit aliquip minim Lorem consequat laboris excepteur incididunt sit',
        })}
    </ul>`

export const ManyCards = () => html`<ul
    class="card-grid"
    style="max-width: 1000px"
>
    ${CardView({
        heroUrl: mockImages.sampleImage2,
        title: 'Do Eu Deserunt Aute Amet Do Enim',
        url: 'url/to/this/article1',
        subtitle: [
            'Tempor deserunt reprehenderit aliquip minim',
            'Lorem consequat laboris excepteur incididunt sit',
        ],
    })}
    ${CardView({
        heroUrl: mockImages.sampleImage3,
        title: 'Labore cillum id cupidatat nisi laboris sunt sint',
        url: 'url/to/this/article2',
        subtitle:
            'Aliquip deserunt dolore esse cupidatat eu ea tempor anim laborum culpa aliquip.',
    })}
    ${CardView({
        heroUrl: mockImages.sampleImage4,
        title: 'In Nostrud Tempor Culpa Nostrud Officia',
        url: 'url/to/this/article3',
        subtitle: 'Ex non excepteur exercitation commodo non.',
    })}
    ${CardView({
        heroUrl: mockImages.sampleImage5,
        title: 'Nulla Id Sunt Cillum Est Occaecat Anim Nostrud Commodo Et Ipsum',
        url: 'url/to/this/article4',
        subtitle:
            'Proident ipsum dolore culpa pariatur est. Dolore cupidatat sint dolore ipsum.',
    })}
</ul>`

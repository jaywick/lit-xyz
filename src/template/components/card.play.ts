import { html } from '../utils'
import { Card as CardView } from './card'

export const Card = () =>
    html`<ul class="card-grid">
        ${CardView({
            heroUrl: 'https://source.unsplash.com/1600x900/?nature,water',
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
        heroUrl: 'https://source.unsplash.com/1600x900/?trees',
        title: 'Do Eu Deserunt Aute Amet Do Enim',
        url: 'url/to/this/article1',
        subtitle: [
            'Tempor deserunt reprehenderit aliquip minim',
            'Lorem consequat laboris excepteur incididunt sit',
        ],
    })}
    ${CardView({
        heroUrl: 'https://source.unsplash.com/1600x900/?water',
        title: 'Labore cillum id cupidatat nisi laboris sunt sint',
        url: 'url/to/this/article2',
        subtitle:
            'Aliquip deserunt dolore esse cupidatat eu ea tempor anim laborum culpa aliquip.',
    })}
    ${CardView({
        heroUrl: 'https://source.unsplash.com/1600x900/?fire',
        title: 'In Nostrud Tempor Culpa Nostrud Officia',
        url: 'url/to/this/article3',
        subtitle: 'Ex non excepteur exercitation commodo non.',
    })}
    ${CardView({
        heroUrl: 'https://source.unsplash.com/1600x900/?sky',
        title: 'Nulla Id Sunt Cillum Est Occaecat Anim Nostrud Commodo Et Ipsum',
        url: 'url/to/this/article4',
        subtitle:
            'Proident ipsum dolore culpa pariatur est. Dolore cupidatat sint dolore ipsum.',
    })}
</ul>`

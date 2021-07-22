import { range } from 'lodash'
import {
    mockArticle1,
    mockArticle2,
    mockArticle3,
    mockTag1,
} from '../../mock-data/mocks'
import { Series as SeriesView } from './series'

export const Series = () =>
    SeriesView({ tag: mockTag1, related: [mockArticle2, mockArticle3] })

export const SeriesWithNoRelated = () =>
    SeriesView({ tag: mockTag1, related: [] })

export const SeriesWithLotsOfRelatedArticles = () =>
    SeriesView({
        tag: mockTag1,
        related: [
            'Enim Pariatur Ipsum Sit Anim Duis Aliqua Eiusmod Deserunt Officia Enim Non Nostrud Id',
            'Ullamco Commodo Dolor Do Minim Culpa Dolor Cupidatat Aliqua Incididunt',
            'Quis Nostrud Aliqua Ad Nostrud Sit Consequat',
            'Anim Cupidatat Laborum Proident Laboris',
            'Occaecat Sint Aute Deserunt Est Velit Aute Officia',
            'Pariatur Minim Ut Aliquip Consequat In Laborum Sunt Id Tempor Officia Consectetur',
            'Excepteur Elit Mollit Adipisicing Enim Qui Commodo Qui Commodo Eiusmod Qui Aliqua',
        ].map((title) => ({ ...mockArticle1, title })),
    })

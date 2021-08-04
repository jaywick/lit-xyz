import { mockAbout, mockRichArticles, mockTag1 } from '../mock-data/mocks'
import { List as ListView } from './list'

export const BlogList = () =>
    ListView({
        articles: mockRichArticles,
        about: mockAbout,
        images: [],
    })

export const TagList = () =>
    ListView({
        articles: mockRichArticles,
        about: mockAbout,
        images: [],
        tag: mockTag1,
    })

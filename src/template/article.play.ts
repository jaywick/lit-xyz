import {
    mockAbout,
    mockBasicArticle1,
    mockRichArticles,
} from '../mock-data/mocks'
import { Article as ArticleView } from './article'

export const BasicArticle = () =>
    ArticleView({
        about: mockAbout,
        article: mockBasicArticle1,
        images: [],
    })

export const RichArticle = () =>
    ArticleView({
        about: mockAbout,
        article: mockRichArticles[0],
        images: [],
    })

export const RichArticle2 = () =>
    ArticleView({
        about: mockAbout,
        article: mockRichArticles[1],
        images: [],
    })

export const RichArticle3 = () =>
    ArticleView({
        about: mockAbout,
        article: mockRichArticles[2],
        images: [],
    })

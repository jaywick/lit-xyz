import { mockAbout, mockArticle1 } from '../mock-data/mocks'
import { Article as ArticleView } from './article'

export const ArticlePage = () =>
    ArticleView({
        about: mockAbout,
        article: mockArticle1,
        images: [],
    })

import {
    mockAbout,
    mockBasicArticle1,
    mockBasicArticle2,
    mockBasicArticle3,
    mockRichArticles,
    mockTag1,
    mockTag2,
} from '../mock-data/mocks'
import { Home as HomeView } from './home'

export const Home = () =>
    HomeView({
        articles: [mockBasicArticle1, mockBasicArticle2, mockBasicArticle3],
        about: mockAbout,
        tags: [mockTag1, mockTag2],
    })

export const HomeWithRichArticles = () =>
    HomeView({
        articles: mockRichArticles,
        about: mockAbout,
        tags: [mockTag1, mockTag2],
    })

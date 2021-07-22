import {
    mockAbout,
    mockArticle1,
    mockArticle2,
    mockArticle3,
    mockTag1,
    mockTag2,
} from '../mock-data/mocks'
import { Home as HomeView } from './home'

export const Home = () =>
    HomeView({
        articles: [mockArticle1, mockArticle2, mockArticle3],
        about: mockAbout,
        tags: [mockTag1, mockTag2],
    })

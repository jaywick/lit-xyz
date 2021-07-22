import { mockAbout } from '../mock-data/mocks'
import { NotFound } from './404'

export const NotFoundPage = () => NotFound({ about: mockAbout })

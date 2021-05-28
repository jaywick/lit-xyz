export type IGraph = {
    about: IAbout
    articles: IArticle[]
    images: IImage[]
    public: IPublic[]
}

export type IRelatedArticle = Omit<IArticle, 'related'>

export interface IArticle extends IFrontmatter {
    readTime: number
    readableDate: string
    htmlContent: string
    heroStaticPath: string
    originalMarkdown: string
    url: string
    related: IRelatedArticle[]
    excerpt: string
}

export interface IAbout {
    title: string
    author: string
    tagline: string
    description: string
    themeColor: string
}

export interface IFrontmatter {
    id: string
    title: string
    author: string
    date: string
    hero: string
    tag: string
    slug: string
    heroAlt: string
}

export interface IImage {
    originalPath: string
    relativePath: string
    width: number
    height: number
}

export interface IPublic {
    originalPath: string
}

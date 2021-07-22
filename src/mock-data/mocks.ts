import { IAbout, IArticle, ITag } from '../types'

export const mockTag1: ITag = {
    aliases: ['magna', 'irure', 'mollit-eu'],
    hero: '',
    heroUrl: 'https://source.unsplash.com/1600x900/?cat',
    key: 'reprehenderit',
    name: 'Reprehenderit',
    story: 'Veniam ex proident exercitation consequat sit cillum proident.',
    url: 'url/to/tag1',
    urls: ['url2/for/tag1', 'url3/for/tag1', 'url4/for/tag1'],
}

export const mockTag2: ITag = {
    aliases: ['eiusmod', 'tempor', 'excepteur'],
    hero: '',
    heroUrl: 'https://source.unsplash.com/1600x900/?bird',
    key: 'tempor-aute',
    name: 'Tempor Aute',
    story: 'Ad quis eu aute esse non fugiat qui commodo irure minim dolor amet. Magna aliqua ut anim laboris est culpa irure labore adipisicing elit voluptate officia.',
    url: 'url/to/tag',
    urls: [],
}

export const mockAbout: IAbout = {
    title: 'Exercitation Dolore',
    author: 'Occaecat Sint',
    tagline: 'Est Lorem ullamco nisi anim eu pariatur',
    description:
        'Id ea aliquip magna esse nulla et consectetur nulla reprehenderit. Fugiat excepteur incididunt sint adipisicing Lorem sunt nisi voluptate enim magna culpa laborum veniam. Occaecat commodo velit do qui elit ad proident labore dolor fugiat. Nulla cillum nulla mollit adipisicing cupidatat eiusmod sit aliqua culpa do. Do anim commodo sint amet ipsum. Exercitation qui ad ea non quis dolore culpa nulla. Fugiat eu elit est adipisicing aliqua sint elit velit reprehenderit ut enim sint ex dolor',
    themeColor: '#00ff00',
}

export const mockArticle2: IArticle = {
    htmlContent: `<p>Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.</p>
        <hr/>
        <p>Culpa sunt sunt esse nulla culpa aliquip dolor exercitation non eu ea incididunt exercitation. Aute adipisicing culpa non labore. Id qui irure voluptate ea dolor minim pariatur. Duis dolor sit cillum quis. Laborum anim velit occaecat proident. Aute ad ad adipisicing esse ex qui officia amet culpa sint ad laborum. Est incididunt eiusmod incididunt officia ut ullamco velit officia id ut ad.</p>
        <p>Ipsum sunt veniam dolor consectetur voluptate. Lorem esse nulla incididunt excepteur elit nisi. Nisi reprehenderit magna labore in laboris officia occaecat do labore ea.</p>
        <p>Dolore pariatur eiusmod fugiat aliqua cillum exercitation veniam veniam ex ad anim. Eiusmod ad ea minim Lorem. Fugiat sint incididunt pariatur ex aute veniam.</p>`,
    htmlSnippet:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    heroUrl: 'https://source.unsplash.com/1600x900/?nature',
    originalMarkdown:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    originalPath: 'path/to/article',
    excerpt:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    resolvedTag: mockTag1,
    author: 'Occaecat Sint',
    date: '2021-01-01T10:30:00.000Z',
    hero: 'https://source.unsplash.com/1600x900/?nature',
    heroAlt: 'Id anim ut voluptate nisi',
    id: '123',
    slug: 'exercitation-dolore-minim-laboris-dolore-ullamco-ullamco-ipsum-excepteur-ut',
    tag: 'tempor-aute',
    url: 'url/to/article2',
    title: 'Nulla Minim Velit Pariatur Non Ex Culpa Do',
    readableDate: '5 January, 2021',
    readTime: 2,
    related: [],
}

export const mockArticle3: IArticle = {
    htmlContent: `<p>Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.</p>
        <hr/>
        <p>Culpa sunt sunt esse nulla culpa aliquip dolor exercitation non eu ea incididunt exercitation. Aute adipisicing culpa non labore. Id qui irure voluptate ea dolor minim pariatur. Duis dolor sit cillum quis. Laborum anim velit occaecat proident. Aute ad ad adipisicing esse ex qui officia amet culpa sint ad laborum. Est incididunt eiusmod incididunt officia ut ullamco velit officia id ut ad.</p>
        <p>Ipsum sunt veniam dolor consectetur voluptate. Lorem esse nulla incididunt excepteur elit nisi. Nisi reprehenderit magna labore in laboris officia occaecat do labore ea.</p>
        <p>Dolore pariatur eiusmod fugiat aliqua cillum exercitation veniam veniam ex ad anim. Eiusmod ad ea minim Lorem. Fugiat sint incididunt pariatur ex aute veniam.</p>`,
    htmlSnippet:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    heroUrl: 'https://source.unsplash.com/1600x900/?water',
    originalMarkdown:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    originalPath: 'path/to/article',
    excerpt:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    resolvedTag: mockTag1,
    author: 'Occaecat Sint',
    date: '2021-01-01T10:30:00.000Z',
    hero: 'https://source.unsplash.com/1600x900/?water',
    heroAlt: 'Id anim ut voluptate nisi',
    id: '123',
    slug: 'exercitation-dolore-minim-laboris-dolore-ullamco-ullamco-ipsum-excepteur-ut',
    tag: 'tempor-aute',
    url: 'url/to/article3',
    title: 'Lorem Id Sunt Pariatur Duis',
    readableDate: '3 March, 2021',
    readTime: 3,
    related: [],
}

export const mockArticle1: IArticle = {
    readTime: 5,
    readableDate: '1 January, 2021',
    htmlContent: `<p>Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.</p>
        <hr/>
        <p>Culpa sunt sunt esse nulla culpa aliquip dolor exercitation non eu ea incididunt exercitation. Aute adipisicing culpa non labore. Id qui irure voluptate ea dolor minim pariatur. Duis dolor sit cillum quis. Laborum anim velit occaecat proident. Aute ad ad adipisicing esse ex qui officia amet culpa sint ad laborum. Est incididunt eiusmod incididunt officia ut ullamco velit officia id ut ad.</p>
        <p>Ipsum sunt veniam dolor consectetur voluptate. Lorem esse nulla incididunt excepteur elit nisi. Nisi reprehenderit magna labore in laboris officia occaecat do labore ea.</p>
        <p>Dolore pariatur eiusmod fugiat aliqua cillum exercitation veniam veniam ex ad anim. Eiusmod ad ea minim Lorem. Fugiat sint incididunt pariatur ex aute veniam.</p>`,
    htmlSnippet:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    heroUrl: 'https://source.unsplash.com/1600x900/?fire',
    originalMarkdown:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    originalPath: 'path/to/article',
    url: 'url/to/article',
    related: [mockArticle2, mockArticle3],
    excerpt:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    resolvedTag: mockTag1,
    author: 'Occaecat Sint',
    date: '2021-01-01T10:30:00.000Z',
    hero: 'https://source.unsplash.com/1600x900/?fire',
    heroAlt: 'Id anim ut voluptate nisi',
    id: '123',
    slug: 'exercitation-dolore-minim-laboris-dolore-ullamco-ullamco-ipsum-excepteur-ut',
    tag: 'tempor-aute',
    title: 'Exercitation Dolore Minim Laboris Dolore Ullamco Ullamco Ipsum Excepteur Ut',
}

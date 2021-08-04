import { entries } from 'lodash'
import { IAbout, IArticle, ITag } from '../types'

export const mockImages = {
    sampleImage1: '/sample-image-1.jpg',
    sampleImage2: '/sample-image-2.jpg',
    sampleImage3: '/sample-image-3.jpg',
    sampleImage4: '/sample-image-4.jpg',
    sampleImage5: '/sample-image-5.jpg',
    sampleImage6: '/sample-image-6.jpg',
    sampleImage7: '/sample-image-7.jpg',
    sampleImage8: '/sample-image-8.jpg',
    sampleImage9: '/sample-image-9.jpg',
    sampleImage10: '/sample-image-10.jpg',
    sampleImage11: '/sample-image-11.jpg',
    sampleImage12: '/sample-image-12.jpg',
    sampleImage13: '/sample-image-13.jpg',
    sampleImage14: '/sample-image-14.jpg',
    sampleImage15: '/sample-image-15.jpg',
}

export const mockTags: ITag[] = entries({
    Qui: 'Anim consequat pariatur adipisicing laborum tempor nulla Lorem esse proident dolore.',
    Laboris:
        'Dolore officia aliqua dolore laboris id veniam consectetur nulla anim eiusmod laborum consequat enim.',
    Id: 'Officia cupidatat excepteur exercitation anim Lorem quis dolore eiusmod non quis nisi mollit ullamco.',
    Exercitation:
        'Consectetur nulla commodo non ullamco occaecat tempor officia tempor fugiat aliqua nisi pariatur.',
    Dolor: 'Enim esse ex nisi labore fugiat nostrud cupidatat elit deserunt ad laboris.',
    Elit: 'Irure reprehenderit ad dolore dolore duis duis eu tempor ullamco reprehenderit adipisicing esse sint.',
    Eiusmod:
        'Do ex voluptate proident commodo minim ipsum esse commodo do ut et ullamco eiusmod.',
    Ad: 'Laboris nulla commodo qui consequat.',
    Dolore: 'Dolore labore ullamco nostrud cupidatat Lorem sunt anim.',
    Aliqua: 'Aliqua anim est sit veniam exercitation quis est esse aute quis.',
    Consequat:
        'Excepteur irure ea velit et occaecat aute velit amet irure fugiat.',
    Sit: 'Ex amet occaecat irure minim.',
}).map(([name, story], i) => ({
    aliases: [],
    hero: '',
    heroUrl: mockImages.sampleImage7,
    key: name.toLowerCase(),
    name,
    story,
    url: 'url/tag/' + name.toLowerCase(),
    urls: [],
}))

export const mockTag1: ITag = {
    aliases: ['magna', 'irure', 'mollit-eu'],
    hero: '',
    heroUrl: mockImages.sampleImage8,
    key: 'reprehenderit',
    name: 'Reprehenderit',
    story: 'Veniam ex proident exercitation consequat sit cillum proident.',
    url: 'url/to/tag1',
    urls: ['url2/for/tag1', 'url3/for/tag1', 'url4/for/tag1'],
}

export const mockTag2: ITag = {
    aliases: ['eiusmod', 'tempor', 'excepteur'],
    hero: '',
    heroUrl: mockImages.sampleImage2,
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

export const mockBasicArticle2: IArticle = {
    htmlContent: `<p>Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.</p>
        <hr/>
        <p>Culpa sunt sunt esse nulla culpa aliquip dolor exercitation non eu ea incididunt exercitation. Aute adipisicing culpa non labore. Id qui irure voluptate ea dolor minim pariatur. Duis dolor sit cillum quis. Laborum anim velit occaecat proident. Aute ad ad adipisicing esse ex qui officia amet culpa sint ad laborum. Est incididunt eiusmod incididunt officia ut ullamco velit officia id ut ad.</p>
        <p>Ipsum sunt veniam dolor consectetur voluptate. Lorem esse nulla incididunt excepteur elit nisi. Nisi reprehenderit magna labore in laboris officia occaecat do labore ea.</p>
        <p>Dolore pariatur eiusmod fugiat aliqua cillum exercitation veniam veniam ex ad anim. Eiusmod ad ea minim Lorem. Fugiat sint incididunt pariatur ex aute veniam.</p>`,
    htmlSnippet:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    heroUrl: mockImages.sampleImage3,
    originalMarkdown:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    originalPath: 'path/to/article',
    excerpt:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    resolvedTag: mockTag1,
    author: 'Occaecat Sint',
    date: '2021-01-01T10:30:00.000Z',
    hero: '',
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

export const mockBasicArticle3: IArticle = {
    htmlContent: `<p>Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.</p>
        <hr/>
        <p>Culpa sunt sunt esse nulla culpa aliquip dolor exercitation non eu ea incididunt exercitation. Aute adipisicing culpa non labore. Id qui irure voluptate ea dolor minim pariatur. Duis dolor sit cillum quis. Laborum anim velit occaecat proident. Aute ad ad adipisicing esse ex qui officia amet culpa sint ad laborum. Est incididunt eiusmod incididunt officia ut ullamco velit officia id ut ad.</p>
        <p>Ipsum sunt veniam dolor consectetur voluptate. Lorem esse nulla incididunt excepteur elit nisi. Nisi reprehenderit magna labore in laboris officia occaecat do labore ea.</p>
        <p>Dolore pariatur eiusmod fugiat aliqua cillum exercitation veniam veniam ex ad anim. Eiusmod ad ea minim Lorem. Fugiat sint incididunt pariatur ex aute veniam.</p>`,
    htmlSnippet:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    heroUrl: mockImages.sampleImage4,
    originalMarkdown:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    originalPath: 'path/to/article',
    excerpt:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    resolvedTag: mockTag1,
    author: 'Occaecat Sint',
    date: '2021-01-01T10:30:00.000Z',
    hero: '',
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

export const mockBasicArticle1: IArticle = {
    readTime: 5,
    readableDate: '1 January, 2021',
    htmlContent: `<p>Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.</p>
        <hr/>
        <p>Culpa sunt sunt esse nulla culpa aliquip dolor exercitation non eu ea incididunt exercitation. Aute adipisicing culpa non labore. Id qui irure voluptate ea dolor minim pariatur. Duis dolor sit cillum quis. Laborum anim velit occaecat proident. Aute ad ad adipisicing esse ex qui officia amet culpa sint ad laborum. Est incididunt eiusmod incididunt officia ut ullamco velit officia id ut ad.</p>
        <p>Ipsum sunt veniam dolor consectetur voluptate. Lorem esse nulla incididunt excepteur elit nisi. Nisi reprehenderit magna labore in laboris officia occaecat do labore ea.</p>
        <p>Dolore pariatur eiusmod fugiat aliqua cillum exercitation veniam veniam ex ad anim. Eiusmod ad ea minim Lorem. Fugiat sint incididunt pariatur ex aute veniam.</p>`,
    htmlSnippet:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    heroUrl: mockImages.sampleImage5,
    originalMarkdown:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    originalPath: 'path/to/article',
    url: 'url/to/article',
    related: [mockBasicArticle2, mockBasicArticle3],
    excerpt:
        'Sit cupidatat ipsum qui laboris voluptate mollit esse exercitation sunt ex cillum. Eu dolor sunt occaecat aliquip ad in exercitation quis amet voluptate esse. Et fugiat culpa nulla et. Nisi in deserunt Lorem labore dolore aute qui non.',
    resolvedTag: mockTag1,
    author: 'Occaecat Sint',
    date: '2021-01-01T10:30:00.000Z',
    hero: '',
    heroAlt: 'Id anim ut voluptate nisi',
    id: '123',
    slug: 'exercitation-dolore-minim-laboris-dolore-ullamco-ullamco-ipsum-excepteur-ut',
    tag: 'tempor-aute',
    title: 'Exercitation Dolore Minim Laboris Dolore Ullamco Ullamco Ipsum Excepteur Ut',
}

export const mockRichArticles: IArticle[] = [
    {
        id: '101',
        title: 'Some coding stuff',
        date: '2012-05-09T00:00:00.000Z',
        tag: 'code',
        hero: '',
        author: 'Bob Ross',
        slug: 'some-coding-stuff',
        heroAlt: '',
        originalMarkdown:
            '\n' +
            'Leverage agile ==frameworks to provide a robust synopsis== for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.\n' +
            '\n' +
            '---\n' +
            '\n' +
            'Some code examples\n' +
            '\n' +
            '```jsx\n' +
            "import React from 'react'\n" +
            "import { PhotoStory, VideoStory } from './stories'\n" +
            '\n' +
            'const components = {\n' +
            '    photo: PhotoStory,\n' +
            '    video: VideoStory,\n' +
            '}\n' +
            '\n' +
            'function Story(props) {\n' +
            '    // Correct! JSX type can be a capitalized variable.\n' +
            '    const SpecificStory = components[props.storyType]\n' +
            '    return <SpecificStory story={props.story} />\n' +
            '}\n' +
            '```\n' +
            '\n' +
            '```info pro tip\n' +
            'Some admonitions\n' +
            '```\n' +
            '\n' +
            '```warn wait up\n' +
            'Some admonitions\n' +
            '```\n' +
            '\n' +
            '```error ohnoes\n' +
            'Some admonitions\n' +
            '```\n' +
            '\n' +
            'And [^1] more including some [:ABBR](Abbreviation) syntax\n' +
            '\n' +
            '```jsx\n' +
            'const Button = (props) => {\n' +
            '    const { kind, ...other } = props\n' +
            "    const className = kind === 'primary' ? 'PrimaryButton' : 'SecondaryButton'\n" +
            '    return <button className={className} {...other} />\n' +
            '}\n' +
            '\n' +
            'const App = () => {\n' +
            '    return (\n' +
            '        <div>\n' +
            "            <Button kind='primary' onClick={() => console.log('clicked!')}>\n" +
            '                Hello World!\n' +
            '            </Button>\n' +
            '        </div>\n' +
            '    )\n' +
            '}\n' +
            '```\n' +
            '\n' +
            'Remember that `false`, `null`, `undefined`, and `true` are not rendered in JSX.\n' +
            '\n' +
            ':::warning Wait\n' +
            'Hold up\n' +
            ':::\n' +
            '\n' +
            '![Vimeo link](https://vimeo.com/12739443)\n' +
            '\n' +
            '![If programming was anime](https://www.youtube.com/watch?v=pKO9UjSeLew)\n' +
            '\n' +
            '```tip Top tip\n' +
            'Hey\n' +
            '```\n' +
            '\n' +
            "Don't forget to press <kbd>Ctrl</kbd><kbd>s</kbd> every 5 seconds.\n" +
            '\n' +
            'Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.\n' +
            '\n' +
            'Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.\n' +
            '\n' +
            "[^1]: Footnote about 'some'\n",
        originalPath:
            '/Users/jwick/dev/other/lit-xyz/src/mock-data/docs/articles/101/index.mdx',
        readableDate: 'May 9, 2012',
        readTime: 2,
        htmlContent:
            '<p>Leverage agile <mark>frameworks to provide a robust synopsis</mark> for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>\n' +
            '<hr>\n' +
            '<p>Some code examples</p>\n' +
            `<div class="remark-highlight"><pre class="language-jsx"><code class="language-jsx"><span class="token keyword module">import</span> <span class="token imports"><span class="token maybe-class-name">React</span></span> <span class="token keyword module">from</span> <span class="token string">'react'</span>\n` +
            `<span class="token keyword module">import</span> <span class="token imports"><span class="token punctuation">{</span> <span class="token maybe-class-name">PhotoStory</span><span class="token punctuation">,</span> <span class="token maybe-class-name">VideoStory</span> <span class="token punctuation">}</span></span> <span class="token keyword module">from</span> <span class="token string">'./stories'</span>\n` +
            '\n' +
            '<span class="token keyword">const</span> components <span class="token operator">=</span> <span class="token punctuation">{</span>\n' +
            '    photo<span class="token operator">:</span> <span class="token maybe-class-name">PhotoStory</span><span class="token punctuation">,</span>\n' +
            '    video<span class="token operator">:</span> <span class="token maybe-class-name">VideoStory</span><span class="token punctuation">,</span>\n' +
            '<span class="token punctuation">}</span>\n' +
            '\n' +
            '<span class="token keyword">function</span> <span class="token function"><span class="token maybe-class-name">Story</span></span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n' +
            '    <span class="token comment">// Correct! JSX type can be a capitalized variable.</span>\n' +
            '    <span class="token keyword">const</span> <span class="token maybe-class-name">SpecificStory</span> <span class="token operator">=</span> components<span class="token punctuation">[</span>props<span class="token punctuation">.</span><span class="token property-access">storyType</span><span class="token punctuation">]</span>\n' +
            '    <span class="token keyword control-flow">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span><span class="token class-name">SpecificStory</span></span> <span class="token attr-name">story</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span><span class="token property-access">story</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n' +
            '<span class="token punctuation">}</span>\n' +
            '</code></pre></div>\n' +
            '<div class="banner banner-info">\n' +
            '        <div class="banner-header">\n' +
            '            <img class="banner-icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/information_2139-fe0f.png" width="24" height="24" alt="info symbol" loading="lazy">\n' +
            '            <h3 class="banner-title">pro tip</h3>\n' +
            '        </div>\n' +
            '        <p class="banner-content">Some admonitions</p>\n' +
            '    </div>\n' +
            '<div class="banner banner-warn">\n' +
            '        <div class="banner-header">\n' +
            '            <img class="banner-icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/warning_26a0-fe0f.png" width="24" height="24" alt="warn symbol" loading="lazy">\n' +
            '            <h3 class="banner-title">wait up</h3>\n' +
            '        </div>\n' +
            '        <p class="banner-content">Some admonitions</p>\n' +
            '    </div>\n' +
            '<div class="banner banner-error">\n' +
            '        <div class="banner-header">\n' +
            '            <img class="banner-icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/stop-sign_1f6d1.png" width="24" height="24" alt="error symbol" loading="lazy">\n' +
            '            <h3 class="banner-title">ohnoes</h3>\n' +
            '        </div>\n' +
            '        <p class="banner-content">Some admonitions</p>\n' +
            '    </div>\n' +
            '<p>And <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup> more including some <abbr title="Abbreviation">ABBR</abbr> syntax</p>\n' +
            '<div class="remark-highlight"><pre class="language-jsx"><code class="language-jsx"><span class="token keyword">const</span> <span class="token function-variable function"><span class="token maybe-class-name">Button</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n' +
            '    <span class="token keyword">const</span> <span class="token punctuation">{</span> kind<span class="token punctuation">,</span> <span class="token spread operator">...</span>other <span class="token punctuation">}</span> <span class="token operator">=</span> props\n' +
            `    <span class="token keyword">const</span> className <span class="token operator">=</span> kind <span class="token operator">===</span> <span class="token string">'primary'</span> <span class="token operator">?</span> <span class="token string">'PrimaryButton'</span> <span class="token operator">:</span> <span class="token string">'SecondaryButton'</span>\n` +
            '    <span class="token keyword control-flow">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>button</span> <span class="token attr-name">className</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>className<span class="token punctuation">}</span></span> <span class="token spread"><span class="token punctuation">{</span><span class="token punctuation">...</span><span class="token attr-value">other</span><span class="token punctuation">}</span></span> <span class="token punctuation">/></span></span>\n' +
            '<span class="token punctuation">}</span>\n' +
            '\n' +
            '<span class="token keyword">const</span> <span class="token function-variable function"><span class="token maybe-class-name">App</span></span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n' +
            '    <span class="token keyword control-flow">return</span> <span class="token punctuation">(</span>\n' +
            '        <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n' +
            `<span class="token plain-text">            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span><span class="token class-name">Button</span></span> <span class="token attr-name">kind</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">'</span>primary<span class="token punctuation">'</span></span> <span class="token attr-name">onClick</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token string">'clicked!'</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n` +
            '<span class="token plain-text">                Hello World!</span>\n' +
            '<span class="token plain-text">            </span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span><span class="token class-name">Button</span></span><span class="token punctuation">></span></span><span class="token plain-text"></span>\n' +
            '<span class="token plain-text">        </span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>div</span><span class="token punctuation">></span></span>\n' +
            '    <span class="token punctuation">)</span>\n' +
            '<span class="token punctuation">}</span>\n' +
            '</code></pre></div>\n' +
            '<p>Remember that <code>false</code>, <code>null</code>, <code>undefined</code>, and <code>true</code> are not rendered in JSX.</p>\n' +
            '<p>:::warning Wait\n' +
            'Hold up\n' +
            ':::</p>\n' +
            '<p><iframe src="https://player.vimeo.com/video/12739443" width="800" height="450" frameborder="0" allowfullscreen></iframe></p>\n' +
            '<p><iframe width="800" height="450" src="https://www.youtube-nocookie.com/embed/pKO9UjSeLew" frameborder="0" allow="picture-in-picture" allowfullscreen></iframe></p>\n' +
            '<div class="banner banner-tip">\n' +
            '        <div class="banner-header">\n' +
            '            <img class="banner-icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/twitter/282/light-bulb_1f4a1.png" width="24" height="24" alt="tip symbol" loading="lazy">\n' +
            '            <h3 class="banner-title">Top tip</h3>\n' +
            '        </div>\n' +
            '        <p class="banner-content">Hey</p>\n' +
            '    </div>\n' +
            "<p>Don't forget to press <kbd>Ctrl</kbd><kbd>s</kbd> every 5 seconds.</p>\n" +
            '<p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p>\n' +
            '<p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.</p>\n' +
            '<div class="footnotes">\n' +
            '<hr>\n' +
            '<ol>\n' +
            `<li id="fn-1">Footnote about 'some'<a href="#fnref-1" class="footnote-backref">↩</a></li>\n` +
            '</ol>\n' +
            '</div>',
        htmlSnippet:
            '<p>Leverage agile <mark>frameworks to provide a robust synopsis</mark> for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>',
        heroUrl: mockImages.sampleImage6,
        url: '/blog/101/some-coding-stuff',
        excerpt:
            '<p>Leverage agile ==frameworks to provide a robust synopsis== for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>',
        related: [],
        resolvedTag: null,
    },
    {
        id: '777',
        title: 'We wash our brush with odorless thinner. Poor old tree.',
        date: '2017-01-10T00:00:00.000Z',
        tag: 'protip',
        hero: '',
        author: 'Bob Ross',
        slug: 'we-wash-our-brush-with-odorless-thinner-poor-old-tree',
        heroAlt: '',
        originalMarkdown:
            '\n' +
            "We touch the canvas, the canvas takes what it wants. Don't kill all your dark areas - you need them to show the light. See there how easy that is. Each highlight must have it's own private shadow.\n" +
            '\n' +
            '---\n' +
            '\n' +
            '![And there it is](./218e764f5e5bcc84f0db8044f2ce5893.jpg)\n' +
            '\n' +
            "And maybe, `maybe`, maybe... You have to make almighty decisions when you're the creator. Let's make some happy little clouds in our world. Let's get wild today.\n" +
            '\n' +
            '```ts\n' +
            "const myGreeter = new Greeter('hello, world')\n" +
            "myGreeter.greeting = 'howdy'\n" +
            'myGreeter.showGreeting()\n' +
            '\n' +
            'class SpecialGreeter extends Greeter {\n' +
            '    constructor() {\n' +
            '        super(\n' +
            "            `Isn't that fantastic? Isn't that fantastic? You can just push a little tree out of your brush like that. I sincerely wish for you every possible joy life could bring. That's what painting is all about. It should make you feel good when you paint.`\n" +
            '        )\n' +
            '    }\n' +
            '}\n' +
            '```\n' +
            '\n' +
            '> Working it up and down, _back and forth_. Talk to trees, **look at the birds**. Whatever it takes. This is probably the greatest thing to happen in my life - to be able to share this with you.\n' +
            '> <cite>– Bob Ross</cite>\n' +
            '\n' +
            '![And there it is](./bob-ross-oak_on-a-clear-day-articleLarge.jpg)\n' +
            '\n' +
            "Do an almighty painting with us. Now we don't want him to get lonely, so we'll give him a little friend. Don't fiddle with it all day. No pressure. Just relax and watch it happen. <kbd>CMD</kbd><kbd>Q</kbd> makes us happy. <sup>If</sup> <sub>it</sub> makes you happy then it's good. ==Isn't it fantastic that you can change your mind and create all these happy things?==\n" +
            '\n' +
            "Let's just [example](http://example.com) it!\n" +
            '\n' +
            "And just raise cain. Let's put some happy little clouds in our world. I'm gonna add just a tiny little amount of Prussian Blue.\n" +
            '\n' +
            '<http://foo.bar.baz>\n' +
            '\n' +
            "Isn't that fantastic? Isn't that fantastic? You can just push a little tree out of your brush like that. I sincerely wish for you every possible joy life could bring. That's what painting is all about. It should make you feel good when you paint.\n" +
            '\n' +
            "Wait there's more\n" +
            '\n' +
            '1. Yes\n' +
            '2. There\n' +
            '3. Really is\n' +
            '\n' +
            'And a table later on\n' +
            '\n' +
            '-   bullet\n' +
            '-   lists\n' +
            '-   too\n' +
            '\n' +
            '# H1\n' +
            '\n' +
            '## H2\n' +
            '\n' +
            '### H3\n' +
            '\n' +
            '#### H4\n' +
            '\n' +
            '##### H5\n' +
            '\n' +
            '###### H6\n' +
            '\n' +
            "Here's that table I promised\n" +
            '\n' +
            '| Key  | Value |       |\n' +
            '| ---- | ----- | ----- |\n' +
            '| foo  | bar   | a     |\n' +
            '| fizz | bizz  | b     |\n' +
            '| baz  | fuzz  | _bar_ |\n',
        originalPath:
            '/Users/jwick/dev/other/lit-xyz/src/mock-data/docs/articles/777/index.md',
        readableDate: 'January 10, 2017',
        readTime: 2,
        htmlContent:
            "<p>We touch the canvas, the canvas takes what it wants. Don't kill all your dark areas - you need them to show the light. See there how easy that is. Each highlight must have it's own private shadow.</p>\n" +
            '<hr>\n' +
            '<p></p><figure>\n' +
            '                <img src="./218e764f5e5bcc84f0db8044f2ce5893.jpg" alt="And there it is" loading="lazy" width="807" height="807" srcset="218e764f5e5bcc84f0db8044f2ce5893-320w.jpg 320w, 218e764f5e5bcc84f0db8044f2ce5893-480w.jpg 480w, 218e764f5e5bcc84f0db8044f2ce5893-768w.jpg 768w, 218e764f5e5bcc84f0db8044f2ce5893-1024w.jpg 1024w, 218e764f5e5bcc84f0db8044f2ce5893.jpg 1200w" sizes="100vw">\n' +
            '                <figcaption>And there it is</figcaption>\n' +
            '            </figure><p></p>\n' +
            "<p>And maybe, <code>maybe</code>, maybe... You have to make almighty decisions when you're the creator. Let's make some happy little clouds in our world. Let's get wild today.</p>\n" +
            `<div class="remark-highlight"><pre class="language-ts"><code class="language-ts"><span class="token keyword">const</span> myGreeter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Greeter</span><span class="token punctuation">(</span><span class="token string">'hello, world'</span><span class="token punctuation">)</span>\n` +
            `myGreeter<span class="token punctuation">.</span>greeting <span class="token operator">=</span> <span class="token string">'howdy'</span>\n` +
            'myGreeter<span class="token punctuation">.</span><span class="token function">showGreeting</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n' +
            '\n' +
            '<span class="token keyword">class</span> <span class="token class-name">SpecialGreeter</span> <span class="token keyword">extends</span> <span class="token class-name">Greeter</span> <span class="token punctuation">{</span>\n' +
            '    <span class="token keyword">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n' +
            '        <span class="token keyword">super</span><span class="token punctuation">(</span>\n' +
            '            <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Isn\'t that fantastic? Isn\'t that fantastic? You can just push a little tree out of your brush like that. I sincerely wish for you every possible joy life could bring. That\'s what painting is all about. It should make you feel good when you paint.</span><span class="token template-punctuation string">`</span></span>\n' +
            '        <span class="token punctuation">)</span>\n' +
            '    <span class="token punctuation">}</span>\n' +
            '<span class="token punctuation">}</span>\n' +
            '</code></pre></div>\n' +
            '<blockquote>\n' +
            '<p>Working it up and down, <em>back and forth</em>. Talk to trees, <strong>look at the birds</strong>. Whatever it takes. This is probably the greatest thing to happen in my life - to be able to share this with you.\n' +
            '<cite>– Bob Ross</cite></p>\n' +
            '</blockquote>\n' +
            '<p></p><figure>\n' +
            '                <img src="./bob-ross-oak_on-a-clear-day-articleLarge.jpg" alt="And there it is" loading="lazy" width="797" height="797" srcset="bob-ross-oak_on-a-clear-day-articleLarge-320w.jpg 320w, bob-ross-oak_on-a-clear-day-articleLarge-480w.jpg 480w, bob-ross-oak_on-a-clear-day-articleLarge-768w.jpg 768w, bob-ross-oak_on-a-clear-day-articleLarge-1024w.jpg 1024w, bob-ross-oak_on-a-clear-day-articleLarge.jpg 1200w" sizes="100vw">\n' +
            '                <figcaption>And there it is</figcaption>\n' +
            '            </figure><p></p>\n' +
            "<p>Do an almighty painting with us. Now we don't want him to get lonely, so we'll give him a little friend. Don't fiddle with it all day. No pressure. Just relax and watch it happen. <kbd>CMD</kbd><kbd>Q</kbd> makes us happy. <sup>If</sup> <sub>it</sub> makes you happy then it's good. <mark>Isn't it fantastic that you can change your mind and create all these happy things?</mark></p>\n" +
            `<p>Let's just <a href="http://example.com">example</a> it!</p>\n` +
            "<p>And just raise cain. Let's put some happy little clouds in our world. I'm gonna add just a tiny little amount of Prussian Blue.</p>\n" +
            '<p><a href="http://foo.bar.baz">http://foo.bar.baz</a></p>\n' +
            "<p>Isn't that fantastic? Isn't that fantastic? You can just push a little tree out of your brush like that. I sincerely wish for you every possible joy life could bring. That's what painting is all about. It should make you feel good when you paint.</p>\n" +
            "<p>Wait there's more</p>\n" +
            '<ol>\n' +
            '<li>Yes</li>\n' +
            '<li>There</li>\n' +
            '<li>Really is</li>\n' +
            '</ol>\n' +
            '<p>And a table later on</p>\n' +
            '<ul>\n' +
            '<li>bullet</li>\n' +
            '<li>lists</li>\n' +
            '<li>too</li>\n' +
            '</ul>\n' +
            '<h1 id="h1">H1</h1>\n' +
            '<h2 id="h2">H2</h2>\n' +
            '<h3 id="h3">H3</h3>\n' +
            '<h4 id="h4">H4</h4>\n' +
            '<h5 id="h5">H5</h5>\n' +
            '<h6 id="h6">H6</h6>\n' +
            "<p>Here's that table I promised</p>\n" +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '\n' +
            '<table><thead><tr><th>Key</th><th>Value</th><th></th></tr></thead><tbody><tr><td>foo</td><td>bar</td><td>a</td></tr><tr><td>fizz</td><td>bizz</td><td>b</td></tr><tr><td>baz</td><td>fuzz</td><td><em>bar</em></td></tr></tbody></table>',
        htmlSnippet:
            "<p>We touch the canvas, the canvas takes what it wants. Don't kill all your dark areas - you need them to show the light. See there how easy that is. Each highlight must have it's own private shadow.</p>",
        heroUrl: mockImages.sampleImage7,
        url: '/blog/777/we-wash-our-brush-with-odorless-thinner-poor-old-tree',
        excerpt:
            "<p>We touch the canvas, the canvas takes what it wants. Don't kill all your dark areas - you need them to show the light. See there how easy that is. Each highlight must have it's own private shadow.</p>",
        related: [],
        resolvedTag: mockTag1,
    },
    {
        id: '778',
        title: 'Van Dyke Brown is a very nice brown',
        date: '2017-01-10T00:00:00.000Z',
        tag: 'protip',
        hero: '',
        author: 'Bob Ross',
        slug: 'van-dyke-brown-is-a-very-nice-brown',
        heroAlt: '',
        originalMarkdown:
            '\n' +
            "Van Dyke Brown is a very nice brown, it's almost like a chocolate brown. Now, we're going to fluff this cloud. You can create anything that makes you happy. I was blessed with a very steady hand; and it comes in very handy when you're doing these little delicate things. This is gonna be a happy little seascape. You have to allow the paint to break to make it beautiful.\n" +
            '\n' +
            '---\n' +
            '\n' +
            'Fluff it up a little and hypnotize it. See. We take the corner of the brush and let it play back-and-forth. Nothing wrong with washing your brush.\n' +
            '\n' +
            "There isn't a rule. You just practice and find out which way works best for you. Let's put some highlights on these little trees. The sun wouldn't forget them. Pretend you're water. Just floating without any effort. Having a good day. Isn't that fantastic? The very fact that you're aware of suffering is enough reason to be overjoyed that you're alive and can experience it.\n" +
            '\n' +
            'Brown is such a nice color. It just happens - whether or not you worried about it or tried to plan it. It is a lot of fun. This piece of canvas is your world. The more we do this - the more it will do good things to our heart. Imagination is the key to painting.\n' +
            '\n' +
            "Fluff that up. Let's do it again then, what the heck. Let your imagination just wonder around when you're doing these things.\n" +
            '\n' +
            "Isn't it great to do something you can't fail at? La- da- da- da- dah. Just be happy. When things happen - enjoy them. They're little gifts.\n" +
            '\n' +
            "You can't have light without dark. You can't know happiness unless you've known sorrow. I thought today we would do a happy little picture. Painting should do one thing. It should put happiness in your heart. Just think about these things in your mind and drop em' on canvas. Nice little clouds playing around in the sky. If what you're doing doesn't make you happy - you're doing the wrong thing.\n",
        originalPath:
            '/Users/jwick/dev/other/lit-xyz/src/mock-data/docs/articles/778/index.md',
        readableDate: 'January 10, 2017',
        readTime: 2,
        htmlContent:
            "<p>Van Dyke Brown is a very nice brown, it's almost like a chocolate brown. Now, we're going to fluff this cloud. You can create anything that makes you happy. I was blessed with a very steady hand; and it comes in very handy when you're doing these little delicate things. This is gonna be a happy little seascape. You have to allow the paint to break to make it beautiful.</p>\n" +
            '<hr>\n' +
            '<p>Fluff it up a little and hypnotize it. See. We take the corner of the brush and let it play back-and-forth. Nothing wrong with washing your brush.</p>\n' +
            "<p>There isn't a rule. You just practice and find out which way works best for you. Let's put some highlights on these little trees. The sun wouldn't forget them. Pretend you're water. Just floating without any effort. Having a good day. Isn't that fantastic? The very fact that you're aware of suffering is enough reason to be overjoyed that you're alive and can experience it.</p>\n" +
            '<p>Brown is such a nice color. It just happens - whether or not you worried about it or tried to plan it. It is a lot of fun. This piece of canvas is your world. The more we do this - the more it will do good things to our heart. Imagination is the key to painting.</p>\n' +
            "<p>Fluff that up. Let's do it again then, what the heck. Let your imagination just wonder around when you're doing these things.</p>\n" +
            "<p>Isn't it great to do something you can't fail at? La- da- da- da- dah. Just be happy. When things happen - enjoy them. They're little gifts.</p>\n" +
            "<p>You can't have light without dark. You can't know happiness unless you've known sorrow. I thought today we would do a happy little picture. Painting should do one thing. It should put happiness in your heart. Just think about these things in your mind and drop em' on canvas. Nice little clouds playing around in the sky. If what you're doing doesn't make you happy - you're doing the wrong thing.</p>",
        htmlSnippet:
            "<p>Van Dyke Brown is a very nice brown, it's almost like a chocolate brown. Now, we're going to fluff this cloud. You can create anything that makes you happy. I was blessed with a very steady hand; and it comes in very handy when you're doing these little delicate things. This is gonna be a happy little seascape. You have to allow the paint to break to make it beautiful.</p>",
        heroUrl: mockImages.sampleImage9,
        url: '/blog/778/van-dyke-brown-is-a-very-nice-brown',
        excerpt: '<p>A post about anything that makes you happy.</p>',
        related: [],
        resolvedTag: mockTag1,
    },
]

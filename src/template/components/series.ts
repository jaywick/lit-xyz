import { IRelatedArticle, ITag } from '../../types'
import { html, byDateDescSorter } from '../utils'

interface SeriesArgs {
    tag: ITag
    related: IRelatedArticle[]
}

export const Series = ({ tag, related }: SeriesArgs) => {
    const shouldListRelatedArticles = related?.length > 0

    return html`
        <section class="series">
            ${shouldListRelatedArticles
                ? html`<h2><a href="/tag/${tag.key}">${tag.name}</a></h2>`
                : html`<h2>${tag.name}</h2>`}
            <div>${tag.story}</div>
            ${shouldListRelatedArticles &&
            html`<h4>More in this series</h4>
                <ul>
                    ${related.sort(byDateDescSorter).map(
                        ({ id, title, url, readableDate }) => html`
                            <li key="${id}">
                                <a href="${url}">${title}</a>
                                <span class="subtitle">${readableDate}</span>
                            </li>
                        `
                    )}
                </ul>`}
        </section>
    `
}

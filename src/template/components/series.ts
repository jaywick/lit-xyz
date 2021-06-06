import { IRelatedArticle, ITag } from '../../types'
import { html, byDateDescSorter } from '../utils'

interface SeriesArgs {
    tag: ITag
    related: IRelatedArticle[]
}

export const Series = ({ tag, related }: SeriesArgs) => {
    if (!related || !related.length) {
        return null
    }

    return html`
        <section class="series">
            <h2>${tag.name}</h2>
            <div>${tag.story}</div>
            <h4>More in this series</h4>
            <ul>
                ${related.sort(byDateDescSorter).map(
                    ({ id, title, url, readableDate }) => html`
                        <li key="${id}">
                            <a href="${url}">${title}</a>
                            <span class="subtitle">${readableDate}</span>
                        </li>
                    `
                )}
            </ul>
        </section>
    `
}

import { generateGraph } from './graph'
import { Home } from './home'
import { Page } from './page'
// import sampleData from './mock-data/sample-data.json'
import { NotFound, Redirect, serve } from './server'

main()

async function main() {
    const graph = await generateGraph()

    serve({
        '/': () => Home({ articles: graph.articles }),
        '/blog/:id/:slug?': ({ id, slug }) => {
            if (!id) {
                return new NotFound()
            }

            const article = graph.articles.find((x) => x.id === id)

            if (article) {
                if (article.slug !== slug) {
                    return new Redirect(`/blog/${id}/${article.slug}`)
                }

                return Page(article)
            }

            return new NotFound()
        },
    })
}

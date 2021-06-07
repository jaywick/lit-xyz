import { syntax } from './syntax'
import { fromMarkdown, toMarkdown } from './util'

let warningIssued: any

export default function remarkAnnotatePlugin(this: any) {
    const data = this.data()

    function add(field: string, value: any) {
        if (data[field]) data[field].push(value)
        else data[field] = [value]
    }

    if (
        !warningIssued &&
        ((this.Parser &&
            this.Parser.prototype &&
            this.Parser.prototype.blockTokenizers) ||
            (this.Compiler &&
                this.Compiler.prototype &&
                this.Compiler.prototype.visitors))
    ) {
        warningIssued = true
        console.warn(
            '[remark-annotate-plugin] Warning: please upgrade to remark 13 to use this plugin'
        )
    }

    add('micromarkExtensions', syntax())
    add('fromMarkdownExtensions', fromMarkdown())
    add('toMarkdownExtensions', toMarkdown())
}

// @ts-ignore
import safe from 'mdast-util-to-markdown/lib/util/safe'
import { Tokenizer } from 'micromark/dist/shared-types'
import { Token } from 'micromark/dist/shared-types'
import { Node } from 'unist-builder'
import { Annotation } from './html'

interface ThisTokenizer extends Tokenizer {
    enter: Function
    exit: Function
    stack: Annotation[]
}

export function fromMarkdown() {
    function enterAnnotation(this: ThisTokenizer, token: Token) {
        this.enter(
            {
                type: 'annotation',
                value: null,
                data: {},
            },
            token
        )
    }

    function top(stack: Annotation[]) {
        return stack[stack.length - 1]
    }

    function exitAnnotationTarget(this: ThisTokenizer, token: Token) {
        const target = this.sliceSerialize(token)
        const current = top(this.stack)
        current.value = target
    }

    function exitAnnotation(this: ThisTokenizer, token: Token) {
        const annotation = this.exit(token)

        annotation.data.hName = 'mark'
        annotation.data.hChildren = [
            {
                type: 'text',
                value: annotation.value,
            },
        ]
    }

    return {
        enter: {
            annotation: enterAnnotation,
        },
        exit: {
            annotationTarget: exitAnnotationTarget,
            annotation: exitAnnotation,
        },
    }
}

export function toMarkdown() {
    const startMarker = '=='
    const endMarker = '=='

    const unsafe = [
        {
            character: startMarker[0],
            inConstruct: ['phrasing', 'label', 'reference'],
        },
    ]

    function handler(node: Node, _: unknown, context: ThisTokenizer) {
        const exit = context.enter('annotation')

        const nodeValue = safe(context, node.value, {
            before: startMarker[0],
            after: endMarker[0],
        })

        let value = `${startMarker}${nodeValue}${endMarker}`

        exit()

        return value
    }

    return {
        unsafe: unsafe,
        handlers: {
            annotation: handler,
        },
    }
}

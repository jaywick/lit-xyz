import { Context } from 'mdast-util-to-markdown/types'
import { Token, Tokenizer } from 'micromark/dist/shared-types'

export interface Annotation {
    alias: string
    target: string
    value: string
}

interface ThisTokenizer extends Tokenizer {
    getData: Function
    setData: Function
    tag: Function
    raw: Function
}

export function html() {
    function enterAnnotation(this: ThisTokenizer) {
        let stack = this.getData('annotationStack')
        if (!stack) this.setData('annotationStack', (stack = []))

        stack.push({})
    }

    function top(stack: Annotation[]) {
        return stack[stack.length - 1]
    }

    function exitAnnotationAlias(this: ThisTokenizer, token: Token) {
        const alias = this.sliceSerialize(token)
        const current = top(this.getData('annotationStack'))
        current.alias = alias
    }

    function exitAnnotationTarget(this: ThisTokenizer, token: Token) {
        const target = this.sliceSerialize(token)
        const current = top(this.getData('annotationStack'))
        current.target = target
    }

    function exitAnnotation(this: ThisTokenizer) {
        const annotation = this.getData('annotationStack').pop()

        this.tag(`<mark>`)
        this.raw(annotation.target)
        this.tag(`</mark>`)
    }

    return {
        enter: {
            annotation: enterAnnotation,
        },
        exit: {
            annotationTarget: exitAnnotationTarget,
            annotationAlias: exitAnnotationAlias,
            annotation: exitAnnotation,
        },
    }
}

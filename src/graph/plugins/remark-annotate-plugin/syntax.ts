import { html } from './html'
import { Effects, NotOkay, Okay } from 'micromark/dist/shared-types'

const codes = {
    horizontalTab: -2,
    virtualSpace: -1,
    nul: 0,
    eof: null,
    space: 32,
}

function markdownLineEndingOrSpace(code: number) {
    return code < codes.nul || code === codes.space
}

function markdownLineEnding(code: number) {
    return code < codes.horizontalTab
}

export function syntax() {
    function tokenize(effects: Effects, ok: Okay, nok: NotOkay) {
        const startMarker = '=='
        const endMarker = '=='

        let data = false

        let startMarkerCursor = 0
        let endMarkerCursor = 0

        return start

        function start(code: number) {
            if (code !== startMarker.charCodeAt(startMarkerCursor))
                return nok(code)

            effects.enter('annotation')
            effects.enter('annotationMarker')

            return consumeStart(code)
        }

        function consumeStart(code: number) {
            if (startMarkerCursor === startMarker.length) {
                effects.exit('annotationMarker')
                return consumeData(code)
            }

            if (code !== startMarker.charCodeAt(startMarkerCursor)) {
                return nok(code)
            }

            effects.consume(code)
            startMarkerCursor++

            return consumeStart
        }

        function consumeData(code: number) {
            if (markdownLineEnding(code) || code === codes.eof) {
                return nok(code)
            }

            effects.enter('annotationData')
            effects.enter('annotationTarget')
            return consumeTarget(code)
        }

        function consumeTarget(code: number) {
            if (code === endMarker.charCodeAt(endMarkerCursor)) {
                if (!data) return nok(code)
                effects.exit('annotationTarget')
                effects.exit('annotationData')
                effects.enter('annotationMarker')
                return consumeEnd(code)
            }

            if (markdownLineEnding(code) || code === codes.eof) {
                return nok(code)
            }

            if (!markdownLineEndingOrSpace(code)) {
                data = true
            }

            effects.consume(code)

            return consumeTarget
        }

        function consumeEnd(code: number) {
            if (endMarkerCursor === endMarker.length) {
                effects.exit('annotationMarker')
                effects.exit('annotation')
                return ok(code)
            }

            if (code !== endMarker.charCodeAt(endMarkerCursor)) {
                return nok(code)
            }

            effects.consume(code)
            endMarkerCursor++

            return consumeEnd
        }
    }

    return {
        text: { ['='.charCodeAt(0)]: { tokenize } },
    }
}

export { html }

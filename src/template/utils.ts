export type StaticHtml = string

type TemplateStringValue =
    | string
    | number
    | boolean
    | undefined
    | null
    | string[]
    | StaticHtml

export function html(
    strings: TemplateStringsArray,
    ...values: TemplateStringValue[]
): StaticHtml {
    let result = strings[0]

    for (let i = 0; i < values.length; i++) {
        result += normalize(values[i]) + strings[i + 1]
    }

    return result
}

export function css(
    strings: TemplateStringsArray,
    ...values: TemplateStringValue[]
): StaticHtml {
    return `<style>${html(strings, ...values)}</style>`
}

function normalize(value: unknown): string {
    if (value == null || value === false) {
        return ''
    }

    if (Array.isArray(value)) {
        return value.map(normalize).join('')
    }

    if (
        typeof value === 'function' ||
        typeof value === 'object' ||
        typeof value === 'symbol'
    ) {
        throw new Error(
            `Cannot render invalid value of type ${typeof value}: ${JSON.stringify(
                value
            )}`
        )
    }

    return String(value)
}

export const byDateDescSorter = (a: { date: string }, b: { date: string }) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()

export function attr(obj: Record<string, TemplateStringValue>) {
    return Object.keys(obj).reduce((attrString, key) => {
        const value = normalize(obj[key])

        if (!value) {
            return attrString
        }

        return `${attrString} ${key}="${value}"`
    }, '')
}

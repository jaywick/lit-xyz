export type StaticHtml = string

export function html(
    strings: TemplateStringsArray,
    ...values: unknown[]
): StaticHtml {
    let result = strings[0]

    for (let i = 0; i < values.length; i++) {
        result += normalize(values[i]) + strings[i + 1]
    }

    return result
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
            `Cannot render invalid value of type ${typeof value}: ${String(
                value
            )}`
        )
    }

    return String(value)
}

export const byDateDescSorter = (a: { date: string }, b: { date: string }) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()

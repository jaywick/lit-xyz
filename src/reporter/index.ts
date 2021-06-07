import chalk, { Chalk } from 'chalk'
import util from 'util'
import { performance } from 'perf_hooks'
import { VFile } from 'vfile'

export async function log(
    errorLevel: 'WARN' | 'INFO' | 'ERROR',
    args: {
        message?: string
        data?: object
        vfile?: VFile
        filepath?: string
    }
) {
    let color: Chalk
    if (errorLevel === 'WARN') {
        color = chalk.yellow
    } else if (errorLevel === 'ERROR') {
        color = chalk.red
    } else {
        color = chalk.gray
    }

    if (args.vfile != null) {
        args.vfile.messages
            .map((entry) =>
                [
                    color(`${errorLevel.toLowerCase()} `),
                    chalk.cyan(args.filepath),
                    entry.line && chalk.yellowBright(`:${entry.line}`),
                    ' ',
                    chalk.gray(entry.ruleId + ' '),
                    entry.message,
                ]
                    .filter(Boolean)
                    .join('')
            )
            .forEach((message) => console.log(message))
    }

    console.log(
        [
            color(`${errorLevel.toLowerCase()}`),
            args.filepath && chalk.cyan(args.filepath),
            args.message,
            args.data == null ? '' : ': ' + chalk.gray(util.inspect(args.data)),
        ]
            .filter(Boolean)
            .join(' ')
    )
}

export function elapsed(startTime: number, subtaskCount: number = 0) {
    const elapsedTime = Math.round(performance.now() - startTime) + 'ms'

    const innerText =
        subtaskCount > 0 ? `${subtaskCount} in ${elapsedTime}` : elapsedTime

    return chalk.grey(`(${innerText})`)
}

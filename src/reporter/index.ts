import chalk, { Chalk } from 'chalk'
import util from 'util'
import { performance } from 'perf_hooks'
import { VFile } from 'vfile'

type Args =
    | {
          filepath: string
          data?: object
          vfile: VFile
      }
    | {
          filepath: string
          data?: object
          group: string
          message: string
      }
    | {
          message: string
      }

export async function log(errorLevel: 'WARN' | 'INFO' | 'ERROR', args: Args) {
    let color: Chalk
    if (errorLevel === 'WARN') {
        color = chalk.yellow
    } else if (errorLevel === 'ERROR') {
        color = chalk.red
    } else {
        color = chalk.gray
    }

    if ('vfile' in args) {
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
    } else if ('filepath' in args) {
        console.log(
            [
                color(`${errorLevel.toLowerCase()}`),
                chalk.cyan(args.filepath) + ':1',
                args.group,
                args.message,
                args.data == null || process.argv.includes('--no-log-data')
                    ? ''
                    : ': ' + chalk.gray(util.inspect(args.data)),
            ]
                .filter(Boolean)
                .join(' ')
        )
    } else {
        console.log(
            [color(`${errorLevel.toLowerCase()}`), args.message]
                .filter(Boolean)
                .join(' ')
        )
    }
}

export function elapsed(startTime: number, subtaskCount: number = 0) {
    const elapsedTime = Math.round(performance.now() - startTime) + 'ms'

    const innerText =
        subtaskCount > 0 ? `${subtaskCount} in ${elapsedTime}` : elapsedTime

    return chalk.grey(`(${innerText})`)
}

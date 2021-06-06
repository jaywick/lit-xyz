import chalk, { Chalk } from 'chalk'
import util from 'util'
import ora from 'ora'
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
                    chalk.cyan(args.filepath),
                    entry.line && chalk.yellowBright(`:${entry.line}`),
                    '\t',
                    color(`${errorLevel.toLowerCase()} `),
                    chalk.gray(entry.ruleId + '\t'),
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

export async function withProgress(
    title: string,
    work: (progress: (total: number) => void) => void | Promise<void>
): Promise<boolean> {
    const reporter = ora(title)
    const startTime = performance.now()
    reporter.start(title)

    let innerTotal = 0
    try {
        let i = 0

        const progressFn = (total: number) => {
            innerTotal = total
            reporter.text = `${title} (${i}/${total})`
            ++i
        }

        await work(progressFn)
    } catch (err) {
        console.error(err)
        reporter.fail(`${title} ${chalk.gray(elapsed(startTime, innerTotal))}`)
        return false
    }

    reporter.succeed(`${title} ${chalk.gray(elapsed(startTime, innerTotal))}`)
    return true
}

export function elapsed(startTime: number, subtaskCount: number = 0) {
    const elapsedTime = Math.round(performance.now() - startTime) + 'ms'

    const innerText =
        subtaskCount > 0 ? `${subtaskCount} in ${elapsedTime}` : elapsedTime

    return chalk.grey(`(${innerText})`)
}

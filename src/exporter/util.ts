import chalk from 'chalk'
import ora from 'ora'
import { performance } from 'perf_hooks'

export async function reportProgress(
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

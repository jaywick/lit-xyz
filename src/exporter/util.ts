import ora, { Ora } from 'ora'
import { performance } from 'perf_hooks'

export const DRY_RUN = !!process.env.DRY_RUN

export async function reportProgress(
    title: string,
    work: (progress: (total: number) => void) => void | Promise<void>
) {
    const reporter = ora(title)
    const startTime = performance.now()
    reporter.start(title)

    try {
        let progressReporter: Ora | undefined = undefined
        let innerTotal = 0
        let i = 0
        const progressFn = (total: number) => {
            if (progressReporter == null) {
                innerTotal = total
                progressReporter = ora(title)
                progressReporter.prefixText = ' '
                progressReporter.start()
            }

            progressReporter.text = `${i}/${total} processed`
            ++i
        }
        await Promise.resolve(work(progressFn))

        if (progressReporter != null) {
            progressReporter!.info(`${innerTotal} processed`)
        }
    } catch (err) {
        console.error(err)
        reporter.fail(`${title} (${elapsed(startTime)}ms)`)
        return
    }

    reporter.succeed(`${title} (${elapsed(startTime)}ms)`)
}

function elapsed(startTime: number) {
    return Math.round(performance.now() - startTime)
}

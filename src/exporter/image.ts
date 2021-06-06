import { promises as fs } from 'fs'
import Jimp from 'jimp'
import paths from 'path'
import { Directory } from '../graph/util'
import { log } from '../reporter'
import { IImage } from '../types'

interface Args {
    image: IImage
    dist: Directory
}

export async function resizeImage({ image, dist }: Args): Promise<void> {
    if (global.args.skipImages || image.originalPath.endsWith('.gif')) {
        await fs.copyFile(
            image.originalPath,
            paths.join(dist.path, image.relativePath)
        )
        return
    }

    const outputFolder = paths.resolve(dist.path, image.relativePath, '..')

    await Promise.allSettled([
        resize(image.originalPath, outputFolder, [320, 320], '-320w'),
        resize(image.originalPath, outputFolder, [480, 480], '-480w'),
        resize(image.originalPath, outputFolder, [768, 768], '-768w'),
        resize(image.originalPath, outputFolder, [1024, 1024], '-1024w'),
        resize(image.originalPath, outputFolder, [1200, 1200]),
    ])
}

async function resize(
    filepath: string,
    outputfolder: string,
    [width, height]: [number, number],
    suffix = ''
): Promise<void> {
    const extension = paths.extname(filepath)
    const nameNoExt = paths.basename(filepath, extension)

    const newPath = paths.join(
        outputfolder,
        `${nameNoExt}${suffix}${extension}`
    )

    try {
        const image = await Jimp.read(filepath)
        await image.scaleToFit(width, height).quality(100).writeAsync(newPath)
    } catch (err) {
        log('ERROR', { message: `Failed to resize`, filepath })
        throw err
    }
}

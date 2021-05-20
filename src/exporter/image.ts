import { promises as fs } from 'fs'
import Jimp from 'jimp'
import paths from 'path'
import { IImage } from '../types'

export async function resizeImage(image: IImage, dist: string): Promise<void> {
    if (global.args.skipImages) {
        fs.copyFile(image.originalPath, paths.join(dist, image.relativePath))
        return
    }

    const outputFolder = paths.resolve(dist, image.relativePath, '..')

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
        console.error(`Failed to resize ${filepath}`)
        throw err
    }
}

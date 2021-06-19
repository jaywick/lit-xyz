import { promises as fs } from 'fs'
import Jimp from 'jimp'
import paths from 'path'
import { Directory, File } from '../graph/util'
import { log } from '../reporter'
import { IImage } from '../types'

interface Args {
    image: IImage
    dist: Directory
    skipResize: boolean
}

export async function resizeImage({
    image,
    dist,
    skipResize,
}: Args): Promise<void> {
    const imageRelativeUrl = image.imageUrl.slice(1) // remove leading `/`

    const outputFolder = await dist
        .file(imageRelativeUrl)
        .parent.createIfMissing()

    if (skipResize || image.file.isExtensionOneOf('.gif')) {
        await image.file.copyTo(outputFolder)
        return
    }

    await Promise.allSettled([
        resize(image.file, outputFolder, [320, 320], '-320w'),
        resize(image.file, outputFolder, [480, 480], '-480w'),
        resize(image.file, outputFolder, [768, 768], '-768w'),
        resize(image.file, outputFolder, [1024, 1024], '-1024w'),
        resize(image.file, outputFolder, [1200, 1200]),
    ])
}

async function resize(
    file: File,
    destination: Directory,
    [width, height]: [number, number],
    suffix = ''
): Promise<void> {
    const newFile = destination.file(
        `${file.extensionlessFilename}${suffix}${file.extension}`
    )

    try {
        const image = await Jimp.read(file.path)
        await image
            .scaleToFit(width, height)
            .quality(100)
            .writeAsync(newFile.path)
    } catch (err) {
        log('ERROR', {
            message: `Failed to resize`,
            group: 'image-resize',
            filepath: file.path,
            data: { source: file.path, destination: destination.path },
        })
        throw err
    }
}

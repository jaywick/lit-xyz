import Jimp from 'jimp'
import { IImage } from '../types'
import { File } from './util'

export async function resolveImage(file: File): Promise<IImage> {
    return new Promise(
        (resolve) =>
            new Jimp(file.path, function (_, image) {
                resolve({
                    originalPath: file.path,
                    width: image.bitmap.height,
                    height: image.bitmap.height,
                    relativePath: `blog/${file.parent.name}/${file.name}`,
                })
            })
    )
}

import Jimp from 'jimp'
import { IImage } from '../types'
import { File } from './util'

export async function resolveImage(file: File): Promise<Omit<IImage, 'kind'>> {
    return new Promise(
        (resolve) =>
            new Jimp(file.path, function (_, image) {
                resolve({
                    file,
                    width: image.bitmap.height,
                    height: image.bitmap.height,
                    imageUrl: '',
                })
            })
    )
}

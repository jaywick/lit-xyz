import { parse as parseYaml } from 'yaml'
import { IAbout } from '../types'
import { File } from './util'

export async function resolveAbout(file: File): Promise<IAbout> {
    const markdownWithFrontmatter = await file.readContent()
    return parseYaml(markdownWithFrontmatter) as IAbout
}

import { parse as parseYaml } from 'yaml'
import { log } from '../reporter'
import { IAbout, ITag } from '../types'
import { File, requirer } from './util'

export async function resolveAbout(file: File): Promise<IAbout> {
    const content = await file.readContent()
    const parsed = parseYaml(content) as IAbout

    const required = requirer(file.path)

    return {
        author: required(parsed.author, 'author'),
        description: required(parsed.description, 'description'),
        tagline: required(parsed.tagline, 'tagline'),
        themeColor: required(parsed.themeColor, 'themeColor'),
        title: required(parsed.title, 'title'),
    }
}

export async function resolveTags(file: File): Promise<ITag[]> {
    const content = await file.readContent()
    const parsed = parseYaml(content) as ITag[]

    if (!Array.isArray(parsed)) {
        log('ERROR', { message: 'Invalid tags', filepath: file.path })
    }

    const required = requirer(file.path)

    return parsed.map((t, i) => ({
        hero: required(t.hero, 'hero'),
        key: required(t.key, 'key'),
        name: required(t.name, 'name'),
        story: required(t.story, 'story'),
        aliases: t.aliases || [],
        urls: t.urls || [],
    }))
}

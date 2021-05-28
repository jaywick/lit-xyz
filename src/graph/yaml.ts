import { parse as parseYaml } from 'yaml'
import { IAbout, ITag } from '../types'
import { File, required } from './util'

export async function resolveAbout(file: File): Promise<IAbout> {
    const content = await file.readContent()
    const parsed = parseYaml(content) as IAbout

    return {
        author: required(parsed.author, "Missing 'author' in about yaml"),
        description: required(
            parsed.description,
            "Missing 'description' in about yaml"
        ),
        tagline: required(parsed.tagline, "Missing 'tagline' in about yaml"),
        themeColor: required(
            parsed.themeColor,
            "Missing 'themeColor' in about yaml"
        ),
        title: required(parsed.title, "Missing 'title' in about yaml"),
    }
}

export async function resolveTags(file: File): Promise<ITag[]> {
    const content = await file.readContent()
    const parsed = parseYaml(content) as ITag[]

    if (!Array.isArray(parsed)) {
        console.error(`Invalid tags set in ${file.path}`)
    }

    return parsed.map((t, i) => ({
        hero: required(t.hero, `Missing hero in tag #${i}`),
        key: required(t.key, `Missing key in tag #${i}`),
        name: required(t.name, `Missing name in tag #${i}`),
        story: required(t.story, `Missing story in tag #${i}`),
        aliases: t.aliases || [],
        urls: t.urls || [],
    }))
}

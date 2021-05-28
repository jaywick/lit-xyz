import paths from 'path'
import { existsSync, promises as fs } from 'fs'

class FileSystemObject {
    path: string

    constructor(...pathParts: string[]) {
        this.path = paths.resolve(...pathParts)
    }

    get name(): string {
        return paths.basename(this.path)
    }

    get parent(): Directory {
        return new Directory(paths.dirname(this.path))
    }

    ensureExists(): this {
        if (!existsSync(this.path)) {
            throw new Error(`File not found: ${this.path}`)
        }
        return this
    }
}

export class File extends FileSystemObject {
    async writeContent(content: string) {
        await fs.writeFile(this.path, content)
    }

    async readContent(): Promise<string> {
        return String(await fs.readFile(this.path))
    }

    isExtensionOneOf(...extensionsIncludingDot: string[]): boolean {
        return extensionsIncludingDot.some(
            (x) =>
                x.toLocaleLowerCase() ===
                paths.extname(this.path).toLocaleLowerCase()
        )
    }
    get extension(): string {
        return paths.extname(this.path)
    }
}

export class Directory extends FileSystemObject {
    async *subdirectories() {
        for (const child of await fs.readdir(this.path)) {
            const childPath = paths.resolve(this.path, child)
            const stat = await fs.lstat(childPath)

            if (stat.isDirectory()) {
                yield new Directory(childPath)
            }
        }
    }

    async *files() {
        for (const child of await fs.readdir(this.path)) {
            const childPath = paths.resolve(this.path, child)
            const stat = await fs.lstat(childPath)

            if (stat.isFile()) {
                yield new File(childPath)
            }
        }
    }
}

export const required = (value: any, errorMessageIfMissing: string) => {
    if (value == null || String(value).trim() === '') {
        console.error(errorMessageIfMissing)
        return ''
    }

    return value
}

export type nil = null | undefined

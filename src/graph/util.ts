import paths from 'path'
import { existsSync, lstatSync, promises as fs } from 'fs'

abstract class FileSystemObject {
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

    abstract exists(): boolean
}

export class File extends FileSystemObject {
    async writeContent(content: string) {
        await fs.writeFile(this.path, content)
    }

    async readContent(): Promise<string> {
        return String(await fs.readFile(this.path))
    }

    async readContentOrEmpty(): Promise<string> {
        if (!this.exists()) {
            return ''
        }

        return this.readContent()
    }

    async streamContent(): Promise<Buffer> {
        return fs.readFile(this.path)
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

    exists(): boolean {
        try {
            const stat = lstatSync(this.path)
            return stat.isFile()
        } catch {
            return false
        }
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

    exists(): boolean {
        try {
            const stat = lstatSync(this.path)
            return stat.isDirectory()
        } catch {
            return false
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

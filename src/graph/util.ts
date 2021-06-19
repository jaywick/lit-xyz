import paths from 'path'
import { existsSync, lstatSync, promises as fs } from 'fs'
import { log } from '../reporter'
import md5file from 'md5-file'

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

    async md5() {
        return await md5file(this.path)
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

    async copyTo(directory: Directory) {
        await fs.copyFile(this.path, directory.file(this.name).path)
    }

    get extensionlessFilename(): string {
        return paths.parse(this.path).name
    }
}

export class Directory extends FileSystemObject {
    async createIfMissing() {
        await fs.mkdir(this.path, { recursive: true })
        return this
    }

    async deleteAllDescendants() {
        await fs.rmdir(this.path, { recursive: true })
        await fs.mkdir(this.path, { recursive: true })
    }

    subdirectory(...pathParts: string[]) {
        return new Directory(this.path, ...pathParts)
    }

    file(...pathParts: string[]) {
        return new File(this.path, ...pathParts)
    }

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

export const requirer = (path: string) => (value: any, key: string) => {
    if (value == null || String(value).trim() === '') {
        log('ERROR', {
            message: `Missing value for required key`,
            filepath: path,
            data: { key },
            group: 'requirer',
        })
        return ''
    }

    return value
}

export type nil = null | undefined

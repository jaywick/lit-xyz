import paths from 'path'
import { promises as fs } from 'fs'

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

    async readContent(): Promise<string> {
        return String(await fs.readFile(this.path))
    }
}

export class File extends FileSystemObject {
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

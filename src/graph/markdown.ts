import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
// @ts-ignore
import remarkPrism from 'remark-prism'
// @ts-ignore
import remarkSlug from 'remark-slug'
import rehypeRaw from 'rehype-raw'
import unified from 'unified'
import parseMarkdown from 'gray-matter'
import { lazyImages } from './lazy-images-plugin'
import { IArticle, IFrontmatter } from '../types'
import remark from 'remark'
// @ts-ignore
import styleGuide from 'remark-preset-lint-markdown-style-guide'
import { Directory, File } from './util'
import { VFile } from 'vfile'
import chalk from 'chalk'
// @ts-ignore
import remarkLintBlockquoteIndentation from 'remark-lint-blockquote-indentation'
// @ts-ignore
import remarkLintCheckboxCharacterStyle from 'remark-lint-checkbox-character-style'
// @ts-ignore
import remarkLintCheckboxContentIndent from 'remark-lint-checkbox-content-indent'
// @ts-ignore
import remarkLintCodeBlockStyle from 'remark-lint-code-block-style'
// @ts-ignore
import remarkLintDefinitionCase from 'remark-lint-definition-case'
// @ts-ignore
import remarkLintDefinitionSpacing from 'remark-lint-definition-spacing'
// @ts-ignore
import remarkLintEmphasisMarker from 'remark-lint-emphasis-marker'
// @ts-ignore
import remarkLintFencedCodeFlag from 'remark-lint-fenced-code-flag'
// @ts-ignore
import remarkLintFencedCodeMarker from 'remark-lint-fenced-code-marker'
// @ts-ignore
import remarkLintFileExtension from 'remark-lint-file-extension'
// @ts-ignore
import remarkLintFinalDefinition from 'remark-lint-final-definition'
// @ts-ignore
import remarkLintHardBreakSpaces from 'remark-lint-hard-break-spaces'
// @ts-ignore
import remarkLintHeadingIncrement from 'remark-lint-heading-increment'
// @ts-ignore
import remarkLintLinebreakStyle from 'remark-lint-linebreak-style'
// @ts-ignore
import remarkLintLinkTitleStyle from 'remark-lint-link-title-style'
// @ts-ignore
import remarkLintListItemBulletIndent from 'remark-lint-list-item-bullet-indent'
// @ts-ignore
import remarkLintListItemContentIndent from 'remark-lint-list-item-content-indent'
// @ts-ignore
import remarkLintListItemSpacing from 'remark-lint-list-item-spacing'
// @ts-ignore
import remarkLintNoAutoLinkWithoutProtocol from 'remark-lint-no-auto-link-without-protocol'
// @ts-ignore
import remarkLintNoBlockquoteWithoutMarker from 'remark-lint-no-blockquote-without-marker'
// @ts-ignore
import remarkLintNoDuplicateDefinedUrls from 'remark-lint-no-duplicate-defined-urls'
// @ts-ignore
import remarkLintNoDuplicateDefinitions from 'remark-lint-no-duplicate-definitions'
// @ts-ignore
import remarkLintNoDuplicateHeadings from 'remark-lint-no-duplicate-headings'
// @ts-ignore
import remarkLintNoDuplicateHeadingsInSection from 'remark-lint-no-duplicate-headings-in-section'
// @ts-ignore
import remarkLintNoEmphasisAsHeading from 'remark-lint-no-emphasis-as-heading'
// @ts-ignore
import remarkLintNoEmptyUrl from 'remark-lint-no-empty-url'
// @ts-ignore
import remarkLintNoFileNameArticles from 'remark-lint-no-file-name-articles'
// @ts-ignore
import remarkLintNoFileNameConsecutiveDashes from 'remark-lint-no-file-name-consecutive-dashes'
// @ts-ignore
import remarkLintNoFileNameIrregularCharacters from 'remark-lint-no-file-name-irregular-characters'
// @ts-ignore
import remarkLintNoFileNameMixedCase from 'remark-lint-no-file-name-mixed-case'
// @ts-ignore
import remarkLintNoFileNameOuterDashes from 'remark-lint-no-file-name-outer-dashes'
// @ts-ignore
import remarkLintNoHeadingContentIndent from 'remark-lint-no-heading-content-indent'
// @ts-ignore
import remarkLintNoHeadingIndent from 'remark-lint-no-heading-indent'
// @ts-ignore
import remarkLintNoHeadingLikeParagraph from 'remark-lint-no-heading-like-paragraph'
// @ts-ignore
import remarkLintNoHtml from 'remark-lint-no-html'
// @ts-ignore
import remarkLintNoInlinePadding from 'remark-lint-no-inline-padding'
// @ts-ignore
import remarkLintNoLiteralUrls from 'remark-lint-no-literal-urls'
// @ts-ignore
import remarkLintNoParagraphContentIndent from 'remark-lint-no-paragraph-content-indent'
// @ts-ignore
import remarkLintNoReferenceLikeUrl from 'remark-lint-no-reference-like-url'
// @ts-ignore
import remarkLintNoShellDollars from 'remark-lint-no-shell-dollars'
// @ts-ignore
import remarkLintNoShortcutReferenceImage from 'remark-lint-no-shortcut-reference-image'
// @ts-ignore
import remarkLintNoShortcutReferenceLink from 'remark-lint-no-shortcut-reference-link'
// @ts-ignore
import remarkLintNoTableIndentation from 'remark-lint-no-table-indentation'
// @ts-ignore
import remarkLintNoTabs from 'remark-lint-no-tabs'
// @ts-ignore
import remarkLintNoUndefinedReferences from 'remark-lint-no-undefined-references'
// @ts-ignore
import remarkLintNoUnneededFullReferenceImage from 'remark-lint-no-unneeded-full-reference-image'
// @ts-ignore
import remarkLintNoUnneededFullReferenceLink from 'remark-lint-no-unneeded-full-reference-link'
// @ts-ignore
import remarkLintNoUnusedDefinitions from 'remark-lint-no-unused-definitions'
// @ts-ignore
import remarkLintOrderedListMarkerStyle from 'remark-lint-ordered-list-marker-style'
// @ts-ignore
import remarkLintOrderedListMarkerValue from 'remark-lint-ordered-list-marker-value'
// @ts-ignore
import remarkLintStrongMarker from 'remark-lint-strong-marker'
// @ts-ignore
import remarkLintTableCellPadding from 'remark-lint-table-cell-padding'
// @ts-ignore
import remarkLintTablePipeAlignment from 'remark-lint-table-pipe-alignment'
// @ts-ignore
import remarkLintTablePipes from 'remark-lint-table-pipes'
// @ts-ignore
import remarkLintUnorderedListMarkerStyle from 'remark-lint-unordered-list-marker-style'

const requirer =
    (context: string) =>
    <T extends {}>(obj: T, key: keyof T) => {
        if (obj[key] == null || String(obj[key]).trim() === '') {
            console.error(`Missing ${key} in ${context}`)
            return ''
        }

        return obj[key]
    }

export async function resolveArticle(
    docFolder: Directory,
    file: File
): Promise<IArticle | null> {
    const id = file.parent.name
    const markdown = await file.readContent()
    const { content, data } = parseMarkdown(markdown)
    const frontmatter = data as IFrontmatter

    await lint(file.path, markdown)

    const htmlContent = await transformMarkdown(content).catch((x) => {
        console.error(x)
        return null
    })

    if (htmlContent === null) {
        return null
    }

    const { title, date, tag, hero } = frontmatter

    const { slug = slugify(title), heroAlt = '' } = frontmatter

    return {
        title,
        date,
        tag,
        hero,

        id,
        author: 'Jay Wick',
        slug,
        heroAlt,

        originalMarkdown: content,
        readableDate: readableDate(date),
        readTime: readTime(content),
        htmlContent,
        heroStaticPath: `/blog/${id}/${hero}`,
        url: `/blog/${id}/${slug}`,
        related: [],
    }
}

async function transformMarkdown(text: string): Promise<string> {
    const processor = unified()
        .use(remarkParse)
        .use(remarkSlug)
        .use(remarkPrism)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .use(lazyImages)

    const result = await processor.process(text)
    return String(result)
}

const readableDate = (value: string) => {
    return new Date(Date.parse(value)).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const readTime = (content: string) => {
    const READ_SPEED = 250 // wpm
    const IMAGE_SPEED = 5 / 60 // 5s per image

    const words = content.match(/[\w-]+/g)?.length ?? 0
    const images = content.match(/\!\[.+?\]\(.+?\)/g)?.length ?? 0
    return Math.ceil(words / READ_SPEED + images * IMAGE_SPEED)
}

const slugify = (string: string) => {
    return string
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036F]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
}

const report = (path: string, vfile: VFile): string => {
    return vfile.messages
        .map((entry) =>
            [
                chalk.cyan(path),
                entry.line && chalk.yellowBright(`:${entry.line}`),
                '\t',
                chalk.yellow('warn '),
                chalk.gray(entry.ruleId + '\t'),
                entry.message,
            ]
                .filter(Boolean)
                .join('')
        )
        .join('\n')
}

const lint = async (path: string, markdown: string) => {
    const vfile = await remark()
        .use(remarkLintBlockquoteIndentation)
        .use(remarkLintCheckboxCharacterStyle)
        .use(remarkLintCheckboxContentIndent)
        .use(remarkLintCodeBlockStyle)
        .use(remarkLintDefinitionCase)
        .use(remarkLintDefinitionSpacing)
        .use(remarkLintEmphasisMarker)
        .use(remarkLintFencedCodeFlag)
        .use(remarkLintFencedCodeMarker)
        .use(remarkLintFileExtension)
        .use(remarkLintFinalDefinition)
        .use(remarkLintHardBreakSpaces)
        .use(remarkLintHeadingIncrement)
        .use(remarkLintLinebreakStyle)
        .use(remarkLintLinkTitleStyle)
        .use(remarkLintListItemBulletIndent)
        .use(remarkLintListItemContentIndent)
        .use(remarkLintListItemSpacing)
        .use(remarkLintNoAutoLinkWithoutProtocol)
        .use(remarkLintNoBlockquoteWithoutMarker)
        .use(remarkLintNoDuplicateDefinedUrls)
        .use(remarkLintNoDuplicateDefinitions)
        .use(remarkLintNoDuplicateHeadings)
        .use(remarkLintNoDuplicateHeadingsInSection)
        .use(remarkLintNoEmphasisAsHeading)
        .use(remarkLintNoEmptyUrl)
        .use(remarkLintNoFileNameArticles)
        .use(remarkLintNoFileNameConsecutiveDashes)
        .use(remarkLintNoFileNameIrregularCharacters)
        .use(remarkLintNoFileNameMixedCase)
        .use(remarkLintNoFileNameOuterDashes)
        .use(remarkLintNoHeadingContentIndent)
        .use(remarkLintNoHeadingIndent)
        .use(remarkLintNoHeadingLikeParagraph)
        .use(remarkLintNoHtml)
        .use(remarkLintNoInlinePadding)
        .use(remarkLintNoLiteralUrls)
        .use(remarkLintNoParagraphContentIndent)
        .use(remarkLintNoReferenceLikeUrl)
        .use(remarkLintNoShellDollars)
        .use(remarkLintNoShortcutReferenceImage)
        .use(remarkLintNoShortcutReferenceLink)
        .use(remarkLintNoTableIndentation)
        .use(remarkLintNoTabs)
        .use(remarkLintNoUndefinedReferences)
        .use(remarkLintNoUnneededFullReferenceImage)
        .use(remarkLintNoUnneededFullReferenceLink)
        .use(remarkLintNoUnusedDefinitions)
        .use(remarkLintOrderedListMarkerStyle)
        .use(remarkLintOrderedListMarkerValue)
        .use(remarkLintStrongMarker)
        .use(remarkLintTableCellPadding)
        .use(remarkLintTablePipeAlignment)
        .use(remarkLintTablePipes)
        .use(remarkLintUnorderedListMarkerStyle)
        .process(markdown)

    const reports = report(path, vfile)
    reports && console.warn(reports)
}

// export const remarkLintImages = () => {
//     const imageTags = Array.from(
//         // regex captures images with format ![alt text](path/to/image "title text")
//         matchAll(mdxNode.rawBody, /!\[(.*?)\]\((.+?)( \".+?\")?\)/g),
//     )

//     const localImages = imageTags
//         .map(match => {
//             return {
//                 alt: match[1],
//                 filename: match[2],
//             }
//         })
//         .filter(({ filename }) => filename.startsWith('./'))

//     localImages.forEach(({ alt, filename }) => {
//         const imagePath = join(fileNode.absolutePath, '..', filename)

//         if (!pathExistsSync(imagePath)) {
//             reporter.error(
//                 `Missing referenced image in ${fileNode.absolutePath} called '${filename}'`,
//             )
//         }

//         if (isBlank(alt)) {
//             reporter.info(
//                 `Missing alt text for image ${filename} in ${fileNode.relativePath}`,
//             )
//         }
//     })

//     const folderPath = join(fileNode.absolutePath, '..')
//     const attachments = readdirSync(folderPath).filter(
//         filepath => !filepath.endsWith('.mdx') && !filepath.endsWith('.md'),
//     )

//     const orphans = difference(
//         attachments.map(x => `./${x}`),
//         localImages.map(x => x.filename),
//     )
//     orphans.forEach(filename => {
//         reporter.info(
//             `Orphaned attachment in ${fileNode.relativeDirectory}/: "${filename}"`,
//         )
//     })
// }

// function isBlank(text: string | null | undefined) {
//     if (!text) {
//         return true
//     }

//     return !text.trim()
// }

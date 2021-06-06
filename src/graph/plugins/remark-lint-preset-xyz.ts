import remark from 'remark'

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
import remarkLintNoIllegalHtml from './remark-lint-no-illegal-html'
import { log } from '../../reporter'

export const lint = async (path: string, markdown: string) => {
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
        .use(remarkLintNoIllegalHtml)
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

    vfile.messages.length > 0 && log('WARN', { filepath: path, vfile })
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

export function imageUrlCleanUp(docUrl: string) {
    return docUrl.substring(docUrl.indexOf('\\') + 1, docUrl.length);
}
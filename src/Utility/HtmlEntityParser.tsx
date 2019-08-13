export default function ParseHtmlEntity(oldString: string, parser: DOMParser) {
    return parser.parseFromString(oldString, 'text/html').body.textContent;
}
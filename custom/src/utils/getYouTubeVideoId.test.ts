import { getYouTubeVideoId } from "./getYouTubeVideoId"

describe('getYoutubeVideoId', () => {
    const testCases: { url: string; expected: string | null } [] = [
        { url: 'https://www.youtube.com/watch?v=abc123XYZ', expected: 'abc123XYZ' },
        { url: 'https://youtube.com/watch?v=abc123XYZ', expected: 'abc123XYZ' },
        { url: 'https://m.youtube.com/watch?v=abc123XYZ', expected: 'abc123XYZ' },
        { url: 'https://youtu.be/abc123XYZ', expected: 'abc123XYZ' },
        { url: 'https://www.youtube.com/embed/abc123XYZ', expected: 'abc123XYZ' },
        { url: 'https://www.youtube.com/live/abc123XYZ', expected: 'abc123XYZ' },
        { url: 'https://m.youtube.com/live/abc123XYZ', expected: 'abc123XYZ' },
        { url: 'https://youtube.com/live/abc123XYZ', expected: 'abc123XYZ' },
        { url: 'https://www.youtube.com/watch?v=abc123XYZ&t=120S', expected: 'abc123XYZ' },

        // Invalid cases
        { url: 'https://www.youtube.com/', expected: null },
        { url: 'https://youtube.com/live/', expected: null },
        { url: 'https://youtu.be/', expected: null },
        { url: 'not a url', expected: null },
        { url: '', expected: null },
    ]

    testCases.forEach(({ url, expected }) => {
        it(`Should return ${expected} for the URL ${url}`, () => {
            expect(getYouTubeVideoId(url)).toBe(expected)
        })
    })
})
// Takes a string type URL parameter & returns a video ID string or null.
export const getYouTubeVideoId = (url: string): string | null => {
    const youtubeLinkPatterns = [
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^"?]+)/,              // Embed URL
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^"&?/]+)/,          // Long URL
        /(?:https?:\/\/)?(?:m\.)?youtube\.com\/watch\?v=([^"&?/]+)/,            // Mobile URL
        /(?:https?:\/\/)?youtu\.be\/([^"&?/]+)/,                                // Short URL
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([^"?]+)/,               // Live stream URL
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^"&?/]+)&t=\d+S/,   // Long URL with timestamp
        /(?:https?:\/\/)?(?:m\.)?youtube\.com\/live\/([^"?]+)/,                 // Mobile live stream URL
        /(?:https?:\/\/)?youtube\.com\/live\/([^"?]+)/                          // No subdomain live stream
    ]

    for (const pattern of youtubeLinkPatterns) {
        const match = url.match(pattern)
        if (match) {
            return match[1]
        }
    }
    return null
}
import { showNotification } from "./showNotification.js"

export const copyUrl = (url: string) => {
    // Try to cpy the url using the clipboard API.
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
            .then(() => {
                showNotification('success', 'Se copió el enlace.')
            })
            .catch(error => {
                console.error(`Failed to copy the url. ${error}`)
                showNotification('error', 'Error al copiar el enlace.')
            })
    } else {
        // Fallback for browsers that do not support the clipboard API.
        showNotification('success', `Url copiada: ${url}`)
    }
}

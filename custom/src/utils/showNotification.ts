const d = document

export const showNotification = (type: "success" | "error", message: string) => {
    let notification = d.getElementById('custom-notification')

    // Create element if it doesn't exist yet.
    if (!notification) {
        notification = d.createElement('div')
        notification.id = 'custom-notification'
        d.body.appendChild(notification)
    }
    
    notification.className = ''
    notification.classList.add('show', type)

    const icon = type === 'success'
        ? '<i class="fa-solid fa-check"></i>'
        : '<i class="fa-solid fa-triangle-exclamation"></i>'

    notification.innerHTML = `${icon} <span>${message}</span>`

    // Hide after 2 seconds.
    setTimeout(() => {
        notification?.classList.remove('show')
    }, 2000)
}
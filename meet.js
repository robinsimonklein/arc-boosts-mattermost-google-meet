const MATTERMOST_ORIGIN = 'https://your-mattermost-url.com'

document.addEventListener('DOMContentLoaded', () => {
	// Ignore if window has not been opened from Mattermost
	if (!window.opener) return

	const interval = setInterval(() => {
		// Skip if room code has not been generated yet
		if (!location.pathname.match(/[a-z|-]{10,}/)) return;

		// Clean URL
		const url = new URL(window.location.pathname, window.location.origin).toString();

		// Send to Mattermost window
		window.opener.postMessage({ url }, MATTERMOST_ORIGIN);

		clearInterval(interval);
	}, 200)
})

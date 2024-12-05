let input;
let meetWindow;

function reset() {
	input = null;
	meetWindow = null;
}

function sendMessage(message) {
	// Replace input value
	if(!input) return;
	input.value = message;
	input.dispatchEvent(new Event('input', { bubbles: true }));

	// Submit form
	if(!input.form) return;
	input.form.requestSubmit();
}

window.addEventListener('message', (event) => {
	// Ignore if not from Google Meet
	if(event.origin !== 'https://meet.google.com') return;

	// Ignore if no URL given in data
	if(typeof event.data?.url !== 'string') return;

	const url = event.data.url

	// Ignore if URL value is not a meet url
	if(!url.includes('meet.google')) return;

	// Focus Mattermost window
	meetWindow.blur()
	window.focus()

	sendMessage(url);

	// Focus Google Meet window again
	window.blur();
	meetWindow.focus();

	reset();
});

window.addEventListener('keydown', async (e) => {
	// Ignore if not Enter
	if (e.code !== 'Enter') return;

	// Ignore if not in textbox
	if (!['post_textbox', 'reply_textbox'].includes(e.target.id)) return

	// Ignore if not "/meet"
	const value = e.target.value;
	if (value.trim() !== '/meet') return

	e.preventDefault();

	input = e.target;
	input.value = '';

	meetWindow = window.open('https://meet.new');
})

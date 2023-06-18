////////////////////
// username input //
////////////////////
// VARIABLES from HTML and LocalSotrage
const input = document.getElementById('fname');
input.focus();
let storageUsername = localStorage.getItem('discoverUserName');
let userCardDisplay = document
	.getElementById('user-card-display');
let userCardInput = document
	.getElementById('user-card-input');
let userNameSpan = document.getElementById('username');
const lastVisitSpan = document.getElementById('last-visit');
const today = Number(Date.now());
let lastVisit = Number(localStorage.getItem('lastVisit'));

// FUNCTION calculate visits interval
const visitsInterval = (today, lastVisit) => {
	return lastVisit === 0 ? 0 : ((today - lastVisit) / 86400) >= 1 ?
	((today - lastVisit) / 86400).toFixed(0) : 0;
}

// calculate visits interval
let lastVisitInterval = visitsInterval();

// FUNCTION display username
const displayUsername = () => {
	userCardDisplay.style.display = 'flex';
	userCardInput.style.display = 'none';

	storageUsername = localStorage.getItem('discoverUserName');
	lastVisitInterval = visitsInterval(today, lastVisit);

	userNameSpan.innerText = lastVisitInterval == 0 ? 'Welcome ' + storageUsername
		: 'Welcome back ' + storageUsername;
	lastVisitSpan.innerText = lastVisitInterval == 0 ? '' :
		'It\'s been ' + lastVisitInterval + ' since your last visit'

	localStorage.setItem('lastVisit', today)
}

// FUNCTION edit user info
const editUserInfo = () => {
	userCardInput.style.display = 'flex';
	userCardDisplay.style.display = 'none';
	input.value = '';
	input.focus();
}

// initial status check
if (localStorage.getItem('discoverUserName')) {
	// show username input options
	displayUsername();
} else {
	// show welcome message
	editUserInfo();
}

// enter behavior
input.addEventListener(
	"keydown",
	(event) => {
		// modern approach
		if (event.key !== undefined) {
			if (event.key === 'Enter' && input.value !== '') {
				event.preventDefault();
				if (input.value !== '') {
					localStorage.setItem('discoverUserName', input.value)
					localStorage.setItem('lastVisit', '0');
					lastVisit = 0;
					lastVisitInterval = visitsInterval();
					displayUsername();
				}
			}
			// deprecated way
		} else if (event.keyCode === 13) {
			event.preventDefault();
		}
	}
);

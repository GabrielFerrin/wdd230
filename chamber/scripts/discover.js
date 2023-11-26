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
const lastVisitDate = new Date(lastVisit);

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

	userNameSpan.innerText = lastVisitInterval == 0 ? 'Welcome ' + 
		storageUsername + '! Let us know if you have any questions.'
		: 'Back so soon! Awesome' + storageUsername + '!';
	lastVisitSpan.innerText = lastVisitInterval == 0 ? '' :
		'It\'s been ' + lastVisitInterval + 'day(s) since your last visit'

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

//////////////////////////
// intersection effects //
//////////////////////////

// lazy loading images and increase numbers effect
const imagesToLoad = document.querySelectorAll('[data-image]');
const numbers = document.querySelectorAll('.increase-number');

// make sure we are on "discover page"
if (imagesToLoad.length) {
	// images threshold
	const imageOptions = {
		threshold: .3
	}
	// numbers threshold
	const numberOptions = {
		threshold: 0.8
	}

	// function for loading image
	const loadImage = (image) => {
		image.setAttribute('src', image.getAttribute('data-image'));
		image.onload = () => {
			image.removeAttribute('data-image')
		}
	}

	// intersection observers
	if ("IntersectionObserver" in window) {
		// imagery lazy loading observer funcion
		const imageObserver =
			new IntersectionObserver((items, observer) => {
				items.forEach((item) => {
					if (item.isIntersecting) {
						loadImage(item.target);
						observer.unobserve(item.target);
					}
				})
			}, imageOptions);

		// set observers to all images
		imagesToLoad.forEach((image) => {
			imageObserver.observe(image);
		});

		// increase number effect function
		const triggerEffect = (number) => {
			let counter = 0;
			const endNumber =
				Number(number.getAttribute('number-info')).toFixed(0);
			const increase = endNumber / 50;
			let interval = setInterval(() => {
				number.innerText = counter.toFixed(1);
				counter += increase;
				if (counter >= endNumber) {
					clearInterval(interval);
					number.innerText =
						Number(number.getAttribute('number-info'))
							.toLocaleString();
				}
			}, 8);
		}

		// numbers oberver funtion
		const numberObserver =
			new IntersectionObserver((items) => {
				items.forEach((number) => {
					if (number.isIntersecting) {
						triggerEffect(number.target);
					} else {
						number.target.innerText = 0;
					}
				});
			}, numberOptions);

		// set oberver to all number elements
		numbers.forEach((number) => {
			numberObserver.observe(number);
		});
		// when intersection observers are not supported
	} else {
		// load of images
		imagesToLoad.forEach((image) => {
			loadImage(image);
		});

		// numbers effect
		numbers.forEach((number) => {
			triggerEffect(number);
		});
	}
}

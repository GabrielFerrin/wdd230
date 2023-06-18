////////////////////
// hamburger menu //
////////////////////
let toggleMenu = _ => {
	// menu button
	const menuButton = document
		.getElementById('menu-button');
	menuButton.classList.toggle('opened');
	menuButton
		.setAttribute('aria-expanded', menuButton.classList
			.contains('opened'));

	document.getElementsByClassName('header-menu')[0]
		.classList.toggle('responsive');

	// background when menu is active
	const isBGOn = document
		.getElementsByClassName('menu-background')[0]
		.style.display == "block";
	document.getElementsByClassName('menu-background')[0]
		.style.display = isBGOn ? "none" : "block";

	document.getElementsByClassName('menu-background')[0]
		.style.display = isBGOn ? "none" : "block";
}

//////////
// date //
//////////
const now = new Date();
const nowDate = new Intl.DateTimeFormat("en-US", {
	dateStyle: "full"
}).format(now);
document.getElementById('header-date')
	.innerText = nowDate;

//////////////////
// promo banner //
////////////////// 
if (now.getDay() == 1 || now.getDay() == 2) {
	document.getElementById('announcement-banner')
		.style.display = "flex";
}

///////////////
// copyright //
///////////////
const copyrightDate = new Date(document.lastModified);
document.getElementById('copyright')
	.innerText = '©' + copyrightDate.getFullYear() +
	' Manta Chamber';

///////////////////////
// last modification //
///////////////////////
document.getElementById('last-modified')
	.innerText = 'Last Modification: '
	+ document.lastModified;

const copyrightLine = '©' + copyrightDate.getFullYear()
	+ 'Manta Chamber | Gabriel Ferrin M. | WDD 203 Project '
	+ '| Last Modification: 05/17/2023 09:56:42';

document.getElementById('copyright-line')
	.innerText = copyrightLine;

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



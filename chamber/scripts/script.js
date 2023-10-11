// copyright
const copyrightDate = new Date(document.lastModified);
document.getElementById('copyright')
	.innerHTML = `©${copyrightDate.getFullYear()}`;

// last modified time
document.getElementById('lastModified')
	.innerText = `Last Modification: ${document.lastModified}`;

// footer details
document.getElementById('footer-details')
	.innerText = '©' + copyrightDate.getFullYear() +
	'  |  Manta Chamber of Commerce  |  ' +
	'ANGEL GABRIEL FERRIN MOREIRA  |  ' +
	'WDD 230 PROJECT  |  Last Modification: ' +
	document.lastModified;

////////////////////
// hamburger menu //
////////////////////
let toggleMenu = _ => {
	console.log('hello');
	// menu button
	const menuButton = document
		.getElementById('menu-button');
	menuButton.classList.toggle('opened');

	// menu items
	const menu = document.getElementById('nav-menu');
	menu.classList.toggle('show-menu');
}

// resize observer
const observer = new ResizeObserver(entries => {
	if (entries[0].contentRect.width > 649.99) {
		console.log('observer');
		const menuButton = document
			.getElementById('menu-button');
		if (menuButton.classList.contains('opened')) {
			const menu = document.getElementById('nav-menu');
			menu.classList.remove('show-menu');
			menuButton.classList.remove('opened');
		}
	}
});
observer.observe(document.body);
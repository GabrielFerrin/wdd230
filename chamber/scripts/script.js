// copyright
const copyrightDate = new Date(document.lastModified);
document.getElementById('copyright')
    .innerHTML = '©' + copyrightDate.getFullYear();

// last modified time
document.getElementById('lastModified')
    .innerText = 'Last Modification: '
    + document.lastModified;

    ////////////////////
// hamburger menu //
////////////////////
let toggleMenu = _ => {
	// menu button
	const menuButton = document
		.getElementById('menu-button');
	menuButton.classList.toggle('opened');

	// menu items
	const menu = document.getElementById('menu');
	menu.classList.toggle('show-menu');
}

// resize observer
const observer = new ResizeObserver(entries => {
	if (entries[0].contentRect.width >= 520) {
		const menuButton = document
			.getElementById('menu-button');
		if (menuButton.classList.contains('opened')) {

			const menu = document.getElementById('menu');
			menu.classList.toggle('show-menu');
			menuButton.classList.toggle('opened');
		}

	}
});
observer.observe(document.body);
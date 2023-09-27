////////////////////
// hamburger menu //
////////////////////
let toggleMenu = _ => {
	// menu button
	const menuButton = document
		.getElementById('menu-button');
	menuButton.classList.toggle('opened');

	// menu
	const menu = document.getElementById('menu');
		menu.classList.toggle('show-menu');
}
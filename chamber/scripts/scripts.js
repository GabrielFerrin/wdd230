// hamburger menu
let toggleMenu = _ => {
	// menu button
	const menuButton = document.getElementById('menu-button');
	menuButton.classList.toggle('opened');
	menuButton.setAttribute('aria-expanded', menuButton.classList
		.contains('opened'));

	document.getElementsByClassName('header-menu')[0]
		.classList.toggle('responsive');

	// background when menu is active
	const isBGOn = document.getElementsByClassName('menu-background')[0]
		.style.display == "block";
	document.getElementsByClassName('menu-background')[0]
		.style.display = isBGOn ? "none" : "block";

	document.getElementsByClassName('menu-background')[0]
		.style.display = isBGOn ? "none" : "block";
}

// hide menu background
let hideMenuBG = _ => {

}

// date
const now = new Date();
const nowDate = new Intl.DateTimeFormat("en-US", {
	dateStyle: "full"
}).format(now);
document.getElementById('header-date')
	.innerText = nowDate;

// show banner Mondays and Tesdays
if (now.getDay() == 1 || now.getDay() == 2) {
	setTimeout(() => {
		document.getElementById('announcement-banner').style.display = "flex";
	}, 1000);
}

// copyright
const copyrightDate = new Date(document.lastModified);
document.getElementById('copyright')
	.innerText = '©' + copyrightDate.getFullYear() +
	' Manta Chamber';

// last modified
document.getElementById('last-modified')
	.innerText = 'Last Modification: ' + document.lastModified;

const copyrightLine = '©' + copyrightDate.getFullYear()
	+ 'Manta Chamber | Gabriel Ferrin M. | WDD 203 Project '
	+ '| Last Modification: 05/17/2023 09:56:42';

document.getElementById('copyright-line')
	.innerText = copyrightLine;
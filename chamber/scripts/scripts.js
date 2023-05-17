// hamburger menu
function toggleMenu() {
	document.getElementById('hamburger-menu')[0]
	.classList.toggle('responsive');
}

const now = new Date();
const nowDate = new Intl.DateTimeFormat("en-US", {
	dateStyle: "full"
}).format(now);
document.getElementById('header-date')
	.innerText = nowDate;

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
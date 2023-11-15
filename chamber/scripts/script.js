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

// dark mode
const darkCheckbox = document.getElementById('dark-checkbox');
document.getElementById('dark-checkbox')
	.addEventListener('click', () => {
		document.body.classList.toggle('dark');
	})

////////////////////
// hamburger menu //
////////////////////
let toggleMenu = _ => {
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

///////////////
// directory //
///////////////
const container = document.getElementById('container');
if (container) {
	const list = document.getElementById('list');
	const grid = document.getElementById('grid');
	list.addEventListener('click', () => {
		container.classList.remove('grid');
		container.classList.add('list');
	})
	grid.addEventListener('click', () => {
		container.classList.remove('list');
		container.classList.add('grid');
	})
	// get members info
	const url = 'data/members.json';
	const getMembersData = async () => {
		const response = await fetch(url);
		if (response.ok) {
			let data = await response.json();
			displayMembers(data.members);
		}
		return undefined;
	};

	getMembersData();

	// display members
	const displayMembers = (members) => {
		members.forEach(member => {
			const card = document.createElement('div');
			card.setAttribute('class', 'basic-card basic-members-card');
			card.style.borderLeftColor = member.membership === 'bronze' ?
				'#cd7f32' : member.membership;
			container.appendChild(card);
			const badge = document.createElement('img');
			badge.setAttribute('id', 'badge');
			badge.setAttribute('src', 'images/directory/badge-' + member.membership + '.svg');
			badge.setAttribute('alt', toCamelCase(member.membership) + ' badge');
			badge.setAttribute('height', '23');
			badge.setAttribute('width', '23');
			card.appendChild(badge);
			const logo = document.createElement('img');
			logo.setAttribute('src', member.logo);
			logo.setAttribute('alt', 'Ales Industries Logo');
			logo.setAttribute('loading', 'lazy');
			logo.setAttribute('id', 'logo');
			logo.setAttribute('height', '50px');
			logo.setAttribute('width', '50');
			card.appendChild(logo);
			const title = document.createElement('span');
			title.setAttribute('class', 'title');
			title.textContent = member.name;
			card.appendChild(title);
			const address = document.createElement('span');
			address.textContent = member.address;
			card.appendChild(address);
			const phone = document.createElement('span');
			phone.textContent = member.phone;
			card.appendChild(phone);
			const linkSpan = document.createElement('span');
			const link = document.createElement('a');
			link.setAttribute('href', member.link);
			link.setAttribute('target', '_blank');
			link.textContent = member.website;
			linkSpan.appendChild(link);
			card.appendChild(linkSpan);
		});
	}

	const toCamelCase = (str) => {
		return str[0].toUpperCase() + str.slice(1);
	}

	const getMembershipColor = (membership) => {
		if (membership === 'Gold') {
			return 'gold';
		} else if (membership === 'Silver') {
			return 'silver';
		} else if (membership === 'Bronze') {
			return 'bronze';
		}
	}
}

/////////////
// weather //
/////////////
const atHomepage = document.getElementById('hero-homepage');
if (atHomepage) {
	const openWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?id=3654410&appid=7355654a40f63232368257f667f78b4b";
	const getWeather = async () => {
		// start animation
		const response = await fetch(openWeatherUrl);
		if (response.ok) {
			// finish animation
			const data = await response.json();
			// displayWeather(data);
			console.log(data);
		}
	}
	getWeather();	
}

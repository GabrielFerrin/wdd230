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
if (localStorage.getItem('mantaChamberDark') === 'true') {
	// 	darkCheckbox.checked = true;
	document.body.classList.toggle('dark');
	document.getElementById('dark-checkbox').checked = true;
}

document.getElementById('dark-checkbox')
	.addEventListener('click', () => {
		document.body.classList.toggle('dark');
		if (document.body.classList.contains('dark')) {
			localStorage.setItem('mantaChamberDark', 'true');
		} else {
			localStorage.removeItem('mantaChamberDark');
		}
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
if (document.getElementById('three-days-wrapper')) {
	// get weather
	const threeDaysUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=3654410&units=imperial&appid=7355654a40f63232368257f667f78b4b';
	const getThreeDays = async () => {
		const response = await fetch(threeDaysUrl);
		if (response.ok) {
			const data = await response.json();
			let dayRange = 0;
			let counter = 0;
			data.list.forEach(item => {
				const date = new Date(item.dt * 1000);
				const day = date.getDate();
				if (dayRange !== day && counter <= 2) {
					counter++;
					dayRange = day;
					addWeatherDetail(item, counter);
					if (counter == 1) {
						document.getElementById('speed').textContent = item.wind.speed;
						if (item.main.temp >= 50) {
							document.getElementById('wind-chill').textContent = 'N/A';
						} else {
							const windChill = 35.74 + 0.6215 * item.main.temp - 35.75 * Math.pow(item.wind.speed, 0.16) + 0.4275 * item.main.temp * Math.pow(item.wind.speed, 0.16);
							document.getElementById('wind-chill').textContent = windChill;
						}
					}
				}
			})
		}
	}

	getThreeDays();
}


const addWeatherDetail = (item, dayNumber) => {
	const container = document.getElementById('three-days-wrapper');
	const card = document.createElement('div');
	card.setAttribute('class', 'weather-details-wrapper');
	const temp = document.createElement('p');
	temp.setAttribute('class', 'contrast-title');
	temp.textContent = item.main.temp.toFixed(0) + '°F';
	card.appendChild(temp);
	const icon = document.createElement('img');
	icon.setAttribute('src', `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`);
	icon.setAttribute('alt', item.weather[0].description);
	icon.setAttribute('id', 'weather-icon');
	icon.setAttribute('loading', 'lazy');
	icon.setAttribute('height', '40');
	icon.setAttribute('width', '40');
	card.appendChild(icon);
	const day = document.createElement('p');
	day.textContent = dayNumber === 1 ? 'Today' : dayNumber === 2 ?
		'Tomorrow' : 'Overtomorrow';
	card.appendChild(day);
	const description = document.createElement('p');
	description.textContent = toUpperWords(item.weather[0].description);
	card.appendChild(description);
	const humidity = document.createElement('p');
	humidity.textContent = 'Humidity: ' + item.main.humidity + '%';
	card.appendChild(humidity);
	container.appendChild(card);
}

const toUpperWords = (str) => {
	return str.split(' ').map(word => word.charAt(0).toUpperCase() +
		word.slice(1)).join(' ');
}

////////////
// banner //
////////////
const dayOfWeek = new Date().getDay();
if (dayOfWeek >= 1 && dayOfWeek <= 3) {
	const banner = document.getElementsByClassName('banner-wrapper');
	banner[0].style.display = 'flex';
}
const banner = document.getElementsByClassName('banner-wrapper');

const xButton = document.getElementsByClassName('x');
if (xButton[0] !== undefined) {
	xButton[0].addEventListener('click', () => {
		const input = document.getElementById('collapse-icon');
		input.checked = true;
	})
}
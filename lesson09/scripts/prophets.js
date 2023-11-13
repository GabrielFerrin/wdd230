const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const getProphetData = async () => {
  const response = await fetch(url);
  if (response.ok) {
    let data = await response.json();
    displayProphets(data.prophets);
  }
  return undefined;
};

getProphetData();

const displayProphets = (prophets) => {
  const cards = document.querySelector('#cards');
  prophets.forEach(prophet => {
    const card = document.createElement('section');
    card.setAttribute('class', 'card');
    card.setAttribute('id', 'activities');
    const cardHeader = document.createElement('div');
    cardHeader.setAttribute('class', 'card-header');
    const h3 = document.createElement('h3');
    h3.textContent = prophet.name + ' ' + prophet.lastname;
    cardHeader.appendChild(h3);
    card.appendChild(cardHeader);
    cards.appendChild(card);
    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    const ul = document.createElement('ul');
    cardBody.appendChild(ul);
    const li1 = document.createElement('li');
    ul.appendChild(li1);
    const a1 = document.createElement('a');
    li1.appendChild(a1);
    const h41 = document.createElement('h4');
    h41.textContent = 'Date of Birth: ';
    a1.appendChild(h41);
    const span1 = document.createElement('span');
    span1.textContent = prophet.birthdate;
    h41.appendChild(span1);
    const h42 = document.createElement('h4');
    h42.textContent = 'Place of Birth: ';
    a1.appendChild(h42);
    const span2 = document.createElement('span');
    span2.textContent = prophet.birthplace;
    h42.appendChild(span2);
    const portrait = document.createElement('img');
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');
    cardBody.appendChild(portrait);
    card.appendChild(cardBody);
  });
}

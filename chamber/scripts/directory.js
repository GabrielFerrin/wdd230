getDirectory('card');

const goToPage = (companyUrl) => {
  window.open(companyUrl, "_blank")
}

const listButton = document.getElementById('listButton');
const listButtonImg = document.getElementById('list-img')
const cardsButton = document.getElementById('cardsButton');
const cardsButtonImg = document.getElementById('cards-img')

const displayList = () => {
  listButton.classList.add('selected');
  cardsButton.classList.remove('selected');

  listButtonImg.setAttribute('src', 'images/list-white.svg');
  cardsButtonImg.setAttribute('src', 'images/cards.svg')
  emptyDirectory();
  getDirectory('list');
}

const displayCards = () => {
  cardsButton.classList.add('selected');
  listButton.classList.remove('selected');

  listButtonImg.setAttribute('src', 'images/list.svg');
  cardsButtonImg.setAttribute('src', 'images/cards-white.svg')
  emptyDirectory();
  getDirectory('card');
}

function getDirectory(layout = 'card') {
  // start animation
  fetch('json/data.json')
    .then(response => response.json())
    .then(data => {
      // end animation
      const cards = document.getElementById('cards');

      data.companies.forEach(company => {
        const card = document.createElement('div');

        const h2 = document.createElement('h2');
        h2.innerText = company.name;
        card.appendChild(h2);

        const img = document.createElement('img');
        img.setAttribute('src', company.logo);
        card.appendChild(img);

        const p1 = document.createElement('p');
        p1.setAttribute('class', 'membership')
        p1.classList.add(company.membership === 'Gold' ?
          'gold' : 'regular');
        p1.innerText = `${company.membership} Membership`;
        card.appendChild(p1);

        const p2 = document.createElement('p');
        p2.innerText = company.web;
        card.appendChild(p2);

        const p3 = document.createElement('p');
        p3.innerText = company.phone;
        card.appendChild(p3);

        const p4 = document.createElement('p');
        p4.innerText = company.address;
        card.appendChild(p4);
        card.setAttribute('onclick', `goToPage('${company.web}')`)
        card.setAttribute('class', layout);
        cards.appendChild(card);
      });
    })
    .catch(error => {

    });
}

const emptyDirectory = () => {
  const cards = document.getElementById('cards');
  while(cards.hasChildNodes())
    cards.firstChild.remove();
}
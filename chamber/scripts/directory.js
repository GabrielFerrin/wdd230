const cards = document.getElementById('cards')
const listButton = document.getElementById('listButton');
const listButtonImg = document.getElementById('list-img')
const cardsButton = document.getElementById('cardsButton');
const cardsButtonImg = document.getElementById('cards-img')

getDirectory('list');

const displayList = () => {
  getDirectory('list');
}

const displayCards = () => {
  getDirectory('card');
}

function getDirectory(layout = 'list') {
  // initial
  if (layout === 'card') {
    cards.classList.remove('lists');
    cards.classList.add('cards');
    cardsButton.classList.add('selected');
    listButton.classList.remove('selected');

    listButtonImg.setAttribute('src', 'images/list.svg');
    cardsButtonImg.setAttribute('src', 'images/cards-white.svg')
    emptyDirectory();
  } else {
    cards.classList.remove('cards');
    cards.classList.add('lists');
    listButton.classList.add('selected');
    cardsButton.classList.remove('selected');

    listButtonImg.setAttribute('src', 'images/list-white.svg');
    cardsButtonImg.setAttribute('src', 'images/cards.svg')
    emptyDirectory();
  }

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
        console.log(company.membership);
        p1.classList.add(company.membership === 'Non Profit' ?
          'non-profit' : company.membership.toLowerCase());
        p1.innerText = `${company.membership} Membership`;
        card.appendChild(p1);

        const p2 = document.createElement('p');
        p2.innerText = company.web;
        card.appendChild(p2);

        const p3 = document.createElement('p');
        p3.setAttribute('class', 'phone');
        p3.innerText = company.phone;
        card.appendChild(p3);

        const p4 = document.createElement('p');
        p4.innerText = company.address;
        if (layout === 'list')
          p4.classList.add('hide');
        card.appendChild(p4);

        card.setAttribute('onclick', `goToPage('${company.link}')`)
        card.setAttribute('class', layout);
        cards.appendChild(card);
      });
    })
    .catch(error => {

    });
}

function emptyDirectory() {
  const cards = document.getElementById('cards');
  while (cards.hasChildNodes())
    cards.firstChild.remove();
}

const goToPage = (companyUrl) => {
  window.open(companyUrl, "_blank")
}

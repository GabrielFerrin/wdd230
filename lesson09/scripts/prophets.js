const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
let data = null;
let filter = '';

const getProphetData = async () => {
  // waiting animation
  const resp = await fetch(url);
  if (resp.ok) {
    data = await resp.json();
    // stop animation
    displayProphets(data.prophets, filter);
  } else {
    // show error message
  }
}

const cards = document.querySelector('div.cards');
getProphetData();

// value hoisting
function displayProphets(prophets, filter) {
  prophets.forEach((prophet, index) => {
    // elements to add to div.cards
    const card = document.createElement('section');
    const h2 = document.createElement('h2');
    const subtitle = document.createElement('p');
    const div = document.createElement('div');
    div.setAttribute('class', 'info-card')

    let infoLine = document.createElement('div');
    infoLine.setAttribute('class', 'line-div')

    const portrait = document.createElement('img');

    const prophetName = `${prophet.name} ${prophet.lastname}`;

    const birthDate = new Date(prophet.birthdate);
    const deathDate = new Date(prophet.death);
    const ageSecods = new Date(deathDate - birthDate);
    const today = Date.now();
    const aliveAge = new Date(today - birthDate);
    const age = prophet.death === null ? 
      aliveAge.getUTCFullYear() - 1970 :
      Math.abs(ageSecods.getUTCFullYear() - 1970);

    // apply filter 
    if (filter === '10+' && prophet.length < 10) {
      console.log('not executed');
      return;
    }

    // h2
    h2.textContent = prophetName;

    // info card - birth
    let span1 = document.createElement('span');
    span1.setAttribute('class', 'infoText1');
    span1.textContent = 'Birth: ';
    let span2 = document.createElement('span');
    span2.setAttribute('class', 'infoText2');
    span2.textContent = prophet.birthdate;

    // info card - append birth
    infoLine.appendChild(span1);
    infoLine.appendChild(span2);
    div.appendChild(infoLine);
    infoLine = document.createElement('div');
    infoLine.setAttribute('class', 'line-div')

    // info card - birthplace
    span1 = document.createElement('span');
    span1.textContent = 'Birth Place: ';
    span2 = document.createElement('span');
    span2.textContent = prophet.birthplace;

    // info card - append birthplace
    infoLine.appendChild(span1);
    infoLine.appendChild(span2);
    div.appendChild(infoLine);
    infoLine = document.createElement('div');
    infoLine.setAttribute('class', 'line-div')

    // info card - children
    span1 = document.createElement('span');
    span1.textContent = 'Children: ';
    span2 = document.createElement('span');
    span2.textContent = prophet.numofchildren;

    // info card - append children
    infoLine.appendChild(span1);
    infoLine.appendChild(span2);
    div.appendChild(infoLine);
    infoLine = document.createElement('div');
    infoLine.setAttribute('class', 'line-div')

    // info card - prophet years
    span1 = document.createElement('span');
    span1.textContent = 'Prophet Years: ';
    span2 = document.createElement('span');
    span2.textContent = prophet.length;

    // info card - append prophet years
    infoLine.appendChild(span1);
    infoLine.appendChild(span2);
    div.appendChild(infoLine);
    infoLine = document.createElement('div');
    infoLine.setAttribute('class', 'line-div')

    // info card - death
    span1 = document.createElement('span');
    span1.textContent = 'Death: ';
    span2 = document.createElement('span');
    span2.textContent = prophet.death === null ? 'Alive' : prophet.death;

    // info card - append death
    infoLine.appendChild(span1);
    infoLine.appendChild(span2);
    div.appendChild(infoLine);
    infoLine = document.createElement('div');
    infoLine.setAttribute('class', 'line-div')

    // info card - age
    span1 = document.createElement('span');
    span1.textContent = 'Age: ';
    span2 = document.createElement('span');
    span2.textContent = age;

    // info card - append age
    infoLine.appendChild(span1);
    infoLine.appendChild(span2);
    div.appendChild(infoLine);
    infoLine = document.createElement('div');
    infoLine.setAttribute('class', 'line-div')

    // img
    portrait.setAttribute('src', prophet.imageurl);
    portrait
      .setAttribute('alt', 'Portrait of ' + prophetName + ' - ' +
        ordinal_suffix_of(index + 1) + ' Latter-day President')
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('height', '400');

    // subtitle
    subtitle.innerText = ordinal_suffix_of(index + 1) +  
      ' President'

    // append elements
    card.appendChild(h2);
    card.appendChild(subtitle);
    card.appendChild(div)
    card.appendChild(portrait);

    cards.appendChild(card);
  });
}

// ordinal index
function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "ˢᵗ";
  }
  if (j == 2 && k != 12) {
    return i + "ⁿᵈ";
  }
  if (j == 3 && k != 13) {
    return i + "ʳᵈ";
  }
  return i + "ᵗʰ";
}

// update filter
const filter10Plus = () => {
  document.getElementById('filter-button').classList.toggle("selected");
  if (filter === '')
    filter = '10+';
  else
    filter = '';
  clearData();
  displayProphets(data.prophets, filter);
}

// clear data
const clearData = () => {
  while (cards.hasChildNodes())
    cards.firstChild.remove();
}
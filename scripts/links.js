const baseURL = 'https://gabrielferrin.github.io/wdd230/';
const linksURL = 'https://gabrielferrin.github.io/wdd230/data/links.json';
const getLinks = async () => {
  const response = await fetch(linksURL);
  if (response.ok) {
    const data = await response.json();
    displayLinks(data.lessons);
  }
  return undefined;
}

const displayLinks = (links) => {
  let linksCount = 0;
  const list = document.getElementById('menu-list');
  const ul = document.createElement('ul');
  links.forEach(lesson => {
    lesson.links.forEach(link => {
      linksCount++;
      const li = document.createElement('li');
      ul.appendChild(li);
      const a = document.createElement('a');
      li.appendChild(a);
      const h4 = document.createElement('h4');
      a.appendChild(h4);
      a.setAttribute('href', link.url);
      h4.textContent = 'Lesson ' + linksCount > 9 ?
        linksCount + ': ' :
        '0' + linksCount + ': ';
      const span = document.createElement('span');
      span.textContent = 'Lesson ' + lesson.lesson + ' | ' + link.title;
      h4.appendChild(span);
      list.appendChild(li);
    })
  });
}

getLinks();
const baseURL = 'https://gabrielferrin.github.io/wdd230/';
const linksURL = 'https://gabrielferrin.github.io/wdd230/data/links.json';
const getLinks = async () => {
  const response = await fetch(linksURL);
  if (response.ok) {
    const data = await response.json();
    console.log(data.lessons);
  }
  return undefined;
}

getLinks();
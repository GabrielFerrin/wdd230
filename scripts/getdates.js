// copyright
const copyrightDate = new Date(document.lastModified);
document.getElementById('copyright')
    .innerHTML = '©' + copyrightDate.getFullYear();

// last modified time
document.getElementById('lastModified')
    .innerText = 'Last Modification: '
    + document.lastModified;
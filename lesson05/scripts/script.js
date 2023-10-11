const input = document.querySelector('#favchap');
const button = document.querySelector('#button');
const list = document.querySelector('#list');

const add = () => {
  if (input.value != '') {
    const span = document.createElement('span');
    span.textContent = input.value;
    const h4 = document.createElement('h4');
    h4.textContent = '01: ';
    h4.appendChild(span);
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '-';
    deleteButton.addEventListener('click', () => {
      list.removeChild(li);
      [...list.children].forEach((child, index) => {
        const tempButton = child.lastChild;
        const tempSpan = child.firstChild.lastChild;
        child.firstChild.textContent =
          index <= 8 ? '0' + (index + 1) + ': ' : (index + 1) + ': ';
        child.firstChild.appendChild(tempSpan);
        child.appendChild(tempButton);
      })
    })
    deleteButton.setAttribute('class', 'button-01 remove-btn');
    deleteButton.setAttribute('aria-label', 'Remove item');
    li.append(h4);
    li.appendChild(deleteButton);
    list.append(li);
    [...list.children].forEach((child, index) => {
      const tempButton = child.lastChild;
      const tempSpan = child.firstChild.lastChild;
      child.firstChild.textContent =
        index <= 8 ? '0' + (index + 1) + ': ' : (index + 1) + ': ';
      child.firstChild.appendChild(tempSpan);
      child.appendChild(tempButton);
    })
    input.value = '';
  }
  input.focus();
}

button.addEventListener('click', () => {
  add();
})

input.addEventListener('keypress', (event) => {
  if (event.keyCode === 13)
    add();
})
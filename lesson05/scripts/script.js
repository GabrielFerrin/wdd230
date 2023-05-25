const input = document.getElementById('favchap');
const button = document.querySelector('button');
const list = document.getElementById('list');
setTimeout(() => {
	input.focus();
}, 400);

button.addEventListener('click', () => {
	if (input.value != '') {
		li = document.createElement('li');
		deleteButton = document.createElement('button');
		li.innerText = input.value;
		deleteButton.innerText = '❌';
		deleteButton.classList.add('delete');
		deleteButton.ariaLabel = `Remove: ${input.innerText}`;
		deleteButton.addEventListener('click', (event) => {
			event.currentTarget.parentNode.remove();
			input.focus();
		})
		li.append(deleteButton);
		list.append(li);
		input.focus();
		input.value = '';
	}
});
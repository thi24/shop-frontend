export function filterInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  let inputValue = inputElement.value;
  inputValue = inputValue.replace(/\D/g, ''); // Changed to use \D
  inputValue = inputValue.replace(/^0+/, '');
  if (parseInt(inputValue) > 99) {
    inputValue = '99';
  }
  inputElement.value = inputValue;
}
export function filterInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;
    inputValue = inputValue.replace(/[^0-9]/g, '');
    if (parseInt(inputValue) > 99) {
      inputValue = '99';
    }
    inputElement.value = inputValue;
  }
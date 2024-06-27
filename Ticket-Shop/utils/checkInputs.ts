export function checkInputs(inputs: HTMLInputElement[]): boolean {
  for (const input of inputs) {
    let inputValue = input.value;
    if (inputValue !== null) {
      inputValue = inputValue.trim();
    }
    if (!(/^(\d+)$/.test(inputValue) || inputValue === "" || inputValue === null)) {
      input.style.outline = '2px solid red';
      return false;
    }
  }
  return true;
}

export function checkInputs(inputs: HTMLInputElement[]): boolean {
  for (let i = 0; i < inputs.length; ++i) {
    let inputValue = inputs[i].value;
    if (inputValue !== null) {
      inputValue = inputValue.trim();
    }
    if (!(/^(\d+)$/.test(inputValue) || inputValue === "" || inputValue === null)) {
      inputs[i].style.outline = '2px solid red';
      return false;
    }
  }
  return true;
}


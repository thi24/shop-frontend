export function checkInputs(): boolean {
  let inputsAreNumeric = true;
  let inputs = document.getElementsByTagName("input");

  for (let i = 0; i < inputs.length; ++i) {
    let inputValue = inputs[i].value.trim();

    if (!(/^(\d+)$/.test(inputValue) || inputValue == "" || inputValue == null)) {
      inputsAreNumeric = false;
      inputs[i].style.outline = "2px solid red";
      console.log("Input " + i + " is not numeric. Value: " + inputValue);
    } else {
      inputs[i].style.outline = "";
    }
  }
  return inputsAreNumeric;
}

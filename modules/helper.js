/**
 * Get radio Btn Value
 * @param {DOMElement} element
 */
export function getRadioBtnValue(element) {
  for (let i = 0; i < element.length; i++) {
    if (element[i].checked) {
      return element[i].value;
    }
  }
}

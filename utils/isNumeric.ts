// https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number

export default function isNumeric(str: string) {
  // we only process strings!
  if (typeof str !== 'string') {
    return false;
  }

  // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  return !Number.isNaN(str)
    // ...and ensure strings of whitespace fail
    && !Number.isNaN(parseFloat(str));
}

export default (obj, path, defaultValue = null) => {
  return String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((a, c) => (Object.hasOwnProperty.call(a, c) ? a[c] : defaultValue), obj);
};

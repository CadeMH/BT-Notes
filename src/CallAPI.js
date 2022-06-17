// Reusable method to call the API
exports.api = (note, url, methodType) => {
  fetch(url, {
    method: methodType,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  });
};

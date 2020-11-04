let newText = 'Eu adoro batata'.split('')
for (let i = 0; i < newText.length; i += 1) {
  newText[i] = 'b';
};
console.log(newText.join(''))
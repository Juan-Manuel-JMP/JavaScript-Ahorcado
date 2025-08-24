window.onload = () => {
  setTimeout(() => {
    selectWord();
    createKeyboard();
    document.getElementById('restart').onclick = restartGame;
  }, 1000); // Espera 300ms antes de mostrar
};


// Lista de palabras para el juego
const words = [
  'javascript', 'react', 'angular', 'node', 'express', 'html', 'css', 'typescript',
  'python', 'ruby', 'programador', 'desarrollador', 'frontend', 'backend', 'software', 'hacker',
  'data', 'database', 'array', 'function', 'variable', 'antivirus', 'algoritmo', 'servidor', 'token',
  'aplicacion', 'archivo', 'byte', 'cookies', 'encriptacion', 'cifrado', 'metadatos', 'navegador'
];

// Variables del juego
let selectedWord;
let displayedWord;
let attemptsLeft = 6;
let lettersLeft;
let usedLetters = [];
let gameOver = false;

// Selección de una palabra aleatoria
function selectWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  selectedWord = words[randomIndex];
  displayedWord = Array(selectedWord.length).fill('_');
  lettersLeft = selectedWord.length;
  updateDisplay();
}

// Mostrar la palabra en formato visual
function updateDisplay() {
  document.getElementById('word-display').textContent = displayedWord.join(' ');
  document.getElementById('letters-left').querySelector('span').textContent = lettersLeft;
  document.getElementById('attempts-left').querySelector('span').textContent = attemptsLeft;

  if (lettersLeft === 0) {
    document.getElementById('message').textContent = '¡Has ganado! 🎉';
    gameOver = true;
  } else if (attemptsLeft === 0) {
    document.getElementById('message').textContent = `¡Perdiste! La palabra era "${selectedWord}".`;
    gameOver = true;
  }
}

// Validar la letra seleccionada
function checkLetter(letter) {
  if (gameOver || usedLetters.includes(letter)) return;

  usedLetters.push(letter);

  let foundLetter = false;
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      displayedWord[i] = letter;
      lettersLeft--;
      foundLetter = true;
    }
  }

  if (!foundLetter) attemptsLeft--;

  updateDisplay();
  updateKeyboard();
}

// Crear botones de letras
function createKeyboard() {
  const keyboard = document.querySelector('.keyboard');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  
  alphabet.forEach(letter => {
    const button = document.createElement('button');
    button.textContent = letter;
    button.onclick = () => checkLetter(letter);
    keyboard.appendChild(button);
  });
}

// Actualizar la visualización de las letras utilizadas
function updateKeyboard() {
  const buttons = document.querySelectorAll('.keyboard button');
  buttons.forEach(button => {
    if (usedLetters.includes(button.textContent)) {
      button.disabled = true;
    }
  });
}

// Reiniciar el juego
function restartGame() {
  gameOver = false;
  usedLetters = [];
  attemptsLeft = 6;
  selectWord();
  updateKeyboard();
  document.getElementById('message').textContent = '';
}

// Inicializar el juego
window.onload = () => {
  selectWord();
  createKeyboard();

  document.getElementById('restart').onclick = restartGame;
};

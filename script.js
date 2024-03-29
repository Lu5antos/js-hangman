const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['chapin', 'marrica','tocasucks', 'chupamela'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];


//show the hidden word
function displayWord() {
    //set the innerHTML of the wordEl to the selected word
    wordEl.innerHTML = ` 
        ${selectedWord
            //split it into an array
            .split('')
            //map through said array
            .map(letter => 
                //check if the letter is included in that array. If it is, output the letter
                // if it isnt, return an empty string
                `<span class=letter>
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>`).join('')} 
  `;// turn it back into a string with .join()

  const innerWord = wordEl.innerText.replace(/\n/g,'');
  //console.log(wordEl.innerText, innerWord)
  if(innerWord == selectedWord){
      finalMessage.innerText =  'Congratulations! You won!';
      popup.style.display = 'flex';
  }
}
// Update the wrong letters
function updateWrongLettersEl() {
    //display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    //display hangman parts
    figureParts.forEach((part,index) => {
        const errors =wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        }else {
            part.style.display = 'none';
        }
    })
    //check if lost
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerHTML= 'You Lost!'
        popup.style.display = 'flex';
    }
}

//Show notification

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

//restart game
playAgainBtn.addEventListener('click', () => {
    //empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});

displayWord();
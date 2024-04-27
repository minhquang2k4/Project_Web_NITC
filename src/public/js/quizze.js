let currentWordIndex = 0;
const words = <%- JSON.stringify(words) %>;
const answers = document.querySelectorAll('.da');

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function displayWordAndAnswers() {
    const correctWord = words[currentWordIndex];
    const wrongWords = [];

    while (wrongWords.length < 3) {
        const word = getRandomWord();
        if (word.word !== correctWord.word && !wrongWords.includes(word)) {
            wrongWords.push(word);
        }
    }

    document.querySelector('#text-to-speech h1').textContent = correctWord.word;
    const allWords = [correctWord, ...wrongWords];
    allWords.sort(() => Math.random() - 0.5); // Shuffle the words

    for (let i = 0; i < answers.length; i++) {
        answers[i].querySelector('h4').textContent = allWords[i].meaning; // Change this line
        answers[i].addEventListener('click', function() {
            if (this.querySelector('h4').textContent === correctWord.meaning) { // And this line
                currentWordIndex++;
                if (currentWordIndex >= words.length) {
                    currentWordIndex = 0; // Loop back to the first word if we've gone past the last word
                }
                displayWordAndAnswers();
            }
        });
    }
}
displayWordAndAnswers();

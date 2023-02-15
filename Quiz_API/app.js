const question = document.getElementById("question")
const correctAnswer = document.getElementById("correct-answer")
const incorrectAnswers = document.getElementById("incorrect-answers")
const result = document.getElementById('result')
const nextButton = document.getElementById('next-question')



async function loadQuestion(){
const APIUrl = 'https://opentdb.com/api.php?amount=1&type=multiple';
const result = await fetch(`${APIUrl}`)
const data = await result.json();
return data;
}

function shuffleArray(arr) {
for (let i = arr.length - 1; i >= 0; i--) {
    const s = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[s]] = [arr[s], arr[i]]
}
return arr;
}



async function initializeQuiz() {
const data = await loadQuestion();
question.innerHTML = `<h1>${data.results[0].question}</h1>`;

const answers = [...data.results[0].incorrect_answers, data.results[0].correct_answer];
console.log(answers);
const shuffledAnswers = shuffleArray(answers);
console.log(shuffledAnswers);

for (let i = 0; i < 4; i++) {
let index = i + 1;
document.getElementById(`choice${index}label`).innerHTML = answers[i];
document.getElementById(`choice${index}`).value = answers[i];
}

document.getElementById('submit').addEventListener('click', () => {
document.querySelectorAll('input[name="choice"]').forEach((el) => {
    if (el.checked) {
        console.log(el.value);
        console.log(data.results[0].correct_answer);

        if (el.value === data.results[0].correct_answer) {
            result.innerHTML = "Correct! <br> 😄";
        } else {
            result.innerHTML = "Sorry! That is incorrect. <br> ☹️";
        }
    }
});
});

nextButton.addEventListener('click', () => {
location.reload();
});
}

loadQuestion();
initializeQuiz();



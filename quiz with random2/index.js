const timeElement= document.getElementById('time');
const timeElement2= document.getElementById('timer');
const questionElement= document.getElementById('questions');
const answerElement= document.getElementById('answers');
const resultElement= document.getElementById('result');
const nextButton= document.getElementById('nextButton');




const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "2", "5"],
        correct: 1
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Jupiter", "Mars", "Saturn"],
        correct: 1
    },
    {
        question: "What is the chemical symbol for water?",
        answers: ["H2O", "O2", "CO2", "HO2"],
        correct: 0
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"],
        correct: 2
    }
];
let timer;
let currentQuestionIndex=0;
let score=0;
const timePerQuestion= 10;
 
function setTimer() {
    let timeLeft = timePerQuestion;
    timeElement.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft < 0) {
            clearInterval(timer);
            alert('Time is up! Moving to the next question.');
            nextQuestion();
        }
    }, 1000);
}
function loadQuestions(){
       clearInterval(timer);
       let currentQuestion= shuffleQuestions[currentQuestionIndex];
       questionElement.textContent= currentQuestion.question;
       answerElement.innerHTML='';

       currentQuestion.answers.forEach((answer, index)=>{
            const li= document.createElement('li');
            li.innerHTML= `<input type="radio" name="answer" value="${index}"> ${answer}`;
            answerElement.appendChild(li);
       })
       setTimer();
}


function nextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
       loadQuestions(); 
    }
    else{
        showResult();
    }
}
function shuffleQuestion(array){
    for(let i= array.length-1; i > 0; i--){
        const j= Math.floor(Math.random()* (i+1));
        [array[i], array[j]]= [array[j], array[i]];
    }
    return array;
}

const shuffleQuestions= shuffleQuestion([...questions]);

function showResult(){
    clearInterval(timer);

    timeElement2.style.display='none';
    questionElement.style.display='none';
    answerElement.style.display='none';
    resultElement.style.display='block';
    nextButton.style.display='none';

    resultElement.innerHTML=`you score ${score} out of ${questions.length}`;

    resultElement.innerHTML +=`<h3>Correct Answers:</h3>`;
    shuffleQuestions.forEach((question,index)=>{
        resultElement.innerHTML += `<strong> ${index +1}.${question.question}</strong><br>`;
        resultElement.innerHTML += `correct answer: ${question.answers[question.correct]}<br><br>`;
    })
}

nextButton.addEventListener('click', ()=>{
    const selectedAnswer= document.querySelector('input[name="answer"]:checked');
    if(selectedAnswer){
        const answerIndex= parseInt(selectedAnswer.value);
        if(answerIndex === shuffleQuestions[currentQuestionIndex].correct){
            score++;
        }
        nextQuestion();
    }
    else{
        alert('please select the answer');
    }
})
loadQuestions();
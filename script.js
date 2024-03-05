const questions = [
    {
        question: "What is the first commandment in the Ten Commandments?",
        answers: [
            { text: "You shall not steal",correct: false},
            { text: "You shall not murder",correct: false},
            { text: "You shall have no other gods before me",correct: true},
            { text: "Honor your father and your mother",correct: false},
        ]
    },
    {
        question: " How many days and nights did it rain during the Great Flood?",
        answers: [
            { text: "40 days and 40 nights",correct: true},
            { text: "7 days and 7 nights",correct: false},
            { text: "30 days and 30 nights",correct: false},
            { text: "20 days and 20 nights",correct: false},
        ]
    },
    {
        question: "What did Jesus turn water into during the wedding at Cana?",
        answers: [
            { text: "Wine",correct: true},
            { text: "Milk",correct: false},
            { text: "Oil",correct: false},
            { text: "Vinegar",correct: false},
        ]
    },
    {
        question: "Who was swallowed by a big fish in the Bible?",
        answers: [
            { text: "Moses",correct: false},
            { text: "David",correct: false},
            { text: "Jonah",correct: true},
            { text: "Solomon",correct: false},
        ]
    },
    {
        question: "Which of Jesus' disciples denied knowing him three times before the rooster crowed?",
        answers: [
            { text: "Peter",correct: true},
            { text: "John",correct: false},
            { text: "James",correct: false},
            { text: "Thomas",correct: false},
        ]
    },
    {
        question: "What was the name of the tax collector who climbed a sycamore tree to see Jesus?",
        answers: [
            { text: "Matthew",correct: false},
            { text: "Nicodemus",correct: false},
            { text: "Bartimaeus",correct: false},
            { text: "Zacchaeus",correct: true},
        ]
    },
    {
        question: "Who was the mother of Jesus?",
        answers: [
            { text: "Mary Magdalene",correct: false},
            { text: "Elizabeth",correct: false},
            { text: "Mary",correct: true},
            { text: "Martha",correct: false},
        ]
    },
    {
        question: "What is the last book of the New Testament?",
        answers: [
            { text: "Revelation",correct: true},
            { text: "Romans",correct: false},
            { text: "Acts",correct: false},
            { text: "Jude",correct: false},
        ]
    },
    {
        question: "Who interpreted dreams for Pharaoh in Egypt?",
        answers: [
            { text: "Moses",correct: false},
            { text: "Joseph",correct: true},
            { text: "Daniel",correct: false},
            { text: "Aaron",correct: false},
        ]
    },
    {
        question: "What was the name of the mountain where Moses received the Ten Commandments?",
        answers: [
            { text: "Mount Sinai",correct: true},
            { text: "Mount Nebo",correct: false},
            { text: "Mount Zion",correct: false},
            { text: "Mount Carmel",correct: false},
        ]
    }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score  = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ===  "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

})
startQuiz();
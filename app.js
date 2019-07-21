const QUESTIONS = [
    {
    question: "Who is the franchise leader in rushing yards?",
    answer: [ 
        'Marshawn Lynch',
        'Shaun Alexander',
        'Curt Warner',
        'Chris Warren'
    ],
    correctAnswer: "Shaun Alexander"
    },
    {
    question: "Who is the franchise leader in touchdown passes?",
    answer: [
        'Russell Wilson',
        'Matt Hasselbeck',
        'Dave Krieg',
        'Charlie Whitehurst'
    ],
    correctAnswer: 'Russell Wilson'
    },
    {
    question: "What year did the franchise begin?",
    answer: [
        '1970',
        '2012',
        '1985',
        '1976'
    ],
    correctAnswer: '1976'
    },
    {
    question: 'What conference did the team originally start in?',
    answer: [
        'AFC',
        'NFC',
        'XFL',
        'CFL'
    ],
    correctAnswer: 'NFC'
    },
    {
    question: "How many Super Bowls have the Seahawks been to?",
    answer: [
        '1',
        '3',
        '5',
        '10'
    ],
    correctAnswer: '3'
    },
    {
    question: 'Who is the franchise leader in interceptions?',
    answer: [
        'Dave Brown',
        'Richard Sherman',
        'Eugene Robinson',
        'Earl Thomas'
    ],
    correctAnswer: 'Dave Brown'
    },
    {
    question: 'What season did the Seahawks win the Superbowl?',
    answer: [
        '05-06',
        '13-14',
        '14-15',
        '83-84'
    ],
    correctAnswer: '13-14'
    },
    {
    question: 'Who is the franchise leader in recieving yards?',
    answer: [
        'Doug Baldwin',
        'Steve Largent',
        'Brian Blades',
        'Joey Galloway'
    ],
    correctAnswer: 'Steve Largent'
    },
    {
    question: 'Who is the franchise leader in passing yards?',
    answer: [
        'Russell Wilson',
        'Dave Krieg',
        'Matt Hasselbeck',
        'Jim Zorn'
    ],
    correctAnswer: 'Matt Hasselbeck'
    },
    {
    question: 'Who is the winningest coach in franchise history?',
    answer: [
        'Mike Holmgren',
        'Chuck Knox',
        'Pete Carroll',
        'Jack Patera'
    ],
    correctAnswer: 'Pete Carroll'
    }
]

const STORE = {
    score: 0,
    currentQuestion: 0
}

$(document).ready(function() {
    $("#question-view").hide();
    $("#feedback-view").hide();
    $("#final-view").hide();

    $("#startQuiz").on("click", function() {
        console.log(STORE.score)
        $("#start-view").hide();
        $("#question-view").show();
        $("#question-view").html(generateQuestion());
    })


    $("#question-view").on("click", "#submitAnswer", function() {
        let answerVal = $("input[name='question']:checked").val();
        if (answerVal === undefined) {
            alert("You must select one!");
        } else {
            $("#question-view").hide();
            $("#feedback-view").show();
            evalAnswer();
        }
    })

    $("#feedback-view").on("click", "#nextQuestion", function() {
        if (STORE.currentQuestion === 10) {
            $("#final-view").show();
            $("#feedback-view").hide();
            $("#final-view").html(endGame());
        } else {
            $("#question-view").show();
            $("#feedback-view").hide();
            $("#question-view").html(generateQuestion());
        }
    })

    $("#final-view").on("click", "#playAgain", function() {
        resetQuiz();
        $("#start-view").show();
        $("#final-view").hide();
    })

    function resetQuiz() {
        STORE.currentQuestion = 0;
        STORE.score = 0;
    }


    function evalAnswer() {
        let answerVal = $("input[name='question']:checked").val();
        if (answerVal === QUESTIONS[STORE.currentQuestion].correctAnswer) {
            STORE.score++;
            STORE.currentQuestion++;
            $("#feedback-view").html(rightAnswer());
        } else {
            STORE.currentQuestion++;
            $("#feedback-view").html(wrongAnswer());
        }
    }

    function generateQuestion() {
        return `
            <header>
                <h1>Seattle Seahawks Trivia</h1>
                <ul>
                    <li>
                        <p>Question: ${STORE.currentQuestion + 1} of 10</p>
                    </li>
                    <li>
                        <p>Correct: ${STORE.score}</p>
                    </li>
                </ul>
            </header>
            <main>
                <p>Question ${STORE.currentQuestion + 1}.</p>
                <p>${QUESTIONS[STORE.currentQuestion].question}</p>
                <form>
                    <ul class="radiogroup">
                        <li>
                            <label for="A">
                                <input tabindex="0" type="radio" name="question" id="A" value="${QUESTIONS[STORE.currentQuestion].answer[0]}" >${QUESTIONS[STORE.currentQuestion].answer[0]}</input>
                            </label>
                        </li>
                        <li>
                            <label for="B">
                                <input type="radio" name="question" id="B" value="${QUESTIONS[STORE.currentQuestion].answer[1]}" >${QUESTIONS[STORE.currentQuestion].answer[1]}</input>
                            </label>                    
                        </li>
                        <li>   
                            <label for="C">
                                <input type="radio" name="question" id="C" value="${QUESTIONS[STORE.currentQuestion].answer[2]}" >${QUESTIONS[STORE.currentQuestion].answer[2]}</input>
                            </label>
                        </li>
                        <li>
                            <label for="D">
                                <input type="radio" name="question" id="D" value="${QUESTIONS[STORE.currentQuestion].answer[3]}" >${QUESTIONS[STORE.currentQuestion].answer[3]}</input>
                            </label>
                        </li>
                    </ul>
                </form>
                <button type="submit" id="submitAnswer">Submit Answer</button>
            </main> 
        `
    }

    function rightAnswer() {
        return `
        <header>
            <h1>Seattle Seahawks Trivia</h1>
            <ul>
                <li>
                    <p>Question: ${STORE.currentQuestion} of 10</p>
                </li>
                <li>
                    <p>Correct:  ${STORE.score}</p>
                </li>
            </ul>
        </header>
        <main>
            <p>Good Job!</p>
            <p>You got it right.</p>
            <button id="nextQuestion">Next</button>
        </main>
        `
    }

    function wrongAnswer() {
        return `
        <header>
        <h1>Seattle Seahawks Trivia</h1>
            <ul>
                <li>
                    <p>Question: ${STORE.currentQuestion} of 10</p>
                </li>
                <li>
                    <p>Correct: ${STORE.score}</p>
                </li>
            </ul>
        </header>
        <main>
            <p>Wrong!</p>
            <p>The correct answer is ${QUESTIONS[STORE.currentQuestion - 1].correctAnswer}.</p>
            <button id="nextQuestion">Next</button>
        </main>
        `
    }

    function endGame() {
        if (STORE.score >= 8) {
            return `
                <header>
                    <h1>Seattle Seahawks Trivia</h1>
                </header>
                <main>
                    <p>Congradulations!</p>
                    <p>You got ${STORE.score} out of 10 correct!</p>
                    <p>You are a true fan!</p>
                    <button id="playAgain">Play Again</button>
                </main>
            `
        } else if(STORE.score <= 7 && STORE.score > 4) {
            return `
                <header>
                    <h1>Seattle Seahawks Trivia</h1>
                </header>
                <main>
                    <p>Congradulations!</p>
                    <p>You got ${STORE.score} out of 10 correct!</p>
                    <p>You are somewhat of a fan!</p>
                    <button id="playAgain">Play Again</button>
                </main>
            `
        } else if (STORE.score < 5) {
            return `
                <header>
                    <h1>Seattle Seahawks Trivia</h1>
                </header>
                <main>
                    <p>Ehhh!</p>
                    <p>You got ${STORE.score} out of 10 correct.</p>
                    <p>You are not a fan.</p>
                    <button id="playAgain">Play Again</button>
                </main>
            `
        }
    }

});

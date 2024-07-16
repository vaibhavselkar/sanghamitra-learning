console.log("Javascript Loaded");

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const nextButton = document.getElementById('next-button');
    const previousButton = document.getElementById('previous-button');
    const endButton = document.getElementById('end-button');
    const restartButton = document.getElementById('restart-button');
    
    const homePage = document.getElementById('home');
    const quizPage = document.getElementById('quiz');
    const resultPage = document.getElementById('result');
    
    const questionElement = document.getElementById('question');
    const optionButtons = document.querySelectorAll('.option');
    const feedbackSection = document.getElementById('feedback');
    const explanationElement = document.getElementById('explanation');
    const synonymsElement = document.getElementById('synonyms');
    const antonymsElement = document.getElementById('antonyms');
    const phoneticElement = document.getElementById('phonetic');
    const pointsElement = document.getElementById('points');
    const cefrElement = document.getElementById('cefr');
    const totalScoreElement = document.getElementById('total-score');
    const comprehensiveAnalysis = document.getElementById('comprehensive-analysis');
    const vocabularyLevelElement = document.createElement('div');
    resultPage.appendChild(vocabularyLevelElement);

    let questions = [];
    let currentQuestionIndex = 0;
    let totalPoints = 0;
    let quizRunning = false;
    let answers = []; // To store user answers and feedback
    let cefrScores = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 }; // To track scores by CEFR level
    let correctAnswers = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 }; // Correct answers by CEFR level
    let totalQuestions = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 }; // Total questions by CEFR level
    let username = '';
    let email = '';
    
    async function fetchQuestions() {
        console.log('Fetching questions...');
        try {
            const response = await fetch('https://sanghamitra-learning-backend.vercel.app/api/vocab-questions');
            const data = await response.json();
            // Randomly select 20 questions
            questions = data.sort(() => 0.5 - Math.random()).slice(0, 20);
            answers = new Array(questions.length).fill(null); // Initialize answers array
            startQuiz();
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }
    
    function startQuiz() {
        if (quizRunning) {
            console.log('Quiz already running. Ignoring start request.');
            return; // Prevent multiple starts
        }
        console.log('Starting quiz...');
        homePage.classList.add('hidden');
        homePage.classList.remove('active');
        quizPage.classList.remove('hidden');
        quizPage.classList.add('active');
        currentQuestionIndex = 0;
        totalPoints = 0;
        answers = new Array(questions.length).fill(null); // Reset answers array
        cefrScores = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 }; // Reset CEFR scores
        correctAnswers = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 }; // Reset correct answers
        totalQuestions = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 }; // Reset total questions
        quizRunning = true;
        showQuestion();
    }
    
    function showQuestion() {
        console.log('Showing question:', currentQuestionIndex);
        if (currentQuestionIndex >= questions.length) {
            console.log('No more questions. Ending quiz.');
            endQuiz();
            return;
        }
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        optionButtons.forEach(button => {
            button.textContent = question.options[button.getAttribute('data-option')];
            button.classList.remove('selected');
        });
        feedbackSection.classList.add('hidden'); // Hide feedback section initially
        nextButton.classList.add('hidden'); // Hide next button initially
        endButton.classList.add('hidden'); // Hide end button initially

        // Restore the previously selected option, if any
        const savedAnswer = answers[currentQuestionIndex];
        if (savedAnswer) {
            const selectedOption = optionButtons[savedAnswer.selectedOptionIndex];
            selectedOption.classList.add('selected');
        }

        // Show or hide the "Previous" button
        if (currentQuestionIndex === 0) {
            previousButton.classList.add('hidden');
        } else {
            previousButton.classList.remove('hidden');
        }

        // Show "Next Question" or "End Quiz" button
        if (currentQuestionIndex === questions.length - 1) {
            nextButton.classList.add('hidden');
            endButton.classList.remove('hidden');
        } else {
            nextButton.classList.remove('hidden');
            endButton.classList.add('hidden');
        }
    }
    
    function recordAnswer(option) {
        const question = questions[currentQuestionIndex];
        const selectedOption = option.getAttribute('data-option');
        const selectedAnswer = selectedOption === question.correctOption;

        optionButtons.forEach(button => button.classList.remove('selected'));
        option.classList.add('selected');

        if (selectedAnswer) {
            correctAnswers[question.CEFRLevel]++;
            totalPoints += question.points; // Add points for correct answer
        }

        totalQuestions[question.CEFRLevel]++;

        // Store the answer and feedback
        answers[currentQuestionIndex] = {
            question_id: question.id,
            question_text: question.question,
            user_response: selectedOption,
            selectedOptionIndex: [...optionButtons].indexOf(option), // Save the index of the selected option
            correct_option: question.correctOption,
            explanation: question.explanation,
            synonyms: question.synonyms,
            antonyms: question.antonyms,
            phonetic: question.phonetic,
            points_awarded: selectedAnswer ? question.points : 0,
            difficulty_level: question.difficulty_level,
            CEFR_level: question.CEFRLevel,
            topic: question.topic,
            correct: selectedAnswer
        };
    }

    function determineVocabularyLevel() {
        let maxScore = 0;
        let vocabularyLevel = 'A1';
        for (let level in cefrScores) {
            const score = correctAnswers[level] / (totalQuestions[level] || 1);
            if (score > maxScore) {
                maxScore = score;
                vocabularyLevel = level;
            }
        }
        return vocabularyLevel;
    }

    function endQuiz() {
        // Evaluate unanswered questions as skipped
        for (let i = 0; i < questions.length; i++) {
            if (answers[i] === null) {
                answers[i] = {
                    question_id: questions[i].id,
                    question_text: questions[i].question,
                    user_response: "You did not answer this question.",
                    selectedOptionIndex: -1,
                    correct_option: questions[i].correctOption,
                    explanation: questions[i].explanation,
                    synonyms: questions[i].synonyms,
                    antonyms: questions[i].antonyms,
                    phonetic: questions[i].phonetic,
                    points_awarded: 0,
                    difficulty_level: questions[i].difficulty_level,
                    CEFR_level: questions[i].CEFRLevel,
                    topic: questions[i].topic,
                    correct: false
                };
            }
        }
        quizPage.classList.add('hidden');
        quizPage.classList.remove('active');
        resultPage.classList.remove('hidden');
        resultPage.classList.add('active');
        totalScoreElement.textContent = `Total Points: ${totalPoints}`;
        displayComprehensiveAnalysis();
        displayVocabularyLevel();
        quizRunning = false; // Reset state when quiz ends
        console.log('Quiz ended. Total points:', totalPoints);
        sendResultsToServer();
    }

    function displayComprehensiveAnalysis() {
        comprehensiveAnalysis.innerHTML = `<h3>Total Points: ${totalPoints}</h3>`;
        questions.forEach((question, index) => {
            const answer = answers[index];
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('analysis-question');
            answerDiv.classList.add(answer.correct ? 'correct-answer' : 'incorrect-answer');
            answerDiv.innerHTML = `
                <div class="question-header">
                    <span class="${answer.correct ? 'correct-icon' : answer.user_response === "You did not answer this question." ? 'skipped-icon' : 'incorrect-icon'}"></span>
                    <p>Question ${index + 1}: ${question.question}</p>
                </div>
                <p>Your answer: ${answer.user_response}</p>
                <p>Correct answer: ${answer.correct_option}</p>
                <button class="expand-button">Expand</button>
                <div class="expandable hidden">
                    <p>Explanation: ${answer.explanation}</p>
                    <p>Synonyms: ${answer.synonyms.join(', ')}</p>
                    <p>Antonyms: ${answer.antonyms.join(', ')}</p>
                    <p>Phonetic: ${answer.phonetic}</p>
                    <p>Points Earned: ${answer.points_awarded}</p>
                    <p>CEFR Level: ${answer.CEFR_level}</p>
                </div>
            `;
            comprehensiveAnalysis.appendChild(answerDiv);
        });

        // Add event listeners to expand buttons
        const expandButtons = document.querySelectorAll('.expand-button');
        expandButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const expandable = button.nextElementSibling;
                expandable.classList.toggle('hidden');
                if (!expandable.classList.contains('hidden')) {
                    button.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function displayVocabularyLevel() {
        const level = determineVocabularyLevel();
        vocabularyLevelElement.innerHTML = `<h3>Your Vocabulary Level is: ${level}</h3>`;
    }

    async function sendResultsToServer() {
        const assessment = {
            assessment_id: 'random-id', // Replace with actual assessment ID
            date: new Date().toISOString(),
            total_score: totalPoints,
            questions: answers
        };

        const data = {
            username,
            email,
            assessments: [assessment]
        };

        try {
            const response = await fetch('https://sanghamitra-learning-backend.vercel.app/api/vocabscores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Results successfully sent to the server.');
            } else {
                console.error('Failed to send results to the server.');
            }
        } catch (error) {
            console.error('Error sending results to the server:', error);
        }
    }

    document.getElementById('user-form').addEventListener('submit', (event) => {
        event.preventDefault();
        username = document.getElementById('username').value;
        email = document.getElementById('email').value;
        startQuiz();
    });
    
    nextButton.addEventListener('click', () => {
        console.log('Next button clicked');
        currentQuestionIndex++;
        showQuestion();
    });

    previousButton.addEventListener('click', () => {
        console.log('Previous button clicked');
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    });

    endButton.addEventListener('click', () => {
        console.log('End button clicked');
        endQuiz();
    });
    
    restartButton.addEventListener('click', () => {
        console.log('Restart button clicked');
        startButton.disabled = false;
        resultPage.classList.add('hidden');
        resultPage.classList.remove('active');
        homePage.classList.remove('hidden');
        homePage.classList.add('active');
        quizRunning = false; // Reset state on restart
        console.log('Quiz restarted.');
    });
    
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            recordAnswer(button);
        });
    });
});

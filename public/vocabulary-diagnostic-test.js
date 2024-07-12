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
    
    function fetchQuestions() {
        console.log('Fetching questions...');
        questions = [
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "imagine"?',
                options: {
                    a: 'neglect',
                    b: 'ignore',
                    c: 'visualize',
                    d: 'disregard'
                },
                correctOption: 'c',
                explanation: 'Imagine means to form a mental image or concept of.',
                synonyms: ['visualize', 'envision', 'conceive'],
                antonyms: ['neglect', 'ignore'],
                phonetic: 'ɪˈmædʒɪn',
                difficultyLevel: 'easy',
                CEFRLevel: 'A1',
                topic: 'vocabulary',
                points: 10
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "kind"?',
                options: {
                    a: 'cruel',
                    b: 'mean',
                    c: 'gentle',
                    d: 'harsh'
                },
                correctOption: 'c',
                explanation: 'Kind means having or showing a friendly, generous, and considerate nature.',
                synonyms: ['gentle', 'compassionate', 'benevolent'],
                antonyms: ['cruel', 'mean'],
                phonetic: 'kaɪnd',
                difficultyLevel: 'easy',
                CEFRLevel: 'A1',
                topic: 'vocabulary',
                points: 10
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "natural"?',
                options: {
                    a: 'artificial',
                    b: 'real',
                    c: 'genuine',
                    d: 'authentic'
                },
                correctOption: 'a',
                explanation: 'Natural means existing in or caused by nature; not made or caused by humankind.',
                synonyms: ['real', 'genuine', 'authentic'],
                antonyms: ['artificial', 'synthetic'],
                phonetic: 'ˈnætʃərəl',
                difficultyLevel: 'easy',
                CEFRLevel: 'A1',
                topic: 'vocabulary',
                points: 10
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "silent"?',
                options: {
                    a: 'noisy',
                    b: 'quiet',
                    c: 'loud',
                    d: 'boisterous'
                },
                correctOption: 'b',
                explanation: 'Silent means not making or accompanied by any sound.',
                synonyms: ['quiet', 'still', 'soundless'],
                antonyms: ['noisy', 'loud'],
                phonetic: 'ˈsaɪlənt',
                difficultyLevel: 'easy',
                CEFRLevel: 'A1',
                topic: 'vocabulary',
                points: 10
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "young"?',
                options: {
                    a: 'old',
                    b: 'elderly',
                    c: 'aged',
                    d: 'ancient'
                },
                correctOption: 'a',
                explanation: 'Young means having lived or existed for only a short time.',
                synonyms: ['new', 'fresh', 'juvenile'],
                antonyms: ['old', 'aged'],
                phonetic: 'jʌŋ',
                difficultyLevel: 'easy',
                CEFRLevel: 'A1',
                topic: 'vocabulary',
                points: 10
            },
            
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "noxious"?',
                options: {
                    a: 'harmful',
                    b: 'innocuous',
                    c: 'toxic',
                    d: 'dangerous'
                },
                correctOption: 'b',
                explanation: 'Noxious means harmful, poisonous, or very unpleasant.',
                synonyms: ['harmful', 'toxic', 'dangerous'],
                antonyms: ['innocuous', 'benign'],
                phonetic: 'ˈnɒkʃəs',
                difficultyLevel: 'hard',
                CEFRLevel: 'C1',
                topic: 'vocabulary',
                points: 30
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "opulent"?',
                options: {
                    a: 'luxurious',
                    b: 'sparse',
                    c: 'modest',
                    d: 'humble'
                },
                correctOption: 'a',
                explanation: 'Opulent means ostentatiously rich and luxurious or lavish.',
                synonyms: ['luxurious', 'sumptuous', 'grand'],
                antonyms: ['sparse', 'modest'],
                phonetic: 'ˈɒpjʊlənt',
                difficultyLevel: 'hard',
                CEFRLevel: 'C1',
                topic: 'vocabulary',
                points: 30
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "pernicious"?',
                options: {
                    a: 'harmful',
                    b: 'beneficial',
                    c: 'destructive',
                    d: 'noxious'
                },
                correctOption: 'b',
                explanation: 'Pernicious means having a harmful effect, especially in a gradual or subtle way.',
                synonyms: ['harmful', 'destructive', 'noxious'],
                antonyms: ['beneficial', 'salutary'],
                phonetic: 'pəˈnɪʃəs',
                difficultyLevel: 'hard',
                CEFRLevel: 'C1',
                topic: 'vocabulary',
                points: 30
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "querulous"?',
                options: {
                    a: 'complaining',
                    b: 'contented',
                    c: 'peaceful',
                    d: 'quiet'
                },
                correctOption: 'a',
                explanation: 'Querulous means complaining in a petulant or whining manner.',
                synonyms: ['complaining', 'whining', 'petulant'],
                antonyms: ['contented', 'peaceful'],
                phonetic: 'ˈkwɛrjʊləs',
                difficultyLevel: 'hard',
                CEFRLevel: 'C1',
                topic: 'vocabulary',
                points: 30
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "reverent"?',
                options: {
                    a: 'respectful',
                    b: 'irreverent',
                    c: 'honoring',
                    d: 'adulatory'
                },
                correctOption: 'b',
                explanation: 'Reverent means feeling or showing deep and solemn respect.',
                synonyms: ['respectful', 'honoring', 'adulatory'],
                antonyms: ['irreverent', 'disrespectful'],
                phonetic: 'ˈrɛvərənt',
                difficultyLevel: 'hard',
                CEFRLevel: 'C1',
                topic: 'vocabulary',
                points: 30
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "abundant"?',
                options: {
                    a: 'scarce',
                    b: 'plentiful',
                    c: 'rare',
                    d: 'limited'
                },
                correctOption: 'b',
                explanation: 'Abundant means existing or available in large quantities.',
                synonyms: ['plentiful', 'ample', 'profuse'],
                antonyms: ['scarce', 'sparse'],
                phonetic: 'əˈbʌndənt',
                difficultyLevel: 'easy',
                CEFRLevel: 'A2',
                topic: 'vocabulary',
                points: 10
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "brave"?',
                options: {
                    a: 'fearful',
                    b: 'courageous',
                    c: 'bold',
                    d: 'heroic'
                },
                correctOption: 'a',
                explanation: 'Brave means ready to face and endure danger or pain; showing courage.',
                synonyms: ['courageous', 'bold', 'heroic'],
                antonyms: ['fearful', 'cowardly'],
                phonetic: 'breɪv',
                difficultyLevel: 'easy',
                CEFRLevel: 'A2',
                topic: 'vocabulary',
                points: 10
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "cheerful"?',
                options: {
                    a: 'sad',
                    b: 'happy',
                    c: 'angry',
                    d: 'tired'
                },
                correctOption: 'b',
                explanation: 'Cheerful means noticeably happy and optimistic.',
                synonyms: ['happy', 'joyful', 'merry'],
                antonyms: ['sad', 'gloomy'],
                phonetic: 'ˈtʃɪrfəl',
                difficultyLevel: 'easy',
                CEFRLevel: 'A2',
                topic: 'vocabulary',
                points: 10
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "eager"?',
                options: {
                    a: 'reluctant',
                    b: 'enthusiastic',
                    c: 'unwilling',
                    d: 'indifferent'
                },
                correctOption: 'b',
                explanation: 'Eager means wanting to do or have something very much.',
                synonyms: ['enthusiastic', 'keen', 'excited'],
                antonyms: ['reluctant', 'unwilling'],
                phonetic: 'ˈiɡər',
                difficultyLevel: 'easy',
                CEFRLevel: 'A2',
                topic: 'vocabulary',
                points: 10
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "famous"?',
                options: {
                    a: 'unknown',
                    b: 'renowned',
                    c: 'popular',
                    d: 'celebrated'
                },
                correctOption: 'a',
                explanation: 'Famous means known about by many people.',
                synonyms: ['renowned', 'celebrated', 'popular'],
                antonyms: ['unknown', 'obscure'],
                phonetic: 'ˈfeɪməs',
                difficultyLevel: 'easy',
                CEFRLevel: 'A2',
                topic: 'vocabulary',
                points: 10
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "mystery"?',
                options: {
                    a: 'certainty',
                    b: 'puzzle',
                    c: 'clarity',
                    d: 'obvious'
                },
                correctOption: 'b',
                explanation: 'Mystery means something that is difficult or impossible to understand or explain.',
                synonyms: ['puzzle', 'enigma', 'riddle'],
                antonyms: ['certainty', 'clarity'],
                phonetic: 'ˈmɪstəri',
                difficultyLevel: 'medium',
                CEFRLevel: 'B1',
                topic: 'vocabulary',
                points: 20
            },
            
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "optimistic"?',
                options: {
                    a: 'hopeful',
                    b: 'positive',
                    c: 'pessimistic',
                    d: 'cheerful'
                },
                correctOption: 'c',
                explanation: 'Optimistic means hopeful and confident about the future.',
                synonyms: ['hopeful', 'positive', 'cheerful'],
                antonyms: ['pessimistic', 'negative'],
                phonetic: 'ˌɒptɪˈmɪstɪk',
                difficultyLevel: 'medium',
                CEFRLevel: 'B1',
                topic: 'vocabulary',
                points: 20
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "trustworthy"?',
                options: {
                    a: 'reliable',
                    b: 'unreliable',
                    c: 'dependable',
                    d: 'credible'
                },
                correctOption: 'b',
                explanation: 'Trustworthy means able to be relied on as honest or truthful.',
                synonyms: ['reliable', 'dependable', 'credible'],
                antonyms: ['unreliable', 'untrustworthy'],
                phonetic: 'ˈtrʌstˌwɜrði',
                difficultyLevel: 'medium',
                CEFRLevel: 'B1',
                topic: 'vocabulary',
                points: 20
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "unusual"?',
                options: {
                    a: 'common',
                    b: 'ordinary',
                    c: 'rare',
                    d: 'regular'
                },
                correctOption: 'c',
                explanation: 'Unusual means not habitually or commonly occurring or done.',
                synonyms: ['rare', 'unique', 'exceptional'],
                antonyms: ['common', 'ordinary'],
                phonetic: 'ʌnˈjuʒuəl',
                difficultyLevel: 'medium',
                CEFRLevel: 'B1',
                topic: 'vocabulary',
                points: 20
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "visible"?',
                options: {
                    a: 'hidden',
                    b: 'apparent',
                    c: 'clear',
                    d: 'evident'
                },
                correctOption: 'a',
                explanation: 'Visible means able to be seen.',
                synonyms: ['apparent', 'clear', 'evident'],
                antonyms: ['hidden', 'invisible'],
                phonetic: 'ˈvɪzəbl',
                difficultyLevel: 'medium',
                CEFRLevel: 'B1',
                topic: 'vocabulary',
                points: 20
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "zealous"?',
                options: {
                    a: 'indifferent',
                    b: 'apathetic',
                    c: 'enthusiastic',
                    d: 'uninterested'
                },
                correctOption: 'c',
                explanation: 'Zealous means having or showing excitement.',
                synonyms: ['enthusiastic', 'passionate', 'fervent'],
                antonyms: ['indifferent', 'apathetic'],
                phonetic: 'ˈzɛləs',
                difficultyLevel: 'medium',
                CEFRLevel: 'B2',
                topic: 'vocabulary',
                points: 20
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "obscure"?',
                options: {
                    a: 'ambiguous',
                    b: 'clear',
                    c: 'vague',
                    d: 'uncertain'
                },
                correctOption: 'b',
                explanation: 'Obscure means not discovered or known about; uncertain.',
                synonyms: ['ambiguous', 'vague', 'unclear'],
                antonyms: ['clear', 'evident'],
                phonetic: 'əbˈskjʊə',
                difficultyLevel: 'medium',
                CEFRLevel: 'B2',
                topic: 'vocabulary',
                points: 20
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "vivid"?',
                options: {
                    a: 'dull',
                    b: 'faint',
                    c: 'lively',
                    d: 'dim'
                },
                correctOption: 'c',
                explanation: 'Vivid means producing powerful feelings or strong, clear images in the mind.',
                synonyms: ['lively', 'colorful', 'bright'],
                antonyms: ['dull', 'faint'],
                phonetic: 'ˈvɪvɪd',
                difficultyLevel: 'medium',
                CEFRLevel: 'B2',
                topic: 'vocabulary',
                points: 20
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "candid"?',
                options: {
                    a: 'dishonest',
                    b: 'guarded',
                    c: 'honest',
                    d: 'evasive'
                },
                correctOption: 'c',
                explanation: 'Candid means truthful and straightforward; frank.',
                synonyms: ['honest', 'frank', 'open'],
                antonyms: ['dishonest', 'evasive'],
                phonetic: 'ˈkændɪd',
                difficultyLevel: 'medium',
                CEFRLevel: 'B2',
                topic: 'vocabulary',
                points: 20
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "deliberate"?',
                options: {
                    a: 'intentional',
                    b: 'purposeful',
                    c: 'accidental',
                    d: 'premeditated'
                },
                correctOption: 'c',
                explanation: 'Deliberate means done consciously and intentionally.',
                synonyms: ['intentional', 'purposeful', 'premeditated'],
                antonyms: ['accidental', 'unintentional'],
                phonetic: 'dɪˈlɪbərət',
                difficultyLevel: 'medium',
                CEFRLevel: 'B2',
                topic: 'vocabulary',
                points: 20
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "vociferous"?',
                options: {
                    a: 'loud',
                    b: 'quiet',
                    c: 'noisy',
                    d: 'boisterous'
                },
                correctOption: 'b',
                explanation: 'Vociferous means vehement or clamorous.',
                synonyms: ['loud', 'noisy', 'boisterous'],
                antonyms: ['quiet', 'soft-spoken'],
                phonetic: 'vəˈsɪfərəs',
                difficultyLevel: 'hard',
                CEFRLevel: 'C2',
                topic: 'vocabulary',
                points: 30
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "Clandestine"?',
                options: {
                    a: 'Open',
                    b: 'Secret',
                    c: 'Public',
                    d: 'Apparent'
                },
                correctOption: 'b',
                explanation: 'Clandestine means kept secret or done secretively, especially because illicit.',
                synonyms: ['Secret', 'Covert', 'Undercover'],
                antonyms: ['Open', 'Public'],
                phonetic: 'klænˈdɛstɪn',
                difficultyLevel: 'hard',
                CEFRLevel: 'C2',
                topic: 'vocabulary',
                points: 30
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "Kaleidoscopic"?',
                options: {
                    a: 'Dull',
                    b: 'Monotonous',
                    c: 'Colorful',
                    d: 'Boring'
                },
                correctOption: 'c',
                explanation: 'Kaleidoscopic means continually shifting or rapidly changing.',
                synonyms: ['Colorful', 'Vibrant', 'Variegated'],
                antonyms: ['Dull', 'Monotonous'],
                phonetic: 'kəˌlaɪdəˈskɒpɪk',
                difficultyLevel: 'hard',
                CEFRLevel: 'C2',
                topic: 'vocabulary',
                points: 30
            },
            {
                questionType: 'vocabulary',
                question: 'What is the synonym of the word "gregarious"?',
                options: {
                    a: 'shy',
                    b: 'reserved',
                    c: 'sociable',
                    d: 'introverted'
                },
                correctOption: 'c',
                explanation: 'Gregarious means (of a person) fond of company; sociable.',
                synonyms: ['sociable', 'outgoing', 'extroverted'],
                antonyms: ['shy', 'reserved'],
                phonetic: 'ɡrɪˈɡɛəriəs',
                difficultyLevel: 'hard',
                CEFRLevel: 'C2',
                topic: 'vocabulary',
                points: 30
            },
            {
                questionType: 'vocabulary',
                question: 'What is the antonym of the word "immutable"?',
                options: {
                    a: 'unchanging',
                    b: 'fixed',
                    c: 'variable',
                    d: 'steady'
                },
                correctOption: 'c',
                explanation: 'Immutable means unchanging over time or unable to be changed.',
                synonyms: ['unchanging', 'fixed', 'steady'],
                antonyms: ['variable', 'changeable'],
                phonetic: 'ɪˈmjuːtəbl',
                difficultyLevel: 'hard',
                CEFRLevel: 'C2',
                topic: 'vocabulary',
                points: 30
            },
            // Add more questions from each CEFR level
        ];
        answers = new Array(questions.length).fill(null); // Initialize answers array
        startQuiz();
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
            button.classList.remove('correct', 'incorrect', 'selected'); // Reset styles
        });
        feedbackSection.classList.add('hidden'); // Hide feedback section initially
        explanationElement.textContent = ''; // Clear previous explanation
        synonymsElement.textContent = ''; // Clear previous synonyms
        antonymsElement.textContent = ''; // Clear previous antonyms
        phoneticElement.textContent = ''; // Clear previous phonetic
        pointsElement.textContent = ''; // Clear previous points
        cefrElement.textContent = ''; // Clear previous CEFR
        nextButton.classList.add('hidden'); // Hide next button initially
        endButton.classList.add('hidden'); // Hide end button initially

        // Restore the previously selected option, if any
        const savedAnswer = answers[currentQuestionIndex];
        if (savedAnswer) {
            const selectedOption = optionButtons[savedAnswer.selectedOptionIndex];
            selectedOption.classList.add('selected');
            if (savedAnswer.correct) {
                selectedOption.classList.add('correct');
            } else {
                selectedOption.classList.add('incorrect');
                const correctButton = document.querySelector(`.option[data-option="${question.correctOption}"]`);
                correctButton.classList.add('correct');
            }
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
        const correctOption = question.correctOption;
        const selectedAnswer = option.getAttribute('data-option') === correctOption;
        optionButtons.forEach(button => {
            button.classList.remove('selected');
        });
        option.classList.add('selected');
        if (selectedAnswer) {
            option.classList.add('correct');
            totalPoints += question.points; // Add points for correct answer
            cefrScores[question.CEFRLevel] += question.points; // Add points to CEFR level score
        } else {
            option.classList.add('incorrect');
            const correctButton = document.querySelector(`.option[data-option="${correctOption}"]`);
            correctButton.classList.add('correct');
        }
        // Store the answer and feedback
        answers[currentQuestionIndex] = {
            question: question.question,
            selectedOption: option.textContent,
            selectedOptionIndex: [...optionButtons].indexOf(option), // Save the index of the selected option
            correctOption: question.options[correctOption],
            explanation: question.explanation,
            synonyms: question.synonyms,
            antonyms: question.antonyms,
            phonetic: question.phonetic,
            points: question.points,
            cefr: question.CEFRLevel,
            correct: selectedAnswer
        };
    }

    function determineVocabularyLevel() {
        let maxScore = 0;
        let vocabularyLevel = 'A1';
        for (let level in cefrScores) {
            if (cefrScores[level] > maxScore) {
                maxScore = cefrScores[level];
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
                    question: questions[i].question,
                    selectedOption: "You did not answer this question.",
                    selectedOptionIndex: -1,
                    correctOption: questions[i].options[questions[i].correctOption],
                    explanation: questions[i].explanation,
                    synonyms: questions[i].synonyms,
                    antonyms: questions[i].antonyms,
                    phonetic: questions[i].phonetic,
                    points: questions[i].points,
                    cefr: questions[i].CEFRLevel,
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
                    <span class="${answer.correct ? 'correct-icon' : answer.selectedOption === "You did not answer this question." ? 'skipped-icon' : 'incorrect-icon'}"></span>
                    <p>Question ${index + 1}: ${question.question}</p>
                </div>
                <p>Your answer: ${answer.selectedOption}</p>
                <p>Correct answer: ${answer.correctOption}</p>
                <button class="expand-button">Expand</button>
                <div class="expandable hidden">
                    <p>Explanation: ${answer.explanation}</p>
                    <p>Synonyms: ${answer.synonyms.join(', ')}</p>
                    <p>Antonyms: ${answer.antonyms.join(', ')}</p>
                    <p>Phonetic: ${answer.phonetic}</p>
                    <p>Points Earned: ${answer.correct ? answer.points : 0}</p>
                    <p>CEFR Level: ${answer.cefr}</p>
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

    startButton.addEventListener('click', () => {
        console.log('Start button clicked!');
        if (quizRunning) {
            console.log('Quiz is already running. Ignoring start button click.');
            return; // Ignore if the quiz is already running
        }
        startButton.disabled = true;
        fetchQuestions();
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

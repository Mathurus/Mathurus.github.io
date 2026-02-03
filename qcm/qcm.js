const questions = [
            {
                question: "Quelle est la capitale de la France ?",
                options: ["Londres", "Paris", "Berlin", "Madrid"],
                correct: 1
            },
            {
                question: "Combien de continents y a-t-il sur Terre ?",
                options: ["5", "6", "7", "8"],
                correct: 2
            },
            {
                question: "Qui a peint la Joconde ?",
                options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
                correct: 2
            },
            {
                question: "Quelle est la planète la plus proche du Soleil ?",
                options: ["Vénus", "Mercure", "Mars", "Terre"],
                correct: 1
            },
            {
                question: "En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?",
                options: ["1965", "1967", "1969", "1971"],
                correct: 2
            }
        ];

        let userAnswers = {};

        function renderQuiz() {
            const quizContainer = document.getElementById('quiz');
            quizContainer.innerHTML = '';

            questions.forEach((q, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question-container';
                questionDiv.innerHTML = `
                    <div class="question">${index + 1}. ${q.question}</div>
                    <div class="options" id="options-${index}">
                        ${q.options.map((option, optIndex) => `
                            <label class="option" id="option-${index}-${optIndex}">
                                <input type="radio" name="question-${index}" value="${optIndex}" 
                                    onchange="saveAnswer(${index}, ${optIndex})">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                `;
                quizContainer.appendChild(questionDiv);
            });
        }

        function saveAnswer(questionIndex, optionIndex) {
            userAnswers[questionIndex] = optionIndex;
        }

        function checkAnswers() {
            if (Object.keys(userAnswers).length < questions.length) {
                alert('Veuillez répondre à toutes les questions !');
                return;
            }

            let score = 0;

            questions.forEach((q, index) => {
                const userAnswer = userAnswers[index];
                const correctAnswer = q.correct;

                q.options.forEach((option, optIndex) => {
                    const optionElement = document.getElementById(`option-${index}-${optIndex}`);
                    const radio = optionElement.querySelector('input');
                    radio.disabled = true;

                    if (optIndex === correctAnswer) {
                        optionElement.classList.add('correct');
                    } else if (optIndex === userAnswer && userAnswer !== correctAnswer) {
                        optionElement.classList.add('incorrect');
                    }
                });

                if (userAnswer === correctAnswer) {
                    score++;
                }
            });

            displayResult(score);
            document.getElementById('submitBtn').style.display = 'none';
            document.getElementById('resetBtn').style.display = 'inline-block';
        }

        function displayResult(score) {
            const resultDiv = document.getElementById('result');
            const percentage = (score / questions.length) * 100;
            
            resultDiv.classList.add('show');
            resultDiv.innerHTML = `Votre score : ${score} / ${questions.length} (${percentage}%)`;

            if (percentage >= 80) {
                resultDiv.className = 'result show success';
                resultDiv.innerHTML += '<br>Excellent travail !';
            } else if (percentage >= 50) {
                resultDiv.className = 'result show average';
                resultDiv.innerHTML += '<br>Pas mal !';
            } else {
                resultDiv.className = 'result show fail';
                resultDiv.innerHTML += '<br>Continuez à apprendre !';
            }
        }

        function resetQuiz() {
            userAnswers = {};
            document.getElementById('result').classList.remove('show');
            document.getElementById('submitBtn').style.display = 'inline-block';
            document.getElementById('resetBtn').style.display = 'none';
            renderQuiz();
        }

        renderQuiz();

const questions = [
            {
                question: "Quelles sont les sources d'énergies les plus utilisées dans une smart city ? ",
                options: ["Thermique", "Hydrolique", "Solaire", "Nucléaire"],
                correct: 2
            },
            {
                question: "Qu'est ce qu'une smart city ?",
                options: ["Une villes uniquement composée de gratte ciel", "Une ville qui utilise les technologies numériques pour améliorer la vie des habitants", "Une ville sans voitures", "Une ville touristique"],
                correct: 1
            },
            {
                question: "Qu'est ce qui est souvent utilisé dans une smart city pour collecter des informations ?",
                options: ["Des capteurs connectés", "Des livres", "Des journaux papier", "Des panneaux publicitaires"],
                correct: 0
            },
            {
                question: "Quel est un exemple de trasport dans une smart city ?",
                options: ["Les transports éléctriques ", "Les calèches", "Les voitures volantes", "Fusée"],
                correct: 0
            },
            {
                question: "Pourquoi les smart cities utilisent-elles des données ?",
                options: ["Pour décorer la ville", "Pour améliorer les services et l'organisation", "Pour ralentir les transport", "Pour supprimer internet"],
                correct: 1
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

$(function() {
  console.log( "ready!" );

const STORE = [{
  question: 'What year was the Roland TR-909 released?',
  answers: [
    '1978',
    '1983',
    '1988',
    '2001'
  ],
  correctAnswer: '1983'
},
{
  question: 'Who designed the TR-909?',
  answers: [
    'Tadao Kikumoto',
    'Kieran Hebden',
    'Kenichiro Nishi',
    'Don Lewis'
  ],
  correctAnswer: 'Tadao Kikumoto'
},
{
  question: "How many TR-909's were built?",
  answers: [
    '5,000,000',
    '7,000,000',
    '10,000',
    '200,000'
  ],
  correctAnswer: '10,000'
},
{
  question: 'How much did the TR-909 originally cost?',
  answers: [
    '$500',
    '$999',
    '$2,999',
    '$1,195'
  ],
  correctAnswer: '$1,195'
},
{
  question: 'What does "TR" stand for?',
  answers: [
    'Trans-Regulatory',
    'Tinnitus Respiration',
    'Transistor Rhythm',
    'Triple Riveted'
  ],
  correctAnswer: 'Transistor Rhythm'
},
{
  question: 'Was the TR-909 Analog or Digital?',
  answers: [
    'Analog',
    'Digital',
    'Both',
    'Neither'
  ],
  correctAnswer: 'Both'
},
{
  question: 'How many different drum sounds does the 909 have?',
  answers: [
    '1',
    '10',
    '100',
    '1000'
  ],
  correctAnswer: '10'
},
{
  question: 'What innovative feature did the 909 introduce?',
  answers: [
    "LFO's",
    'MIDI',
    'Sub Frequencies',
    'Polyphonic Voices'
  ],
  correctAnswer: 'MIDI'
},
{
  question: 'What was the first official release showcasing the 909?',
  answers: [
    'Frankie Knuckles - The Whistle Song',
    'Madonna - Vogue',
    'Derrick May - Strings of Life',
    'Skinny Puppy - Remission'
  ],
  correctAnswer: 'Skinny Puppy - Remission'
},
];
  


  let score = 0;
  let questionNumber = 0;
  


  function generateQuestion() {
    if (questionNumber < STORE.length) {
      return createThing(questionNumber);
    } else {
      $('.questionBox').hide();
      finalScore();
      $('.questionNumber').text(10);
    }
  }
  


  function updateScore() {
    score++;
    $('.score').text(score);
  }
  


  function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
  }
  


  function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
  }
  


  function startQuiz() {
    $('.altBox').hide();
    $('.startQuiz').on('click', '.startButton', function (event) {
      $('.startQuiz').hide();
      $('.questionNumber').text(1);
      $('.questionBox').show();
      $('.questionBox').prepend(generateQuestion());
    });
  }
  


  function submitAnswer() {
    $('.region').on('submit', function (event) {
      event.preventDefault();
      $('.altBox').hide();
      $('.response').show();
      let selected = $('input:checked');
      let answer = selected.val();
      let correct = STORE[questionNumber].correctAnswer;
      if (answer === correct) {
        correctAnswer();
      } else {
        wrongAnswer();
      }
    });
  }
  


  function createThing(questionIndex) {
    let formMaker = $(`<form>
      <fieldset>
        <legend class="questionText">${STORE[questionIndex].question}</legend>
      </fieldset>
    </form>`)
  
    let fieldSelector = $(formMaker).find('fieldset');
  
    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
      $(`<label class="sizeMe" for="${answerIndex}">
          <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
          <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
    return formMaker;
  }
  


  function correctAnswer() {
    $('.response').html(
      `<h3>That is correct!</h3>
        <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
  }
  


  function wrongAnswer() {
    $('.response').html(
      `<h3>That is incorrect...</h3>
      <p class="sizeMe">It's actually:</p>
      <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
      <button type="button" class="nextButton button">Next</button>`
    );
  }
  


  function nextQuestion() {
    $('.region').on('click', '.nextButton', function (event) {
      $('.altBox').hide();
      $('.questionBox').show();
      updateQuestionNumber();
      $('.questionBox form').replaceWith(generateQuestion());
    });
  }
  


  function finalScore() {
    $('.final').show();
  
    const great = [
      'Great job!',
    ];
  
    const good = [
      'Good, not great.',
    ];
  
    const bad = [
      'Were you even trying?',
    ];
  
    if (score >= 8) {
      array = great;
    } else if (score < 8 && score >= 5) {
      array = good;
    } else {
      array = bad;
    }
    return $('.final').html(
      `<h3>${array[0]}</h3>
          <h3>Your score is ${score} / 10</h3>
          <button type="submit" class="restartButton button">Restart</button>`
    );
  }
  


  function restartQuiz() {
    $('.region').on('click', '.restartButton', function (event) {
      event.preventDefault();
      resetStats();
      $('.altBox').hide();
      $('.startQuiz').show();
    });
  }
  

  
  function makeQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
  }
  
  $(makeQuiz);
  
});
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const progressBar = document.getElementById('progress-bar');

let currentQuestion = 0;
let answers = [];

// Questions
const questions = [
  "You regularly make new friends.",
  "You prefer to do your chores before allowing yourself to relax.",
  "When making decisions, you focus more on how the affected people might feel than on what is most logical or efficient.",
  "You are willing to bend the truth to make someone feel better.",
  "You enjoy experimenting with new and untested approaches.",
  "You like to use organizing tools like schedules and lists.",
  "You enjoy participating in team-based activities.",
  "Your living and working spaces are clean and organized.", 
  "You are more likely to rely on emotional intuition than logical reasoning when making a choice.",
  "You become bored or lose interest when the discussion gets highly theoretical.",
  "You usually feel more persuaded by what resonates emotionally with you than by factual arguments.", 
  "You often allow the day to unfold without any schedule at all.",
  "You enjoy solitary hobbies or activities more than group ones.",
  "You actively seek out new experiences and knowledge areas to explore.",
  "You feel comfortable just walking up to someone you find interesting and striking up a conversation.",
  "You favor efficiency in decisions, even if it means disregarding some emotional aspects.",
  "You prioritize and plan tasks effectively, often completing them well before the deadline.",
  "You are not too interested in discussions about various interpretations of creative works.",
  "You find the idea of networking or promoting yourself to strangers very daunting.",
  "Complex and novel ideas excite you more than simple and straightforward ones."
];

// "Start"
startBtn.addEventListener('click', () => {
  startContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  mbtiDescription.style.display = 'none'; 
  showQuestion();
});


// "Next"
nextBtn.addEventListener('click', () => {
  if (currentQuestion < questions.length - 1) {
    saveAnswer();
    if (answers[currentQuestion] !== 'Yes' && answers[currentQuestion] !== 'No') {
      alert('Please select an answer');
      return;
    }
    currentQuestion++;
    showQuestion();
    if (currentQuestion === questions.length - 1) {
      nextBtn.innerText = 'See the result';
    }
  } else {
    showResult();
  }
});

// "Previous"
prevBtn.addEventListener('click', () => {
  currentQuestion--;
  showQuestion();
});

function showQuestion() {
  questionElement.innerText = questions[currentQuestion];
  clearAnswers();
  if (currentQuestion === 0) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'inline';
  }
}

function saveAnswer() {
  const yes = document.getElementById('yes');
  const no = document.getElementById('no');
  if (yes.checked) {
    answers[currentQuestion] = 'Yes';
  } else if (no.checked) {
    answers[currentQuestion] = 'No';
  }
}

function clearAnswers() {
  const inputs = document.querySelectorAll('input[name="answer"]');
  inputs.forEach(input => {
    input.checked = false;
  });
}

function showResult() {
  saveAnswer();
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  const mbtiResult = calculateMBTI(answers);
  resultElement.innerText = 'Your MBTI Type: ' + mbtiResult;
  if (currentQuestion === questions.length - 1) {
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
  }
}

function calculateMBTI(answers) {
  let result = '';

  // Introversion/Extraversion
  let IE_count = 0;
  if (answers[0] == 'Yes') IE_count++;
  if (answers[6] == 'Yes') IE_count++;
  if (answers[12] == 'No') IE_count++;
  if (answers[14] == 'Yes') IE_count++;
  if (answers[18] == 'No') IE_count++;
  result += (IE_count >= 3) ? 'E' : 'I';

  // Sensing/Intuition
  let SN_count = 0;
  if (answers[4] == 'Yes') SN_count++;
  if (answers[9] == 'Yes') SN_count++;
  if (answers[13] == 'Yes') SN_count++;
  if (answers[17] == 'No') SN_count++;
  if (answers[19] == 'Yes') SN_count++;  
  result += (SN_count >= 3) ? 'N' : 'S';

  // Thinking/Feeling
  let TF_count = 0;
  if (answers[2] == 'Yes') TF_count++;
  if (answers[3] == 'Yes') TF_count++;
  if (answers[8] == 'Yes') TF_count++;
  if (answers[10] == 'Yes') TF_count++;
  if (answers[15] == 'No') TF_count++;
  result += (TF_count >= 3) ? 'F' : 'T';

  // Judging/Perceiving
  let JP_count = 0;
  if (answers[1] == 'No') JP_count++;
  if (answers[5] == 'No') JP_count++;
  if (answers[7] == 'No') JP_count++;
  if (answers[11] == 'Yes') JP_count++;
  if (answers[16] == 'No') JP_count++;
  result += (JP_count >= 3) ? 'P' : 'J';

  return result;
}


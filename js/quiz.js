// Interactive Exam Quiz & Flashcard Revision Engine
const QuizModule = {
  questions: [
    {
      id: 1,
      topic: 'Searching',
      question: 'What is the prerequisite condition for performing Binary Search on an array?',
      options: [
        'The array size must be a power of 2',
        'The array must already be sorted in order',
        'The array must contain only positive integers',
        'The array cannot contain duplicate numbers'
      ],
      correctIndex: 1,
      explanation: 'Binary Search requires the array to be sorted so that comparing the target with the middle element reliably eliminates half of the remaining search space.'
    },
    {
      id: 2,
      topic: 'Sorting Complexity',
      question: 'Which of the following sorting algorithms achieves O(n) time complexity in its best case?',
      options: [
        'Selection Sort',
        'Merge Sort',
        'Bubble Sort (with swapped flag optimization)',
        'Heap Sort'
      ],
      correctIndex: 2,
      explanation: 'With the swapped flag optimization, Bubble Sort detects in Pass 1 if no swaps occurred and terminates immediately in O(n) time. Selection Sort is always O(n²) even in the best case.'
    },
    {
      id: 3,
      topic: 'Sorting Space',
      question: 'Why does Merge Sort require O(n) auxiliary space unlike Bubble, Selection, or Insertion sort?',
      options: [
        'It requires an auxiliary temporary array/buffer to merge two sorted sub-arrays',
        'Its recursion depth is always n',
        'It converts array elements into binary trees',
        'It keeps duplicate elements in separate storage'
      ],
      correctIndex: 0,
      explanation: 'Merging two sorted sub-lists typically requires an auxiliary array of size n to hold the elements while comparing and placing them back in order.'
    },
    {
      id: 4,
      topic: 'Quick Sort Worst Case',
      question: 'Under what condition does Quick Sort degrade to its worst-case complexity of O(n²)?',
      options: [
        'When the array contains all negative numbers',
        'When the pivot repeatedly divides the array into balanced halves',
        'When the pivot chosen is repeatedly the minimum or maximum element, creating highly unbalanced partitions',
        'When the array size is an odd number'
      ],
      correctIndex: 2,
      explanation: 'If the chosen pivot is always the smallest or largest element (such as picking the last element in an already sorted array without randomizing), the recursion depth becomes n and partition work is O(n), yielding O(n²).'
    },
    {
      id: 5,
      topic: 'Asymptotic Analysis',
      question: 'What is the correct shortcut mapping for Big-O, Big-Omega (Ω), and Big-Theta (Θ)?',
      options: [
        'O = Lower bound, Ω = Upper bound, Θ = Loose bound',
        'O = Upper bound, Ω = Lower bound, Θ = Tight bound',
        'O = Average bound, Ω = Worst bound, Θ = Best bound',
        'O = Tight bound, Ω = Upper bound, Θ = Lower bound'
      ],
      correctIndex: 1,
      explanation: 'Remember the exam shortcuts: O = Upper bound (f(n) ≤ c·g(n)), Ω = Lower bound (f(n) ≥ c·g(n)), and Θ = Tight bound (sandwiched between constants).'
    },
    {
      id: 6,
      topic: 'Growth Rate',
      question: 'Arrange the following functions in increasing order of growth rate as n becomes very large:',
      options: [
        'O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)',
        'O(1) < O(n) < O(log n) < O(n²) < O(n log n) < O(2ⁿ)',
        'O(log n) < O(1) < O(n) < O(n log n) < O(2ⁿ) < O(n²)',
        'O(1) < O(log n) < O(n log n) < O(n) < O(n²) < O(2ⁿ)'
      ],
      correctIndex: 0,
      explanation: 'Growth order to memorize: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!). Remember: log n is very fast, n is fast, n log n is good, n² is slow, and 2ⁿ is explosive.'
    },
    {
      id: 7,
      topic: 'Greedy Coin Change',
      question: 'For coins {30, 20, 5, 1} and amount 40, what does the Greedy approach produce, and is it optimal?',
      options: [
        'Greedy produces 20 + 20 (2 coins), which is optimal',
        'Greedy produces 30 + 5 + 5 (3 coins), which is NOT optimal (optimal is 20 + 20)',
        'Greedy produces 30 + 10 (2 coins), which is optimal',
        'Greedy fails and returns no solution'
      ],
      correctIndex: 1,
      explanation: 'EXAM TRAP: The greedy algorithm picks the largest coin first (30), leaving 10, then takes 5 and 5 (total 3 coins). The optimal solution is 20 + 20 (2 coins). This proves Greedy is NOT always optimal for arbitrary coin denominations!'
    },
    {
      id: 8,
      topic: 'Activity Selection',
      question: 'What is the correct greedy choice criteria for maximizing the number of compatible activities in Activity Selection?',
      options: [
        'Pick the activity with the earliest start time',
        'Pick the activity with the shortest duration',
        'Pick the activity with the earliest finish time',
        'Pick the activity with the latest start time'
      ],
      correctIndex: 2,
      explanation: 'EXAM TRAP: Choosing the activity with the earliest finish time leaves the maximum possible remaining time for subsequent activities. Earliest start time or shortest duration can both lead to sub-optimal results.'
    },
    {
      id: 9,
      topic: 'Job Sequencing',
      question: 'In Job Sequencing with Deadlines, into which slot should a job with deadline D be placed?',
      options: [
        'Always slot 1 to finish as early as possible',
        'The latest free slot ≤ D',
        'Slot D + 1',
        'Any random slot regardless of deadline'
      ],
      correctIndex: 1,
      explanation: 'To leave earlier slots free for other jobs that may have tighter deadlines, place each job in the latest possible available slot before or at its deadline (slot ≤ D).'
    },
    {
      id: 10,
      topic: 'Simulation',
      question: 'What is the correct chronological sequence of the General Simulation cycle?',
      options: [
        'Initialize → Find event → Advance time → Process → Update → Record → Repeat → Output',
        'Output → Advance time → Initialize → Process → Update → Record → Repeat',
        'Initialize → Process → Record → Advance time → Find event → Output',
        'Find event → Initialize → Update → Record → Advance time → Repeat'
      ],
      correctIndex: 0,
      explanation: 'The fundamental 8-step simulation cycle: 1. Initialize → 2. Find event → 3. Advance time → 4. Process event → 5. Update state → 6. Record result → 7. Repeat check → 8. Output final result.'
    }
  ],

  flashcards: [
    {
      title: 'Linear Search',
      front: 'Linear Search Complexity & Best/Worst scenarios',
      back: 'Best: O(1) (found at index 0)\nAvg/Worst: O(n)\nSpace: O(1)\nRule: Inspects elements sequentially until key is found.'
    },
    {
      title: 'Binary Search',
      front: 'Binary Search Prerequisite & Complexity',
      back: 'Prerequisite: Array MUST be sorted!\nBest: O(1)\nAvg/Worst: O(log n)\nIterative Space: O(1)\nRule: Halves the search space each step by comparing target with middle.'
    },
    {
      title: 'Selection Sort',
      front: 'Selection Sort Pass Behavior & Complexity',
      back: 'Finds minimum in remaining unsorted portion and swaps with A[i].\nBest / Avg / Worst: O(n²)\nSpace: O(1) in-place\nPasses: n - 1 passes total.'
    },
    {
      title: 'Bubble Sort',
      front: 'Bubble Sort Optimization & Complexity',
      back: 'Compares adjacent elements A[j] and A[j+1].\nBest: O(n) (with swapped flag, exits after 1 pass)\nAvg/Worst: O(n²)\nSpace: O(1).'
    },
    {
      title: 'Insertion Sort',
      front: 'Insertion Sort Card Metaphor & Complexity',
      back: 'Takes key = A[i], shifts larger elements in sorted left portion right, inserts key.\nBest: O(n) (already sorted)\nAvg/Worst: O(n²)\nSpace: O(1).'
    },
    {
      title: 'Merge Sort',
      front: 'Merge Sort Divide-and-Conquer Rule',
      back: 'Divide into halves, recursively sort, then merge sorted halves.\nBest / Avg / Worst: O(n log n)\nSpace: O(n) auxiliary buffer\nStable sort.'
    },
    {
      title: 'Quick Sort',
      front: 'Quick Sort Partitioning & Pitfall',
      back: 'Pick pivot, partition smaller to left, larger to right, recurse.\nBest / Avg: O(n log n)\nWorst: O(n²) (highly unbalanced partitions)\nSpace: O(log n) recursive stack.'
    },
    {
      title: 'Asymptotic Bounds',
      front: 'O vs Ω vs Θ Definitions',
      back: 'Big-O: Upper bound (f(n) ≤ c·g(n))\nBig-Omega (Ω): Lower bound (f(n) ≥ c·g(n))\nBig-Theta (Θ): Tight bound (sandwiched between constants).'
    },
    {
      title: 'Activity Selection Rule',
      front: 'Activity Selection Greedy Strategy',
      back: 'Sort activities by EARLIEST FINISH TIME.\nPick first activity, then pick subsequent activities if start time ≥ last finish time.\nExam Trap: Earliest finish, NOT start time or shortest duration!'
    },
    {
      title: 'Fractional Knapsack',
      front: 'Fractional Knapsack Greedy Strategy',
      back: '1. Calculate value/weight ratio.\n2. Sort descending by ratio.\n3. Take whole items while they fit.\n4. Take needed fraction of the final item.\nComplexity: O(n log n) due to sorting.'
    }
  ],

  userAnswers: {},
  currentQuestionIndex: 0,

  initQuiz() {
    this.userAnswers = {};
    this.renderQuestion(0);
  },

  renderQuestion(index) {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const q = this.questions[index];
    this.currentQuestionIndex = index;
    const answered = this.userAnswers[q.id] !== undefined;
    const selected = this.userAnswers[q.id];

    container.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-header">
          <span class="quiz-topic">${q.topic}</span>
          <span class="quiz-progress">Question ${index + 1} of ${this.questions.length}</span>
        </div>
        <h3 class="quiz-question">${q.question}</h3>
        <div class="quiz-options">
          ${q.options.map((opt, optIdx) => {
            let stateClass = '';
            if (answered) {
              if (optIdx === q.correctIndex) stateClass = 'correct';
              else if (selected === optIdx) stateClass = 'incorrect';
              else stateClass = 'disabled';
            }
            return `
              <button class="quiz-opt-btn ${stateClass}" 
                onclick="QuizModule.selectOption(${index}, ${optIdx})" 
                ${answered ? 'disabled' : ''}>
                <span class="opt-letter">${String.fromCharCode(65 + optIdx)}</span>
                <span class="opt-text">${opt}</span>
              </button>
            `;
          }).join('')}
        </div>
        ${answered ? `
          <div class="quiz-explanation ${selected === q.correctIndex ? 'exp-correct' : 'exp-wrong'}">
            <strong>${selected === q.correctIndex ? '✓ Correct!' : '✗ Incorrect!'}</strong>
            <p>${q.explanation}</p>
          </div>
        ` : ''}
        <div class="quiz-nav">
          <button class="btn btn-secondary" onclick="QuizModule.prevQuestion()" ${index === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          <div class="quiz-score-badge">
            Score: ${this.calculateScore()} / ${Object.keys(this.userAnswers).length}
          </div>
          ${index < this.questions.length - 1 ? `
            <button class="btn btn-primary" onclick="QuizModule.nextQuestion()">
              Next Question →
            </button>
          ` : `
            <button class="btn btn-accent" onclick="QuizModule.showResultsModal()">
              Finish & Review 🎉
            </button>
          `}
        </div>
      </div>
    `;
  },

  selectOption(qIndex, optIndex) {
    const q = this.questions[qIndex];
    if (this.userAnswers[q.id] !== undefined) return;

    this.userAnswers[q.id] = optIndex;
    if (optIndex === q.correctIndex && window.soundEngine) {
      window.soundEngine.found();
    } else if (window.soundEngine) {
      window.soundEngine.discard();
    }
    this.renderQuestion(qIndex);
  },

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.renderQuestion(this.currentQuestionIndex + 1);
    }
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.renderQuestion(this.currentQuestionIndex - 1);
    }
  },

  calculateScore() {
    let score = 0;
    this.questions.forEach(q => {
      if (this.userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  },

  showResultsModal() {
    const score = this.calculateScore();
    const total = this.questions.length;
    const pct = Math.round((score / total) * 100);
    const container = document.getElementById('quiz-container');
    if (!container) return;

    container.innerHTML = `
      <div class="quiz-card text-center">
        <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">${pct >= 80 ? '🏆' : pct >= 50 ? '📚' : '💪'}</div>
        <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem;">Quiz Completed!</h2>
        <p style="color: #94a3b8; margin-bottom: 1.5rem;">Here is your score based on the Algorithm Design Exam Notes:</p>
        <div class="score-circle">
          <div class="score-num">${score} / ${total}</div>
          <div class="score-pct">${pct}% Correct</div>
        </div>
        <div style="margin: 2rem 0; text-align: left;" class="results-summary-list">
          ${this.questions.map((q, idx) => {
            const isCorrect = this.userAnswers[q.id] === q.correctIndex;
            return `
              <div class="result-row ${isCorrect ? 'pass' : 'fail'}">
                <span class="result-icon">${isCorrect ? '✓' : '✗'}</span>
                <div>
                  <strong>Q${idx + 1} (${q.topic}):</strong> ${q.question}
                  <div class="text-sm text-dim">Correct Answer: ${q.options[q.correctIndex]}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="btn btn-primary" onclick="QuizModule.initQuiz()">
            🔄 Retake Quiz
          </button>
        </div>
      </div>
    `;
  },

  renderFlashcards() {
    const container = document.getElementById('flashcards-grid');
    if (!container) return;

    container.innerHTML = this.flashcards.map((card, idx) => `
      <div class="flashcard" onclick="this.classList.toggle('flipped')">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <span class="card-badge">Card ${idx + 1}</span>
            <h4>${card.title}</h4>
            <p>${card.front}</p>
            <span class="card-hint">Click to flip ↷</span>
          </div>
          <div class="flashcard-back">
            <span class="card-badge-back">Exam Solution</span>
            <h4>${card.title}</h4>
            <div class="card-back-text">${card.back.replace(/\n/g, '<br>')}</div>
            <span class="card-hint">Click to flip back ↶</span>
          </div>
        </div>
      </div>
    `).join('');
  }
};

window.QuizModule = QuizModule;

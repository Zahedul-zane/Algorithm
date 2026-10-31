// Main Application Controller & UI Binder with Universal Input/Output Architecture
document.addEventListener('DOMContentLoaded', () => {
  // Preset Library directly from the Exam Notes + Edge Cases
  const ALGO_PRESETS = {
    linear: {
      default: { array: [8, 4, 6, 9, 2, 3, 1], key: 6 },
      presets: [
        { label: '✨ Exam Example (Find 6)', data: { array: [8, 4, 6, 9, 2, 3, 1], key: 6 } },
        { label: '🎯 Best Case O(1) (Key=8)', data: { array: [8, 4, 6, 9, 2, 3, 1], key: 8 } },
        { label: '🏁 Worst Case O(n) (Key=1)', data: { array: [8, 4, 6, 9, 2, 3, 1], key: 1 } },
        { label: '🚫 Not Found (-1) (Key=99)', data: { array: [8, 4, 6, 9, 2, 3, 1], key: 99 } }
      ]
    },
    binary: {
      default: { array: [1, 3, 5, 7, 9, 11, 13], key: 7 },
      presets: [
        { label: '✨ Exam Example (Find 7)', data: { array: [1, 3, 5, 7, 9, 11, 13], key: 7 } },
        { label: '🎯 Best Case O(1) (Exact Mid)', data: { array: [1, 3, 5, 7, 9, 11, 13], key: 7 } },
        { label: '◀ Search Left (Key=3)', data: { array: [1, 3, 5, 7, 9, 11, 13], key: 3 } },
        { label: '▶ Search Right (Key=11)', data: { array: [1, 3, 5, 7, 9, 11, 13], key: 11 } },
        { label: '🚫 Not Found (-1) (Key=8)', data: { array: [1, 3, 5, 7, 9, 11, 13], key: 8 } }
      ]
    },
    selection: {
      default: { array: [8, 4, 6, 9, 2, 3, 1] },
      presets: [
        { label: '✨ Exam Example', data: { array: [8, 4, 6, 9, 2, 3, 1] } },
        { label: '⚡ Reverse Sorted (Worst)', data: { array: [9, 8, 7, 6, 4, 3, 2, 1] } },
        { label: '✅ Already Sorted', data: { array: [1, 2, 3, 4, 6, 8, 9] } },
        { label: '🔁 With Duplicates', data: { array: [6, 2, 8, 2, 9, 6, 1] } }
      ]
    },
    bubble: {
      default: { array: [5, 1, 4, 2, 8] },
      presets: [
        { label: '✨ Exam Example (Early Exit on P3)', data: { array: [5, 1, 4, 2, 8] } },
        { label: '⚡ Already Sorted (Best Case O(n))', data: { array: [1, 2, 4, 5, 8] } },
        { label: '🔥 Reverse Sorted (Worst Case O(n²))', data: { array: [8, 5, 4, 2, 1] } }
      ]
    },
    insertion: {
      default: { array: [8, 4, 6, 9, 2] },
      presets: [
        { label: '✨ Exam Example', data: { array: [8, 4, 6, 9, 2] } },
        { label: '⚡ Already Sorted (Best Case O(n))', data: { array: [2, 4, 6, 8, 9] } },
        { label: '🔥 Reverse Sorted (Worst Case O(n²))', data: { array: [9, 8, 6, 4, 2] } },
        { label: '📌 Nearly Sorted', data: { array: [2, 4, 3, 6, 8, 7, 9] } }
      ]
    },
    merge: {
      default: { array: [8, 4, 6, 9, 2, 3, 1] },
      presets: [
        { label: '✨ Exam Example', data: { array: [8, 4, 6, 9, 2, 3, 1] } },
        { label: '⚡ Alternating Values', data: { array: [14, 3, 19, 7, 1, 15, 6, 2] } },
        { label: '✅ Already Sorted', data: { array: [1, 2, 3, 4, 6, 8, 9] } }
      ]
    },
    quick: {
      default: { array: [7, 2, 1, 6, 8, 5, 3, 4], pivot: 4 },
      presets: [
        { label: '✨ Exam Example (Pivot=4)', data: { array: [7, 2, 1, 6, 8, 5, 3, 4], pivot: 4 } },
        { label: '🔥 Sorted (Worst Case O(n²))', data: { array: [1, 2, 3, 4, 5, 6, 7, 8], pivot: 8 } },
        { label: '⚡ Reverse Sorted', data: { array: [8, 7, 6, 5, 4, 3, 2, 1], pivot: 1 } }
      ]
    },
    coinChange: {
      default: { amount: 564, coins: [200, 100, 25, 10, 1] },
      presets: [
        { label: '✨ Exam Example (564¢)', data: { amount: 564, coins: [200, 100, 25, 10, 1] } },
        { label: '⚠️ Greedy Trap (40¢)', trap: true, data: { amount: 40, coins: [30, 20, 5, 1] } },
        { label: '💵 US Coins (87¢)', data: { amount: 87, coins: [25, 10, 5, 1] } },
        { label: '💶 Euro Coins (148¢)', data: { amount: 148, coins: [50, 20, 10, 5, 2, 1] } }
      ]
    },
    knapsack: {
      default: {
        capacity: 50,
        items: [
          { id: 1, name: 'Item 1', value: 60, weight: 10 },
          { id: 2, name: 'Item 2', value: 100, weight: 20 },
          { id: 3, name: 'Item 3', value: 120, weight: 30 }
        ]
      },
      presets: [
        { 
          label: '✨ Exam Example (W=50)', 
          data: {
            capacity: 50,
            items: [
              { id: 1, name: 'Item 1', value: 60, weight: 10 },
              { id: 2, name: 'Item 2', value: 100, weight: 20 },
              { id: 3, name: 'Item 3', value: 120, weight: 30 }
            ]
          }
        },
        {
          label: '💎 Precious Metals (W=40)',
          data: {
            capacity: 40,
            items: [
              { id: 1, name: 'Platinum', value: 500, weight: 10 },
              { id: 2, name: 'Gold', value: 300, weight: 15 },
              { id: 3, name: 'Silver', value: 160, weight: 20 },
              { id: 4, name: 'Copper', value: 50, weight: 15 }
            ]
          }
        }
      ]
    },
    huffman: {
      default: {
        text: 'A: 45, B: 13, C: 12, D: 16, E: 9, F: 5'
      },
      presets: [
        {
          label: '✨ Exam Example (CLRS 100-char)',
          data: { text: 'A: 45, B: 13, C: 12, D: 16, E: 9, F: 5' }
        },
        {
          label: '🔤 Word ("ABRACADABRA")',
          data: { text: 'ABRACADABRA' }
        },
        {
          label: '⚡ Skewed Tree (Powers of 2)',
          data: { text: 'A: 16, B: 8, C: 4, D: 2, E: 1, F: 1' }
        },
        {
          label: '⚖️ Balanced Frequencies',
          data: { text: 'A: 25, B: 25, C: 25, D: 25' }
        }
      ]
    },
    activitySelection: {
      default: {
        activities: [
          { id: 1, name: 'A1', s: 1, f: 2 },
          { id: 2, name: 'A2', s: 3, f: 4 },
          { id: 3, name: 'A3', s: 0, f: 6 },
          { id: 4, name: 'A4', s: 5, f: 7 },
          { id: 5, name: 'A5', s: 8, f: 9 },
          { id: 6, name: 'A6', s: 5, f: 9 }
        ]
      },
      presets: [
        { 
          label: '✨ Exam Example (6 activities)', 
          data: {
            activities: [
              { id: 1, name: 'A1', s: 1, f: 2 },
              { id: 2, name: 'A2', s: 3, f: 4 },
              { id: 3, name: 'A3', s: 0, f: 6 },
              { id: 4, name: 'A4', s: 5, f: 7 },
              { id: 5, name: 'A5', s: 8, f: 9 },
              { id: 6, name: 'A6', s: 5, f: 9 }
            ]
          }
        },
        {
          label: '⚡ Zero Overlaps (All Selected)',
          data: {
            activities: [
              { id: 1, name: 'A1', s: 0, f: 2 },
              { id: 2, name: 'A2', s: 2, f: 4 },
              { id: 3, name: 'A3', s: 4, f: 6 },
              { id: 4, name: 'A4', s: 6, f: 8 },
              { id: 5, name: 'A5', s: 8, f: 10 }
            ]
          }
        },
        {
          label: '🔥 Heavy Conflicts',
          data: {
            activities: [
              { id: 1, name: 'A1', s: 1, f: 9 },
              { id: 2, name: 'A2', s: 2, f: 8 },
              { id: 3, name: 'A3', s: 3, f: 7 },
              { id: 4, name: 'A4', s: 0, f: 10 },
              { id: 5, name: 'A5', s: 8, f: 10 }
            ]
          }
        }
      ]
    },
    jobSequencing: {
      default: {
        jobs: [
          { id: 1, name: 'J1', profit: 100, deadline: 2 },
          { id: 2, name: 'J2', profit: 50, deadline: 1 },
          { id: 3, name: 'J3', profit: 60, deadline: 2 },
          { id: 4, name: 'J4', profit: 20, deadline: 1 },
          { id: 5, name: 'J5', profit: 80, deadline: 3 }
        ]
      },
      presets: [
        {
          label: '✨ Exam Example (5 jobs)',
          data: {
            jobs: [
              { id: 1, name: 'J1', profit: 100, deadline: 2 },
              { id: 2, name: 'J2', profit: 50, deadline: 1 },
              { id: 3, name: 'J3', profit: 60, deadline: 2 },
              { id: 4, name: 'J4', profit: 20, deadline: 1 },
              { id: 5, name: 'J5', profit: 80, deadline: 3 }
            ]
          }
        },
        {
          label: '⚡ Strict Deadlines (d=1,2)',
          data: {
            jobs: [
              { id: 1, name: 'J1', profit: 90, deadline: 1 },
              { id: 2, name: 'J2', profit: 85, deadline: 1 },
              { id: 3, name: 'J3', profit: 70, deadline: 2 },
              { id: 4, name: 'J4', profit: 60, deadline: 2 }
            ]
          }
        }
      ]
    },
    simulation: {
      default: {
        events: [
          { time: 1, customer: 'C1', serviceDuration: 4 },
          { time: 3, customer: 'C2', serviceDuration: 3 },
          { time: 6, customer: 'C3', serviceDuration: 2 }
        ]
      },
      presets: [
        {
          label: '✨ Exam 3-Event Model',
          data: {
            events: [
              { time: 1, customer: 'C1', serviceDuration: 4 },
              { time: 3, customer: 'C2', serviceDuration: 3 },
              { time: 6, customer: 'C3', serviceDuration: 2 }
            ]
          }
        },
        {
          label: '🔥 High Traffic Burst',
          data: {
            events: [
              { time: 1, customer: 'C1', serviceDuration: 5 },
              { time: 2, customer: 'C2', serviceDuration: 4 },
              { time: 3, customer: 'C3', serviceDuration: 3 },
              { time: 7, customer: 'C4', serviceDuration: 2 }
            ]
          }
        }
      ]
    }
  };

  const PSEUDOCODES = {
    linear: [
      "LINEAR-SEARCH(A, n, key)",
      "  for i ← 0 to n-1",
      "    if A[i] = key",
      "      return i",
      "  return -1"
    ],
    binary: [
      "BINARY-SEARCH(A, low, high, key)",
      "  while low ≤ high",
      "    mid ← ⌊(low + high) / 2⌋",
      "    if A[mid] = key",
      "      return mid",
      "    else if key < A[mid]",
      "      high ← mid - 1",
      "    else",
      "      low ← mid + 1",
      "  return -1"
    ],
    selection: [
      "SELECTION-SORT(A)",
      "  for i ← 0 to n-2",
      "    min ← i",
      "    for j ← i+1 to n-1",
      "      if A[j] < A[min]",
      "        min ← j",
      "    swap A[i], A[min]"
    ],
    bubble: [
      "BUBBLE-SORT(A, n)",
      "  for i ← 0 to n-2",
      "    for j ← 0 to n-2-i",
      "      if A[j] > A[j+1]",
      "        swap A[j], A[j+1]"
    ],
    insertion: [
      "INSERTION-SORT(A)",
      "  for i ← 1 to n-1",
      "    key ← A[i]",
      "    j ← i - 1",
      "    while j ≥ 0 AND A[j] > key",
      "      A[j+1] ← A[j]",
      "      j ← j - 1",
      "    A[j+1] ← key"
    ],
    merge: [
      "MERGE-SORT(A, p, r)",
      "  if p < r",
      "    q ← ⌊(p + r) / 2⌋",
      "    MERGE-SORT(A, p, q)",
      "    MERGE-SORT(A, q+1, r)",
      "    MERGE(A, p, q, r)"
    ],
    quick: [
      "QUICK-SORT(A, low, high)",
      "  if low < high",
      "    p ← PARTITION(A, low, high)",
      "    QUICK-SORT(A, low, p - 1)",
      "    QUICK-SORT(A, p + 1, high)"
    ],
    coinChange: [
      "COIN-CHANGE(S, coins)",
      "  sort coins decreasing",
      "  for each coin c",
      "    while S ≥ c",
      "      take c",
      "      S ← S - c"
    ],
    knapsack: [
      "FRACTIONAL-KNAPSACK(items, W)",
      "  calculate benefit / weight",
      "  sort by decreasing ratio",
      "  for each item",
      "    if weight ≤ W",
      "      take whole item; W ← W - weight",
      "    else",
      "      take required fraction; W ← 0",
      "  return total benefit"
    ],
    huffman: [
      "HUFFMAN(C)",
      "  n ← |C|",
      "  Q ← Min-Priority-Queue(C)",
      "  for i ← 1 to n - 1",
      "    allocate new node z",
      "    z.left  ← x ← EXTRACT-MIN(Q)",
      "    z.right ← y ← EXTRACT-MIN(Q)",
      "    z.freq  ← x.freq + y.freq",
      "    INSERT(Q, z)",
      "  return EXTRACT-MIN(Q)  // root of tree"
    ],
    activitySelection: [
      "ACTIVITY-SELECTOR(s, f)",
      "  A ← {first activity}",
      "  j ← first activity",
      "  for i ← 2 to n",
      "    if s[i] ≥ f[j]",
      "      add activity i to A",
      "      j ← i",
      "  return A"
    ],
    jobSequencing: [
      "JOB-SEQUENCING(J)",
      "  sort jobs by decreasing profit",
      "  for each job j",
      "    find latest free slot ≤ deadline[j]",
      "    if slot exists",
      "      schedule j in slot",
      "  return scheduled jobs"
    ],
    simulation: [
      "SIMULATION",
      "  initialize state; time ← 0",
      "  while stopping condition is false",
      "    find next event",
      "    update time",
      "    process event",
      "    update state",
      "    record result",
      "  output result"
    ]
  };

  const COMPLEXITY_CARDS = {
    linear: { best: 'O(1)', avg: 'O(n)', worst: 'O(n)', space: 'O(1)', note: 'Sequential scan; best when target is first element.' },
    binary: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', space: 'O(1)', note: 'Requires sorted array; cuts search space in half each step.' },
    selection: { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', note: 'Always scans entire unsorted portion; exactly n-1 passes.' },
    bubble: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', note: 'O(n) best case with swapped flag early exit optimization.' },
    insertion: { best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', note: 'Adaptive; very fast when array is already nearly sorted.' },
    merge: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', note: 'Divide & Conquer. Stable, guaranteed n log n runtime.' },
    quick: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', note: 'Worst case occurs when pivot creates extremely unbalanced partitions.' },
    coinChange: { best: 'O(k)', avg: 'O(k)', worst: 'O(k)', space: 'O(1)', note: 'k = coin types. Largest coin heuristic.' },
    knapsack: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', note: 'Dominated by sorting items by benefit-to-weight ratio.' },
    huffman: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', note: 'Min-Heap Priority Queue: extracts 2 lowest frequencies repeatedly to build optimal prefix tree.' },
    activitySelection: { best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', note: 'Sort by earliest finish time. Optimal subset.' },
    jobSequencing: { best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(n)', note: 'Highest profit first; slot assignment scan.' }
  };

  // State Management
  let currentAlgo = 'linear';
  let recordedHistory = [];

  const visualizer = new VisualizerEngine({
    onStepChange: (state, stepIdx, total) => {
      renderVisualizerState(state, stepIdx, total);
    },
    onPlayStateChange: (isPlaying) => {
      const playBtn = document.getElementById('btn-play');
      if (playBtn) {
        playBtn.innerHTML = isPlaying 
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> Play`;
      }
    }
  });

  function loadAlgorithm(algoKey) {
    currentAlgo = algoKey;
    recordedHistory = [];
    clearHistoryTable();

    // Update active nav button
    document.querySelectorAll('.algo-nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.algo === algoKey);
    });

    updateHeaderAndNotes(algoKey);
    updatePseudocode(algoKey);
    updateComplexityBanner(algoKey);

    // Switch visible main stage panels
    const algoStage = document.getElementById('algo-stage-container');
    const asymptoticStage = document.getElementById('asymptotic-stage-container');
    const simulationStage = document.getElementById('simulation-stage-container');
    const quizStage = document.getElementById('quiz-stage-container');

    if (algoStage) algoStage.style.display = 'block';
    if (asymptoticStage) asymptoticStage.style.display = 'none';
    if (simulationStage) simulationStage.style.display = 'none';
    if (quizStage) quizStage.style.display = 'none';

    if (algoKey === 'asymptotic') {
      if (algoStage) algoStage.style.display = 'none';
      if (asymptoticStage) asymptoticStage.style.display = 'block';
      setTimeout(() => AsymptoticModule.drawGrowthChart(16), 50);
      return;
    } else if (algoKey === 'simulation') {
      // Simulation has its own stage layout
      if (algoStage) algoStage.style.display = 'block';
    } else if (algoKey === 'revision') {
      if (algoStage) algoStage.style.display = 'none';
      if (quizStage) quizStage.style.display = 'block';
      QuizModule.initQuiz();
      QuizModule.renderFlashcards();
      return;
    }

    // Build the dynamic Input form and Quick Presets list
    renderInputPanel(algoKey);

    // Run simulation for current algorithm
    runAlgorithmWithInputs(algoKey);
  }

  // ================= Input Form Generator =================
  function renderInputPanel(algoKey) {
    const presetsContainer = document.getElementById('quick-presets-container');
    const formContainer = document.getElementById('dynamic-input-form');
    if (!presetsContainer || !formContainer) return;

    presetsContainer.innerHTML = '';
    formContainer.innerHTML = '';

    const algoConfig = ALGO_PRESETS[algoKey];
    if (!algoConfig) return;

    // Render Quick Preset Buttons
    if (algoConfig.presets) {
      algoConfig.presets.forEach(p => {
        const btn = document.createElement('button');
        btn.className = `preset-pill-btn ${p.trap ? 'trap-preset' : ''}`;
        btn.textContent = p.label;
        btn.onclick = () => applyPresetData(algoKey, p.data);
        presetsContainer.appendChild(btn);
      });
    }

    // Render Form Fields according to algorithm type
    if (algoKey === 'linear' || algoKey === 'binary') {
      const def = algoConfig.default;
      formContainer.innerHTML = `
        <div class="form-group-custom flex-grow">
          <label class="custom-label" for="in-array">Array:</label>
          <input type="text" id="in-array" class="custom-input" placeholder="e.g. 8, 4, 6, 9, 2" value="${def.array.join(', ')}" />
        </div>
        <div class="form-group-custom flex-fixed-sm">
          <label class="custom-label" for="in-key">Target:</label>
          <input type="number" id="in-key" class="custom-input" placeholder="Key" value="${def.key}" />
        </div>
      `;
    } else if (['selection', 'bubble', 'insertion', 'merge', 'quick'].includes(algoKey)) {
      const def = algoConfig.default;
      formContainer.innerHTML = `
        <div class="form-group-custom flex-grow">
          <label class="custom-label" for="in-array">Array to Sort:</label>
          <input type="text" id="in-array" class="custom-input" placeholder="e.g. 8, 4, 6, 9, 2, 3, 1" value="${def.array.join(', ')}" />
        </div>
      `;
    } else if (algoKey === 'coinChange') {
      const def = algoConfig.default;
      formContainer.innerHTML = `
        <div class="form-group-custom flex-fixed-sm">
          <label class="custom-label" for="in-coin-amount">Amount:</label>
          <input type="number" id="in-coin-amount" class="custom-input" placeholder="564" value="${def.amount}" />
        </div>
        <div class="form-group-custom flex-grow">
          <label class="custom-label" for="in-coin-system">Coins:</label>
          <input type="text" id="in-coin-system" class="custom-input" placeholder="200, 100, 25, 10, 1" value="${def.coins.join(', ')}" />
        </div>
      `;
    } else if (algoKey === 'knapsack') {
      const def = algoConfig.default;
      const itemsStr = def.items.map(i => `${i.name}: val=${i.value}, wt=${i.weight}`).join('\n');
      formContainer.innerHTML = `
        <div class="form-group-custom flex-fixed-sm">
          <label class="custom-label" for="in-knap-cap">Capacity:</label>
          <input type="number" id="in-knap-cap" class="custom-input" placeholder="50" value="${def.capacity}" />
        </div>
        <div class="form-group-custom flex-grow">
          <label class="custom-label" for="in-knap-items">Items (val=X, wt=Y):</label>
          <textarea id="in-knap-items" class="custom-textarea" rows="1" placeholder="Item 1: val=60, wt=10">${itemsStr}</textarea>
        </div>
      `;
    } else if (algoKey === 'huffman') {
      const def = algoConfig.default;
      formContainer.innerHTML = `
        <div class="form-group-custom flex-grow">
          <label class="custom-label" for="in-huffman">Frequencies / Text:</label>
          <input type="text" id="in-huffman" class="custom-input" placeholder="A: 45, B: 13, C: 12..." value="${def.text}" />
        </div>
      `;
    } else if (algoKey === 'activitySelection') {
      const def = algoConfig.default;
      const actsStr = def.activities.map(a => `(${a.s}, ${a.f})`).join(', ');
      formContainer.innerHTML = `
        <div class="form-group-custom flex-grow">
          <label class="custom-label" for="in-activities">Activities (start, finish):</label>
          <input type="text" id="in-activities" class="custom-input" placeholder="(1, 4), (3, 5)..." value="${actsStr}" />
        </div>
      `;
    } else if (algoKey === 'jobSequencing') {
      const def = algoConfig.default;
      const jobsStr = def.jobs.map(j => `${j.name}: P=${j.profit}, D=${j.deadline}`).join(', ');
      formContainer.innerHTML = `
        <div class="form-group-custom flex-grow">
          <label class="custom-label" for="in-jobs">Jobs (P=profit, D=deadline):</label>
          <input type="text" id="in-jobs" class="custom-input" placeholder="J1: P=100, D=2..." value="${jobsStr}" />
        </div>
      `;
    } else if (algoKey === 'simulation') {
      const def = algoConfig.default;
      const evStr = def.events.map((e, idx) => `C${idx + 1}: Arr=${e.time}, Dur=${e.serviceDuration}`).join('; ');
      formContainer.innerHTML = `
        <div class="form-group-custom flex-grow">
          <label class="custom-label" for="in-sim-events">Events (Arr=X, Dur=Y):</label>
          <input type="text" id="in-sim-events" class="custom-input" placeholder="C1: Arr=0, Dur=3; ..." value="${evStr}" />
        </div>
      `;
    }

    // Allow Enter key inside inputs to trigger Apply & Run immediately
    formContainer.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          document.getElementById('btn-apply-input')?.click();
        }
      });
    });
  }

  function applyPresetData(algoKey, data) {
    if (!data) return;

    if (algoKey === 'linear' || algoKey === 'binary') {
      const arrInput = document.getElementById('in-array');
      const keyInput = document.getElementById('in-key');
      if (arrInput && data.array) arrInput.value = data.array.join(', ');
      if (keyInput && data.key !== undefined) keyInput.value = data.key;
    } else if (['selection', 'bubble', 'insertion', 'merge', 'quick'].includes(algoKey)) {
      const arrInput = document.getElementById('in-array');
      if (arrInput && data.array) arrInput.value = data.array.join(', ');
    } else if (algoKey === 'coinChange') {
      const amtInput = document.getElementById('in-coin-amount');
      const coinsInput = document.getElementById('in-coin-system');
      if (amtInput && data.amount) amtInput.value = data.amount;
      if (coinsInput && data.coins) coinsInput.value = data.coins.join(', ');
    } else if (algoKey === 'knapsack') {
      const capInput = document.getElementById('in-knap-cap');
      const itemsInput = document.getElementById('in-knap-items');
      if (capInput && data.capacity) capInput.value = data.capacity;
      if (itemsInput && data.items) {
        itemsInput.value = data.items.map(i => `${i.name}: val=${i.value}, wt=${i.weight}`).join('\n');
      }
    } else if (algoKey === 'huffman') {
      const huffInput = document.getElementById('in-huffman');
      if (huffInput && data.text) huffInput.value = data.text;
    } else if (algoKey === 'activitySelection') {
      const actInput = document.getElementById('in-activities');
      if (actInput && data.activities) {
        actInput.value = data.activities.map(a => `(${a.s}, ${a.f})`).join(', ');
      }
    } else if (algoKey === 'jobSequencing') {
      const jobInput = document.getElementById('in-jobs');
      if (jobInput && data.jobs) {
        jobInput.value = data.jobs.map(j => `${j.name}: P=${j.profit}, D=${j.deadline}`).join(', ');
      }
    } else if (algoKey === 'simulation') {
      const evInput = document.getElementById('in-sim-events');
      if (evInput && data.events) {
        evInput.value = data.events.map((e, idx) => `C${idx + 1}: Arr=${e.time}, Dur=${e.serviceDuration}`).join('; ');
      }
    }

    runAlgorithmWithInputs(algoKey);
  }

  // ================= Parse Inputs & Run Simulation =================
  function runAlgorithmWithInputs(algoKey) {
    recordedHistory = [];
    clearHistoryTable();

    let steps = [];

    if (algoKey === 'linear') {
      const arr = parseArrayInput('in-array', ALGO_PRESETS.linear.default.array);
      const key = parseInt(document.getElementById('in-key')?.value) || 6;
      steps = SearchingModule.generateLinearSearchSteps(arr, key);
    } else if (algoKey === 'binary') {
      const rawArr = parseArrayInput('in-array', ALGO_PRESETS.binary.default.array);
      const sortedArr = [...rawArr].sort((a, b) => a - b);
      const key = parseInt(document.getElementById('in-key')?.value) || 7;
      steps = SearchingModule.generateBinarySearchSteps(sortedArr, key);
    } else if (algoKey === 'selection') {
      const arr = parseArrayInput('in-array', ALGO_PRESETS.selection.default.array);
      steps = SortingModule.generateSelectionSortSteps(arr);
    } else if (algoKey === 'bubble') {
      const arr = parseArrayInput('in-array', ALGO_PRESETS.bubble.default.array);
      steps = SortingModule.generateBubbleSortSteps(arr);
    } else if (algoKey === 'insertion') {
      const arr = parseArrayInput('in-array', ALGO_PRESETS.insertion.default.array);
      steps = SortingModule.generateInsertionSortSteps(arr);
    } else if (algoKey === 'merge') {
      const arr = parseArrayInput('in-array', ALGO_PRESETS.merge.default.array);
      steps = SortingModule.generateMergeSortSteps(arr);
    } else if (algoKey === 'quick') {
      const arr = parseArrayInput('in-array', ALGO_PRESETS.quick.default.array);
      steps = SortingModule.generateQuickSortSteps(arr);
    } else if (algoKey === 'coinChange') {
      const amount = parseInt(document.getElementById('in-coin-amount')?.value) || 564;
      const coins = parseArrayInput('in-coin-system', [200, 100, 25, 10, 1]);
      steps = GreedyModule.generateCoinChangeSteps(amount, coins);
    } else if (algoKey === 'knapsack') {
      const capacity = parseInt(document.getElementById('in-knap-cap')?.value) || 50;
      const items = parseKnapsackItems('in-knap-items', ALGO_PRESETS.knapsack.default.items);
      steps = GreedyModule.generateKnapsackSteps(items, capacity);
    } else if (algoKey === 'huffman') {
      const items = parseHuffmanInput('in-huffman', ALGO_PRESETS.huffman.default.text);
      steps = GreedyModule.generateHuffmanSteps(items);
    } else if (algoKey === 'activitySelection') {
      const activities = parseActivities('in-activities', ALGO_PRESETS.activitySelection.default.activities);
      steps = GreedyModule.generateActivitySelectionSteps(activities);
    } else if (algoKey === 'jobSequencing') {
      const jobs = parseJobs('in-jobs', ALGO_PRESETS.jobSequencing.default.jobs);
      steps = GreedyModule.generateJobSequencingSteps(jobs);
    } else if (algoKey === 'simulation') {
      const events = parseSimEvents('in-sim-events', ALGO_PRESETS.simulation.default.events);
      steps = SimulationModule.generateSimulationSteps(events);
    }

    visualizer.loadSteps(steps);
  }

  // ================= Parsers =================
  function parseArrayInput(inputId, fallback) {
    const el = document.getElementById(inputId);
    if (!el || !el.value.trim()) return [...fallback];
    const parsed = el.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    return parsed.length > 0 ? parsed : [...fallback];
  }

  function parseKnapsackItems(textareaId, fallback) {
    const el = document.getElementById(textareaId);
    if (!el || !el.value.trim()) return [...fallback];
    const lines = el.value.split(/[\n;]/).map(s => s.trim()).filter(Boolean);
    const items = [];
    lines.forEach((line, idx) => {
      const vMatch = line.match(/val[=:\s]+(\d+)/i);
      const wMatch = line.match(/wt[=:\s]+(\d+)/i);
      const nameMatch = line.split(/[:=]/)[0].trim() || `Item ${idx + 1}`;
      if (vMatch && wMatch) {
        items.push({
          id: idx + 1,
          name: nameMatch,
          value: parseInt(vMatch[1]),
          weight: parseInt(wMatch[1])
        });
      }
    });
    return items.length > 0 ? items : [...fallback];
  }

  function parseActivities(inputId, fallback) {
    const el = document.getElementById(inputId);
    if (!el || !el.value.trim()) return [...fallback];
    const matches = [...el.value.matchAll(/\((\d+)\s*,\s*(\d+)\)/g)];
    if (matches.length === 0) return [...fallback];
    return matches.map((m, idx) => ({
      id: idx + 1,
      name: `A${idx + 1}`,
      s: parseInt(m[1]),
      f: parseInt(m[2])
    }));
  }

  function parseJobs(inputId, fallback) {
    const el = document.getElementById(inputId);
    if (!el || !el.value.trim()) return [...fallback];
    const tokens = el.value.split(/[,;\n]/);
    const jobs = [];
    tokens.forEach((tok, idx) => {
      const pMatch = tok.match(/P[=:\s]+(\d+)/i);
      const dMatch = tok.match(/D[=:\s]+(\d+)/i);
      const nameMatch = tok.split(/[:=]/)[0].trim() || `J${idx + 1}`;
      if (pMatch && dMatch) {
        jobs.push({
          id: idx + 1,
          name: nameMatch,
          profit: parseInt(pMatch[1]),
          deadline: parseInt(dMatch[1])
        });
      }
    });
    return jobs.length > 0 ? jobs : [...fallback];
  }

  function parseSimEvents(inputId, fallback) {
    const el = document.getElementById(inputId);
    if (!el || !el.value.trim()) return [...fallback];
    const tokens = el.value.split(/[,;\n]/);
    const events = [];
    tokens.forEach((tok, idx) => {
      const arrMatch = tok.match(/Arr[=:\s]+(\d+)/i);
      const durMatch = tok.match(/Dur[=:\s]+(\d+)/i);
      const custMatch = tok.match(/C\d+/i) ? tok.match(/C\d+/i)[0] : `C${idx + 1}`;
      if (arrMatch && durMatch) {
        events.push({
          time: parseInt(arrMatch[1]),
          customer: custMatch,
          serviceDuration: parseInt(durMatch[1]),
          type: 'Arrival'
        });
      }
    });
    return events.length > 0 ? events : [...fallback];
  }

  function parseHuffmanInput(inputId, fallback) {
    const el = document.getElementById(inputId);
    const raw = el ? el.value.trim() : fallback;
    if (!raw) return [{ char: 'A', freq: 45 }, { char: 'B', freq: 13 }, { char: 'C', freq: 12 }, { char: 'D', freq: 16 }, { char: 'E', freq: 9 }, { char: 'F', freq: 5 }];

    // If formatted as key-value pairs (e.g., A: 45, B: 13, C: 12...)
    if (raw.includes(':') || raw.includes('=')) {
      const tokens = raw.split(/[,;\n]/);
      const items = [];
      tokens.forEach(tok => {
        const parts = tok.split(/[:=]/);
        if (parts.length >= 2) {
          const ch = parts[0].trim().toUpperCase();
          const freq = parseInt(parts[1].trim());
          if (ch && !isNaN(freq) && freq > 0) {
            items.push({ char: ch, freq });
          }
        }
      });
      if (items.length > 0) return items;
    }

    // Otherwise treat as plain string and count frequencies
    const freqMap = {};
    for (const ch of raw) {
      if (ch.trim()) {
        const upper = ch.toUpperCase();
        freqMap[upper] = (freqMap[upper] || 0) + 1;
      }
    }
    const items = Object.entries(freqMap).map(([char, freq]) => ({ char, freq }));
    return items.length > 0 ? items : [{ char: 'A', freq: 45 }, { char: 'B', freq: 13 }];
  }

  // ================= State Renderer =================
  function renderVisualizerState(state, stepIdx, total) {
    if (!state) return;

    // 1. Update Step Title and Explanation
    const titleEl = document.getElementById('state-step-title');
    const descEl = document.getElementById('state-step-desc');
    const descPanelEl = document.getElementById('state-step-desc-panel');
    if (titleEl) titleEl.textContent = state.stepTitle || `Step ${stepIdx + 1}`;
    if (descEl) descEl.textContent = state.explanation || '';
    if (descPanelEl) descPanelEl.textContent = state.explanation || '';

    // 2. Active line in Pseudocode
    highlightPseudocodeLine(state.activeLine);

    // 3. Render specific visualization
    if (['linear', 'binary', 'selection', 'bubble', 'insertion', 'merge', 'quick'].includes(currentAlgo)) {
      renderArrayVisualizer(state);
    } else if (currentAlgo === 'coinChange') {
      renderCoinVisualizer(state);
    } else if (currentAlgo === 'knapsack') {
      renderKnapsackVisualizer(state);
    } else if (currentAlgo === 'huffman') {
      renderHuffmanVisualizer(state);
    } else if (currentAlgo === 'activitySelection') {
      renderActivityVisualizer(state);
    } else if (currentAlgo === 'jobSequencing') {
      renderJobVisualizer(state);
    } else if (currentAlgo === 'simulation') {
      renderSimulationVisualizer(state);
    }

    // 4. Update Live Output Console
    updateLiveOutputConsole(state);

    // 5. Update Exam Step Table
    if (state.historyRow) {
      addHistoryRow(state.historyRow);
    }
  }

  function updateLiveOutputConsole(state) {
    const outResult = document.getElementById('out-result-value');
    const outComp = document.getElementById('out-comparisons-count');
    const outSwaps = document.getElementById('out-swaps-count');
    const outCase = document.getElementById('out-complexity-case');

    if (!outResult) return;

    const m = state.metrics || {};
    outResult.textContent = m.resultValue || 'Running...';
    if (outComp) outComp.textContent = m.comparisons !== undefined ? m.comparisons : '0';
    if (outSwaps) outSwaps.textContent = m.swaps !== undefined ? m.swaps : '0';
    if (outCase) outCase.textContent = m.complexityCase || 'Evaluating...';
  }

  function renderArrayVisualizer(state) {
    const container = document.getElementById('array-visual-container');
    if (!container) return;

    const arr = state.array || [];
    const maxVal = Math.max(...arr, 10);
    const highlights = state.highlighted || {};
    const pointers = state.pointers || {};
    const swapPair = state.swapPair;

    const hasSwap = swapPair && Array.isArray(swapPair) && swapPair.length === 2 && swapPair[0] !== swapPair[1];
    const idxA = hasSwap ? Math.min(swapPair[0], swapPair[1]) : -1;
    const idxB = hasSwap ? Math.max(swapPair[0], swapPair[1]) : -1;
    const distCol = hasSwap ? (idxB - idxA) : 0;

    let html = '<div class="array-bars-wrapper">';

    // Visual Neon Swap Bridge if two elements are swapping
    if (hasSwap) {
      html += `
        <div class="swap-action-overlay">
          <div class="swap-bridge-ribbon">
            <span class="swap-bridge-icon">⇄</span>
            <span>Swapping A[${idxA}] (${arr[idxA]}) &amp; A[${idxB}] (${arr[idxB]})</span>
          </div>
        </div>
      `;
    }

    arr.forEach((val, idx) => {
      const heightPct = Math.max(22, Math.round((val / maxVal) * 100));
      const stateClass = highlights[idx] || 'normal';

      // Selection Badge
      let badgeHtml = '';
      let isSelected = false;

      if (hasSwap && idx === idxA) {
        badgeHtml = `<span class="select-indicator-badge select-swap">⇄ Swap →</span>`;
      } else if (hasSwap && idx === idxB) {
        badgeHtml = `<span class="select-indicator-badge select-swap">← Swap ⇄</span>`;
      } else if (stateClass === 'compare') {
        badgeHtml = `<span class="select-indicator-badge select-compare">🔍 Checking</span>`;
        isSelected = true;
      } else if (stateClass === 'min-candidate') {
        badgeHtml = `<span class="select-indicator-badge select-min">⭐ Minimum</span>`;
        isSelected = true;
      } else if (stateClass === 'pivot') {
        badgeHtml = `<span class="select-indicator-badge select-pivot">👑 Pivot</span>`;
        isSelected = true;
      } else if (stateClass === 'found' || stateClass === 'sorted') {
        if (stateClass === 'found') badgeHtml = `<span class="select-indicator-badge select-found">🎯 Found!</span>`;
        isSelected = true;
      } else if (stateClass === 'key-lift') {
        badgeHtml = `<span class="select-indicator-badge select-key">🔑 Key In Hand</span>`;
        isSelected = true;
      } else if (stateClass === 'mid-scan') {
        badgeHtml = `<span class="select-indicator-badge select-mid">⚖️ Middle</span>`;
        isSelected = true;
      }

      // Swapping physical animation classes
      let colAnimClass = '';
      let colStyle = '';
      if (hasSwap && idx === idxA) {
        colAnimClass = 'swapping-column-right';
        colStyle = `style="--swap-dist: ${distCol * 86}px;"`;
      } else if (hasSwap && idx === idxB) {
        colAnimClass = 'swapping-column-left';
        colStyle = `style="--swap-dist: ${distCol * 86}px;"`;
      }

      const matchedPointers = [];
      for (const [pName, pIdx] of Object.entries(pointers)) {
        if (pIdx === idx) matchedPointers.push(pName);
      }

      html += `
        <div class="array-column ${colAnimClass}" ${colStyle}>
          <div class="pointer-tags-container">
            ${badgeHtml}
            ${matchedPointers.map(p => `<span class="ptr-tag ptr-${p}">${p}</span>`).join('')}
          </div>
          <div class="bar-wrapper">
            <div class="bar-element bar-${stateClass} ${isSelected ? 'bar-selected' : ''}" style="height: ${heightPct}%;">
              <div class="bar-gloss-reflection"></div>
              <span class="bar-value">${val}</span>
              <div class="bar-base-glow"></div>
            </div>
          </div>
          <div class="bar-index-label">${idx}</div>
        </div>
      `;
    });

    html += '</div>';

    if (state.key !== undefined) {
      html += `
        <div class="extra-state-row">
          <span class="state-pill pill-target">Target Key: <strong>${state.key}</strong></span>
        </div>
      `;
    }
    if (state.extractedKey !== undefined && state.extractedKey !== null) {
      html += `
        <div class="extra-state-row">
          <span class="state-pill pill-lifted">Key In Hand: <strong>${state.extractedKey}</strong></span>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  function renderCoinVisualizer(state) {
    const container = document.getElementById('array-visual-container');
    if (!container) return;

    container.innerHTML = `
      <div class="coin-change-visual">
        <div class="coin-metrics-row">
          <div class="metric-card">
            <span class="m-label">Initial Amount</span>
            <span class="m-val">${state.amount}¢</span>
          </div>
          <div class="metric-card highlight">
            <span class="m-label">Remaining to Pay</span>
            <span class="m-val">${state.remaining}¢</span>
          </div>
          <div class="metric-card">
            <span class="m-label">Coins Used</span>
            <span class="m-val">${state.takenCoins.length}</span>
          </div>
        </div>

        <div class="coins-palette">
          <span class="palette-title">Coin Denominations Available:</span>
          <div class="coins-list">
            ${state.coins.map(c => `
              <div class="coin-chip ${state.currentCoin === c ? 'coin-active' : ''}">
                ${c}¢
              </div>
            `).join('')}
          </div>
        </div>

        <div class="coins-collected-area">
          <span class="palette-title">Coins Picked (Greedy Sequence):</span>
          <div class="coins-stack">
            ${state.takenCoins.map((c, i) => `
              <div class="coin-circle coin-${c}">
                <span>${c}¢</span>
              </div>
            `).join('')}
            ${state.takenCoins.length === 0 ? '<span class="text-dim">No coins chosen yet</span>' : ''}
          </div>
        </div>
      </div>
    `;
  }

  function renderKnapsackVisualizer(state) {
    const container = document.getElementById('array-visual-container');
    if (!container) return;

    const usedCapacity = state.capacity - state.remainingCap;
    const fillPct = Math.round((usedCapacity / state.capacity) * 100);

    container.innerHTML = `
      <div class="knapsack-visual-grid">
        <div class="knapsack-items-pane">
          <div class="palette-title">Available Items (Sorted by Ratio):</div>
          <div class="items-cards-list">
            ${state.items.map(item => {
              const fracData = state.fractions[item.id];
              let statusBadge = '<span class="badge-item-unpicked">Unpicked</span>';
              if (fracData) {
                statusBadge = fracData.fraction === 1 
                  ? `<span class="badge-item-full">100% Taken (+${item.value})</span>` 
                  : `<span class="badge-item-frac">${Math.round(fracData.fraction * 100)}% Taken (+${fracData.takenV})</span>`;
              }
              return `
                <div class="knapsack-item-card ${state.activeItem === item.id ? 'active-item' : ''}">
                  <div class="item-header">
                    <strong>${item.name}</strong>
                    <span class="item-ratio">Ratio: ${item.ratio}</span>
                  </div>
                  <div class="item-stats">
                    <span>Val: $${item.value}</span>
                    <span>Wt: ${item.weight}kg</span>
                  </div>
                  <div class="item-status">${statusBadge}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="knapsack-bucket-pane">
          <div class="bucket-header">
            <div>Total Benefit: <strong class="text-emerald">$${state.totalBenefit}</strong></div>
            <div>Capacity: <strong>${usedCapacity} / ${state.capacity} kg</strong></div>
          </div>
          <div class="bucket-container">
            <div class="bucket-fill" style="height: ${fillPct}%;">
              <span class="fill-label">${fillPct}% FULL</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderHuffmanVisualizer(state) {
    const container = document.getElementById('array-visual-container');
    if (!container) return;

    const queue = state.queue || [];
    const extracting = state.extracting || [];
    const newParent = state.newParent;
    const root = state.root;
    const codes = state.codes || {};
    const totalFreq = state.totalFreq || 1;

    // 1. Priority Queue Chips HTML
    let queueHtml = `
      <div class="huffman-queue-pane">
        <div class="huffman-pane-title">
          <span>Min-Priority Queue Q (${queue.length} ${queue.length === 1 ? 'root tree' : 'trees in forest'}):</span>
          <span class="huff-hint-badge">Smallest frequencies first</span>
        </div>
        <div class="huffman-chips-list">
    `;

    queue.forEach(node => {
      const isExtracted = extracting.includes(node.id);
      const isNew = newParent && newParent.id === node.id;
      let chipClass = 'huff-chip';
      let tag = '';
      if (isExtracted) {
        chipClass += ' huff-chip-extracting';
        tag = `<span class="huff-extract-tag">${extracting[0] === node.id ? 'Min 1' : 'Min 2'}</span>`;
      } else if (isNew) {
        chipClass += ' huff-chip-new';
        tag = `<span class="huff-new-tag">Combined</span>`;
      }

      queueHtml += `
        <div class="${chipClass}" style="${node.isLeaf ? `border-left: 4px solid ${node.color}` : ''}">
          ${tag}
          <div class="huff-chip-header">
            <strong>${node.isLeaf ? `'${node.char}'` : `(Node)`}</strong>
            <span class="huff-chip-freq">${node.freq}</span>
          </div>
          <div class="huff-chip-sub">${node.isLeaf ? `Freq: ${node.freq}` : `Sum: ${node.freq}`}</div>
        </div>
      `;
    });

    queueHtml += `
        </div>
      </div>
    `;

    // 2. Tree Canvas HTML
    let treeHtml = '';
    const treeToRender = root || (queue.length > 0 ? queue[queue.length - 1] : null);

    if (treeToRender) {
      treeHtml = `
        <div class="huffman-tree-pane">
          <div class="huffman-pane-title">
            <span>Huffman Tree Visualization ${root ? '(Final Prefix-Free Tree)' : '(Active Tree Being Merged)'}:</span>
            ${root ? '<span class="badge-item-full">Optimal Code Tree</span>' : ''}
          </div>
          <div class="huffman-svg-wrapper">
            ${generateHuffmanSVG(treeToRender)}
          </div>
        </div>
      `;
    }

    // 3. Codebook Table HTML
    let codebookHtml = '';
    const codeEntries = Object.values(codes);
    if (codeEntries.length > 0) {
      codebookHtml = `
        <div class="huffman-codebook-pane">
          <div class="huffman-pane-title">
            <span>Prefix-Free Codebook (Branch '0' = Left, '1' = Right):</span>
            <span class="huff-hint-badge">No code is a prefix of another</span>
          </div>
          <div class="huff-table-scroll">
            <table class="huff-code-table">
              <thead>
                <tr>
                  <th>Character</th>
                  <th>Frequency</th>
                  <th>Probability</th>
                  <th>Huffman Binary Code</th>
                  <th>Bits</th>
                  <th>Total Bits (freq × bits)</th>
                </tr>
              </thead>
              <tbody>
                ${codeEntries.map(c => `
                  <tr>
                    <td><span class="char-dot" style="background:${c.color}"></span><strong>'${c.char}'</strong></td>
                    <td class="font-mono">${c.freq}</td>
                    <td class="font-mono text-dim">${Math.round((c.freq / totalFreq) * 100)}%</td>
                    <td><span class="huff-code-pill font-mono">${c.code}</span></td>
                    <td class="font-mono">${c.bits}</td>
                    <td class="font-mono text-cyan">${c.totalBits}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 4. Compression Stats Summary
    let statsHtml = '';
    if (state.totalVariableBits) {
      statsHtml = `
        <div class="huffman-stats-card">
          <div class="huff-stat-box">
            <span class="stat-lbl">Fixed-Length Encoding</span>
            <span class="stat-num">${state.totalFixedBits} bits</span>
            <span class="stat-sub">${state.fixedBitsPerChar} bits / char</span>
          </div>
          <div class="huff-stat-arrow">→</div>
          <div class="huff-stat-box highlight-emerald">
            <span class="stat-lbl">Huffman Variable-Length</span>
            <span class="stat-num text-emerald">${state.totalVariableBits} bits</span>
            <span class="stat-sub">Average ${state.avgBitsPerChar} bits / char</span>
          </div>
          <div class="huff-stat-box highlight-cyan">
            <span class="stat-lbl">Space Reduction</span>
            <span class="stat-num text-cyan">-${state.savedPct}%</span>
            <span class="stat-sub">Saved ${state.savedBits} bits (${state.totalFixedBits} → ${state.totalVariableBits})</span>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="huffman-visual">
        ${queueHtml}
        ${treeHtml}
        ${codebookHtml}
        ${statsHtml}
      </div>
    `;
  }

  function generateHuffmanSVG(root) {
    if (!root) return '';

    let leafCount = 0;
    function countLeaves(node, depth = 0) {
      if (!node) return 0;
      if (node.isLeaf) {
        leafCount++;
        return depth;
      }
      return Math.max(countLeaves(node.left, depth + 1), countLeaves(node.right, depth + 1));
    }
    const maxDepth = countLeaves(root);
    const leafSpread = Math.max(leafCount * 70, 360);
    const svgWidth = Math.max(leafSpread + 80, 520);
    const svgHeight = Math.max((maxDepth + 1) * 75 + 50, 240);

    let currentLeafX = 50;
    const leafSpacing = (svgWidth - 100) / Math.max(leafCount - 1, 1);

    function assignPositions(node, depth = 0) {
      if (!node) return;
      node.y = 45 + depth * 70;
      if (node.isLeaf) {
        node.x = currentLeafX;
        currentLeafX += leafSpacing;
        return;
      }
      if (node.left) assignPositions(node.left, depth + 1);
      if (node.right) assignPositions(node.right, depth + 1);
      if (node.left && node.right) {
        node.x = (node.left.x + node.right.x) / 2;
      } else if (node.left) {
        node.x = node.left.x + 35;
      } else if (node.right) {
        node.x = node.right.x - 35;
      } else {
        node.x = svgWidth / 2;
      }
    }

    currentLeafX = 50;
    assignPositions(root, 0);

    let linesSvg = '';
    let nodesSvg = '';

    function renderNodeSVG(node) {
      if (!node) return;

      if (node.left) {
        const midX = (node.x + node.left.x) / 2;
        const midY = (node.y + node.left.y) / 2;
        linesSvg += `
          <line x1="${node.x}" y1="${node.y}" x2="${node.left.x}" y2="${node.left.y}" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
          <circle cx="${midX}" cy="${midY}" r="10" fill="#0f172a" stroke="#06b6d4" stroke-width="1.5" />
          <text x="${midX}" y="${midY + 4}" font-family="var(--font-mono)" font-size="11" font-weight="bold" fill="#67e8f9" text-anchor="middle">0</text>
        `;
        renderNodeSVG(node.left);
      }

      if (node.right) {
        const midX = (node.x + node.right.x) / 2;
        const midY = (node.y + node.right.y) / 2;
        linesSvg += `
          <line x1="${node.x}" y1="${node.y}" x2="${node.right.x}" y2="${node.right.y}" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
          <circle cx="${midX}" cy="${midY}" r="10" fill="#0f172a" stroke="#f59e0b" stroke-width="1.5" />
          <text x="${midX}" y="${midY + 4}" font-family="var(--font-mono)" font-size="11" font-weight="bold" fill="#fde68a" text-anchor="middle">1</text>
        `;
        renderNodeSVG(node.right);
      }

      if (node.isLeaf) {
        const nodeColor = node.color || '#6366f1';
        nodesSvg += `
          <g class="huff-svg-node" transform="translate(${node.x}, ${node.y})">
            <circle r="22" fill="${nodeColor}" stroke="#ffffff" stroke-width="2" filter="drop-shadow(0 0 10px ${nodeColor}88)" />
            <text y="-2" font-family="var(--font-heading)" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle">${node.char}</text>
            <text y="14" font-family="var(--font-mono)" font-size="11" font-weight="bold" fill="#f8fafc" text-anchor="middle">${node.freq}</text>
            ${node.code ? `<text y="36" font-family="var(--font-mono)" font-size="11" font-weight="bold" fill="#a5b4fc" text-anchor="middle">[${node.code}]</text>` : ''}
          </g>
        `;
      } else {
        nodesSvg += `
          <g class="huff-svg-node" transform="translate(${node.x}, ${node.y})">
            <circle r="19" fill="#1e293b" stroke="#6366f1" stroke-width="2" />
            <text y="5" font-family="var(--font-mono)" font-size="12" font-weight="bold" fill="#c7d2fe" text-anchor="middle">${node.freq}</text>
          </g>
        `;
      }
    }

    renderNodeSVG(root);

    return `
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="huffman-svg" style="width: 100%; height: auto; max-height: 480px; display: block; margin: 0 auto;">
        ${linesSvg}
        ${nodesSvg}
      </svg>
    `;
  }

  function renderActivityVisualizer(state) {
    const container = document.getElementById('array-visual-container');
    if (!container) return;

    const maxTime = Math.max(...state.activities.map(a => a.f), 10);
    container.innerHTML = `
      <div class="activity-timeline-visual">
        <div class="timeline-ruler">
          ${Array.from({ length: maxTime + 1 }).map((_, t) => `
            <div class="ruler-mark"><span class="ruler-num">${t}</span></div>
          `).join('')}
        </div>
        <div class="activities-lane">
          ${state.activities.map((act, idx) => {
            const isSelected = state.selected.includes(act.id);
            const isRejected = state.rejected.includes(act.id);
            const isCurrent = state.currentIdx === idx;
            let statusClass = 'act-pending';
            if (isSelected) statusClass = 'act-selected';
            else if (isRejected) statusClass = 'act-rejected';
            if (isCurrent) statusClass += ' act-evaluating';

            const leftPct = (act.s / maxTime) * 100;
            const widthPct = ((act.f - act.s) / maxTime) * 100;

            return `
              <div class="activity-row">
                <span class="act-label">Act ${act.name} (${act.s}, ${act.f})</span>
                <div class="act-track">
                  <div class="act-bar ${statusClass}" style="left: ${leftPct}%; width: ${widthPct}%;">
                    <span class="act-inner-txt">${act.s} → ${act.f} ${isSelected ? '✓' : isRejected ? '✗' : ''}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <div class="timeline-legend">
          <span class="legend-item"><span class="legend-box selected"></span> Selected (${state.selected.length})</span>
          <span class="legend-item"><span class="legend-box rejected"></span> Conflict / Rejected (${state.rejected.length})</span>
          <span class="legend-item"><span class="legend-box evaluating"></span> Evaluating</span>
        </div>
      </div>
    `;
  }

  function renderJobVisualizer(state) {
    const container = document.getElementById('array-visual-container');
    if (!container) return;

    container.innerHTML = `
      <div class="job-sequencing-visual">
        <div class="jobs-queue-section">
          <span class="palette-title">Jobs Queue (Sorted by Profit Descending):</span>
          <div class="jobs-list">
            ${state.jobs.map(j => {
              const isScheduled = state.scheduled.some(s => s.job.id === j.id);
              const isDropped = state.dropped.some(d => d.id === j.id);
              const isCurrent = state.currentJobId === j.id;
              let badge = 'badge-pending';
              if (isScheduled) badge = 'badge-scheduled';
              if (isDropped) badge = 'badge-dropped';
              return `
                <div class="job-chip ${badge} ${isCurrent ? 'job-active-scan' : ''}">
                  <span class="job-name">${j.name}</span>
                  <span class="job-profit">Profit: +${j.profit}</span>
                  <span class="job-deadline">Deadline: Slot ≤ ${j.deadline}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="slots-board-section">
          <span class="palette-title">Time Slots Allocation (1 unit per slot):</span>
          <div class="slots-grid">
            ${state.slots.map((job, idx) => `
              <div class="slot-box ${job ? 'slot-occupied' : 'slot-free'}">
                <div class="slot-header">Slot ${idx + 1}</div>
                <div class="slot-content">
                  ${job ? `
                    <strong class="slot-job-name">${job.name}</strong>
                    <span class="slot-job-p">Profit: +${job.profit}</span>
                  ` : `<span class="slot-empty-label">FREE</span>`}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderSimulationVisualizer(state) {
    const container = document.getElementById('array-visual-container');
    if (!container) return;

    const stages = SimulationModule.stages;
    container.innerHTML = `
      <div class="sim-cycle-grid">
        ${stages.map(st => `
          <div class="sim-stage-card ${state.stageNum === st.num ? 'stage-active' : ''}">
            <div class="stage-num">${st.num}</div>
            <div class="stage-body">
              <strong>${st.name}</strong>
              <p>${st.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="sim-live-metrics" style="margin-top: 1rem;">
        <div class="metric-card highlight">
          <span class="m-label">Simulation Clock</span>
          <span class="m-val">t = ${state.clock}</span>
        </div>
        <div class="metric-card">
          <span class="m-label">Server Status</span>
          <span class="m-val ${state.serverBusy ? 'text-coral' : 'text-emerald'}">
            ${state.serverBusy ? `BUSY (${state.currentCustomer})` : 'IDLE'}
          </span>
        </div>
        <div class="metric-card">
          <span class="m-label">Queue Length</span>
          <span class="m-val">${state.queue.length}</span>
        </div>
        <div class="metric-card">
          <span class="m-label">Completed Units</span>
          <span class="m-val">${state.completed.length}</span>
        </div>
      </div>
    `;
  }

  function addHistoryRow(row) {
    if (!row) return;
    const tbody = document.getElementById('exam-table-body');
    if (!tbody) return;

    if (recordedHistory.some(r => r.step === row.step && r.detail === row.detail)) return;
    recordedHistory.push(row);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="badge-step">${row.step}</span></td>
      <td class="font-mono text-cyan">${row.detail}</td>
    `;
    tbody.appendChild(tr);
  }

  function clearHistoryTable() {
    const tbody = document.getElementById('exam-table-body');
    if (tbody) tbody.innerHTML = '';
  }

  function highlightPseudocodeLine(lineNum) {
    document.querySelectorAll('.pseudo-line').forEach(el => {
      const num = parseInt(el.dataset.line);
      el.classList.toggle('active-line', num === lineNum);
    });
  }

  function updatePseudocode(algoKey) {
    const container = document.getElementById('pseudocode-content');
    if (!container) return;

    const lines = PSEUDOCODES[algoKey] || [];
    container.innerHTML = lines.map((code, idx) => `
      <div class="pseudo-line" data-line="${idx + 1}">
        <span class="line-no">${idx + 1}</span>
        <span class="line-code">${escapeHtml(code)}</span>
      </div>
    `).join('');
  }

  function updateHeaderAndNotes(algoKey) {
    const titles = {
      linear: { title: '1.A Linear Search', subtitle: 'Check elements one by one until the target key is found.' },
      binary: { title: '1.B Binary Search', subtitle: 'Divide search space in half. Prerequisite: Array MUST be sorted!' },
      selection: { title: '2.A Selection Sort', subtitle: 'Find minimum element in unsorted part and place at index i.' },
      bubble: { title: '2.B Bubble Sort', subtitle: 'Repeatedly compare adjacent elements and swap. Optimized with swapped flag.' },
      insertion: { title: '2.C Insertion Sort', subtitle: 'Card player metaphor: Insert element into correct sorted position in left portion.' },
      merge: { title: '2.D Merge Sort', subtitle: 'Divide & Conquer: Split into halves, recursively sort, and merge sorted sub-arrays.' },
      quick: { title: '2.E Quick Sort', subtitle: 'Choose pivot, partition into smaller/larger elements, then recursively sort each half.' },
      coinChange: { title: '4.A Greedy Coin Change', subtitle: 'Choose largest coin first. Note: May fail for arbitrary coin systems (see trap preset).' },
      knapsack: { title: '4.B Fractional Knapsack', subtitle: 'Calculate benefit/weight ratio. Take highest ratio items first. Fractions allowed.' },
      huffman: { title: '4.C Huffman Coding (Prefix Tree)', subtitle: 'Greedy Lossless Compression: Build optimal variable-length prefix-free binary tree from symbol frequencies.' },
      activitySelection: { title: '4.D Activity Selection', subtitle: 'Earliest finish time first greedy choice rule. Maximizes non-overlapping activities.' },
      jobSequencing: { title: '4.E Job Sequencing with Deadlines', subtitle: 'Sort by profit descending. Place in latest available slot ≤ deadline.' },
      simulation: { title: '5. Simulation — General Exam Visual', subtitle: 'The 8-step simulation cycle pattern: Initialize, Find event, Advance time, Process, Update, Record, Repeat, Output.' },
      asymptotic: { title: '3. Asymptotic Analysis & Growth Rates', subtitle: 'Big-O (Upper), Big-Omega (Lower), Big-Theta (Tight). Growth comparison curves & loop patterns.' },
      revision: { title: '6. One-Page Exam Revision & Practice Quiz', subtitle: 'Quick comparison cheat sheet, sorting complexity master table, flashcards, and exam quiz.' }
    };

    const info = titles[algoKey] || { title: 'Algorithm Visualizer', subtitle: '' };
    const h1 = document.getElementById('algo-main-title');
    const sub = document.getElementById('algo-main-subtitle');
    if (h1) h1.textContent = info.title;
    if (sub) sub.textContent = info.subtitle;
  }

  function updateComplexityBanner(algoKey) {
    const banner = document.getElementById('complexity-banner');
    if (!banner) return;

    const data = COMPLEXITY_CARDS[algoKey];
    if (data) {
      banner.style.display = 'grid';
      document.getElementById('comp-best').textContent = data.best;
      document.getElementById('comp-avg').textContent = data.avg;
      document.getElementById('comp-worst').textContent = data.worst;
      document.getElementById('comp-space').textContent = data.space;
      document.getElementById('comp-note').textContent = data.note;
    } else {
      banner.style.display = 'none';
    }
  }

  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ================= Event Listeners =================
  document.getElementById('btn-play')?.addEventListener('click', () => visualizer.togglePlay());
  document.getElementById('btn-prev')?.addEventListener('click', () => visualizer.stepBackward());
  document.getElementById('btn-next')?.addEventListener('click', () => visualizer.stepForward());
  document.getElementById('btn-first')?.addEventListener('click', () => visualizer.firstStep());
  document.getElementById('btn-last')?.addEventListener('click', () => visualizer.lastStep());
  document.getElementById('btn-reset')?.addEventListener('click', () => runAlgorithmWithInputs(currentAlgo));

  document.getElementById('btn-apply-input')?.addEventListener('click', () => {
    runAlgorithmWithInputs(currentAlgo);
    if (window.soundEngine) window.soundEngine.click();
  });

  document.getElementById('btn-random-input')?.addEventListener('click', () => {
    if (['linear', 'selection', 'bubble', 'insertion', 'merge', 'quick'].includes(currentAlgo)) {
      const arr = Array.from({ length: 7 }, () => Math.floor(Math.random() * 25) + 1);
      const arrInput = document.getElementById('in-array');
      if (arrInput) arrInput.value = arr.join(', ');
      if (currentAlgo === 'linear') {
        const keyInput = document.getElementById('in-key');
        if (keyInput) keyInput.value = arr[Math.floor(Math.random() * arr.length)];
      }
    } else if (currentAlgo === 'binary') {
      const arr = Array.from({ length: 7 }, () => Math.floor(Math.random() * 25) + 1).sort((a, b) => a - b);
      const arrInput = document.getElementById('in-array');
      const keyInput = document.getElementById('in-key');
      if (arrInput) arrInput.value = arr.join(', ');
      if (keyInput) keyInput.value = arr[Math.floor(Math.random() * arr.length)];
    } else if (currentAlgo === 'coinChange') {
      const amtInput = document.getElementById('in-coin-amount');
      if (amtInput) amtInput.value = Math.floor(Math.random() * 500) + 50;
    } else if (currentAlgo === 'huffman') {
      const sampleChars = ['A', 'B', 'C', 'D', 'E', 'F'];
      const randomText = sampleChars
        .map(ch => `${ch}: ${Math.floor(Math.random() * 40) + 5}`)
        .join(', ');
      const huffInput = document.getElementById('in-huffman');
      if (huffInput) huffInput.value = randomText;
    } else if (currentAlgo === 'knapsack') {
      const capInput = document.getElementById('in-knap-cap');
      if (capInput) capInput.value = Math.floor(Math.random() * 40) + 20;
    } else if (currentAlgo === 'activitySelection') {
      const acts = [];
      for (let i = 0; i < 5; i++) {
        const s = Math.floor(Math.random() * 10) + 1;
        const f = s + Math.floor(Math.random() * 4) + 1;
        acts.push(`(${s}, ${f})`);
      }
      const actInput = document.getElementById('in-activities');
      if (actInput) actInput.value = acts.join(', ');
    } else if (currentAlgo === 'jobSequencing') {
      const jobs = [];
      for (let i = 0; i < 4; i++) {
        const p = Math.floor(Math.random() * 80) + 20;
        const d = Math.floor(Math.random() * 3) + 1;
        jobs.push(`J${i + 1}: P=${p}, D=${d}`);
      }
      const jobInput = document.getElementById('in-jobs');
      if (jobInput) jobInput.value = jobs.join(', ');
    }
    runAlgorithmWithInputs(currentAlgo);
  });

  document.getElementById('btn-reset-exam-input')?.addEventListener('click', () => {
    const def = ALGO_PRESETS[currentAlgo]?.default;
    if (def) applyPresetData(currentAlgo, def);
  });

  // Copy Output Summary Button
  document.getElementById('btn-copy-output')?.addEventListener('click', (e) => {
    const resVal = document.getElementById('out-result-value')?.textContent || '';
    const compVal = document.getElementById('out-comparisons-count')?.textContent || '0';
    const swapVal = document.getElementById('out-swaps-count')?.textContent || '0';
    const caseVal = document.getElementById('out-complexity-case')?.textContent || '';

    const summaryText = `[${currentAlgo.toUpperCase()}] Result: ${resVal} | Comparisons: ${compVal} | Swaps/Ops: ${swapVal} | Analysis: ${caseVal}`;
    navigator.clipboard.writeText(summaryText).then(() => {
      const btn = e.currentTarget;
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 Copy Output Summary';
        btn.classList.remove('copied');
      }, 1500);
    });
  });

  document.getElementById('step-scrubber')?.addEventListener('input', (e) => {
    visualizer.goToStep(parseInt(e.target.value));
  });

  document.getElementById('speed-select')?.addEventListener('change', (e) => {
    visualizer.setSpeed(parseFloat(e.target.value));
  });

  document.getElementById('btn-sound-toggle')?.addEventListener('click', (e) => {
    const isMuted = window.soundEngine.toggleMute();
    e.currentTarget.innerHTML = isMuted 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
  });

  // ================= Right Sidebar Controller (3-Line Button & Extend Toggle) =================
  const btnSidebarToggle = document.getElementById('btn-sidebar-toggle');
  const btnRightPanelExtend = document.getElementById('btn-right-panel-extend');
  const btnRightPanelClose = document.getElementById('btn-right-panel-close');
  const rightSidebarOverlay = document.getElementById('right-sidebar-overlay');

  const btnSidebarClose = document.getElementById('btn-sidebar-close');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  const isMobileView = () => window.innerWidth <= 1100;
  let wasLeftSidebarCollapsedBefore = false;

  function updateRightSidebarUI() {
    const isExtended = document.body.classList.contains('right-sidebar-extended');
    btnSidebarToggle?.classList.toggle('is-extended', isExtended);
    btnSidebarToggle?.setAttribute('aria-expanded', isExtended ? 'true' : 'false');
    btnSidebarToggle?.setAttribute('title', isExtended ? 'Shrink Right Sidebar (Ctrl+E)' : 'Extend Right Sidebar (Ctrl+E)');

    if (btnRightPanelExtend) {
      const icon = btnRightPanelExtend.querySelector('.extend-icon');
      const text = btnRightPanelExtend.querySelector('.extend-text');
      if (icon) icon.textContent = isExtended ? '⤡' : '⤢';
      if (text) text.textContent = isExtended ? 'Shrink' : 'Extend';
      btnRightPanelExtend.setAttribute('title', isExtended ? 'Shrink Right Sidebar (Ctrl+E)' : 'Extend Right Sidebar (Ctrl+E)');
    }
  }

  function toggleRightSidebar() {
    const willExtend = !document.body.classList.contains('right-sidebar-extended');
    document.body.classList.toggle('right-sidebar-extended', willExtend);

    // On medium desktop screens (1100px - 1350px), auto-collapse left syllabus when right sidebar extends
    if (window.innerWidth <= 1350 && window.innerWidth > 1100) {
      if (willExtend) {
        wasLeftSidebarCollapsedBefore = document.body.classList.contains('sidebar-collapsed');
        document.body.classList.add('sidebar-collapsed');
      } else if (!wasLeftSidebarCollapsedBefore) {
        document.body.classList.remove('sidebar-collapsed');
      }
    }

    updateRightSidebarUI();
    if (window.soundEngine && typeof window.soundEngine.click === 'function') {
      window.soundEngine.click();
    }
  }

  function closeRightSidebar() {
    if (document.body.classList.contains('right-sidebar-extended')) {
      document.body.classList.remove('right-sidebar-extended');
      if (!wasLeftSidebarCollapsedBefore && window.innerWidth <= 1350 && window.innerWidth > 1100) {
        document.body.classList.remove('sidebar-collapsed');
      }
      updateRightSidebarUI();
    }
  }

  // 3-line floating hamburger extends the right sidebar
  btnSidebarToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleRightSidebar();
  });

  // Right panel extend button
  btnRightPanelExtend?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleRightSidebar();
  });

  // Right panel close button
  btnRightPanelClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeRightSidebar();
  });

  // Backdrop click closes mobile right sidebar
  rightSidebarOverlay?.addEventListener('click', () => {
    closeRightSidebar();
  });

  // Mobile syllabus close button
  btnSidebarClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.remove('sidebar-open');
  });

  sidebarOverlay?.addEventListener('click', () => {
    document.body.classList.remove('sidebar-open');
  });

  // Algorithm navigation links: switch algo and auto-close sidebar on mobile
  document.querySelectorAll('.algo-nav-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const algo = e.currentTarget.dataset.algo;
      if (algo) loadAlgorithm(algo);
      if (isMobileView()) {
        document.body.classList.remove('sidebar-open');
      }
    });
  });

  // Window resize handler to maintain clean states
  window.addEventListener('resize', () => {
    if (!isMobileView()) {
      document.body.classList.remove('sidebar-open');
    }
    updateSidebarUI();
  });

  // Set initial attributes
  updateSidebarUI();

  // Asymptotic controls
  document.getElementById('asymptotic-n-slider')?.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    document.getElementById('asymptotic-n-val').textContent = val;
    AsymptoticModule.drawGrowthChart(val);
  });

  document.getElementById('btn-run-loop')?.addEventListener('click', () => {
    const pattern = document.getElementById('loop-pattern-select').value;
    const n = parseInt(document.getElementById('loop-n-input').value) || 5;
    const res = AsymptoticModule.runLoopSimulation(pattern, n);

    const logContainer = document.getElementById('loop-logs-output');
    if (logContainer) {
      logContainer.innerHTML = `
        <div class="loop-summary-tag">Pattern: <strong>${pattern}</strong> | n = ${n} | Total Operations: <strong>${res.totalOps}</strong></div>
        <div class="loop-lines-scroll">
          ${res.logs.map(l => `<div class="log-line">${l.line}</div>`).join('')}
        </div>
      `;
    }
  });

  // Keyboard navigation shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'Escape') {
      if (document.body.classList.contains('right-sidebar-extended')) {
        closeRightSidebar();
        return;
      }
      if (isMobileView() && document.body.classList.contains('sidebar-open')) {
        document.body.classList.remove('sidebar-open');
        return;
      }
    }
    if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'e' || e.key.toLowerCase() === 'b')) {
      e.preventDefault();
      toggleRightSidebar();
      return;
    }
    if (e.code === 'Space') {
      e.preventDefault();
      visualizer.togglePlay();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      visualizer.stepForward();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      visualizer.stepBackward();
    } else if (e.code === 'KeyR') {
      visualizer.firstStep();
    }
  });

  // Initial Load
  loadAlgorithm('linear');
});

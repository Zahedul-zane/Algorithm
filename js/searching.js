// Searching Algorithms Step Generator & Visualizer with Real-time Input/Output Metrics
const SearchingModule = {
  // Linear Search
  generateLinearSearchSteps(array, key) {
    const steps = [];
    const n = array.length;
    let comparisons = 0;

    // Step 0: Start
    steps.push({
      array: [...array],
      highlighted: {},
      pointers: { i: 0 },
      key: key,
      activeLine: 1,
      stepTitle: 'Step 0: Initialization',
      explanation: `Target key = ${key}. Searching through array of ${n} elements.`,
      historyRow: { step: 'Step 0', detail: `${array.join(' ')} → key = ${key}` },
      metrics: {
        comparisons: 0,
        swaps: 0,
        status: 'In Progress',
        resultValue: 'Pending...',
        complexityCase: 'Evaluating...'
      },
      sound: null
    });

    let foundIndex = -1;
    for (let i = 0; i < n; i++) {
      comparisons++;
      const isMatch = array[i] === key;
      const stepNum = i + 1;

      const highlights = {};
      for (let k = 0; k < i; k++) highlights[k] = 'discarded';
      highlights[i] = isMatch ? 'found' : 'compare';

      steps.push({
        array: [...array],
        highlighted: highlights,
        pointers: { i: i },
        key: key,
        activeLine: 3,
        stepTitle: isMatch 
          ? `Step ${stepNum}: FOUND at index ${i}!` 
          : `Step ${stepNum}: Compare A[${i}] with ${key}`,
        explanation: isMatch
          ? `A[${i}] = ${array[i]} equals key ${key}! Target found at index ${i}.`
          : `A[${i}] = ${array[i]} ≠ ${key} → Move right to next element.`,
        historyRow: {
          step: `Step ${stepNum}`,
          detail: isMatch
            ? `${array[i]} = ${key} → FOUND at index ${i}`
            : `${array[i]} ≠ ${key} → move right`
        },
        metrics: {
          comparisons,
          swaps: 0,
          status: isMatch ? 'Completed: FOUND' : 'Searching...',
          resultValue: isMatch ? `Index ${i}` : 'Pending...',
          complexityCase: i === 0 ? 'Best Case O(1) (First element match)' : (i === n - 1 ? 'Worst Case O(n) (Last element match)' : 'Average Case O(n)')
        },
        sound: isMatch ? 'found' : 'compare',
        soundVal: array[i]
      });

      if (isMatch) {
        foundIndex = i;
        const caseName = i === 0 
          ? 'Best Case O(1) — Key found on first comparison!' 
          : (i === n - 1 ? 'Worst Case O(n) — Key found on last comparison.' : `Average Case O(n) — Found in ${comparisons} comparisons.`);

        steps.push({
          array: [...array],
          highlighted: { ...highlights, [i]: 'found' },
          pointers: { i: i },
          key: key,
          activeLine: 4,
          stepTitle: `Success: Returned Index ${foundIndex}`,
          explanation: `linear_search returns index ${foundIndex}. Total comparisons: ${comparisons}.`,
          historyRow: null,
          metrics: {
            comparisons,
            swaps: 0,
            status: 'Finished (Success)',
            resultValue: `Found at Index ${foundIndex} (Value: ${array[foundIndex]})`,
            complexityCase: caseName
          },
          sound: null
        });
        break;
      }
    }

    if (foundIndex === -1) {
      const highlights = {};
      for (let k = 0; k < n; k++) highlights[k] = 'discarded';
      steps.push({
        array: [...array],
        highlighted: highlights,
        pointers: {},
        key: key,
        activeLine: 5,
        stepTitle: 'Not Found: Returned -1',
        explanation: `Reached end of array. Key ${key} is not present in the array. Returning -1 after ${comparisons} comparisons.`,
        historyRow: { step: `Step ${n + 1}`, detail: `End of array reached → key ${key} not found (returns -1)` },
        metrics: {
          comparisons,
          swaps: 0,
          status: 'Finished (Not Found)',
          resultValue: 'Not Found (returns -1)',
          complexityCase: 'Worst Case O(n) — Searched entire array without match.'
        },
        sound: 'discard'
      });
    }

    return steps;
  },

  // Binary Search
  generateBinarySearchSteps(array, key) {
    const sorted = [...array].sort((a, b) => a - b);
    const steps = [];
    let low = 0;
    let high = sorted.length - 1;
    let stepCount = 0;
    let comparisons = 0;

    // Initial step
    steps.push({
      array: [...sorted],
      highlighted: {},
      pointers: { low, high },
      key: key,
      activeLine: 1,
      stepTitle: 'Start: Initialize Bounds',
      explanation: `Sorted Array: [${sorted.join(', ')}]. Search interval: low = ${low}, high = ${high}. Target key = ${key}.`,
      historyRow: { step: 'Start', detail: `${sorted.join(' ')} | low=0, high=${high}` },
      metrics: {
        comparisons: 0,
        swaps: 0,
        status: 'Initialized',
        resultValue: 'Pending...',
        complexityCase: 'O(log n) Halving Space'
      },
      sound: null
    });

    let found = false;

    while (low <= high) {
      stepCount++;
      comparisons++;
      const mid = Math.floor((low + high) / 2);

      const highlights = {};
      for (let i = 0; i < sorted.length; i++) {
        if (i < low || i > high) highlights[i] = 'eliminated';
      }
      highlights[mid] = 'mid-scan';

      steps.push({
        array: [...sorted],
        highlighted: { ...highlights },
        pointers: { low, high, mid },
        key: key,
        activeLine: 3,
        stepTitle: `Step ${stepCount}: Compute Middle (mid = ${mid})`,
        explanation: `mid = ⌊(${low} + ${high}) / 2⌋ = ${mid}. Middle element is A[${mid}] = ${sorted[mid]}.`,
        historyRow: null,
        metrics: {
          comparisons,
          swaps: 0,
          status: `Evaluating mid = ${mid}`,
          resultValue: 'Searching...',
          complexityCase: `Interval size: ${high - low + 1} elements`
        },
        sound: 'compare',
        soundVal: sorted[mid]
      });

      if (sorted[mid] === key) {
        highlights[mid] = 'found';
        const caseName = stepCount === 1 
          ? 'Best Case O(1) — Key found on first middle check!' 
          : `O(log n) — Found in ${comparisons} comparisons.`;

        steps.push({
          array: [...sorted],
          highlighted: { ...highlights },
          pointers: { low, high, mid },
          key: key,
          activeLine: 5,
          stepTitle: `Step ${stepCount}: FOUND at index ${mid}!`,
          explanation: `A[mid] (${sorted[mid]}) == key (${key}). Target element found at index ${mid}!`,
          historyRow: { step: `Step ${stepCount}`, detail: `mid=${mid} → A[${mid}]=${key} → FOUND` },
          metrics: {
            comparisons,
            swaps: 0,
            status: 'Finished (Found)',
            resultValue: `Found at Index ${mid} (Value: ${sorted[mid]})`,
            complexityCase: caseName
          },
          sound: 'found'
        });
        found = true;
        break;
      } else if (key < sorted[mid]) {
        highlights[mid] = 'compare';
        steps.push({
          array: [...sorted],
          highlighted: { ...highlights },
          pointers: { low, high, mid },
          key: key,
          activeLine: 7,
          stepTitle: `Step ${stepCount}: Search LEFT`,
          explanation: `key (${key}) < A[mid] (${sorted[mid]}) → Eliminate right half. Update high = mid - 1 (${mid - 1}).`,
          historyRow: { 
            step: `Step ${stepCount}`, 
            detail: `mid=${mid} (A[${mid}]=${sorted[mid]}) | key < middle → search LEFT; high=${mid - 1}` 
          },
          metrics: {
            comparisons,
            swaps: 0,
            status: 'Eliminated Right Half',
            resultValue: 'Searching left...',
            complexityCase: `Remaining search space halved to ${Math.max(0, mid - low)} elements`
          },
          sound: 'discard'
        });
        high = mid - 1;
      } else {
        highlights[mid] = 'compare';
        steps.push({
          array: [...sorted],
          highlighted: { ...highlights },
          pointers: { low, high, mid },
          key: key,
          activeLine: 9,
          stepTitle: `Step ${stepCount}: Search RIGHT`,
          explanation: `key (${key}) > A[mid] (${sorted[mid]}) → Eliminate left half. Update low = mid + 1 (${mid + 1}).`,
          historyRow: { 
            step: `Step ${stepCount}`, 
            detail: `mid=${mid} (A[${mid}]=${sorted[mid]}) | key > middle → search RIGHT; low=${mid + 1}` 
          },
          metrics: {
            comparisons,
            swaps: 0,
            status: 'Eliminated Left Half',
            resultValue: 'Searching right...',
            complexityCase: `Remaining search space halved to ${Math.max(0, high - mid)} elements`
          },
          sound: 'discard'
        });
        low = mid + 1;
      }
    }

    if (!found) {
      const highlights = {};
      for (let i = 0; i < sorted.length; i++) highlights[i] = 'eliminated';
      steps.push({
        array: [...sorted],
        highlighted: highlights,
        pointers: { low, high },
        key: key,
        activeLine: 10,
        stepTitle: 'Search Concluded: Not Found',
        explanation: `low (${low}) > high (${high}). Search interval is empty. Key ${key} not in array. Returns -1.`,
        historyRow: { step: `Final`, detail: `low > high → Key ${key} NOT FOUND (returns -1)` },
        metrics: {
          comparisons,
          swaps: 0,
          status: 'Finished (Not Found)',
          resultValue: 'Not Found (returns -1)',
          complexityCase: `Worst Case O(log n) — Checked all log₂(n) levels.`
        },
        sound: 'discard'
      });
    }

    return steps;
  }
};

window.SearchingModule = SearchingModule;

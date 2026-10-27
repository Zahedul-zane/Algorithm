// Sorting Algorithms Visual Simulation Engine with Real-time Input/Output Metrics & Physical Swapping Pairs
const SortingModule = {
  // Selection Sort
  generateSelectionSortSteps(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    steps.push({
      array: [...arr],
      highlighted: {},
      pointers: { i: 0 },
      swapPair: null,
      activeLine: 1,
      stepTitle: 'Selection Sort: Start',
      explanation: `Initial array: [${arr.join(', ')}]. Will find minimum in unsorted part and place at index i.`,
      historyRow: { step: 'Start', detail: arr.join(' ') },
      metrics: {
        comparisons: 0,
        swaps: 0,
        status: 'Starting...',
        resultValue: `[${arr.join(', ')}]`,
        complexityCase: 'O(n²) Always (n-1 passes required)'
      },
      sound: null
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      steps.push({
        array: [...arr],
        highlighted: { [i]: 'min-candidate' },
        pointers: { i, min: minIdx },
        swapPair: null,
        activeLine: 3,
        stepTitle: `Pass ${i + 1}: Start`,
        explanation: `Pass ${i + 1}: Setting initial minimum candidate as A[${i}] = ${arr[i]}.`,
        historyRow: null,
        metrics: {
          comparisons,
          swaps,
          status: `Pass ${i + 1} of ${n - 1}`,
          resultValue: `[${arr.join(', ')}]`,
          complexityCase: `Pass ${i + 1}: Scanning ${n - 1 - i} remaining elements`
        },
        sound: 'compare',
        soundVal: arr[i]
      });

      for (let j = i + 1; j < n; j++) {
        comparisons++;
        const isNewMin = arr[j] < arr[minIdx];

        const highlights = {};
        for (let k = 0; k < i; k++) highlights[k] = 'sorted';
        highlights[minIdx] = 'min-candidate';
        highlights[j] = isNewMin ? 'found' : 'compare';

        steps.push({
          array: [...arr],
          highlighted: highlights,
          pointers: { i, min: minIdx, j },
          swapPair: null,
          activeLine: 5,
          stepTitle: `Pass ${i + 1}: Compare A[${j}] with A[${minIdx}]`,
          explanation: `Comparing A[${j}] (${arr[j]}) with current min A[${minIdx}] (${arr[minIdx]}). ${
            isNewMin ? `New minimum found! min index becomes ${j}.` : `No change.`
          }`,
          historyRow: null,
          metrics: {
            comparisons,
            swaps,
            status: `Pass ${i + 1} (Comparing A[${j}] and A[${minIdx}])`,
            resultValue: `[${arr.join(', ')}]`,
            complexityCase: `Total Comparisons: ${comparisons}`
          },
          sound: isNewMin ? 'found' : 'compare',
          soundVal: arr[j]
        });

        if (isNewMin) {
          minIdx = j;
        }
      }

      // Swap
      const neededSwap = minIdx !== i;
      const swapMsg = neededSwap 
        ? `minimum = ${arr[minIdx]} → swap with ${arr[i]} → ` 
        : `minimum = ${arr[minIdx]} is already at position ${i} → `;

      const highlights = {};
      for (let k = 0; k < i; k++) highlights[k] = 'sorted';
      highlights[i] = 'swap';
      highlights[minIdx] = 'swap';

      if (neededSwap) swaps++;

      steps.push({
        array: [...arr],
        highlighted: highlights,
        pointers: { i, min: minIdx },
        swapPair: neededSwap ? [i, minIdx] : null,
        activeLine: 7,
        stepTitle: `Pass ${i + 1}: Swap A[${i}] ⟷ A[${minIdx}]`,
        explanation: neededSwap
          ? `Swapping A[${i}] (${arr[i]}) with minimum A[${minIdx}] (${arr[minIdx]}).`
          : `Minimum element ${arr[minIdx]} is already in place. No swap required.`,
        historyRow: null,
        metrics: {
          comparisons,
          swaps,
          status: neededSwap ? `Swapping indices ${i} ↔ ${minIdx}` : `Element already at index ${i}`,
          resultValue: `[${arr.join(', ')}]`,
          complexityCase: `Pass ${i + 1} finalized`
        },
        sound: 'swap'
      });

      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      const postHighlights = {};
      for (let k = 0; k <= i; k++) postHighlights[k] = 'sorted';

      steps.push({
        array: [...arr],
        highlighted: postHighlights,
        pointers: { i },
        swapPair: null,
        activeLine: 7,
        stepTitle: `Pass ${i + 1}: Completed`,
        explanation: `Pass ${i + 1} complete. Element ${arr[i]} is now locked in sorted position.`,
        historyRow: { step: `Pass ${i + 1}`, detail: `${swapMsg}${arr.join(' ')}` },
        metrics: {
          comparisons,
          swaps,
          status: `Pass ${i + 1} Completed`,
          resultValue: `[${arr.join(', ')}]`,
          complexityCase: `Locked ${i + 1} of ${n} elements`
        },
        sound: null
      });
    }

    const finalHighlights = {};
    for (let k = 0; k < n; k++) finalHighlights[k] = 'sorted';
    steps.push({
      array: [...arr],
      highlighted: finalHighlights,
      pointers: {},
      swapPair: null,
      activeLine: 7,
      stepTitle: 'Selection Sort: Array Completely Sorted',
      explanation: `All ${n} elements are sorted in ascending order after ${comparisons} comparisons and ${swaps} swaps.`,
      historyRow: { step: 'Result', detail: arr.join(' ') },
      metrics: {
        comparisons,
        swaps,
        status: 'Sorted Successfully',
        resultValue: `[${arr.join(', ')}]`,
        complexityCase: `O(n²) Time (${comparisons} comparisons, ${swaps} swaps)`
      },
      sound: 'found'
    });

    return steps;
  },

  // Bubble Sort
  generateBubbleSortSteps(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    steps.push({
      array: [...arr],
      highlighted: {},
      pointers: {},
      swapPair: null,
      activeLine: 1,
      stepTitle: 'Bubble Sort: Start',
      explanation: `Initial array: [${arr.join(', ')}]. Will repeatedly compare adjacent pairs and swap if inverted.`,
      historyRow: { step: 'Start', detail: arr.join(' ') },
      metrics: {
        comparisons: 0,
        swaps: 0,
        status: 'Starting...',
        resultValue: `[${arr.join(', ')}]`,
        complexityCase: 'Best O(n) with early-exit optimization'
      },
      sound: null
    });

    let earlyExited = false;

    for (let i = 0; i < n - 1; i++) {
      let passSwapped = false;
      const passHistoryDetails = [];

      steps.push({
        array: [...arr],
        highlighted: {},
        pointers: { i },
        swapPair: null,
        activeLine: 2,
        stepTitle: `Pass ${i + 1}: Begin`,
        explanation: `Starting Pass ${i + 1}. Checking elements from index 0 to ${n - 2 - i}.`,
        historyRow: null,
        metrics: {
          comparisons,
          swaps,
          status: `Pass ${i + 1} started`,
          resultValue: `[${arr.join(', ')}]`,
          complexityCase: `Checking adjacent pairs`
        },
        sound: null
      });

      for (let j = 0; j < n - 1 - i; j++) {
        comparisons++;
        const needSwap = arr[j] > arr[j + 1];

        const highlights = {};
        for (let k = n - i; k < n; k++) highlights[k] = 'sorted';
        highlights[j] = 'compare';
        highlights[j + 1] = 'compare';

        steps.push({
          array: [...arr],
          highlighted: highlights,
          pointers: { j, 'j+1': j + 1 },
          swapPair: null,
          activeLine: 4,
          stepTitle: `Pass ${i + 1}: Compare A[${j}] & A[${j + 1}]`,
          explanation: `Compare A[${j}] (${arr[j]}) and A[${j + 1}] (${arr[j + 1]}). ${
            needSwap ? `${arr[j]} > ${arr[j + 1]} → Inverted! Swap needed.` : `${arr[j]} ≤ ${arr[j + 1]} → In order.`
          }`,
          historyRow: null,
          metrics: {
            comparisons,
            swaps,
            status: `Pass ${i + 1}: Comparing ${arr[j]} & ${arr[j + 1]}`,
            resultValue: `[${arr.join(', ')}]`,
            complexityCase: needSwap ? 'Inversion found' : 'Pair already in order'
          },
          sound: 'compare',
          soundVal: arr[j]
        });

        if (needSwap) {
          swaps++;
          passSwapped = true;
          const swapHighlights = { ...highlights, [j]: 'swap', [j + 1]: 'swap' };

          steps.push({
            array: [...arr],
            highlighted: swapHighlights,
            pointers: { j, 'j+1': j + 1 },
            swapPair: [j, j + 1],
            activeLine: 5,
            stepTitle: `Pass ${i + 1}: Swap A[${j}] ⟷ A[${j + 1}]`,
            explanation: `Swapping ${arr[j]} and ${arr[j + 1]}.`,
            historyRow: null,
            metrics: {
              comparisons,
              swaps,
              status: `Swapped ${arr[j]} ↔ ${arr[j + 1]}`,
              resultValue: `[${arr.join(', ')}]`,
              complexityCase: `Swaps count: ${swaps}`
            },
            sound: 'swap'
          });

          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          passHistoryDetails.push(`${temp}>${arr[j]} swap → ${arr.join(' ')}`);

          steps.push({
            array: [...arr],
            highlighted: swapHighlights,
            pointers: { j, 'j+1': j + 1 },
            swapPair: null,
            activeLine: 5,
            stepTitle: `Pass ${i + 1}: Swapped`,
            explanation: `Swapped. Array is now: [${arr.join(', ')}].`,
            historyRow: null,
            metrics: {
              comparisons,
              swaps,
              status: `Array updated`,
              resultValue: `[${arr.join(', ')}]`,
              complexityCase: `Swaps count: ${swaps}`
            },
            sound: null
          });
        }
      }

      const postHighlights = {};
      for (let k = n - 1 - i; k < n; k++) postHighlights[k] = 'sorted';

      const detailText = passHistoryDetails.length > 0
        ? passHistoryDetails.join(' → ')
        : 'No needed swaps → already sorted';

      steps.push({
        array: [...arr],
        highlighted: postHighlights,
        pointers: {},
        swapPair: null,
        activeLine: 2,
        stepTitle: `Pass ${i + 1}: Finished`,
        explanation: `Pass ${i + 1} finished. ${
          !passSwapped ? 'No swaps occurred! Array is already fully sorted (Early Exit Triggered).' : `Element ${arr[n - 1 - i]} locked into place.`
        }`,
        historyRow: { step: `Pass ${i + 1}`, detail: detailText },
        metrics: {
          comparisons,
          swaps,
          status: !passSwapped ? 'Early Exit Triggered (No Swaps)' : `Pass ${i + 1} completed`,
          resultValue: `[${arr.join(', ')}]`,
          complexityCase: !passSwapped && i === 0 ? 'Best Case O(n) Achieved!' : `Pass ${i + 1} done`
        },
        sound: !passSwapped ? 'found' : null
      });

      if (!passSwapped) {
        earlyExited = true;
        break;
      }
    }

    const finalHighlights = {};
    for (let k = 0; k < n; k++) finalHighlights[k] = 'sorted';
    const complexityNote = earlyExited && comparisons <= n
      ? 'Best Case O(n) — Array was already sorted; terminated in 1 pass.'
      : (swaps === 0 ? 'Best Case O(n)' : `O(n²) Average/Worst Case — ${comparisons} comparisons, ${swaps} swaps.`);

    steps.push({
      array: [...arr],
      highlighted: finalHighlights,
      pointers: {},
      swapPair: null,
      activeLine: 5,
      stepTitle: 'Bubble Sort: Completed',
      explanation: `Bubble sort finished. Sorted array: [${arr.join(', ')}]. Total comparisons: ${comparisons}, swaps: ${swaps}.`,
      historyRow: { step: 'Result', detail: arr.join(' ') },
      metrics: {
        comparisons,
        swaps,
        status: 'Sorted Successfully',
        resultValue: `[${arr.join(', ')}]`,
        complexityCase: complexityNote
      },
      sound: 'found'
    });

    return steps;
  },

  // Insertion Sort
  generateInsertionSortSteps(initialArray) {
    const arr = [...initialArray];
    const n = arr.length;
    const steps = [];
    let comparisons = 0;
    let shifts = 0;

    steps.push({
      array: [...arr],
      highlighted: { 0: 'sorted' },
      pointers: {},
      swapPair: null,
      activeLine: 1,
      stepTitle: 'Insertion Sort: Start',
      explanation: `Initial array: [${arr.join(', ')}]. The first element [${arr[0]}] is trivially a sorted sub-array of length 1.`,
      historyRow: { step: 'Start', detail: `[${arr[0]}] | ${arr.slice(1).join(' ')}` },
      metrics: {
        comparisons: 0,
        swaps: 0,
        status: 'Initialized',
        resultValue: `[${arr.join(', ')}]`,
        complexityCase: 'Best Case O(n) if already sorted'
      },
      sound: null
    });

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      const liftHighlights = {};
      for (let k = 0; k < i; k++) liftHighlights[k] = 'sorted';
      liftHighlights[i] = 'key-lift';

      steps.push({
        array: [...arr],
        highlighted: liftHighlights,
        pointers: { i, key },
        extractedKey: key,
        swapPair: null,
        activeLine: 3,
        stepTitle: `Insert ${key}: Extract Key`,
        explanation: `Taking key = A[${i}] (${key}) to insert into the sorted portion [${arr.slice(0, i).join(', ')}].`,
        historyRow: null,
        metrics: {
          comparisons,
          swaps: shifts,
          status: `Key extracted: ${key}`,
          resultValue: `[${arr.join(', ')}]`,
          complexityCase: `Inserting element ${i + 1} of ${n}`
        },
        sound: 'compare',
        soundVal: key
      });

      while (j >= 0) {
        comparisons++;
        if (arr[j] > key) {
          shifts++;
          const shiftHighlights = {};
          for (let k = 0; k <= i; k++) shiftHighlights[k] = 'sorted';
          shiftHighlights[j] = 'compare';
          shiftHighlights[j + 1] = 'swap';

          steps.push({
            array: [...arr],
            highlighted: shiftHighlights,
            pointers: { j, 'j+1': j + 1 },
            extractedKey: key,
            swapPair: [j, j + 1],
            activeLine: 5,
            stepTitle: `Shift: ${arr[j]} > ${key}`,
            explanation: `A[${j}] (${arr[j]}) is greater than key (${key}). Shifting ${arr[j]} right to index ${j + 1}.`,
            historyRow: null,
            metrics: {
              comparisons,
              swaps: shifts,
              status: `Shifted ${arr[j]} right`,
              resultValue: `[${arr.join(', ')}]`,
              complexityCase: `Total shifts: ${shifts}`
            },
            sound: 'compare',
            soundVal: arr[j]
          });

          arr[j + 1] = arr[j];
          j--;

          steps.push({
            array: [...arr],
            highlighted: shiftHighlights,
            pointers: { j: j + 1 },
            extractedKey: key,
            swapPair: null,
            activeLine: 6,
            stepTitle: `Shift Completed`,
            explanation: `Element shifted. Array: [${arr.join(', ')}]. Moving search left (j = ${j}).`,
            historyRow: null,
            metrics: {
              comparisons,
              swaps: shifts,
              status: `Shift completed`,
              resultValue: `[${arr.join(', ')}]`,
              complexityCase: `Total shifts: ${shifts}`
            },
            sound: 'swap'
          });
        } else {
          break;
        }
      }

      arr[j + 1] = key;
      const dropHighlights = {};
      for (let k = 0; k <= i; k++) dropHighlights[k] = 'sorted';
      dropHighlights[j + 1] = 'found';

      const sortedPart = arr.slice(0, i + 1).join(' ');
      const unsortedPart = i + 1 < n ? ` | ${arr.slice(i + 1).join(' ')}` : '';

      steps.push({
        array: [...arr],
        highlighted: dropHighlights,
        pointers: { insertAt: j + 1 },
        extractedKey: null,
        swapPair: null,
        activeLine: 8,
        stepTitle: `Insert ${key}: Placed at Index ${j + 1}`,
        explanation: `Placed key ${key} into index ${j + 1}. Sorted portion now: [${arr.slice(0, i + 1).join(', ')}].`,
        historyRow: { step: `Insert ${key}`, detail: `[${sortedPart}]${unsortedPart}` },
        metrics: {
          comparisons,
          swaps: shifts,
          status: `Key ${key} inserted at index ${j + 1}`,
          resultValue: `[${arr.join(', ')}]`,
          complexityCase: `Sorted prefix length: ${i + 1}`
        },
        sound: 'found'
      });
    }

    const finalHighlights = {};
    for (let k = 0; k < n; k++) finalHighlights[k] = 'sorted';
    const complexityNote = shifts === 0 
      ? 'Best Case O(n) — Array was already sorted (0 shifts required).'
      : `Average/Worst Case O(n²) — ${comparisons} comparisons, ${shifts} shifts.`;

    steps.push({
      array: [...arr],
      highlighted: finalHighlights,
      pointers: {},
      extractedKey: null,
      swapPair: null,
      activeLine: 8,
      stepTitle: 'Insertion Sort: Finished',
      explanation: `All elements inserted. Final sorted array: [${arr.join(', ')}].`,
      historyRow: { step: 'Result', detail: arr.join(' ') },
      metrics: {
        comparisons,
        swaps: shifts,
        status: 'Sorted Successfully',
        resultValue: `[${arr.join(', ')}]`,
        complexityCase: complexityNote
      },
      sound: 'found'
    });

    return steps;
  },

  // Merge Sort
  generateMergeSortSteps(initialArray) {
    const arr = [...initialArray];
    const steps = [];
    let comparisons = 0;
    let merges = 0;

    steps.push({
      array: [...arr],
      highlighted: {},
      pointers: {},
      swapPair: null,
      activeLine: 1,
      stepTitle: 'Merge Sort: Start',
      explanation: `Initial array: [${arr.join(', ')}]. Merge sort will recursively divide into halves, then merge sorted sub-arrays.`,
      historyRow: { step: 'Start', detail: arr.join(' ') },
      metrics: {
        comparisons: 0,
        swaps: 0,
        status: 'Initialized',
        resultValue: `[${arr.join(', ')}]`,
        complexityCase: 'Guaranteed O(n log n) Divide & Conquer'
      },
      sound: null
    });

    function mergeSortHelper(left, right) {
      if (left >= right) return;

      const mid = Math.floor((left + right) / 2);

      const divHighlights = {};
      for (let k = left; k <= mid; k++) divHighlights[k] = 'divide-left';
      for (let k = mid + 1; k <= right; k++) divHighlights[k] = 'divide-right';

      const leftPart = arr.slice(left, mid + 1).join(' ');
      const rightPart = arr.slice(mid + 1, right + 1).join(' ');

      steps.push({
        array: [...arr],
        highlighted: divHighlights,
        pointers: { left, mid, right },
        swapPair: null,
        activeLine: 3,
        stepTitle: `Divide: [${left}..${mid}] | [${mid + 1}..${right}]`,
        explanation: `Divide array segment [${arr.slice(left, right + 1).join(', ')}] into two halves: [${leftPart}] and [${rightPart}].`,
        historyRow: { step: 'Divide', detail: `[${leftPart}] | [${rightPart}]` },
        metrics: {
          comparisons,
          swaps: merges,
          status: `Dividing segment [${left}..${right}]`,
          resultValue: `[${arr.join(', ')}]`,
          complexityCase: `Divide step: log₂(n) levels total`
        },
        sound: 'discard'
      });

      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }

    function merge(left, mid, right) {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);

      let i = 0, j = 0, k = left;
      while (i < leftArr.length && j < rightArr.length) {
        comparisons++;
        merges++;
        const compareHighlights = {};
        for (let idx = left; idx < k; idx++) compareHighlights[idx] = 'sorted';
        compareHighlights[left + i] = 'compare';
        compareHighlights[mid + 1 + j] = 'compare';

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          i++;
        } else {
          arr[k] = rightArr[j];
          j++;
        }

        compareHighlights[k] = 'swap';
        steps.push({
          array: [...arr],
          highlighted: compareHighlights,
          pointers: { k },
          swapPair: null,
          activeLine: 6,
          stepTitle: `Merge: Placed ${arr[k]} at index ${k}`,
          explanation: `Selected smaller element ${arr[k]} into position ${k}.`,
          historyRow: null,
          metrics: {
            comparisons,
            swaps: merges,
            status: `Merging into index ${k}`,
            resultValue: `[${arr.join(', ')}]`,
            complexityCase: `Merge step: linear work O(n) per level`
          },
          sound: 'swap'
        });
        k++;
      }

      while (i < leftArr.length) {
        merges++;
        arr[k] = leftArr[i];
        i++;
        k++;
      }
      while (j < rightArr.length) {
        merges++;
        arr[k] = rightArr[j];
        j++;
        k++;
      }

      const mergedHighlights = {};
      for (let idx = left; idx <= right; idx++) mergedHighlights[idx] = 'sorted';

      steps.push({
        array: [...arr],
        highlighted: mergedHighlights,
        pointers: { left, right },
        swapPair: null,
        activeLine: 6,
        stepTitle: `Merged Segment [${left}..${right}]`,
        explanation: `Merged sub-array is now sorted: [${arr.slice(left, right + 1).join(', ')}].`,
        historyRow: { step: 'Merge', detail: `[${arr.slice(left, right + 1).join(' ')}]` },
        metrics: {
          comparisons,
          swaps: merges,
          status: `Segment [${left}..${right}] merged`,
          resultValue: `[${arr.join(', ')}]`,
          complexityCase: `O(n log n) across all cases`
        },
        sound: 'found'
      });
    }

    mergeSortHelper(0, arr.length - 1);

    const finalHighlights = {};
    for (let k = 0; k < arr.length; k++) finalHighlights[k] = 'sorted';
    steps.push({
      array: [...arr],
      highlighted: finalHighlights,
      pointers: {},
      swapPair: null,
      activeLine: 6,
      stepTitle: 'Merge Sort: Fully Merged & Sorted',
      explanation: `All merge operations completed. Final sorted array: [${arr.join(', ')}]. Total comparisons: ${comparisons}, auxiliary buffer writes: ${merges}.`,
      historyRow: { step: 'Final', detail: arr.join(' ') },
      metrics: {
        comparisons,
        swaps: merges,
        status: 'Sorted Successfully',
        resultValue: `[${arr.join(', ')}]`,
        complexityCase: `Guaranteed O(n log n) Time | O(n) Space`
      },
      sound: 'found'
    });

    return steps;
  },

  // Quick Sort
  generateQuickSortSteps(initialArray) {
    const arr = [...initialArray];
    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    steps.push({
      array: [...arr],
      highlighted: {},
      pointers: {},
      swapPair: null,
      activeLine: 1,
      stepTitle: 'Quick Sort: Start',
      explanation: `Initial array: [${arr.join(', ')}]. Quick sort chooses a pivot, partitions elements into smaller and larger sides, then recursively sorts each side.`,
      historyRow: { step: 'Start', detail: arr.join(' ') },
      metrics: {
        comparisons: 0,
        swaps: 0,
        status: 'Initialized',
        resultValue: `[${arr.join(', ')}]`,
        complexityCase: 'Average O(n log n), Worst O(n²)'
      },
      sound: null
    });

    function quickSortHelper(low, high) {
      if (low < high) {
        const pivotIndex = partition(low, high);
        quickSortHelper(low, pivotIndex - 1);
        quickSortHelper(pivotIndex + 1, high);
      }
    }

    function partition(low, high) {
      const pivot = arr[high];

      const pHighlights = {};
      pHighlights[high] = 'pivot';
      for (let k = low; k < high; k++) pHighlights[k] = 'in-window';

      steps.push({
        array: [...arr],
        highlighted: pHighlights,
        pointers: { low, high, pivot: high },
        swapPair: null,
        activeLine: 3,
        stepTitle: `Choose Pivot: ${pivot} (Index ${high})`,
        explanation: `Partition range [${low}..${high}]. Pivot chosen is ${pivot} at index ${high}. Elements will be partitioned around it.`,
        historyRow: { step: 'Choose pivot', detail: `${arr.map((v, idx) => idx === high ? `[${v}]` : v).join(' ')}` },
        metrics: {
          comparisons,
          swaps,
          status: `Pivot chosen: ${pivot}`,
          resultValue: `[${arr.join(', ')}]`,
          complexityCase: `Partitioning window [${low}..${high}]`
        },
        sound: 'compare',
        soundVal: pivot
      });

      let i = low - 1;

      for (let j = low; j < high; j++) {
        comparisons++;
        const isSmaller = arr[j] <= pivot;

        const scanHighlights = { ...pHighlights };
        scanHighlights[j] = isSmaller ? 'smaller-partition' : 'larger-partition';
        if (i >= low) scanHighlights[i] = 'swap';

        steps.push({
          array: [...arr],
          highlighted: scanHighlights,
          pointers: { i: Math.max(low, i), j, pivot: high },
          swapPair: null,
          activeLine: 3,
          stepTitle: `Compare A[${j}] (${arr[j]}) with Pivot (${pivot})`,
          explanation: `${arr[j]} ${isSmaller ? `≤` : `>`} pivot (${pivot}) → ${
            isSmaller ? `Belongs in smaller partition (advance i and swap with A[${j}]).` : `Belongs in larger partition.`
          }`,
          historyRow: null,
          metrics: {
            comparisons,
            swaps,
            status: `Compared ${arr[j]} with pivot ${pivot}`,
            resultValue: `[${arr.join(', ')}]`,
            complexityCase: isSmaller ? 'Smaller partition' : 'Larger partition'
          },
          sound: 'compare',
          soundVal: arr[j]
        });

        if (isSmaller) {
          i++;
          swaps++;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          const swapHighlights = { ...pHighlights };
          swapHighlights[i] = 'swap';
          swapHighlights[j] = 'swap';

          steps.push({
            array: [...arr],
            highlighted: swapHighlights,
            pointers: { i, j, pivot: high },
            swapPair: i !== j ? [i, j] : null,
            activeLine: 3,
            stepTitle: `Swap A[${i}] ⟷ A[${j}]`,
            explanation: `Swapped ${arr[j]} and ${arr[i]} into the smaller partition boundary.`,
            historyRow: null,
            metrics: {
              comparisons,
              swaps,
              status: `Swapped ${arr[i]} ↔ ${arr[j]}`,
              resultValue: `[${arr.join(', ')}]`,
              complexityCase: `Total partition swaps: ${swaps}`
            },
            sound: 'swap'
          });
        }
      }

      // Put pivot in its final position
      const pivotFinalIdx = i + 1;
      const needFinalSwap = pivotFinalIdx !== high;

      if (needFinalSwap) {
        swaps++;
        const swapHighlights = { ...pHighlights };
        swapHighlights[pivotFinalIdx] = 'swap';
        swapHighlights[high] = 'swap';

        steps.push({
          array: [...arr],
          highlighted: swapHighlights,
          pointers: { i: pivotFinalIdx, pivot: high },
          swapPair: [pivotFinalIdx, high],
          activeLine: 3,
          stepTitle: `Swap Pivot into Final Position: A[${pivotFinalIdx}] ⟷ A[${high}]`,
          explanation: `Swapping pivot ${arr[high]} with A[${pivotFinalIdx}] (${arr[pivotFinalIdx]}).`,
          historyRow: null,
          metrics: {
            comparisons,
            swaps,
            status: `Locking pivot at index ${pivotFinalIdx}`,
            resultValue: `[${arr.join(', ')}]`,
            complexityCase: `Pivot final placement`
          },
          sound: 'swap'
        });

        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
      }

      const placedHighlights = {};
      for (let k = low; k < pivotFinalIdx; k++) placedHighlights[k] = 'smaller-partition';
      placedHighlights[pivotFinalIdx] = 'found';
      for (let k = pivotFinalIdx + 1; k <= high; k++) placedHighlights[k] = 'larger-partition';

      const smallerPart = arr.slice(low, pivotFinalIdx).join(' ');
      const largerPart = arr.slice(pivotFinalIdx + 1, high + 1).join(' ');

      steps.push({
        array: [...arr],
        highlighted: placedHighlights,
        pointers: { pivot: pivotFinalIdx },
        swapPair: null,
        activeLine: 3,
        stepTitle: `Partition Completed: Pivot ${arr[pivotFinalIdx]} locked at index ${pivotFinalIdx}`,
        explanation: `Pivot ${arr[pivotFinalIdx]} placed at correct final index. Smaller partition: [${smallerPart}], Larger partition: [${largerPart}].`,
        historyRow: { 
          step: 'Partition', 
          detail: `smaller: ${smallerPart || 'none'} | pivot: ${arr[pivotFinalIdx]} | larger: ${largerPart || 'none'}` 
        },
        metrics: {
          comparisons,
          swaps,
          status: `Pivot ${arr[pivotFinalIdx]} locked in place`,
          resultValue: `[${arr.join(', ')}]`,
          complexityCase: `Partition balanced: (${pivotFinalIdx - low} vs ${high - pivotFinalIdx})`
        },
        sound: 'found'
      });

      return pivotFinalIdx;
    }

    quickSortHelper(0, arr.length - 1);

    const finalHighlights = {};
    for (let k = 0; k < arr.length; k++) finalHighlights[k] = 'sorted';
    steps.push({
      array: [...arr],
      highlighted: finalHighlights,
      pointers: {},
      swapPair: null,
      activeLine: 5,
      stepTitle: 'Quick Sort: Finished',
      explanation: `All partitions sorted. Final sorted array: [${arr.join(', ')}]. Total comparisons: ${comparisons}, swaps: ${swaps}.`,
      historyRow: { step: 'Final', detail: arr.join(' ') },
      metrics: {
        comparisons,
        swaps,
        status: 'Sorted Successfully',
        resultValue: `[${arr.join(', ')}]`,
        complexityCase: `Average O(n log n) | Space O(log n)`
      },
      sound: 'found'
    });

    return steps;
  }
};

window.SortingModule = SortingModule;

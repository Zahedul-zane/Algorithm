// Greedy Algorithms Visualizer with Real-time Input/Output Metrics
const GreedyModule = {
  // Coin Change
  generateCoinChangeSteps(amount, coinSystem) {
    const steps = [];
    const coins = [...coinSystem].sort((a, b) => b - a);
    let rem = amount;
    const taken = [];

    steps.push({
      amount,
      remaining: rem,
      coins: [...coins],
      currentCoin: null,
      takenCoins: [],
      stepTitle: `Coin Change: Start`,
      explanation: `Target amount: ${amount} cents. Coins available: [${coins.join(', ')}]. Rule: Take largest coin ≤ remaining amount.`,
      historyRow: { step: 'Start', detail: `${amount}` },
      metrics: {
        comparisons: 0,
        swaps: 0,
        status: 'Starting...',
        resultValue: '0 coins chosen',
        complexityCase: 'Greedy Heuristic (Largest First)'
      },
      sound: null
    });

    let stepNum = 1;
    for (const c of coins) {
      if (rem <= 0) break;

      while (rem >= c) {
        rem -= c;
        taken.push(c);

        steps.push({
          amount,
          remaining: rem,
          coins: [...coins],
          currentCoin: c,
          takenCoins: [...taken],
          stepTitle: `Take ${c}¢ Coin`,
          explanation: `Remaining ${rem + c} ≥ ${c} → Take coin ${c}¢. New remaining = ${rem}¢.`,
          historyRow: { step: `Take ${c}`, detail: `${rem + c} − ${c} = ${rem}` },
          metrics: {
            comparisons: stepNum,
            swaps: taken.length,
            status: `Picked ${c}¢ (Remaining: ${rem}¢)`,
            resultValue: `${taken.length} coins: ${taken.join(' + ')}`,
            complexityCase: `Remaining amount: ${rem}¢`
          },
          sound: 'swap'
        });
        stepNum++;
      }
    }

    const isTrap = amount === 40 && coins.includes(30) && coins.includes(20);
    const caseNote = isTrap 
      ? '⚠️ EXAM TRAP TRIGGERED: Greedy gave 3 coins (30+5+5), but Optimal DP is 2 coins (20+20)!' 
      : 'Greedy Coin Change Complete';

    steps.push({
      amount,
      remaining: rem,
      coins: [...coins],
      currentCoin: null,
      takenCoins: [...taken],
      stepTitle: rem === 0 ? 'Coin Change Complete!' : 'Cannot Make Exact Amount',
      explanation: rem === 0 
        ? `Finished! Used ${taken.length} coins: [${taken.join(' + ')}]. Total = ${amount}¢.`
        : `Greedy reached remaining ${rem}¢ without exact change.`,
      historyRow: { step: 'Result', detail: taken.join('+') + (rem > 0 ? ` (rem: ${rem})` : '') },
      metrics: {
        comparisons: stepNum,
        swaps: taken.length,
        status: rem === 0 ? 'Optimal/Completed' : 'Terminated',
        resultValue: `${taken.length} coins: [${taken.join(' + ')}] = ${amount - rem}¢`,
        complexityCase: caseNote
      },
      sound: rem === 0 ? 'found' : 'discard'
    });

    return steps;
  },

  // Fractional Knapsack
  generateKnapsackSteps(items, capacity) {
    const steps = [];
    const enriched = items.map(item => ({
      ...item,
      ratio: Math.round((item.value / item.weight) * 100) / 100
    }));

    // Step 1: Calculate ratios
    steps.push({
      items: [...enriched],
      capacity,
      remainingCap: capacity,
      totalBenefit: 0,
      activeItem: null,
      fractions: {},
      stepTitle: 'Step 1: Compute Benefit / Weight Ratios',
      explanation: `Calculate benefit-to-weight ratio for each item. Higher ratio = better value per unit weight.`,
      metrics: {
        comparisons: items.length,
        swaps: 0,
        status: 'Ratios Computed',
        resultValue: 'Benefit: $0',
        complexityCase: 'O(n) ratio calculation'
      },
      sound: 'compare'
    });

    // Step 2: Sort descending
    const sorted = [...enriched].sort((a, b) => b.ratio - a.ratio);
    steps.push({
      items: [...sorted],
      capacity,
      remainingCap: capacity,
      totalBenefit: 0,
      activeItem: null,
      fractions: {},
      stepTitle: 'Step 2: Sort by Decreasing Ratio',
      explanation: `Items sorted: ${sorted.map(i => `${i.name} (${i.ratio})`).join(' > ')}. Highest ratio will be chosen first.`,
      metrics: {
        comparisons: items.length,
        swaps: items.length,
        status: 'Sorted by Ratio',
        resultValue: 'Benefit: $0',
        complexityCase: 'O(n log n) ratio sort'
      },
      sound: 'swap'
    });

    let currentW = capacity;
    let totalBenefit = 0;
    const fractions = {};
    let actions = 0;

    sorted.forEach((item) => {
      if (currentW <= 0) return;
      actions++;

      if (item.weight <= currentW) {
        currentW -= item.weight;
        totalBenefit += item.value;
        fractions[item.id] = { fraction: 1, takenW: item.weight, takenV: item.value };

        steps.push({
          items: [...sorted],
          capacity,
          remainingCap: currentW,
          totalBenefit: Math.round(totalBenefit * 100) / 100,
          activeItem: item.id,
          fractions: { ...fractions },
          stepTitle: `Take Whole: ${item.name}`,
          explanation: `Weight ${item.weight} ≤ remaining capacity ${currentW + item.weight}. Take 100% of ${item.name}. Benefit gained: +${item.value}. Capacity left: ${currentW} kg.`,
          metrics: {
            comparisons: actions,
            swaps: actions,
            status: `Took 100% of ${item.name}`,
            resultValue: `Benefit: $${Math.round(totalBenefit * 100) / 100} (${capacity - currentW}/${capacity} kg)`,
            complexityCase: `Remaining capacity: ${currentW} kg`
          },
          sound: 'found'
        });
      } else {
        const frac = currentW / item.weight;
        const fracV = frac * item.value;
        fractions[item.id] = { 
          fraction: Math.round(frac * 100) / 100, 
          takenW: currentW, 
          takenV: Math.round(fracV * 100) / 100 
        };
        totalBenefit += fracV;
        const prevCap = currentW;
        currentW = 0;

        steps.push({
          items: [...sorted],
          capacity,
          remainingCap: 0,
          totalBenefit: Math.round(totalBenefit * 100) / 100,
          activeItem: item.id,
          fractions: { ...fractions },
          stepTitle: `Take Fraction: ${item.name}`,
          explanation: `Item ${item.name} (wt: ${item.weight}) exceeds remaining capacity ${prevCap}. Take fraction ${prevCap}/${item.weight} (${Math.round(frac * 100)}%). Benefit gained: +${Math.round(fracV * 100) / 100}. Knapsack is now FULL.`,
          metrics: {
            comparisons: actions,
            swaps: actions,
            status: `Took ${Math.round(frac * 100)}% of ${item.name}`,
            resultValue: `Benefit: $${Math.round(totalBenefit * 100) / 100} (${capacity}/${capacity} kg FULL)`,
            complexityCase: `Fractional item slice taken`
          },
          sound: 'found'
        });
      }
    });

    steps.push({
      items: [...sorted],
      capacity,
      remainingCap: currentW,
      totalBenefit: Math.round(totalBenefit * 100) / 100,
      activeItem: null,
      fractions: { ...fractions },
      stepTitle: 'Knapsack Optimization Complete',
      explanation: `Maximum total benefit achieved: $${Math.round(totalBenefit * 100) / 100} with capacity ${capacity} kg.`,
      metrics: {
        comparisons: actions,
        swaps: actions,
        status: 'Optimal Solution Found',
        resultValue: `Max Total Benefit: $${Math.round(totalBenefit * 100) / 100}`,
        complexityCase: 'O(n log n) Total Complexity'
      },
      sound: 'found'
    });

    return steps;
  },

  // Activity Selection
  generateActivitySelectionSteps(activities) {
    const steps = [];
    const sorted = [...activities].sort((a, b) => a.f - b.f);

    steps.push({
      activities: [...sorted],
      selected: [],
      rejected: [],
      currentIdx: -1,
      lastFinish: 0,
      stepTitle: 'Activity Selection: Sort by Earliest Finish Time',
      explanation: `Sorted ${sorted.length} activities by finish time f: ${sorted.map(a => `(${a.s}, ${a.f})`).join(', ')}. Greedy Rule: Pick earliest finish that doesn't conflict!`,
      historyRow: { step: 'Start', detail: `Sort by finish: ${sorted.map(a => `(${a.s},${a.f})`).join(', ')}` },
      metrics: {
        comparisons: sorted.length,
        swaps: 0,
        status: 'Sorted by Finish Time',
        resultValue: '0 activities selected',
        complexityCase: 'O(n log n) sort'
      },
      sound: null
    });

    const selected = [];
    const rejected = [];

    selected.push(sorted[0].id);
    let lastFinish = sorted[0].f;

    steps.push({
      activities: [...sorted],
      selected: [...selected],
      rejected: [...rejected],
      currentIdx: 0,
      lastFinish,
      stepTitle: `Pick 1: Activity (${sorted[0].s}, ${sorted[0].f})`,
      explanation: `Activity (${sorted[0].s}, ${sorted[0].f}) finishes earliest. Always picked first! Free timeline up to time ${lastFinish}.`,
      historyRow: { step: 'Pick 1', detail: `(${sorted[0].s},${sorted[0].f}) — earliest finish` },
      metrics: {
        comparisons: 1,
        swaps: 1,
        status: `Selected (${sorted[0].s}, ${sorted[0].f})`,
        resultValue: `1 activity: [(${sorted[0].s}, ${sorted[0].f})]`,
        complexityCase: 'Earliest Finish Time Rule'
      },
      sound: 'found'
    });

    for (let i = 1; i < sorted.length; i++) {
      const act = sorted[i];
      const isCompatible = act.s >= lastFinish;

      if (isCompatible) {
        selected.push(act.id);
        const prevFinish = lastFinish;
        lastFinish = act.f;

        steps.push({
          activities: [...sorted],
          selected: [...selected],
          rejected: [...rejected],
          currentIdx: i,
          lastFinish,
          stepTitle: `Pick: Activity (${act.s}, ${act.f})`,
          explanation: `Start time ${act.s} ≥ last finish time ${prevFinish} → COMPATIBLE! Selected. Timeline extended to ${lastFinish}.`,
          historyRow: { step: `Check (${act.s},${act.f})`, detail: `${act.s} ≥ ${prevFinish} → PICK` },
          metrics: {
            comparisons: i + 1,
            swaps: selected.length,
            status: `Selected (${act.s}, ${act.f})`,
            resultValue: `${selected.length} activities selected`,
            complexityCase: `Compatible (${act.s} ≥ ${prevFinish})`
          },
          sound: 'found'
        });
      } else {
        rejected.push(act.id);

        steps.push({
          activities: [...sorted],
          selected: [...selected],
          rejected: [...rejected],
          currentIdx: i,
          lastFinish,
          stepTitle: `Conflict: Activity (${act.s}, ${act.f})`,
          explanation: `Start time ${act.s} < last finish time ${lastFinish} → CONFLICT/OVERLAP! Skipped.`,
          historyRow: { step: `Check (${act.s},${act.f})`, detail: `${act.s} < ${lastFinish} → conflict → SKIP` },
          metrics: {
            comparisons: i + 1,
            swaps: selected.length,
            status: `Conflict: Skipped (${act.s}, ${act.f})`,
            resultValue: `${selected.length} activities selected`,
            complexityCase: `Overlap with previous finish ${lastFinish}`
          },
          sound: 'discard'
        });
      }
    }

    const pickedActs = sorted.filter(a => selected.includes(a.id));
    steps.push({
      activities: [...sorted],
      selected: [...selected],
      rejected: [...rejected],
      currentIdx: -1,
      lastFinish,
      stepTitle: 'Activity Selection: Finished',
      explanation: `Selected ${selected.length} non-overlapping activities: ${pickedActs.map(a => `(${a.s}, ${a.f})`).join(', ')}.`,
      historyRow: { step: 'Final', detail: pickedActs.map(a => `(${a.s},${a.f})`).join(', ') },
      metrics: {
        comparisons: sorted.length,
        swaps: selected.length,
        status: 'Optimal Selection Found',
        resultValue: `${selected.length} Non-Overlapping: ${pickedActs.map(a => `(${a.s},${a.f})`).join(' → ')}`,
        complexityCase: 'Guaranteed Optimal by Earliest Finish'
      },
      sound: 'found'
    });

    return steps;
  },

  // Job Sequencing with Deadlines
  generateJobSequencingSteps(jobs) {
    const steps = [];
    const sorted = [...jobs].sort((a, b) => b.profit - a.profit);
    const maxDeadline = Math.max(...sorted.map(j => j.deadline));
    const slots = new Array(maxDeadline).fill(null);
    const scheduled = [];
    const dropped = [];

    steps.push({
      jobs: [...sorted],
      slots: [...slots],
      scheduled: [],
      dropped: [],
      currentJobId: null,
      maxDeadline,
      stepTitle: 'Job Sequencing: Sort by Decreasing Profit',
      explanation: `Sorted ${sorted.length} jobs by profit: ${sorted.map(j => `${j.name}(P:${j.profit}, D:${j.deadline})`).join(', ')}. Greedy Rule: Try latest free slot ≤ deadline!`,
      metrics: {
        comparisons: sorted.length,
        swaps: 0,
        status: 'Sorted by Profit',
        resultValue: 'Profit: $0',
        complexityCase: 'Highest Profit First'
      },
      sound: null
    });

    sorted.forEach((job) => {
      let allocatedSlot = -1;
      const searchStart = Math.min(maxDeadline, job.deadline) - 1;

      for (let s = searchStart; s >= 0; s--) {
        if (slots[s] === null) {
          allocatedSlot = s;
          break;
        }
      }

      if (allocatedSlot !== -1) {
        slots[allocatedSlot] = job;
        scheduled.push({ job, slot: allocatedSlot + 1 });
        const curProfit = scheduled.reduce((acc, s) => acc + s.job.profit, 0);

        steps.push({
          jobs: [...sorted],
          slots: [...slots],
          scheduled: [...scheduled],
          dropped: [...dropped],
          currentJobId: job.id,
          maxDeadline,
          stepTitle: `Scheduled ${job.name} in Slot ${allocatedSlot + 1}`,
          explanation: `Job ${job.name} (Profit: ${job.profit}, Deadline: ${job.deadline}) assigned to latest free slot [${allocatedSlot}..${allocatedSlot + 1}].`,
          metrics: {
            comparisons: scheduled.length + dropped.length,
            swaps: scheduled.length,
            status: `Assigned ${job.name} to Slot ${allocatedSlot + 1}`,
            resultValue: `Current Profit: +$${curProfit}`,
            complexityCase: `Latest slot ≤ deadline ${job.deadline}`
          },
          sound: 'found'
        });
      } else {
        dropped.push(job);
        const curProfit = scheduled.reduce((acc, s) => acc + s.job.profit, 0);

        steps.push({
          jobs: [...sorted],
          slots: [...slots],
          scheduled: [...scheduled],
          dropped: [...dropped],
          currentJobId: job.id,
          maxDeadline,
          stepTitle: `Dropped ${job.name}: No Slot Available`,
          explanation: `No free slot exists before deadline ${job.deadline}. Job ${job.name} is skipped.`,
          metrics: {
            comparisons: scheduled.length + dropped.length,
            swaps: scheduled.length,
            status: `Dropped ${job.name} (Deadline Expired)`,
            resultValue: `Current Profit: +$${curProfit}`,
            complexityCase: `Slots 1..${job.deadline} all occupied`
          },
          sound: 'discard'
        });
      }
    });

    const totalProfit = scheduled.reduce((sum, item) => sum + item.job.profit, 0);
    const scheduledDetails = scheduled.map(s => `${s.job.name} (Slot ${s.slot})`).join(', ');

    steps.push({
      jobs: [...sorted],
      slots: [...slots],
      scheduled: [...scheduled],
      dropped: [...dropped],
      currentJobId: null,
      maxDeadline,
      stepTitle: 'Job Sequencing: Complete',
      explanation: `Total jobs scheduled: ${scheduled.length} with Total Profit = ${totalProfit}.`,
      metrics: {
        comparisons: jobs.length,
        swaps: scheduled.length,
        status: 'Optimization Complete',
        resultValue: `Total Profit: +$${totalProfit} [${scheduledDetails}]`,
        complexityCase: `Greedy Job Scheduling Complete`
      },
      sound: 'found'
    });

    return steps;
  }
};

window.GreedyModule = GreedyModule;

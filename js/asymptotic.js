// Asymptotic Analysis Visualizer: Growth Curves, Bound Concepts, and Loop Pattern Simulators
const AsymptoticModule = {
  activePattern: 'single',
  chartCanvas: null,
  chartCtx: null,

  init() {
    this.chartCanvas = document.getElementById('asymptotic-canvas');
    if (this.chartCanvas) {
      this.chartCtx = this.chartCanvas.getContext('2d');
      this.drawGrowthChart(16);
    }
  },

  drawGrowthChart(selectedN = 16) {
    if (!this.chartCanvas || !this.chartCtx) {
      this.chartCanvas = document.getElementById('asymptotic-canvas');
      if (this.chartCanvas) this.chartCtx = this.chartCanvas.getContext('2d');
      else return;
    }

    const canvas = this.chartCanvas;
    const ctx = this.chartCtx;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.parentElement.clientWidth || 700;
    const height = 360;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.save();
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(0, 0, width, height);

    // Padding
    const padL = 60;
    const padR = 30;
    const padT = 30;
    const padB = 40;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padT + (plotH / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + plotW, y);
      ctx.stroke();
    }
    for (let i = 0; i <= 6; i++) {
      const x = padL + (plotW / 6) * i;
      ctx.beginPath();
      ctx.moveTo(x, padT);
      ctx.lineTo(x, padT + plotH);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText('Operations / Time', 10, 20);
    ctx.fillText('Input Size (n) →', padL + plotW - 90, padT + plotH + 30);

    const maxN = 32;
    const maxY = 256; // Plot scale capped at 256 for readability

    const funcs = [
      { name: 'O(1)', color: '#10b981', fn: (n) => 1, label: 'Constant' },
      { name: 'O(log n)', color: '#38bdf8', fn: (n) => Math.log2(n), label: 'Logarithmic' },
      { name: 'O(n)', color: '#818cf8', fn: (n) => n, label: 'Linear' },
      { name: 'O(n log n)', color: '#fbbf24', fn: (n) => n * Math.log2(n), label: 'Linearithmic' },
      { name: 'O(n²)', color: '#f97316', fn: (n) => n * n, label: 'Quadratic' },
      { name: 'O(2ⁿ)', color: '#f43f5e', fn: (n) => Math.pow(2, n), label: 'Exponential' }
    ];

    funcs.forEach(f => {
      ctx.strokeStyle = f.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let started = false;

      for (let n = 1; n <= maxN; n += 0.5) {
        const val = f.fn(n);
        const clampedVal = Math.min(val, maxY);
        const x = padL + (n / maxN) * plotW;
        const y = padT + plotH - (clampedVal / maxY) * plotH;

        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }

        if (val > maxY) break;
      }
      ctx.stroke();
    });

    // Draw vertical dotted line at selectedN
    if (selectedN >= 1 && selectedN <= maxN) {
      const lineX = padL + (selectedN / maxN) * plotW;
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(lineX, padT);
      ctx.lineTo(lineX, padT + plotH);
      ctx.stroke();
      ctx.restore();

      // Points and tooltips at lineX
      funcs.forEach(f => {
        const val = f.fn(selectedN);
        if (val <= maxY) {
          const y = padT + plotH - (val / maxY) * plotH;
          ctx.fillStyle = f.color;
          ctx.beginPath();
          ctx.arc(lineX, y, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });
    }

    ctx.restore();

    this.updateComplexityTable(selectedN);
  },

  updateComplexityTable(n) {
    const tableBody = document.getElementById('asymptotic-calc-body');
    if (!tableBody) return;

    const data = [
      { name: 'O(1)', speed: 'Very Fast', val: 1, formula: 'c', tag: 'Fastest' },
      { name: 'O(log n)', speed: 'Very Fast', val: Math.round(Math.log2(n) * 10) / 10, formula: 'log₂(n)', tag: 'Halving / Binary Search' },
      { name: 'O(n)', speed: 'Fast', val: n, formula: 'n', tag: 'Linear Search / 1 Loop' },
      { name: 'O(n log n)', speed: 'Good', val: Math.round(n * Math.log2(n)), formula: 'n · log₂(n)', tag: 'Merge / Quick Sort' },
      { name: 'O(n²)', speed: 'Slow', val: n * n, formula: 'n²', tag: 'Bubble / Selection / 2 Loops' },
      { name: 'O(n³)', speed: 'Very Slow', val: n * n * n, formula: 'n³', tag: '3 Nested Loops' },
      { name: 'O(2ⁿ)', speed: 'Explosive', val: n <= 30 ? Math.pow(2, n).toLocaleString() : '> 10¹²', formula: '2ⁿ', tag: 'Exponential / Subsets' }
    ];

    tableBody.innerHTML = data.map(item => `
      <tr>
        <td><span class="badge-complex ${item.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}">${item.name}</span></td>
        <td><code>${item.formula}</code></td>
        <td class="font-bold highlight-val">${item.val}</td>
        <td><span class="speed-tag speed-${item.speed.toLowerCase().replace(' ', '-')}">${item.speed}</span></td>
        <td class="text-dim text-sm">${item.tag}</td>
      </tr>
    `).join('');
  },

  // Loop Pattern Simulator
  runLoopSimulation(pattern, n, onTick, onComplete) {
    n = parseInt(n) || 5;
    n = Math.min(n, 12); // Keep responsive
    let ops = 0;
    const logs = [];

    if (pattern === 'single') {
      // One loop: for i = 1 to n -> O(n)
      for (let i = 1; i <= n; i++) {
        ops++;
        logs.push({ i, ops, line: `Iteration i = ${i} → Total Ops: ${ops}` });
      }
    } else if (pattern === 'double') {
      // Two nested loops: n * n -> O(n²)
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
          ops++;
          logs.push({ i, j, ops, line: `i = ${i}, j = ${j} → Total Ops: ${ops}` });
        }
      }
    } else if (pattern === 'triple') {
      // Three nested loops: n * n * n -> O(n³)
      const smallN = Math.min(n, 5);
      for (let i = 1; i <= smallN; i++) {
        for (let j = 1; j <= smallN; j++) {
          for (let k = 1; k <= smallN; k++) {
            ops++;
            logs.push({ i, j, k, ops, line: `i = ${i}, j = ${j}, k = ${k} → Total Ops: ${ops}` });
          }
        }
      }
    } else if (pattern === 'halving') {
      // Repeated halving: n -> n/2 -> n/4 -> ... -> O(log n)
      let current = n;
      let step = 1;
      while (current >= 1) {
        ops++;
        logs.push({ step, current, ops, line: `Step ${step}: n = ${current} → Halve to ⌊${current}/2⌋ = ${Math.floor(current / 2)}` });
        current = Math.floor(current / 2);
        step++;
      }
    } else if (pattern === 'div-conquer') {
      // Divide + linear work -> O(n log n)
      let levels = Math.ceil(Math.log2(n));
      for (let lvl = 1; lvl <= levels; lvl++) {
        for (let i = 1; i <= n; i++) {
          ops++;
          logs.push({ lvl, i, ops, line: `Level ${lvl}/${levels}, Work unit ${i}/${n} → Total Ops: ${ops}` });
        }
      }
    }

    return { totalOps: ops, logs, pattern, n };
  }
};

window.AsymptoticModule = AsymptoticModule;

// Visualizer Animation & Step Controller Engine
class VisualizerEngine {
  constructor(options = {}) {
    this.steps = [];
    this.currentStep = 0;
    this.isPlaying = false;
    this.speed = 1; // 1x = ~800ms per step
    this.baseDelay = 700;
    this.timer = null;
    this.onStepChange = options.onStepChange || (() => {});
    this.onPlayStateChange = options.onPlayStateChange || (() => {});
  }

  loadSteps(steps) {
    this.pause();
    this.steps = steps || [];
    this.currentStep = 0;
    this.renderCurrentStep();
    this.updateControls();
  }

  get totalSteps() {
    return this.steps.length;
  }

  getCurrentState() {
    if (!this.steps || this.steps.length === 0) return null;
    return this.steps[this.currentStep];
  }

  play() {
    if (this.isPlaying) return;
    if (this.currentStep >= this.steps.length - 1) {
      this.currentStep = 0;
    }
    this.isPlaying = true;
    this.onPlayStateChange(true);
    this.scheduleNext();
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.onPlayStateChange(false);
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  scheduleNext() {
    if (!this.isPlaying) return;
    const delay = Math.max(80, this.baseDelay / this.speed);
    this.timer = setTimeout(() => {
      if (!this.isPlaying) return;
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
        this.renderCurrentStep();
        this.scheduleNext();
      } else {
        this.pause();
      }
    }, delay);
  }

  stepForward() {
    this.pause();
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.renderCurrentStep();
    }
  }

  stepBackward() {
    this.pause();
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderCurrentStep();
    }
  }

  goToStep(index) {
    this.pause();
    const clamped = Math.max(0, Math.min(index, this.steps.length - 1));
    this.currentStep = clamped;
    this.renderCurrentStep();
  }

  firstStep() {
    this.goToStep(0);
  }

  lastStep() {
    this.goToStep(this.steps.length - 1);
  }

  setSpeed(speedVal) {
    this.speed = parseFloat(speedVal) || 1;
  }

  renderCurrentStep() {
    const state = this.getCurrentState();
    if (state && state.sound && window.soundEngine) {
      if (state.sound === 'compare') window.soundEngine.compare(state.soundVal || 10);
      else if (state.sound === 'swap') window.soundEngine.swap();
      else if (state.sound === 'found') window.soundEngine.found();
      else if (state.sound === 'discard') window.soundEngine.discard();
    }
    this.onStepChange(state, this.currentStep, this.steps.length);
    this.updateControls();
  }

  updateControls() {
    const slider = document.getElementById('step-scrubber');
    const label = document.getElementById('step-indicator');
    if (slider) {
      slider.max = Math.max(0, this.steps.length - 1);
      slider.value = this.currentStep;
    }
    if (label) {
      label.textContent = this.steps.length > 0 
        ? `Step ${this.currentStep + 1} of ${this.steps.length}` 
        : 'Step 0 / 0';
    }
  }
}

window.VisualizerEngine = VisualizerEngine;

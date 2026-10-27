// Simulation Engine: Demonstrating the 8-Step General Exam Simulation Pattern with Input/Output Metrics
const SimulationModule = {
  stages: [
    { num: 1, name: 'Initialize', desc: 'Set initial system state and clock time = 0' },
    { num: 2, name: 'Find event', desc: 'Choose the next earliest event from the event calendar / queue' },
    { num: 3, name: 'Advance time', desc: 'Advance simulation clock to the chosen event time' },
    { num: 4, name: 'Process', desc: 'Execute event rules and business logic' },
    { num: 5, name: 'Update', desc: 'Update system entity states, queues, and resources' },
    { num: 6, name: 'Record', desc: 'Capture and log metrics, wait times, and counters' },
    { num: 7, name: 'Repeat', desc: 'Loop back until stopping condition (time limit or queue empty) is met' },
    { num: 8, name: 'Output', desc: 'Calculate and report final statistics and performance summary' }
  ],

  generateSimulationSteps(customEvents = null) {
    const steps = [];
    let clock = 0;
    const queue = [];
    const completed = [];
    let serverBusy = false;
    let currentCustomer = null;

    // Use custom events if provided, else default exam sequence
    const futureEvents = customEvents && customEvents.length > 0 
      ? customEvents.map((e, idx) => ({ ...e, id: `E${idx + 1}` }))
      : [
          { id: 'E1', type: 'Arrival', time: 1, customer: 'C1', serviceDuration: 4 },
          { id: 'E2', type: 'Arrival', time: 3, customer: 'C2', serviceDuration: 3 },
          { id: 'E3', type: 'Arrival', time: 6, customer: 'C3', serviceDuration: 2 }
        ];

    let eventsProcessed = 0;

    // Stage 1: Initialize
    steps.push({
      stageNum: 1,
      clock: 0,
      queue: [],
      serverBusy: false,
      currentCustomer: null,
      futureEvents: [...futureEvents],
      completed: [],
      stepTitle: '1. Initialize: System Boot',
      explanation: 'Set initial state: Clock time = 0, Service Queue = empty, Server = IDLE. Loaded scheduled arrival events.',
      metrics: {
        comparisons: 0,
        swaps: 0,
        status: 'System Boot (t = 0)',
        resultValue: `Loaded ${futureEvents.length} arrival events`,
        complexityCase: 'Discrete Event Simulation Lifecycle'
      },
      sound: null
    });

    let eventCalendar = [...futureEvents];
    let iteration = 0;
    const maxIterations = 14;

    while (eventCalendar.length > 0 && iteration < maxIterations) {
      iteration++;

      // Stage 2: Find next event
      eventCalendar.sort((a, b) => a.time - b.time);
      const nextEvent = eventCalendar[0];
      eventsProcessed++;

      steps.push({
        stageNum: 2,
        clock,
        queue: [...queue],
        serverBusy,
        currentCustomer,
        futureEvents: [...eventCalendar],
        activeEvent: nextEvent,
        completed: [...completed],
        stepTitle: `2. Find Next Event: ${nextEvent.type} at t=${nextEvent.time}`,
        explanation: `Inspecting event calendar. Next earliest event is [${nextEvent.type} of ${nextEvent.customer}] scheduled at time t = ${nextEvent.time}.`,
        metrics: {
          comparisons: eventsProcessed,
          swaps: completed.length,
          status: `Next Event: ${nextEvent.type} (${nextEvent.customer})`,
          resultValue: `Clock: t=${clock} | Queue: ${queue.length}`,
          complexityCase: `Stage 2: Event Calendar Search`
        },
        sound: 'compare'
      });

      // Stage 3: Advance time
      clock = nextEvent.time;
      eventCalendar.shift();

      steps.push({
        stageNum: 3,
        clock,
        queue: [...queue],
        serverBusy,
        currentCustomer,
        futureEvents: [...eventCalendar],
        activeEvent: nextEvent,
        completed: [...completed],
        stepTitle: `3. Advance Time: Clock → t = ${clock}`,
        explanation: `Advancing simulation clock forward to event time t = ${clock}.`,
        metrics: {
          comparisons: eventsProcessed,
          swaps: completed.length,
          status: `Clock jumped to t = ${clock}`,
          resultValue: `Clock: t=${clock} | Active: ${nextEvent.customer}`,
          complexityCase: `Stage 3: Discrete Clock Jump`
        },
        sound: 'swap'
      });

      // Stage 4: Process
      let logMsg = '';
      if (nextEvent.type === 'Arrival') {
        if (!serverBusy) {
          serverBusy = true;
          currentCustomer = nextEvent.customer;
          const finishTime = clock + nextEvent.serviceDuration;
          eventCalendar.push({
            id: `Dep_${nextEvent.customer}`,
            type: 'Departure',
            time: finishTime,
            customer: nextEvent.customer,
            serviceDuration: nextEvent.serviceDuration,
            startTime: clock
          });
          logMsg = `Server is IDLE. Customer ${nextEvent.customer} immediately begins service. Scheduled departure at t=${finishTime}.`;
        } else {
          queue.push({ customer: nextEvent.customer, arrivalTime: clock, duration: nextEvent.serviceDuration });
          logMsg = `Server is BUSY. Customer ${nextEvent.customer} enters the waiting queue.`;
        }
      } else if (nextEvent.type === 'Departure') {
        completed.push({
          customer: nextEvent.customer,
          finishTime: clock,
          waitTime: nextEvent.startTime ? (nextEvent.startTime - (nextEvent.arrivalTime || nextEvent.startTime)) : 0
        });

        if (queue.length > 0) {
          const nextInLine = queue.shift();
          currentCustomer = nextInLine.customer;
          const finishTime = clock + nextInLine.duration;
          eventCalendar.push({
            id: `Dep_${nextInLine.customer}`,
            type: 'Departure',
            time: finishTime,
            customer: nextInLine.customer,
            duration: nextInLine.duration,
            startTime: clock,
            arrivalTime: nextInLine.arrivalTime
          });
          logMsg = `Customer ${nextEvent.customer} completes service and departs. Next customer ${nextInLine.customer} leaves queue to start service.`;
        } else {
          serverBusy = false;
          currentCustomer = null;
          logMsg = `Customer ${nextEvent.customer} completes service. Queue is empty; server returns to IDLE.`;
        }
      }

      steps.push({
        stageNum: 4,
        clock,
        queue: [...queue],
        serverBusy,
        currentCustomer,
        futureEvents: [...eventCalendar],
        activeEvent: nextEvent,
        completed: [...completed],
        stepTitle: `4. Process Event: ${nextEvent.type}`,
        explanation: logMsg,
        metrics: {
          comparisons: eventsProcessed,
          swaps: completed.length,
          status: `Processed ${nextEvent.type}`,
          resultValue: `Completed: ${completed.length} customers`,
          complexityCase: `Stage 4: State Transition Logic`
        },
        sound: 'compare'
      });

      // Stage 5: Update
      steps.push({
        stageNum: 5,
        clock,
        queue: [...queue],
        serverBusy,
        currentCustomer,
        futureEvents: [...eventCalendar],
        completed: [...completed],
        stepTitle: `5. Update System State`,
        explanation: `Updated system state: Server = ${serverBusy ? `BUSY (${currentCustomer})` : 'IDLE'}, Queue Length = ${queue.length}, Completed = ${completed.length}.`,
        metrics: {
          comparisons: eventsProcessed,
          swaps: completed.length,
          status: `State: Server ${serverBusy ? 'BUSY' : 'IDLE'}, Queue: ${queue.length}`,
          resultValue: `Completed: ${completed.length}`,
          complexityCase: `Stage 5: State Vector Update`
        },
        sound: 'swap'
      });

      // Stage 6: Record
      steps.push({
        stageNum: 6,
        clock,
        queue: [...queue],
        serverBusy,
        currentCustomer,
        futureEvents: [...eventCalendar],
        completed: [...completed],
        stepTitle: `6. Record Result`,
        explanation: `Metrics recorded: Timestamp t = ${clock}, Throughput = ${completed.length} processed, Active event logged to history.`,
        metrics: {
          comparisons: eventsProcessed,
          swaps: completed.length,
          status: `Metrics logged at t = ${clock}`,
          resultValue: `Completed: ${completed.length} customers`,
          complexityCase: `Stage 6: Output Accumulation`
        },
        sound: 'found'
      });

      // Stage 7: Repeat
      const hasMore = eventCalendar.length > 0;
      steps.push({
        stageNum: 7,
        clock,
        queue: [...queue],
        serverBusy,
        currentCustomer,
        futureEvents: [...eventCalendar],
        completed: [...completed],
        stepTitle: `7. Repeat Check`,
        explanation: hasMore 
          ? `Stopping condition false: ${eventCalendar.length} pending events remaining. Continuing loop...` 
          : `Stopping condition met: Event queue is empty. Ready for final output.`,
        metrics: {
          comparisons: eventsProcessed,
          swaps: completed.length,
          status: hasMore ? `Continuing (${eventCalendar.length} pending)` : 'Stopping condition reached',
          resultValue: `Events Remaining: ${eventCalendar.length}`,
          complexityCase: `Stage 7: Loop Condition Check`
        },
        sound: null
      });
    }

    // Stage 8: Output
    const avgWait = completed.length > 0 
      ? (completed.reduce((acc, c) => acc + (c.waitTime || 0), 0) / completed.length).toFixed(2) 
      : 0;

    steps.push({
      stageNum: 8,
      clock,
      queue: [],
      serverBusy: false,
      currentCustomer: null,
      futureEvents: [],
      completed: [...completed],
      stepTitle: `8. Output Final Result`,
      explanation: `Simulation completed at t = ${clock}. All ${completed.length} customers successfully processed. Avg wait time: ${avgWait}s.`,
      metrics: {
        comparisons: eventsProcessed,
        swaps: completed.length,
        status: 'Simulation Run Complete',
        resultValue: `Done at t=${clock} | ${completed.length} Served | Avg Wait: ${avgWait}s`,
        complexityCase: `Stage 8: Final Summary Output`
      },
      sound: 'found'
    });

    return steps;
  }
};

window.SimulationModule = SimulationModule;

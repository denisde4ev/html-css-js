// entirely by ai, I ant editing this long sh*t

// https://t3.chat/chat/f45bdbae-6e50-448f-a5e8-f99b1243d3fb


// started thinging about it ~30min ago
// started prompting 15min ago
// just started testing 2025-07-23T23:03:56+03:00


// debounce and friends: debounce, throttle and idk maybe more.
function debounceOnSteroids(fn, timeoutMs, options = {}) {
  const config = {
    // Original options
    runWhenNoTimeout: false,
    runWhenTimeoutEnds: true,
    resetTimeoutOnFollowupCall: true,
    followupCallCalledOnMultiplyableByFirstCall: false,
    afterEndClearance: false,

    // Extended options
    immediate: false,
    leading: false,
    trailing: true,
    maxWaitTime: null,
    maxCalls: Infinity,
    backoffStrategy: 'linear',
    backoffMultiplier: 1.5,
    backoffCustomFn: null,
    preserveContext: true,
    preserveArguments: 'last',
    cooldownPeriod: null,
    priority: 'fifo',
    groupBy: null,
    maxRetries: 0,
    retryDelay: 1000,
    onExecute: null,
    onCancel: null,
    onError: null,
    onQueue: null,
    enableMetrics: false,
    abortSignal: null,
    timeoutStrategy: 'debounce',
    flushOnWindowUnload: false,
    ...options
  };

  // State management
  let state = {
    activeTimer: null,
    clearanceTimer: null,
    cooldownTimer: null,
    firstCallTime: null,
    lastExecutionTime: null,
    callQueue: [],
    groupQueues: new Map(),
    isInClearancePeriod: false,
    isInCooldown: false,
    executionCount: 0,
    metrics: {
      totalCalls: 0,
      totalExecutions: 0,
      totalCancellations: 0,
      totalErrors: 0,
      averageDelay: 0,
      lastExecutionDuration: 0
    }
  };

  // Backoff calculation strategies
  const backoffStrategies = {
    linear: (attempt, base) => base * attempt * config.backoffMultiplier,
    exponential: (attempt, base) => base * Math.pow(config.backoffMultiplier, attempt),
    fibonacci: (() => {
      const fib = [1, 1];
      return (attempt, base) => {
        while (fib.length <= attempt) {
          fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
        }
        return base * fib[attempt] * config.backoffMultiplier;
      };
    })(),
    custom: config.backoffCustomFn || ((attempt, base) => base)
  };

  // Calculate next timeout with backoff
  function calculateTimeout(attempt = 0) {
    if (attempt === 0) return timeoutMs;
    return backoffStrategies[config.backoffStrategy](attempt, timeoutMs);
  }

  // Argument preservation strategies
  function preserveArguments(existingArgs, newArgs) {
    switch (config.preserveArguments) {
      case 'first': return existingArgs.length ? existingArgs : newArgs;
      case 'last': return newArgs;
      case 'all': return [...(existingArgs || []), newArgs];
      case 'merge': 
        if (Array.isArray(existingArgs) && Array.isArray(newArgs)) {
          return [...existingArgs, ...newArgs];
        }
        return newArgs;
      default: return newArgs;
    }
  }

  // Queue management
  function addToQueue(context, args, groupKey = null) {
    const call = {
      context,
      args,
      timestamp: Date.now(),
      retryCount: 0,
      groupKey
    };

    if (groupKey) {
      if (!state.groupQueues.has(groupKey)) {
        state.groupQueues.set(groupKey, []);
      }
      const groupQueue = state.groupQueues.get(groupKey);
      
      if (groupQueue.length >= config.maxCalls) {
        const removed = config.priority === 'fifo' ? groupQueue.shift() : groupQueue.pop();
        config.onCancel?.('queue_overflow');
      }
      
      if (config.priority === 'fifo' || config.priority === 'newest') {
        groupQueue.push(call);
      } else {
        groupQueue.unshift(call);
      }
    } else {
      if (state.callQueue.length >= config.maxCalls) {
        const removed = config.priority === 'fifo' ? state.callQueue.shift() : state.callQueue.pop();
        config.onCancel?.('queue_overflow');
      }

      if (config.priority === 'fifo' || config.priority === 'newest') {
        state.callQueue.push(call);
      } else {
        state.callQueue.unshift(call);
      }
    }

    config.onQueue?.( groupKey ? state.groupQueues.get(groupKey).length : state.callQueue.length);
  }

  // Get next call from queue
  function getNextCall(groupKey = null) {
    if (groupKey) {
      const groupQueue = state.groupQueues.get(groupKey);
      return groupQueue?.length ? (
        config.priority === 'oldest' || config.priority === 'fifo' ? 
        groupQueue.shift() : groupQueue.pop()
      ) : null;
    }
    
    return state.callQueue.length ? (
      config.priority === 'oldest' || config.priority === 'fifo' ? 
      state.callQueue.shift() : state.callQueue.pop()
    ) : null;
  }

  // Execute function with retry logic
  async function executeFunction(call) {
    if (config.abortSignal?.aborted) {
      config.onCancel?.('aborted');
      return;
    }

    const startTime = performance.now();
    
    try {
      let result;
      if (config.preserveContext) {
        result = await fn.apply(call.context, call.args);
      } else {
        result = await fn(...call.args);
      }
      
      const duration = performance.now() - startTime;
      state.metrics.lastExecutionDuration = duration;
      state.metrics.totalExecutions++;
      state.lastExecutionTime = Date.now();
      
      config.onExecute?.(result, call.retryCount);
      
      if (config.enableMetrics) {
        updateMetrics(duration);
      }
      
      return result;
    } catch (error) {
      state.metrics.totalErrors++;
      
      if (call.retryCount < config.maxRetries) {
        call.retryCount++;
        const retryDelay = typeof config.retryDelay === 'function' ? 
          config.retryDelay(call.retryCount) : config.retryDelay;
          
        setTimeout(() => executeFunction(call), retryDelay);
        return;
      }
      
      config.onError?.(error, call.retryCount);
      throw error;
    }
  }

  // Update metrics
  function updateMetrics(executionDuration) {
    const totalTime = state.metrics.averageDelay * state.metrics.totalExecutions + executionDuration;
    state.metrics.averageDelay = totalTime / (state.metrics.totalExecutions + 1);
  }

  // Clear all timers
  function clearAllTimers() {
    if (state.activeTimer) {
      clearTimeout(state.activeTimer);
      state.activeTimer = null;
    }
    if (state.clearanceTimer) {
      clearTimeout(state.clearanceTimer);
      state.clearanceTimer = null;
    }
    if (state.cooldownTimer) {
      clearTimeout(state.cooldownTimer);
      state.cooldownTimer = null;
    }
  }

  // Handle complex followup timing
  function calculateFollowupDelay() {
    if (!config.followupCallCalledOnMultiplyableByFirstCall || !state.firstCallTime) {
      return timeoutMs;
    }

    const timeSinceFirstCall = Date.now() - state.firstCallTime;
    const nextMultiple = Math.ceil(timeSinceFirstCall / timeoutMs) * timeoutMs;
    const nextExecutionTime = state.firstCallTime + nextMultiple;
    return Math.max(0, nextExecutionTime - Date.now());
  }

  // Start clearance period
  function startClearancePeriod() {
    if (!config.afterEndClearance) return;
    
    state.isInClearancePeriod = true;
    state.clearanceTimer = setTimeout(() => {
      state.isInClearancePeriod = false;
      state.firstCallTime = null;
    }, timeoutMs);
  }

  // Start cooldown period
  function startCooldown() {
    if (!config.cooldownPeriod) return;
    
    state.isInCooldown = true;
    state.cooldownTimer = setTimeout(() => {
      state.isInCooldown = false;
    }, config.cooldownPeriod);
  }

  // Schedule execution
  function scheduleExecution(call, delay = timeoutMs) {
    if (config.maxWaitTime) {
      const waitTime = Date.now() - call.timestamp;
      if (waitTime >= config.maxWaitTime) {
        delay = 0; // Force immediate execution
      }
    }

    state.activeTimer = setTimeout(() => {
      executeFunction(call).finally(() => {
        state.executionCount++;
        
        // Check for more calls in queue
        const nextCall = getNextCall(call.groupKey);
        if (nextCall) {
          const nextDelay = config.followupCallCalledOnMultiplyableByFirstCall ? 
            calculateFollowupDelay() : calculateTimeout(nextCall.retryCount);
          scheduleExecution(nextCall, nextDelay);
        } else {
          // No more calls, handle end state
          startClearancePeriod();
          startCooldown();
        }
      });
    }, delay);
  }

  // Main executor function
  function executor(...args) {
    if (config.abortSignal?.aborted) {
      config.onCancel?.('aborted');
      return;
    }

    if (state.isInCooldown) {
      config.onCancel?.('cooldown');
      return;
    }

    state.metrics.totalCalls++;
    const now = Date.now();
    const context = this;
    const groupKey = config.groupBy ? config.groupBy(args) : null;

    // Handle first call logic
    if (!state.firstCallTime && !state.isInClearancePeriod) {
      state.firstCallTime = now;
    }

    // Immediate execution
    if (config.immediate && state.executionCount === 0) {
      executeFunction({ context, args, timestamp: now, retryCount: 0, groupKey });
      return;
    }

    // Leading edge execution
    if (config.leading && !state.activeTimer) {
      executeFunction({ context, args, timestamp: now, retryCount: 0, groupKey });
      if (!config.trailing) return;
    }

    // No timeout case
    if (config.runWhenNoTimeout && !state.activeTimer) {
      executeFunction({ context, args, timestamp: now, retryCount: 0, groupKey });
      return;
    }

    // Add to queue
    addToQueue(context, args, groupKey);

    // Handle existing timer
    if (state.activeTimer) {
      if (config.resetTimeoutOnFollowupCall) {
        clearTimeout(state.activeTimer);
        state.activeTimer = null;
      } else {
        return; // Let existing timer continue
      }
    }

    // Schedule execution
    if (config.runWhenTimeoutEnds || config.trailing) {
      const call = getNextCall(groupKey);
      if (call) {
        const delay = config.followupCallCalledOnMultiplyableByFirstCall ? 
          calculateFollowupDelay() : calculateTimeout(call.retryCount);
        scheduleExecution(call, delay);
      }
    }
  }

  // Add control methods
  executor.cancel = function() {
    clearAllTimers();
    const cancelledCount = state.callQueue.length + 
      Array.from(state.groupQueues.values()).reduce((sum, queue) => sum + queue.length, 0);
    
    state.callQueue = [];
    state.groupQueues.clear();
    state.metrics.totalCancellations += cancelledCount;
    
    config.onCancel?.('manual');
    return cancelledCount;
  };

  executor.flush = function() {
    if (state.activeTimer) {
      clearTimeout(state.activeTimer);
      state.activeTimer = null;
    }
    
    // Execute all queued calls immediately
    const allCalls = [...state.callQueue];
    state.groupQueues.forEach(queue => allCalls.push(...queue));
    
    state.callQueue = [];
    state.groupQueues.clear();
    
    allCalls.forEach(call => executeFunction(call));
    return allCalls.length;
  };

  executor.pending = function() {
    return state.callQueue.length + 
      Array.from(state.groupQueues.values()).reduce((sum, queue) => sum + queue.length, 0);
  };

  executor.metrics = function() {
    return { ...state.metrics };
  };

  // Handle window unload
  if (config.flushOnWindowUnload && typeof window !== 'undefined') {
    window.addEventListener('beforeunload', executor.flush);
  }

  // Handle abort signal
  if (config.abortSignal) {
    config.abortSignal.addEventListener('abort', executor.cancel);
  }

  return executor;
}



// Usage examples:
const debouncedSearch = debounceOnSteroids(a => console.log(a), 300, {
  resetTimeoutOnFollowupCall: true,
  maxWaitTime: 1000,
  preserveArguments: 'last'
});

console.log('check me out');
searchInput.oninput = e => {
	debouncedSearch(e.target.value);
};


if (0) {

const throttledScroll = debounceOnSteroids(handleScroll, 16, {
  timeoutStrategy: 'throttle',
  leading: true,
  trailing: false
});

const complexRetry = debounceOnSteroids(apiCall, 1000, {
  maxRetries: 3,
  backoffStrategy: 'exponential',
  backoffMultiplier: 2,
  followupCallCalledOnMultiplyableByFirstCall: true,
  afterEndClearance: true,
  onExecute: (result, attempt) => console.log(`Success on attempt ${attempt + 1}`),
  onError: (error, attempt) => console.log(`Failed attempt ${attempt + 1}: ${error.message}`)
});

}

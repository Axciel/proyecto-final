// EventEmitter.js

class EventEmitter {
    constructor() {
      this.listeners = {};
    }
  
    on(event, listener) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(listener);
    }
  
    emit(event, data) {
      const eventListeners = this.listeners[event];
      if (eventListeners) {
        eventListeners.forEach(listener => {
          listener(data);
        });
      }
    }
  }
  
  const eventEmitter = new EventEmitter();
  export default eventEmitter;
  
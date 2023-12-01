// activityLogger.js

class ActivityLogger {
    constructor() {
      this.logs = [];
      this.observers = [];
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    removeObserver(observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    logActivity(activity) {
      this.logs.push(activity);
      this.notifyObservers(activity);
    }
  
    notifyObservers(activity) {
      this.observers.forEach(observer => observer.notify(activity));
    }
  
    getLogs() {
      return this.logs;
    }
  }
  
  const activityLogger = new ActivityLogger();
  
  export default activityLogger;
  
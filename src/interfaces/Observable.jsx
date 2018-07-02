class Observable {
  constructor(...events) {
    this.observerMap = events.reduce((observerMap, eventType) => observerMap.set(eventType, []),
                                      new Map());
  }

  unsubscriber(observers) {
    return () => {
      const position = observers.length - 1;
      observers.splice(position, 1);
    }
  }

  getObservers(eventType) {
    if (!this.observerMap.has(eventType)) {
      throw new Error(`Observable does not handle eventType ${eventType}`);
    }
    return this.observerMap.get(eventType);
  }

  subscribe(eventType, callback) {
    const observers = this.getObservers(eventType);
    observers.push(callback);
    return this.unsubscriber(observers);
  }

  publish(eventType, datum) {
    this.getObservers(eventType).forEach((callback) => callback(datum));
  }
}

export default Observable;

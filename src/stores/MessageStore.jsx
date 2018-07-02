import Observable from "../interfaces/Observable";

class MessageStore extends Observable {
  constructor(limit) {
    super("limit", "messages");

    this.messages = [];
    this.limit = limit;

    this.subscribeToLimit = this.subscribeToLimit.bind(this);
    this.subscribeToMessages = this.subscribeToMessages.bind(this);
    this.setLimit = this.setLimit.bind(this);
    this.getLimit = this.getLimit.bind(this);
    this.publishMessage = this.publishMessage.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }

  subscribeToLimit(callback) {
    return this.subscribe("limit", callback);
  }

  subscribeToMessages(callback) {
    return this.subscribe("messages", callback);
  }

  setLimit(limit) {
    this.limit = limit;
    this.publish("limit", this.limit);
  }

  getLimit() {
    return this.limit;
  }

  publishMessage(message) {
    this.messages.push(message);
    let messages = this.messages;
    if (this.messages.length > this.limit) {
      messages = messages.slice(this.messages.length - this.limit,
                                this.messages.length);
    }
    this.publish("messages", messages);
  }

  getMessages() {
    return this.messages;
  }
}

export default MessageStore;

import axios from "axios";

import Observable from "../interfaces/Observable";

class WorkerService extends Observable {
  constructor(baseUrl) {
    super("response", "error");

    if (baseUrl.endsWith("/")) {
      this.baseUrl = baseUrl.substring(0, baseUrl - 1);
    } else {
      this.baseUrl = baseUrl;
    }

    this.subscribeToresponse = this.subscribeToResponse.bind(this);
    this.subscribeToError = this.subscribeToError.bind(this);
    this.publishResponse = this.publishResponse.bind(this);
    this.publishError = this.publishError.bind(this);
    this.getBaseUrl = this.getBaseUrl.bind(this);
    this.send = this.send.bind(this);
    this.serve = this.serve.bind(this);
    this.stop = this.stop.bind(this);
    this.register = this.register.bind(this);
  }

  subscribeToResponse(callback) {
    return this.subscribe("response", callback);
  }

  subscribeToError(callback) {
    return this.subscribe("error", callback);
  }

  publishResponse(response) {
    this.publish("response", response);
  }

  publishError(error) {
    this.publish("error", error);
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  send(endpoint, token, secret) {
    const request = {token, secret};
    axios.post(endpoint, request)
      .then(this.publishResponse)
      .catch(this.publishError);
  }

  serve(token, secret) {
    const endpoint = `${this.baseUrl}/api/serve`;
    this.send(endpoint, token, secret);
  }

  stop(token, secret) {
    const endpoint = `${this.baseUrl}/api/stop`;
    this.send(endpoint, token, secret);
  }

  register(token, secret) {
    const endpoint = `${this.baseUrl}/api/register`;
    this.send(endpoint, token, secret);
  }
}

export default WorkerService;

import * as axios from "axios";

class WorkerService {
  constructor(baseUrl) {
    if (baseUrl.endsWith("/")) {
      this.baseUrl = baseUrl.substring(0, baseUrl - 1);
    } else {
      this.baseUrl = baseUrl;
    }
  }

  serve(token, secret) {
    const endpoint = `${this.baseUrl}/serve`;
    const request = {token, secret};
    return axios.post(endpoint, request);
  }

  stop(token, secret) {
    const endpoint = `${this.baseUrl}/stop`;
    const request = {token, secret};
    return axios.post(endpoint, request);
  }
}

export default WorkerService;

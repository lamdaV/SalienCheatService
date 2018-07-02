import localStorage from "local-storage";
import Observable from "../interfaces/Observable"

class CredentialStore extends Observable {
  constructor() {
    super("token", "secret");

    this.token = localStorage.get("token");
    this.secret = localStorage.get("secret");
    if (this.token === null) {
      this.token = "";
    }
    if (this.secret === null) {
      this.secret = "";
    }

    this.subscribeToToken = this.subscribeToToken.bind(this);
    this.subscribeToSecret = this.subscribeToSecret.bind(this);
    this.publishToken = this.publishToken.bind(this);
    this.publishSecret = this.publishSecret.bind(this);
    this.getToken = this.getToken.bind(this);
    this.getSecret = this.getSecret.bind(this);
  }

  subscribeToToken(callback) {
    return this.subscribe("token", callback);
  }

  subscribeToSecret(callback) {
    return this.subscribe("secret", callback);
  }

  publishToken(token) {
    this.token = token;
    this.publish("token", this.token);
  }

  publishSecret(secret) {
    this.secret = secret;
    this.publish("secret", this.secret);
  }

  save() {
    localStorage.set("token", this.token);
    localStorage.set("secret", this.secret);
  }

  getToken() {
    return this.token;
  }

  getSecret() {
    return this.secret;
  }
}

export default CredentialStore;

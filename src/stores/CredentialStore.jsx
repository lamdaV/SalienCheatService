import Observable from "../interfaces/Observable"

class CredentialStore extends Observable {
  constructor() {
    super("token", "secret");

    this.token = "";
    this.secret = "";

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
    this.publish("token", token);
  }

  publishSecret(secret) {
    this.secret = secret;
    this.publish("secret", secret);
  }

  getToken() {
    return this.getToken;
  }

  getSecret() {
    return this.getSecret;
  }
}

export default CredentialStore;

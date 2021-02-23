const { REACT_APP_API_ENDPOINT } = process.env;

class _WebSocket {
  #wss = new WebSocket(`ws://${REACT_APP_API_ENDPOINT}/api/network`);

  ping() {
    this.#wss.onopen = () => {
      return this.#wss.send(JSON.stringify({ message: "ping" }));
    };
  }

  message(m) {
    return this.#wss.send(JSON.stringify(m));
  }

  close() {
    return this.#wss.close();
  }
}

export default new _WebSocket();

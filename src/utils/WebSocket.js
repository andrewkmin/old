class _WebSocket {
  constructor() {
    this.wss = new WebSocket(
      `ws://${process.env.REACT_APP_API_ENDPOINT}/api/network`
    );
  }

  open() {
    const wss = this.wss;
    wss.onopen = () => {
      wss.send(JSON.stringify({ message: "ping" }));
    };
  }

  message(message) {
    const wss = this.wss;
    if (this.active === true) {
      wss.send(message);
    }
  }

  ping() {
    const wss = this.wss;
    wss.onopen = () => {
      wss.send(JSON.stringify({ message: "ping" }));
    };
  }

  close() {
    const wss = this.wss;
    wss.close();
  }
}

export default new _WebSocket();

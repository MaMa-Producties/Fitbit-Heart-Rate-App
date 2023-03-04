export class WebSocketWrapper {
  
  constructor(url) {
    this.url = url;
    this.webSocket = null;
  }

  connect() {
    console.log(this.url);
    
    this.webSocket = new WebSocket(this.url);
    this.webSocket.onopen = () => console.log("CONNECTED");
    this.webSocket.onclose = () => console.log("CLOSED");
    this.webSocket.onmessage = (evt) => console.log(`MESSAGE: ${evt.data}`);
    this.webSocket.onerror = (evt) => {
      console.log(evt);
      if (this.webSocket != null) console.log("Error closed");
    };
  }

  send(message) {
    console.log(JSON.stringify(message));
    this.webSocket.send(JSON.stringify(message));
  }
}


// Removed the bind calls in the addEventListener calls and replaced them with lambdas
// this way, we don't need to explicitly bind this to the event handler functions
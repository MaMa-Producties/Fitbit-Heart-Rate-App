import { peerSocket } from "messaging";
import { WebSocketWrapper } from "./WebSocketWrapper";
import { HealthData } from "./HealthData";

const wsUri = "wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self";
const websocket = new WebSocketWrapper(wsUri);

const apiUri = "https://fitbit.vr-health.nl/heart";
const healthData = new HealthData(apiUri, (data) => peerSocket.send(data));

// Uploads the data every minute, 60000 miliseconds
setInterval(() => healthData.publish(), 60000);

peerSocket.onopen = () => websocket.connect();

peerSocket.onmessage = (evt) => {
  const { data } = evt;
  websocket.send(data);
  healthData.addData(data.heartRate);
};


// Changed setTimeout function to the setInterval function
// Changed the peersocket.onmessage to be more readable, I simply added a const for the data
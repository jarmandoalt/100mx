import io from 'socket.io-client'

//let socket = io('https://server-who-is-this-pokmeon.onrender.com')
//let socket = io('//localhost:5050')
const socket = io("https://sturdy-palm-tree-gw5p576g9g7cwrq6-5050.app.github.dev/", {
  transports: ["websocket"], 
  upgrade: false
});

export default socket
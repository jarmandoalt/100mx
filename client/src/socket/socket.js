import io from 'socket.io-client'

//let socket = io('https://server-who-is-this-pokmeon.onrender.com')
//let socket = io('//localhost:5050')
const socket = io("https://fuzzy-fortnight-5p494x9qvwjcvwjg-5050.app.github.dev/", {
  transports: ["websocket"], 
  upgrade: false
});

export default socket
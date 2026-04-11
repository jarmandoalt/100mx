import io from 'socket.io-client'

//let socket = io('https://server-who-is-this-pokmeon.onrender.com')
//let socket = io('//localhost:5050')
//let socket = io('https://turbo-eureka-94qxqjx9qvq3749p-5173.app.github.dev/')
const socket = io("https://turbo-eureka-94qxqjx9qvq3749p-5050.app.github.dev/", {
  transports: ["websocket"], 
  upgrade: false
});

export default socket
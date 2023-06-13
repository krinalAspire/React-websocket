require('dotenv').config();
const express=require("express");
const app=express();
const http=require('http');
const {Server}= require("socket.io");
// const socketIO = require('socket.io');

app.use(express.json());

const cors=require("cors");
app.use(cors());

const server=http.createServer(app);

const io= new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket)=>{
   console.log(`User Connected ${socket.id}`);

   socket.on("send_message",(data)=>{
      console.log(data);
    // socket.broadcast.emit("receive_message", data);
    socket.emit("receive_message", data);
   })
})

const port=process.env.PORT;

server.listen(port, ()=>{
    console.log(`server running at ${port}`);
})
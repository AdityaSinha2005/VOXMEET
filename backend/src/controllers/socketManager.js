import mongoose from "mongoose";

const { connection } = mongoose;
import { Server } from "socket.io"

let connections={}
let messages={}
let timeOnline={}


export const connectToSocket=(server)=>
{
   const io= new Server(server,{
      cors:{
         origin:"*",
         methods:["GET","POST"],
         allowedHeaders:["*"],
         credentials:true
      }
   });

   io.on("connection",(socket)=> //connection ho gaya
   {
      socket.on("join-call",(path)=> // user add and jab user join-call func bheje then ye chalao
      //and here path is basically room
      {
         if(connections[path] === undefined) //if room does not exist then create
         {
            connections[path]=[]
         }
         connections[path].push(socket.id); // user ko room mah add karo
         timeOnline[socket.id]=new Date(); //date at which he joined
      //   connections = {
      //       room1:[
      //          "id1",
      //          "id2",
      //          "id3"
      //       ]
      //    }
         // assume connections mahj eak room mah 3 user hai and path =room 1
         for(let a=0;a<connections[path].length;a++)
         {
            io.to(connections[path][a]).emit("user-joined",socket.id,connections[path]);//sabko noti ki new user aaya with user id this and this are the current ids
         } //this for loop is basically to notify everyone

         if (messages[path] === undefined) { //old message of that room  sab new user wko bhej doh   
                messages[path] = [];
         }

         for (let a = 0; a < messages[path].length; ++a) {
            io.to(socket.id).emit(
               "chat-message",
               messages[path][a]["data"],
               messages[path][a]["sender"],
               messages[path][a]["socket-id-sender"]
            );
         }
      })

      socket.on("signal",(toId,message)=>
      {
         io.to(toId).emit("signal",socket.id,message);
      }) //mujhe rahul ko bhejna hai so mah rahul id and message bhejunnga so jo ayega wahi io.torahulID...

      socket.on("chat-message",(data,sender)=>{
         const [matchingRoom,found]=Object.entries(connections)
         .reduce(([room,isFound],[roomKey,roomValue])=>
         {
          if(!isFound && roomValue.includes(socket.id))
          {
           return [roomKey,true];
          }
          return [room,isFound];
         },['',false]
         );
         if(found ===true)
         {
            if(messages[matchingRoom] === undefined)
            {
               messages[matchingRoom]=[];
            }
            messages[matchingRoom].push({'sender':sender,"data":data,"socket-id-sender":socket.id});
            console.log("message", matchingRoom, ":", sender, data)

            connections[matchingRoom].forEach((elem)=>{
               io.to(elem).emit("chat-message",data,sender,socket.id)
            })
         }
      })
      socket.on("disconnect",(data,sender)=>{
         var diffTime=Math.abs(timeOnline[socket.id]-new Date())
         var key //for storing room name
         for(const [k,v] of JSON.parse(JSON.stringify(Object.entries(connections)))) //object ko arrays mah convert kar dega
         { //k is for room and v is for id in that room
            for(let a=0;a<v.length;++a)
            {
               if(v[a] === socket.id )
               {
                  key=k;
                  for(let a=0;a<connections[key].length;++a)
                  {
                     io.to(connections[key][a]).emit('user-left',socket.id);
                  }
                  var index =connections[key].indexOf(socket.id)
                  connections[key].splice(index,1)
                  if(connections[key].length ===0)
                  {
                     delete connections[key] // room he empty so delete that room
                  }
               }
            }
         }
      })
   })

   return io;
}

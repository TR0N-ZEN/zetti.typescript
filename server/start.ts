import os from 'os';
import path from 'path';
import Game from './game';

let IPaddress:string = '', dirname:string = '';
console.log(`Started process with arg: '${process.argv[2]}'`);
switch (process.argv[2])
{
  case("local"):
    IPaddress = os.networkInterfaces()["enp2s0"][0].address; // - for dev on laptop via ethernet
    dirname = __dirname; // only to use when not in node's interactive mode
    break;
  case("server"):
    IPaddress = os.networkInterfaces()["venet0:0"][0].address; // execution from server
    dirname = __dirname; // only to use when not in node's interactive mode
    break;
  default:
    console.log("Your supplied argument is invalid. Valid arguents are 'local', 'server'.");
}


const port = 80; // port for http server

// helper code for constant variable "client_dir"
let x = dirname.split(path.sep).splice((-1),1).splice(0,1);;
// removing the last element which will hold 'server'
// removing the first item since it will be an empty string, so just ''
let y = "";
for (let e of x) { y+= (`/${e}`); }
const client_dir = path.join(y, "/client");

//logging for checking
console.log("--------------------------");
console.log(`process.argv[2] = ${process.argv[2]}`);
console.log(`IPaddress = ${IPaddress}`);
console.log(`dirname = ${dirname}`);
console.log(`client_dir = ${client_dir}`);
//console.log(` = ${}`);
console.log("--------------------------");


//const { disconnect } = require('process');

const express = require('express');
const app = express();
const httpsserver = require('http').Server(app);
const io = require('socket.io')(httpsserver); // 'io' holds all sockets


const namespace_1 = io.of("/game_1");
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on("connect_to_game", (number) => {  });
  socket.on('login', (name:string) => { login(name, socket); });
  socket.on('vote', (playerid:number) => {});
  socket.on('disconnect', (reason) => { disconnect(); });
  socket.on('MessageFromClient', (message:string) => { namespace_1.emit('MessageFromServer', message); });
  socket.on('Command', (command:string) => { console.log(`Command: ${command}`); eval_command(command, namespace_1.game_io); });
  //socket.on('changeCSS', (element_selector, property, value) => { this.changeCSS(element_selector, property, value, undefined, socket); });
  // miscellaneous
  socket.on('toServerConsole', (text:string) => { console.log(text); });
});


// const namespace_2 = io.of("/game_2");
// const namespace_oversight = io.of("/oversight");

// // const debug_stream = require('./debug_stream').debug_stream;
// // const game_1_debug_stream = new debug_stream('game_1', namespace_oversight);
// // const game_2_debug_stream = new debug_stream('game_2', namespace_oversight);

// var game_1 = new Zetti(namespace_1 /*, game_1_debug_stream*/);
// var game_2 = new Zetti(namespace_2 /*, game_2_debug_stream*/);


// app.get("/game_1", (req, res) =>
// {
//   app.use(express.static(path.join(client_dir, '/game_1')));
//   if (game_1.clients.list.length < 6 || game_1.clients.left.length != 0)
//   {
//     res.sendFile(path.join(client_dir, '/game_1/index.html'));
//   }
//   else
//   {
//     res.sendFile(path.join(client_dir, '/game_1/game_is_full.html'));
//   }
// });
// app.get("/game_2", (req, res) =>
// {
//   app.use(express.static(path.join(client_dir, '/game_1')));
//   if (game_2.clients.list.length < 6 || game_2.clients.left.length != 0)
//   {
//     res.sendFile(path.join(client_dir, '/game_1/index.html'));
//   }
//   else
//   {
//     res.sendFile(path.join(client_dir, '/game_1/game_is_full.html'));
//   }
// });

// app.get("/", (req, res) =>
// {
//   app.use(express.static(path.join(client_dir, '/overview')));
//   res.sendFile(path.join(client_dir, '/overview/overview.html'));
// });
// // app.get("/excuse", (req, res) => {
// //   app.use(express.static('client/excuse'));
// //   res.sendFile(path.join(dirname, '/client/excuse/excuse.html'));
// // });

// app.get("/oversight", (req, res) =>
// {
//   app.use(express.static(path.join(client_dir, '/oversight')));
//   res.sendFile(path.join(client_dir, '/oversight/index.html'));
// });


// httpsserver.listen(port, IPaddress, () =>
// {
//   console.log(`Server is listening on ${IPaddress} : ${port.toString()}`);
// });

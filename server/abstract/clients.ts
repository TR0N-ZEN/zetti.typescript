import Client from './client';

export class Clients
{
  list:Array<Client>;
  ids:Array<number>;
  left:Array<Client>;
  constructor(size:number,list:Array<Client>)
  {
    this.list = list;
    //this.ids = new Array(size);
    this.left = new Array();
    //for (let i:number = 0; i < this.ids.length; i++) { this.ids[i] = 0; }
  }
  append(client:Client) { this.list.push(client); }
  static info(clients:Clients):Array<Client> // copy array clients
  {
    let array = new Array();
    for (let i:number = 0; i < clients.list.length; i++)
    {
      array.push(clients[i].info());
    }
    return array;
  }
  static index_by_id(client_id:number,clients:Clients):number
  {
    for (let index:number = 0; index < clients.list.length; index++) {
      if ( clients[index].id == client_id ) { return index; }
    }
    return -1;
  }
  static index_by_socket_id(socket_id:any,clients:Clients):number
  {
    for (let index:number = 0; index < clients.list.length; index++) {
      if ( clients[index].socket.id == socket_id ) { return index; }
    }
    return -1;
  }
  static delete_by_id(id:number,clients:Clients):boolean
  {
    let index:number = this.index_by_id(id, clients);
    clients.list.splice(index, 1);
    return true;
  }
  static delete_by_socket_id(socket_id:any,clients:Clients):boolean
  {
    let index:number = this.index_by_socket_id(socket_id, clients);
    clients.list.splice(index, 1);
    return true;
  }
}

export default Clients;

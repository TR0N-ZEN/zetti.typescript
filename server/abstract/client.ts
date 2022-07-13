export class Client
{
  socket:any;
  id:number;
  constructor(socket = undefined, id:number = -1)
  {
    this.socket = socket;
    this.id = id;
  }
}

export default Client;
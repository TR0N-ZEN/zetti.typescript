import Player from './player';
import Clients from './clients';

export class Players extends Clients
{
  constructor(size:number,list:Array<Player>) { super(size,list); }
  append(player:Players) { this.list.push(player); }
  static update_points(players):number
  {
    for (let player of players)
    {
    //for (let a = 0; a < players.length; a++) {  let player = players[a];
      Player.update_points(player);
      //player.socket.emit('info.points.update', player.points);
    }
    return 0;
  }
  static prep_for_round(players):number
  {
    for (let player of players)
    {
    //for (let a = 0; a < players.length; a++) {  let player = players[a];
      Player.prep_for_round(player);
    }
    return 0;
  }
  static getID(ids:[number]):number
  {
    for (let i:number = 0; i<ids.length; i++)
    {
      if (ids[i] == 0)
      {
        ids[i] = 1;
        return i;
      }
    }
    return -1;
  }
}

export default Players;
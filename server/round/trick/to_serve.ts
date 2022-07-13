export function to_serve(/*array*/trick)
{
  // for (card of trick) 
  // {
  for (let a = 0; a < trick.length; a++)
  {
    let card = trick[a];
    if (card.color != "N") { return card.color; }// found color that should be served
  }
  // der Only-Enno Fall
  console.log("der Only-Enno Fall"); // debug_stream.write("der Only-Enno Fall");
  return "N";
}

export default to_serve; 
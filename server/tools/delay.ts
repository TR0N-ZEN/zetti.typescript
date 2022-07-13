export function delay(milliseconds:number)
{
  return new Promise(
    (resolve):void =>
    {
      setTimeout(() => { resolve("called resolve"); },milliseconds);
    }
  );
}
export default delay;
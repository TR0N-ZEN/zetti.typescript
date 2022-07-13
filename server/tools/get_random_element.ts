import mod from './mod';

function get_random_element(/*array*/array:any)
{
  let index = mod(Math.floor(Math.random() * array.length), array.length);
  return array[index];
}

export default get_random_element;

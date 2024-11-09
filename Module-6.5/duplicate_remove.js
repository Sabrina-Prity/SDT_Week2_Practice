var numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];
const array = [];

for(let i=0; i<numbers.length; i++)
{
    if(numbers[i] != numbers[i+1])
    {
        array.push(numbers[i]);
    }
}
console.log(array);
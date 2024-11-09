
const friend = (friends) =>{
    let biggest_Name = friends[0];
    for(let i=0; i<friends.length; i++)
    {
        if(friends[i].length > biggest_Name.length)
        {
            biggest_Name = friends[i];
        }
    }
    return biggest_Name;
}

var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];
const ans = friend(friends)
console.log(ans);
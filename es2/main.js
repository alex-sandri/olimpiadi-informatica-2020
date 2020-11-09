const fs = require('fs');
const readline = require('readline');

function solve(n, a) {
    let F = [];

    console.log("--------------------");

    let objArr = [];

    for (let i = 0; i < n; i++)
    {
        objArr[i] = {
            index: i,
            followerCount: a[i],
            follows: -1,
            followedBy: [],
        };
    }

    let tempIndex = objArr.findIndex(obj => obj.followerCount === n - 1);

    if (tempIndex > -1)
    {
        objArr[tempIndex].followedBy = objArr.map(obj => obj.index).filter(n => n != tempIndex);
        
        objArr[tempIndex].followedBy.forEach(n => objArr[n].follows = tempIndex);
    }

    if (objArr.every(obj => obj.followerCount === objArr[0].followerCount))
    {
        objArr.forEach(obj => obj.follows = obj.index + 1);

        objArr[objArr.length - 1].follows = 0;
    }
    else
    {
        for (let i = 0; i < n; i++)
        {
            let temp = objArr[i];

            while (temp.followedBy.length < temp.followerCount)
            {
                let follower = objArr.find(obj => obj.follows === -1 && obj.index != i);

                if (!follower) break;

                temp.followedBy.push(follower.index);

                follower.follows = i;
            }
        }
    }

    F = objArr.map(obj => obj.follows).map(n => n === -1 ? 0 : n);

    return F;
}

async function main() {
    fs.writeFileSync("output.txt", "");

    let fin = fs.createReadStream("input.txt");
    let fout = fs.createReadStream("output.txt");

    const rl = readline.createInterface({
        input: fin,
        output: fout,
    });

    let T = -1;
    let t = 0;

    let lineNumber = 0;

    let nIscritti;
    let arrayInput;

    for await (const line of rl) {
        lineNumber++;

        if(T < 0) {
            T = parseInt(line);
            continue;
        }
        if(line == "") {
            continue;
        }
        
        if (lineNumber % 3 === 0)
        {
            nIscritti = parseInt(line.trim());
        }
        else if (lineNumber % 3 === 1)
        {
            t++;

            let result = solve(nIscritti, line.trim().split(" ").map(n => parseInt(n)));

            fs.appendFileSync("output.txt", "Case #" + t + ": " + result.join(" ") + "\n");
        }
        else
        {
            nIscritti = null;
            arrayInput = null;
        }

        if(t >= T) {
            break;
        }
    }
}

main();
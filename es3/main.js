const fs = require('fs');
const readline = require('readline');

function solve(nVisitatori, nGuide, preparazioneVisitatori, preparazioneGuide) {
    console.log("--------------------");

    let guadagno = 0;

    let objArr = [];

    for (let i = 0; i < nVisitatori; i++)
    {
        objArr[i] = {
            preparazione: preparazioneVisitatori[i],
            guida: -1,
        };
    }

    for (let i = 0; i < nGuide; i++)
    {
        let temp = objArr.findIndex(visitatore => visitatore.preparazione < preparazioneGuide[i] && visitatore.guida === -1);

        if (temp < objArr.findIndex(obj => obj.guida !== -1) && nVisitatori >= nGuide) break;

        if (temp > -1 && objArr.findIndex(obj => obj.guida === i) === -1)
        {
            guadagno += 2;

            objArr[temp].guida = i;
        }
    }

    objArr.filter(obj => obj.guida === -1).forEach(a => guadagno += 1);
    
    return guadagno;
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

    let n, m;
    let v;
    let g;

    for await (const line of rl) {
        lineNumber++;

        if(T < 0) {
            T = parseInt(line);
            continue;
        }
        if(line == "") {
            continue;
        }
        
        if (lineNumber % 4 === 3)
        {
            n = parseInt(line.trim().split(" ")[0]);
            m = parseInt(line.trim().split(" ")[1]);
        }
        else if (lineNumber % 4 === 0)
        {
            v = line.trim().split(" ").map(n => parseInt(n));
        }
        else if (lineNumber % 4 === 1)
        {
            t++;

            g = line.trim().split(" ").map(n => parseInt(n));

            let result = solve(n, m, v, g);

            fs.appendFileSync("output.txt", "Case #" + t + ": " + result + "\n");
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
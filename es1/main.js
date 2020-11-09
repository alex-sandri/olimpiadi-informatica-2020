const fs = require('fs');
const readline = require('readline');
const tty = require('tty');

function solve(n, k) {
    // Scrivi il tuo codice qui per risolvere il problema, ritornando la risposta
    let nPesciLaboratorio = n;

    console.log("--------------------");

    while (n >= k)
    {
        n -= n % k;

        n /= k

        nPesciLaboratorio += n;

        console.log(n, nPesciLaboratorio);
    }

    return nPesciLaboratorio;
}

async function main() {
    fs.writeFileSync("output.txt", "");

    // Lasciare true per fare input / output da tastiera, modificare con false per farlo da file
    let fin, fout;
    if(false) {
        fin = process.stdin;
        fout = process.stdout;
    } else {
        fin = fs.createReadStream("input.txt");
        fout = fs.createReadStream("output.txt");
    }

    const rl = readline.createInterface({
        input: fin,
        output: fout,
    });

    rl.mutedOutput = true;

    rl._writeToOutput = (function(s) {
        if(tty.isatty(rl.input.fd) || !rl.mutedOutput) {
            rl.output.write(s);
        }
    });

    let T = -1;
    let t = 0;

    for await (const line of rl) {
        if(T < 0) {
            T = parseInt(line);
            continue;
        }
        if(line == "") {
            continue;
        }
        t += 1
        let v = line.trim().split(" ").map((x) => parseInt(x));
        let result = solve(v[0], v[1]);
        rl.mutedOutput = false;
        // rl.write("Case #" + t + ": " + result + "\n"); (Non funziona)

        fs.appendFileSync("output.txt", "Case #" + t + ": " + result + "\n");

        rl.mutedOutput = true;
        if(t >= T) {
            break;
        }
    }
}

main();
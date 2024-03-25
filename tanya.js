const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function tanya(pertanyaan){
    return new Promise((resolve) => {
        rl.question(pertanyaan, (data) => resolve(data) );
    });
}


module.exports = tanya
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function tanyakan(pertanyaanConfig){
    const arrayJawaban = []

    //memisahkan pertanyaan, validator dan errorMessage dari pertanyaanConfig
    for (const { pertanyaan, validator, errorMessage } of pertanyaanConfig) {
        var valid = false
        var jawaban

        //melakukan pengulangan jika format jawaban belum sesuai
        do {
            jawaban = await tanya(pertanyaan)
            if (validator(jawaban)) {
                valid = true
            } else {
                console.log(errorMessage)
            }
        } while (!valid)
        arrayJawaban.push(jawaban)
    }

    return arrayJawaban
}

async function tanya(pertanyaan){
    return new Promise((resolve) => {
        rl.question(pertanyaan, (data) => resolve(data) )
    })
}


module.exports = tanyakan
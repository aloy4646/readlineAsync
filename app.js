const validator = require("validator")
const tanya = require('./tanya.js')
const fs = require("fs")


main()
async function main(){
    var nama
    var nomorHandphone
    var email

    valid = false
    do {
        nama = await tanya("Siapa nama anda? ")
        if (validator.isAlpha(nama)) {
            valid = true
        }else{
            console.log("Format nama tidak sesuai, silahkan coba lagi\n")
        }
    } while (!valid);

    valid = false
    do {
        nomorHandphone = await tanya("Berapa nomor handphone anda? ")
        if (validator.isMobilePhone(nomorHandphone, "id-ID")) {
            valid = true
        }else{
            console.log("Format nomor handphone tidak sesuai, silahkan coba lagi\n")
        }
    } while (!valid);

    valid = false
    do {
        email = await tanya("Apa nama email anda? ")
        if (validator.isEmail(email)) {
            valid = true
        }else{
            console.log("Format email tidak sesuai, silahkan coba lagi\n")
        }
    } while (!valid);

    console.log("===========================\n" + 
                "Berikut ini adalah data diri anda\n" + 
                "Nama: " + nama+
                "\nNomor handphone: " + nomorHandphone +
                "\nEmail: " + email)
    
    simpanContact([nama, nomorHandphone, email])

    process.exit() 
}

function simpanContact(jawaban){
    //membuat object contact berisi nama, nomorHandphone dan email
    const contact = {nama: jawaban[0], 
        nomorHandphone: jawaban[1], 
        email: jawaban[2]}

    //membuat folder data jika belum ada
    const dirPath = './data'
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath)
    }

    //membuat file contacts.json jika belum ada
    const dataPath = dirPath + "/contacts.json"
    if(!fs.existsSync(dataPath)){
        fs.writeFileSync(dataPath, '[]', 'utf-8')
    }

    const file = fs.readFileSync(dataPath, 'utf-8')
    const contacts = JSON.parse(file)
    contacts.push(contact)
    fs.writeFileSync(dataPath, JSON.stringify(contacts))
}
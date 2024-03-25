const validator = require("validator")
const tanyakan = require('./tanya.js')
const fs = require("fs")


main()

async function main() {

    //memanggil function "tanyakan" menggunakan parameter beriisi pertanyaan, validator, dan errorMessage
    //saya nyebutnya "pertanyaanConfig" / configurasi dari pertanyaan
    //function "tanyakan" akan mengembalikan sebuah array yang berisi jawaban-jawaban dari pertanyaan
    const arrayJawaban = await tanyakan([
        { pertanyaan: "Siapa nama anda? ", validator: validator.isAlpha, errorMessage: "Format nama tidak sesuai, silahkan coba lagi\n" },
        { pertanyaan: "Berapa nomor handphone anda? ", validator: (input) => validator.isMobilePhone(input, "id-ID"), errorMessage: "Format nomor handphone tidak sesuai, silahkan coba lagi\n" },
        { pertanyaan: "Apa nama email anda? ", validator: validator.isEmail, errorMessage: "Format email tidak sesuai, silahkan coba lagi\n" }
    ])

    //memasukkan nilai-nilai dari arrayJawaban ke variable terpisah
    const [nama, nomorHandphone, email] = arrayJawaban

    console.log("===========================\n" +
        "Berikut ini adalah data diri anda\n" +
        "Nama: " + nama +
        "\nNomor handphone: " + nomorHandphone +
        "\nEmail: " + email)

    simpanContact(nama, nomorHandphone, email)
    process.exit()
}

function simpanContact(nama, nomorHandphone, email){
    //membuat object contact berisi nama, nomorHandphone dan email
    const contact = {nama, 
        nomorHandphone, 
        email}

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
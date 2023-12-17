const Ucer = require("../../model/Role")
const bcrypt = require('bcrypt')

exports.authors = async (req, res) => {
    let ucers = await Ucer.find({ status: "author" })
    if (!ucers) {
        res.json({ title: "Authors not founded!" })
    } else {
        res.json({ title: "All authors", ucers })
    }
}
exports.kategT = async (req, res) => {
    let ucers = await Ucer.find({ kateg: "temuriy" })
    if (!ucers) {
        res.json({ title: "Kategory not founded!" })
    } else {
        res.json({ title: "temuriy", ucers })
    }
}
exports.kategJ = async (req, res) => {
    let ucers = await Ucer.find({ kateg: "jadid" })
    if (!ucers) {
        res.json({ title: "Kategory not founded!" })
    } else {
        res.json({ title: "jadid", ucers })
    }
}
exports.kategS = async (req, res) => {
    let ucers = await Ucer.find({ kateg: "sovet" })
    if (!ucers) {
        res.json({ title: "Kategory not founded!" })
    } else {
        res.json({ title: "sovet", ucers })
    }
}
exports.kategM = async (req, res) => {
    let ucers = await Ucer.find({ kateg: "mustaqil" })
    if (!ucers) {
        res.json({ title: "Kategory not founded!" })
    } else {
        res.json({ title: "mustaqil", ucers })
    }
}
exports.authorbooks = async (req, res) => {
    let data = await Ucer.findById(req.params.id)
    if (data && data.status == 'author') {
        res.json({ title: "Author books", data })
    } else {
        res.json({ title: "This is not a author id" })
    }
}
exports.books = async (req, res) => {
    let ucers = await Ucer.find({ status: "book" })
    if (!ucers) {
        res.json({ title: "Books not founded!" })
    } else {
        res.json({ title: "All books", ucers })
    }
}
exports.nasr = async (req, res) => {
    let ucers = await Ucer.find({ kbook: "nasr" })
    if (!ucers) {
        res.json({ title: "Nasr not found!" })
    } else {
        res.json({ title: "All nasr", ucers })
    }
}
exports.nazm = async (req, res) => {
    let ucers = await Ucer.find({ kbook: "nazm" })
    if (!ucers) {
        res.json({ title: "Nazm not found!" })
    } else {
        res.json({ title: "All nazm", ucers })
    }
}
exports.profile = async (req, res) => {
    let data = await Ucer.findById(req.params.id)
    if (data && data.status == 'admin') {
        res.json({ title: "Your account", data })
    } else {
        res.json({ title: "This is not a admin" })
    }
}
exports.oneauthor = async (req, res) => {
    let data = await Ucer.findById(req.params.id)
    if (data && data.status == 'author') {
        res.json({ title: "Author account", data })
    } else {
        res.json({ title: "This is not a author" })
    }
}
exports.onebook = async (req, res) => {
    let data = await Ucer.findById(req.params.id)
    if (data && data.status == 'book') {
        res.json({ title: "Success", data })
    } else {
        res.json({ title: "This is not a book id" })
    }
}
exports.editPass = async (req, res) => {
    const email = req.body.email
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword
    let newUcer = await Ucer.findOne({ email })
    if (!newUcer) {
        res.json({ title: "Error", message: "User not found!" })
    } else if (newUcer) {
        bcrypt.compare(oldPassword, newUcer.password, async (err, res1) => {
            if (res1) {
                let hash = await bcrypt.hash(newPassword, 10)
                let data = await Ucer.findByIdAndUpdate(newUcer._id, { password: hash })
                res.json({ title: "Success", message: 'Password succesfully edited...' });
            } else {
                res.json({ title: "Error", message: "Old password incorrect!" })
            }
        });
    }
}
exports.author1 = async (req, res) => {
    let data = req.body.author1
    let ucers = await Ucer.find({ firstName: data } || { lastName: data } || { title: data })
    if (!ucers) {
        res.json({ title: "Data not founded!" })
    } else {
        res.json({ title: "Success", ucers })
    }
}
exports.uceracc = async (req, res) => {
    let data = req.body.ucerakk
    let ucers = await Ucer.find({ email: data })
    if (!ucers) {
        res.json({ title: "Data not founded!" })
    } else {
        res.json({ title: "Success", ucers })
    }
}
exports.addbook = async (req, res) => {
    const uceremail = req.body.uceremail
    const idBook = req.body.idBook
    let newUcer = await Ucer.find({ email: uceremail })
    let book = await Ucer.findById(idBook)
    if (!newUcer) {
        res.json({ title: "Error", message: "Ucer not found!" })
    } else if (newUcer) {
        if (book) {
            let data = await Ucer.findByIdAndUpdate(newUcer._id, { $push: { books: book } })
            res.json({ title: "Success", message: 'Book successfully added!' });
        } else {
            res.json({ title: "Error: Book is not defined" })
        }
    }
}
exports.bio = async (req, res) => {
    const uceremail = req.body.uceremail
    const bio = req.body.bio
    let newUcer = await Ucer.findOne({ email: uceremail })
    if (!newUcer) {
        res.json({ title: "Error", message: "User not found!" })
    } else if (newUcer) {
        let data = await Ucer.findByIdAndUpdate(newUcer._id, { bio })
        res.json({ title: "Success", message: 'Ucer succesfully edited...' });
    }
}
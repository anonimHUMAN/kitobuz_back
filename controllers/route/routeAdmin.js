const bcrypt = require('bcrypt')
const Ucer = require("../../model/Role")

exports.ucers = async (req, res) => {
    let ucers = await Ucer.find({ status: "ucer" })
    if (!ucers) {
        res.json({ title: "Ucers not founded!" })
    } else {
        res.json({ title: "All Ucers", ucers })
    }
}
exports.authors = async (req, res) => {
    let ucers = await Ucer.find({ status: "author" })
    if (!ucers) {
        res.json({ title: "Authors not founded!" })
    } else {
        res.json({ title: "All authors", ucers })
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
exports.profile = async (req, res) => {
    let data = await Ucer.findById(req.params.id)
    if (data && data.status == 'admin') {
        res.json({ title: "Admin account", data })
    } else {
        res.json({ title: "This is not a admin" })
    }
}
exports.createAuthor = async (req, res) => {
    let { firstName, lastName, birth, death, country, bio } = req.body
    let data = await Ucer.findOne({ firstName })
    if (true) {
        if (firstName && lastName && birth && death && country && bio) {
            try {
                let author = new Ucer({
                    firstName,
                    lastName,
                    birth,
                    death,
                    country,
                    bio,
                    books: [],
                    status: 'author'
                })
                author.save()
                    .then(data => {
                        if (data) {
                            res.json({ title: "Author created", data: data })
                        }
                    })
            } catch (e) {
                res.json({ title: "Error", e })
            }
        }
        else {
            res.json({ title: "Enter all data for author!!!" })
        }
    } else if (data) {
        res.json({ title: "This author already exist" })
    }
}
exports.delAuthor = async (req, res) => {
    let data = await Ucer.findByIdAndDelete(req.query.idAuthor)
    if (data) {
        res.json({ title: "Author deleted" })
    } else {
        res.json({ title: `${req.query.idAuthor} not found` });
    }
}
exports.createBook = async (req, res) => {
    let { title, pages, year, price, country, author, description } = req.body
    let data = await Ucer.findOne({ title })
    if (!data) {
        if (title && pages && year && price && country && author && description) {
            try {
                let book = new Ucer({
                    title,
                    pages,
                    year,
                    price,
                    country,
                    author,
                    description,
                    status: 'book'
                })
                book.save()
                    .then(data => {
                        if (data) {
                            res.json({ title: "Book created", data: data })
                        }
                    })
            } catch (e) {
                res.json({ title: "Error", e })
            }
        }
        else {
            res.json({ title: "Enter all data for book!!!" })
        }
    } else if (data) {
        res.json({ title: "This book already exit" })
    }
}
exports.authorbooks = async (req, res) => {
    let data = await Ucer.findById(req.params.id)
    if (data && data.status == 'author') {
        let data1 = data.books
        res.json({ title: "Author data", data1 })
    } else {
        res.json({ title: "This is not a author id" })
    }
}
exports.addBookToGroup = async (req, res) => {
    const { idAuthor, idBook } = req.body
    let newUcer = await Ucer.findById(idAuthor)
    let book = await Ucer.findById(idBook)
    if (!newUcer) {
        res.json({ title: "Error", message: "Author not found!" })
    } else if (newUcer) {
        if (book) {
            let data = await Ucer.findByIdAndUpdate(newUcer._id, { $push: { books: book } })
            res.json({ title: "Success", message: 'Book successfully added!' });
        } else {
            res.json({ title: "Error: Body is not defined" })
        }
    }
}
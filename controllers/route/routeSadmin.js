const bcrypt = require('bcrypt')
const Ucer = require("../../model/Role")

exports.index = async (req, res) => {
    let admin = await Ucer.find({ status: "admin" })
    if (!admin) {
        res.json({ title: "Admins not founded!" })
    } else {
        res.json({ title: "All admins", admin })
    }
}
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
exports.authorbooks = async (req, res) => {
    let data = await Ucer.findById(req.params.id)
    if (data && data.status == 'author') {
        let data1 = data.books
        res.json({ title: "Author data", data1 })
    } else {
        res.json({ title: "This is not a author id" })
    }
}
exports.createAdmin = async (req, res) => {
    const { firstName, lastName, phone, email, password } = req.body
    const user = await Ucer.findOne({ email })
    if (user) {
        res.json({ title: "ERROR: ", message: "This account is already registered!" })
    } else {
        if (firstName && lastName && email && phone && password) {
            try {
                let hash = await bcrypt.hash(password, 10)
                let admin = new Ucer({
                    firstName,
                    lastName,
                    email,
                    phone,
                    password: hash,
                    status: 'admin'
                })
                admin.save()
                    .then(data => {
                        if (data) {
                            res.json({ title: "Successfully created", data: data })
                        }
                    })
            } catch (e) {
                res.json({ title: "Error", e })
            }
        }
        else {
            res.json({ title: "Enter all data!!!" })
        }
    }
}
exports.delAdmin = async (req, res) => {
    let data = await Ucer.findByIdAndDelete(req.query.idAdmin)
    if (data) {
        res.json({ title: "Admin deleted" })
    } else {
        res.json({ title: `${req.query.idAuthor} not found` });
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
    let { image, firstName, lastName, birth, death, country, bio, kateg } = req.body
    let data = await Ucer.findOne({ firstName })
    if (true) {
        if (image && firstName && lastName && birth && death && country && bio && kateg) {
            try {
                let author = new Ucer({
                    image,
                    firstName,
                    lastName,
                    birth,
                    death,
                    country,
                    bio,
                    kateg,
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
    try {
        let { image, title, pages, year, price, country, author, description, kbook } = req.body
        let data = await Ucer.findOne({ title })
        if (!data) {
            if (image && title && pages && year && price && country && author && description && kbook) {
                try {
                    let book = new Ucer({
                        image,
                        title,
                        pages,
                        year,
                        price,
                        country,
                        author,
                        description,
                        kbook,
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
    } catch (error) {
        res.json({ title: "Error", error })
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
            let data = await Ucer.findByIdAndUpdate(newUcer._id, { books: [book] })
            res.json({ title: "Success", message: 'Book successfully added!' });
        } else {
            res.json({ title: "Error: Body is not defined" })
        }
    }
}
exports.removeBookFromGroup = async (req, res) => {
    let { idAuthor, idGroup, idBook } = req.query
    if (idAuthor && idGroup && idBook) {
        let author = await Ucer.findById(idAuthor)
        if (!author) {
            res.json({ title: "Teacher not found..." })
        } else {
            let group = await Ucer.findOneAndUpdate(
                {
                    _id: idAuthor,
                    "group._id": idGroup
                },
                {
                    $pull: {
                        "group.$.students": idBook
                    }
                })
            res.json({ title: "Deleted" })
        }
    } else {
        res.json({ title: "Data is not defined..." })
    }
}
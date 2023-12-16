const { Router } = require('express')
const {
    authors, books,
    profile, oneauthor,
    onebook, authorbooks,
    kategT, kategJ,
    kategS, kategM,
    nasr, nazm,
    editPass, author1,
    uceracc, addbook, bio,
} = require('../../controllers/route/routeUcer')

const router = Router()

// http://localhost:3000/routeucer/authors
router.post('/editpass', editPass)
// http://localhost:3000/routeucer/authors
router.get('/authors', authors)
// http://localhost:3000/routeucer/kategT
router.get('/kategT', kategT)
// http://localhost:3000/routeucer/kategJ
router.get('/kategJ', kategJ)
// http://localhost:3000/routeucer/kategS
router.get('/kategS', kategS)
// http://localhost:3000/routeucer/kategM
router.get('/kategM', kategM)
// http://localhost:3000/routeucer/author/books/author id
router.get('/author/books/:id', authorbooks)
// http://localhost:3000/routeucer/books
router.get('/books', books)
// http://localhost:3000/routeucer/nasr
router.get('/nasr', nasr)
// http://localhost:3000/routeucer/nazm
router.get('/nazm', nazm)
// http://localhost:3000/routeucer/profile/ucer id
router.get('/profile/:id', profile)
// http://localhost:3000/routeucer/author1/aurhor id
router.get('/author1/:id', oneauthor)
// http://localhost:3000/routeucer/book1/book id
router.get('/book1/:id', onebook)
// http://localhost:3000/routeucer/author1
router.post('/author1', author1)
// http://localhost:3000/routeucer/uceracc
router.post('/uceracc', uceracc)
// http://localhost:3000/routeucer/addbook
router.post('/addbook', addbook)
// http://localhost:3000/routeucer/bio
router.post('/bio', bio)

module.exports = router
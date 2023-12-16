const { Router } = require('express')
const {
    profile,
    createAuthor,
    createBook,
    authors,
    delAuthor,
    books,
    ucers,
    addBookToGroup,
    authorbooks,
} = require('../../controllers/route/routeAdmin')

const router = Router()

// http://localhost:3000/routeadmin/ucers
router.get('/ucers', ucers)
// http://localhost:3000/routeadmin/authors
router.get('/authors', authors)
// http://localhost:3000/routeadmin/books
router.get('/books', books)
// http://localhost:3000/routeadmin/profile/admin id
router.get('/profile/:id', profile)
// http://localhost:3000/routeadmin/crauthor
router.post('/crauthor', createAuthor)
// http://localhost:3000/routeadmin/delauthor?idAuthor
router.delete('/delauthor', delAuthor)
// http://localhost:3000/routeadmin/crbook
router.post('/crbook', createBook)
// http://localhost:3000/routeadmin/author/books/author id
router.get('/author/books/:id', authorbooks)
// http://localhost:3000/routeadmin/addbook
router.post('/addbook', addBookToGroup)

module.exports = router
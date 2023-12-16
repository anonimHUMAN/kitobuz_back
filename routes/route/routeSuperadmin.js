const { Router } = require('express')
const {
    index,
    profile,
    createAdmin,
    ucers,
    createAuthor,
    createBook,
    addBookToGroup,
    removeBookFromGroup,
    authors,
    delAuthor,
    books,
    delAdmin,
    authorbooks,
} = require('../../controllers/route/routeSadmin')

const router = Router()

// http://localhost:3000/routesuperadmin/admins
router.get('/admins', index)
// http://localhost:3000/routesuperadmin/ucers
router.get('/ucers', ucers)
// http://localhost:3000/routesuperadmin/authors
router.get('/authors', authors)
// http://localhost:3000/routesuperadmin/books
router.get('/books', books)
// http://localhost:3000/routesuperadmin/author/books/author id
router.get('/author/books/:id', authorbooks)
// http://localhost:3000/routesuperadmin/admins
router.post('/cradmin', createAdmin)
// http://localhost:3000/routesuperadmin/deladmin?idAdmin
router.delete('/deladmin', delAdmin)
// http://localhost:3000/routesuperadmin/profile/admin id
router.get('/profile/:id', profile)
// http://localhost:3000/routesuperadmin/crauthor
router.post('/crauthor', createAuthor)
// http://localhost:3000/routesuperadmin/delauthor?idAuthor
router.delete('/delauthor', delAuthor)
// http://localhost:3000/routesuperadmin/crbook
router.post('/crbook', createBook)
// http://localhost:3000/routesuperadmin/addbook
router.post('/addbook', addBookToGroup)
// http://localhost:3000/routesuperadmin/delbook
router.delete('/delbook', removeBookFromGroup)

module.exports = router
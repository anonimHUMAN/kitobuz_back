const { Router } = require('express')
const { checkLogin } = require('../../middleware/checkLogin')
const { signIn, signup } = require('../../controllers/auth/auntification')
const routes = Router()


routes.post('/signin', signIn)
routes.post('/signup', signup)

module.exports = routes
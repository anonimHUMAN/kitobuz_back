const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const { token } = require('./middleware/token');
const { checkSuperadmin, checkAdmin } = require('./middleware/checkRole');
require('dotenv').config()

const app = express()

// Connect to MongoDB
// mongoose.connect(process.env.DB_local_link)
mongoose.connect(process.env.DB_global_link)
    .then(data => {
        if (data) {
            console.log("DB connected...");
        }
    })
    .catch(err => {
        console.log(err);
    })

// Cors
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Get information for use
app.use('/', require('./routes/index')) // correct

// SignIn
app.use('/auth', require('./routes/auth/auntification'))

// Superadmin panel
app.use('/routesuperadmin', token, checkSuperadmin, require('./routes/route/routeSuperadmin'))

// Admin panel
app.use('/routeadmin', token, checkAdmin, require('./routes/route/routeAdmin'))

// Ucer panel
app.use('/routeucer', require('./routes/route/routeUcer'))


// Connect to port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Running: ${PORT}`))
const {
    model,
    Schema
} = require('mongoose')

module.exports = model("ucer", new Schema({
    firstName: String,
    lastName: String,
    country: String,
    pages: String,
    birth: String,
    death: String,
    bio: String,
    title: String,
    year: String,
    price: String,
    author: String,
    description: String,
    image: String,
    books: [],
    email: {
        type: String,
        require: true
    },
    phone: String,
    password: {
        type: String,
        require: true
    },
    kateg: {
        type: String,
        enum: ["temuriy", "jadid", "sovet", "mustaqil"]
    },
    kbook: {
        type: String,
        enum: ["nasr", "nazm"]
    },
    status: {
        type: String,
        enum: ["superadmin", "admin", "ucer", "author", "book"],
        default: "ucer"
    },
    info: {
        type: String
    }
}, { timestamps: true }))
const Ucer = require("../model/Role")

exports.index = async (req, res) => {
    let data = {
        message: "Not exist"
    }
    res.json({ title: "Success", data })
}
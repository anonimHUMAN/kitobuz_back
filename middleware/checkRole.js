exports.checkSuperadmin = async (req, res, next) => {
    if (req.user.status === 'superadmin') {
        next()
    } else {
        res.json({ title: "Error: ", message: "No authorization on this route" })
    }
}

exports.checkAdmin = async (req, res, next) => {
    if (req.user.status === 'admin' || req.user.status === 'superadmin') {
        next()
    } else {
        res.json({ title: "Error: ", message: "No authorization on this route" })
    }
}
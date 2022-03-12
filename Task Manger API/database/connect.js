const mongoose = require('mongoose')

module.exports = (URL) => {
    return mongoose.connect(URL)
}

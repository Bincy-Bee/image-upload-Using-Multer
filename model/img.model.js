const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
    img : String,
})

const image = mongoose.model('images',imgSchema);

module.exports = {image}
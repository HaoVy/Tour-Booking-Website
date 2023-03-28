const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Hotel = new Schema({
    Ten_KS:{type: String, require: true},
    DiaDiemKS:{type: String, require: true},
    slug: {type: String, slug:"Ten_KS", unique: true},
});

module.exports = mongoose.model('Hotel', Hotel);


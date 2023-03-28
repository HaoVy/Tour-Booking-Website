const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Restaurant = new Schema({
    Ten_NH: { type: String, require: true },
    DiaDiemNH: { type: String, require: true },
    Ngay: { type: String, require: true },
    ID_Tour:
    [
        {
            type: Schema.Types.ObjectId,
        }
    ],
    slug: { type: String, slug: "Ten_NH", unique: true },
});


module.exports = mongoose.model('Restaurant', Restaurant);


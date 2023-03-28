const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Tour = new Schema({
    Ten_Tour: { type: String, require: true },
    Gia_Tour: { type: Number, require: true },
    MoTa_Tour: { type: String, maxLength: 500 },
    Loai_Tour: { type: String, require: true },
    DiaDiemTour: { type: String, require: true },
    Anh_Bia: { type: String, maxLength: 500 },
    PhuongTien: {type: String, require: true },
    NgayBD: {type: String, format: Date,},
    NgayKT: {type: String, format: Date,},
    SL_KH: {type: Number, require: true },
    ID_KS: { type: Schema.Types.ObjectId},
    ID_NH:
    [
        { 
            type: Schema.Types.ObjectId,
        }
    ],
    slug: { type: String, slug: "Ten_Tour", unique: true },
    ssg: { type: String, unique: true },
});

module.exports = mongoose.model('Tour', Tour);

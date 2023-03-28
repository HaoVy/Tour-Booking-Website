const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Receipt = new Schema({
    ID_KH:{type: Schema.Types.ObjectId,},
    ID_Tour:{type: Schema.Types.ObjectId,},
    Ten_Khach:{type: String},
    Dia_Chi: {type: String},
    SDT: {type: String},
});

module.exports = mongoose.model('Receipt', Receipt);


const mongoose = require('mongoose');

const excelDataSchema = new mongoose.Schema({
    filename: String,
    uploadDate: { type: Date, default: Date.now },
    data: Array,
    analysis: {
        nombreLignes: Number,
        colonnes: [String],
        colonnesNumeriques: [String],
        statistiques: mongoose.Schema.Types.Mixed
    }
});

module.exports = mongoose.model('ExcelData', excelDataSchema);
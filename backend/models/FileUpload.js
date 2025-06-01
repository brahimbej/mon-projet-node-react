const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    fileSize: {
        type: Number,
        required: true
    },
    processedData: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    status: {
        type: String,
        enum: ['success', 'error', 'processing'],
        default: 'success'
    }
});

const FileUpload = mongoose.model('FileUpload', fileUploadSchema);

module.exports = FileUpload; 
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const newFileName = uniqueSuffix + '.' + file.mimetype.split('/')[1];
        cb(null, newFileName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['application/pdf', 'application/msword', 'image/jpeg', 'image/png', 'image/gif' ];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Allow file upload
    } else {
        cb(new Error('This file type is not allowed.'), false); // Reject file
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

module.exports = upload;

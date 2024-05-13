var express = require('express');
var router = express.Router();

const path = require('path')
const fs = require('fs')

const UploadController = require('./../controller/master_controller/UploadController')
const upload = require('./../../src/services/upload-file')

const masterRoutes = require('./master_routes/master.routes');
const auth_routes = require('./utility_routes/auth.routes');

const { verifyToken, accessControl } = require('../services/auth.service');

// not found route
router.get('/not-found', function(req, res) {
    res.status(404).sendFile(path.join(__dirname, '../views/not-found.html'));
});

// authentication routes usage 
router.use('/auth/', auth_routes);

router.get('/uploads/:filename', function(req, res) {
    console.log('tes upload');
    const filename = req.params.filename; // Get the dynamic filename from the request URL
    const filePath = path.join(__dirname ,'../..', `/uploads/`, filename); // Construct the file path
    // return

    if (fs.existsSync(filePath)) {
      // Determine the file type based on the extension
    const fileExtension = path.extname(filename).toLowerCase();

    // Set the appropriate Content-Type based on the file extension
    if (fileExtension === '.pdf') {
      res.setHeader('Content-Type', 'application/pdf');
    } else if (['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)) {
      res.setHeader('Content-Type', `image/${fileExtension.substring(1)}`);
    } else {
      // Unsupported file type
      res.status(400).send('Unsupported file type');
      return;
    }
      // Set the headers to indicate inline content and specify the filename
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  
      // Read the file and stream it back to the client
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.redirect('/api/not-found');
    }
  });

// master data routes usage 
router.use('/master/', accessControl, verifyToken, masterRoutes);

// Upload
router.get('/file/:filename', UploadController.getFile)
router.post('/upload', upload.single('file'), UploadController.uploadFile)
router.delete('/delete/:filename', UploadController.deleteFile)

module.exports = router;


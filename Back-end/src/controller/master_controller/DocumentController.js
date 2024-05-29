const documentModel = require("../../model/document.model");
const api = require("../../tools/common");

const getAllDocument = async (req, res) => {
  try {
    const data = await documentModel.getAll();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, "Internal Server Error", 500);
  }
};
const getAllUp = async (req, res) => {
  try {
    const data = await documentModel.getUpArea();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, "Internal Server Error", 500);
  }
};

const getDocumentById = async (req, res) => {
  if (!isNaN(req.params.id)) {
      try {
          const data = await documentModel.getById(req.params.id);
          return api.ok(res, data);
      } catch (error) {
          return api.error(res, "Internal Server Error", 500);
      }
  } else {
      return api.error(res, "Bad Request", 400);
  }
};
const softDelete = async (req, res) => {
  const data = req.body;
  if (!isNaN(req.params.id)) {
      try {
          const softDelete = await documentModel.softDelete(req.params.id, data);
          return api.ok(res, softDelete);
      } catch (error) {
          return api.error(res, "Filed to softdelete", 500);
      }
  } else {
      return api.error(res, "Bad Request", 400);
  }
};

const insertDocument = async (req, res) => {
  const data = req.body;
  try {
    const result = await documentModel.insert(data);
    if (result.success) {
      res.json({ success: true, message: 'Data inserted successfully.' });
    } else {
      res.status(500).json({ success: false, message: 'Failed to insert data.' });
    }
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
}


const updateDocument = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const result = await documentModel.update(id, data);
    if (result.success) {
      res.json({ success: true, message: 'Data updated successfully.' });
    } else {
      res.status(500).json({success:false, message: 'Failed to update data.' });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({success:false, message: 'An Error occurred.' });
  }
}


const getDocumentsByArea = async (req, res) => {
  if (!isNaN(req.params.id)) {
    try {
        const data = await documentModel.getByAreaId(req.params.id);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
} else {
    return api.error(res, "Bad Request", 400);
}
};



module.exports = {
  getAllDocument,
  insertDocument,
  getDocumentById,
  getDocumentsByArea,
  getAllUp,
  updateDocument,
  softDelete
};

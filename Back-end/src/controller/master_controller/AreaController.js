const areaModel = require("../../model/area.model");
const api = require("../../tools/common");

const getAreaById = async (req, res) => {
  if (!isNaN(req.params.id)) {
    try {
      const data = await areaModel.getById(req.params.id);
      return api.ok(res, data);
    } catch (error) {
      return api.error(res, "Internal Server Error", 500);
    }
  } else {
    return api.error(res, "Bad Request", 400);
  }
};

const getAllAreas = async (req, res) => {
  try {
    const data = await areaModel.getAll();
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, "Internal Server Error", 500);
  }
};

const insertArea = async (req, res) => {
  try {
    const data = await areaModel.insert(req.body);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, "Internal Server Error", 500);
  }
};

const updateArea = async (req, res) => {
  try {
    const data = await areaModel.update(req.params.id, req.body);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, "Internal Server Error", 500);
  }
};

const deleteArea = async (req, res) => {
  if (!isNaN(req.params.id)) {
    try {
      const data = await areaModel.deleteData(req.params.id);
      return api.ok(res, data);
    } catch (error) {
      return api.error(res, "Internal Server Error", 500);
    }
  } else {
    return api.error(res, "Bad Request", 400);
  }
};

module.exports = {
  getAreaById,
  getAllAreas,
  insertArea,
  updateArea,
  deleteArea,
};

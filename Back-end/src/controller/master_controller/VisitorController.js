const visitorModel = require("../../model/visitor.model");
const api = require("../../tools/common");

const getVisitorById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        try {
            const data = await visitorModel.getById(req.params.id);
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};

const getAllVisitors = async (req, res) => {
    try {
        const data = await visitorModel.getAllVisitors();
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const insertVisitor = async (req, res) => {
    try {
        const data = await visitorModel.insert(req.body);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const updateVisitor = async (req, res) => {
    try {
        const data = await visitorModel.update(req.params.id, req.body);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const deleteVisitor = async (req, res) => {
    if (!isNaN(req.params.id)) {
        try {
            const data = await visitorModel.deleteData(req.params.id);
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};

module.exports = {
    getVisitorById,
    getAllVisitors,
    insertVisitor,
    updateVisitor,
    deleteVisitor
};

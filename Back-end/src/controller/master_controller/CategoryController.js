const categoryModel = require("../../model/category.model");
const api = require("../../tools/common");

const getCategoryById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        try {
            const data = await categoryModel.getById(req.params.id);
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};

const getAllCategories = async (req, res) => {
    try {
        const data = await categoryModel.getAll();
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const insertCategory = async (req, res) => {
    try {
        const data = await categoryModel.insert(req.body);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const updateCategory = async (req, res) => {
    try {
        const data = await categoryModel.update(req.params.id, req.body);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const deleteCategory = async (req, res) => {
    if (!isNaN(req.params.id)) {
        try {
            const data = await categoryModel.deleteData(req.params.id);
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};

module.exports = {
    getCategoryById,
    getAllCategories,
    insertCategory,
    updateCategory,
    deleteCategory,
};

const model = require("../../model/parts.model")
const api = require("../../tools/common");

const getAllParts = async (req, res) => {
    try{
        const data = await model.getAll();
        return api.ok(res, data);
    } catch {
        return api.error(res,"Internal Server Error", 500)
    }
}

const getPartById = async (req, res) => {
    const partId = req.params.partId;
    try{
        const data = await model.getById(partId);
        return api.ok(res, data);
    } catch {
        return api.error(res,"Internal Server Error", 500);
    }
}

const insertPart = async (req, res) => {
    const newDataPart = req.body;
    try{
        const data = await model.insert(newDataPart)
        return api.ok(res, data);
    } catch {
        return api.error(res, "internal server error", 500)
    }
}

const updatePart = async (req, res) => {
    const newDataPart = req.body;
    const partId = req.params.partId;
    try{
        const data = await model.update(partId, newDataPart);
        return api.ok(res, data);
    } catch {
        return api.error(res, "Internal Server Error", 500)
    }
}

const sofDelete = async (req, res) => {
    const sofDelete = req.body;
    const partId = req.params.partId

    try{
        const data = await model.sofDelete(partId, sofDelete);
        return api.ok(res, data);
    } catch {
        return api.error(res, "Internal Server Error", 500)
    }
}

const getAllByAreaId = async (req, res) => {
    const areaId = req.params.areaId;
    try{
        const data = await model.getByAreaId(areaId)
        return api.ok(res, data);
    } catch {
        return api.error(res, "Internal Server Error", 500)
    }
}
const getTotalPartGroupByArea = async (req, res) => {
    try{
        const data = await model.totalPartGroupByArea()
        return api.ok(res, data);
    } catch {
        return api.error(res, "Internal Server Error", 500)
    }
}
const getAllStockRemain = async (req, res) => {
    try{
        const data = await model.getAllStockRemain()
        return api.ok(res, data);
    } catch {
        return api.error(res, "Internal Server Error", 500)
    }
}

module.exports = {
    getAllParts,
    getPartById,
    insertPart,
    updatePart,
    sofDelete,
    getAllByAreaId,
    getTotalPartGroupByArea,
    getAllStockRemain
}
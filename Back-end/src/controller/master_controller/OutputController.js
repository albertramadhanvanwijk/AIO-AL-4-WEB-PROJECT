const model = require("../../model/output.model")
const api = require("../../tools/common");

const getAllOutputParts = async (req, res) => {
    try{
        const data = await model.getAll();
        return api.ok(res, data)
    } catch{
        return api.error(req, "Internal Server Error", 500)
    }
}

const getOutputByOutputId = async (req, res) => {
    const outputId = req.params.outputId
    try{
        const data = await model.getByOutputId(outputId);
        return api.ok(res, data)
    } catch {
        return api.error(req, "Internal Server Error", 500);
    }
}

const getOutputByPartId = async (req, res) => {
    const partId = req.params.partId
    try{
        const data = await model.getByIdPart(partId);
        return api.ok(res, data)
    } catch {
        return api.error(res, "Internal Server Error", 500)
    }
}

const insertOutputPart = async (req, res) => {
    const newData = req.body
    try{
        const data = await model.insert(newData)
        return api.ok(res, data)
    }
    catch{
        return api.error(res, "Internal Server Error", 500)
    }
}

const updateByOutputId = async (req, res) => {
    const outputId = req.params.outputId
    const newData = req.body
    try{
        const data = await model.update(outputId, newData)
        return api.ok(res, data)
    } catch {
        return api.error(res, "Internal Server Error", 500)
    }
}

const softDelete = async (req, res) => {
    const outputId = req.params.outputId
    const newData = req.body
    try{
        const data = await model.update(outputId, newData)
        return api.ok(res, data)
    } catch {
        return api.error(res, "Internal Server Error", 500)
    }
}

const totalRemainOutByPartId = async (req, res) => {
    const partId = req.params.partId
    try {
        const totalRemain = await model.totalOutByIdPart(partId);
        res.json(totalRemain); // Mengembalikan hasil tanpa array
      } catch {
        return api.error(res, "Internal Server Error", 500);
      }
}
const totalRemainInByPartId = async (req, res) => {
    const partId = req.params.partId
    try {
        const totalRemain = await model.totalInByIdPart(partId);
        res.json(totalRemain); // Mengembalikan hasil tanpa array
      } catch {
        return api.error(res, "Internal Server Error", 500);
      }
}

const getDetailOutput = async (req, res) => {
    const partId = req.params.partId
    try{
        const data = await model.getDetailOutput(partId)
        return api.ok(res, data)
    } catch {
        return api.error(res, "Internal Server Error", 500)
    }
}
const getTotalPrice = async (req, res) => {
    const areaId = req.params.areaId
    try{
        const data = await model.totalPrice(areaId);
        return api.ok(res, data)
    } catch {
        return api.error(res, "Internal Server Error", 500)
    }
}


module.exports = {
    getAllOutputParts,
    getOutputByOutputId,
    getOutputByPartId,
    insertOutputPart,
    updateByOutputId,
    softDelete,
    totalRemainOutByPartId,
    totalRemainInByPartId,
    getDetailOutput,
    getTotalPrice,
};

const model = require("../../model/output.model")
const userModel = require("../../model/user.model")
const partModel = require("../../model/parts.model")
const api = require("../../tools/common");
const {sendNotification} = require ('./../../services/NotificationService')

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
    let dataUser = await userModel.getById(req.body.id_user) // Get data user
    let dataPart = await partModel.getById(req.body.part_id) // Get data part
    const newData = req.body
    try{
        const data = await model.insert(newData)
        sendNotification('requestApproval', {
            id_line: dataUser[0].id_line,
            user_name: dataUser[0].nama_user,
            description: dataPart[0].description,
            part_number: dataPart[0].part_number,
            stock_in: newData.stock_in || '0',
            stock_out: newData.stock_out || '0',
            status: 'Request Approval',
            keterangan: newData.keterangan
        })
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

const updatePartStatus = async (req, res) => {
    const outputId = req.params.outputId;
    const { status, comment } = req.body;
  
    try {
      // Update the status of the output part in the database
      const updatedOutput = await model.update(outputId, { status, comment });
  
      // Check if the output was updated successfully
      if (updatedOutput) {
        return api.ok(res, updatedOutput);
      } else {
        return api.error(res, "Output part not found", 404);
      }
    } catch (error) {
      console.error(error);
      return api.error(res, "Internal Server Error", 500);
    }
  };

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
    updatePartStatus
};

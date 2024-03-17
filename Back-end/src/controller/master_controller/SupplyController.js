const model = require("../../model/supply.model");
const api = require("../../tools/common");

getSupplyById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getAllSupplies = async (req, res) => {
    let data = await model.getSupplyWithArea();
    return api.ok(res, data);
}

getSuppliesByArea = async (req, res) => {
    const area = req.params.area;
    let data = await model.getSupplyByArea(area);
    return api.ok(res, data);
}

insertSupply = async (req, res) => {
    try {
        const existingSupply = await model.getSupplyByMaterialAndArea(req.body.form_data.no_material, req.body.form_data.id_area);

        if (existingSupply.length > 0) {
            // Data dengan no_material yang sama di area yang sama sudah ada
            return api.error(res, "Data with the same no_material and id_area already exists.", 400);
        }

        const data = await model.insertSupplyWithArea(req.body.form_data);
        return api.ok(res, data);
    } catch (error) {
        console.error("Error inserting supply:", error);
        return api.error(res, "Internal Server Error", 500);
    }
}


updateSupply = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

softDelete = async (req, res) => {
    const data = req.body;
    if (!isNaN(req.params.id)) {
        try {
            const softDelete = await model.softDelete(req.params.id, data);
            return api.ok(res, softDelete);
        } catch (error) {
            return api.error(res, "Filed to softdelete", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
  };

getAmountSupply = async (req, res) => {
    let data = await model.getAmountSupply();
    return api.ok(res, data);
}

module.exports = {
    getSupplyById,
    getAllSupplies,
    getSuppliesByArea,
    insertSupply,
    updateSupply,
    softDelete,
    getAmountSupply
};

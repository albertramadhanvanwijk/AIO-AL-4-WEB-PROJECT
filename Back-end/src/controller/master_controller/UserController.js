const userModel = require("../../model/user.model");
const api = require("../../tools/common");

const getUserById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        try {
            const data = await userModel.getById(req.params.id);
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};
const getUserByRoleId = async (req, res) => {
    if (!isNaN(req.params.id)) {
        try {
            const data = await userModel.getByRoleId(req.params.id);
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};
const getSpv = async (req, res) => {
    const id = req.params.id;
    const groupId = req.params.groupId;
    try {
        const data = await userModel.getSpv(id, groupId);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};
const getUserByTeamId = async (req, res) => {
    if (!isNaN(req.params.id)) {
        try {
            const data = await userModel.getByIdTeam(req.params.id);
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};

const getUserByAreaId = async (req, res) => {
    const areaId = req.params.areaId;
    const groupId = req.params.groupId;
    const idLine = req.params.idLine; // Tambahkan ini untuk mengambil id_line dari request
    if (!isNaN(areaId, groupId)) {
        try {
            const data = await userModel.getByAreaId(areaId, groupId, idLine); // Sertakan id_line sebagai argumen
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const data = await userModel.getUser();
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const insertUser = async (req, res) => {
    try {
        const data = await userModel.insert(req.body);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const updateUser = async (req, res) => {
    try {
        const data = await userModel.update(req.params.id, req.body);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const deleteUser = async (req, res) => {
    if (!isNaN(req.params.id)) {
        try {
            const data = await userModel.deleteData(req.params.id);
            return api.ok(res, data);
        } catch (error) {
            return api.error(res, "Internal Server Error", 500);
        }
    } else {
        return api.error(res, "Bad Request", 400);
    }
};

const getAllRole = async (req, res) => {
    try {
        const data = await userModel.getAllRole();
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const getAllLine = async (req, res) => {
    try {
        const data = await userModel.getAllLine();
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const getAllTeam = async (req, res) => {
    try {
        const data = await userModel.getAllTeam();
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

module.exports = {
    getUserById,
    getAllUsers,
    insertUser,
    updateUser,
    deleteUser,
    getUserByAreaId,
    getUserByTeamId,
    getUserByRoleId,
    getSpv,
    getAllRole,
    getAllTeam,
    getAllLine
};

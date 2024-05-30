const project = require('./../database/project.config');

const getAll = async () => await project.select('*').from('visitor');

const getById = async (id) => await project.select('*').from('visitor').where('id_visitor', id);

const insert = async (data) => await project('visitor').insert(data);

const update = async (id, data) => await project('visitor').where('id_visitor', id).update(data);

const deleteData = async (id) => await project('visitor').where('id_visitor', id).del();

const getByAreaId = async (areaId, groupId) => await project.select('*').from('visitor').where('id_area', areaId).where('group_id', groupId);

const getByIdTeam = async (id) => await project.select('*').from('visitor').where('group_id', id);

const getByRoleId = async (id) => await project.select('*').from('visitor').where('role_id', id);

const getSpv = async (id, groupId) => await project.select('*').from('visitor').where('role_id', id).andWhere('group_id', groupId);

const getUser = async () => {
    return await project.raw(`
    SELECT
    visitor.date,
    visitor.nama_tamu,
    visitor.nama_vendor,
    visitor.id_card_hijau,
    visitorrole.id_card_merah,
    visitor.pic,
    visitor.jam_masuk,
    visitor.jam_keluar,
    area.nama_area
  FROM visitor
  INNER JOIN visitorrole ON visitor.role_id = visitorrole.role_id
  INNER JOIN area ON visitor.id_area = area.id_area
  ORDER BY visitor.id_visitor;
  
    `);
};

const getAllRole  = async () => await project.select('*').from('visitorrole');

const getAllLine  = async () => await project.select('*').from('line');

const getAllTeam = async () => {
  return await project.raw(`
SELECT team.*, visitor.nama_visitor
FROM team
INNER JOIN visitor ON team.id_visitor = visitor.id_visitor;

`);
};

const getSpvByLine = async (id, idLine) => await project.select('*').from('visitor').where('role_id', id).andWhere('id_line', idLine);

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
    getByAreaId,
    getByIdTeam,
    getByRoleId,
    getSpv,
    getUser,
    getAllRole,
    getAllTeam,
    getAllLine,
    getSpvByLine
};

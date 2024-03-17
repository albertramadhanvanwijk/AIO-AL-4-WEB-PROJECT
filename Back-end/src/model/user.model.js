const project = require('./../database/project.config');

const getAll = async () => await project.select('*').from('user');

const getById = async (id) => await project.select('*').from('user').where('id_user', id);

const getByRoleId = async (id) => await project.select('*').from('user').where('role_id', id);

const getSpv = async (id, groupId) => await project.select('*').from('user').where('role_id', id).andWhere('group_id', groupId);

const getByIdTeam = async (id) => await project.select('*').from('user').where('group_id', id);

const getByAreaId = async (areaId, groupId) => await project.select('*').from('user').where('id_area', areaId).where('group_id', groupId);

const insert = async (data) => await project('user').insert(data);

const update = async (id, data) => await project('user').where('id_user', id).update(data);

const deleteData = async (id) => await project('user').where('id_user', id).del();

const getAllRole  = async () => await project.select('*').from('userrole');

const getAllLine  = async () => await project.select('*').from('line');

const getAllTeam = async () => {
  return await project.raw(`
SELECT team.*, user.nama_user
FROM team
INNER JOIN user ON team.id_user = user.id_user;

`);
};

const getUser = async () => {
    return await project.raw(`
    SELECT
    user.id_user,
    user.nama_user,
    user.nik,
    user.id_area,
    userrole.name,
    area.nama_area
  FROM user
  INNER JOIN userrole ON user.role_id = userrole.role_id
  INNER JOIN area ON user.id_area = area.id_area
  ORDER BY user.id_user;
  
    `);
};



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
    getAllLine
};

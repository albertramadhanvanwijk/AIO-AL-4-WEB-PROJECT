const project = require('./../database/project.config');

const getAll = async () => await project.select('*').from('area');

const getById = async (id) => await project.select('*').from('area').where('id_area', id);

const insert = async (data) => await project('area').insert(data);

const update = async (id, data) => await project('area').where('id_area', id).update(data);

const deleteData = async (id) => await project('area').where('id_area', id).del();

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
   
};

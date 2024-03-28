const project = require('./../database/project.config');

const getAll = async () => await project.select('*').from('category');

const getById = async (id) => await project.select('*').from('category').where('id_category', id);

const insert = async (data) => await project('category').insert(data);

const update = async (id, data) => await project('category').where('id_category', id).update(data);

const deleteData = async (id) => await project('category').where('id_category', id).del();

module.exports = {
    getAll,
    getById,
    insert,
    update,
    deleteData,
    
};

const project = require('./../database/project.config');

const create = async (data) => await project('approval').insert(data);

const getById = async (id) => await project
    .select('*')
    .from('approval')
    .where('approval_id', '=', id)
    .first();

const update = async (id, data) => await project('approval')
    .where('approval_id', '=', id)
    .update(data);

const remove = async (id) => await project('approval')
    .where('approval_id', '=', id)
    .del();

module.exports = {
    create,
    getById,
    update,
    remove
};
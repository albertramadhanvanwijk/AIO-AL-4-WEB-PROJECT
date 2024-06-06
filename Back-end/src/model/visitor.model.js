const project = require('./../database/project.config');

const getAll = async () => await project.select('*').from('visitor');

const insert = async (data) => await project('visitor').insert(data);

const update = async (id, data) => await project('visitor').where('id', id).update(data);

const deleteData = async (id) => await project('visitor').where('id', id).delete();

const getVisitor = async () => {
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


module.exports = {
    insert,
    update,
    deleteData,
    getVisitor,
    getAll
};

const project = require('./../database/project.config');

const getAll = async () => await project
    .select('p.part_id', 'p.id_area', 'p.part_number', 'p.description', 'p.qty_stock', 'p.price', 'p.refurbished_at', 'p.is_deleted', 'p.created_at', 'p.update_at', 'a.nama_area')
    .from('parts as p')
    .join('area as a', 'p.id_area', 'a.id_area')
    
const getById = async (partId) => await project
    .select('*')
    .from('parts')
    .where('part_id', '=', partId);

const insert = async (data) => await project('parts').insert(data);

const update = async (partId, data) => await project('parts')
    .where('part_id', '=', partId)
    .update(data);

const sofDelete = async (partId, data) => await project('parts')
    .where('part_id', '=', partId)
    .update(data);

const getByAreaId = async (areaId) => await project
    .select('p.part_id', 'p.id_area', 'p.part_number', 'p.description', 'p.qty_stock', 'p.price','p.image', 'p.place', 'p.refurbished_at', 'p.is_deleted', 'p.created_at', 'p.update_at', 'a.nama_area')
    .from('parts as p')
    .join('area as a', 'p.id_area', 'a.id_area')
    .where('p.id_area', '=', areaId);

const totalPartGroupByArea = async() => await project('parts')
    .select('id_area')
    .count('* as jumlah_part')
    .where('is_deleted', 0)
    .groupBy('id_area')

const getAllStockRemain = async () => await project
  .select('a.id_area', 'p.description', 'p.part_id', 'p.is_deleted')
  .select(project.raw('SUM(IFNULL(op.total_stock_in, 0) - IFNULL(op.total_stock_out, 0)) as stock_remain'))
  .from('area as a')
  .innerJoin('parts as p', 'a.id_area', 'p.id_area')
  .leftJoin(
    project
      .select('part_id')
      .sum('stock_in as total_stock_in')
      .sum('stock_out as total_stock_out')
      .from('output_part')
      .groupBy('part_id')
      .as('op'),
    'p.part_id',
    'op.part_id'
  )
  .groupBy('a.id_area', 'p.part_id');


module.exports = {
    getAll,
    getById,
    insert,
    update,
    sofDelete,
    getByAreaId,
    totalPartGroupByArea,
    getAllStockRemain
}
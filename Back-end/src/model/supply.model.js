const project = require('./../database/project.config');

const getAll = async () => await project.select('*').from('supply');

const getById = async (id) => await project.select('*').from('supply').where('id_supply', id);

const getByIdtransaction = async (id) => await project.select('*').from('supply').where('id_supply', id).first();

const insert = async (data) => await project('supply').insert(data);

const update = async (id, data) => await project('supply').where('id_supply', id).update(data);

const softDelete = async (id, data) => await project('supply').where('id_supply', id).update(data);

const getSupplyWithArea = async () => {
  return await project.raw(`
  SELECT 
  supply.id_supply,
  supply.nama_supply,
  area.nama_area,
  supply.stok,
  supply.no_material,
  supply.eom,
  supply.minimal_stok,
  supply.max_stok,
  supply.resv_date,
  supply.is_deleted
  FROM 
  supply
  INNER JOIN 
  area ON supply.id_area = area.id_area
  WHERE 
  supply.is_deleted = 0;
        `);
};

const getSupplyByArea = async (area) => {
  return await project
    .select(
      'supply.id_supply',
      'supply.nama_supply',
      'area.nama_area',
      'supply.stok',
      'supply.no_material',
      'supply.eom',
      'supply.minimal_stok',
      'supply.max_stok',
      'supply.resv_date'
    )
    .from('supply')
    .innerJoin('area', 'supply.id_area', 'area.id_area')
    .where('area.id_area', area);
};

const insertSupplyWithArea = async (data) => {
  return await project('supply').insert(data);
};

const getAmountSupply = async () => {
  return await project.raw(`
  SELECT a.nama_area, COUNT(DISTINCT s.id_supply) as total_items
  FROM area a
  INNER JOIN supply s ON a.id_area = s.id_area
  WHERE s.is_deleted = 0
  GROUP BY a.nama_area;  
  `);
};

const getSupplyByMaterialAndArea = async (no_material, id_area) => {
  return await project
      .select('id_supply')
      .from('supply')
      .where('no_material', no_material)
      .andWhere('id_area', id_area)
      .andWhere('is_deleted', 0);
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  softDelete,
  getSupplyWithArea,
  getSupplyByArea,
  insertSupplyWithArea,
  getByIdtransaction,
  getAmountSupply,
  getSupplyByMaterialAndArea
};

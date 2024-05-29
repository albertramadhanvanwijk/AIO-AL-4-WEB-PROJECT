const project = require('./../database/project.config');

// const getAll = async () => await project.select(
//   'd.document_id','d.document_title', 'd.document_code', 'd.is_deleted', 'd.id_area',
//   'a.nama_area', 'v.video_url', 'v.video_title', 'u.completed', 'u.id_user'
// )
// .from('document as d')
// .join('area as a', 'd.id_area', '=', 'a.id_area')
// .leftJoin('videos as v', 'd.document_id', '=', 'v.document_id')
// .leftJoin('userProgress as u', 'd.document_id', '=', 'u.document_id');
const getAll = async () => await project
  .select('d.document_id','d.document_title', 'd.document_code', 'd.is_deleted', 'd.id_area', 'd.filename', 'a.nama_area')
  .from('document as d')
  .join('area as a', 'd.id_area', '=', 'a.id_area')

const getById = async (id) => await project.select(
  'd.document_id','d.document_title', 'd.document_code', 'd.is_deleted', 'd.id_area','d.filename',
'a.nama_area', 'v.video_url', 'v.video_title', 'u.completed', 'u.id_user'
).from('document as d').join('area as a', 'd.id_area', '=', 'a.id_area')
.leftJoin('videos as v', 'd.document_id', '=', 'v.document_id')
.leftJoin('userProgress as u', 'd.document_id', '=', 'u.document_id').where('d.document_id', id);

const insert = async (data) => {
  try {
    const insertedDocumentIds = await project('document').insert(data.documentData);
    const insertedVideoIds = await project('videos').insert(data.videoData);
    // const insertedUserProgressIds = await project('userProgress').insert(data.userProgressData);

    return {
      success: true,
      insertedDocumentIds,
      insertedVideoIds
      // insertedUserProgressIds
    };
  } catch (error) {
    console.error('Error inserting data:', error);
    return { success: false, error };
  }
};

const update = async (id, data) => {
  try {
    const updatedDocumentIds = await project('document').where('document_id', id).update(data.documentData);
    const updatedVideoIds = await project('videos').where('document_id', id).update(data.videoData);

    return { success: true, updatedDocumentIds, updatedVideoIds};
  } catch (error) {
    console.log('Error updating data:', error);
    return {success: false, error};
  }
};

const softDelete = async (id, data) => await project('document').where('document_id', id).update(data);

const getUpArea = async () => {
  return await project.select(
    'dp.userProgress_id',
    'dp.id_user',
    'dp.document_id',
    'dp.completed',
    'doc.document_id as doc_id',
    'doc.id_area',
    'doc.document_title',
    'doc.document_code',
    'doc.filename',
    'doc.is_deleted'
  )
  .from('userProgress as dp')
  .innerJoin('document as doc', 'dp.document_id', 'doc.document_id')
};


const getByAreaId = async (id) => await project.select(
  'd.document_id', 'd.document_title', 'd.id_area', 'd.is_deleted', 'd.document_code', 'd.filename',
  'a.nama_area'
)
.from('document as d')
.join('area as a', 'd.id_area', '=', 'a.id_area')
.where('d.id_area', id);

const getDocumentCountByArea = async (id_area) => await project('document')
  .count('document_id as document_count')
  .where('id_area', '=', id_area)
  .first();


module.exports = {
  getAll,
  getById,
  insert,
  getByAreaId,
  getDocumentCountByArea,
  getUpArea,
  update,
  softDelete
};

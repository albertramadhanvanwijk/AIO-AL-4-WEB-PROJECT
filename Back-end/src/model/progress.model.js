const project = require('./../database/project.config');

const getByUserId = async (userId) => await project.select('*').from('userprogress').where('id_user', userId);

const getUserProgressByArea = async (areaId, userId) => {
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
      'v.video_url',
      'doc.is_deleted'
    )
    .from('document as doc')
    .innerJoin('userProgress as dp', 'doc.document_id', 'dp.document_id')
    .leftJoin('videos as v', 'doc.document_id', 'v.document_id')
    .where('dp.id_user', userId)
    .andWhere('doc.id_area', areaId)
  };

  const calculateTotalCompletedForUser = async (userId, areaId) => {
     const result = await project('userprogress')
        .join('document', 'userprogress.document_id', 'document.document_id')
        .join('area', 'document.id_area', 'area.id_area')
        .count('userprogress.completed as totalCompleted')
        .where('userprogress.id_user', userId)
        .andWhere('area.id_area', areaId)
        .andWhere('userprogress.completed', 1)
        .first();

    return result.totalCompleted;
};

const getTotalDocumentsInArea = async (areaId) => {
  const result = await project('document')
      .count('* as totalDocuments')
      .where('id_area', areaId)
      .first();

  return result.totalDocuments;
};

const calculatePercentageCompletedForUser = async (userId, areaId) => {
  const totalCompleted = await calculateTotalCompletedForUser(userId, areaId);
  const totalDocuments = await getTotalDocumentsInArea(areaId);

  const percentageCompleted = (totalCompleted / totalDocuments) * 100;
  const roundedPercentage = Math.round(percentageCompleted * 10 ** 0) / 10 ** 0;
  

  return roundedPercentage;
};


  const update = async (document_id, id_user, data) => {
    return await project('userProgress')
      .where('document_id', document_id)
      .andWhere('id_user', id_user)
      .update(data);
};

const insert = async(data) => {
  return await project('userProgress').insert(data);
}

const calculateTotalCompletedForGroup = async (groupId) => {
 const result = await project
    .select('up.id_user',
            'up.document_id',
            'up.completed',
            'u.id_user as u_id_user',
            'u.nama_user',
            'u.nik',
            'u.password',
            'u.role_id',
            'u.id_area',
            'u.group_id as u_group_id',
            't.group_id as t_group_id',
            't.id_user as t_id_user')
    .from('userprogress as up')
    .count('up.completed as totalCompleted')
    .join('user as u', 'up.id_user', '=', 'u.id_user')
    .join('team as t', 'u.group_id', '=', 't.group_id')
    .where('t.group_id', groupId)
    .andWhere('up.completed', 1)
    .first();

    return result.totalCompleted;
};

const getTotalDocumentsForGroup = async (groupId) => {
  const result = await project('document')
    .count('* as totalDocuments')
    .where('document_id', 'IN', function () {
      this.select('document_id')
        .from('team')
        .where('group_id', groupId);
    })
    .first();

  return result.totalDocuments;
};

const getTotalUsersInGroup = async(groupId) =>{
  const result = await project('user as u')
  .count('* as totalUsers')
  .where('u.group_id', groupId)
  .first();
  if (!result || isNaN(result.totalUsers)) {
    return 0; // Atau nilai default lainnya jika tidak ada pengguna ditemukan
  }
  return result.totalUsers - 1;
}

const calculatePercentageCompletedForGroup = async (groupId) => {
  const totalCompleted = await calculateTotalCompletedForGroup(groupId);
  const totalDocuments = await getTotalDocumentsForGroup(groupId);
  const totalUsers = await getTotalUsersInGroup(groupId);

  if (totalDocuments === 0) {
    return 0;
  }

  const totalProgress = totalCompleted / totalUsers;
  const percentageCompleted = (totalProgress / totalDocuments) * 100;
  const roundedPercentage = Math.round(percentageCompleted * 10 ** 0) / 10 ** 0;

  return roundedPercentage;
  // return percentageCompleted;
};

const percentageByGroup = async (groupId) => {
  return await project
  .select('u.nama_user', 'u.group_id', 'a.nama_area')
  .select(
    project.raw('ROUND(SUM(up.completed) / COUNT(d.document_id) * 100) AS total_persentase')
  )
  .from('user as u')
  .join('team as t', 'u.group_id', 't.group_id')
  .join('area as a', 'u.id_area', 'a.id_area')
  .join('userprogress as up', 'u.id_user', 'up.id_user')
  .join('document as d', 'up.document_id', 'd.document_id')
  .where('u.group_id', groupId) // Filter berdasarkan group_id yang diinginkan
  .groupBy('u.nama_user', 'u.group_id', 'a.nama_area')
}

const persentageByTeamInGroup = async (groupId, areaId) => {
  return await project
  .select(
    'u.nama_user',
    'u.group_id',
    'a.nama_area',
    project.raw('ROUND(SUM(up.completed) / COUNT(d.document_id) * 100) AS total_persentase')
  )
  .from('user as u')
  .join('team as t', 'u.group_id', 't.group_id')
  .join('area as a', 'u.id_area', 'a.id_area')
  .join('userprogress as up', 'u.id_user', 'up.id_user')
  .join('document as d', 'up.document_id', 'd.document_id')
  .where('u.group_id', groupId)
  .andWhere('u.id_area', areaId)
  .groupBy('u.nama_user', 'u.group_id', 'a.nama_area')
}

const testing = async (groupId) => {
  return await project
  .select('u.nama_user', 'u.group_id', 'a.nama_area')
  .select(
    project.raw('ROUND(SUM(up.completed) / COUNT(d.document_id) * 100) AS total_persentase')
  )
  .from('user as u')
  .join('team as t', 'u.group_id', 't.group_id')
  .join('area as a', 'u.id_area', 'a.id_area')
  .join('userprogress as up', 'u.id_user', 'up.id_user')
  .join('document as d', 'up.document_id', 'd.document_id')
  .where('u.group_id', groupId) // Filter berdasarkan group_id yang diinginkan
  .groupBy('u.nama_user', 'u.group_id', 'a.nama_area')
}

  module.exports = {
    getUserProgressByArea,
    calculateTotalCompletedForUser,
    calculateTotalCompletedForGroup,
    getTotalDocumentsInArea,
    getTotalDocumentsForGroup,
    calculatePercentageCompletedForUser,
    calculatePercentageCompletedForGroup,
    update,
    insert,
    getTotalUsersInGroup,
    testing,
    percentageByGroup,
    persentageByTeamInGroup,
    getByUserId
  }
const progressModel = require("../../model/progress.model")
const api = require("../../tools/common");

const getUserProgressByUserId = async (req, res) =>{
  const userId = req.params.userId
  try{
    const data = await progressModel.getByUserId(userId);
    return api.ok(res, data)
  } catch {
    return api.error(res, "Internal error", 500)
  }
}

const getDocumentsByUserAndArea = async (req, res) => {
    const areaId = req.params.areaId;
    const userId = req.params.userId;
  
    if (!isNaN(areaId) && !isNaN(userId)) {
      try {
        const data = await progressModel.getUserProgressByArea(areaId, userId);
        return api.ok(res, data);
      } catch (error) {
        return api.error(res, "Internal Server Error", 500);
      }
    } else {
      return api.error(res, "Bad Request", 400);
    }
  };

  const calculateTotalCompletedForUser = async (req, res) => {
    const userId = req.params.userId;
    const areaId = req.params.areaId;

    try {
      const roundedPercentage = await progressModel.calculatePercentageCompletedForUser(userId, areaId);
      res.json({ roundedPercentage });
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

  const updateProgress = async (req, res) => {
    try {
        const { document_id, id_user } = req.params;
        const data = await progressModel.update(document_id, id_user, req.body);
        return api.ok(res, data);
    } catch (error) {
        return api.error(res, "Internal Server Error", 500);
    }
};

const insertProgress = async (req, res) => {
  try {
    const data = await progressModel.insert(req.body);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, "Failed to insert progress", 500);
  }
  
};

const calculatePercentageCompletedForGroup = async (req, res) => {
  const groupId = req.params.groupId;
  try {
    const persentase = await progressModel.calculatePercentageCompletedForGroup(groupId);
      res.json({ persentase });
  } catch (error) {
    return api.error(res, "Failed To Persentase Progress By Group")
  }
}

const testing = async (req, res) => {
  const groupId = req.params.groupId
  try{
    const data = await progressModel.testing(groupId);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, "Failed to get total users in group");
  }
}

const percentageByGroup = async (req, res) => {
  const groupId = req.params.groupId
  try{
    const data = await progressModel.percentageByGroup(groupId);
    return api.ok(res, data)
  }catch{
    return api.error("Data not found")
  }
}

const perceentageTeamByGroup = async (req, res) => {
  const groupId = req.params.groupId
  const areaId = req.params.areaId

  try{
    const data = await progressModel.persentageByTeamInGroup(groupId, areaId);
    return api.ok(res, data)
  }catch{
    return api.error("Data not found")
  }
}

const completedProgressUser = async (req, res) => {
  const userId = req.params.userId;
  const areaId = req.params.areaId;
  try {
    const totalCompleted = await progressModel.calculateTotalCompletedForUser(userId, areaId);
    res.json({ totalCompleted });
  } catch (error) {
      return api.error(res, "Internal Server Error", 500);
  }
}

  module.exports = {
    getDocumentsByUserAndArea,
    calculateTotalCompletedForUser,
    updateProgress,
    insertProgress,
    calculatePercentageCompletedForGroup,
    testing,
    percentageByGroup,
    perceentageTeamByGroup,
    completedProgressUser,
    getUserProgressByUserId
  }
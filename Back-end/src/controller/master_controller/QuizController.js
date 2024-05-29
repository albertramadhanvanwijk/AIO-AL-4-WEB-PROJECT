const model = require("../../model/quiz.model");
const api = require("../../tools/common");

// Question
const getAllQuestions = async (req, res) => {
  try {
    let data = await model.getAllQuestion();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const getAllQuestionByAreaID = async (req, res) => {
  const { areaID } = req.params;
  try {
    let data = await model.getAllByAreaId(areaID);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getQuestionById(id);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const addQuestion = async (req, res) => {
  const newData = req.body;
  const newQuestion = {
    question_text: newData.question_text,
    id_area: newData.id_area,
  };
  try {
    let question = await model.addNewQuestion(newQuestion);
    const dataScore = {
      question_id: question[0],
      score: newData.score,
    };
    let score = await model.addScore(dataScore);
    let data = [question, score];
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const updateQuestion = async (req, res) => {
  const { questionID } = req.params;
  const newQuestion = req.body;
  try {
    let data = await model.updateQuestion(questionID, newQuestion);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

// ANSWER
const getAnswerByQuestion = async (req, res) => {
  const { questionID } = req.params;
  try {
    let data = await model.getAnswerByQuestionId(questionID);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const getAnswerById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getAnswerById(id);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const addAnswer = async (req, res) => {
  const newAnswer = req.body;
  try {
    let data = await model.addAnswer(newAnswer);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
const updateAnswer = async (req, res) => {
  const { answerID } = req.params;
  const newAnswer = req.body;
  try {
    let data = await model.updateAnswer(answerID, newAnswer);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

// RESULT
const addResultByUserID = async (req, res) => {
  const newResult = req.body;
  try {
    let data = await model.addResult(newResult);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

const getTotalScoreByUserID = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.totalResultByUserID(id);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

module.exports = {
  getAllQuestions,
  getAllQuestionByAreaID,
  addQuestion,
  updateQuestion,
  updateAnswer,
  getAnswerByQuestion,
  addAnswer,
  getQuestionById,
  getAnswerById,
  addResultByUserID,
  getTotalScoreByUserID,
};

const project = require("./../database/project.config");

// QUESTION
const getAllQuestion = async () =>
  await project
    .select(
      "q.question_id",
      "q.question_text",
      "q.id_area",
      "q.is_deleted",
      "ar.nama_area"
    )
    .from("questions as q")
    .join("area as ar", "ar.id_area", "q.id_area")
    .where("q.is_deleted", 0);

const getQuestionById = async (id) => {
  const question = await project
    .select(
      "q.question_id",
      "q.question_text",
      "q.id_area",
      "q.is_deleted",
      "ar.nama_area",
      "an.answer_id",
      "an.answer_text",
      "an.status"
    )
    .from("questions as q")
    .join("area as ar", "ar.id_area", "q.id_area")
    .leftJoin("answer as an", "an.question_id", "q.question_id")
    .where("q.question_id", id)
    .andWhere("q.is_deleted", 0);

  // Mengelompokkan jawaban ke dalam objek pertanyaan
  const questionWithAnswer = question.reduce((acc, curr) => {
    if (!acc) {
      acc = {
        ...curr,
        answer: [],
      };
    }
    acc.answer.push({
      answer_id: curr.answer_id,
      answer_text: curr.answer_text,
      status: curr.status,
    });
    return acc;
  }, null);

  return questionWithAnswer;
};

const getAllByAreaId = async (areaID) => {
  const questions = await project
    .select(
      "q.question_id",
      "q.question_text",
      "q.id_area",
      "q.is_deleted",
      "ar.nama_area",
      "an.answer_id",
      "an.answer_text",
      "an.status",
      "s.score"
    )
    .from("questions as q")
    .join("area as ar", "ar.id_area", "q.id_area")
    .leftJoin("answer as an", "an.question_id", "q.question_id")
    .leftJoin("score as s", "s.question_id", "q.question_id")
    .where("q.id_area", areaID) // Memfilter pertanyaan berdasarkan area ID
    .andWhere("q.is_deleted", 0);

  // Mengelompokkan pertanyaan-pertanyaan berdasarkan ID
  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.question_id]) {
      acc[question.question_id] = {
        question_id: question.question_id,
        question_text: question.question_text,
        id_area: question.id_area,
        is_deleted: question.is_deleted,
        nama_area: question.nama_area,
        score: question.score,
        answers: [],
      };
    }
    if (question.answer_id) {
      // Jika jawaban ada (non-null), tambahkan ke pertanyaan yang sesuai
      acc[question.question_id].answers.push({
        answer_id: question.answer_id,
        answer_text: question.answer_text,
        status: question.status,
      });
    }
    return acc;
  }, {});

  // Ubah objek yang dikelompokkan menjadi array
  const questionsWithAnswers = Object.values(groupedQuestions);

  return {
    questionsWithAnswers,
  };
};

const addNewQuestion = async (data) => await project("questions").insert(data);
const updateQuestion = async (id, data) =>
  await project("questions").where("question_id", id).update(data);

const addScore = async (data) => await project("score").insert(data);

// ANSWER
const getAnswerByQuestionId = async (id) =>
  await project.select("*").from("answer").where("question_id", id);
const getAnswerById = async (id) =>
  await project("answer").where("answer_id", id);
const addAnswer = async (data) => await project("answer").insert(data);
const updateAnswer = async (id, data) =>
  await project("answer").where("answer_id", id).update(data);

// RESULT
const totalResultByUserID = async (id) =>
  await project("result").sum("score as totalScore").where("id_user", id);
const addResult = async (data) => await project("result").insert(data);

module.exports = {
  getAllQuestion,
  getAllByAreaId,
  addNewQuestion,
  updateQuestion,
  addAnswer,
  updateAnswer,
  getAnswerByQuestionId,
  getQuestionById,
  getAnswerById,
  addScore,
  addResult,
  totalResultByUserID,
};

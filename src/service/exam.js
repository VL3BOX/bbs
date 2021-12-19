import { $next } from "@jx3box/jx3box-common/js/https";

//
function getExamPaperList(params) {
  return $next().get("/api/question/user-exam-paper", {
    params,
  });
}

function getExamQuestionList(params) {
  return $next().get("api/question/public-list", {
    params,
  });
}

function getPaper(examid) {
  return $next({ proxy: true }).get(
    "api/question/user-exam-paper/" + examid + "?details"
  );
}

function getQuestion(examid) {
  return $next({ proxy: true }).get("api/question/" + examid + "/no-answer");
}

function submitAnswer(examid, answers, force = false) {
  return $next({ proxy: true }).post(
    `api/question/user-exam-paper/${examid}/i-finish-all${
      force ? "?force" : ""
    }`,
    answers
  );
}

function getAnswer(examid) {
  return $next({ proxy: true }).post(
    `api/question/user-exam-paper/${examid}/i-need-answer`
  );
}

export {
  getExamPaperList,
  getExamQuestionList,
  getPaper,
  getQuestion,
  submitAnswer,
  getAnswer,
};

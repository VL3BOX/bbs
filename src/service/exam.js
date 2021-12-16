import { $next } from "@jx3box/jx3box-common/js/https";

//
function getExamPaperList(params) {
    return $next().get("/api/question/user-exam-paper", {
        params,
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

function getExamQuestionList(params) {
    return $next().get("api/question/public-list", {
        params,
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}



export { getExamPaperList ,getExamQuestionList};

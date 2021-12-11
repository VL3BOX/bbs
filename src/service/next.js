import { $next } from "@jx3box/jx3box-common/js/https";
function getLikes(params) {
    return $next().get(`/api/summary/batch`, {
        params,
    });
}

export {getLikes}
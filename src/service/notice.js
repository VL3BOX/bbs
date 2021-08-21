import { $cms } from "@jx3box/jx3box-common/js/https";

function push(data) {
    return $cms().post(`/api/cms/post`, data);
}

export { push }
import { $helper } from "@jx3box/jx3box-common/js/https";
import qs from "qs";

function getCollection($collection_id, params = {}) {
    return $helper()({
        method: "GET",
        url: `/api/post/collection/${$collection_id}`,
        params: params,
    });
}

function getCollections(params) {
    return $helper()({
        method: "GET",
        url: `/api/post/collections`,
        params: params,
    });
}

function removeCollection(collection_id) {
    return $helper()({
        method: "PUT",
        url: `/api/post/collection/remove`,
        data: qs.stringify({ id: collection_id }),
    });
}

function getMenus(key){
    return $helper()({
        method: "GET",
        url: `/api/menu_group/${key}`,
    });
}

export { getCollection, getCollections, removeCollection, getMenus };

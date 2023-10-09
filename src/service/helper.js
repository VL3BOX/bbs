import { $helper, $cms } from "@jx3box/jx3box-common/js/https";

function getCollections(params) {
    return $cms()({
        method: "GET",
        url: `/api/cms/post/collection`,
        params: params,
    });
}

function removeCollection(collection_id) {
    return $cms()({
        method: "DELETE",
        url: `/api/cms/post/collection/${collection_id}`,
    });
}

function getCollection($collection_id) {
    return $cms()({
        method: "GET",
        url: `/api/cms/post/collection/${$collection_id}`
    });
}

function updateCollection(id, data){
    return $cms().put(`/api/cms/post/collection/${id}`, data);
}

function getMenus(key){
    return $helper()({
        method: "GET",
        url: `/api/menu_group/${key}`,
    });
}

export { getMenus, getCollections, removeCollection, getCollection, updateCollection };

import { $cms } from "@jx3box/jx3box-common/js/https";

function getMenu(key) {
    return $cms().get(`/api/cms/config/menu/${key}`);
}

function getAuthorInfo(){
    
}

export { getMenu,getAuthorInfo };

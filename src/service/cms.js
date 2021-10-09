import { $cms,$next } from "@jx3box/jx3box-common/js/https";

function getMenu(key) {
    return $cms().get(`/api/cms/config/menu/${key}`);
}

function getJokes() {
    return $next({ mute: true }).get(`/api/joke/recommended`);
}

export { getMenu,getJokes };

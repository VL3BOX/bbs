import { $helper } from "@jx3box/jx3box-common/js/https";

function getMenus(key){
    return $helper()({
        method: "GET",
        url: `/api/menu_group/${key}`,
    });
}

export { getMenus };

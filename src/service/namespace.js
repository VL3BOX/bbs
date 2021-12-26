import { $helper } from "@jx3box/jx3box-common/js/https";

// 获取公开命名空间列表
function getNamespaceList(params) {
    return $helper().get("/api/namespaces", {
        params,
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

export { getNamespaceList };

function getAppID() {
    let arr = location.hash.slice(2).split("/");
    let id = 0;
    for (let i = arr.length - 1; i > -1; i--) {
        if (arr[i] && !isNaN(arr[i])) {
            id = arr[i];
            break;
        }
    }
    return id;
}

function getAppType(){
    let arr = location.hash.slice(2).split("/");
    return arr?.[0]
}

export { getAppID,getAppType };

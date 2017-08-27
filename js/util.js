/**
 * Created by cwh on 16-8-6.
 */
function getId() {
    return location.search.split("=")[1]
}

function getStorage () {
    storage = window.localStorage;
    stu_id = storage.getItem("stu_id");
    token = storage.getItem("token");
    tid = storage.getItem("tid");
}


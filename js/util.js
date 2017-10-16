/**
 * Created by cwh on 16-8-6.
 */
function getId() {
    return location.search.split("=")[1]
}

function getStorage () {
    storage = window.localStorage;
    login_id = storage.getItem("login_id");
    token = storage.getItem("token");
    role = storage.getItem("role");
}

function ismypage() {
    var page_id = getId();
    var login_id = storage.getItem("login_id");
    return page_id == login_id;
}

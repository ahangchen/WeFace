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


/**
 * Created by jewel on 16/9/22.
 */
$(document).ready(function(){
    //得到参数数组

    function getUrlVars(){

        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    //得到指定参数的value
    function getUrlVar(name){
        return getUrlVars()[name];
    }
    var stu_id = getUrlVar("stu_id");
    var wefaceBace_site = "http://110.64.69.101:8080/";
    if(stu_id){
        $('.toIndexLink').attr('href',wefaceBace_site + "main/updatedIndex.html?stu_id=" + stu_id);
    }
    else {
        $('.toIndexLink').attr('href',wefaceBace_site + "main/updatedIndex.html");
    }



});
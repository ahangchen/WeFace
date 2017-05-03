// 穗珠修改的内容，暂时用一个闭包包着
function getUrlVars() {

    let vars = [], hash;
    let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

//得到指定参数的value
function getUrlVar(name) {
    return getUrlVars()[name];
}
$(document).ready(function () {

    const circle_map = [
        {inner: '#84C9B6', outer: '#CFE5DE', point: {x: 274, y: 142}, radius: 50},
        {inner: '#F4AAAB', outer: '#F7DBDA', point: {x: 200, y: 40}, radius: 55},
        {inner: '#D8AFD1', outer: '#EADCEA', point: {x: 165, y: 130}, radius: 80},
        {inner: '#C3AD96', outer: '#E2DACF', point: {x: 46, y: -120}, radius: 66},
        {inner: '#F6C97A', outer: '#F6DAAA', point: {x: 0, y: 0}, radius: 120},
        {inner: '#8ED2E9', outer: '#D3EAF1', point: {x: -26, y: -100}, radius: 80},
        {inner: '#98CD7F', outer: '#D6E5CA', point: {x: 0, y: 0}, radius: 60},
        {inner: '#DDB079', outer: '#EFDDC9', point: {x: -10, y: -30}, radius: 55},
    ];
    const circle_pos = [4, 2, 5, 3, 6, 1, 7, 0];
    let skills_arr = [];
    let save_skill_error = -1;

    //关于作品集的相关数据
    const work_type_map = ['img', "audio", 'video'];
    let new_work_file = new FormData();
    let new_work_type = -1;
    let works_arr = [];
    // {
    //     works_id: 0,
    //         name: 'heiheihie',
    //     duty: 'sa',
    //     url: 'http://www.baidu.com',
    //     description: 'sa',
    //     img: '../../res/imgs/stu/complete.svg',
    //     audio: null,
    //     video: null
    // }
    let current_change_work = new FormData();
    let current_change_type = -1;

    updateSkills(false);
    initWorks();
    $('.skill').off("click");
    //如果url中出现token即可以显示编辑部分
    let token = getUrlVar('token');
    if (token) {
        let editBtn = $('.editable');
        let cancel_btns = $('.cancel-btn');
        let edit_div = $('.edit-container');
        let show_div = $('.show-container');
        $(editBtn[0]).click(() => {
            $('.skill').remove()
            $(edit_div[0]).css('display', 'block');
            $(show_div[0]).css('display', 'none');
            updateSkills(true)
        });
        $(editBtn[1]).click(() => {
            $(edit_div[1]).css('display', 'block');
            $('.editbar button').removeClass('hidden');
        });
        for (let i = 0; i < 2; i++) {
            //动态显示可用在上一部分
            $(editBtn[i]).css('visibility', 'visible');

            $(cancel_btns[i]).click(() => {
                $(edit_div[i]).css('display', 'none');
                $(show_div[i]).css('display', 'flex');
                updateSkills(false)
            })
        }
        //    对编辑技能进行的操作
        let add_skill_btns = $('.add-btn')[0];
        $('#save-skills').click(() => {
            if (save_skill_error > -1) {
                alert(`第${save_skill_error + 1}条技能保存失败`)
            } else {
                alert('保存成功');
                let edit_div = $('.edit-container')[0];
                let show_div = $('.show-container')[0];
                $(edit_div).css('display', 'none');
                $(show_div).css('display', 'flex');
                updateSkills(false);
            }

        });
        $(add_skill_btns).click(() => {
            let new_skill = {
                stu_id: getUrlVar('stu_id'),
                name: $('#skill-name').val(),
                value: $('#new_skill').val()
            };
            $.ajax({
                type: 'post',
                data: new_skill,
                url: cur_site + 'student/skill/add/',
                dataType: 'json',
                success: (data) => {
                    if (data.err === "0") {
                        alert('添加成功');
                        createNewSkill(new_skill);
                    } else {
                        $('.stu-skill .hint').css('display', 'block');
                        if (data.err === "-127") {
                            alert('技能评价已达上限');

                            console.log(data.msg)
                        } else {
                            console.log(data.msg)
                        }
                    }
                },
                error: err => console.log(err)
            })


        });
        $('#image_selector').change(() => {
            changeFile($('#image_selector'), 0, true);
        });
        $('#video_selector').change(() => {
            changeFile($('#video_selector'), 1, true);
        });
        $('#music_selector').change(() => {
            changeFile($('#music_selector'), 2, true);
        });
        $('#save-work').click(() => {
            new_work_file.append('stu_id', getUrlVar('stu_id'));
            $.ajax({
                type: 'post',
                url: cur_site + 'student/works/upload/',
                cache: false,
                processData: false,
                contentType: false,
                dataType: 'json',
                data: new_work_file,
                success: (data) => {
                    if (data.err === "0") {
                        let path = data.path;
                        addNewWork(path, new_work_type);
                    }
                }
            })
        })


    }




    function updateSkills(edit) {
        $.ajax({
            type: 'POST',
            data: {stu_id: getUrlVar('stu_id')},
            url: cur_site + 'student/skill/get/',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.err === "0") {
                    if (data.skill_list.length) {
                        skills_arr = data.skill_list;
                        let circles = $('.skill-circle');
                        let skill_bars = $('#skills');
                        skills_arr.map((item, index) => {
                            if (edit === false) {
                                updateCircle(circles[circle_pos[index]], index, item);
                            } else {
                                updateEditSkill(skill_bars, item, index);

                            }
                        });

                    }
                }
            }, error: function (err) {
                console.log(err)
            }
        })
    }

    function updateEditSkill(father, item, index) {
        $(father).append(`<div class="skill row">
                <div class="name col s3">${item.name}</div>
                <div class="col s8 level">
                    <p class="range-field">
                        <input type="range" id="skill_${index}" min="0" max="100" value="${parseInt(item.value)}"/>
                    </p>
                </div>
                <a class="delete-btn col s1">
                    <i class="material-icons">cancel</i>
                </a>
            </div>`)
        $($('.delete-btn')[index]).click((e) => {

            if (e.target.nodeName.toUpperCase() === 'I') {
                $.ajax({
                    type: 'POST',
                    data: {
                        stu_id: getUrlVar('stu_id'),
                        skill_id: skills_arr[index].skill_id
                    },
                    url: cur_site + 'student/skill/del/',
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.err === "0") {
                            alert('删除成功');
                            skills_arr.splice(index, 1);
                            console.log(skills_arr)
                            let skill_div = $(e.target).parents('.skill');
                            $(skill_div).remove();
                        } else {
                            alert('删除失败')
                        }
                    }, error: function (err) {
                        console.log(err)
                    }
                })
            }
        });
        $($('.level input')[index]).blur((e) => {
            skills_arr[index].value = $(`#skill_${index}`).val()
            $.ajax({
                type: 'POST',
                data: {
                    stu_id: getUrlVar('stu_id'),
                    skill_id: skills_arr[index].skill_id,
                    name: skills_arr[index].name,
                    value: skills_arr[index].value
                },
                url: cur_site + 'student/skill/update/',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if (data.err === "0") {
                        console.log('更改成功');
                    } else {
                        console.log('更改失败');
                        save_skill_error = index;
                    }
                }, error: function (err) {
                    console.log(err)
                }
            })
        })

    }


    function updateCircle(c, index, item) {
        let circle_seat = circle_map[circle_pos[index]];
        let inner_circle = $(c).children('.inner-circle');

        $(inner_circle).css({
            'width': circle_seat.radius * 2 * (parseInt(item.value) / 100).toFixed(2) + 'px',
            'height': circle_seat.radius * 2 * (parseInt(item.value) / 100).toFixed(2) + 'px',
            'border-radius': circle_seat.radius * (parseInt(item.value) / 100).toFixed(2) + 'px',
            'line-height': circle_seat.radius * (parseInt(item.value) / 100).toFixed(2) + 'px',
            'background-color': circle_seat.inner
        })
        let skill_text = $(inner_circle).children('p');
        $(skill_text[0]).html(item.name);
        $(skill_text[1]).html(item.value + '%');
        for (let i = 0; i < 2; i++) {
            $(skill_text[i]).css({
                'height': circle_seat.radius * ((parseInt(item.value) - 5) / 100).toFixed(2) + 'px',
                'font-size': circle_seat.radius * ((parseInt(item.value) - 20) / 100).toFixed(2) + 'px',
                'width': circle_seat.radius * 2 * ((parseInt(item.value) - 5) / 100).toFixed(2)
            })
        }
    }

    function createNewSkill(new_item) {
        skills_arr.push(new_item);
        $('#skills').append(`<div class="skill row">
                <div class="name col s3">${new_item.name}</div>
                <div class="col s8 level">
                    <p class="range-field">
                        <input type="range" id="skill_${skills_arr.length - 1}" min="0" max="100" value="${new_item.value}"/>
                    </p>
                </div>
                <a class="delete-btn col s1">
                    <i class="material-icons">cancel</i>
                </a>
            </div>`)
        console.log(skills_arr)
    }


    function addNewWork(file_url, type) {
        let new_work = {
            stu_id: getUrlVar("stu_id"),
            name: $('#work_name').val(),
            duty: $('#work_role').val(),
            url: $('#work_link').val(),
            description: $('#work_desc').val(),
            img: null,
            audio: null,
            video: null
        };
        new_work[work_type_map[type]] = file_url;
        console.log(new_work);

        $.ajax({
            type: 'POST',
            data: new_work,
            url: cur_site + 'student/works/add/',
            dataType: 'json',
            success: (data) => {
                if (data.err === "0") {
                    alert('添加成功');
                    new_work.works_id = data.works_id
                    works_arr.push(new_work);
                    updateNewWork(new_work, works_arr.length - 1);
                } else {
                    if (data.err === "-126") {
                        alert('作品数量已满');
                        console.log(data.msg)
                    } else {
                        console.log(data.msg)
                    }
                }
            },
            error: err => console.log(err)
        })
    }

    function changeFile(element, type, isAdd) {
        if (isAdd) {
            new_work_file.delete('works');
            new_work_type = type;
            new_work_file.append('works', $(element)[0].files[0]);
        } else {
            current_change_work.delete('works');
            current_change_type = type;
            current_change_work.append('works', $(element)[0].files[0])
        }
        let file_str = $(element).val().split('\\');
        $('#filename').html('上传的文件：' + file_str[file_str.length - 1]);

    }

    function initWorks() {
        $.ajax({
            type: 'POST',
            data: {stu_id: getUrlVar('stu_id')},
            url: cur_site + 'student/works/get/',
            dataType: 'json',
            success: (data) => {
                if (data.err === "0") {
                    works_arr = data.works_list;
                    data.works_list.map((work, index) => {
                        updateNewWork(work, index)
                    });
                    $('.editbar button').addClass('hidden')
                } else {
                    console.log(data.msg)
                }
            },
            error: err => console.log(err)
        })

    }

    function updateNewWork(work, index) {
        let show_element;
        if (work.img) {
            show_element = `<img src="${cur_media + work.img}" alt="作品图片">`
        } else if (work.audio) {
            let type;
            switch (work.audio.split('.')[1]) {
                case 'mp3':
                    type = 'audio/mpeg';
                    break;
                case 'ogg':
                    type = 'audio/ogg';
                    break;
            }
            show_element = `<audio controls="controls">
                    <source src=${cur_media + work.audio}" type=${type}>
                    Your browser does not support the audio element.
                </audio>`

        } else if (work.video) {
            let type;
            switch (work.video.split('.')[1]) {
                case 'mp4':
                    type = 'audio/mp4';
                    break;
                case 'ogg':
                    type = 'video/ogg';
                    break;
                case 'webm':
                    type = 'video/webm';
                    break;
            }
            show_element = `<video  controls="controls" >
                    <source src=${cur_media + work.video} type=${type} />
                    <object data=${cur_media + work.video} width="100%" height="400px">
                        <embed width="100%" height="400px" src=${cur_media + work.video} />
                    </object>
                </video>`
        }

        $($('.show-container')[1]).append(`<div class="work">
        <div class="work-content">
            <div class="work-file">
                ${show_element}
            </div>
            <div class="work-title">
                <div class="work-name">${work.name}</div>
                <div class="line">/</div>
                <div class="work-duty">${work.duty}</div>
                <div class="editbar">
                    <button class="edit-work "></button>
                    <button class="del-work "></button>
                </div>
                <div class="work-site">
                    <span class="edit-link"></span>
                <a class="work-link" href=${work.url}>${work.url}</a></div>
            </div>
            <p class="work-p">
                ${work.description}
            </p>
        </div>
        </div>`)
        $($('.del-work')[index]).click(() => {
            deleteWork(index)
        })
        $($('.edit-work')[index]).click(() => {
            editWork(index)
        })

    }

    function deleteWork(index) {
        $.ajax({
            type: 'POST',
            data: {
                stu_id: getUrlVar('stu_id'),
                works_id: works_arr[index].works_id
            },
            url: cur_site + 'student/works/del/',
            dataType: 'json',
            success: (data) => {
                if (data.err === "0") {
                    alert('删除成功');
                    $($('.work')[index]).remove();
                    works_arr.splice(index, 1)
                } else {
                    console.log(data.msg)
                }
            },
            error: err => console.log(err)
        })

    }

    // //测试代码
    // $('.edit-work').click(() => {
    //     editWork(0)
    // });
    function editWork(index) {
        //    @TODO 显示编辑页面
        $($('.work-content')[index]).css('display', 'none');
        $($('.work')[index]).append(`<div class="work-edit-container">
        <div class="input-field row">
            <input value=${works_arr[index].name} id="work_name${index}" type="text" class="validate" maxlength="20" >
            <label for="work_name" class="active">作品名称（20字以内）</label>
        </div>
        <div class="input-field row">
            <input id="work_role${index}" type="text" class="validate" maxlength="20" value=${works_arr[index].duty}>
            <label for="work_role" class="active">职责介绍（20字以内）</label>
        </div>
        <div class="input-field col s12">
            <textarea class="materialize-textarea" id="work_link${index}" type="text" class="validate"
                      maxlength="250" >${works_arr[index].url}</textarea>
            <label for="work_link" class="active">实际作品链接或地址（250字以内）</label>
        </div>
        <div>上传作品附件</div>
        <div class="upload-container">
            <div class="btn-container">
                <div class="upload-btn image-selector">
                    <input type="file" id="image_selector${index}" accept=".jpg,.png,.jpeg.jp3,.jp2">
                    <label for="image_selector"></label>
                </div>
                <p class="hint">(尺寸为800 * 450px)</p>
            </div>
            <div class="btn-container">
                <div class="upload-btn video-selector">
                    <input type="file" id="video_selector${index}" accept=".mp4,.ogg,.webm">
                    <label for="video_selector"></label>
                </div>
                <p class="hint">(大小在20M以内)</p>
            </div>
            <div class="btn-container">
                <div class="upload-btn music-selector">
                    <input type="file" id="music_selector${index}" accept=".mp3,.ogg,.mp2">
                    <label for="music_selector"></label>
                </div>
                <p class="hint">(大小在10M以内)</p>
            </div>
        </div>
        <div id="filename"></div>
        <div class="input-field col s12">
            <textarea placeholder="作品描述，请输入你在这个作品或者项目中主要做的工作以及相关的成果和绩效是什么，遇到了什么问题然后能够很好的解决，等等"
                      class="materialize-textarea" id="work_desc${index}" type="text" class="validate" >${works_arr[index].description}</textarea>
            <label for="work_desc" class="active">作品描述</label>
        </div>
        <div class="btn-bar">
            <button class="btn waves-effect waves-light save-btn">保存</button>
            <button class="btn waves-effect waves-light cancel-btn">取消</button>`)
        //    @TODO 上传更新的文件
        $(`#image_selector${index}`).change(() => {
            changeFile($(`#image_selector${index}`), 0);
        });
        $(`#video_selector${index}`).change(() => {
            changeFile($(`#video_selector${index}`), 1);
        });
        $(`#music_selector${index}`).change(() => {
            changeFile($(`#music_selector${index}`), 2);
        });
        $($('.work .save-btn')[index]).click(() => {
            current_change_work.append('stu_id', getUrlVar('stu_id'));
            $.ajax({
                type: 'post',
                url: cur_site + 'student/works/upload/',
                cache: false,
                processData: false,
                contentType: false,
                dataType: 'json',
                data: current_change_work,
                success: (data) => {
                    if (data.err === "0") {
                        let path = data.path;
                        updateWork(path, current_change_type, index);
                    }
                }
            })
        });
        $($('.work .cancel-btn')[index]).click(() => {
            $($('.work-content')[index]).css('display', 'block');
            $($('.work .work-edit-container')[index]).remove()
        });

    }

    function updateWork(path, type, index){
        let new_work = {
            works_id: works_arr[index].works_id,
            stu_id: getUrlVar("stu_id"),
            name: $(`#work_name${index}`).val(),
            duty: $(`#work_role${index}`).val(),
            url: $(`#work_link${index}`).val(),
            description: $(`#work_desc${index}`).val(),
            img: null,
            audio: null,
            video: null
        };
        new_work[work_type_map[type]] = path;
        console.log(new_work);

        $.ajax({
            type: 'POST',
            data: new_work,
            url: cur_site + 'student/works/update/',
            dataType: 'json',
            success: (data) => {
                if (data.err === "0") {
                    alert('更新成功');
                    works_arr[index] = new_work;
                    $($('.work-content')[index]).css('display', 'block');
                    updateWorkDom($('.work-content')[index], new_work)
                } else {
                    console.log(data.msg)
                }
            },
            error: err => console.log(err)
        })
    }
    function updateWorkDom(element, work){
        let show_element;
        if (work.img) {
            show_element = `<img src="${cur_media + work.img}" alt="作品图片">`
        } else if (work.audio) {
            let type;
            switch (work.audio.split('.')[1]) {
                case 'mp3':
                    type = 'audio/mpeg';
                    break;
                case 'ogg':
                    type = 'audio/ogg';
                    break;
            }
            show_element = `<audio controls="controls">
                    <source src=${cur_media + work.audio}" type=${type}>
                    Your browser does not support the audio element.
                </audio>`

        } else if (work.video) {
            let type;
            switch (work.video.split('.')[1]) {
                case 'mp4':
                    type = 'audio/mp4';
                    break;
                case 'ogg':
                    type = 'video/ogg';
                    break;
                case 'webm':
                    type = 'video/webm';
                    break;
            }
            show_element = `<video  controls="controls" >
                    <source src=${cur_media + work.video} type=${type} />
                    <object data=${cur_media + work.video} width="100%" height="400px">
                        <embed width="100%" height="400px" src=${cur_media + work.video} />
                    </object>
                </video>`
        }
        let work_content = $(element).children('.work').children('.work-content');
        $($(work_content).children('.work-file')).html(show_element);
        let work_title = $(work_content).children('.work-title');
        $($(work_title).children('.work-name')).html(work.name);
        $($(work_title).children('.work-duty')).html(work.duty);
        let work_link = $(work_title).children('.work-site').children('.work-link');
        $(work_link).html(work.url);
        $(work_link).href = work.url;
        $($(work_content).children('.work-p')).html(work.description);
    }
});




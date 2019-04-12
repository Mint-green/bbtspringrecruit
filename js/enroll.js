// 尝试封装
// function xhr(path, data) {
//     var request = new XMLHttpRequest();
//     request.open('POST', path, true);
//     request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     request.send(data);
//     request.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             if (this.status == 200) {
//                 var resultmsg = JSON.parse(this.responseText);  // 将字符串转为数组
//                 // console.log(resultmsg);
//                 // return resultmsg;
//             } else {
//                 var resultmsg = [];
//                 resultmsg.errcode = -1;
//                 resultmsg.msg = '发生错误' + this.status;
//                 resultmsg.data = '';
//                 console.log(resultmsg);
//                 // return resultmsg;
//             }
//         }
//     }
// }
const showCollegepath = 'backend/showCollege.php';
const showDepartmentpath = 'backend/showDepartment.php';
const showCollegepath = 'backend/showCollege.php';
const applypath = 'backend/apply.php';
const modificationpath = 'backend/modification.php';

//转义  元素的innerHTML内容即为转义后的字符  
function htmlEncode(str) {
    var ele = document.createElement('span');
    ele.appendChild(document.createTextNode(str));
    return ele.innerHTML;
}
//解析   
function htmlDecode(str) {
    var ele = document.createElement('span');
    ele.innerHTML = str;
    return ele.textContent;
}
// xhr(path1, "");
//显示学院
var request = new XMLHttpRequest();
request.open('POST', showCollegepath, true);
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
var data = "";
request.send(data);
request.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            var resultmsg = JSON.parse(this.responseText);  // 将字符串转为数组
            if (resultmsg.errcode == 0) {
                for (var k in resultmsg.data) {
                    var num = parseInt(k) + 1;
                    // document.getElementById("collegeoption").innerHTML += '<option value="' + num + '">' + resultmsg.data[k] + '</option>';
                    document.getElementById("collegeoption").options.add(new Option(resultmsg.data[k], num)); //这个兼容IE与firefox 
                }
            }
        } else {
            alert('发生错误' + this.status);
        }
    }
}

//显示志愿
var request1 = new XMLHttpRequest();
request1.open('POST', showDepartmentpath, true);
request1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
var data = "";
request1.send(data);
request1.onreadystatechange = function () {
    if (this.readyState == 4) {
        if (this.status == 200) {
            var resultmsg1 = JSON.parse(this.responseText);  // 将字符串转为数组
            if (resultmsg1.errcode == 0) {
                for (var k in resultmsg1.data) {
                    var num = parseInt(k) + 1;
                    document.getElementById("firstdepartment").options.add(new Option(resultmsg1.data[k], num)); //这个兼容IE与firefox 
                    document.getElementById("seconddepartment").options.add(new Option(resultmsg1.data[k], num)); //这个兼容IE与firefox 
                }
            }
        } else {
            alert('发生错误' + this.status);
        }
    }
}
// encodeURIComponent()
//设置select的默认选中项颜色
$(function () {
    var unSelected = "#9e9e9e";
    var selected = "rgb(51,51,51)";
    $(function () {
        $("select").css("color", unSelected);
        $("option").css("color", selected);
        $("select").change(function () {
            var selItem = $(this).val();
            if (selItem == $(this).find('option:first').val()) {
                $(this).css("color", unSelected);
            } else {
                $(this).css("color", selected);
            }
        });
    })
})


//返回按钮
function returnback() {
    window.location.href = "briefintroduction.html";
}

//获取单选框选的值
function getchoice(cname, choice1, choice2) {
    var radio = document.getElementsByName(cname);
    var selectvalue = null;   //  selectvalue为radio中选中的值
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked == true) {
            selectvalue = radio[i].value;
            break;
        }
    }
    // return selectvalue;
    if (selectvalue == 0) {
        return choice1;
    } else if (selectvalue == 1) {
        return choice2;
    }
}

//获取选项所选的项的内容
function getselecttext(selectname) {
    // 拿到select对象： 
    var myselect = document.getElementById(selectname);
    // 拿到选中项的索引：
    var index = myselect.selectedIndex; // selectedIndex代表的是你所选中项的index
    //拿到选中项options的value： 
    // myselect.options[index].value;
    // 拿到选中项options的text： 
    var text = myselect.options[index].text;
    return text;
}

// 提交功能
function submit() {
    //禁用按钮
    document.getElementById("submit").disabled = true;

    var name = document.getElementById("name").value;
    var sex = getchoice("man", "male", "female");
    var grade = getchoice("grade", "gradeOne", "gradeTwo");
    var college = getselecttext("collegeoption");
    var dorm = document.getElementById("dorm").value;
    var phonenum = document.getElementById("phonenum").value;
    var firstchoose = getselecttext("firstdepartment");
    var secondchoose = getselecttext("seconddepartment");
    var yorn = getchoice("choice", "adjustYes", "adjustNo");
    var selfintro = document.getElementById("text").value;

    //调试用
    // console.log(name);
    // console.log(sex);
    // console.log(grade);
    // console.log(college);
    // console.log(dorm);
    // console.log(phonenum);
    // console.log(firstchoose);
    // console.log(secondchoose);
    // console.log(yorn);
    // console.log(selfintro);

    //名字只能汉字和·
    var restrictname = RegExp(/^[\u4e00-\u9fa5·]{2,20}$/);
    // console.log(restrictname.test(name));
    var namepro = restrictname.test(name);

    //宿舍，南校和北校命名规则
    // var restrictdorm = RegExp(/^[Cc][0-9Cc-]{6,7}$/);
    var restrictdorm = RegExp(/^[CD]([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i);
    // console.log(restrictdorm.test(dorm));
    var dormpro = restrictdorm.test(dorm);

    //电话号码十一位且首位为1
    var restrictphonenum = RegExp(/^1[0-9]{10}$/);
    // console.log(restrictphonenum.test(phonenum));
    var phonenumpro = restrictphonenum.test(phonenum);

    //学院和一志愿不能为空
    //简介仅设置字数限制

    //二志愿可为空,并替换成空
    if (secondchoose == "选填") {
        secondchoose = "";
    }

    //最终判别
    if (namepro == false || college == "请选择" || dormpro == false || phonenumpro == false ||
        firstchoose == "请选择" || selfintro.length > 50) {
        // alert("1");
        alert("信息填写有误或不完整,请正确填写您的信息哦亲");
        document.getElementById("submit").disabled = false;
        return;
    }

    //传送数据
    var request = new XMLHttpRequest();
    request.open('POST', applypath, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    var data1 = "name=" + name +
        "&gender=" + sex +
        "&grade=" + grade +
        "&college=" + college +
        "&dormitory=" + dorm +
        "&phone=" + phonenum +
        "&first=" + firstchoose +
        "&second=" + secondchoose +
        "&adjust=" + yorn +
        "&introduction=" + selfintro;
    data = htmlEncode(data1);

    request.send(data);

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var resultmsg = JSON.parse(this.responseText);  // 将字符串转为数组
                if (resultmsg.errcode == 0) {
                    // alert("get it!");
                    window.location.href = 'successpage.html';
                }
                else {
                    alert(resultmsg.msg);
                }

            } else {
                alert('发生错误' + this.status);

            }
        }
    }
    // encodeURIComponent()
}


// 修改功能
function modification() {
    //禁用按钮
    document.getElementById("submit").disabled=true;

    var name = document.getElementById("name").value;
    var sex = getchoice("gender", "male", "female");
    var grade = getchoice("grade", "gradeOne", "gradeTwo");
    var college = getselecttext("collegeSelect");
    var dorm = document.getElementById("dormitory").value;
    var phonenum = document.getElementById("phone").value;
    var firstchoose = getselecttext("firstSelect");
    var secondchoose = getselecttext("secondSelect");
    var yorn = getchoice("adjust", "adjustYes", "adjustNo");
    var selfintro = document.getElementById("introduction").value;

    //调试用
    // console.log(name);
    // console.log(sex);
    // console.log(grade);
    // console.log(college);
    // console.log(dorm);
    // console.log(phonenum);
    // console.log(firstchoose);
    // console.log(secondchoose);
    // console.log(yorn);
    // console.log(selfintro);

    //名字只能汉字和·
    var restrictname = RegExp(/^[\u4e00-\u9fa5·]{2,20}$/);
    console.log(restrictname.test(name));
    var namepro = restrictname.test(name);

    //宿舍，南校和北校命名规则
    // var restrictdorm = RegExp(/^[Cc][0-9Cc-]{6,7}$/);
    var restrictdorm = RegExp(/^[CD]([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/i);
    console.log(restrictdorm.test(dorm));
    var dormpro = restrictdorm.test(dorm);

    //电话号码十一位且首位为1
    var restrictphonenum = RegExp(/^1[0-9]{10}$/);
    console.log(restrictphonenum.test(phonenum));
    var phonenumpro = restrictphonenum.test(phonenum);

    //简介仅设置字数限制
    // if (selfintro.length > 50) {
    //     console.log("超过字数限制");
    //     // alert("信息填写有误或不完整,请正确填写您的信息哦亲");
    // }

    //二志愿可为空,并替换成空
    if (secondchoose == "选填") {
        secondchoose = "";
    }

    //一志愿和学院不能为空
    // if(firstchoose="请选择" ||){}

    // if (restrictphonenum.test(phonenum) == false) {
    //     console.log("电话输入有误");
    //     alert("信息填写有误或不完整,请正确填写您的信息哦亲");
    // }

    //最终判别
    if (namepro == false || college == "请选择" || dormpro == false || phonenumpro == false ||
        firstchoose == "请选择" || selfintro.length > 50) {
        // alert("1");
        // document.getElementById("submit").disabled=false;
        return;
    }
    // alert("get it!");

    //传送数据
    var request = new XMLHttpRequest();
    request.open('POST', modificationpath, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    var data1 = "name=" + name +
        "&gender=" + sex +
        "&grade=" + grade +
        "&college=" + college +
        "&dormitory=" + dorm +
        "&phone=" + phonenum +
        "&first=" + firstchoose +
        "&second=" + secondchoose +
        "&adjust=" + yorn +
        "&introduction=" + selfintro;
    data = htmlEncode(data1);    

    request.send(data);

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var resultmsg = JSON.parse(this.responseText);  // 将字符串转为数组
                if (resultmsg.errcode == 0) {
                    // alert(this.responseText);
                    location.href = "alterok.html";
                } else {
                    alert(resultmsg.msg);
                }
            } else {
                alert('发生错误' + this.status);
            }
        }
    }
    // encodeURIComponent()
}
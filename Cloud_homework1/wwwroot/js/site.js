// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function WriteMalea() {
    document.getElementById("gender").value = "Male";
    WriteData();
}

function WriteFemale() {
    document.getElementById("gender").value = "Female";
    WriteData();
}

function WriteData() {
    var name = document.getElementById("userName").value;
    var sex = document.getElementById("gender").value;
    var ages = document.getElementById("age").value;
    var which_class = document.getElementById("mySelect").value;
    document.getElementById("result").value = "姓名:" + name + " 性別:" + sex + " 年齡:" + ages + " 班級:" + which_class;
}

function CheckPassword() {
    var password = document.getElementById("password").value;
    var rePassword = document.getElementById("re-password").value;
    if (password.length < 6) {
        document.getElementById("check").innerHTML = "<div class='Unpass'>密碼過短</div>";
    } else if (password !== rePassword) {
        document.getElementById("check").innerHTML = "<div class='Unpass'>密碼不相同</div>";
    } else {
        document.getElementById("check").innerHTML = "<div class='Pass'>OK</div>";
    }
}

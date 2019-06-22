var currentIndex = 0;
var lis;
var tipDiv, placeholder;

/**
 * 注册按键监听事件
 * left -> 上一张
 * righr -> 下一张
 */
function onLintenerKeyDown() {
    document.onkeydown = function (ev) {
        var e = ev || window.event;
        if (e.which == 37) {
            showPrePic()
        } else if (e.which == 39) {
            showNextPic();
        }
        // console.log(ev.which);
    }
}

window.onload = function () {
    lis = document.getElementsByTagName("li");
    // li的a标签
    showPic(lis[currentIndex].firstChild, currentIndex);
    // 按键监听事件
    onLintenerKeyDown();
};

//滚动条位置 -> 跟随当前图片
function scrollWithPicIndex() {
    var ul = lis[0].parentElement;
    // console.log("cz",ul);
    ul.scrollLeft = currentIndex * (window.innerWidth / lis.length);
    // console.log(index,currentIndex,ul.scrollLeft);
}

//重置选择样式
function reset() {
    for (let i = 0; i < lis.length; i++) {
        lis[i].firstElementChild.firstElementChild.classList.remove("selected")
    }
}

/**
 * 在大图区域显示缩略图
 * @param whichPic <a> <img /> </a>
 * @param index 当前a所在的li的下标
 * @returns false 拦截<a>默认的点击跳转事件
 */
// 超链接的点击事件
function showPic(whichPic, index) {
    reset();

    console.log(whichPic, index);
    if (index != "undefined") currentIndex = index;
    whichPic.firstElementChild.classList.add("selected");

    var href = whichPic.href;
    placeholder = document.getElementById("placeholder");
    placeholder.src = href;
    placeholder.parentNode.style.display = "block";
    var description = document.getElementById("description");
    description.innerText = whichPic.title;
    //滚动条位置 -> 跟随当前图片
    scrollWithPicIndex();
    return false;
}

function showNextPic() {
    if (currentIndex < lis.length - 1) {
        showPic(lis[++currentIndex].firstChild, currentIndex);
    } else {
        showTip("啊哦！没有更多了~");
    }
}

function showPrePic() {
    if (currentIndex > 0) {
        showPic(lis[--currentIndex].firstChild, currentIndex);
    } else {
        showTip("这是第一张了~");
    }
}

function toggle(obj) {
    var e = window.event;
    var x = e.pageX;
    var y = e.pageY;
    if (y > window.innerHeight * 0.2) {
        if (x > window.innerWidth * 0.7) {//(1-0.4)/2+0.4
            showNextPic();
        }
        else if (x < window.innerWidth * 0.3) {
            showPrePic();
        }
        else {
            if (obj.style.display == "none") {
                obj.style.display = "block;"
            } else {
                // obj.style.display = "none";
                // placeholder.style.transform = "scale(1.1)";
            }
        }
    } else {

    }

    // console.log(currentIndex);
}

function creteDom() {
    tipDiv = document.createElement("div");
    tipDiv.id = "tip";
    // tipDiv.classList.add("reserve");
    document.body.append(tipDiv);
}
// 小弹窗 提示第一张、最后一张
function showTip(msg) {
    if (tipDiv) {
        tipDiv.innerText = msg;
        tipDiv.style.opacity = 1;
        tipDiv.id = "tip";
        document.body.append(tipDiv);
        setTimeout(function () {
            tipDiv.style.opacity = 0;
            // document.body.removeChild(tipDiv);
            tipDiv.removeAttribute("id");
        }, 2000)
    } else {
        creteDom();
        showTip(msg);
    }
}

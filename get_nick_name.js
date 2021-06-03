/* 该文件主要用来测试 获取老板昵称性能 */
var target_num =10
var object = className("android.widget.Button").find()
var cnt = 0;
while (target_num > object.length) {
    log(cnt + "times")
    swipe( 640,  1930, 640, 513, 300)
    sleep(1000);
    swipe( 640,  1130, 640, 1330, 500)
    sleep(500)
    object = null
    object = className("android.widget.Button").find()
    cnt++;
    if (cnt >= 10)
        break
}

log("实际获得老板个数: " + object.length)
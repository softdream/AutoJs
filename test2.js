setScreenMetrics(1080, 1920); //设置手机屏幕分辨率

/*if( className("android.view.View").depth("18").exists() ){
    log( "找到图层" );
    var object = className("android.view.View").depth("18").find();

    object.forEach(function (currentValue, index) {
        log("图层：", index);
        if( className("android.view.View").depth("20").text("你可能对她感兴趣").exists() ){
            log("你可能对她感兴趣", index);
        }
    });
}*/

/*var nickName = new Array();
var index = 0;

var clickRet = click( 541,  633);
if( clickRet == true ){
    log("查看个人信息");
}*/

//waitForActivity("")
if( id("username").exists() ){
    sleep(1000);

    log("查看昵称");
    log(id("username").findOne().text());
    
    /*nickName[index] = id("username").findOne().text();
    log(nickName[index]);
    index ++;*/
}
else {
    log("未获取昵称结点");
}

/*for( x in nickName ){
    log(x);
}*/
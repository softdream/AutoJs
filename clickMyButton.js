
//var ret = id("svgaImage").findOne().parent().click();
//log(ret);

//遍历底部菜单栏，找到我的按钮
/*var object = id("svgaImage").desc("icon").depth(8).find();
if( !object.empty() ){
    toast("找到了底部菜单栏");
    object.forEach( function( currentValue, index ){
        log(index);
        log(currentValue);

        if( index == 4 ){
            log("find my button");
            var my = currentValue.parent().parent();
            my.click();
        }
    } )
}*/

setScreenMetrics(1080, 1920); //设置手机屏幕分辨率

var clickRet = click( 953, 2116 );
log(clickRet);
if( clickRet == true ){
    sleep(1000);
    //waitForActivity("com.yitantech.gaigai");
    if( id("tv_personal_page").exists() ){
        log("切换到我的界面");
    }
    else {
        log( "不在我的界面" ) ;
    }
}


/*sleep(2000);
//切回主页
var clickRet2 = click( 125, 2116 );
if( clickRet2 == true ){
    sleep(1000);
    if( id("timeline_text_search").exists() ){
        log("切换到主页面");
    }
    else {
        log( "切换到主页面失败" ) ;
    }
}*/

sleep(1000);
// 进入大神专属
if( id("rl_god_title").exists() ){
    log("大神专属");
    id("rl_god_title").findOne().parent().click();
}

sleep(1000);
// 发现新老板
/*if( id("tvGodNewbieItemFuncTitle").exists() ){
    //waitForActivity("" )
    var neBieObjects = id("tvGodNewbieItemFuncTitle").find();
    neBieObjects.forEach(function( elment, index ) {
        log(elment.text());
    });
}*/

var clickRet3 = click( 776, 1851 );
log(clickRet3);
if( clickRet3 == true ){
    sleep(1000);

}

var objectPeople = depth("18").find();
depth("18").forEach(function( person, index ){
    log("person: ",index);
});

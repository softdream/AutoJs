setScreenMetrics(1080, 1920); //设置手机屏幕分辨率

var nickNames = new Array();// 定义一个全局数组保存获取到的昵称
var nicksNum = 0;

//goto_find_bosses_page_first_time();
//get_nick_name_list();
//scroll_up();
//refresh_page();
//back_to_main_page();
//click_ready_for_search();
//serch_the_users_and_click_in("桃三岁");
//serch_the_users_and_click_in("贱贱的剑侠");
//travel_the_result_of_the_searched_users();
//click_onto_first_user_found_by_searching();
//goto_bosses_page_not_first_time();
//click_to_chat();
//goto_bosses_page();
//send_test();
the_total_processes();


/* 
 * description: 用来获取发现老板页中所有boss的nick name
 * return: 如果获取成功返回nick name 列表，否则返回null
 */
function get_nick_name_list() {
    var nick_name_list = new Array()

    waitForActivity("com.bx.h5.BxH5Activity");

    log("Get Nick Name List ...");
    /* 判断当前是否处于发现老板界面 */
    if(className("android.view.View").text("发现老板").exists()){
        /* 获取发现老板界面中，所有的boss集合 */
        var object = className("android.widget.Button").find()

        /* 判断是否找到boss */
        if (!object.empty()) {
            log("*** find " + object.length + " boss ***")

            var previousNickName = "";
            var count = 0;
            for (var i = 0; i < object.length; i++) {
                var boss_info = object.get(i)
                //nick_name_list[i] = boss_info.parent().child(0).text()
                //log(nick_name_list[i])
                var presentNickName = boss_info.parent().child(0).text();
                if( presentNickName != previousNickName ){ // 防止重复昵称
                    log(presentNickName );
                    nick_name_list[count] = presentNickName;
                    count ++;
                    previousNickName = presentNickName;
                }
            }

            // ------------ Added By Daofeng -------------//
            nicksNum =  count;

            return nick_name_list
        }
        else {
            log("not find boss")
        }
    }
    else {
        log("不在发现老板界面")
    }

    return null
}

/* 
 * description: 滑动屏幕翻页
 * return: 无
 */
function scroll_up() {
    //开始翻页
    // 从小往上滑动屏幕
    swipe( 640,  1930, 640, 313, 1000);// 根据坐标值来翻页
    
}

/* 
 * description: 滑动屏幕翻页
 * return: 无
 */
function scroll_down() {
    //开始翻页
    // 从小往上滑动屏幕
    swipe(  640, 1000, 640,  1930, 1000);// 根据坐标值来翻页
    
}

/* 
 * description: 刷新页面
 * return: 无
 */
function refresh_page()
{
    // 一种方法是使用swipe函数
    swipe( 640, 635, 640, 1060, 1000 );    
}

/* 
 * description: 回到主页面
 * return: 无
 */
function back_to_main_page(){
    back(); // 在老板页面先点击返回按钮

    waitForActivity("com.bx.main.MainActivity"); // 等待页面出现

    if( id("bottomLabel").className("android.widget.TextView").text("比心").exists() ){ 
        log("点击回到主页面");
        
        var clickRet = id("bottomLabel").className("android.widget.TextView").text("比心").findOne().parent().click()  
        
        if( clickRet == true ){
            log("点击按钮成功");
            return true;
        }
        else {
            log("点击按钮失败");
            return false;
        }
        // 有时页面会跳出广告，需要处理掉
        if(id("ivActivityImg").exists()){
            log("出现了广告");
            back(); //点一下返回键即可
        }

    }
    else {
        log("没找到按钮")
        return false;
    }
}

/* 
 * description: 点击进入搜索框准备开始搜索
 * return: true 执行成功，false 执行失败
 */
function click_ready_for_search(){
    if( id("timeline_text_search").exists() ){
        log( "找到了搜索框" );
        
        var clickRet = id("timeline_text_search").findOne().click();// 点击进入搜索框
        if( clickRet == true ){
            log("点击按钮成功");
            return true;
        }
        else {
            
            log("点击按钮失败");
            return false;
        }
    }
    else {
        log("没找到搜索框")
        return false;
    }
}

/* 
 * description: 在搜索框中搜索用户名,并点击搜索按钮
 * parameter: nickName: 用户昵称
 * return: true 执行成功
 */
function serch_the_users_and_click_in( nickName ){
    log("准备搜索：", nickName);
    
    //等待页面加载完成
    waitForActivity("com.bx.android.search.SearchActivity");

    if( id("editText").exists() ){
        log( "找到了搜索输入框" );

        // 输入文本
        var inputRet = id("editText").findOne().setText( nickName );
        log(inputRet);

        if( inputRet == true ){
            log("输入昵称");

            // 点击搜索按钮进行搜索
            if( id("toolbarButtonText").className("android.widget.TextView").text("搜索").exists() ){
                log("找到搜索按钮");
                var x = id("toolbarButtonText").className("android.widget.TextView").text("搜索").findOne().bounds().centerX();
                var y = id("toolbarButtonText").className("android.widget.TextView").text("搜索").findOne().bounds().centerY();
                log("搜索按钮中心点: ", x, y);
                var clickRet = click( x, y );  
                log( clickRet );
                if( clickRet == true ){
                    log("点击搜索成功");
                    return true;
                }
                else {
                    log("点击搜索失败");
                    return false;
                }
            }
            else {
                log("没找到搜索按钮");
                return false;
            }
        }
        else {
            log("未能输入昵称");
            return false;
        }
    }
    else {
        log("没找到搜索输入框");
        return false;
    }
}

/* 
 * description: 遍历所有搜索到的页面并依次点进去发送消息
 * parameter: None
 * return: 无
 */
function travel_the_result_of_the_searched_users()
{
    waitForActivity("com.bx.android.search.SearchActivity" );
    //if( id("nameTv").exists() ){
        log("找到了用户列表");
        var object = id("nameTv").find();
        log("users number: ", object.length);
        /*for( var i = 0; i < object.length; i ++ ){
            var boss_info = object.get(i)
            var nick_name = boss_info.parent().child(0).text();
            log(nick_name);
        }*/
    //}
    //else {
      //  log("没找到用户列表");
    //}
}

/* 
 * description: 只点进去搜索到的第一个用户，这个才是在线的
 * parameter: None
 * return: 无
 */
function click_onto_first_user_found_by_searching(){
   /* id("subList").findOne().children().forEach(child => {
        var target = child.findOne(id("nameTv"));
        target.parent().click();
        });*/

    // 如果有搜索结果了
    if( id("title").text("相关用户").exists() ){

        log("找到了第一个用户");
        var clickRet = id("subList").findOne().children().findOne( id("nameTv") ).parent().click();

        if( clickRet == true ) 
            return true;
        else 
            return false;
    }
    else {
        log("没有相关用户");
        return false;
    }
}

/* 
 * description: 打开app后第一次进入发现新老板的步骤：点击”我的“按钮-->点击”大神专属“-->点击"发现新老板"
 * parameter: None
 * return: true 执行成功
 */
function goto_find_bosses_page_first_time(){
    //------------------ 首次打开程序后执行这个函数 ---------------------//

    // 有时页面会跳出广告，需要处理掉
    if(id("ivActivityImg").exists()){
        log("出现了广告");
        back(); //点一下返回键即可
    }

    // 点击我的按钮，进入“我的页面”
    if( id("bottomLabel").className("android.widget.TextView").text("我的").exists() ){
        log("找到我的按钮");
        id("bottomLabel").className("android.widget.TextView").text("我的").findOne().parent().click()

        //等待“我的页面"加载完成
       // waitForActivity("com.android.systemui.recents.RecentsActivity");

        // 点击大神专属按钮
        if( id("rl_god_title").exists() ){
            log("找到大神专属按钮");
            id("rl_god_title").findOne().parent().click();

            // 等待大神专属页面加载成功

            // 点击发现新老板
            if( id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").exists() ){
                log("找到点击发现新老板按钮");
                //id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().click();
                var x = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().bounds().centerX();
                var y = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().bounds().centerY();
                log("发现新老板按钮中心点: ", x, y);
                var clickRet = click( x, y ); 
                if( clickRet == true ){
                    log("点击进入发现新老板界面");
                    return true;
                }
                else{
                    log("点击进入发现新老板界面失败了");
                    return false;
                }
            }
            else{
                log("没找到点击发现新老板按钮");
                return false;
            }
        }
        else {
            log("没找到大神专属按钮");
            return false;
        }
    }
    else {
        log("没找到我的按钮");
        return false;
    }
}

/* 
 * description: 除了第一次之后进入”发现新老板“页面的步骤：点击”我的“按钮--> 点击”发现新老板“按钮
 * parameter: None
 * return: true 执行成功
 */
function goto_bosses_page_not_first_time(){
// 有时页面会跳出广告，需要处理掉
    if(id("ivActivityImg").exists()){
        log("出现了广告");
        back(); //点一下返回键即可
    }

    // 点击我的按钮，进入“我的页面”
    if( id("bottomLabel").className("android.widget.TextView").text("我的").exists() ){
        log("找到我的按钮");
        id("bottomLabel").className("android.widget.TextView").text("我的").findOne().parent().click()

        //等待“我的页面"加载完成
       // waitForActivity("com.android.systemui.recents.RecentsActivity");

       // 点击发现新老板
        if( id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").exists() ){
            log("找到点击发现新老板按钮");
            //id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().click();
            var x = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().bounds().centerX();
            var y = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().bounds().centerY();
            log("发现新老板按钮中心点: ", x, y);

            var clickRet = click( x, y ); 
            if( clickRet == true ){
                log("点击进入发现新老板界面");
                return true;
            }
            else{
                log("点击进入发现新老板界面失败了");
                return false;
            }

        }
        else{
            log("没找到点击发现新老板按钮");
            return false;
        }
    }
    else{
        log("没找到我的按钮");
        return false;
    }
}

/* 
 * description: 进入”发现新老板“，自动判断是否需要点击”大神专属“按钮
 * parameter: None
 * return: true 执行成功
 */
function goto_bosses_page()
{
    // 有时页面会跳出广告，需要处理掉
    if(id("ivActivityImg").exists()){
        log("出现了广告");
        back(); //点一下返回键即可
    }

    // 点击我的按钮，进入“我的页面”
    if( id("bottomLabel").className("android.widget.TextView").text("我的").exists() ){
        log("找到我的按钮");
        id("bottomLabel").className("android.widget.TextView").text("我的").findOne().parent().click()

        //等待“我的页面"加载完成
       // waitForActivity("com.android.systemui.recents.RecentsActivity");

        // 如果是大神界面，则直接点击”发现新老板“
        if( id("toolbarTitle").text("大神").exists() ){
            log("大神界面");
            // 点击发现新老板
            if( id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").exists() ){
                log("找到点击发现新老板按钮");
                //id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().click();
                var x = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().bounds().centerX();
                var y = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().bounds().centerY();
                log("发现新老板按钮中心点: ", x, y);

                var clickRet = click( x, y ); 
                if( clickRet == true ){
                    log("点击进入发现新老板界面");
                    return true;
                }
                else{
                    log("点击进入发现新老板界面失败了");
                    return false;
                }

            }
            else{
                log("没找到点击发现新老板按钮");
                return false;
            }
        }
        else{ // 如果是”大神专属“界面，则需要先点一下”大神专属界面“，再点击发现新老板
            // 点击大神专属按钮
            if( id("rl_god_title").exists() ){
                log("找到大神专属按钮");
                id("rl_god_title").findOne().parent().click();

                // 等待大神专属页面加载成功

                // 点击发现新老板
                if( id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").exists() ){
                    log("找到点击发现新老板按钮");
                    //id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().click();
                    var x = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().bounds().centerX();
                    var y = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().bounds().centerY();
                    log("发现新老板按钮中心点: ", x, y);
                    var clickRet = click( x, y ); 
                    if( clickRet == true ){
                        log("点击进入发现新老板界面");
                        return true;
                    }
                    else{
                        log("点击进入发现新老板界面失败了");
                        return false;
                    }
                }
                else{
                    log("没找到点击发现新老板按钮");
                    return false;
                }
            }
            else {
                log("没找到大神专属按钮");
                return false;
            }
        }
    }
    else {
        log("没找到我的按钮");
        return false;
    }
}


/* 
 * description: 点击”聊一聊“
 * parameter: None
 * return: true 进入聊一聊界面成功
 */
function click_to_chat(){
    // 等待页面加载成功
    waitForActivity("com.bx.user.controler.userdetail.activity.UserDetailV2Activity");
    sleep(500);

    // 点击聊一聊
    if( id("chat").exists() ){
        log("找到聊一聊按钮");
        var clickRet = id("chat").findOne().click();
        if( clickRet == true ){
            log("点击聊一聊按钮成功");
            return true;
        }
        else {
            log("点击聊一聊按钮失败");
            return false;
        }
    }
    else {
        log("没找到聊一聊按钮");
        return false;
    }
}

/* 
 * description: 从聊天页面退出到搜索页面
 * parameter: None
 * return: ture 返回成功，false 返回出错
 */
function exit_to_search_page_from_chat_page(){
    if( id("chat").exists() ){
        back();
    
        // 如果有关注标签，说明返回成功了
        if( id("follow").exists() ){
            back();
            
            if( id("toolbarButtonText").className("android.widget.TextView").text("搜索").exists() ){
                return true;
            }
            else return false;

        }
        else return false;
    }
    else {
        return false;
    }
}

/* 
 * description: 发送一个测试文本
 * parameter: None
 * return: ture 返回成功，false 返回出错
 */
function send_test(){
    id("tvQuickMsg").className("android.widget.TextView").findOne().parent().click();

}

/* 点击聊一聊之后，应该使用以下命令，等待聊天窗口出现，
 *  然后去执行send_msg函数
 */
// waitForActivity("com.bx.im.P2PMessageActivity")

/* 函数用来向特定的boss发送随机话术msg */
function send_msg(nick_name, msg)
{
    /* 判断是否在和nick_name聊天 */
    if(id("uf_txv_title").findOne().text() == nick_name){

        setText(msg)        /* 聊天框填入信息 */
        random(100, 500)    /* 随机延时100 - 500 ms */
        id("tvSendMessage").findOne().parent().click()
        random(100, 500)    /* 随机延时100 - 500 ms */
    } else {
        log("不在与boss(" + nick_name + ")聊天界面")
    }
}

//var nick_name = id("uf_txv_title").findOne().text()
//var msg = "你好，有时间一起玩游戏吗？"
//send_msg(nick_name, msg)

/* 
 * description: 总流程
 * parameter: None
 * return: ture 返回成功，false 返回出错
 */
function the_total_processes(){
    // 1. 进入发现新老板页面
    if( goto_bosses_page() == false ){
        return ;
    }

    // 2. 获取用户昵称
    var x = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().bounds().centerX();
    var y = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne().bounds().centerY();
    log("发现新老板按钮中心点: ", x, y);
    var clickRet = click( x, y ); 
    sleep(1000);

    scroll_up();

    sleep(1000);

    nickNames = get_nick_name_list();
    log("昵称个数：", nicksNum);
    for( var i = 0; i < nicksNum; i ++ ){
        log("用户：", nickNames[i]);
    }
    
    // 3. 获取到昵称列表之后，返回到搜索框页面
    if( back_to_main_page() == false ){
        return ;
    }

    // 4. 点击进入搜索框
    click_ready_for_search();
    sleep(1000);
    // 5. 遍历昵称列表，对每个昵称执行以下操作
    for( var i = 0; i < nicksNum; i ++ ){
        // 6. 搜索用户
        if(serch_the_users_and_click_in( nickNames[i] )){
            sleep(2000);

            // 7. 点进去用户
            if( click_onto_first_user_found_by_searching() ){
                sleep(2000);

                 // 8. 点击聊一聊
                click_to_chat();
                sleep(2000);

                // 9. 发送一个测试文本
                send_test();
                sleep(2000);

                // 10. 回到搜索页面
                exit_to_search_page_from_chat_page();
                sleep(2000);
            }
            
        }
    }

    /*var nickNames = new Array();
    nickNames[0] = "111";
    nickNames[1] = "222";
    nickNames[2] = "333";
    nickNames[3] = "444";

    click_ready_for_search();
    sleep(1000);

    for( var i = 0; i < 4; i ++ ){
        log("---------------------------------------------");
        serch_the_users_and_click_in( nickNames[i] );

        click_onto_first_user_found_by_searching();

        click_to_chat();

        send_test();
        sleep(2000);

                // 10. 回到搜索页面
        exit_to_search_page_from_chat_page();
        sleep(2000);
    }*/

}


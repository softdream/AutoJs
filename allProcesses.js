setScreenMetrics(1080, 1920); //设置手机屏幕分辨率

var nickNames = new Array();// 定义一个全局数组保存获取到的昵称
var nicksNum = 0;

Main_Process();

/* 
 * description: 用来获取发现老板页中所有boss的nick name
 * parameter: 表示至少需要获取的昵称个数
 * return: 如果获取成功返回nick name 列表，否则返回null
 */
function get_nick_name_list(target_num) {
    var nick_name_list = new Array()

    waitForActivity("com.bx.h5.BxH5Activity");

    log("Get Nick Name List ...");
    /* 判断当前是否处于发现老板界面 */
    if(className("android.view.View").text("发现老板").exists()){
        /* 获取发现老板界面中，所有的boss集合 */
        var object = className("android.widget.Button").find()

        while (target_num > object.length) {
            scroll_up()
            random(1000, 2000)
            object = null
            object = className("android.widget.Button").find()
        }

        log("实际获得老板个数: " + object.length)

        var previousNickName = "";
        var count = 0;
        for (var i = 0; i < object.length; i++) {
            var boss_info = object.get(i)
            //nick_name_list[i] = boss_info.parent().child(0).text()
            //log(nick_name_list[i])
            var presentNickName = boss_info.parent().child(0).text();
            if( presentNickName != previousNickName ){ // 防止重复昵称
                log(presentNickName);
                nick_name_list[count] = presentNickName;
                count ++;
                previousNickName = presentNickName;
            }
        }

        // ------------ Added By Daofeng -------------//
        nicksNum =  count;
        return nick_name_list
    }

    log("不在发现老板界面")
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
    sleep(1000)
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

    var main_page = id("bottomLabel").className("android.widget.TextView").text("比心").findOnce(0)
    if( main_page != null){ 
        log("点击回到主页面");
        
        var clickRet = main_page.parent().click()  
        
        if( clickRet == true ){
            log("点击按钮成功");
            return true;
        }
        else {
            log("点击按钮失败");
            return false;
        }
        /* TODO 这段代码都执行不到，上面的if else 都会return出去 */
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
 * return: 无
 */
function click_ready_for_search(){

    var search = id("searchView").findOnce(0)
    if( search != null ){
        log( "找到了搜索框" );
        
        var clickRet = search.click();// 点击进入搜索框
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

    var search = id("editText").findOne()
    if( search ){
        log( "找到了搜索输入框" );

        var inputRet = search.setText( nickName );
        if( inputRet == true ){
            log("输入昵称");

            // 点击搜索按钮进行搜索
            var search_bt = id("toolbarButtonText").className("android.widget.TextView").text("搜索").findOnce(0)
            if( search_bt != null ){
                log("找到搜索按钮");
                var x = search_bt.bounds().centerX();
                var y = search_bt.bounds().centerY();
                // log("搜索按钮中心点: ", x, y);
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
            log("输入昵称失败");
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


    log("找到了第一个用户");
    // var clickRet = id("subList").findOne().children().findOne( id("nameTv") ).parent().click();

    // if( clickRet == true ) 
    //     return true;
    // else 
    //     return false;

    return id("subList").findOne().children().findOne( id("nameTv") ).parent().click()
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
    var my_page = id("bottomLabel").className("android.widget.TextView").text("我的").findOne()
    if( my_page ){
        log("找到我的按钮");
        my_page.parent().click()

        //等待“我的页面"加载完成
       // waitForActivity("com.android.systemui.recents.RecentsActivity");

        // 点击大神专属按钮
        if( id("rl_god_title").exists() ){
            log("找到大神专属按钮");
            id("rl_god_title").findOne().parent().click();

            // 等待大神专属页面加载成功

            // 点击发现新老板
            var find_boss = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne()
            if( find_boss != null ){
                log("找到点击发现新老板按钮");
                var x = find_boss.findOne().bounds().centerX();
                var y = find_boss.findOne().bounds().centerY();
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
       var find_boss = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOne()
        if( find_boss != null ){
            log("找到点击发现新老板按钮");
            var x = find_boss.findOne().bounds().centerX();
            var y = find_boss.findOne().bounds().centerY();
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
    if(id("ivActivityView").exists()){
        log("出现了广告");
        id("ivCloseDialog").click()
        // back(); //点一下返回键即可
    }

    var my = id("bottomLabel").className("android.widget.TextView").text("我的").findOnce(0)

    // 点击我的按钮，进入“我的页面”
    if( my != null ){
        log("找到我的按钮");
        my.parent().click()

        //等待“我的页面"加载完成
       // waitForActivity("com.android.systemui.recents.RecentsActivity");

        // 如果是大神界面，则直接点击”发现新老板“
        if( id("toolbarTitle").text("大神").exists() ){
            log("大神界面");
            // 点击发现新老板

            var find_boss = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOnce(0)
            if( find_boss != null ){
                log("找到点击发现新老板按钮");

                var x = find_boss.bounds().centerX();
                var y = find_boss.bounds().centerY();
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
            var god = id("rl_god_title").findOnce(0)
            if( god != null ){
                log("找到大神专属按钮");
                god.parent().click();

                // 等待大神专属页面加载成功

                // 点击发现新老板
                var find_boss = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOnce(0)
                if( find_boss != null ){
                    log("找到点击发现新老板按钮");

                    var x = find_boss.bounds().centerX();
                    var y = find_boss.bounds().centerY();
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
    var chat_bt
    if(id("follow").exists()){
        chat_bt = id("chat").findOne()
    } else {
        chat_bt = id("userChatFollow").findOne().parent()
    }

    if( chat_bt != null ){
        log("找到聊一聊按钮");

        if( chat_bt.click() ){
            log("点击聊一聊按钮成功");
            return true;
        }
        else {
            log("点击聊一聊按钮失败, click again");
             if (chat_bt.click()) {
                log("点击聊一聊按钮成功");
                return true;
             }
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
    back();
    // 
    if( id("follow").exists() ){
        back();
        sleep(100)
        back()

        if( id("toolbarButtonText").className("android.widget.TextView").text("搜索").exists() ){
            return true;
        }
        else return false;

    }
    else return false;
}

/* 
 * description: 发送一个测试文本
 * parameter: None
 * return: ture 返回成功，false 返回出错
 */
function send_test(){
    id("tvQuickMsg").className("android.widget.TextView").findOne().parent().click();
}

/* 
 * description: 总流程
 * parameter: None
 * return: ture 返回成功，false 返回出错
 */
function Main_Process(){
    // 1. 进入发现新老板页面
    if( goto_bosses_page() == false ){
        return ;
    }

    // 2. 获取用户昵称
    sleep(1000);
    scroll_up();
    random(3000, 5000)

    nickNames = get_nick_name_list(10);
    log("昵称个数：", nicksNum);

    // 3. 获取到昵称列表之后，返回到搜索框页面
    if( back_to_main_page() == false || nicksNum == 0){
        return ;
    }

    sleep(1000)

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
                sleep(1000);

                 // 8. 点击聊一聊
                click_to_chat();
                sleep(2000);

                // 9. 发送一个测试文本
                send_test();
                sleep(1000);

                // 10. 回到搜索页面
                exit_to_search_page_from_chat_page();
                sleep(2000);
            }
        }
    }

    back()  /* return main page */
}
/** TODO: 优化
 * 1. 把主页或其他上的几个控件写死在全局变量中，每次判断一下是否存在，不存在的话
 * 再去查找，这样应该可以减少在主页这种控件密集的页面查找浪费时间。
 * 
 * 2. 全局变量Nick name list 一轮结束之后需要清空，因为目前就一轮查找，后面多轮查找的话，
 * 之前存储的用户会重新发送，而在多轮查找的情况下，上述 1的方案，才会发挥更好的性能。
 * 
 * 3.在get_nick_name 函数中有提到，需要尽快解决，因为目前经常会获取到0个boss，导致空运行的出现
 * 
 * 4.可将上面的部分函数合并
 * 
 * 5.不知是否有api 函数可以代替sleep, 完成实时等待功能，而不是sleep盲目等待。
*/

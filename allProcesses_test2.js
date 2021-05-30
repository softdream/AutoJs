"ui";

//--------------- 定义一个全局变量 -----------------//
setScreenMetrics(1080, 1920); //设置手机屏幕分辨率

var myAPP = {};

myAPP.title = "比心引流";// 脚本名称
myAPP.packageName = "com.yitantech.gaigai";//程序包名
myAPP.appVersion = "1.0.0";//APP版本

// 任务总数
myAPP.totalNum = "5000";

// 每执行多少个
myAPP.every = "10";

// 暂停的秒数
myAPP.suspend = "2000";

// 最小延时1秒
myAPP.delayMin = "100";

// 最大延时3秒
myAPP.delayMax = "2000";

// 寻找节点的超时时间，单位：毫秒
myAPP.findTimeout = "1000";

// 任务的超时时间， 单位：毫秒
myAPP.taskTimeout = "60000";

// 一次获取用户名的个数
myAPP.usersNum = "100";

myAPP.isSuspend = false;
//---------------- ---------------------------// 
var nickNames = new Array();// 定义一个全局数组保存获取到的昵称
var nicksNum = 0;

//---------------------- UI -----------------------//

ui.layout(
    <ScrollView>
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="比心引流脚本" />
            </appbar>

            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                <vertical padding="18 8" h="auto">
                    <linear>
                        <text text="功能：引流" textColor="black" w="auto" h="40" />

                    </linear>
                </vertical>
                <View bg="#dddddd" h="*" w="3" />
            </card>


            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                <vertical padding="18 8" h="auto">
                    <linear>
                        <text text="计划运行：" textColor="black" w="auto" />
                        <input id="totalNum" color="black" inputType="number" w="60" />
                        <text text="个后，停止" textColor="black" w="auto" />
                    </linear>

                    <linear>
                        <text text="每执行：" textColor="black" w="auto" />
                        <input id="every" color="black" inputType="number" w="60" />
                        <text text="个，暂停" textColor="black" w="auto" />
                        <input id="suspend" color="black" inputType="number" w="60" />
                        <text text="毫秒" textColor="black" w="auto" />
                    </linear>

                    <linear>
                        <text text="延时时间：" textColor="black" w="auto" />
                        <input id="delayMin" color="black" inputType="number" w="60" />
                        <text text="~" textColor="black" w="auto" />
                        <input id="delayMax" color="black" inputType="number" w="60" />
                        <text text="毫秒" textColor="black" w="auto" />
                    </linear>

                    <linear>
                        <text text="任务超时时间：" textColor="black" w="auto" />
                        <input id="taskTimeout" color="black" inputType="number" w="80" />
                        <text text="毫秒" textColor="black" w="auto" />
                    </linear>

                    <linear>
                        <text text="每次获取昵称的个数：" textColor="black" w="auto" />
                        <input id="usersNum" color="black" inputType="number" w="80" />
                        <text text="个" textColor="black" w="auto" />
                    </linear>


                </vertical>
                <View bg="#dddddd" h="*" w="3" />
            </card>
            <button style="Widget.AppCompat.Button.Colored" margin="10" id="start">启动</button>
        </vertical>
    </ScrollView>
);

 
getData();   // 读取界面配置

// 按钮单击事件
ui.start.on("click", () => {
    log("点击启动");
    saveData();   // 保存界面配置
    
   // 在这里执行脚本的主要流程
   main_process();
});


// 保存界面配置
function saveData() {

    setStorageData(myAPP.characteristic, "totalNum", ui.totalNum.text())
    setStorageData(myAPP.characteristic, "every", ui.every.text())
    setStorageData(myAPP.characteristic, "suspend", ui.suspend.text())
    setStorageData(myAPP.characteristic, "delayMin", ui.delayMin.text())
    setStorageData(myAPP.characteristic, "delayMax", ui.delayMax.text())
    setStorageData(myAPP.characteristic, "taskTimeout", ui.taskTimeout.text())
    setStorageData(myAPP.characteristic, "usersNum", ui.usersNum.text());

    log("totalNum: ", myAPP.totalNum);
    log("every: ", myAPP.every);
    log("suspend: ", myAPP.suspend);
    log("delayMin: ", myAPP.delayMin);
    log("delayMax: ", myAPP.delayMax);
    log("taskTimeout: ", myAPP.taskTimeout);
    log("usersNum: ", myAPP.usersNum);
};

// 读取界面配置
function getData() {

    if (getStorageData(myAPP.characteristic, "totalNum") != undefined) {
        myAPP.totalNum = getStorageData(myAPP.characteristic, "totalNum")
    };
    ui.totalNum.setText(myAPP.totalNum);
    if (getStorageData(myAPP.characteristic, "every") != undefined) {
        myAPP.every = getStorageData(myAPP.characteristic, "every")
    };
    ui.every.setText(myAPP.every);
    if (getStorageData(myAPP.characteristic, "suspend") != undefined) {
        myAPP.suspend = getStorageData(myAPP.characteristic, "suspend")
    };
    ui.suspend.setText(myAPP.suspend);
    if (getStorageData(myAPP.characteristic, "delayMin") != undefined) {
        myAPP.delayMin = getStorageData(myAPP.characteristic, "delayMin")
    };
    ui.delayMin.setText(myAPP.delayMin);
    if (getStorageData(myAPP.characteristic, "delayMax") != undefined) {
        myAPP.delayMax = getStorageData(myAPP.characteristic, "delayMax")
    };
    ui.delayMax.setText(myAPP.delayMax);
    if (getStorageData(myAPP.characteristic, "taskTimeout") != undefined) {
        myAPP.taskTimeout = getStorageData(myAPP.characteristic, "taskTimeout")
    };
    ui.taskTimeout.setText(myAPP.taskTimeout);

    if ( getStorageData(myAPP.characteristic, "usersNum") != undefined) {
        myAPP.usersNum = getStorageData(myAPP.characteristic, "usersNum");
    };
    ui.usersNum.setText(myAPP.usersNum);
};



//保存本地数据
function setStorageData(name, key, value) {
    const storage = storages.create(name);  //创建storage对象
    storage.put(key, value);
};

//读取本地数据
function getStorageData(name, key) {
    const storage = storages.create(name);  //创建storage对象
    if (storage.contains(key)) {
        return storage.get(key, "");
    };
    //默认返回undefined
};

//删除本地数据
function delStorageData(name, key) {
    const storage = storages.create(name);  //创建storage对象
    if (storage.contains(key)) {
        storage.remove(key);
    };
};

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
    sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
}

/* 
 * description: 滑动屏幕翻页
 * return: 无
 */
function scroll_down() {
    //开始翻页
    // 从小往上滑动屏幕
    swipe(  640, 1000, 640,  1930, 1000);// 根据坐标值来翻页
    sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
}

/* 
 * description: 刷新页面
 * return: 无
 */
function refresh_page()
{
    // 一种方法是使用swipe函数
    swipe( 640, 635, 640, 1060, 1000 );    
    sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
}

/* 
 * description: 回到主页面
 * return: 无
 */
function back_to_main_page(){
    back(); // 在老板页面先点击返回按钮

    waitForActivity("com.bx.main.MainActivity"); // 等待页面出现

    // 有时页面会跳出广告，需要处理掉
    /* 广告处理待定*/
    // if(id("ivActivityImg").exists()){
    //     log("出现了广告");
    //     back(); //点一下返回键即可
    // }

    var main_page = id("bottomLabel").className("android.widget.TextView").text("比心").findOnce(0)
    if( main_page ){
        log("点击回到主页面");
        
        if( main_page.parent().click() ){
            log("点击按钮成功");
            return true;
        }
        else {
            log("点击按钮失败");
        }
    }
    else {
        log("没找到按钮")
    }

    return false;
}

/* 
 * description: 点击进入搜索框准备开始搜索
 * return: true 执行成功，false 执行失败
 */
function click_ready_for_search(){

    //var search = id("searchView").findOnce(0);
    var search = id("timeline_text_search").findOne();
    if( search != null ){
        log( "找到了搜索框" );
        
        if( search.click() ){
            log("点击按钮成功");
            return true;
        }
        else {
            log("点击按钮失败");
        }
    }
    else {
        log("没找到搜索框")
    }

    return false;
}

/* 
 * description: 在搜索框中搜索用户名,并点击搜索按钮
 * parameter: nickName: 用户昵称
 * return: true 执行成功
 */
function serch_the_users_and_click_in( nickName ){
    log("准备搜索：", nickName);

    waitForActivity("com.bx.android.search.SearchActivity");

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

                if( click( x, y ) ){
                    log("点击搜索成功");
                    sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
                    return true;
                }
                else {
                    log("点击搜索失败");
                }
            }
            else {
                log("没找到搜索按钮");
            }
        }
        else {
            log("输入昵称失败");
        }
    }
    else {
        log("没找到搜索输入框");
    }

    return false;
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
    var clickRet = id("subList").findOne().children().findOne( id("nameTv") ).parent().click();

    if( clickRet == true ) {
        sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
        return true;
    }
    else 
        return false;
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
    }

    // 点击我的按钮，进入“我的页面”
    var my_page = id("bottomLabel").className("android.widget.TextView").text("我的").findOnce(0)
    if( my_page != null ){
        log("找到我的按钮");
        my_page.parent().click()
        sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时

        //等待“我的页面"加载完成
        // waitForActivity("com.android.systemui.recents.RecentsActivity");

        // 查看上方是否有大神专属入口
        var god_only = id("rl_god_title").findOnce(0)
        if( god_only ){
            god_only.parent().click();
            sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
        } else {
            log("不在User页面")     //虽然不在user页面，但是有可能已经在大神页面了
        }

        if( id("toolbarTitle").text("大神").exists() ){
            log("进入大神界面");

            // 点击发现新老板
            var find_boss = id("tvGodNewbieItemFuncTitle").className("android.widget.TextView").text("发现新老板").findOnce(0)
            if( find_boss != null ){
                log("找到点击发现新老板按钮");

                var x = find_boss.bounds().centerX();
                var y = find_boss.bounds().centerY();
                log("发现新老板按钮中心点: ", x, y);

                if( click( x, y ) ){
                    log("点击进入发现新老板界面");
                    sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
                    return true;
                }
                else{
                    log("点击进入发现新老板界面失败了");
                }
            }
            else{
                log("没找到点击发现新老板按钮");
            }
        }
        else{
            log("也不在大神页面");
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
            sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
            return true;
        }
        else {
            log("点击聊一聊按钮失败, click again");
             if (chat_bt.click()) {
                sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
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

    /* 如果回退到boss主页，两种情况（关注/未关注） */
    if( id("chat").exists() || id("userChatFollow").exists()){
        back();
        sleep(500)

        if( id("toolbarButtonText").className("android.widget.TextView").text("搜索").exists() ){
            return true;
        }
        else return false;
        /* 如果没有回退到搜索页面，最好再去尝试一下 */
    }
    else return false;
}

/* 
 * description: 从搜索页面返回到主页面
 * parameter: None
 * return: ture 返回成功，false 返回出错
 */
function return_to_main_page_from_search_page(){
    // 先判断现在在不在搜索页面
    if(id("toolbarButtonText").className("android.widget.TextView").text("搜索").exists()){
        //如果在搜索页面，则执行back     
        log("在搜索页面"); 
        back();
        sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
        // 返回之后判断一下在不在主页面
        if(id("bottomLabel").className("android.widget.TextView").text("回到顶部").exists()){
            //如果在主页面，返回成功
            log("返回到主页面了");
            return true;
        }
        else {
            log("不在主页面");
        }
    }
    else{
        log("不在搜索页面");
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
    } 
    else {
        log("不在与boss(" + nick_name + ")聊天界面")
    }
}

/* 
 * description: 总流程
 * parameter: None
 * return: ture 返回成功，false 返回出错
 */
function the_total_processes(){
    // 1. 进入发现新老板页面
    if( goto_bosses_page() == false ){
        return false;
    }

    // 2. 获取用户昵称
    sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
    scroll_up();
    random(3000, 5000)

    /* 昵称参数，可以在UI中设置一个变量，用来传输 */
    nickNames = get_nick_name_list(myAPP.usersNum);
    log("昵称个数：", nicksNum);

    // 3. 获取到昵称列表之后，返回到搜索框页面
    if( back_to_main_page() == false || nicksNum == 0){
        return false;
    }

    sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时

    // 4. 点击进入搜索框
    if( click_ready_for_search() == false){
        return false;
    }
    sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时

    // 5. 遍历昵称列表，对每个昵称执行以下操作
    for( var i = 0; i < nicksNum; i ++ ){
        // 6. 搜索用户
        if(serch_the_users_and_click_in( nickNames[i] )){
            sleep(random( myAPP.delayMin, myAPP.delayMax )); //随机延时

            // 7. 点进去用户
            if( click_onto_first_user_found_by_searching() ){
                sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时

                 // 8. 点击聊一聊
                if( click_to_chat() == false){
                    return false;
                }
                sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时

                // 9. 发送一个测试文本
                send_test();
                sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时

                // 10. 回到搜索页面
                if( exit_to_search_page_from_chat_page() == false ){
                    return false;
                }
                sleep(random( myAPP.delayMin, myAPP.delayMax ) ); //随机延时
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    //back()  /* return main page */
    // 11. 执行完一轮之后返回到主页面，准备下一次
    if( return_to_main_page_from_search_page() == false ){
        return false;
    }

    return true;
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

/* 
 * description: 主任务流程
 * parameter: None
 * return: ture 返回成功，false 返回出错
 */
function main_process(){
    var task_cnt = 0

    while( task_cnt < myAPP.totalNum && myAPP.isSuspend == false ){
        log( "当前的任务：", task_cnt );

        // 执行主要步骤
        the_total_processes();
        task_cnt++;
    }

    toastLog("任务已完成，结束脚本")
    exit();   //结束脚本
} 

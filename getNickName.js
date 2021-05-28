//function APP_取用户昵称() {
    ///var nickName = ""

    /*let object = className("android.view.View").depth(20).find();
    if (!object.empty()) {
        object.forEach(function (currentValue, index) {
            log("depth20:", index);
        
            var nickName = currentValue.text();
            toast( nickName );
        });

    } else {
        log("没找到");
    };*/


    var nickName = ""

    //waitForActivity("com.bx.user.controler.userdetail.activity.UserDetailV2Activity");   //等待个人资料页出现
    if (id("username").exists()) {
        nickName = id("username").findOne().text()   //获取昵称
        log(nickName);
    } else  {
        log("Error:未获取到昵称节点")
    }

//};
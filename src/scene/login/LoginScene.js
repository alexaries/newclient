/**
 * Created by Administrator on 14-4-25.
 * 登陆scene
 */
var LoginScene = BaseScene.extend({
    init:function () {
        var bRet = false;
        if (this._super()) {

            log("show login scene ");

//            var plistpicres = [res.mainbg_plist,res.main_ui_plist,res.game_ui_plist,res.login_ui_plist];

            var plistpicres = concatArray([g_loadplist_all1,g_loadplist_login]);
            var plistanimress = concatArray([]);
            var ccsanimress = concatArray([]);
            var plistmanyanimresed = concatArray([]);
            this.startLoadRes(plistpicres,plistanimress,ccsanimress,plistmanyanimresed) //加载资源

            bRet = true;
        }
        return bRet;
    },
    //资源加载完 显示界面
    showView:function(){
        this.cleanLoadView();
        var size = cc.director.getWinSize();

        var bgimg = cc.Sprite.create("#mainbg.png")
        bgimg.setPosition(cc.p(size.width / 2,size.height / 2))
        this.addChild(bgimg);
        if(sGameData.mAppMainBGScale) {
            bgimg.setScaleX(size.width / bgimg.width)
            bgimg.setScaleY(size.height / bgimg.height)
        }

        //显示 层
        var aLoginLayer = LoginLayer.create();
        this.addChild(aLoginLayer,1);




        this.schedule(this.update,0.05);

    },

    //进入时执行
    onEnter:function(){
        this._super();
        sGameData.mLoginScene = this;
        sGameData.mCurrScene = this;
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mLoginScene = null;
    },
    //每帧更新
    update:function(){
        this._super();

    },
    //更新网络指令
    updateOnLoadDataInHall:function(netdata){
        var command = netdata[0];
        switch (command){
            case S_REG:
                this.noticeReg(netdata);
                break;
            case S_RETRIEVE_PASSWORD:
                this.noticeRetrievePassword(netdata);
                break;
            default:
                log("unknown command="+command);
                break;
        }
    },

    //注册结果
    noticeReg:function(netdata){
        log("noticeReg")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            sGameData.mRegLayer.saveToLocal(1);
            sGameData.mRegLayer.gotoLogin();
            showLittleNotice(sResWord.w_reg_suc);
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //找回密码
    noticeRetrievePassword:function(netdata){
        log("noticeRetrievePassword")
        var flag = netdata[1];
        if(flag == NET_SUCCESS){
            var msg = netdata[2];
            showLittleNotice(msg,0,2);
            if(sGameData.mCurrLayer == sGameData.mLoginLayer){
                sGameData.mLoginLayer.showGetPwd(false);
            }
            //showLittleNotice(sResWord.w_reg_suc);
        }else{
            var code = netdata[2];
            var msg = netdata[3];
            showLittleNotice(msg);
        }
    },
    //设置用户数据
    setUserData:function(){
        if(sGameData.mIsTestNoNet){
            this.setTestData();
        }
    },
    //设置测试数据
    setTestData:function(){
        initTestdataForManager();
    },
    //跳转到主界面
    gotoMain:function(){
        log("go to main scene")

        this.setUserData();
        gotoSceneByLoading(TargetSceneMain,0);

    }

});

LoginScene.create = function () {
    var sg = new LoginScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

LoginScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = LoginScene.create();
    scene.addChild(layer);
    return scene;
};


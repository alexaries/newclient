/**
 * Created by Administrator on 14-4-14.
 * cpp js 交互
 */
//ccp 调用 js
var CppCall = {};
CppCall.enterBackgroundTime = 0;
CppCall.enterForegroundTime = 0;
//cpp to js  设置初始数据
CppCall.getInitdataFromCpp= function(usesdklogin,agent,version,serverip,serverport,promoter,useappconfig){
    log("getInitdataFromCpp----CppCall");
    log("usesdklogin="+usesdklogin)
    log("agent="+agent)
    log("version="+version)
    log("serverip="+serverip)
    if(!promoter){
        promoter = agent;
    }
    log("promoter="+promoter)
    if(!useappconfig){
        useappconfig = "0";
    }
    log("useappconfig="+useappconfig)

    sGameData.mAppUsesdklogin = usesdklogin;
    sGameData.mAgent = agent;
    sGameData.mGameVersion = version;
    sGameData.mPromoter = promoter;
    if(useappconfig == "1"){
        sGameConfig.useconfig = "app"
    }
    setVersionInfoByAgent();
    if(checkValueInvalid(serverip)){
        log("serverip is undefined");
    }else{
        log("serverip="+serverip)
        log("serverport="+serverport)
        if(!sGameConfig.isLocalTest){
            sGameConfig.serverIp = serverip
            sGameConfig.serverWebSocketPort = serverport
        }
    }
};

//cpp to js  获取app 版本（xml）
//respath ios 使用 （/doc 移到 /lib/cache）
CppCall.getAppBaseVersion = function(ver,respath){
    log("js getAppBaseVersion---"+ver);
    sGameData.mAppBaseVersion = ver;
    sGameData.mResPathSys = respath;
};

//cpp to js  sdk登录 (state 1suc 0fail)
CppCall.sdkLoginEnd = function(state,sdktype,uid,session){
    log("js sdkLoginEnd--"+uid+"|"+session+"|s="+state);
    if(state == 1){
        sGameData.mUid_sdk = uid
        sGameData.mSession_sdk = session

        if(sGameData.mCurrScene == sGameData.mJSStartScene){
            sGameData.mJSStartScene.loginBySdk();
        }else if(sGameData.mCurrLayer == sGameData.mLoginLayer){
            sGameData.mLoginLayer.loginBySdk()
        }
    }else{
        if(sGameData.mCurrScene == sGameData.mJSStartScene){
            sGameData.mJSStartScene.loginSdkError(1);
        }else if(sGameData.mCurrLayer == sGameData.mLoginLayer){
            sGameData.mLoginLayer.loginSdkError(1)
        }

    }

};

//cpp to js  下载图片结束
CppCall.loadPicEnd = function(oid,resname,state){
	log("js loadPicEnd--"+oid+"|"+resname+"|"+state)
	var state1= Number(state)
	updateLoadResState(oid,state1);
};

//js 掉cpp http访问
CppCall.httpResultForjs = function(code,data){
    log("js httpResultForjs--"+code+" data="+data);

    if(code == "contactkefu"){
        if(sGameData.mContactKefuLayer){
            showLittleNotice(sResWord.w_tip_contact_submitok);
            sGameData.mContactKefuLayer.uploadEnd();
        }
    }

    if(code == "jiaDuALiPay"){
        showPayWait(false);
        //if(data=="failed"){
        //
        //}
    }

    if(code == "jiaDuWXPay"){
        showPayWait(false);
        //if(data=="failed"){
        //
        //}
    }

    if(code = "tihuoApply"){
        //result ---{"result":1,"msg":"没有此订单."}
        var msgStr = JSON.parse(data).msg;
        showLittleNotice(msgStr);
        if(sGameData.mDeliveryPanel){
            sGameData.mDeliveryPanel.clearOrderEditBox();
        }
    }
}

//cpp to js  选择图片结束
CppCall.choosePicEnd = function(state,data){
    log("js choosePicEnd--"+state+" datalen="+data.length);
    var state1= Number(state)
    sGameData.mChoosePicData = data;
    if(sGameData.mContactKefuLayer){
        sGameData.mContactKefuLayer.showChoosePic();
    }
};

//cpp to js  上传头像结束
CppCall.upAvatarEnd = function(state){
    log("js upAvatarEnd--"+state)
    var state1= Number(state)
    //updateLoadResState(oid,state1);
    sGameData.mGetUserInfoUid = sGameData.mUser.id;

    //var picname = sGameData.mUser.id+".jpg";
    //sGameData.mGameNet.sendChangeUserInfo(2,picname);
    sGameData.mGameNet.sendGetUserInfo(sGameData.mGetUserInfoUid,1);
};

//cpp to js 设置外部数据
CppCall.setOpenUrlData = function(openurldata){
    log("js setOpenUrlData--"+openurldata)
    if(openurldata&&openurldata.length > 0){
        //showLittleNotice(openurldata);
    }

}

//分享结束 1成功 2失败 (type 1好友 2朋友圈)
CppCall.doShareEnd = function(type,state){
    log("js doShareEnd--"+state)
    if(state == 1){
        doShareSuc();
    }
}

//cpp to js  获取设备电量 信号
CppCall.getPhoneInfoForBatterySignalEnd = function(battery,signal){
    log("js getPhoneInfoForBatterySignalEnd---"+battery+"|"+signal);
    sGameData.mDeviceInfo_battery = battery;
    sGameData.mDeviceInfo_signal = signal;
    sGameData.mDeviceInfoHasUpdate = true;
};


CppCall.doDownTestResEnd = function(state){
    if(state == 1){
        showLittleNotice("down test res ok");
    }else{
        showLittleNotice("down test res fail");
    }
}

//下载游戏资源(失败处理)
CppCall.doDownGameResEnd = function(gameId,resName,state){
    log("doDownGameResEnd---"+gameId+"|"+resName+"|"+state)
    setCurrDowningGameResState(gameId,resName,state)
}
CppCall.setGameResDownSize = function(gameId,resname,size){
    log("setGameResDownSize---"+gameId+"|"+resname+"|"+size)
    setDownBaseResPercent(Number(gameId),resname,Number(size));
}

CppCall.getUUIDEnd = function(uuid){
    log("js getUUIDEnd=="+uuid)
    if(uuid&&uuid.length>0){
        var gid = md5(uuid);
        var ls = cc.sys.localStorage;
        ls.setItem(HAS_LOCAL_GUESTID, true);
        ls.setItem(LOCAL_GUESTID, gid);
        sGameData.mGuestUUID = gid
        log("mGuestUUID------"+sGameData.mGuestUUID);
    }
}


//cpp to js  充值ok
CppCall.payok = function(orderno,vinfo){
    log("js payok--"+orderno)
    var vpaylist = {};
    vpaylist.orderno = orderno;
    vpaylist.vinfo = vinfo;
    sGameData.mVPayLogList.push(vpaylist);
    startPayVerify();

    showLittleNotice(sResWord.w_pay_verifying);
}


//cpp to js  google充值ok
CppCall.googlepayok = function(orderno,payinfo,purchasedata,dataSignature){
    log("js googlepayok--"+orderno)
    log("payinfo--"+payinfo)
    log("purchasedata--"+purchasedata)
    log("dataSignature--"+dataSignature)
//    var vpaylist = {};
//    vpaylist.orderno = orderno;
//    vpaylist.payinfo = payinfo;

    sGameData.mGameNet.sendGooglePay(orderno,payinfo,purchasedata,dataSignature);

    showLittleNotice(sResWord.w_pay_verifying);
}

//进入后台(ios)或关闭前(android)执行操作（费时)
CppCall.doActionForEnterBackOrStop = function(){
    log("js doActionForEnterBackOrStop")
}

//type 进入前后台 1 前台 2后台
//
CppCall.enterForeBackground = function(type){
    log("js enterForeBackground--"+type)
    SoundManager.enterForeBackground(type);
    if(type == 2){
        var now = (new Date()).getTime();
        CppCall.enterBackgroundTime = now;
        if(sGameData.mEnterBackgroundFor == "") {
            if(sGameData.mCurrScene == sGameData.mMainScene
                ||sGameData.mCurrScene == sGameData.mLoginScene) {
                if (!sGameData.mHasSaveConfigData) {//android ok
                    sGameData.mHasSaveConfigData = true;
                    //saveConfigDataToDB();
                }
            }
        }

    }else if(type == 1){
        var now = (new Date()).getTime();
        CppCall.enterForegroundTime = now
        if(now - CppCall.enterBackgroundTime > 1000*10*60){ // 超过600s 重连
            log(" game close net-- background 1 ")
            reStartGame();
        }else{


        }
        sGameData.mEnterBackgroundFor = "";
        if(sGameData.mAppCanLocalPushMsg){
            //if(cc.sys.isNative) {
            //sendLocalPushMsg();
            //}
        }
    }
}

//cpp to js  执行某些操作
CppCall.doSomeString = function(codestr,param1,param2,param3,param4,param5){
    log("doSomeString--"+codestr)
    var code = Number(codestr)

};

//ios 有可能会删除更新的资源文件
CppCall.cleanLocalGameResVersion = function(){
    log("cleanLocalGameResVersion--")

    var ls = cc.sys.localStorage;
    var version = 0;
    var list = sDataConfig.mGamesLocalResDatas;
    for(var i=0;i<list.length;i++){
        var data = list[i];
        var gameId = data[0];
        //数据保存 key  ：“gres_”＋gameId＋“_ver”
        var key = "gres_"+gameId+"_ver"
        ls.setItem(key, ""+data[1]);
    }
}


//js 调用 cpp
var CallCpp = {}
//执行某些操作 code
//1:获取配置 服务器地址 版本
//2:设置头像
//3: 给js 传递数据
//4:打开webview 1帮助 2公告 3用户协议 4全屏竖屏（有问题） 5全屏横屏 6上下有bar横屏
//5:打开关闭view
//6: 跳到某地址 add 0715
//7:银联支付  add 0818
//8:renderer add 0822
//9: 改变本地存储的值 add 0827
//10:公告 打开webview0912 1帮助 2公告 3用户协议 4全屏竖屏（有问题） 5全屏横屏
//11:清除某个js 脚本 add 1014
//12:添加搜索路径 add 1106
//13:获取app版本（xml）1216
//14:获取uuid
//15:选择图片（相册、照相），返回base64
//16:js调用cpp访问url (js 访问http有跨域问题，cpp没有)
//20:sdk登录
//21:sdk充值
//50:传递配置数据（如支付宝数据）
//80:获取手机电量 信号强度 时间
//81:android back 一次 提示
//101:分享
//102:积分墙 展示 add1128
//103:积分墙 积分管理
//104:广告 展示
//105:广告 隐藏
//191:分享 好友
//192:分享 朋友圈
//200:清除更新资源
//201:删除某文件
//500:新充值
//885:下载apk
//888:下载游戏资源
//889:获取下载游戏资源进度
//890:取消下载 --未实现
//900:下载测试版本更新包
CallCpp.doSomeString = function(code,param1,param2,param3,param4,param5){
    if(cc.sys.isNative) {
        var gameJSB = cc.GameJSB.sharedGJSB();
        gameJSB.doSomeString(code, param1, param2, param3, param4, param5);
    }
}


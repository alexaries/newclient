/**
 * Created by Administrator on 14-4-9.
 * 一些通用方法
 */

//获取游戏名
var getGameName = function(gameid){
    var msg = "";
    if(gameid == GAME_TYPE_ZJH){
        msg = sResWord.w_zjh;
    }else if(gameid == GAME_TYPE_DN){
        msg = sResWord.w_dn;
    }else if(gameid == GAME_TYPE_DDZ){
        msg = sResWord.w_ddz;
    }
    return msg
}

//获取支付名称
var getPayTypeName = function(type){
    var name = sResWord.w_pay_apple;
    if(type == PAY_GOOGLE){
        name = sResWord.w_pay_google;
    }else if(type == PAY_ALIPAY){
        name = sResWord.w_pay_alipay;
    }else if(type == PAY_WXPAY){
        name = sResWord.w_pay_wechat;
    }
    return name;
}

//获取支付图标
var getPayTypePic = function(type){
    var pic = "pay_apple.png";
    if(type == PAY_ALIPAY){
        pic = "pay_ali.png";
    }else if(type == PAY_WXPAY){
        pic = "pay_weichat.png";
    }else if(type == PAY_UPMP){
        pic = "pay_union.png";
    }else if(type == PAY_SMS){
        pic = "pay_sms.png";
    }
    return pic;
}

//获取 充值 渠道id
var getPayChannelId = function(payagent){
    var paychannelId = 0
    switch(payagent){
        case PAY_ALIPAY:
            paychannelId = PAY_CHANNEL_ALIPAY;
            break;
        case PAY_WXPAY:
            paychannelId = PAY_CHANNEL_WXPAY;
            break;
        case PAY_APPLE:
            paychannelId = PAY_CHANNEL_APPSTOTE;
            break;
        case PAY_HEEPAY:
            paychannelId = PAY_CHANNEL_HEEPAY;
            break;

        default:
            log("unknown paychannelId="+payagent);
            break;
    }
    return paychannelId;
}

// ****** init  *********

 //设置 版本信息
var setVersionInfo = function(){
    log("setVersionInfo==="+sGameData.mAppVersionFor+"|"+sGameData.mAgent);

    if(sGameData.mAppIsSubmitToAppStore){ //提交appstore审核
        sGameData.mAppCanUseFacebook=false;//能否使用facebook
        sGameData.mAppUsesdklogin=false; //使用sdk登录
        sGameData.mAppCanShowShare = false; //分享 未实现
        sGameData.mAppCanShowScoreWall = false;//积分墙
        sGameData.mAppCanShowSpecialUI = false;//app能否显示 (兑奖等)
        sGameData.mAppCanShowDaily = false;//显示每日必做
        sGameData.mAppCanShowSysGonggao = false;//能否显示系统公告
        sGameData.mAppCanShowTaskShare = false;
        sGameData.mAppCanLocalPushMsg = false;

        sGameData.mCashUseDot = false;

        if(cc.sys.os == cc.sys.OS_ANDROID){  //MM 屏蔽
            sGameData.mAppCanShowMatch = false;//能否显示 比赛
            sGameData.mAppCanOpenMatch = false;//开放比赛
        }
    }

    sGameData.mAppMainBGScale=true;//主背景拉伸
    sGameData.mTipColor=cc.color(255,255,255);//颜色／／26,67,164


    if(sGameData.mIsTestNoNet){
        sGameData.mAppCanShowDaily = false;
        //sGameData.mAppCanShowSysGonggao = false;
        sGameData.mIsTestUser = true;
    }

    if(!cc.sys.isNative){
        //sGameData.mAppCanCheckConfigVersion = false;
        if(sGameConfig.isLocalTest){
            //sGameData.mAppUseUUIDAutoLogin = false;
        }
        setVersionInfoByAgent();
    }

    initGameResVersion();

    if(cc.sys.os == cc.sys.OS_IOS){ //ios 暂时 屏蔽

    }

    

    sGameData.mHelpUrl = sGameConfig.serverResWebhttp+"help.do";


    //游戏配置数据
    sGameData.mGameConfigDatas.push(gameConfigData_zjh);
    sGameData.mGameConfigDatas.push(gameConfigData_DDZ);
    //sGameData.mGameConfigDatas.push(gameConfigData_DDZMatch);
    sGameData.mGameConfigDatas.push(gameConfigData_DN);


    if(cc.ENGINE_VERSION == "Cocos2d-JS v3.0 Final"){//判断cocos 版本号
        sGameData.mCocosVerCode = 30000;
    }else if(cc.ENGINE_VERSION == "Cocos2d-JS v3.1"){
        sGameData.mCocosVerCode = 30100;
    }
    log("CocosVerCode=="+sGameData.mCocosVerCode);
}
//设置游戏资源版本号
var initGameResVersion = function(){
    if(!cc.sys.isNative) {
        setGameResDefaultLocalVersion(GAME_TYPE_DDZ, 6);

    }
}

//根据渠道设置 界面
var setVersionInfoByAgent = function() {
    setViewInfoByAgent();
}

//开始游戏前 初始化 数据
var initDataBeforeStartGame = function(){

}
//把配置数据传递到cpp
var setDataConfigToCpp = function(){
    log("setDataConfigToCpp---")
    CallCpp.doSomeString(50, sDataConfig.mPartner_ali,sDataConfig.mSeller_ali,sDataConfig.mAlipay_webhttp,"","");
}
//从配置数据 初始化系统数据
var initSysDataByConfig = function(){
    var chatDurTime = Number(getGameSysConfig("sys_talk_interval"));
    var interativeDurTime = Number(getGameSysConfig("sys_animation_interval"));
    if(chatDurTime > 0){
        sGameData.mChatDurTime = chatDurTime;
    }
    if(interativeDurTime > 0){
        sGameData.mInterativeDurTime = interativeDurTime;
    }

    var ddzCallLordTime = Number(getGameSysConfig("ddz_wait_callload_time"));
    var ddzOutCardTime = Number(getGameSysConfig("ddz_wait_pullcard_time"));

    var dzpkReadyTime = Number(getGameSysConfig("texas_wait_ready_time"));
    var dzpkOpTime = Number(getGameSysConfig("texas_wait_operate_time"));

    var dnReadyTime = Number(getGameSysConfig("nn_wait_ready_time"));
    var dnOpTime = Number(getGameSysConfig("nn_wait_slip_card_time"));

    var zjhReadyTime = Number(getGameSysConfig("zjh_wait_ready_time"));
    var zjhOpTime = Number(getGameSysConfig("zjh_wait_operate_time"));

    var mjOpTime = Number(getGameSysConfig("xzmj_wait_operation_time"));

    if(ddzCallLordTime > 2){
        sGameData.mDDZCallLordTime = ddzCallLordTime - 2
    }
    if(ddzOutCardTime > 2){
        sGameData.mDDZOutCardTime = ddzOutCardTime - 2
    }

    if(dzpkReadyTime > 2){
        sGameData.mDZPKReadyTime = dzpkReadyTime - 2
    }
    if(dzpkOpTime > 2){
        sGameData.mDZPKOpTime = dzpkOpTime - 2
    }

    if(dnReadyTime > 2){
        sGameData.mDNReadyTime = dnReadyTime - 2
    }
    if(dnOpTime > 2){
        sGameData.mDNOpTime = dnOpTime - 2
    }

    if(zjhReadyTime > 2){
        sGameData.mZJHReadyTime = zjhReadyTime - 2
    }
    if(zjhOpTime > 2){
        sGameData.mZJHOpTime = zjhOpTime - 2
    }

    if(mjOpTime > 2){
        sGameData.mMJOpTime = mjOpTime - 2
    }
    if(!cc.sys.isNative&&cc.sys.os == cc.sys.OS_OSX) {
        sGameData.mChatDurTime = 2;
        sGameData.mInterativeDurTime = 2;
    }
}

//根据语言设置显示的文字
var setLanguageWord = function(){
    log("setLanguageWord="+sGameData.mUseSysLanguage);

    var useMinVer = true;
    if(useMinVer){//简化版
        if(!sGameData.mUseSysLanguage && sGameData.mGameLanguage == LANGUAGE_ZH_TW){
            sResWord = sResWord_zhtw;
            setResPathForSomeVersion(1);
        }else{
            sResWord = sResWord_zhcn;
        }
    }else{ //完整版
        if(sGameData.mUseSysLanguage){
            var currentLanguageType = cc.sys.language;
            switch (currentLanguageType) {
                case cc.sys.LANGUAGE_ENGLISH:
                    log("current language is English");
                    sResWord = sResWord_en;
                    break;
                case cc.sys.LANGUAGE_CHINESE:
                    log("current language is Chinese");
                    sResWord = sResWord_zhcn;
                    break;
                default:
                    log("unkown language "+currentLanguageType);
                    sResWord = sResWord_zhcn;
                    break;
            }
        }else{
            var currentLanguageType = sGameData.mGameLanguage;
            switch (currentLanguageType) {
                case LANGUAGE_ZH_CN:
                    log("current language is zh-cn");
                    sResWord = sResWord_zhcn;
                    break;
                case LANGUAGE_ZH_TW:
                    log("current language is zh-tw");
                    sResWord = sResWord_zhtw;
                    setResPathForSomeVersion(1);
                    break;
                case LANGUAGE_ZH_ZY:
                    log("current language is zh-zy");
                    sResWord = sResWord_zhzy;
                    break;
                case cc.sys.LANGUAGE_ENGLISH:
                    log("current language is English");
                    sResWord = sResWord_en;
                    break;
                default:
                    log("unkown language "+currentLanguageType);
                    sResWord = sResWord_zhcn;
                    break;
            }
        }
    }
};
//设置 不同版本的资源 ； type： 1 繁体
var setResPathForSomeVersion = function(type){
    if(type == 1){
        CallCpp.doSomeString(12,"Resource_ft","1","","","");
    }
}
//获取最新版本号
var getVersion = function(){
    var ls = cc.sys.localStorage;

    var musicon =  ls.getItem(LOCAL_MUSICON);
    var soundon =  ls.getItem(LOCAL_SOUNDON);
    var rememberpwd =  ls.getItem(LOCAL_REMEMBERPWD);
    var propsimgver = ls.getItem(LOCAL_PROPSIMGVER);
    var prizeimgver = ls.getItem(LOCAL_PRIZEIMGVER);
    if(musicon == "true"|| musicon == null||musicon==""){
        sGameData.mMusicon = true;
    }else{
        sGameData.mMusicon = false;
    }
    if(soundon == "true" || soundon == null||soundon==""){
        sGameData.mSoundon = true;
    }else{
        sGameData.mSoundon = false;
    }
    if(rememberpwd == "true" || rememberpwd == null||rememberpwd==""){
        sGameData.mNeedRememberPwd = true;
    }else{
        sGameData.mNeedRememberPwd = false;
    }

    if(propsimgver == null || propsimgver == ""){
        propsimgver = 0;
    }
    if(prizeimgver == null || prizeimgver == ""){
        prizeimgver = 0;
    }

    sGameData.mLocalPropsImgVer = propsimgver
    sGameData.mLocalPrizeImgVer = prizeimgver

    log("soundon=="+musicon+"|"+soundon);
    log("loadMusicSetting1=="+sGameData.mMusicon+"|"+sGameData.mSoundon);

    log("local img ver=="+sGameData.mLocalPropsImgVer+"|"+sGameData.mLocalPrizeImgVer);

    if(cc.sys.isNative){
        if(sGameData.mReqPropsImgVer > sGameData.mLocalPropsImgVer){
            removePropsLocalImg();
            sGameData.mLocalPropsImgVer = sGameData.mReqPropsImgVer
        }

        if(sGameData.mReqPrizeImgVer > sGameData.mLocalPrizeImgVer){
            removePrizeLocalImg();
            sGameData.mLocalPrizeImgVer = sGameData.mReqPrizeImgVer
        }
        saveImgResVer();
    }

}
//检查各种功能可否使用
var checkSysFunctionCanuse = function(){
    //各种 功能 要求的 最低build [ios ,android]
    var sharebuild = [9,7] //
    var sqlitebuild = [9,8] // 0115

    var cppbuild = Number(sGameData.mAppCppBuild);
    log("checkSysFunctionCanuse---"+cppbuild);
    var index = -1;
    if(cc.sys.os == cc.sys.OS_IOS){
        index = 0;
    }else if(cc.sys.os == cc.sys.OS_ANDROID){
        index = 1;
    }
    if(index > -1){
        //if(cppbuild < sharebuild[index]){
        //    sGameData.mAppCanShowShare = false; //
        //    sGameData.mAppCanShowTaskShare = false;
        //}
        //
        //
        //if(cppbuild < sqlitebuild[index]){
        //    sGameData.mUseSqliteByJS = false;
        //    sGameData.mAppCanCheckConfigVersion = false;//
        //}
    }

    if(cppbuild > 50){

    }


}
// ****** init end *********

// ****** down res game  pic*********



//从服务器获取游戏资源列表
var getGameResListFromServer = function(){
    log("getGameResListFromServer---")
    var gamelist = sGameData.mShowGames;
    var datas = [];
    for(var i=0;i<gamelist.length;i++){
        var gameid = gamelist[i]
        var localversion = getGameResLocalVersion(gameid);

        datas.push([gameid,localversion])
        log("gameid="+gameid+"|"+localversion)
    }
    if(sGameData.mAppUseDownGameRes){
        sGameData.mGameNet.sendGameResList(GAMERES_MAIN_VERSION,datas);
        //sGameData.mHasGetGameResData = true;
    }
}

//初始化游戏资源测试数据
var initTestGameBaseDatas = function(){
    log("initTestGameBaseDatas---")

    //http://192.168.0.168/qpgame/
    var baseurl = "http://qp.duole.cn/res/";
    var resdatas = [
        [GAME_TYPE_DDZ,"ddz_bres",baseurl+"gres_ddz.zip",1877119,1],
        [GAME_TYPE_DN,"dn_bres",baseurl+"gres_dn.zip",1411416,1],
        [GAME_TYPE_ZJH,"zjh_bres",baseurl+"gres_zjh.zip",674253,1]
    ];
    var datas = [];
    for(var i=0;i<resdatas.length;i++){
        var resd = resdatas[i];
        var data = new GameResData();
        data.mGameId = resd[0];
        data.mResName = resd[1];
        data.mUrl = resd[2];
        data.mSize = resd[3];
        data.mVersion = resd[4];
        datas.push(data);
    }//1
    sGameData.mGamesResDatas = datas;

}

//转换gameId(比赛的要换成游戏的)
var changeGameIdForGameRes = function(gameId){
    if(gameId == GAME_TYPE_DDZMATCH){
        gameId = GAME_TYPE_DDZ
    }
    return gameId;
}

//开始下载某游戏的资源（要处理重复下载的情况）
var startLoadGameBaseRes = function(gameId){
    log("startLoadGameBaseRes----"+gameId)
    gameId = changeGameIdForGameRes(gameId);
    if(!cc.sys.isNative){
        showLittleNotice(sResWord.w_tip_down_nosupport);
        return;
    }

    var datas = getGameResByGameId(gameId)
    if(datas.length > 0){
        showDownGameRes(true,gameId);
        sGameData.mIsDownLoadingGameRes = true;
        for(var i=0;i<datas.length;i++) {
            var gdata = datas[i];
            var oid = 1;
            var gameId = gdata.mGameId;
            var resname = gdata.mResName
            var url = gdata.mUrl
            var version = gdata.mVersion;

            if(sGameConfig.isLocalTest){
                var localurl = "http://192.168.0.66:8080/res/"
                var baseurl = "http://qp.duole.cn/res/";
                url = url.replace(localurl,baseurl)
                log("url=="+url)
            }

            var localversion = getGameResLocalVersion(gdata.mGameId);
            if(localversion < gdata.mVersion){
                CallCpp.doSomeString(888, "" + oid, "" + gameId, "" + url, resname, ""+version);
                var downdata = [gdata,RES_UPDATE_LOAD_ING];
                sGameData.mDowningGameResDatas.push(downdata);
            }else{
                var downdata = [gdata,RES_UPDATE_END];
                sGameData.mDowningGameResDatas.push(downdata);
            }
        }
    }else{
        showLittleNotice(sResWord.w_tip_down_nores);
    }
    //start
}

//下载某游戏资源结束
var downLoadGameResOver = function(gameId){
    log("downLoadGameResOver---"+gameId);
    gameId = changeGameIdForGameRes(gameId);
    sGameData.mIsDownLoadingGameRes = false;
    var gamename = getGameName(gameId)
    var word = gamename+sResWord.w_tip_down_over;
    showLittleNotice(word);
    sGameData.mDowningGameResDatas = [];

    updateDownGameResInfo(1,100);
}
//设置下载资源状态
var setCurrDowningGameResState = function(gameId,resname,state){
    log("setCurrDowningGameResState----"+gameId+"|"+resname+"|"+state)
    gameId = changeGameIdForGameRes(gameId);
    if(state == RES_UPDATE_END){
        var tgameId = gameId;
        if(checkHasDownBaseRes(tgameId)){
            downLoadGameResOver(tgameId)
        }
    }else{//下载失败
        var gamename = getGameName(gameId)
        var word  = gamename+sResWord.w_tip_down_fail;
        showLittleNotice(word);
        sGameData.mIsDownLoadingGameRes = false;
        sGameData.mDowningGameResDatas = [];
        updateDownGameResInfo(2,0);
    }
}

//设置 下载资源 进度
var setDownBaseResPercent = function(gameId,resname,size){
    gameId = changeGameIdForGameRes(gameId);
    if(size && size >= 0){
        var allsize = Number(getGameBaseResSize(gameId,0));
        var hasloadsize = Number(getGameBaseResSize(gameId,1));
        var newsize = (hasloadsize+size)
        var percent = Math.floor((newsize/allsize)*1000)/10;
        if(percent >100){
            percent = 100;
        }
        log("percent == "+newsize+"/"+allsize + " p=" +percent+"%");
        updateDownGameResInfo(0,percent)
    }
}
// 获取游戏基本资源大小  type:0总大小 1已下载完成大小
var getGameBaseResSize = function(gameId,type){
    gameId = changeGameIdForGameRes(gameId);
    var allsize = 0;
    var datas = getGameResByGameId(gameId)
    for(var i=0;i<datas.length;i++) {
        var gdata = datas[i];
        if(type == 0){
            allsize += gdata.mSize;
        }else if(type == 1){
            var version = getGameResLocalVersion(gdata.mGameId);
            if(version >= gdata.mVersion){
                allsize += gdata.mSize;
            }
        }
    }
    return allsize;
}



//根据游戏id获取基本资源
var getGameResByGameId = function(gameId){
    gameId = changeGameIdForGameRes(gameId);
    var datas = [];
    var gdatas = sGameData.mGamesResDatas;
    for(var i=0;i<gdatas.length;i++){
        var gdata = gdatas[i];
        if(gdata.mGameId == gameId){
            datas.push(gdata);
        }
    }
    return datas;
}

//获取某个游戏资源 版本
var getGameResLocalVersion = function(gameId){
    gameId = changeGameIdForGameRes(gameId);
    var ls = cc.sys.localStorage;
    //数据保存 key  ：“gres_”＋gameId＋“_ver”
    var key = "gres_"+gameId+"_ver"
    var value = ls.getItem(key);
    //log("key=="+key+"|"+value)
    var version = 0;
    if (value && Number(value)){
        version = Number(value)
    }
    if(version ==0){//没有更新版本，检查是否有默认版本
        version = getGameResDefaultLocalVersion(gameId);
    }
    log("getGameResLocalVersion=="+gameId+"|"+version)
    return version;
}

//获取某个游戏资源 (默认) 版本
var getGameResDefaultLocalVersion = function(gameId){
    gameId = changeGameIdForGameRes(gameId);
    var version = 0;
    var list = sDataConfig.mGamesLocalResDatas;
    for(var i=0;i<list.length;i++){
        var data = list[i];
        if(data[0] == gameId){
            version = data[1];
            break;
        }
    }
    return version;
}
//设置某个游戏资源 (默认) 版本
var setGameResDefaultLocalVersion = function(gameId,value){
    gameId = changeGameIdForGameRes(gameId);
    var list = sDataConfig.mGamesLocalResDatas;
    for(var i=0;i<list.length;i++){
        var data = list[i];
        if(data[0] == gameId){
            data[1] = value;
            break;
        }
    }
}

//检查此资源是否下载下来了
var checkHasDownBaseRes = function(gameId){
    gameId = changeGameIdForGameRes(gameId);
    var result = false;
    var ls = cc.sys.localStorage;
    var istopver = true;
    var gversion = getGameResLocalVersion(gameId);
    var datas = getGameResByGameId(gameId)
    for(var i=0;i<datas.length;i++){
        var gdata = datas[i];
        if(gversion < gdata.mVersion){ //检查是不是最高版本
            istopver = false;
        }
    }
    if(istopver){
        if(gversion!=0){
            result = true;
        }
    }
    log("checkHasDownBaseRes--"+gameId+"|"+result)
    return result
}

//获取新的追踪id （给下载资源）
var getNewResObserverId = function(){
    sGameData.mLoadResObserverId++;
    var oid = ""+sGameData.mLoadResObserverId
    return oid;
}
//创建新的下载
var createLoadRes = function(resname,pnode,func,url,tag,width,height){

    var oid = getNewResObserverId();
    log("oid=="+oid);
    var loadres = {};
    loadres.oid = oid;
    loadres.resname = resname;
    loadres.url = url;
    loadres.state = 0; //0新创建 1下载suc 2下载fail 3已提交到下载器  10 之前已下载
    loadres.pnode = pnode; //父节点
    loadres.tag = tag;
    loadres.width = width;
    loadres.height = height;
    loadres.func = func;   //回调
    loadres.currlayer = sGameData.mCurrLayer;
    //等下载图片完成 ，可能界面已经切换走了 ；没切换走时用 回调
    sGameData.mLoadResArray.push(loadres);

    if(cc.sys.isNative){
        var gameJSB = cc.GameJSB.sharedGJSB();
        gameJSB.loadPic(loadres.oid,loadres.resname,loadres.url);
        loadres.state = 3;
    }else{

    }
}
//改变下载资源状态
var updateLoadResState = function(oid,state){
    log("updateLoadResState--"+oid+"|"+state)
    var len = sGameData.mLoadResArray.length
    for(var i =0;i<len;i++){
        var loadres = sGameData.mLoadResArray[i];
        if(loadres.oid == oid){
            loadres.state = state;
            if(loadres.state == 1){
                if(sGameData.mCurrLayer==loadres.currlayer&&loadres.pnode&&loadres.pnode.isRunning()){
                    loadres.func(loadres);
                }
            }else if(loadres.state == 10){
                if(sGameData.mCurrLayer==loadres.currlayer&&loadres.pnode){
                    loadres.func(loadres);
                }
            }
        }
    }
}
//下载图片资源保存位置
var getLoadImgPath = function(){
    var path = "";
    if(sGameData.mIsOldVer){
        path = cc.fileUtils.getWritablePath()
    }else{
        path = jsb.fileUtils.getWritablePath()
    }
    if(cc.sys.os == cc.sys.OS_IOS){
        path = sGameData.mResPathSys;
    }
    path = path+"imgs/";
    return path;
}

//保存 本地图片 版本
var saveImgResVer = function(){
    var ls = cc.sys.localStorage;
    var has = ls.getItem(HAS_LOCAL_IMG_DATA);
    ls.setItem(HAS_LOCAL_IMG_DATA, true);
    ls.setItem(LOCAL_PROPSIMGVER, sGameData.mLocalPropsImgVer);
    ls.setItem(LOCAL_PRIZEIMGVER, sGameData.mLocalPrizeImgVer);
}
//不删除文件 删除缓存
var removeLocallImg = function(img){
    if(cc.sys.isNative) {
        var saveimage = img;
        var path = getLoadImgPath();
        var file = path + saveimage;
        //jsb.fileUtils.removeFile(file)
        if(file.indexOf(".jpg") > -1) {
            cc.textureCache.removeTextureForKey(file);
        }
    }
}
//删除道具 缓存图片
var removePropsLocalImg = function(){
    log("removePropsLocalImg---")
    if(cc.sys.isNative) {
        var list = sGameData.mSys_Propses;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var props = list[i];
            var saveimage = "props_" + props.img;
            var path = getLoadImgPath();
            var file = path + saveimage;
            jsb.fileUtils.removeFile(file)
        }
    }
}
//删除奖品 缓存图片
var removePrizeLocalImg = function(){
    log("removePrizeLocalImg---")
    if(cc.sys.isNative) {
        var list = sGameData.mSys_Prizes;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var prize = list[i];
            var saveimage = "goods_" + prize.image;
            var path = getLoadImgPath();
            var file = path + saveimage;
            jsb.fileUtils.removeFile(file)
        }
    }
}
// ****** down game res end *********


//******** pay 相关 ********
//var clickPay1 = function(pay){
//    var productid = pay.productId;//
//    var orderNo = getOrderNo()
//    var einfo = getPayinfo(productid);
//    var money = pay.price/100
//    log("payagent---"+pay.agent)
//    log("orderNo=="+orderNo)
//    log("einfo=="+einfo)
//
//    if(cc.sys.isNative) {
//        var payagent = pay.agent
//        if(sGameData.mIsTestWxPay){
//            if(money > 100){
//                payagent = PAY_WXPAY;
//            }
//        }else if(sGameData.mIsTestAliPay){
//            payagent = PAY_ALIPAY;
//        }else if(sGameData.mIsTestGooglePay){
//            payagent = PAY_GOOGLE;
//        }else if(sGameData.mIsTestCmccMM){
//            //30000851752502  06 07  PAY_CMCCMM_GY
//            payagent = PAY_DX189_GY;
//
//            if(money > 10){
//                pay.productId = "90212309";
//            }else if(money > 5){
//                pay.productId = "90212310";
//            }else{
//                pay.productId = "90212311";
//            }
//
//        }
//        sGameData.mEnterBackgroundFor = "pay";
//        if(payagent == PAY_APPLE){
//            if(sGameData.mAgent == AGENT_APPLE && cc.sys.os == cc.sys.OS_IOS){//appstore
//                orderNo = pay.productId
//            }
//            var gameJSB = cc.GameJSB.sharedGJSB();
//            gameJSB.gotoPay(orderNo, einfo, ""+money,sGameData.mCurrZoneId,sGameData.mUser.id);
//            if(sGameData.mAgent == AGENT_APPLE && cc.sys.os == cc.sys.OS_IOS){//appstore
//                showLittleNotice(sResWord.w_wait);
//            }
//        }else if(payagent == PAY_UPMP){
//            //sGameData.mGameNet.sendUpmpGetTradeNo(pay.productId);
//        }else if(payagent == PAY_GOOGLE){
//            if(sGameData.mAgent == AGENT_APPLE && cc.sys.os == cc.sys.OS_ANDROID){// alipay
//                einfo = einfo+"|"+pay.productId;
//            }
//            var gameJSB = cc.GameJSB.sharedGJSB();
//            gameJSB.gotoPay(orderNo, einfo, ""+money,sGameData.mCurrZoneId,sGameData.mUser.id);
//            showLittleNotice(sResWord.w_wait);
//        }else if(payagent == PAY_ALIPAY){
//            var sdkinfo = ""+pay.displayName;
//            CallCpp.doSomeString(21, payagent, orderNo, einfo, ""+money, sdkinfo);
//            showLittleNotice(sResWord.w_wait);
//        }else if(payagent == PAY_WXPAY){
//            var sdkinfo = ""+pay.displayName;
//            CallCpp.doSomeString(21, payagent, orderNo, einfo, ""+money, sdkinfo);
//            showLittleNotice(sResWord.w_wait);
//        }else if(payagent == PAY_CMCCMM){
//            var sdkinfo = "";
//            orderNo = pay.productId;
//            einfo = getPayinfoForCmccMM(pay.id);//pay.id
//            CallCpp.doSomeString(21, payagent, orderNo, einfo, ""+money, sdkinfo);
//            showLittleNotice(sResWord.w_wait);
//        }else if(payagent == PAY_CMCCMM_ZJH){
//            var sdkinfo = "";
//            orderNo = pay.productId;
//            einfo = getPayinfoForCmccMM(pay.id);//pay.id
//            CallCpp.doSomeString(21, payagent, orderNo, einfo, ""+money, sdkinfo);
//            showLittleNotice(sResWord.w_wait);
//        }else if(payagent == PAY_CMCCMM_GY){
//            var sdkinfo = "";
//            orderNo = pay.productId;
//            einfo = getPayinfoForCmccMM(pay.id);//pay.id
//            CallCpp.doSomeString(21, payagent, orderNo, einfo, ""+money, sdkinfo);
//            showLittleNotice(sResWord.w_wait);
//        }else if(payagent == PAY_CMCCMM_GY1){
//            var sdkinfo = "";
//            orderNo = pay.productId;
//            einfo = getPayinfoForCmccMM(pay.id);//pay.id
//            CallCpp.doSomeString(21, payagent, orderNo, einfo, ""+money, sdkinfo);
//            showLittleNotice(sResWord.w_wait);
//        }
//
//    }else{
//        if(pay.agent == PAY_UPMP) {
//            //sGameData.mGameNet.sendUpmpGetTradeNo(pay.productId);
//        }
//
//    }
//}

//点击充值项目
var clickPay = function(pay){

    log("clickPay----startReqPay==")
    if(cc.sys.os == cc.sys.OS_ANDROID){
        showLittleNotice(sResWord.w_i_notopen,0,3);
    }else{
        var payagent = pay.agent
        var paychannelID = getPayChannelId(pay.agent);
        sGameData.mPayAgent = pay.agent;

        sGameData.mGameNet.sendReqPay(paychannelID,pay.id);
        showLittleNotice(sResWord.w_tip_pay_waiting,0,3);
    }
}

var clickPay_start = function(paychannelId,cash){

    log("clickPay----startReqPay==")
    var payagent = pay.agent
    var paychannelID = getPayChannelId(pay.agent);
    sGameData.mPayAgent = pay.agent;

    sGameData.mGameNet.sendReqPay(paychannelID,pay.id);

}

//开始发起充值
var startPayJStoApp = function(paydata){
    log("startPayJStoApp---"+paydata)
    var tdata = sGameData.mCurrZoneId+"_"+sGameData.mUser.id;
    if(paydata.length > 0){
        var pdata = JSON.parse(paydata);
        if(pdata.orderNo){
            var tdata = sGameData.mCurrZoneId+"_"+sGameData.mUser.id;
            CallCpp.doSomeString(500,pdata.channel,sGameData.mPayAgent,pdata.orderNo,pdata.data,tdata);
        }else{
            showLittleNotice(pdata.msg,0,3);
        }
    }else{
        log("no pay data---")
        showLittleNotice(sResWord.w_tip_pay_notsupport,0,3);
    }
}

//获取充值订单号  32位以内
//type :1 alipay
var getOrderNo = function(type,pid){
    if(type == null){
        type = 0;
    }
    var rand = ""+(10000+randomInt(89999))
    var timestr = (new Date()).getTime()
    //log("timestr="+timestr)
    var orderno =  timestr+"_"+sGameData.mCurrZoneId+"_"+sGameData.mUser.id+"_"+rand
    if(type == 1){
        orderno =  timestr +"_"+ rand+ "_" +sGameData.mAgent+"_"+sGameData.mCurrZoneId+"_"+sGameData.mUser.id+"_"+pid
    }
    return orderno;
}
//充值额外信息(pid 是 cn.xxxx.gold1 等)
var getPayinfo = function(pid){
    var einfo = "";
    einfo = sGameData.mAgent+"_"+sGameData.mCurrZoneId+"_"+sGameData.mUser.id+"_"+sGameData.mPlatform+"_"+pid;
    return einfo;
}
//充值额外信息(ipid 是 int)
var getPayinfoForCmccMM = function(ipid) {
    //8+5+3 （8位用户idx，5位随机码，3位充值idx）
    //16 ---64
    var rand = ""+(10000+randomInt(89999))
    var einfo = "";
    var type = 1;
    var  uidstr = ""+sGameData.mUser.id;
    if(uidstr.length < 8){
        var len = 8-uidstr.length;
        for(var i=0;i<len;i++){
            uidstr = "0"+uidstr;
        }
    }
    var  ipidstr = ""+ipid;
    if(ipidstr.length < 3){
        var len = 3-ipidstr.length;
        for(var i=0;i<len;i++){
            ipidstr = "0"+ipidstr;
        }
    }
    einfo = uidstr+rand+ipidstr;
    //
    //einfo = sGameData.mAgent+"_"+sGameData.mCurrZoneId+"_"+sGameData.mUser.id+"_"+sGameData.mPlatform+"_"+ipid;

    return einfo;
}
//登录充值验证结束时 全部设置成失败
var dealAllVerifyPaylogLogin = function(){
    log("dealAllVerifyPaylogLogin--")
    var len = sGameData.mNeedVerifyPayLogListLogin.length;
    for(var i=0;i<len;i++){
        var pay = sGameData.mNeedVerifyPayLogListLogin[i];
        var orderNo = pay.orderno;
        if(cc.sys.isNative) {
            var gameJSB = cc.GameJSB.sharedGJSB();
            gameJSB.setVPaylogState(orderNo,3);
        }
    }
}
//设置登录充值验证数据 （登录时 取 没成功的再验证次；只验证1次，无论结果全设置成失败） //放mainscene里做
var setAllVerifyPaylog = function(datastr){
    log("setAllVerifyPaylog--")
    sGameData.mCurrVerifyNum = 0;
    var data = datastr.split("|");
    var len = data.length
    if(cc.sys.os == cc.sys.OS_ANDROID&&len>0){//android 一次发1各
        len = 1;
    }
    for(var i=0;i<len;i++){
        var orderno = data[i];
        if(orderno.length > 0){
            var msg = "";
            if(sGameData.mAgent == AGENT_APPLE){
                var tdata = orderno.split(":");
                orderno = tdata[0];
                msg = tdata[1];
            }
            var paylist = {};
            paylist.orderno = orderno
            paylist.msg = msg
            //sGameData.mNeedVerifyPayLogListLogin.push(paylist)
            //sGameData.mGameNet.sendPay(orderno,msg);//
            var tar = sGameData.mCurrScene;
            var time = 0.05+0.05*i
            var delay = cc.DelayTime.create(time)
            var callback = cc.CallFunc.create(sendPayVerifyAfterLogin, tar,paylist);
            var seq = cc.Sequence.create(delay, callback);
            tar.runAction(seq);
        }
    }
}
var sendPayVerifyAfterLogin = function(tar,data){
    log("sendPayVerifyAfterLogin--")
    var paylist = data
    sGameData.mNeedVerifyPayLogListLogin.push(paylist)
    //sGameData.mGameNet.sendPay(paylist.orderno,paylist.msg);//
    if(paylist.msg.length > 100){
        sGameData.mGameNet.sendPayAppStore(paylist.orderno,paylist.msg);//
    }else{
        sGameData.mGameNet.sendPay(0,paylist.orderno);
    }

}



//开始充值验证 （正常模式下 非登录，验证3次）
var startPayVerify = function(){
    log("startPayVerify")
    if(!sGameData.mIsPayVerifying){
        var len = sGameData.mVPayLogList.length;
        if(len > 0){
            var vpaylist = sGameData.mVPayLogList[0];
            sGameData.mVPayLogList.splice(0,1);
            sGameData.mCurrVerifyOrderNo = vpaylist.orderno
            sGameData.mCurrVerifyMsg = vpaylist.vinfo
            if(sGameData.mCurrVerifyOrderNo.length > 0){
                sGameData.mCurrVerifyNum = 0;
                sGameData.mIsPayVerifying = true;
            }
        }
    }else{
        log("is PayVerify ing -----")
    }
}
//结束充值验证
var endPayVerify = function(){
    log("endPayVerify-----")
    sGameData.mIsPayVerifying = false;
    startPayVerify()
}

//按照支付方式取纪录
var getPayListByType = function(paytype){
    var list = sGameData.mPayList;
    var rlist = []
    var len = list.length;
    for(var i=0;i<len;i++){
        var pay = list[i];
        if(pay.agent == paytype){
            rlist.push(pay);
        }
    }
    return rlist;
}
//获取所有支付方式
var getAllPayType = function(){
    var list = sGameData.mPayList;
    var rlist = []
    var len = list.length;
    for(var i=0;i<len;i++){
        var pay = list[i];
        if(!valuecontain(rlist,pay.agent)){
            rlist.push(pay.agent);
        }
    }
    return rlist;
}

//获取 审核时显示的充值
var getPayTypeAppStore = function(types){
    var rtypes = []
    for(var i=0;i<types.length;i++){
        var type = types[i];
        var channelId = getPayChannelId(type);
        if(channelId == PAY_CHANNEL_APPSTOTE){
            return type;
        }
    }
    return PAY_APPLE;
}

//检查允许得充值方式
var checkPayAllows = function(){
    var types = sGameData.mPayTypes;
    var rtypes = []
    if (cc.sys.isNative) {
        if(cc.sys.os == cc.sys.OS_IOS){
            rtypes = checkPayCanUse(sGameData.mPay_Allow_ios,types);
        }else if(cc.sys.os == cc.sys.OS_ANDROID){
            rtypes = checkPayCanUse(sGameData.mPay_Allow_android,types);
        }else if(cc.sys.os == cc.sys.OS_WINDOWS){
            rtypes = checkPayCanUse(sGameData.mPay_Allow_win,types);
        }
    }else{
        rtypes = checkPayCanUse(sGameData.mPay_Allow_web,types);
    }
    sGameData.mPayTypes = rtypes;
}
//检查充值方式能否使用
var checkPayCanUse = function(allowtypes,types){
    var rtypes = []
    for(var i=0;i<types.length;i++){
        var type = types[i];
        if(valuecontain(allowtypes,type)){
            rtypes.push(type);
        }
    }
    return rtypes;
}

//******** pay 相关 end ********


//******** room hall game 相关  ********

//type 0 load res,1 load plist
var getHallResByType = function(type,gametype){
    var result = [];
    var isdjgame = isDJGame(gametype)
    if(type == 0){
        var hallres = [];
        if(isdjgame){

        }else{
            hallres = g_hall_resources_qp
        }
        result = hallres
    }else if(type == 1){
        var loadres = [];
        if(isdjgame){

        }else{
            loadres = g_loadplist_hall_qp
        }
        result = loadres
    }
    return result
}




//判断游戏是否开放
var isOpenGame = function(gameId){
    var result = false;
    if(valuecontain(sGameData.mOpenGames,gameId)){
        result = true
    }
    return result
}
//判断游戏是否显示
var isGameShow = function(gameId){
    var result = false;
    if(valuecontain(sGameData.mShowGames,gameId)){
        result = true
    }
    return result
}
//判断游戏是否显示
var isShowInDJArea = function(gameId){
    var result = false;
    if(valuecontain(sGameData.mGamesShowInDJArea,gameId)){
        result = true
    }
    return result
}
//判断游戏是否显示
var isDJGame = function(gameId){
    var result = false;
    if(valuecontain(sGameData.mDJGames,gameId)){
        result = true
    }
    return result
}
//获取游戏的排序索引 越小越在前
var getSortIndex = function(gameId){
    var len = sGameData.mGameSort.length;
    var index = 100;
    for(var i=0;i<len;i++){
        if(sGameData.mGameSort[i] == gameId){
            index = i;
            break;
        }
    }
    return index;
}


//排序房间
var sortRooms = function(rooms){
    var len = rooms.length;
    var list = [];
    for(var i=0;i<len;i++){
        var room = rooms[i];
        var sortindex = getSortIndex(room.gameId)
        room.sortindex = sortindex;
        //log("room.gameId="+room.gameId+" index ="+sortindex)
    }
    rooms.sort(sortByRoom);
    for(var i=0;i<len;i++){
        var room = rooms[i];
        //log("room.gameId="+room.gameId)
    }
}

//对房间排序
var sortByRoom = function(a,b){
    if(a.sortindex != b.sortindex){
        return a.sortindex- b.sortindex;
    }else{
        return a.roomId- b.roomId;
    }
};


//获取某游戏的房间
var getRoomListByType = function(type){
    var len = sGameData.mRoomlist.length;
    var list = [];
    for(var i=0;i<len;i++){
        var room = sGameData.mRoomlist[i];
        if(room.gameId == type&&isGameShow(room.gameId)){
            list.push(room);
        }
    }
    return list;
}
//获取某游戏的房间(转盘)
var getRoomListByOpenType = function(type){
    var len = sGameData.mRoomlist.length;
    var list = [];
    for(var i=0;i<len;i++){
        var room = sGameData.mRoomlist[i];
        if(room.gameId == type&&isOpenGame(room.gameId)){
            list.push(room);
        }
    }
    return list;
}
//每个游戏类型取一个房间
var getRoomListByTypeOne = function(){
    var len = sGameData.mRoomlist.length;
    var list = [];
    var types = [];
    if(sGameData.mAppIsTestPayH5){
        for(var i=0;i<1;i++){
            var room = sGameData.mRoomlist[i];
            if(!valuecontain(types,room.gameId)&&isGameShow(room.gameId) && !isShowInDJArea(room.gameId)){
                list.push(room);
                types.push(room.gameId);
            }
        }
    }else{
        for(var i=0;i<len;i++){
            var room = sGameData.mRoomlist[i];
            if(!valuecontain(types,room.gameId)&&isGameShow(room.gameId) && !isShowInDJArea(room.gameId)){
                list.push(room);
                types.push(room.gameId);
            }
        }

    }
    return list;
}
//获取开放的游戏房间列表
var getRoomListByOpenGame = function(){
    var len = sGameData.mRoomlist.length;
    var list = [];
    for(var i=0;i<len;i++){
        var room = sGameData.mRoomlist[i];
        if(isGameShow(room.gameId)){
            list.push(room);
        }
    }
    return list;
}
//获取某房间
var getRoomById = function(id){
    var len = sGameData.mRoomlist.length;
    for(var i=0;i<len;i++){
        var room = sGameData.mRoomlist[i];
        if(room.roomId == id){
            return room;
        }
    }
    return null;
}
//******** room hall game 相关 end ********

// ******  logic   *********

//检查是否是系统消息
var checkMsgIsSys = function(msg){
    var  result = true;
    if(!msg){
        return false;
    }
    if(msg.indexOf(":") > -1){
        result = false;
    }
    if(msg.indexOf(sResWord.w_sysmsg_contain1) > -1){
        result = false;
    }
    if(msg.indexOf(sResWord.w_sysmsg_contain2) > -1){
        result = false;
    }
    return result
}

//是否显示mj新手引导
var canshowMJNewGuide = function(){
    var ls = cc.sys.localStorage;
    var has = ls.getItem(LOCAL_MJ_NEWGUIDE);
    var  result = false;
    if(has != 1){
        result = true;
    }
    return result;
}


//设置系统数据(不再直接使用 g_sys_xxx，以后mSys_xxx直接从数据库获取)
var setSysData_config = function(){
    log("setSysData_config")
    sGameData.mSys_GameConfigs = g_sys_gameconfig;
    sGameData.mSys_Prizes = g_sys_prize;
    sGameData.mSys_Propses = g_sys_props;
    sGameData.mSys_UserLevels = g_sys_userlevel;
}
//加载本地配置
var loadLocalConfigByDB = function(){
    log("-----loadLocalConfigByDB-----")
    if(sGameData.mUseSqliteByJS) {
        if (sGameData.mSysDataDBMan) {
            sGameData.mSysDataDBMan.loadConfigDataByDB();
        }
    }
}
//保存本地配置
var saveConfigDataToDB = function(){
    log("-----saveConfigDataToDB-----")

    if (sGameData.mUseSqliteByJS) {
        if (sGameData.mSysDataDBMan) {
            sGameData.mSysDataDBMan.saveConfigDataToDB();
        }
    }

}

//初始化 fb sdk
var initFacebookSdk = function(){
    log("facebook1");
    window.facebook = window.facebook || (window["plugin"] ? window["plugin"]["FacebookAgent"]["getInstance"]() : null);
    log("facebook2");
}

//test
var testNotice = function(msg){
    showLittleNotice(msg)
}


//判断是有效用户  绑定了手机 或邮箱
var checkIsValidUser = function(){
    var isvalid = false;
    var phone = sGameData.mUser.phone
    if(phone!=null && phone.length >=6 ) {
        isvalid = true;
    };
    var email = sGameData.mUser.email
    if(email!=null && email.length >=5) {
        isvalid = true;
    };
    return isvalid;
}

//判断是否绑定了手机
var checkIsBindPhone = function(){
    var isvalid = false;
    var phone = sGameData.mUser.phone
    if(phone!=null && phone.length >=6 ) {
        isvalid = true;
    };
    return isvalid;
}

//fblogout
var doFBLogout = function(){

}

//退出时 重置数据
var doResetDataForLogout = function(){
    sGameData.mIsLogined = false;
    sGameData.mUser = null;
    sGameData.mMsgList = [];
    sGameData.mFriendList = [];
    sGameData.mPayList = [];
    sGameData.mPrizeList = [];
    sGameData.mVPayLogList = [];
    sGameData.mUser = {};
    sGameData.mUser.chairId = -1;
    sGameData.mUserMsgCount = 0;
    sGameData.mLoadResObserverId = 0;
    sGameData.mCanShowSignin = true;
    sGameData.mRankList = [];
    //sGameData.mHasShowSysNotice = false;
    sGameData.mCanShowDaily = true;
    sGameData.mDoActionOnceAfterLogin = true;
    sGameData.mOLPlayersGetTime = 0;
    sGameData.mOLPlayers = [];
    sGameData.mHasGetUserExtraInfo = false;

    doFBLogout();
}




var saveLoginType = function(loginType){
    var ls = cc.sys.localStorage;
    var has = ls.getItem(HAS_LOCAL_USER_DATA);
    if(!has){
        saveMusicSetting(sGameData.mMusicon,sGameData.mSoundon);
    }
    ls.setItem(HAS_LOCAL_USER_DATA, true);
    ls.setItem(LOCAL_LOGINTYPE, loginType);
}
//保存用户信息
var changeUserPwd = function(password){
    log("changeUserPwd=="+password);
    var ls = cc.sys.localStorage;
    ls.setItem(LOCAL_PASSWORD, password);
}
//保存用户信息
var saveUserInfo = function(username,password,loginType){
    log("saveUserInfo=="+username+"|"+password);
    if(loginType==null){
        loginType = 1;
    }
    var ls = cc.sys.localStorage;
    var has = ls.getItem(HAS_LOCAL_USER_DATA);
    if(!has){
        saveMusicSetting(sGameData.mMusicon,sGameData.mSoundon);
    }
    ls.setItem(HAS_LOCAL_USER_DATA, true);
    ls.setItem(LOCAL_USERNAME, username);
    ls.setItem(LOCAL_PASSWORD, password);
    ls.setItem(LOCAL_LOGINTYPE, loginType);
    //ls.setItem(LOCAL_LOGINAGENT, sGameData.mAgent_login);
    ls.setItem(LOCAL_REMEMBERPWD, sGameData.mNeedRememberPwd);
}
//保存用户信息
var saveGuestUserInfo = function(guestguid){
    //log("saveGuestUserInfo=="+guestguid);
    var ls = cc.sys.localStorage;
    var has = ls.getItem(HAS_LOCAL_GUEST_USER_DATA);
    if(!has){
        saveMusicSetting(sGameData.mMusicon,sGameData.mSoundon);
    }
    ls.setItem(HAS_LOCAL_GUEST_USER_DATA, true);
    ls.setItem(LOCAL_GUESTGUID, guestguid);
}
//保存设置信息
var saveMusicSetting = function(musicon,soundon){
    //log("saveMusicSetting=="+musicon+"|"+soundon);
    var ls = cc.sys.localStorage;
    ls.setItem(LOCAL_MUSICON, musicon);
    ls.setItem(LOCAL_SOUNDON, soundon);
}




//用户任务 排序 状态 改变
// //taskType 2救济 345游戏 6 7分享
var changeUTaskStateSort = function(utask){
    if(utask.state == 2){
        utask.stateindex = 1;
    }else if(utask.state == 1){
        utask.stateindex = 2;
    }else if(utask.state == 3){
        utask.stateindex = 3;
    }

    utask.typeindex = 3;//
    if(utask.task){
        var taskType = utask.task.taskType;
        var roomId = utask.task.roomId;
        if(taskType == 2){//救济放在后5
            utask.typeindex = 5;//
        }else if(taskType == 3||taskType == 4||taskType == 5){//游戏放在后4（很多）
            utask.typeindex = 4;//
        }else if(roomId > 0){//游戏放在后4（很多）
            utask.typeindex = 4;//
        }else if(taskType == 70||taskType == 71){//分享在前1
            utask.typeindex = 1;//
        }
        utask.ratevalue = utask.currCount/utask.allCount;
        if(utask.task&&utask.task.taskType == 2){//救济任务
            if(utask.state == 1) {
                utask.ratevalue = 0;
            }else{
                utask.ratevalue = 1;
            }
        }
    }
}
//用户任务 排序
//state 123
var sortByUTask= function(a,b){
    if(a.stateindex != b.stateindex){ //先判断是否完成
        return a.stateindex - b.stateindex ;
    }else{
        if(a.ratevalue != b.ratevalue) { //状态相同 再按进度判断
            return b.ratevalue - a.ratevalue
        }else{
            if(a.task&&b.task){
                if(a.typeindex != b.typeindex) { //进度相同，再按类型判断，
                    return a.typeindex - b.typeindex ;
                }else{
                    return a.task.id - b.task.id
                }
            }else if(a.task){
                return -1;
            }else if(b.task){
                return 1;
            }
        }
    }
}


//根据id 获取我的好友
var getFriendById = function(id){
    var len = sGameData.mFriendList.length;
    for(var i=0;i<len;i++){
        var friend = sGameData.mFriendList[i];
        if(friend.id ==id){
            return friend;
        }
    }
    return null;
}
//根据id 获取好友（搜索）
var getFriendByIdFromtable = function(id,atable){
    var len = atable.length;
    for(var i=0;i<len;i++){
        var friend = atable[i];
        if(friend.id ==id){
            return friend;
        }
    }
    return null;
}
//根据id 获取消息
var getMsgById = function(idx){
    var len = sGameData.mMsgList.length;
    var amsg = null;
    for(var i=0;i<len;i++){
        var msg = sGameData.mMsgList[i];
        if(msg.id == idx){
            amsg = msg;
            break;
        }
    }
    return amsg;
}




//获取系统道具
var getPropsById = function(pid){
    var len = sGameData.mPropsList.length;
    for(var i=0;i<len;i++){
        var props = sGameData.mPropsList[i];
        if(props.id == pid){
            return props;
        }
    }
    return null;
}
//获取可以出售的道具
var getSellProps = function(){
    var propses = []
    var len = sGameData.mPropsList.length;
    for(var i=0;i<len;i++){
        var props = sGameData.mPropsList[i];
        if(props.enabled == 1){
            propses.push(props);
        }
    }
    return propses;
}

//获取系统奖品
var getPrizeById = function(pid){
    var len = sGameData.mPrizeList.length;
    for(var i=0;i<len;i++){
        var prize = sGameData.mPrizeList[i];
        if(prize.id == pid){
            return prize;
        }
    }
    return null;
}
//获取可以兑换的奖品
var getCanChangePrizes = function(){
    var prizes = []
    var len = sGameData.mPrizeList.length;
    for(var i=0;i<len;i++){
        var prize = sGameData.mPrizeList[i];
        if(prize.state == 1){
            prizes.push(prize);
        }
    }
    prizes.sort(sortPrizeBySort);
    return prizes;
}

//获取可以显示的奖品
var getCanShowPrizes = function(type){
    var prizes = []
    var list = sGameData.mPrizeCanChangeList;
    var len = list.length;
    for(var i=0;i<len;i++){
        var prize = list[i];
        if(prize.type == type){
            prizes.push(prize);
        }
    }
    prizes.sort(sortPrizeBySort);
    return prizes;
}

var sortPrizeBySort = function(a,b){
    return a.sort- b.sort;
}

//获取签到奖励
var getSigninById = function(pid){
    var list = sGameData.mSys_Signins;
    var len = list.length;
    for(var i=0;i<len;i++){
        var signin = list[i];
        if(signin.id == pid){
            return signin;
        }
    }
    return null;
}

//获取用户等级
var getULevelByLv = function(lv){
    var list = sGameData.mSys_UserLevels;
    var len = list.length;
    for(var i=0;i<len;i++){
        var ulv = list[i];
        if(ulv.id == lv){
            return ulv;
        }
    }
    return null;
}


//分享成功 操作
var doShareSuc = function(){
    log("doShareSuc--")
    var task = sGameData.mShareTaskId;
    if(task&&task > 0){
        sGameData.mGameNet.sendWeixinTask(task);
        sGameData.mShareTaskId = 0;
    }
}

//处理游戏玩家数据（缺值的补上默认值）
var dealWithPlayerDataForShow = function(player){
    log("dealWithPlayerDataForShow---")
    log("player.softCash=="+player.softCash)
    if(checkValueInvalid(player.softCash)){
        player.softCash = 0;
    }
    if(checkValueInvalid(player.level)){
        player.level = 1;
    }
    if(checkValueInvalid(player.loseCount)){
        player.loseCount = 0;
        player.winCount = 0;
    }
    if(checkValueInvalid(player.maxScore)){
        player.maxScore = 0;
    }
    if(checkValueInvalid(player.maxCardType)){
        player.maxCardType = -1;
    }
    if(checkValueInvalid(player.bFriend)){
        player.bFriend = 0;
    }
    if(checkValueInvalid(player.maxMsgId)) {
        player.maxMsgId = 0;
    }
    if(checkValueInvalid(player.chats)) {
        player.chats = [];
    }
}


//检查按钮是否可用
var checkButtonEnable= function(){
    var result = true;
    if(sGameData.mIsShowNoticeing){
        result = false;
    }
    if(sGameData.mIsShowTopView){
        result = false;
    }
    return result;
}



//分析消息附件数据
var analyseKitData = function(kitdata){
    var kits = []
    if(kitdata!=null&&kitdata.length>0){
        var datas  = kitdata.split(";");
        var len = datas.length
        for(var i=0;i<len;i++){
            var data = datas[i];
            var kitd = data.split(":")
            if(kitd.length > 1){
                var kit = {};
                kit.type = Number(kitd[0]) //
                kit.value = Number(kitd[1])  //count或id
                kits.push(kit)
            }
        }
    }
    return kits;
}
//获取某比赛
var getMatchById = function(id){
    var len = sGameData.mMatchList.length;
    for(var i=0;i<len;i++){
        var match = sGameData.mMatchList[i];
        if(match.id == id){
            return match;
        }
    }
    return null;
}

//获取某比赛
var getMatchByRoomId = function(roomid,id){
    var len = sGameData.mMatchList.length;
    for(var i=0;i<len;i++){
        var match = sGameData.mMatchList[i];
        if(match.roomId == roomid){
            return match;
        }
    }
    for(var i=0;i<len;i++){
        var match = sGameData.mMatchList[i];
        if(match.id == id){
            return match;
        }
    }
    return null;
}


//获取比赛显示的小信息
var getMatchLittleInfo = function(match){
    var linfo = "";
    if(match.type == MATCHSTART_COUNT){
        linfo = sResWord.w_match_linfo_man_s1+match.playerUpperlimit+sResWord.w_match_linfo_man_s2
    }else{
        var time = getLocalTime_mini(match.startTime);
        linfo = time+sResWord.w_match_linfo_time;
    }
    if(match.currPlayerCount > 0){
        linfo += "\n"+sResWord.w_match_has_signup_s1+match.currPlayerCount+sResWord.w_match_has_signup_s2;
    }
    return linfo;
}

//排序
var sortMatchByIndex = function(a,b){
    if(a.sort != b.sort){
        return a.sort- b.sort;
    }else{
        if(a.id != b.id){
            return a.id- b.id;
        }else{
            return b.roomId - a.roomId;
        }
    }
}


//获取我正在进行的比赛或即将开始 的比赛
var getMyMatchs = function(){
    sGameData.mMatchList.sort(sortMatchByIndex);
    var list = sGameData.mMatchList;
    var umatchs = [];
    var showList = [];
    var showMatchIds = [];
    var checkMatch = true;
    for(var i = 0;i<list.length;i++){
        var match = list[i];
        if(!checkMatch ||(checkMatch && !valuecontain(showMatchIds,match.id))) {
            if(match.userMatchId > 0){
                if(match.openState == MATCHSTATE_GAMEING){//已经开始
                    umatchs.push(match);
                }else if(match.openState == MATCHSTATE_SIGNUP){//报名中 ，离开始还有5分钟
                    var nowtime = getNowServerTime();
                    if(match.startTime > nowtime && match.startTime - nowtime<5*60*1000){
                        umatchs.push(match);
                    }
                    showList.push(match);
                }else{
                    showList.push(match);
                }
            }else{
                showList.push(match);
            }
            showMatchIds.push(match.id);
        }else{
            if(match.userMatchId > 0){
                if(match.openState == MATCHSTATE_GAMEING){//已经开始
                    umatchs.push(match);
                }else if(match.openState == MATCHSTATE_SIGNUP){//报名中 ，离开始还有5分钟
                    var nowtime = getNowServerTime();
                    if(match.startTime > nowtime && match.startTime - nowtime<5*60*1000){
                        umatchs.push(match);
                    }
                }
            }
        }
    }
    sGameData.mMatchShowList = showList//(除了已经报名的)
    sGameData.mUserMatchDatas = umatchs;
}

//分析比赛打几轮， ("6:1,3:1")
var analyseMatchDatas = function(match){
    var datastr = match.gamedata;
    var datas = datastr.split(",");
    var lundatas = [];
    var allcount = match.currPlayCount
    var lunindex = -1;
    for(var i=0;i<datas.length;i++){
        var tdata = datas[i]
        var tdatas = tdata.split(":");
        var lundata = {}
        lundata.playercount = Number(tdatas[0]);
        lundata.playcount = Number(tdatas[1]);
        lundatas.push(lundata);
        if(lunindex == -1){
            if(allcount <= lundata.playcount){
                lunindex = i+1;
            }else{
                allcount -= lundata.playcount
            }
        }
    }
    match.lundatas = lundatas;
    match.currPlayLun = lunindex;//临界点？？
    match.currLunPlayCount = allcount;
}
//获取当前轮数据
var getMatchCurrLundata = function(match){
    var datas = match.lundatas
    var allcount = match.currPlayCount
    var lunindex = -1;
    for(var i=0;i<datas.length;i++){
        var lundata = datas[i];
        if(allcount <= lundata.playcount){
            lunindex = i+1;
            break;
        }else{
            allcount -= lundata.playcount
        }
    }
    match.currPlayLun = lunindex;//临界点？？
    match.currLunPlayCount = allcount;
}
//初始化额外数据
var initMatchExtraData = function(match){
    match.currPlayCount = 0;
    match.rank = 0;
    match.currPlayLun = 0;
    match.currLunPlayCount = 0;
    match.matchCount = 0;
    match.currGameTableCount = 0;
    sGameData.mUser.score = 0;
}


//根据id获取任务
var getTaskById = function(id){
    var list = sGameData.mSys_Tasks;
    for(var i=0;i<list.length;i++){
        var task = list[i];
        if(task.id == id){
            return task
        }
    }
    return null;
}
//分析用户任务
var analyseUTasks = function(utasks){
    for(var i=0;i<utasks.length;i++){
        var utask = utasks[i];
        var task = getTaskById(utask.taskId);
        utask.task = task;
        if(task){
            utask.currCount = utask.taskValue;
            utask.allCount = task.taskCondition
            var aAward = analyseAward(task.prizes)
            utask.award = aAward
        }else{
            utask.currCount = 0;
            utask.allCount = 1;
            log("no task=="+utask.taskId);
        }
        changeUTaskStateSort(utask)
    }
    if(!sGameData.mAppCanShowTaskShare){
        var i = 0;
        while(i<utasks.length){
            var utask = utasks[i];
            var task = utask.task;
            if(task&&(task.taskType == 70 || task.taskType == 71)){
                utasks.splice(i,1);
            }else{
                i++;
            }
        }
    }
    var i = 0;
    while(i<utasks.length){
        var utask = utasks[i];
        var task = utask.task;
        if(task&&(task.roomId > 0)){
            var roomId = task.roomId;
            var room = getRoomById(roomId)
            if(room) {
                //log("room==" + room.roomName);
                if (!isGameShow(room.gameId) || !isOpenGame(room.gameId)) {
                    utasks.splice(i,1);
                }else{
                    i++;
                }
            }else{
                //i++;
                utasks.splice(i,1);
            }
        }else{
            i++;
        }
    }
    return utasks;
}
//分析奖励
var analyseAwards = function(awardsstr){
    var aAwards = [];
    var datas = awardsstr.split(",");
    for(var i=0;i<datas.length;i++){
        var data = datas[i];
        var award = analyseAward(data);
        if(award){
            aAwards.push(award);
        }
    }
    return aAwards;
}
//分析奖励
var analyseAward = function(awardstr){
    var aAward = null;
    var datas = awardstr.split(":");
    if(datas.length > 2){
        aAward = {}
        aAward.gtype = Number(datas[0]);
        aAward.id = Number(datas[1]);
        aAward.value = Number(datas[2]);
    }
    return aAward;
}

//处理 物品
var dealAwardGoods = function(goodes){
    for(var i=0;i<goodes.length;i++){
        var goods = goodes[i];
        if(goods.type == GOODS_SOFTCASH){
            var softCash = goods.data;
            sGameData.mUser.softCash = softCash;
        }else if(goods.type == GOODS_HARDCASH){
            var hardCash = goods.data;
            sGameData.mUser.hardCash = hardCash;
        }else if(goods.type == GOODS_RPOPS_TYPE){
            var uProp = goods.data;

        }else if(goods.type == GOODS_PRIZES_TYPE){
            var uPrize = goods.data;

        }
    }
}

//处理 cpp 版本 build
var dealCppVerbuild = function(){
    var basecode = sGameData.mAppBaseVersion;
    var data = basecode.split("_");
    if(data.length > 1){
        sGameData.mAppCppVersion = data[0];
        sGameData.mAppCppBuild = data[1];
    }
    if(data.length > 2) {
        sGameData.mDeviceName = data[2];
        log("sGameData.mDeviceName--" + sGameData.mDeviceName)
    }
    log("mAppCppVersion=="+sGameData.mAppCppVersion+" mAppCppBuild="+sGameData.mAppCppBuild)
}



// type 0 道具 1奖品 2签到
var getSysImgName = function(img,type){
    var name = ""
    if(type == 0){
        name = "i_p_"+img;
    }else if(type == 1){
        name = "i_g_"+img;
    }else if(type == 2){
        name = "i_s_"+img;
    }
    return name
}




//获取用户等级
var getGameSysConfig = function(name){
    var list = sGameData.mSys_GameConfigs;
    var len = list.length;
    for(var i=0;i<len;i++){
        var ulv = list[i];
        if(ulv.keyName == name){
            return ulv.value;
        }
    }
    return "";
}
// ******  logic end  *********

// ******  net  *********

var mNetConnServerErrorForNoNet = false;
var checkNetConnServer = function(servertype){
    var netconnisOK = false;
    if (sGameData.mGameNet.mGameSocket&&sGameNetData.mSocketConnected) {//网络是通的
        if (servertype == CONN_SERVER_ANY) {
            netconnisOK = true;
        } else if (servertype == CONN_SERVER_MATCH) {
            var matchroom = sGameData.mCurrMatch;
            if (sGameData.mGameNet.mIP == matchroom.ip && sGameData.mGameNet.mPort == matchroom.websocketPort) {
                netconnisOK = true;
            } else {
                log("checkNetConnServer matchroom id---" + matchroom.id)
            }
        } else if (servertype == CONN_SERVER_GAME) {
            var room = sGameData.mCurrRoom;
                if (sGameData.mGameNet.mIP == room.ipAddress && sGameData.mGameNet.mPort == room.websocketPort) {
                    netconnisOK = true;
                } else {
                    log("checkNetConnServer room id---" + room.roomId)
                }
        } else {
            if (sGameData.mGameNet.mIP == sGameConfig.serverIp && sGameData.mGameNet.mPort == sGameConfig.serverWebSocketPort) {
                netconnisOK = true;
            }
        }
        if(!netconnisOK){
            log("checkNetConnServer---"+servertype+"  error")
        }
        mNetConnServerErrorForNoNet = false;
    }else{
        mNetConnServerErrorForNoNet = true;
    }
    return netconnisOK;
}
//
var mNetConnServerErrorNum = 0;
var mNetConnServerErrorTempTime = 0;
var handleNetConnServerError = function(servertype){
    if(!mNetConnServerErrorForNoNet){
        var nowTime = (new Date()).getTime();
        if(nowTime - mNetConnServerErrorTempTime > 20*1000){
            mNetConnServerErrorNum = 1;
        }else{
            mNetConnServerErrorNum++;
        }
        log("handleNetConnServerError---"+servertype+" num=="+mNetConnServerErrorNum)
        mNetConnServerErrorTempTime = nowTime;
        if(mNetConnServerErrorNum >= 3){
            mNetConnServerErrorNum = 0;
            mNetConnServerErrorTempTime = 0;
            //showLittleNotice(sResWord.w_tip_net_conn_server_error);
            //reStartGame()
            showNotice(sResWord.w_notice,sResWord.w_tip_net_conn_server_error,11,0);
        }
    }

}

//被邀请游戏时，退出
var inviteGameQuit = function(tRoom){
    sGameData.mIsQuitByInviteGame = true;
    sGameData.mCurrInviteRoom = tRoom;
    if(sGameData.mCurrScene == sGameData.mDNGameScene){
        if(tRoom.gameId == GAME_TYPE_DN){
            sGameData.mIsSameGameByInviteGame = true;
        }
        sGameNetData.mDNNet.sendDNExitRoom();
    }else if(sGameData.mCurrScene == sGameData.mZJHGameScene){
        if(tRoom.gameId == GAME_TYPE_ZJH){
            sGameData.mIsSameGameByInviteGame = true;
        }
        sGameNetData.mZJHNet.sendZJHExitRoom();
    }else if(sGameData.mCurrScene == sGameData.mDDZGameScene){
        if(tRoom.gameId == GAME_TYPE_DDZ){
            sGameData.mIsSameGameByInviteGame = true;
        }
        sGameNetData.mDDZNet.sendDDZExitRoom();
    }
}

//充值提示 从游戏跳转时
var goMainForPayNotice = function(type){
    if(sGameData.mCurrLayer == sGameData.mDDZLayer) {//
        if(sGameData.mGameMode == GAMEMODE_NORMAL) { //普通模式
            if(type==1){
                goToMainFromGame();
            }else{
                sGameNetData.mDDZNet.sendDDZExitRoom();
            }
        }
    }else if(sGameData.mCurrLayer == sGameData.mDNLayer) {//
        sGameNetData.mDNNet.sendDNExitRoom();
    }else if(sGameData.mCurrLayer == sGameData.mZJHLayer) {//
        sGameNetData.mZJHNet.sendZJHExitRoom();
    }else {//刮刮乐
        if(sGameData.mExitRoomForAction == 1){
            connectHallWhenExitRoom(6);
            gotoSceneByLoading(TargetSceneMain,4);
        }else{
            connectHallWhenExitRoom();
            gotoSceneByLoading(TargetSceneMain,0);
        }
    }
}


//重新开始游戏
var reStartGame = function(){
    sGameData.mGameNet.mISReConnect_close = true;
    sGameData.mGameNet.closeNet();
    //log("need reconncet---");
    reInitWhenNetClose();
    sGameData.mGameNet.reConnect(sGameConfig.serverIp,sGameConfig.serverWebSocketPort,3);
}

//网络中断后重新初始化
var reInitWhenNetClose = function(){
    log("reInitWhenNetClose---")
    if(sGameData.mCurrScene != sGameData.mJSStartScene && sGameData.mCurrScene != sGameData.mReConnNetScene){
        doResetDataForLogout()
        gotoSceneByLoading(TargetSceneReConnNet,0);
    }
}
//重新连接网络后继续执行某操作
var continueActionAfterReconnectNet = function(){
    log("continueActionAfterReconnectNet---")
    if(sGameData.mGameNet.mConnType==1){//进入游戏房间
        log("re connect to game="+sGameData.mCurrRoom.gameId);

        doGameFunc(GameData_ID_GAMEID,sGameData.mCurrRoom.gameId,GameData_ID_RECONNECTNET_FUNC);


    }else if(sGameData.mGameNet.mConnType==0){ //返回大厅后要重新登录 (验证服务器session后 不需要重新登录)
        log("re connect to hall");
    }else if(sGameData.mGameNet.mConnType==2) { //比赛报名
        log("re connect to match signup="+sGameData.mCurrMatch.id+"|"+sGameData.mCurrMatch.gameId);
        var scoretype = sGameData.mMatchSignType;
        sGameNetData.mDDZMatchNet.sendDDZMatchSignup(sGameData.mCurrMatch.id,sGameData.mCurrMatch.roomId,scoretype);

    }else if(sGameData.mGameNet.mConnType==3) { //比赛 取消报名
        log("re connect to match cancel signup="+sGameData.mCurrMatch.id+"|"+sGameData.mCurrMatch.gameId);
        sGameNetData.mDDZMatchNet.sendDDZMatchCancelSignup(sGameData.mCurrMatch.id,sGameData.mCurrMatch.roomId);
    }else if(sGameData.mGameNet.mConnType==4) { //比赛  进入比赛
        log("re connect to match enter="+sGameData.mCurrMatch.id+"|"+sGameData.mCurrMatch.gameId);
        sGameNetData.mDDZMatchNet.sendDDZMatchEnterMatch(sGameData.mCurrMatch.id,sGameData.mCurrMatch.roomId);
    }else if(sGameData.mGameNet.mConnType==5) { //login
        log("re connect to login");
        if(sGameData.mCurrLayer == sGameData.mLoginLayer){
            sGameData.mLoginLayer.clickLogin();
        }
    }else if(sGameData.mGameNet.mConnType==6) { //充值
        log("re connect to pay");
        if(sGameData.mPayList.length == 0){
            if(!sGameData.mIsSendingData) {
                sGameData.mIsSendingData = true
                sGameData.mGameNet.sendPayList();
            }
        }
    }else if(sGameData.mGameNet.mConnType==10) { //比赛列表
        if(sGameData.mCurrScene == sGameData.mMatchScene){
            sGameData.mGameNet.sendGetMatchList();
        }
    }
}
//从房间返回 重连大厅网络
var connectHallWhenExitRoom = function(type){
    if(type == null){
        type = 0;
    }
    sGameData.mGameNet.reConnect(sGameConfig.serverIp,sGameConfig.serverWebSocketPort,type);
}

// 改变网络连接地址
var changeConnectNetAddr = function(tolocal){
    log("changeConnectNetAddr---"+tolocal);
    sGameConfig.isLocalTest = tolocal;
    sGameConfig.setConfigData(3);
    doResetDataForLogout()
    gotoSceneByLoading(TargetSceneLogin,0);
    log("sGameConfig.serverIp=="+sGameConfig.serverIp)
    sGameData.mGameNet.reConnect(sGameConfig.serverIp,sGameConfig.serverWebSocketPort,0);
}

// ******  net end  *********

//执行游戏的某方法 (GameData_ID_LOADGAME_FUNC 需要 传data)
var doGameFunc = function(findex,fvalue,gindex,data){
    var func = getGameConfigDataByType(findex,fvalue,gindex);
    if(func){
        func(data);
    }else{
        log("doGameFunc not found－－"+findex+"|"+fvalue+"|"+gindex);
    }
}

//根据游戏id取 游戏配置数据 findex:0gameid,1sceneid,
var getGameConfigDataByType = function(findex,fvalue,gindex){
    var value = null;
    var len = sGameData.mGameConfigDatas.length
    var gamedata = null;
    for(var i = 0;i<len;i++){
        var data = sGameData.mGameConfigDatas[i];
        if(data[findex] == fvalue){
            gamedata = data;
            break;
        }
    }
    if(gamedata!=null){
        value = gamedata[gindex]
    }
    return value;
}

//根据输入做测试 操作
var doTestActionByInput = function(data,showlabel){
    var hasaction = true;
    if(data == "/toserver"){
        changeConnectNetAddr(false);
    }else if(data == "/tolocal"){
        changeConnectNetAddr(true);
    }else if(data == "/tononet"){
        sGameData.mIsTestNoNet = true;
        doResetDataForLogout()
        gotoSceneByLoading(TargetSceneLogin,0);
        sGameData.mGameNet.closeNet()
    }else if(data == "/getversion"){
        if(showlabel){
            showlabel.setString(sGameConfig.clientVersion+"."+sGameConfig.resVersion+"(build:"+sGameData.mAppCppBuild+")_"+sGameConfig.configVersion);
        }
    }else if(data == "/getagent"){
        if(showlabel){
            showlabel.setString(sGameData.mAgent+" | "+sGameData.mPromoter+" | "+sGameConfig.useconfig);
        }
    }else if(data == "/cleanupdate"){
        //CallCpp.doSomeString(200, "","","","","");
        showNotice(sResWord.w_notice,sResWord.w_tip_cleanupdate,3,99);
    }else if(data == "/downtestres"){
        var ulr = "http://192.168.0.168/qpgame/res_t.zip"
        CallCpp.doSomeString(900, ulr,"","","","");
    }else if(data.indexOf("/downtestres")>-1){
        var datas = data.split(",");//{},{}
        if(datas.length == 2){
            var ulr = datas[2];
            CallCpp.doSomeString(900, ulr,"","","","");
        }
    }else if(data == "/reload"){
        doCheckAppUpdate();
    }else{
        hasaction = false;
    }
    log("doTestActionByInput=="+hasaction+"|"+data)
    return hasaction;
}

//检查是否有新的更新
var doCheckAppUpdate = function(){
    if(sGameData.mGameNet){
        sGameData.mGameNet.mISReConnect_close = true;
        sGameData.mGameNet.closeNet();
    }
    log("doCheckAppUpdate test");
    this.cleanAllJs();
    CallCpp.doSomeString(1001, "99","","","","");
}


//清除所有js(fileUtil 里的缓存 也必须清除，不然不会生效)
var cleanAllJs = function(){
    log("cleanAllJs---")
    //Clean script should also clean up the cache in file utils.
    for(var i=0;i<JSPaths.length;i++){
        var jspath = JSPaths[i];
        CallCpp.doSomeString(11, jspath,"","","","");
    }
    jsb.fileUtils.purgeCachedEntries();
}

//检查更新
var checkUpdate = function(agent,promoter,version){
    var needupdate = false;
    var info = getUpdateInfo(agent,promoter,version);
    if(info && version != info[2]){
        return info;
    }
    return null;
}
//获取更新版本信息（多乐ddz 的 1.0 版本 取不出来）
var getUpdateInfo = function(agent,promoter,version){
    var appupinfos =  [
        ["duole","ios_dlddz.1000gk.com","1.2",1,"46080000","itms-apps://itunes.apple.com/cn/app/id1119951997?mt=8"],
        ["duole","ios_qp.duoleyx.com","1.2",1,"46080000","itms-apps://itunes.apple.com/cn/app/id1116911175?mt=8"],

        ["dlttddz","ios_dlttddz.dlyx.com","1.2",1,"46080000","itms-apps://itunes.apple.com/cn/app/id1132504695?mt=8"],
        ["dlttzjh","ios_dlttzjh.dlyx.com","1.2",1,"46080000","itms-apps://itunes.apple.com/cn/app/id1136581895?mt=8"],
        ["dltthj","ios_dlttheji.dlyx.com","1.2",1,"46080000","itms-apps://itunes.apple.com/cn/app/id1137007023?mt=8"],

        ["dlqmhj","ios_dlqmhj.dlqmhj.com","1.1",1,"46080000","itms-apps://itunes.apple.com/cn/app/id1138221011?mt=8"],
        ["dlqmddz","ios_dlqmddz.dlqmddz.com","1.1",1,"46080000","itms-apps://itunes.apple.com/cn/app/id1138215511?mt=8"],

        ["dlkxhj","ios_dlkxhj.dlkxhj.com","1.2",1,"46080000","itms-apps://itunes.apple.com/cn/app/id1140071450?mt=8"],

        ["dlhlddz","ios_dlhlddz.dlhlddz.com","1.1",1,"46080000","itms-apps://itunes.apple.com/cn/app/id1141274529?mt=8"]
    ]

    //有渠道号，直接取渠道号
    for(var i=0;i<appupinfos.length;i++){
        var info = appupinfos[i];
        if(info[1] == promoter){
            return info;
        }
    }

    //for(var i=0;i<appupinfos.length;i++){
    //    var info = appupinfos[i];
    //    if(info[0] == agent){
    //        return info;
    //    }
    //}
    return null;
}

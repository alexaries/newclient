/**
 * Created by apple on 14-12-4.
 */


//************************************
//view change
//************************************
var VIEW_TAG_WEBVIEWFULL = 90000;  //全屏网页
var VIEW_TAG_CHOOSEENTERGAME = 90100; //多个断线重连选择房间
var VIEW_TAG_DAILYDO = 90200  //每日比做
var VIEW_TAG_LITTLELOAD = 90300  //小提示（不消失）
var VIEW_TAG_NOTICE = 90400;     //提示
var VIEW_TAG_SYSGONGGAO = 90500; //公告
var VIEW_TAG_SYSCHAT = 90600;    //聊天
var VIEW_TAG_NETWAIT = 90700;    //网络等待
var VIEW_TAG_UILOADING = 90800;  // ui加载
var VIEW_TAG_GAMEPLAYERINFO = 90900; //游戏玩家信息
var VIEW_TAG_TOPMSG = 91000;        //游戏跑马灯
var VIEW_TAG_AVATARNOTICE = 91100;   //换头像提示
var VIEW_TAG_NEEDPAYNOTICE = 91200;   //金币不足提示
var VIEW_TAG_DOWNGAMERES = 91300;   //下载游戏资源
var VIEW_TAG_EMITICON = 91400;//发射元宝
var VIEW_TAG_GOODSINFO = 91500;//物品信息
var VIEW_TAG_BUYPROPS = 91600;//购买道具
var VIEW_TAG_QUICKPAY = 91700;   //快速充值
var VIEW_TAG_SETTINGPANEL = 91800;   //设置
var VIEW_TAG_PAYWAIT = 92000;    //支付等待
//showtype  1帮助
var showWebviewFullScreen = function(showtype,data){
    sGameData.mEnterBackgroundFor = "webview"
    //显示提示
    log("showWebviewFullScreen---");
    var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_WEBVIEWFULL));
    if(!notice){
        notice = ShowWebViewFullScreen.create();
        var size = cc.director.getWinSize();
        sGameData.mCurrScene.addChild(notice,104,VIEW_TAG_WEBVIEWFULL);
    }else{
        notice.setVisible(true);
    }
    if(notice){
        sGameData.mIsShowNoticeing = true;
        notice.showWebView(showtype,data);
    }
}

var showWebKefu_android = function(){
    var url = "";
        
        url = "http://kf.shancr.com/getkf.php?cid=test"
        var turl = getGameSysConfig("kf_url")
        if(turl&&turl.length > 0){
            url = turl;
        }

        if (cc.sys.isNative) {
            CallCpp.doSomeString(4, url, "101", "", "", "");
        }else{
            //window.open(url,"help","width=700,height=400,directories");
        }
}



//分享数据
//type :0普通分享，1 比赛分享
var createShareData = function(type,data1,data2){
    
    var shareData = {};
    
    return shareData;
}
//pttype 0 1好友 2朋友圈
var showShareView = function(pttype,type,istask,data1,data2){
    //showWebviewFullScreen(5);
    log("showShareView---"+type+"|"+istask);

    var shareData = createShareData(type,data1,data2);
    var code = 101;
    if(pttype == 1){
        code = 191
    }else if(pttype == 2){
        code = 192
    }
    CallCpp.doSomeString(code, shareData.title+"|"+shareData.url, shareData.imgurl, shareData.content,shareData.desc, shareData.sitename+"|"+shareData.siteUrl);

}

//****************主界面之间 (ui tab)切换层界面****************
//gotoShowViewForXXX


//跳转到主界面
var gotoShowViewForMain = function(){
    if(sGameData.mCurrScene == sGameData.mMainScene) {
        if (sGameData.mCurrLayer != sGameData.mMainLayer) {
            sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
            var tlayer = MainLayer.create();
            if (tlayer) {
                sGameData.mCurrScene.addChild(tlayer, 1);
            }
        }
    }else{
        gotoSceneMain();
    }
}

//跳转到显示玩家信息
var gotoShowViewForPlayerInfo = function(){
    if(sGameData.mCurrLayer!=sGameData.mPlayerInfoLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        sGameData.mCurrLayer = null;
        var thelayer = PlayerInfoLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}

//跳转到显示修改密码
var gotoShowViewForChangePwd = function(){
    if(sGameData.mCurrLayer!=sGameData.mChangePwdLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        sGameData.mCurrLayer = null;
        var thelayer = ChangePwdLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}

//跳转到 游客账号 升级
var gotoShowViewForUpGuest = function(){
    if(sGameData.mCurrLayer!=sGameData.mUpGuestLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        sGameData.mCurrLayer = null;
        var thelayer = UpGuestLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}

//去支付界面
var gotoPay =function(){
    if(sGameData.mIsTestNoNet){
        gotoShowViewForPay();
    }else{
        if(sGameData.mPayList.length == 0){
            if(!sGameData.mIsSendingData) {
                sGameData.mIsSendingData = true
                sGameData.mGameNet.sendPayList();
            }
        }else{
            gotoShowViewForPay();
        }
    }
}



//跳到支付界面 （单一支付直接跳到充值，多种或没有支付跳到选择界面）
var gotoShowViewForPay = function(){

    if(sGameData.mAppIsSubmitToAppStore){
        if (sGameData.mCurrLayer != sGameData.mPayLayer) {
            sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
            var thelayer = PayLayer_ios.create();
            if (thelayer) {
                sGameData.mCurrScene.addChild(thelayer, 1);
            }
        }
    }else {
        if (sGameData.mCurrLayer != sGameData.mPayLayer) {
            sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
            var thelayer = PayLayer.create();
            if (thelayer) {
                sGameData.mCurrScene.addChild(thelayer, 1);
            }
        }
    }
}

var gotoShowViewForVip =function(){

}

var gotoRank = function(){
    if(sGameData.mIsTestNoNet){
        gotoShowViewForRank();
    }else{
        if(!sGameData.mIsSendingData) {
            sGameData.mIsSendingData = true
            sGameData.mGameNet.sendRankList(4);
        }
    }
}
//排行榜
var gotoShowViewForRank =function(){
    if(sGameData.mCurrLayer!=sGameData.mRankListLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var thelayer = RankListLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}


//跳转到任务界面
var gotoTask = function(type){
    if(type == null){
        type = 0;
    }
    if(sGameData.mIsTestNoNet){
        gotoShowViewForTask();
    }else{
        var loaddata = true;
        if(type == 1 && sGameData.mUserTasks.length > 0){
            loaddata = false;
        }
        if(loaddata){
            if(!sGameData.mIsSendingData) {
                sGameData.mIsSendingData = true
                sGameData.mGameNet.sendUTaskList();
            }
        }else{
            gotoShowViewForTask();
        }
    }
}

//跳转到任务界面
var gotoShowViewForTask = function(){
    if(sGameData.mCurrLayer!=sGameData.mTaskLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var thelayer = TaskLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}


//设置
var gotoShowViewForSetting = function(){
    if(sGameData.mCurrLayer!=sGameData.mSettingLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var thelayer = SettingLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}

var gotoShowViewForContactKefu = function(){
    if(sGameData.mCurrLayer!=sGameData.mContactKefuLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var thelayer = ContactKefuLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}

//跳转到消息界面
var gotoShowViewForMsgView = function(){
    if(sGameData.mCurrLayer!=sGameData.mMsgLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var thelayer = MsgLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}

//跳转到背包界面
var gotoShowViewForBag = function(){
    //if(sGameData.mCurrLayer!=sGameData.mBagLayer){
    //    sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
    //    var thelayer = BagLayer.create();
    //    if(thelayer){
    //        sGameData.mCurrScene.addChild(thelayer,1);
    //    }
    //}
}

//跳转到用户奖品
var gotoShowViewForUserPrize = function(){
    //if(sGameData.mCurrLayer!=sGameData.mUserPrizeLayer){
    //    sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
    //    var thelayer = UserPrizeLayer.create();
    //    if(thelayer){
    //        sGameData.mCurrScene.addChild(thelayer,1);
    //    }
    //}
}



var gotoShowViewForBank = function(){
    if(sGameData.mCurrLayer!=sGameData.mBankSaveCashLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var thelayer = BankSaveCashLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}
var gotoShowViewForBankGetCash = function(){
    if(sGameData.mCurrLayer!=sGameData.mBankGetCashLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var thelayer = BankGetCashLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}

var gotoShowViewForBankChangePwd = function(){
    if(sGameData.mCurrLayer!=sGameData.mChangeBankPwdLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var thelayer = ChangeBankPwdLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}


//购买道具
var gotoShowViewForBuyProps = function(){
    if(sGameData.mCurrLayer!=sGameData.mPropsBuyLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var thelayer = PropsBuyLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}

//
var gotoShowViewForChange = function(){
    if(sGameData.mCurrLayer!=sGameData.mChangeLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var thelayer = ChangeLayer.create();
        if(thelayer){
            sGameData.mCurrScene.addChild(thelayer,1);
        }
    }
}


////奖品兑换
//var gotoShowViewForPrizeChange = function(){
//    if(sGameData.mCurrLayer!=sGameData.mPrizesLayer){
//        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
//        var thelayer = PrizesLayer.create();
//        if(thelayer){
//            sGameData.mCurrScene.addChild(thelayer,1);
//        }
//    }
//}
////奖品兑换记录
//var gotoShowViewForPrizeChangeLog = function(){
//    if(sGameData.mCurrLayer!=sGameData.mChangePrizeLogLayer){
//        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
//        var thelayer = ChangePrizeLogLayer.create();
//        if(thelayer){
//            sGameData.mCurrScene.addChild(thelayer,1);
//        }
//    }
//}



//进入某游戏显示该游戏的房间
var gotoShowViewForGameRooms= function(gametype){
    sGameData.mCurrGameType = gametype

    if (sGameData.mCurrLayer != sGameData.mHallRoomLayer) {
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var thelayer = HallRoomLayer.create();
        if (thelayer) {
            sGameData.mCurrScene.addChild(thelayer, 1);
        }
    }

}


//进入某游戏显示该游戏的房间(单机)
var gotoShowViewForGameRoomsForDJ= function(gametype){
    sGameData.mCurrGameType = gametype
    gotoSceneDJHall()
}

var gotoDJRoomHall = function(){

}


//显示游戏房间的桌子
var gotoHallShowTable = function(){
    if (sGameData.mDefaultHallShow == 0) {
        gotoShowViewForHallList();
    } else {
        gotoShowViewForHallTable();
    }
}
//列表形式显示房间桌子列表
var gotoShowViewForHallList = function(){

        if (sGameData.mCurrLayer != sGameData.mHallListLayer) {
            sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
            var thelayer = HallListLayer.create();
            if (thelayer) {
                sGameData.mCurrScene.addChild(thelayer, 1);
            }
        }

}
//以桌子形式显示房间桌子列表
var gotoShowViewForHallTable = function(){
    if(sGameData.mCurrLayer!=sGameData.mHallTableLayer){
        sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
        var tlayer = HallTableLayer.create();
        if(tlayer){
            sGameData.mCurrScene.addChild(tlayer,1);
        }
    }
}





//****************主界面之间切换层界面  －－－end****************


//****************在场景总添加一个top界面****************
//显示 选择 进入 游戏 （短线重连时 有游戏获比赛）
var showChooseEnterGame = function(state,datas){
    log("showChooseEnterGame=="+state)
    var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_CHOOSEENTERGAME));
    if(!notice && state){
        notice = ChooseEnterGame.create(datas);
        sGameData.mCurrScene.addChild(notice, 100, VIEW_TAG_CHOOSEENTERGAME);
    }
    if(notice){
        notice.setVisible(state);
        if (state) {
            notice.startShow();
            sGameData.mIsShowTopView = true
        }else{
            sGameData.mIsShowTopView = false
            //sGameData.mCurrScene.removeChild(notice);
        }
    }
}


//显示每日必做
var showDailyDo = function(state,day){
    log("showDailyDo---");
    return;
    //var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_DAILYDO));
    //if(!notice){
    //    notice = DailyDoLayer.create();
    //    var size = cc.director.getWinSize();
    //    //notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
    //    sGameData.mCurrScene.addChild(notice,101,VIEW_TAG_DAILYDO);
    //}else{
    //    notice.setVisible(true);
    //}
    //if(notice){
    //    notice.setVisible(state)
    //    if(state){
    //        sGameData.mIsShowNoticeing = true;
    //    }else{
    //        sGameData.mIsShowNoticeing = false;
    //        if(!sGameData.mHasShowSysNotice){
    //            sGameData.mHasShowSysNotice = true;
    //            var msg = sGameData.mSysNoticemsg;
    //            if(msg.length > 0){
    //                msg = formatMsgFromNet(msg);
    //                if(sGameData.mAppCanShowSysGonggao) {
    //                    showSysGonggao(sResWord.w_gonggao, msg, 0, 0);
    //                }
    //            }
    //        }
    //    }
    //}
}


//显示登录奖励(---已停用)
var showSigninPrize = function(state,day){
    log("showSigninPrize---");

}

//显示小提示 （不主动消失）
var showLittleLoading = function(state,msg){
    log("showLittleLoading---");

    var size = cc.director.getWinSize();

    var littleNoticeNode = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_LITTLELOAD));
    if(!littleNoticeNode){
        var  littleNoticeNode = LittleNoticeNode.create(0);
        littleNoticeNode.setPosition(cc.p(size.width/2,size.height/2));
        sGameData.mCurrScene.addChild(littleNoticeNode,106,VIEW_TAG_LITTLELOAD);
    }else{
        littleNoticeNode.setVisible(true);
    }
    if(littleNoticeNode) {
        if (state) {
            littleNoticeNode.showMsg(msg);
            sGameData.mIsShowNoticeing = true;
        } else {
            littleNoticeNode.setVisible(false);
            sGameData.mIsShowNoticeing = false;
        }
    }
}

//显示小提示 （无按钮 1s后消失）
var showLittleNotice = function(msg,type,time){
    log("showLittleNotice---");

    if(!msg || msg.length == 0){
        return;
    }

    if(time==null){
        time = 1;
    }
    if(type==null){
        type = 0;
    }
    var size = cc.director.getWinSize();

    var  littleNoticeNode = LittleNoticeNode.create(type);
    littleNoticeNode.showMsg(msg);
    littleNoticeNode.setPosition(cc.p(size.width/2,size.height/2));
    sGameData.mCurrScene.addChild(littleNoticeNode,105);

    var showLittleNoticeEnd = function(){
        //if(sGameData.mCurrScene)
        if(littleNoticeNode.getParent()){
            littleNoticeNode.getParent().removeChild(littleNoticeNode,true);
        }
    }
    var delay = cc.DelayTime.create(time);
    var callback = cc.CallFunc.create(showLittleNoticeEnd, this);
    var actions2 = cc.Sequence.create(delay,callback);
    littleNoticeNode.runAction(actions2)
}

//显示提示
var showNotice = function(name,msg,type,from,data){
    log("showNotice---");
    var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_NOTICE));
    if(!notice){
        notice = NoticeLayer.create();
        var size = cc.director.getWinSize();
        notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
        if(type == 12){
            notice.setPosition(cc.p(size.width*0.5,size.height*0.5+100));
        }
        sGameData.mCurrScene.addChild(notice,104,VIEW_TAG_NOTICE);
    }else{
        notice.setVisible(true);
    }
    if(notice){
        sGameData.mIsShowNoticeing = true;
        notice.showNotice(name,msg,type,from,data);
    }
}
//隐藏提示
var closeNotice = function(){
    var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_NOTICE));
    if(notice){
        notice.hidden();
    }
}

//显示系统公告
var showSysGonggao = function(name,msg,type,from,data){
    log("showSysGonggao---");
    log("showNotice , mName = " + name);
    log("showNotice , mMsg = " + msg);
    var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_SYSGONGGAO));
    if(!notice){
        notice = SysGonggaoLayer.create();
        var size = cc.director.getWinSize();
        notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
        sGameData.mCurrScene.addChild(notice,104,VIEW_TAG_SYSGONGGAO);
    }else{
        notice.setVisible(true);
    }
    if(notice){
        sGameData.mIsShowNoticeing = true;
        notice.showNotice(name,msg,type,from,data);
    }
}
//显示需要充值提示
var showNeedPayNotice = function(type,msg){
    log("showNeedPayNotice---");
    var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_NEEDPAYNOTICE));
    if(!notice){
        notice = NeedPayNotice.create();
        var size = cc.director.getWinSize();
        notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
        sGameData.mCurrScene.addChild(notice,104,VIEW_TAG_NEEDPAYNOTICE);
    }else{
        notice.setVisible(true);
    }
    if(notice){
        sGameData.mIsShowNoticeing = true;
        notice.showNotice(type,msg);
    }
}

//显示需要充值提示
var showSettingPanel = function(){
    log("showSettingPanel---");
    var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_SETTINGPANEL));
    if(!notice){
        notice = SettingPanel.create();
        var size = cc.director.getWinSize();
        notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
        sGameData.mCurrScene.addChild(notice,104,VIEW_TAG_SETTINGPANEL);
    }else{
        notice.setVisible(true);
    }
    if(notice){
        sGameData.mIsShowNoticeing = true;
        notice.showNotice();
    }
}



//显示下载资源
var showDownGameRes = function(state,gameId){
    log("showDownGameRes---");
    var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_DOWNGAMERES));
    if(!notice){
        if(state){
            notice = DownLoadGameRes.create();
            var size = cc.director.getWinSize();
            notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
            sGameData.mCurrScene.addChild(notice,103,VIEW_TAG_DOWNGAMERES);
        }
    }else{
        notice.setVisible(true);
    }
    if(notice){
        if(!state){
            notice.closeView();
        }else{
            sGameData.mIsShowNoticeing = true;
            notice.showStartDownLoad(gameId);
        }
    }
}
//显示下载资源 (type 0 下载中   1下载成功  2下载失败)
var updateDownGameResInfo = function(type,percent){
    log("updateDownGameResInfo---"+type+"|"+percent);
    var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_DOWNGAMERES));
    if(notice){
        notice.updateInfo(type,percent)
    }
}

//显示物品信息提示
var showGoodsTip = function(parent,state,name,info,tip,pos){
    var infotips = parent.getChildByTag(VIEW_TAG_GOODSINFO);//
    if(!infotips&&state){
        infotips = GoodsInfoTip.create();
        var size = cc.director.getWinSize();
        infotips.setPosition(pos);
        parent.addChild(infotips,101,VIEW_TAG_GOODSINFO);
    }
    if(infotips) {
        infotips.setVisible(state)
        if (state) {
            infotips.setPosition(pos);
            infotips.showInfo(name,info,tip)

            var showGoodsTipEnd = function(infotips){
                if(infotips.getParent()){
                    infotips.getParent().removeChild(infotips,true);
                }
            }
            var delay = cc.DelayTime.create(2);
            var callback = cc.CallFunc.create(showGoodsTipEnd, this);
            var actions2 = cc.Sequence.create(delay,callback);
            infotips.stopAllActions();
            infotips.runAction(actions2)
        }
    }
}


//显示提示
var showBuyPropsNotice = function(props){
    log("showBuyPropsNotice---");
    var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_BUYPROPS));
    if(!notice){
        notice = BuyPropsPanel.create();
        var size = cc.director.getWinSize();
        notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
        sGameData.mCurrScene.addChild(notice,104,VIEW_TAG_BUYPROPS);
    }else{
        notice.setVisible(true);
    }
    if(notice){
        sGameData.mIsShowNoticeing = true;
        notice.showNotice(props);
    }
}

//显示系统公告
var showWorldChat = function(){
    log("showWorldChat---");
    var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_SYSCHAT));
    if(!notice){
        notice = WorldChatPanel.create();
        var size = cc.director.getWinSize();
        notice.setPosition(cc.p(size.width/2,size.height/2));
        sGameData.mCurrScene.addChild(notice,104,VIEW_TAG_SYSCHAT);
    }else{
        notice.setVisible(true);
    }
    if(notice){
        sGameData.mIsShowNoticeing = true;
        sGameData.mIsShowWorldChatPaneling = true;
        notice.showChats();
    }
}
//显示网络等待提示
var showNetWait = function(state,delay){
    if(delay == null){
        delay = 1;
    }
    if(sGameData.mCurrScene&&sGameData.mCurrScene!=sGameData.mLoadingScene){
        var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_NETWAIT));
        if(!notice&&state){
            notice = NetWaitShow.create();
            var size = cc.director.getWinSize();
            notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
            sGameData.mCurrScene.addChild(notice,110,VIEW_TAG_NETWAIT);
        }
        if(notice){
            notice.setVisible(state);
            if (state) {
                if (delay == 1) {
                    notice.startAnim();
                } else {
                    notice.showAnim();
                }
            } else {
                notice.stopAnim();
            }
        }
    }
}

//显示支付等待
var showPayWait = function(state){
    if(state){
        if(sGameData.mCurrScene&&sGameData.mCurrScene!=sGameData.mLoadingScene){
            var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_PAYWAIT));
            if(!notice){
                notice = PayWaitLayer.create();
                var size = cc.director.getWinSize();
                notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
                sGameData.mCurrScene.addChild(notice,110,VIEW_TAG_PAYWAIT);
            }
        }
    }else{
        var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_PAYWAIT));
        if(notice){
            notice.removeFromParent();
        }
    }
}

//显示ui加载提示
var showUILoadWait = function(state,delay){
    if(delay == null){
        delay = 1;
    }
    if(sGameData.mCurrScene) {
        var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_UILOADING));
        if (!notice) {
            notice = NetWaitShow.create(1);
            var size = cc.director.getWinSize();
            notice.setPosition(cc.p(size.width * 0.5, size.height * 0.5));
            sGameData.mCurrScene.addChild(notice, 110, VIEW_TAG_UILOADING);
        }
        notice.setVisible(state);
        if (state) {
            if (delay == 1) {
                notice.startAnim();
            } else {
                notice.showAnim();
            }
        } else {
            notice.stopAnim();
        }
    }
}

//操作时隐藏界面
var hiddenViewWhenAction = function(){
    showGamePlayerInfo(false);
    //if(sGameData.mFriendChatLayer){
    //    var parent = sGameData.mFriendChatLayer.getParent();
    //    if(parent){
    //        parent.removeChild(sGameData.mFriendChatLayer,true);
    //    }
    //}
}

//显示游戏玩家信息 1dzpk 2zjh 3dn 4ddz 5scmj 6gymj 7ddzmathc
var showGamePlayerInfo = function(state,player,gtype,showvip){

    if(showvip == null){
        showvip = 0;
    }
    if(gtype == null){
        gtype = 0;
    }

    var setl = sGameData.mCurrScene.getChildByTag(VIEW_TAG_GAMEPLAYERINFO);
    if(!setl&&state){
        setl = GamePlayerInfo.create(showvip,gtype);
        if(setl){
            var size = cc.director.getWinSize();
            setl.setPosition(cc.p(size.width/2,size.height/2+13));
            sGameData.mCurrScene.addChild(setl,95,VIEW_TAG_GAMEPLAYERINFO);
        }
    }
    if(setl){
        setl.setVisible(state);
        if(player){
            dealWithPlayerDataForShow(player);
        }
        setl.mShowPlayer = player;
        sGameData.mIsShowTopView = state;
        if(state){
            setl.showInfo();
        }else{
            setl.closePanel();
        }
    }
}
//更新游戏玩家信息
var updateGamePlayerInfo = function(player,gtype){

    var setl = sGameData.mCurrScene.getChildByTag(VIEW_TAG_GAMEPLAYERINFO);

    if(setl&&setl.visible){
        setl.mShowPlayer = player;
        setl.showInfo();

    }
}


//显示 顶部跑马灯 （游戏中）
var showTopMsg = function(msg){
    if(sGameData.mAppIsSubmitToAppStore){
        return;
    }
    var topbar = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_TOPMSG));
    if(!topbar){
        topbar = TopMsgBar.create();
        var size = cc.director.getWinSize();
        topbar.setPosition(cc.p(size.width*0.5,size.height));
        if(sGameData.mCurrScene == sGameData.mDDZGameScene){
            topbar.setPosition(cc.p(size.width*0.5,size.height-103));
        }
        sGameData.mCurrScene.addChild(topbar,88,VIEW_TAG_TOPMSG);
    }else{
        topbar.setVisible(true);
    }
    if(topbar){
        topbar.addShowMsg(msg)
    }
}

//显示交互（扔炸弹等）
var showInterative = function(seat,toseat,index,hpos,parent){
    log("showInterative----")

    var inters = ["interative_1","interative_2","interative_3","interative_4","interative_5","interative_6","interative_7","interative_8"];
    var inter = inters[index];
    var spriteframe = getAnimFristFrameSprite(inter);
    if(spriteframe){
        var animsprite = cc.Sprite.create();
        animsprite.initWithSpriteFrame(spriteframe)

        var mypos = hpos[seat]
        var topos = hpos[toseat];
        animsprite.setPosition(mypos);
        if(index == 7&&topos.x>mypos.x){
            animsprite.setFlippedX(true);
        }
        parent.addChild(animsprite,100);

        var playsound = function(){
            var sounds = [res.interative_1_mp3,res.interative_2_mp3,res.interative_3_mp3,res.interative_4_mp3,res.interative_5_mp3,res.interative_6_mp3,res.interative_7_mp3,res.interative_8_mp3]
            var sound = sounds[index];
            SoundManager.playSound(sound)
        }

        var jumpanim = cc.JumpTo.create(1,topos,150,1);
        var callback1 = cc.CallFunc.create(playsound,this);
        var callback = cc.CallFunc.create(cleanInterative,this,parent);

        var animation = AnimationManager.getAnimation(inter)
        var animate =  cc.Animate.create(animation);
        var seq = cc.Sequence.create(jumpanim,callback1,animate,callback)
        animsprite.runAction(seq);

    }
}
//清除交互
var cleanInterative = function(tar,parent){
    parent.removeChild(tar)
}


//喷硬币动画
var showPengqianAnim = function(num,type) {
    log("showPengqianAnim=="+num+"|"+type)
    var size = cc.director.getWinSize();
    var showemit = sGameData.mCurrScene.getChildByTag(VIEW_TAG_EMITICON)
    if (showemit == null) {
        var startp = cc.p(size.width/2, size.height / 2);
        var endp = cc.p(size.width*0.5, size.height);
        var showemit = ShowEmitIcon.create(20, startp, endp, this.showEmitOver)
        sGameData.mCurrScene.addChild(showemit, 106,VIEW_TAG_EMITICON)
    }
    showemit.showPengqianAnim(num,type);
}
//喷硬币动画结束
var showEmitOver = function(tar){
    log("showEmitOver")

}

//****************在场景总添加一个top界面   ------  end****************



//****************切换场景  ****************


//从某游戏返回 （跳转时都使用这个）
var goToMainFromGame = function(type){
    if(type == null){
        type = 0;
    }
    sGameData.mGoToMainFromGameType = type
    doGameFunc(GameData_ID_GAMEID,sGameData.mCurrGameType,GameData_ID_QUITGAME_FUNC);


    if(sGameData.mExitRoomForAction == 1){//退出为了充值
        connectHallWhenExitRoom(6);
        sGameData.mExitRoomForAction = 0;
        gotoSceneByLoading(TargetSceneMain,4);
    }

}


//从游戏大厅返回 （跳转时都使用这个） （除ddz）
var goToMainFromHall= function(gametype){
    //连接大厅网络
    //退出游戏房间时重连网络
    connectHallWhenExitRoom();
    gotoShowViewForGameRooms(gametype);
}

//显示 大厅
var gotoSceneMain = function(type){
    log("gotoSceneMain---")
    gotoSceneByLoading(TargetSceneMain,type);
}

//显示 大厅
var gotoSceneDJHall = function(type){
    log("gotoSceneDJHall---")
    //gotoSceneByLoading(TargetSceneDJHall,type);
}




//跳转到某游戏 （跳转时都使用这个）
var gotoGameScene = function(gameId,data){
    doGameFunc(GameData_ID_GAMEID,gameId,GameData_ID_ENTERGAME_FUNC,data);
}

//跳转到场景－－ 比赛
var gotoMatch = function(){
    log("gotoMatch---")
    if(sGameData.mAppCanShowMatch) {
        //gotoSceneByLoading(TargetSceneMatch);
    }
}

//通过加载过渡界面进入场景
var gotoSceneByLoading = function(targetScane,data){
    if(cc.sys.isNative){
        cc.LoaderScene.preload(g_loading_resources, function () {
            cc.director.runScene(new LoadingScene.scene(targetScane,data));
        }, this);
    }else{
        loadSceneByTarget(targetScane,data);
    }
}

//加载某个场景
var loadSceneByTarget = function(targetScane,data){
    if(targetScane == TargetSceneLogin){
        loadLoginScene()
    }else if(targetScane == TargetSceneReConnNet){
        loadReConnNetScene(data)
    }else if(targetScane == TargetSceneMain){
        loadMainScene(data)
    }else if(targetScane == TargetSceneDJHall){
        loadDJHallScene(data)
    }else if(targetScane == TargetSceneMatch){
        loadMatchScene()
    }else{
        doGameFunc(GameData_ID_SCENEID,targetScane,GameData_ID_LOADGAME_FUNC,data);
    }

}
//加载资源然后进入某场景

//加载 场景 －－比赛
var loadMatchScene = function(){
    var resources = concatArray([g_match_resources,g_all_resources]);
    cc.LoaderScene.preload(resources, function () {
        cc.director.runScene(new MatchScene.scene());
    }, this);
}

//加载 场景 －－主界面
//type 0 main 1hall 3hallroom(ddz) 4pay
var loadMainScene = function(type){
    if(type == null){
        type = 0;
    }
    var resources = [];//g_hall_resources,
    resources = concatArray([g_main_resources,g_hall_resources_qp,g_all_resources,g_match_resources]);//,

    cc.LoaderScene.preload(resources, function () {
        if(type == 1){
            sGameData.mShowMainLayerIndex = 1;
            if (sGameData.mEnterFromViewType == 1) {
                sGameData.mShowMainLayerIndex = 2;
            }
        }else if(type == 3){
            sGameData.mShowMainLayerIndex = 3;
        }else if(type == 4){
            sGameData.mShowMainLayerIndex = 4;
        }else {
            sGameData.mShowMainLayerIndex = type;
        }
        cc.director.runScene(new MainScene.scene());
    }, this);
}

//加载 场景 －－单机大厅（单机大厅 时单独的）
var loadDJHallScene = function(type){
    //if(type == null){
    //    type = 0;
    //}
    //var hallres = getHallResByType(0,sGameData.mCurrGameType)
    //var resources = concatArray([hallres,g_all_resources]);
    //cc.LoaderScene.preload(resources, function () {
    //    cc.director.runScene(new DJHallScene.scene());
    //}, this);
}

//加载 场景 －－登录
var loadLoginScene = function(){
    var resources = concatArray([g_login_resources,g_all_resources]);
    cc.LoaderScene.preload(resources, function () {
        cc.director.runScene(new LoginScene.scene());
    }, this);
}
//加载 场景 －－登录
var loadReConnNetScene = function(){
    var resources = concatArray([g_login_resources,g_all_resources]);
    cc.LoaderScene.preload(resources, function () {
        cc.director.runScene(new ReConnNetScene.scene());
    }, this);
}



//****************切换场景  end****************
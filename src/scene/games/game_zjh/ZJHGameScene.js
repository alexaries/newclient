/**
 * Created by Administrator on 14-5-13.
 * 扎金花 scene
 */
var ZJHGameScene = BaseScene.extend({
    mUseVipShow:1,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mZJHGameScene = this;
            sGameData.mCurrScene = this;

            log("start show ZJHGameScene");

            //[res.game_ui_plist,res.head_plist,res.coins_plist,res.cards_plist,res.zjh_ui_plist,res.game_bg_vip_plist,res.game_table_vip_plist,res.game_chair_vip_plist,res.interatives_plist,res.face_plist];
            var plistpicres = concatArray([g_loadplist_all,g_loadplist_zjh,g_loadplist_interative]);//,g_loadplist_interative
            var plistanimress = concatArray([AnimationManager.zjhanimdata]);//,AnimationManager.interativeanimdata
            var ccsanimress = concatArray([]);
            var plistmanyanimresed = concatArray([]);
            this.startLoadRes(plistpicres,plistanimress,ccsanimress,plistmanyanimresed)

            bRet = true;
        }
        return bRet;
    },
    showView:function(){
        this.cleanLoadView();
        var size = cc.director.getWinSize();

        //显示背景
        var bgname = "#zjh_bg.png"
        var bgsprite = cc.Sprite.create(bgname);
        bgsprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(bgsprite, 0);
        //var scale = size.width/1136;
        //bgsprite.setScale(scale);

        //var innersprite = cc.Sprite.create("#zjh_inner_bg.png");
        //innersprite.attr({
        //    x: size.width / 2,
        //    y: size.height-20,
        //    anchorY:1
        //});
        //this.addChild(innersprite, 0);

        //显示 层
        var aGameLayer = ZJHLayer.create();
        this.addChild(aGameLayer,1);

        var showDeviceinfo = ShowDeviceInfo.create(1);
        this.addChild(showDeviceinfo,5);
        showDeviceinfo.setPosition(cc.p(35,size.height-15));

        this.schedule(this.update,0.05);
        this.scheduleOnce(this.initInSecondFrame,0.05);

    },
//第2帧初始化
    initInSecondFrame:function(){
        if(!sGameData.mIsTestNoNet) {
            if(sGameData.mNetSendDataAfterEnterGame) {
                if(sGameData.mSendDataTypeInGame == 0){//进入房间
                    var room = sGameData.mCurrRoom;
                    if (!sGameData.mIsSendEnterRoomIng) {
                        sGameData.mIsSendEnterRoomIng = true;
                        sGameData.mGameNet.reConnect(room.ipAddress, room.websocketPort, 1);
                    }
                }else if(sGameData.mSendDataTypeInGame == 1){//进入桌子
                    var  table = sGameData.mCurrTable
                    var tableIdx = table.id;
                    sGameNetData.mZJHNet.sendZJHEnterTable(tableIdx);
                }else if(sGameData.mSendDataTypeInGame == 2){//随机进入桌子
                    sGameNetData.mZJHNet.sendZJHRandomEnterTable(-1)
                }
            }
        }
    },
    //进入时执行
    onEnter:function(){
        this._super();
        log("game scene enter")
        //showUILoadWait(true,0);
    },
    //退出时执行
    onExit:function(){
        this._super();
        removeSpriteChangeScene();
        sGameData.mZJHGameScene = null;
        SoundManager.stopBGMusic();
        SoundManager.cleanAllSound();
    },
    //每帧更新
    update:function(){

        if(sGameData.mZJHLayer){
            if (sGameData.mZJHLayer.mHasInitView) {
                this._super();
                sGameData.mZJHLayer.update();
            }
        }
    },
    //更新网络指令
    updateOnLoadDataInGame:function(netdata){
        var command = netdata[0];
        switch (command){
            case S_ZJH_SITDOWN:
                sGameData.mZJHLayer.noticeZJHSitDown(netdata);
                break;
            case S_ZJH_STANDUP:
                sGameData.mZJHLayer.noticeZJHStandUp(netdata);
                break;
            case S_ZJH_NOTICE_PLAYERDATA_CHANGE:
                sGameData.mZJHLayer.noticeZJHNoticePlayerDataChange(netdata);
                break;
            case S_ZJH_GAMESTART:
                sGameData.mZJHLayer.noticeZJHGameStart(netdata);
                break;
            case S_ZJH_BET:
                sGameData.mZJHLayer.noticeZJHBet(netdata);
                break;
            case S_ZJH_GIVEUP:
                sGameData.mZJHLayer.noticeZJHGiveUp(netdata);
                break;
            case S_ZJH_SEECARD:
                sGameData.mZJHLayer.noticeZJHSeeCard(netdata);
                break;
            case S_ZJH_NOTICE_SEECARD:
                sGameData.mZJHLayer.noticeZJHNoticeSeeCard(netdata);
                break;
            case S_ZJH_COMPARE:
                sGameData.mZJHLayer.noticeZJHCompare(netdata);
                break;
            case S_ZJH_OPEN_CARD:
                sGameData.mZJHLayer.noticeZJHOpenCard(netdata);
                break;
            case S_ZJH_GAMEOVER:
                sGameData.mZJHLayer.noticeZJHGameOver(netdata);
                break;
            case S_ZJH_KICKPLAYER:
                sGameData.mZJHLayer.noticeZJHKickPlayer(netdata);
                break;
            case S_ZJH_CHAT:
                sGameData.mZJHLayer.noticeZJHChat(netdata);
                break;
            case S_ZJH_PLAYER_INFO:
                sGameData.mZJHLayer.noticeZJHPlayerInfo(netdata);
                break;
            case S_ZJH_JICARD:
                sGameData.mZJHLayer.noticeZJHJiCard(netdata);
                break;
            case S_ZJH_JICARD_WIN:
                sGameData.mZJHLayer.noticeZJHJiCardWin(netdata);
                break;
            case S_ZJH_RE_RANDOM_ENTER_NOTIFY:
                sGameData.mZJHLayer.noticeZJHReRandomEnterNotify(netdata);
                break;
            default:
                log("unknown command="+command);
                break;
        }
    }

});

ZJHGameScene.create = function () {
    var sg = new ZJHGameScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

ZJHGameScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = ZJHGameScene.create();
    scene.addChild(layer);
    return scene;
};


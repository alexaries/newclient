/**
 * Created by Administrator on 14-5-16.
 * 斗牛scene
 */
var DNGameScene = BaseScene.extend({

    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mDNGameScene = this;
            sGameData.mCurrScene = this;

            cc.log("start show DNGameScene");

            //[res.game_ui_plist,res.coins_plist,res.cards_plist,res.dn_ui_plist,res.game_bg_vip_plist,res.game_table_vip_plist,res.game_chair_vip_plist,res.face_plist,res.head_plist,res.interatives_plist];
            var plistpicres = concatArray([g_loadplist_all,g_loadplist_dn,g_loadplist_interative]);//,g_loadplist_interative
            var plistanimress = concatArray([]);//AnimationManager.interativeanimdata
            var ccsanimress = concatArray([AnimationManager.dnanimdata_ccs]);
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
        var bgsprite = cc.Sprite.create("#game_bg_vip.png");
        bgsprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(bgsprite, 0);

        //显示 层
        var aGameLayer = DNLayer.create();
        this.addChild(aGameLayer,1);

        //var showDeviceinfo = ShowDeviceInfo.create(1);
        //this.addChild(showDeviceinfo,5);
        //showDeviceinfo.setPosition(cc.p(35,size.height-15));

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
                    sGameNetData.mDNNet.sendDNEnterTable(tableIdx);
                }else if(sGameData.mSendDataTypeInGame == 2){//随机进入桌子
                    sGameNetData.mDNNet.sendDNRandomEnterTable(-1)
                }
            }
        }
    },
    //进入时执行
    onEnter:function(){
        this._super();
        cc.log("game scene enter")
        //showUILoadWait(true,0);
    },
    //退出时执行
    onExit:function(){
        this._super();
        removeSpriteChangeScene()
        sGameData.mDNGameScene = null;
        SoundManager.stopBGMusic();
        SoundManager.cleanAllSound();
    },
    //每帧更新
    update:function(){

        if(sGameData.mDNLayer){
            if (sGameData.mDNLayer.mHasInitView) {
                this._super();
                sGameData.mDNLayer.update();
            }
        }
    },
    //更新网络数据
    updateOnLoadDataInGame:function(netdata){
        var command = netdata[0];
        switch (command){
            case S_DN_SITDOWN:
                sGameData.mDNLayer.noticeDNSitDown(netdata);
                break;
            case S_DN_STANDUP:
                sGameData.mDNLayer.noticeDNStandUp(netdata);
                break;
            case S_DN_NOTICE_PLAYERDATA_CHANGE:
                sGameData.mDNLayer.noticeDNNoticePlayerDataChange(netdata);
                break;
            case S_DN_SENDCARD:
                sGameData.mDNLayer.noticeDNSendCard(netdata);
                break;
            case S_DN_BET:
                sGameData.mDNLayer.noticeDNBet(netdata);
                break;
            case S_DN_NOTICE_BET:
                sGameData.mDNLayer.noticeDNNoticeBet(netdata);
                break;
            case S_DN_FENPAI:
                sGameData.mDNLayer.noticeDNFenpai(netdata);
                break;
            case S_DN_QIANGZHUANG:
                sGameData.mDNLayer.noticeDNQiangzhuang(netdata);
                break;
            case S_DN_NOTICE_QIANGZHUANG:
                sGameData.mDNLayer.noticeDNNoticeQiangzhuang(netdata);
                break;
            case S_DN_GAMEOVER:
                sGameData.mDNLayer.noticeDNGameOver(netdata);
                break;
            case S_DN_KICKPLAYER:
                sGameData.mDNLayer.noticeDNKickPlayer(netdata);
                break;
            case S_DN_CHAT:
                sGameData.mDNLayer.noticeDNChat(netdata);
                break;
            case S_DN_PLAYER_INFO:
                sGameData.mDNLayer.noticeDNPlayerInfo(netdata);
                break;
            case S_DN_USE_TOOLS_BOTS:
                sGameData.mDNLayer.noticeDNUseToolsBots(netdata);
                break;
            case S_DN_RE_RANDOM_ENTER_NOTIFY:
                sGameData.mDNLayer.noticeDNReRandomEnterNotify(netdata);
                break;
            default:
                cc.log("unknown command="+command);
                break;
        }
    }

});

DNGameScene.create = function () {
    var sg = new DNGameScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

DNGameScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = DNGameScene.create();
    scene.addChild(layer);
    return scene;
};


/**
 * Created by Administrator on 14-4-15.
 * ddz游戏scene
 */

var DDZGameScene = BaseScene.extend({
    //初始化
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mDDZGameScene = this;
            sGameData.mCurrScene = this;

            log("show ddz game scene  mode="+sGameData.mGameMode);


            //[res.game_ui_plist,res.head_plist,res.cards_plist,res.ddz_ui_plist,res.ddz_bg_plist,res.ddz_effects_plist,res.ddz_scoreanim_plist,res.gamematch_ui_plist,res.face_plist,res.interatives_plist];
            var plistpicres = concatArray([g_loadplist_all,g_loadplist_ddz,g_loadplist_interative]);//
            var plistanimress = concatArray([AnimationManager.ddzanimdata]);//,AnimationManager.interativeanimdata
            var ccsanimress = concatArray([]);
            var plistmanyanimresed = concatArray([]);
            if(sGameData.mGameMode != GAMEMODE_NORMAL){
                plistpicres = concatArray([g_loadplist_all,g_loadplist_ddz,g_loadplist_ddzmatch,g_loadplist_interative]);//
                plistanimress = concatArray([AnimationManager.ddzanimdata,AnimationManager.ddzmatchanimdata]);//AnimationManager.interativeanimdata,
            }
            this.startLoadRes(plistpicres,plistanimress,ccsanimress,plistmanyanimresed) //加载资源

            bRet = true;
        }
        return bRet;
    },
    //加载资源 后显示界面
    showView:function(){
        this.cleanLoadView();
        var size = cc.director.getWinSize();

        var bgsprite = cc.Sprite.create("#ddz_bg.png");
        bgsprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(bgsprite, 0);
        bgsprite.setScaleX(size.width/bgsprite.width)
        bgsprite.setScaleY(size.height/bgsprite.height)

        var titlesprite = cc.Sprite.create("#ddz_title.png");
        titlesprite.attr({
            x: size.width / 2,
            y: size.height / 2+100
        });
        this.addChild(titlesprite, 0);

        //var titlesprite1 = cc.Sprite.create(res.ddz_title_png);
        //titlesprite1.attr({
        //    x: size.width / 2,
        //    y: size.height / 2+30
        //});
        //this.addChild(titlesprite1, 0);



        var aGameLayer = DDZLayer.create();
        this.addChild(aGameLayer,1);

        this.schedule(this.update,0.05);

        this.scheduleOnce(this.initInSecondFrame,0.05);

    },
    //第2帧初始化
    initInSecondFrame:function(){
        if(!sGameData.mIsTestNoNet) {
            if(sGameData.mGameMode == GAMEMODE_NORMAL) {
                if(sGameData.mNetSendDataAfterEnterGame) {
                    if(sGameData.mSendDataTypeInGame == 0){//进入房间
                        var room = sGameData.mCurrRoom;
                        if (!sGameData.mIsSendEnterRoomIng) {
                            sGameData.mIsSendEnterRoomIng = true;
                            sGameData.mGameNet.reConnect(room.ipAddress, room.websocketPort, 1);
                        }
                    }
                }else{
                    if (!cc.sys.isNative) { //html5 进入游戏后才发进入指令
                        var room = sGameData.mCurrRoom;
                        if (!sGameData.mIsSendEnterRoomIng) {
                            sGameData.mIsSendEnterRoomIng = true;
                            sGameData.mGameNet.reConnect(room.ipAddress, room.websocketPort, 1);
                        }
                    }
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
        sGameData.mDDZGameScene = null;

        removeSpriteChangeScene();
        SoundManager.stopBGMusic();
        SoundManager.cleanAllSound();
    },
    //每帧执行（实际0.05s执行一次）
    update:function(){
        if(sGameData.mDDZLayer) {
            if (sGameData.mDDZLayer.mHasInitView) {
                this._super();
            }
        }
    },
    //网络数据通知
    updateOnLoadDataInGame:function(netdata){
        var command = netdata[0];
        switch (command){
            case S_DDZ_GAMRSTART:
            case S_DDZMATCH_GAMRSTART:
                sGameData.mDDZLayer.noticeDDZGameStart(netdata);
                break;
            case S_DDZ_FACARD:
            case S_DDZMATCH_FACARD:
                sGameData.mDDZLayer.noticeDDZFaCard(netdata);
                break;
            case S_DDZ_CALLCARD:
            case S_DDZMATCH_CALLCARD:
                if(sGameData.mUseDDZRule == DDZ_RULE_NORMAL){
                    sGameData.mDDZLayer.noticeDDZCallCard_normal(netdata);
                }else{
                    sGameData.mDDZLayer.noticeDDZCallCard(netdata);
                }
                break;
            case S_DDZ_SEE_CARD:
            case S_DDZMATCH_SEE_CARD:
                sGameData.mDDZLayer.noticeDDZSeeCard(netdata);
                break;
            case S_DDZ_DAO_LA:
            case S_DDZMATCH_DAO_LA:
                sGameData.mDDZLayer.noticeDDZDaoLa(netdata);
                break;
            case S_DDZ_OUTCARD:
            case S_DDZMATCH_OUTCARD:
                sGameData.mDDZLayer.noticeDDZOutCard(netdata);
                break;
            case S_DDZ_GAMEOVER:
            case S_DDZMATCH_GAMEOVER:
                if(sGameData.mUseDDZRule == DDZ_RULE_NORMAL) {
                    sGameData.mDDZLayer.noticeDDZGameOver_normal(netdata);
                }else{
                    sGameData.mDDZLayer.noticeDDZGameOver(netdata);
                }
                break;
            case S_DDZ_SCENE:
            case S_DDZMATCH_SCENE:
                if(sGameData.mUseDDZRule == DDZ_RULE_NORMAL) {
                    sGameData.mDDZLayer.noticeDDZScene_normal(netdata);
                }else{
                    sGameData.mDDZLayer.noticeDDZScene(netdata);
                }
                break;
            case S_DDZ_JIABEI:
                sGameData.mDDZLayer.noticeDDZJiabei(netdata);
                break;
            case S_DDZ_NOTICE_PLAYERDATA_CHANGE:
                sGameData.mDDZLayer.noticeDDZNoticePlayerDataChange(netdata);
                break;
            case S_DDZ_KICKPLAYER:
                sGameData.mDDZLayer.noticeDDZKickPlayer(netdata);
                break;
            case S_DDZ_KICK_DISABLE_USER:
                sGameData.mDDZLayer.noticeDDZKickDisableUser(netdata);
                break;
            case S_DDZ_CHAT:
            case S_DDZMATCH_CHAT:
                sGameData.mDDZLayer.noticeDDZChat(netdata);
                break;
            case S_DDZ_PLAYER_INFO:
                sGameData.mDDZLayer.noticeDDZPlayerInfo(netdata);
                break;
            case S_DDZMATCH_ADDBLOOD:
                //sGameData.mDDZLayer.noticeDDZMatchAddBlood(netdata);
                break;
            case S_DDZ_USE_TOOLS:
            case S_DDZMATCH_USE_TOOLS:
                sGameData.mDDZLayer.noticeDDZUseTools(netdata);
                break;
            case S_DDZ_TUOGUAN:
            case S_DDZMATCH_TUOGUAN:
                sGameData.mDDZLayer.noticeDDZTuoguan(netdata);
                break;
            case S_DDZ_TUOGUAN_CANCEL:
            case S_DDZMATCH_TUOGUAN_CANCEL:
                sGameData.mDDZLayer.noticeDDZTuoguanCancel(netdata);
                break;
            default:
                log("unknown command="+command);
                break;
        }
    }

});

DDZGameScene.create = function () {
    var sg = new DDZGameScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

DDZGameScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = DDZGameScene.create();
    scene.addChild(layer);
    return scene;
};


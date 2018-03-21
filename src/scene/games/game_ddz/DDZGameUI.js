/**
 * Created by Administrator on 14-4-23.
 */
//ui
var DDZGameUI = cc.Node.extend({
    mIndex:0, //某位置
    mBasePointShow:null,//底分显示
    mBeishuShow:null,//倍数显示
    mBasePoint:1,//底分
    mBeishu:1,//倍数
    mShowDeviceinfo:null,
    mShowDeviceinfo1:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bsize = cc.size(620,70);

            var top = createPanel(bsize,"g_top_bg.png");
                //cc.Sprite.create("#ddz_topbg.png");//createFrameSprite("poker_panel_frame.png",res.desks_bottom_bar_bg_png,bsize);

            top.setAnchorPoint(cc.p(0.5,1));
            top.setPosition(cc.p(size.width/2,size.height));
            this.addChild(top,1);




            var size_ui_btn = cc.size(100,60);
            var exitSprite = createUIButtonSpriteLight(size_ui_btn,"#g_icon_back.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var exitSprite1 = createUIButtonSpriteLight(size_ui_btn,"#g_icon_back.png",cc.p(0.5,0.5),"",cc.p(0,0),1,24);
            var exitSprite2 = createUIButtonSpriteLight(size_ui_btn,"#g_icon_back.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var exitItem = cc.MenuItemSprite.create(
                exitSprite,
                exitSprite1,
                exitSprite2,
                this.exitGame,this);
            exitItem.attr({
                x:size.width/2 + 230,
                y:size.height-36
            });

            var settingSprite = createUIButtonSpriteLight(size_ui_btn,"#g_icon_setting.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var settingSprite1 = createUIButtonSpriteLight(size_ui_btn,"#g_icon_setting.png",cc.p(0.5,0.5),"",cc.p(0,0),1,24);
            var settingSprite2 = createUIButtonSpriteLight(size_ui_btn,"#g_icon_setting.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var settingItem = cc.MenuItemSprite.create(
                settingSprite,
                settingSprite1,
                settingSprite2,
                this.gotoSetting,this);
            settingItem.attr({
                x:size.width/2 + 135,
                y:size.height-36
            });

            var msgSprite = createUIButtonSpriteLight(size_ui_btn,"#g_icon_face.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var msgSprite1 = createUIButtonSpriteLight(size_ui_btn,"#g_icon_face.png",cc.p(0.5,0.5),"",cc.p(0,0),1,24);
            var msgSprite2 = createUIButtonSpriteLight(size_ui_btn,"#g_icon_face.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var msgItem = cc.MenuItemSprite.create(
                msgSprite,
                msgSprite1,
                msgSprite2,
                this.gotoShowMsg,this);
            msgItem.attr({
                x:size.width/2 - 230,
                y:size.height-36
            });

            var cardnoteSprite = createUIButtonSpriteLight(size_ui_btn,"#g_icon_msg.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var cardnoteSprite1 = createUIButtonSpriteLight(size_ui_btn,"#g_icon_msg.png",cc.p(0.5,0.5),"",cc.p(0,0),1,24);
            var cardnoteSprite2 = createUIButtonSpriteLight(size_ui_btn,"#g_icon_msg.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var cardnoteItem = cc.MenuItemSprite.create(
                cardnoteSprite,
                cardnoteSprite1,
                cardnoteSprite2,
                this.gotoShowCardNote,this);
            cardnoteItem.attr({
                x:size.width/2 - 135,
                y:size.height-36
            });
            cardnoteItem.setVisible(false);

            var inviteSprite = createUIButtonSpriteLight(size_ui_btn,"#g_icon_invite.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var inviteSprite1 = createUIButtonSpriteLight(size_ui_btn,"#g_icon_invite.png",cc.p(0.5,0.5),"",cc.p(0,0),1,24);
            var inviteSprite2 = createUIButtonSpriteLight(size_ui_btn,"#g_icon_invite_dis.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var inviteItem = cc.MenuItemSprite.create(
                inviteSprite,
                inviteSprite1,
                inviteSprite2,
                this.gotoShowInvite,this);
            inviteItem.attr({
                x:size.width/2 - 135,
                y:size.height-36,
            });
            this.mInviteBtn = inviteItem;
            inviteItem.setScale(0.8);



            var menu = cc.Menu.create(exitItem,settingItem,msgItem,cardnoteItem,inviteItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);


            var showDeviceinfo = ShowDeviceInfo.create(0);
            this.addChild(showDeviceinfo,5);
            showDeviceinfo.setPosition(cc.p(size.width/2,size.height-12));
            this.mShowDeviceinfo = showDeviceinfo;


            var countshow  = CountDownShow.create();
            this.addChild(countshow,2);
            countshow.setPosition(cc.p(size.width/2 - 135,size.height-36));
            this.mCountShow = countshow;
            countshow.setVisible(false);
            //countshow.setCountDown(0);



            //xxx
            bRet = true;
        }
        return bRet;
    },
    showDeviceInfo:function(type){
        var size = cc.director.getWinSize();
        if(type == 1){
            this.mShowDeviceinfo.setType(1)
            this.mShowDeviceinfo.setPosition(cc.p(35,size.height-15));
        }else{
            this.mShowDeviceinfo.setType(0)
            this.mShowDeviceinfo.setPosition(cc.p(size.width/2,size.height-12));
        }
    },
    //设置倍数 底分
    setBeishu:function(beishu,difen){
        this.mBasePoint = difen;
        this.mBeishu = beishu;
        //if(sGameData.mUseDDZRule == DDZ_RULE_NORMAL) {
        //    this.mBeishuShow.setValue(2,this.mBeishu,3,1);
        //}
        //this.mBasePointLabel.setString(this.mBasePoint);
        //this.mBasePointShow.setValue(2,this.mBasePoint,3,1);
        //
    },
    //退出游戏
    exitGame:function(){
        log("exitGame");
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            gotoSceneByLoading(TargetSceneMain, 9);
            //sGameNetData.cleanAllNetData()
            return;
        }
        if(!sGameData.mIsTestNoNet){
            if(sGameData.mGameMode == GAMEMODE_NORMAL){ //普通模式
                if(sGameData.mDDZLayer.mIsInGame){
                    showLittleNotice(sResWord.w_ddz_ingame);
                }else{
                    sGameNetData.mDDZNet.sendDDZExitRoom();
                }
            }else{ //比赛模式
                if(sGameData.mCurrMatch.type == MATCHSTART_COUNT){ //人满开赛
                    if(sGameData.mCurrMatch.isend){
                        goToMainFromGame(10);
                    }else if(sGameData.mCurrMatch.started){
                        showLittleNotice(sResWord.w_match_tip_cannotquit);
                        //sGameNetData.mDDZMatchNet.sendDDZMatchReqExitMatch(sGameData.mCurrMatch.id,sGameData.mCurrMatch.roomId);
                    }else{
                        sGameNetData.mDDZMatchNet.sendDDZMatchCancelSignup(sGameData.mCurrMatch.id,sGameData.mCurrMatch.roomId);
                    }
                }else{
                    if(sGameData.mCurrMatch.isend) {
                        goToMainFromGame(10);
                    }else if(sGameData.mCurrMatch.extrainfo.state == 1){//报名阶段
                        goToMainFromGame(10);
                    }
                }
            }
        }else{
            this.gotoMain();
        }
    },
    //设置
    gotoSetting:function(){
        log("gotoSetting");
        if(sGameData.mDDZLayer.checkIsShowTopView()){
            return
        }
        playClickSound();
        sGameData.mDDZLayer.showSetting();
    },
    //显示聊天
    gotoShowMsg:function(){
        log("gotoShowMsg");
        if(sGameData.mDDZLayer.checkIsShowTopView()){
            return
        }
        playClickSound();
        if(sGameData.mGameMode == GAMEMODE_MATCH_VIDEO){
            return;
        }
        if(!sGameData.mDDZLayer.mIsInGame&&sGameData.mGameMode == GAMEMODE_MATCH) {

        }else{
            sGameData.mDDZLayer.op_showGameChatFace();
        }
    },
    //显示记牌器
    gotoShowCardNote:function(){
        log("gotoShowCardNote");
        if(sGameData.mDDZLayer.checkIsShowTopView()){
            return
        }
        playClickSound();

        if(!sGameData.mDDZLayer.mIsInGame&&sGameData.mGameMode == GAMEMODE_MATCH) {

        }else{
            sGameData.mDDZLayer.op_showGameChatFace();
        }

        //if (!sGameData.mDDZCanUseTool) {
        //    sGameData.mDDZLayer.showCardNote();
        //} else {
        //    if (sGameData.mGameMode == GAMEMODE_NORMAL) {
        //        sGameNetData.mDDZNet.sendDDZUseTools(sGameData.mUser.id);
        //    } else if (sGameData.mGameMode == GAMEMODE_MATCH) {
        //        sGameNetData.mDDZMatchNet.sendDDZMatchUseTools(sGameData.mUser.id);
        //    } else if (sGameData.mGameMode == GAMEMODE_MATCH_VIDEO) {
        //        sGameData.mDDZLayer.showCardNote();
        //    }
        //}

    },
    gotoShowInvite:function(){
        log("gotoShowInvite");

        playClickSound();

        if(!sGameData.mIsTestNoNet) {
            sGameData.mGameNet.sendInviteGame();
        }
        this.mInviteBtn.setEnabled(false);
        this.mCountShow.setVisible(true);
        this.mCountShow.setCountDown(0,this.setInviteBtnEnable,this);

    },
    setInviteBtnDisable:function(){
        this.mInviteBtn.setEnabled(false);
        this.mCountShow.closeClock();
        this.mCountShow.setVisible(false);
    },
    setInviteBtnEnable:function(tar){
        if(!tar){
            tar = this;
        }
        tar.mInviteBtn.setEnabled(true);
        tar.mCountShow.setVisible(false);
    },


    //退出游戏返回主界面
    gotoMain:function(){
        if(sGameData.mGameMode == GAMEMODE_MATCH){
            //gotoSceneByLoading(TargetSceneMatch,1);
            gotoSceneByLoading(TargetSceneMain);
        }else{
            gotoSceneByLoading(TargetSceneMain,3);
        }
    }


});
DDZGameUI.create = function () {
    var sg = new DDZGameUI();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

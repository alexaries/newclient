/**
 * Created by Administrator on 14-4-23.
 */
//ui
var DNGameUI = cc.Node.extend({
    mIndex:0, //某位置
    mBasePointShow:null,//底分显示
    mBeishuShow:null,//倍数显示
    mBasePoint:1,//底分
    mBeishu:1,//倍数
    mShowDeviceinfo:null,
    mShowDeviceinfo1:null,
    mInviteBtn:null,
    mCountShow:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bsize = cc.size(620,70);

            var top = createPanel(bsize,"g_top_bg.png");


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

    },
    //退出游戏
    exitGame:function(){
        cc.log("exitGame");
        playClickSound();

        sGameData.mDNLayer.op_quitgame_view();
    },
    //设置
    gotoSetting:function(){
        cc.log("gotoSetting");

        playClickSound();
        sGameData.mDNLayer.showSetting();
    },
    //显示聊天
    gotoShowMsg:function(){
        cc.log("gotoShowMsg");

        playClickSound();


        sGameData.mDNLayer.op_showGameChatFace();
        //sGameData.mDNLayer.op_showGameChatMsg();

    },
    //显示记牌器
    gotoShowCardNote:function(){
        cc.log("gotoShowCardNote");

        playClickSound();

        sGameData.mZJHLayer.op_showGameChatFace();

    },

    gotoShowInvite:function(){
        cc.log("gotoShowInvite");

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

        gotoSceneByLoading(TargetSceneMain,3);

    }


});
DNGameUI.create = function () {
    var sg = new DNGameUI();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

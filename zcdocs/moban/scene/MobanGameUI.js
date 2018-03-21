


var MobanGameUI = cc.Node.extend({
    mIndex:0, //某位置
    mBasePointLabel:null,
    mBeishuLabel:null,
    mBasePoint:1,
    mBeishu:1,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bottomsprite = cc.Sprite.create("#desks_stake_background.png");
            bottomsprite.attr({
                x:size.width/2,
                y:3,
                scaleX:0.7,
                scaleY:0.5,
                anchorY:0
            });
            this.addChild(bottomsprite,1);

            var softcashsprite = cc.Sprite.create("#softcash.png");
            softcashsprite.attr({
                x : size.width/2-120,
                y : 6,
                scaleX:0.35,
                scaleY:0.35,
                anchorY:0
            });
            this.addChild(softcashsprite,2);

            var softcashshow = ShowNum.create();
            softcashshow.setPosition(cc.p(size.width/2-103,15))
            softcashshow.setScale(0.7)
            this.addChild(softcashshow,3);
            softcashshow.setValue(2,sGameData.mUser.softCash,1,1);

            var hardcashsprite = cc.Sprite.create("#hardcash.png");
            hardcashsprite.attr({
                x : size.width/2+20,
                y : 6,
                scaleX:0.35,
                scaleY:0.35,
                anchorY:0
            });
            this.addChild(hardcashsprite,2);

            var hardcashshow = ShowNum.create();
            hardcashshow.setPosition(cc.p(size.width/2+40,15))
            hardcashshow.setScale(0.7)
            this.addChild(hardcashshow,3);
            hardcashshow.setValue(2,sGameData.mUser.hardCash,1,1);


            var bsize = cc.size(620,60);
            var top = createFrameSprite("poker_panel_frame.png",res.desks_bottom_bar_bg_png,bsize);

            top.setAnchorPoint(cc.p(0.5,1));
            top.setPosition(cc.p(size.width/2,size.height-5));
            this.addChild(top,1);

            var topline =cc.Sprite.create("#desks_splitter.png");
            topline.setAnchorPoint(cc.p(0.5,1));
            topline.setPosition(cc.p(size.width/2+200,size.height-5));
            this.addChild(topline,2);

            var topline1 =cc.Sprite.create("#desks_splitter.png");
            topline1.setAnchorPoint(cc.p(0.5,1));
            topline1.setPosition(cc.p(size.width/2-200,size.height-5));
            this.addChild(topline1,2);




            var size_ui_btn = cc.size(100,60);
            var exitSprite = createUIButtonSpriteLight(size_ui_btn,"#game_exit.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var exitSprite1 = createUIButtonSpriteLight(size_ui_btn,"#game_exit.png",cc.p(0.5,0.5),"",cc.p(0,0),1,24);
            var exitSprite2 = createUIButtonSpriteLight(size_ui_btn,"#game_exit.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var exitItem = cc.MenuItemSprite.create(
                exitSprite,
                exitSprite1,
                exitSprite2,
                this.exitGame,this);
            exitItem.attr({
                x:size.width/2 + 255,
                y:size.height-37
            });

            var settingSprite = createUIButtonSpriteLight(size_ui_btn,"#game_setting.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var settingSprite1 = createUIButtonSpriteLight(size_ui_btn,"#game_setting.png",cc.p(0.5,0.5),"",cc.p(0,0),1,24);
            var settingSprite2 = createUIButtonSpriteLight(size_ui_btn,"#game_setting.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var settingItem = cc.MenuItemSprite.create(
                settingSprite,
                settingSprite1,
                settingSprite2,
                this.gotoSetting,this);
            settingItem.attr({
                x:size.width/2 + 155,
                y:size.height-37
            });

            var msgSprite = createUIButtonSpriteLight(size_ui_btn,"#game_msg.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var msgSprite1 = createUIButtonSpriteLight(size_ui_btn,"#game_msg.png",cc.p(0.5,0.5),"",cc.p(0,0),1,24);
            var msgSprite2 = createUIButtonSpriteLight(size_ui_btn,"#game_msg.png",cc.p(0.5,0.5),"",cc.p(0,0),0,24);
            var msgItem = cc.MenuItemSprite.create(
                msgSprite,
                msgSprite1,
                msgSprite2,
                this.gotoShowMsg,this);
            msgItem.attr({
                x:size.width/2 - 255,
                y:size.height-37
            });



            var menu = cc.Menu.create(exitItem,settingItem,msgItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);


            //xxx
            bRet = true;
        }
        return bRet;
    },

    exitGame:function(){
        cc.log("exitGame");
        playClickSound();
        this.gotoMain();
    },
    gotoSetting:function(){
        cc.log("gotoSetting");
        playClickSound();
    },
    gotoShowMsg:function(){
        cc.log("gotoShowMsg");
        playClickSound();

    },
    gotoMain:function(){
        gotoSceneByLoading(TargetSceneMain,0);
    }


});
MobanGameUI.create = function () {
    var sg = new MobanGameUI();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

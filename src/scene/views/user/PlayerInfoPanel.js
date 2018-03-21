/**
 * Created by apple on 15-12-25.
 */

var PlayerInfoPanel = cc.Node.extend({
    mIndex:0, //某位置
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var csize = cc.size(size.width-20,size.height-92-20);

            //添加按钮 tab1
            var rtabsize = cc.size(180,58);

            var rtabtitle = ButtonSpriteWithWordInner("#panel_t4_tab.png", sResWord.w_playerinfo, cc.p(0.5,0.5),32,0);
            rtabtitle.setPosition(cc.p(350+100, size.height-97 -17-5));
            rtabtitle.setAnchorPoint(cc.p(0.5, 1));
            this.addChild(rtabtitle, 10);

            var rtab2sprite = ButtonSpriteWithWordInner("#panel_t4_tab1.png", sResWord.w_bagprops, cc.p(0.5,0.5),32,0);
            var rtab2sprite1 = ButtonSpriteWithWordInner("#panel_t4_tab1.png", sResWord.w_bagprops, cc.p(0.5,0.5),32,1);
            var rtab2sprite2 = ButtonSpriteWithWordInner("#panel_t4_tab1.png", sResWord.w_bagprops, cc.p(0.5,0.5),32,0);
            var rtab2Item = cc.MenuItemSprite.create(
                rtab2sprite,
                rtab2sprite1,
                rtab2sprite2,
                this.clickTabr2,this);
            rtab2Item.setAnchorPoint(cc.p(0.5,1));
            rtab2Item.setPosition(cc.p(350+290,size.height-97 -17-6));

            var sexSprite = ButtonSpriteWithWordInner("#poker_switch_on.png",sResWord.w_sex_man,cc.p(0.3,0.5),24,0);
            var sexSprite1 = ButtonSpriteWithWordInner("#poker_switch_off.png",sResWord.w_sex_woman,cc.p(0.7,0.5),24,0);
            var sexSprite2 = ButtonSpriteWithWordInner("#poker_switch_on.png",sResWord.w_sex_man,cc.p(0.3,0.5),24,0);
            var sexItem = cc.MenuItemSprite.create(
                sexSprite,
                sexSprite1,
                sexSprite2,
                this.setSexChange,this);
            sexItem.attr({
                anchorX:0,
                x:335+190+csize.width*0.01,
                y:size.height/2-csize.height*0.12-20
            });
            this.mSexItem = sexItem;

            var menu = null;

            menu = cc.Menu.create(sexItem,rtab2Item);

            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 10);

            this.setButtonShow();

            this.showRightInfo();
            //xxx
            bRet = true;
        }
        return bRet;
    },
    showRightInfo:function(){
        var size = cc.director.getWinSize();
        var csize = cc.size(size.width-20,size.height-92-20);

        var tempY_a = 0;//android 文字 偏移
        if(cc.sys.os == cc.sys.OS_ANDROID){
            tempY_a = 2;
        }


        var rsize = cc.size(size.width-300-61,size.height-92-50-68);
        var rightbg = createSysPanel_t5(rsize);
        rightbg.setPosition(cc.p(size.width-25,size.height-97 -17-65));
        rightbg.setAnchorPoint(cc.p(1,1));
        this.addChild(rightbg);

        var rightbasenode = cc.Node.create();
        this.addChild(rightbasenode,5);
        rightbasenode.setPosition(cc.p(335+190,size.height/2-20));
        this.mRightBaseNode = rightbasenode


        var line = cc.Sprite.create("#line1.png")
        line.setPosition(cc.p(150,csize.height*0.105));
        line.setScaleX(450/104)
        rightbasenode.addChild(line)
        line.setOpacity(80);

        var line1 = cc.Sprite.create("#line1.png")
        line1.setPosition(cc.p(150,-csize.height*0.045));
        line1.setScaleX(450/104)
        rightbasenode.addChild(line1)
        line1.setOpacity(80);

        var line2 = cc.Sprite.create("#line1.png")
        line2.setPosition(cc.p(150,-csize.height*0.195));
        line2.setScaleX(450/104)
        rightbasenode.addChild(line2)
        line2.setOpacity(80);


        var nicktiplabel = cc.LabelTTF.create(sResWord.w_nickname+":",sGameData.mFontname, 24);
        nicktiplabel.setAnchorPoint(cc.p(1,0.5));
        nicktiplabel.setPosition(cc.p(0,csize.height*0.18));
        rightbasenode.addChild(nicktiplabel,2);

        var leveltiplabel = cc.LabelTTF.create(sResWord.w_level+":",sGameData.mFontname, 24);
        leveltiplabel.setAnchorPoint(cc.p(1,0.5));
        leveltiplabel.setPosition(cc.p(0,csize.height*0.03));
        rightbasenode.addChild(leveltiplabel,2);


        var sextiplabel = cc.LabelTTF.create(sResWord.w_sex+":",sGameData.mFontname, 24);
        sextiplabel.setAnchorPoint(cc.p(1,0.5));
        sextiplabel.setPosition(cc.p(0,-csize.height*0.12));
        rightbasenode.addChild(sextiplabel,2);


        var logintiplabel = cc.LabelTTF.create(sResWord.w_login+":",sGameData.mFontname, 24);
        logintiplabel.setAnchorPoint(cc.p(1,0.5));
        logintiplabel.setPosition(cc.p(0,-csize.height*0.27));
        rightbasenode.addChild(logintiplabel,2);


        var nick = sGameData.mUser.nickName
        if(nick.length > 60){
            nick = nick.substring(0,60);
        }
        // top
        var size_nick_area = cc.size(350, 50);
        var s9sprite = createNickArea(size_nick_area);

        var aEditBox_nickname = null;
        if(sGameData.mCocosVerCode >=30100){
            aEditBox_nickname = new cc.EditBox(size_nick_area,s9sprite);
        }else{
            aEditBox_nickname = cc.EditBox.create(size_nick_area,s9sprite);
        }
        aEditBox_nickname.setAnchorPoint(cc.p(0,0.5));
        aEditBox_nickname.setPosition(cc.p(csize.width*0.01,csize.height*0.18));
        aEditBox_nickname.setMaxLength(60);
        aEditBox_nickname.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
        aEditBox_nickname.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
        aEditBox_nickname.setDelegate(this);
        aEditBox_nickname.setTag(7558);
        aEditBox_nickname.setString(nick);
        aEditBox_nickname.setFontColor(cc.color(255,255,255));
        aEditBox_nickname.setFontSize(32);
        rightbasenode.addChild(aEditBox_nickname,2);
        this.mEditBox_nickname = aEditBox_nickname;


        var  username = sGameData.mUser.userName;
        if(sGameData.mUser.type == 0){//游客
            username = sResWord.w_guest;
        }
        var userlabel = cc.LabelTTF.create(username, sGameData.mFontname, 24);
        userlabel.setAnchorPoint(cc.p(0,0.5));
        userlabel.setPosition(cc.p(10,-csize.height*0.27));
        rightbasenode.addChild(userlabel,2);
        setLabelScale(userlabel,350);


        var ubasepoint = cc.p(csize.width*0.01+50,csize.height*0.03-23)

        var starsprite = cc.Sprite.create("#gamedj_star.png");
        starsprite.attr({
            x:ubasepoint.x-35,
            y:ubasepoint.y+8,
            anchorY:0
        });
        rightbasenode.addChild(starsprite,5);

        if(!sGameData.mULevel||sGameData.mULevel.id!=sGameData.mUser.level){
            sGameData.mULevel = getULevelByLv(sGameData.mUser.level);
        }

        var rate = sGameData.mUser.xp/sGameData.mULevel.xp;
        log("xp==="+sGameData.mUser.xp+"/"+sGameData.mULevel.xp);

        var levelshow = ShowNum.create();
        levelshow.setPosition(cc.p(ubasepoint.x-33,ubasepoint.y+24))
        if(sGameData.mUser.level<10){
            levelshow.setScale(1.2);
        }else{
            //levelshow.setScale(1.2);
        }
        rightbasenode.addChild(levelshow,6);
        levelshow.setValue(4,sGameData.mUser.level,3,1);


        var xplabel = cc.LabelTTF.create(sGameData.mUser.xp+"/"+sGameData.mULevel.xp, sGameData.mFontname, 18);
        if(xplabel!=null){
            xplabel.attr({
                x:ubasepoint.x+50,
                y:ubasepoint.y+21+tempY_a,
                anchorX: 0.5,
                anchorY: 0.5
            });
            rightbasenode.addChild(xplabel,6);
            xplabel.enableStroke(cc.color(255,255,255), 1);
            if(xplabel.getContentSize().width > 130) {
                xplabel.setScale(130 / xplabel.getContentSize().width);
            }
        }

        var trackSprite = cc.Sprite.create("#gamedj_level_frame.png")
        var progressSprite = cc.Sprite.create("#gamedj_level_progressbar.png")
        var blankSprite = cc.Sprite.create("#blank.png")
        var xpslider = cc.ControlSlider.create(trackSprite,progressSprite ,blankSprite);
        xpslider.setAnchorPoint(cc.p(0, 0.5));
        xpslider.setPosition(cc.p(ubasepoint.x-25,ubasepoint.y+23));
        xpslider.setMinimumValue(0);
        xpslider.setMaximumValue(1);
        xpslider.setValue(rate);
        xpslider.setEnabled(false);
        rightbasenode.addChild(xpslider,4,7888);



    },
    //性别改变
    setSexChange:function(){
        log("setSexChange")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        if(sGameData.mUser.sex == 1){
            sGameData.mUser.sex = 0
        }else{
            sGameData.mUser.sex = 1;
        }
        sGameData.mGameNet.sendChangeUserInfo(3,""+sGameData.mUser.sex);
        this.setButtonShow();
    },
    //按钮显示
    setButtonShow:function(){
        log("setButtonShow=="+sGameData.mUser.sex);
        if(sGameData.mUser.sex == 1){
            this.mSexItem.unselected();
        }else{
            this.mSexItem.selected();
        }
    },
    clickTabr2:function(){
        log("clickTabr2")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();

        if(sGameData.mIsTestNoNet){
            //gotoShowViewForBag();
            sGameData.mPlayerInfoLayer.showRightView(2);
        }else{
            if(!sGameData.mIsSendingData) {
                sGameData.mIsSendingData = true
                sGameData.mGameNet.sendUPropsList(4);
            }
        }
    },
    //输入框接口
    editBoxEditingDidBegin: function (editBox) {
        //log("editBox " + "1" + " DidBegin !");
    },

    editBoxEditingDidEnd: function (editBox) {
        //log("editBox " + "1" + " DidEnd !");
    },

    editBoxTextChanged: function (editBox, text) {
        //log("editBox " + "1" + ", TextChanged, text: " + text);
    },

    editBoxReturn: function (editBox) {
        //log("editBox " + "1" + " was returned !");

        if(editBox == this.mEditBox_nickname){
            var name = this.mEditBox_nickname.getString();;
            if(name.length > 0){
                var wordok = true
                if(!checkCharsForNick(name)){
                    wordok = false;
                }
                if(wordok){
                    log(" name = "+name);
                    if(name != sGameData.mUser.nickName){
                        log("edit nick name");
                        sGameData.mGameNet.sendChangeUserInfo(1,name);
                    }
                }else{
                    showLittleNotice(sResWord.w_tip_input_nickcheck);
                }
            }else{
                this.mEditBox_nickname.setString(sGameData.mUser.nickName);
            }
        }
    }
});
PlayerInfoPanel.create = function () {
    var sg = new PlayerInfoPanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

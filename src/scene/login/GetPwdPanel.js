/**
 * Created by apple on 14-12-11.
 */
//找回密码面板
var GetPwdPanel = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mEditBox_num:null,
    mEditBox_vcode:null,
    mGetCodeBtn:null,
    mTimetiplabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            sGameData.mGetPwdPanel = this;

            log("GetPwdPanel start");



            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
            this.addChild(colorlayer);
            var size_panel = cc.size(800, 465); //800 463  680, 385
            var size_panel_inner = cc.size(770, 350);//650 230
            var point_btn_buycash = cc.p(0,-0.36);
            var point_panel_close = cc.p(4,-4);//边线的高度

            var basenode = cc.Node.create();
            basenode.setPosition(cc.p(0,-55));
            this.addChild(basenode);

            var  bgimg = createSysPanel(size_panel);
            bgimg.setPosition(cc.p(size.width/2,size.height/2));
            basenode.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var csize = this.getContentSize();




            var innerimg = createSysPanel_yellow(size_panel_inner);
            innerimg.setPosition(cc.p(size.width/2,size.height/2));
            basenode.addChild(innerimg);


            var tipLabel = cc.LabelTTF.create(sResWord.w_getpwd, sGameData.mFontname, 28,
                cc.size(500,40),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tipLabel.setPosition(cc.p(size.width/2,size.height/2+csize.height*0.42+5));
            tipLabel.setAnchorPoint(cc.p(0.5,0.5));
            basenode.addChild(tipLabel);

            var numtiplabel = cc.LabelTTF.create(sResWord.w_getpwd_input_phonenum+":",sGameData.mFontname, 24);
            numtiplabel.setAnchorPoint(cc.p(1,0.5));
            numtiplabel.setPosition(cc.p(size.width/2-csize.width*0.2,size.height/2+csize.height*0.2));
            basenode.addChild(numtiplabel,2);
            numtiplabel.setColor(cc.color(60,60,60))



            // top
            var size_nick_area = cc.size(300, 50);
            var s9sprite = createInputNew(size_nick_area);

            var aEditBox_num = null;
            if(sGameData.mCocosVerCode >=30100){
                aEditBox_num = new cc.EditBox(size_nick_area,s9sprite);
            }else{
                aEditBox_num = cc.EditBox.create(size_nick_area,s9sprite);
            }
            aEditBox_num.setAnchorPoint(cc.p(0,0.5));
            aEditBox_num.setPosition(cc.p(size.width/2-csize.width*0.19,size.height/2+csize.height*0.2));
            aEditBox_num.setMaxLength(20);
            aEditBox_num.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE)
            aEditBox_num.setReturnType(cc.KEYBOARD_RETURNTYPE_DONE);
            aEditBox_num.setDelegate(this);
            aEditBox_num.setTag(7558);
            aEditBox_num.setString("");
            aEditBox_num.setFontColor(cc.color(200,200,200));
            aEditBox_num.setFontSize(32);
            basenode.addChild(aEditBox_num,2);
            this.mEditBox_num = aEditBox_num;






            //添加按钮 关闭
            var closesprite = cc.Sprite.create("#g_close_btn.png");
            var closesprite1 = cc.Sprite.create("#g_close_btn.png");
            var closesprite2 = cc.Sprite.create("#g_close_btn.png");
            closesprite1.setColor(cc.color(200, 200, 200));
            var closeItem = cc.MenuItemSprite.create(
                closesprite,
                closesprite1,
                closesprite2,
                this.clickToClose,this);
            closeItem.setAnchorPoint(cc.p(1,1));
            closeItem.setPosition(cc.p(size.width/2+csize.width/2-8,size.height/2+csize.height/2-6));


            var bindphoneSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_getpwd,cc.p(0.5,0.5),28,0)
            var bindphoneSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_getpwd,cc.p(0.5,0.5),28,1)
            var bindphoneSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_getpwd,cc.p(0.5,0.5),28,0)
            var bindphoneItem = cc.MenuItemSprite.create(
                bindphoneSprite,
                bindphoneSprite1,
                bindphoneSprite2,
                this.clickGetPwd,this);
            bindphoneItem.attr({
                x:size.width/2,
                y:size.height/2-csize.height*0.35,
                anchorX:0.5,
                anchorY:0
            });




            var menu = cc.Menu.create(closeItem,bindphoneItem);
            menu.x = 0;
            menu.y = 0;
            basenode.addChild(menu, 1);

            var timetiplabel = cc.LabelTTF.create(sResWord.w_getpwd_timetip_s2, sGameData.mFontname, 24);//垂直对齐
            timetiplabel.setAnchorPoint(cc.p(0.5,0.5));
            timetiplabel.setPosition(cc.p(size.width/2+csize.width*0.34,size.height/2+csize.height*0.2));
            basenode.addChild(timetiplabel,2);
            timetiplabel.setTag(8003);
            this.mTimetiplabel = timetiplabel
            timetiplabel.setColor(cc.color(60,60,60))

            var tiplabel = cc.LabelTTF.create(sResWord.w_tishi+":"+sResWord.w_getpwd_tip, sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(size_panel_inner.width - 100,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            tiplabel.setAnchorPoint(cc.p(0.5,0.5));
            tiplabel.setPosition(cc.p(size.width/2,size.height/2-csize.height*0.1));
            tiplabel.setTag(8002);
            basenode.addChild(tiplabel,2);
            tiplabel.setColor(cc.color(60,60,60))


            bRet = true;
        }
        return bRet;
    },
    //退出时执行
    onExit:function(){
        this._super();
        sGameData.mGetPwdPanel = null;
    },
    update:function(){
        this.checkState();
    },
    startShow:function(){
        this.checkState();

        this.mEditBox_num.setString("");

        this.schedule(this.update,0.05);
    },
    stopShow:function(){
        this.unschedule(this.update);
    },
    //关闭
    clickToClose:function(){
        log("clickToClose--")
        playClickSound();
        if(sGameData.mCurrLayer == sGameData.mLoginLayer){
            sGameData.mLoginLayer.showGetPwd(false);
        }
    },
    clickGetPwd:function(){
        log("clickGetPwd--")
        playClickSound();

        var phonenum = this.mEditBox_num.getString();
        if(phonenum!=null&& phonenum.length >=6){
            log("start get pwd")
            if(!sGameData.mIsSendingData) {
                sGameData.mIsSendingData = true
                sGameData.mGameNet.sendRetrievePassword(1,phonenum);
            }
        }else{
            showLittleNotice(sResWord.w_bind_tip_no_num);
        }

    },



    checkState:function(){
        var now = (new Date()).getTime();


        var delaytime = sGameData.mSMSDelayTime;

        if(now - sGameData.mGetVCodeTime <= delaytime*1000 && now - sGameData.mGetVCodeTime >= 0){
            this.mTimetiplabel.setVisible(true)
            var num = delaytime - Math.floor((now - sGameData.mGetVCodeTime)/1000)
            var timestr = num+sResWord.w_getpwd_timetip_s2
            this.mTimetiplabel.setString(timestr)
        }else{
            this.mTimetiplabel.setVisible(false)
        }
    }







});

GetPwdPanel.create = function () {
    var sg = new GetPwdPanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
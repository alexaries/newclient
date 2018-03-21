var UserAgreementLayer = cc.Layer.extend({  //BaseGameLayer  cc.Layer

    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mUserAgreementLayer = this;
            sGameData.mCurrLayer = this;

            log("UserAgreementLayer start");


            var size = cc.director.getWinSize();
            var paneltopPosY =20;
            var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
            var size_panel_inner = cc.size(size.width*0.92,size_panel.height*0.85);
            var point_panel_close = cc.p(4,-4);//边线的高度
            var size_tab_size = cc.size(220,49);
            //var size_tab_size1 = cc.size(220,45);



            var bgimg = createSysPanel(size_panel);
            bgimg.setAnchorPoint(cc.p(0.5,1));
            bgimg.setPosition(cc.p(size.width/2,size.height- paneltopPosY));
            this.addChild(bgimg,1);
            this.setContentSize(bgimg.getContentSize());
            var csize = this.getContentSize();

            var innerimg = createSysPanel_blue(size_panel_inner);
            innerimg.setAnchorPoint(cc.p(0.5,1));
            innerimg.setPosition(cc.p(size.width/2,size.height- paneltopPosY-csize.height*0.035-25));
            this.addChild(innerimg,2);


            //添加按钮 关闭
            var closeSprite = cc.Sprite.create("#g_close_btn.png");
            var closeSprite1 = cc.Sprite.create("#g_close_btn.png");
            closeSprite1.setColor(cc.color(200, 200, 200));
            var closeSprite2 = cc.Sprite.create("#g_close_btn.png");
            var closeItem = cc.MenuItemSprite.create(
                closeSprite,
                closeSprite1,
                closeSprite2,
                this.gotoClose,this);
            closeItem.attr({
                x:size.width/2+csize.width/2-8,
                y:size.height- paneltopPosY-6,
                anchorX:1,
                anchorY:1
            });

            var menu = cc.Menu.create(closeItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 5);

            var vsize = cc.size(size_panel_inner.width-10,size_panel_inner.height-10)
            var scrollview = cc.ScrollView.create(vsize);
            var layer = cc.Layer.create();

            //提示
            this.mMsg = sResWord.w_useragreement_content;
            var pMsgLabel = cc.LabelTTF.create(this.mMsg,sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(size_panel_inner.width-10,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_LEFT,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐

            pMsgLabel.setTag(8002);
            pMsgLabel.setAnchorPoint(cc.p(0,1));
            layer.addChild(pMsgLabel,1);
            this.mMsgLabel = pMsgLabel;

            var scsize = pMsgLabel.getContentSize();
            pMsgLabel.setPosition(cc.p(0,scsize.height));
            layer.setContentSize(scsize);
            scrollview.setContentSize(scsize);
            scrollview.setViewSize(vsize);
            scrollview.setContainer(layer);
            scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            scrollview.setDelegate(this);
            scrollview.setPosition(cc.p(size.width*0.04+5,size.height- paneltopPosY-csize.height*0.035-size_panel_inner.height+5-25));

            this.addChild(scrollview,8);
            scrollview.setTag(7888)
            this.mScrollView = scrollview
            if(scsize.height > vsize.height){
                scrollview.setContentOffset(cc.p(0,vsize.height-scsize.height));
            }else{
                scrollview.setContentOffset(cc.p(0,vsize.height-scsize.height));
            }



            bRet = true;
        }
        return bRet;
    },


    gotoClose:function(){
        log("gotoClose")
        playClickSound();
        this.gotoReg();
    },
    gotoReg:function(){
        log("gotoReg")
        if(sGameData.mCurrLayer!=sGameData.mRegLayer){
            sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
            var thelayer = RegLayer.create();
            if(thelayer){
                sGameData.mCurrScene.addChild(thelayer,1);
            }
        }
    }


});

UserAgreementLayer.create = function () {
    var sg = new UserAgreementLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
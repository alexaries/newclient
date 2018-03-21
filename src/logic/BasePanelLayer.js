/**
 * Created by apple on 15-12-16.
 */
var BasePanelLayer = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mTitle:"",
    mTopShowType:0,//0 显示title； 1显示tab（title） ；2子界面自己显示
    mBottomShowType:0,//0显示半透明背景； 1显示(bar,content) 2单panel 3大小panel
    mBottonBarSize:cc.size(0,0),
    mPanelInnerSize:cc.size(0,0),
    mSoftcashshow:null,
    mHardcashshow:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            var size = cc.director.getWinSize();

            bRet = true;
        }
        return bRet;
    },

    showBaseView:function(){

        var size = cc.director.getWinSize();

        var tsize = cc.size(size.width,98);

        if(this.mTopShowType < 10){
            var topbg = createPanel(tsize,"panel_top_bg.png");
            //cc.Sprite.create("#panel_top_bg.png");
            topbg.setPosition(cc.p(size.width *0.5, size.height-46));
            //topbg.setScaleX(size.width/179);
            this.addChild(topbg,1);

            if(this.mBottomShowType != 1) {
                var colorlayer = cc.LayerColor.create(cc.color(0, 0, 0, 80))
                colorlayer.setPosition(cc.p(0, -92));
                this.addChild(colorlayer);
            }
        }else{

            if(this.mBottomShowType != 1) {
                var colorlayer = cc.LayerColor.create(cc.color(0, 0, 0, 60))
                colorlayer.setPosition(cc.p(0, 0));
                this.addChild(colorlayer);
            }

            var bsize_top = cc.size(size.width-40,90);

            var topbg = cc.Scale9Sprite.create();
            topbg.initWithSpriteFrameName("main_top_bg.png")
            topbg.setContentSize(bsize_top);

            topbg.attr({
                x: size.width/2,
                y: size.height+1,
                anchorX:0.5,
                anchorY:1
            });
            this.addChild(topbg);


        }


        if(this.mTopShowType == 0){
            var toptitle = ButtonSpriteWithWordInner("#panel_title.png",this.mTitle,cc.p(0.5,0.5),32,0);
            toptitle.setPosition(cc.p(size.width *0.5,size.height));
            toptitle.setAnchorPoint(cc.p(0.5,1));
            this.addChild(toptitle,5);
        }

        if(this.mTopShowType == 1) {
            var tabtitle = ButtonSpriteWithWordInner("#panel_tab.png", this.mTitle, cc.p(0.5, 0.6), 32, 0);
            tabtitle.setPosition(cc.p(size.width - 120, size.height));
            tabtitle.setAnchorPoint(cc.p(0.5, 1));
            this.addChild(tabtitle, 5);
        }

        if(this.mBottomShowType == 1){
            this.createBottomBG1();
        }else if(this.mBottomShowType == 2){
            this.createBottomBG2();
        }else if(this.mBottomShowType == 3){
            this.createBottomBG3();
        }

        //this.showCash();

        //添加按钮 关闭
        var closeSprite = cc.Sprite.create("#main_back.png");
        var closeSprite1 = cc.Sprite.create("#main_back.png");
        closeSprite1.setColor(cc.color(200, 200, 200));
        var closeSprite2 = cc.Sprite.create("#main_back.png");
        var closeItem = cc.MenuItemSprite.create(
            closeSprite,
            closeSprite1,
            closeSprite2,
            this.gotoClose,this);
        closeItem.attr({
            x:70,
            y:size.height- 45,
            anchorX:0.5,
            anchorY:0.5
        });

        var menu = cc.Menu.create(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 5);

    },

    createBottomBG1:function(){
        var size = cc.director.getWinSize();
        var barsize = this.mBottonBarSize;
        var barbg = cc.Sprite.create(res.hall_list_bg_png, cc.rect(0, 0, barsize.width, barsize.height));
        if (barbg) {
            spriteTileRepeat(barbg);
            barbg.setContentSize(barsize);
            barbg.setAnchorPoint(cc.p(0.5,1));
            barbg.setPosition(cc.p(size.width * 0.5, size.height-92));
            this.addChild(barbg, 1);
        }

        var yinyingsize = cc.size(size.width,8);
        var yinyingbg = cc.Sprite.create(res.yinying_pot_png, cc.rect(0, 0, yinyingsize.width, yinyingsize.height));
        if (yinyingbg) {
            spriteTileRepeat(yinyingbg);
            yinyingbg.setContentSize(barsize);
            yinyingbg.setAnchorPoint(cc.p(0.5,1));
            yinyingbg.setPosition(cc.p(size.width * 0.5, size.height-92));
            this.addChild(yinyingbg, 2);
        }

        var bottomsize = cc.size(size.width,size.height-92-this.mBottonBarSize.height);
        var bottombg = cc.Sprite.create(res.hall_list_bg_png, cc.rect(0, 0, bottomsize.width, bottomsize.height));
        if (bottombg) {
            spriteTileRepeat(bottombg);
            bottombg.setContentSize(barsize);
            bottombg.setAnchorPoint(cc.p(0.5,0));
            bottombg.setPosition(cc.p(size.width * 0.5, 0));
            this.addChild(bottombg, 0);
            bottombg.setOpacity(220);
        }
        var gezisize = cc.size(size.width,25);
        var gezi1Sprite = createPanel(gezisize,"shop_gezibg.png");//createSysPanel
        gezi1Sprite.setAnchorPoint(cc.p(0.5,0));
        gezi1Sprite.setPosition(cc.p(size.width * 0.5, 50));
        this.addChild(gezi1Sprite,1);

        var gezi2Sprite = createPanel(gezisize,"shop_gezibg.png");//createSysPanel
        gezi2Sprite.setAnchorPoint(cc.p(0.5,0));
        gezi2Sprite.setPosition(cc.p(size.width * 0.5, 270));
        this.addChild(gezi2Sprite,1);

    },

    createBottomBG2:function(){
        var size = cc.director.getWinSize();
        var bgsize = cc.size(size.width-20,size.height-92-20);

        var bgSprite = createSysPanel_t1(bgsize);//createSysPanel
        bgSprite.setAnchorPoint(cc.p(0.5,0));
        bgSprite.setPosition(cc.p(size.width * 0.5, 10));
        this.addChild(bgSprite,1);


    },

    createBottomBG3:function(){
        var size = cc.director.getWinSize();
        var bgsize = cc.size(size.width-20,size.height-92-20);

        var bgSprite = createSysPanel_t1(bgsize);
        bgSprite.setAnchorPoint(cc.p(0.5,0));
        bgSprite.setPosition(cc.p(size.width * 0.5, 10));
        this.addChild(bgSprite,1);

        var bgsize1 = this.mPanelInnerSize;
        var bgSprite1 = createSysPanel_t3(bgsize1);
        bgSprite1.setPosition(cc.p(size.width * 0.5-1, size.height-97 -17));
        bgSprite1.setAnchorPoint(cc.p(0.5,1));
        this.addChild(bgSprite1,1);

    },

    showCash:function(){
        var size = cc.director.getWinSize();
        var scashimg = cc.Sprite.create("#softcash_1.png")
        scashimg.setAnchorPoint(cc.p(0,0.5));
        //scashimg.setScale(0.45);
        scashimg.setPosition(cc.p(160,size.height - 45))
        this.addChild(scashimg,4);

        var softcashshow = ShowNum.create();
        softcashshow.setPosition(cc.p(205,size.height - 45))
        softcashshow.setScale(0.8)
        this.addChild(softcashshow,4);
        softcashshow.setValue(2,formatcash(sGameData.mUser.softCash),1,1);
        this.mSoftcashshow = softcashshow


        //var hcashimg = cc.Sprite.create("#hardcash_1.png")
        //hcashimg.setAnchorPoint(cc.p(0,0.5));
        //hcashimg.setPosition(cc.p(160,size.height - 65))
        //this.addChild(hcashimg,4);
        //
        //var hardcashshow = ShowNum.create();
        //hardcashshow.setPosition(cc.p(205,size.height - 65))
        //hardcashshow.setScale(0.8)
        //this.addChild(hardcashshow,4);
        //hardcashshow.setValue(3,sGameData.mUser.hardCash,1,1);
        //this.mHardcashshow = hardcashshow
    },


    gotoClose:function(){
        log("gotoClose")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        if(sGameData.mUILayer){
            sGameData.mUILayer.gotoMain();
        }
    }


});

BasePanelLayer.create = function () {
    var sg = new BasePanelLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
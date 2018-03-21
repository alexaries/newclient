/**
 * Created by Administrator on 14-4-24.
 */

var ShowWebViewFullScreen = cc.Layer.extend({

    _listener:null,
    mType:0,//
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,130))

            this.addChild(colorlayer);

            var bar_notice = cc.size(winsize.width+60,60);


            var topbg = createPanel(bar_notice,"panel_di_bg.png")
                //cc.Sprite.create(res.game_bg_pot_png,cc.rect(0,0,winsize.width,60));
            topbg.setPosition(cc.p(winsize.width/2,winsize.height-30));
            this.addChild(topbg,1);



            //提示
            this.mName = sResWord.w_help;
            var pNameLabel = cc.LabelTTF.create(this.mName,sGameData.mFontname, 28,//字体  ，字体大小
                cc.size(430,35),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pNameLabel.setPosition(cc.p(winsize.width/2,winsize.height-30));
            pNameLabel.setTag(8001);
            this.addChild(pNameLabel,2);





            ///添加按钮 关闭
            var closeSprite = cc.Sprite.create("#ui_panel_close.png");
            var closeSprite1 = cc.Sprite.create("#ui_panel_close.png");
            closeSprite1.setColor(cc.color(200, 200, 200));
            var closeSprite2 = cc.Sprite.create("#ui_panel_close.png");
            var closeItem = cc.MenuItemSprite.create(
                closeSprite,
                closeSprite1,
                closeSprite2,
                this.clickClose,this);
            closeItem.attr({
                x:winsize.width,
                y:winsize.height-8,
                anchorX:1,
                anchorY:1
            });
            closeItem.setScale(0.92);

            var menu = cc.Menu.create(closeItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);
            //this.setClickSwallows();
            //xxx
            bRet = true;
        }
        return bRet;
    },
    onEnter:function(){
        this._super();
        log("on enter notice")

    },
    onExit:function(){

        this._super();
        log("on exit notice")
    },
    removeListeners:function(){
        //cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListeners(this);
    },

    //吞噬点击 不让传到别的层
    setClickSwallows:function(){

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(listener, this);
        this._listener = listener;

    },

    ////showtype  1帮助 2客服
    showWebView:function(type,data){
        this.mType = type
        sGameData.mIsShowWebViewing = true;

        this.setClickSwallows();

        var uid = "";
        var uname = "";
        if(sGameData.mUser){
            uid = sGameData.mUser.id;
            uname = sGameData.mUser.userName;
        }
        var namelabel = this.getChildByTag(8001);
        if(namelabel){
            if(type == 1){
                namelabel.setString(sResWord.w_help);
            }else if(type == 2){
                namelabel.setString(sResWord.w_contactkefu);
            }else if(type == 88){
                namelabel.setString(sResWord.w_pay_tip);
            }else if(type == 89){
                namelabel.setString(sResWord.w_saoma_pay_tip);
            }
        }

        var url = "";
        if(type == 1){
            url = sGameData.mHelpUrl+"?random="+Math.random();
        }else if(type == 2){
            url = "http://kf.shancr.com/getkf.php?cid=test"
            var turl = getGameSysConfig("kf_url")
            if(turl&&turl.length > 0){
                url = turl;
            }
        }else if(type == 88){
            var h5payurl = "http://qppay.1000gk.com/wap/pay.go"
            url = h5payurl+"?userId="+data.userId+"&payType="+data.payType+"&amount="+data.payAmount+"&random="+Math.random();
            if(data.payType == "qqh5") {
                CallCpp.doSomeString(6, url, "", "", "", "");
                return;
            }
        }else if(type == 89){
            var cardpayurl = "http://www.521dz.com";
            //url = cardpayurl+"?id="+data.userId;
            url = cardpayurl;
        }

        if (cc.sys.isNative) {
            CallCpp.doSomeString(4, url, "5", "", "", "");
        }else{
            //window.open(url,"help","width=700,height=400,directories");
        }
    },

    onExit:function(){
        log("pay url exit")
        this._super();
        this.removeListeners();
        CallCpp.doSomeString(5, "", "", "", "", "");
    },

    clickClose:function(){
        log("clickOK--")
        playClickSound();
        this.setVisible(false);

        sGameData.mIsShowWebViewing = false;

        this.removeListeners();

        CallCpp.doSomeString(5, "", "", "", "", "");
        sGameData.mIsShowNoticeing = false;

        if(this.mType == 88){
            sGameData.mGameNet.sendReqUserInfo();
        }

    }



});
ShowWebViewFullScreen.create = function () {
    var sg = new ShowWebViewFullScreen();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

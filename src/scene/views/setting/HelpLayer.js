/**
 * Created by Administrator on 14-4-23.
 */
var HelpLayer = BasePanelLayer.extend({  //BaseGameLayer  cc.Layer

    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mHelpLayer = this;
            sGameData.mCurrLayer = this;

            log("HelpLayer start");

            sGameData.mUILayer.showView(1);

            var size = cc.director.getWinSize();
            var paneltopPosY = 150;
            var size_panel = cc.size(size.width*0.96,(size.height - paneltopPosY)*0.97);
            var size_panel_inner = cc.size(size.width*0.92,size_panel.height*0.85);
            var point_panel_close = cc.p(4,-4);//边线的高度
            var size_tab_size = cc.size(300,49);


            log("size_panel_inner=="+size_panel_inner.width+"|"+size_panel_inner.height);


            this.mTitle = sResWord.w_help;
            this.mBottonBarSize = cc.size(size.width,60);
            this.mPanelInnerSize = cc.size(size.width-40,300);
            this.mTopShowType = 1; //0 显示title 1显示tab（title） 2子界面自己显示
            this.mBottomShowType = 2; //0显示半透明背景； 1显示(bar,content) 2单panel 3大小panel
            this.showBaseView();

            this.scheduleOnce(this.initInSecondFrame,0.05);

            bRet = true;
        }
        return bRet;
    },

    initInSecondFrame:function(){
        if(cc.sys.isNative) { 
            var url = sGameData.mHelpUrl+"?random="+Math.random();
            CallCpp.doSomeString(4, url, "1", "", "", "");
        }
    },

    onExit:function(){
        log("help scene exit")
        this._super();
        CallCpp.doSomeString(5, "", "", "", "", "");
    },

    gotoClose:function(){
        log("gotoClose")
        playClickSound();

        CallCpp.doSomeString(5, "", "", "", "", "");

        if(sGameData.mUILayer){
            sGameData.mUILayer.gotoMain();
        }

    }


});

HelpLayer.create = function () {
    var sg = new HelpLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
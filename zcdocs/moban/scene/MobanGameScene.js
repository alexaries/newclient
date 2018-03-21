

var MobanGameScene = BaseScene.extend({

    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mMobanGameScene = this;
            sGameData.mCurrScene = this;

            cc.log("start show MobanGameScene");


            var plistpicres = concatArray([g_loadplist_all1,g_loadplist_moban]);
            var plistanimress = concatArray([]);
            var ccsanimress = concatArray([]);
            var plistmanyanimresed = concatArray([]);
            this.startLoadRes(plistpicres,plistanimress,ccsanimress,plistmanyanimresed)

            bRet = true;
        }
        return bRet;
    },
    showView:function(){
        this.cleanLoadView();
        var size = cc.director.getWinSize();

        var colorlayer = cc.LayerColor.create(cc.color(111,170,26,255))
        this.addChild(colorlayer);
//        //显示背景
//        var bgsprite = cc.Sprite.create("#game_bg_vip.png");
//        bgsprite.attr({
//            x: size.width / 2,
//            y: size.height / 2
//        });
//        this.addChild(bgsprite, 0);

        //显示 层
        var aGameLayer = MobanLayer.create();
        this.addChild(aGameLayer,1);

        this.schedule(this.update,0.05);

    },
    onExit:function(){
        this._super();
        sGameData.mMobanGameScene = null;
        removeSpriteChangeScene();
        SoundManager.stopBGMusic();
        SoundManager.cleanAllSound();
    },
    update:function(){
        this._super();
    },
    updateOnLoadDataInGame:function(netdata){
        var command = netdata[0];
        switch (command){
            case S_DZPK_OPERATE:
                break;
            default:
                cc.log("unknown command="+command);
                break;
        }
    }

});

MobanGameScene.create = function () {
    var sg = new MobanGameScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

MobanGameScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = MobanGameScene.create();
    scene.addChild(layer);
    return scene;
};


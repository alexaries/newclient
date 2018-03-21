
var MobanLayer = cc.Layer.extend({  //BaseGameLayer  cc.Layer

    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mMobanLayer = this;
            sGameData.mCurrLayer = this;
            cc.log("MobanLayer start");

            //this.mSitDownNoWait = false;//是否直接坐下
            //this.MAX_PLAYERNUM = 3;// 设置游戏的最大玩家数

            var size = cc.director.getWinSize();

            // add a "close" icon to exit the progress. it's an autorelease object
            var closeItem = cc.MenuItemImage.create(
                res.CloseNormal_png,
                res.CloseSelected_png,
                function () {
                    cc.director.runScene(new MainScene.scene());
                }, this);
            closeItem.attr({
                x: size.width - 20,
                y: 20,
                anchorX: 0.5,
                anchorY: 0.5
            });
            var menu = cc.Menu.create(closeItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);


            var helloLabel = cc.LabelTTF.create("game ddz", "Arial", 38);
            helloLabel.x = size.width / 2;
            helloLabel.y = size.height - 100;
            this.addChild(helloLabel, 5);


            this.initGameData();

            bRet = true;
        }
        return bRet;
    },

    //初始化游戏数据
    initGameData:function(){

    },
    onExit:function(){
        this._super();
        sGameData.mMobanLayer = null;
    }

   

});

MobanLayer.create = function () {
    var sg = new MobanLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
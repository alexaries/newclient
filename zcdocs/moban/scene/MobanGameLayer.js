
var MobanGameLayer = BaseGameLayer.extend({  //BaseGameLayer  cc.Layer

    CARD_SPACE:20,//牌的距离
    self :null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mMobanGameLayer = this;
            sGameData.mCurrLayer = this;
            cc.log("MobanGameLayer start");

            this.mSitDownNoWait = true;//是否直接坐下
            this.MAX_PLAYERNUM = 9;// 设置游戏的最大玩家数


            self =this;
            bRet = true;
        }
        return bRet;
    },
    onEnter:function(){
        this._super();
        this.scheduleOnce(this.initInSecondFrame,0.05);
    },
    initInSecondFrame:function(){
        var size = cc.director.getWinSize();

        this.mOPBtnSize = cc.size(120,50);

        var helloLabel = cc.LabelTTF.create("game fruit", "Arial", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height - 100;
        this.addChild(helloLabel, 5);

        var gameui = MobanGameUI.create();
        this.addChild(gameui,55);
        this.mGameUI = gameui;

        this.initButtons();

        dealClickTouch(this);
        this.initGameData();
        this.mHasInitView = true;
    },

    //初始化游戏数据
    initGameData:function(){

    },
    initButtons:function(){
        var size = cc.director.getWinSize();
        if(sGameData.mIsTestNoNet){
            //btntag,x,y,img,overimg,disimg ,word,func,point,fontsize
            var testBtnData = [[0,size.width -10,size.height - 250,res.button2_png,res.button2_1_png,res.button2_png,"test1",this.op_t_test1,cc.p(0.5,0.5),24],
                [0,size.width -10,size.height - 300,res.button2_png,res.button2_1_png,res.button2_png,"test2",this.op_t_test2,cc.p(0.5,0.5),24],
                [0,size.width -10,size.height - 350,res.button2_png,res.button2_1_png,res.button2_png,"test3",this.op_t_test3,cc.p(0.5,0.5),24],
                [0,size.width -10,size.height - 400,res.button2_png,res.button2_1_png,res.button2_png,"test4",this.op_t_test4,cc.p(0.5,0.5),24]
            ];
            this.createWordBtnMenu(testBtnData,this);
        }
    },
    reInitDataUI:function(){
        cc.log("test");
    },
    initTables:function(){

    },
    onExit:function(){
        this._super();
        sGameData.mMobanGameLayer = null;
    },
    op_t_test1:function(){

    },
    op_t_test2:function(){

    },
    op_t_test3:function(){

    },
    op_t_test4:function(){

    },

    onTouchBegan_g:function(pos){
        //cc.log("onTouchBegan--")

    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //cc.log("onTouchEnded--")

    }



});

MobanGameLayer.create = function () {
    var sg = new MobanGameLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
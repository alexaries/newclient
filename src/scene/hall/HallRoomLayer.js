/**
 * Created by apple on 14-8-14.
 * 游戏房间大厅（显示某游戏的所有房间）
 */
var HallRoomLayer = cc.Layer.extend({  //BaseGameLayer  cc.Layer
    mHasDrag: false,//是否已经拖动
    mMainHallRoomView:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mHallRoomLayer = this;
            sGameData.mCurrLayer = this;
            log("HallRoomLayer start");

            if(sGameData.mUILayer){
                sGameData.mUILayer.setVisible(false);
            }

            //this.mSitDownNoWait = false;//是否直接坐下
            //this.MAX_PLAYERNUM = 3;// 设置游戏的最大玩家数
            var size = cc.director.getWinSize();
            var twidth = (size.width - 960)*0.4

            var point_hall_back = cc.p( 80,size.height-45);
            log("---")

            //var bgimg = cc.Sprite.create("#hall_room_bg.png")
            //bgimg.setPosition(cc.p(size.width / 2,size.height / 2))
            //this.addChild(bgimg);

//            var titleimg = cc.Sprite.create("#hall_ddz_title.png")
//            titleimg.setPosition(cc.p(size.width / 2,size.height*0.7))
//            this.addChild(titleimg);

            var cashbg1img = cc.Sprite.create("#main_cash_bg.png")
            cashbg1img.setAnchorPoint(cc.p(0,0.5));
            cashbg1img.setPosition(cc.p(size.width*0.03+130,size.height-45))
            this.addChild(cashbg1img);
            //var cashbg2img = cc.Sprite.create("#hall_ddz_goldKuang.png")
            //cashbg2img.setAnchorPoint(cc.p(0,1));
            //cashbg2img.setPosition(cc.p(size.width*0.03+130,size.height*0.97-40))
            //this.addChild(cashbg2img);
            var scashimg = cc.Sprite.create("#softcash_1.png")
            scashimg.setAnchorPoint(cc.p(0,0.5));
            //scashimg.setScale(0.45);
            scashimg.setPosition(cc.p(size.width*0.03+2+130,size.height-45))
            this.addChild(scashimg);
            //var hcashimg = cc.Sprite.create("#hardcash_1.png")
            //hcashimg.setAnchorPoint(cc.p(0,1));
            ////hcashimg.setScale(0.45);
            //hcashimg.setPosition(cc.p(size.width*0.03+2+130,size.height*0.97-3-40+6))
            //this.addChild(hcashimg);

            var softcashshow = ShowNum.create();
            softcashshow.setPosition(cc.p(size.width*0.03+2+45+130,size.height-45))
            softcashshow.setAnchorPoint(cc.p(0,0.5));
            softcashshow.setScale(0.8)
            this.addChild(softcashshow,1);
            softcashshow.setValue(2,formatcash(sGameData.mUser.softCash),1,1);

            //var hardcashshow = ShowNum.create();
            //hardcashshow.setPosition(cc.p(size.width*0.03+2+130+45,size.height*0.97-3-15-40+6))
            //hardcashshow.setScale(0.8)
            //this.addChild(hardcashshow,1);
            //hardcashshow.setValue(2,sGameData.mUser.hardCash,1,1);




            var btnsize = cc.size(190,60)
            var backSprite = cc.Sprite.create("#main_back.png")
            var backSprite1 = cc.Sprite.create("#main_back.png")
            backSprite1.setColor(cc.color(200,200,200));
            var backSprite2 = cc.Sprite.create("#main_back.png")
            var backItem = cc.MenuItemSprite.create(
                backSprite,
                backSprite1,
                backSprite2,
                this.click_back,this);
            //backItem.setAnchorPoint(cc.p(1,1));
            backItem.setPosition(point_hall_back);

            //var infoSprite = cc.Sprite.create(res.btn_info_png)
            //var infoSprite1 = cc.Sprite.create(res.btn_info_png)
            //infoSprite1.setColor(cc.color(200,200,200));
            //var infoSprite2 = cc.Sprite.create(res.btn_info_png)
            //var infoItem = cc.MenuItemSprite.create(
            //    infoSprite,
            //    infoSprite1,
            //    infoSprite2,
            //    this.click_info,this);
            ////backItem.setAnchorPoint(cc.p(1,1));
            //infoItem.setPosition(cc.p(size.width-80,size.height*0.93-7));
            //if(!sGameData.mAppRoomShowInfoBtn){
            //    infoItem.setVisible(false);
            //}
            //infoItem.setVisible(false);

            var menu = cc.Menu.create(backItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);

            this.scheduleOnce(this.initInSecondFrame,0.05);

            this.initGameData();

            bRet = true;
        }
        return bRet;
    },
    //第2帧初始化
    initInSecondFrame:function(){
        dealClickTouch(this);
        this.initScene();
    },
    //退出时执行
    onExit:function(){
        this._super();
        this.removeListeners();
        sGameData.mHallRoomLayer = null;
    },
    //移出监听
    removeListeners:function(){
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }else if ('mouse' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }
    },
    //初始化游戏数据
    initGameData:function(){

    },
    //初始化场景显示
    initScene:function(){



        var size = cc.director.getWinSize();

        var msg = getGameName(sGameData.mCurrGameType);

        var tipLabel = cc.LabelTTF.create(msg+sResWord.w_hall,sGameData.mFontname, 32,//字体  ，字体大小
            cc.size(500,40),  //设置文本的宽高
            cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
        tipLabel.setPosition(cc.p(size.width/2,size.height-45));
        this.addChild(tipLabel);
        //tipLabel.setColor(cc.color(200,200,200));
        tipLabel.enableStroke(cc.color(0,0,0), 1);

        var hallroomview = MainHallRoomView.create();
        this.addChild(hallroomview);
        this.mMainHallRoomView = hallroomview;
        hallroomview.startShowHallRoom();

    },
    click_info:function(){
        log("click_info--")
        playClickSound();
        showWebviewFullScreen(1);
    },
    //点击返回到主界面
    click_back:function(){
        log("click_back--")
        playClickSound();
        gotoShowViewForMain();
    },
    //滚动视图接口
    scrollViewDidScroll:function (view) {
        //log("aaa===")
    },
    scrollViewDidZoom:function (view) {
    },
    //点击开始
    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")
        if(!checkButtonEnable()){
            return;
        }
        var size = cc.director.getWinSize();
        this.mHasDrag = false;
        sGameData.mClickState = 1;
        if(pos.y > size.height/2-225 && pos.y < size.height/2+225){
            this.mHasDrag = true;
            this.mMainHallRoomView.onTouchBegan_g(pos);
        }
    },
    //点击移动
    onTouchMoved_g:function(pos){
        if(!checkButtonEnable()){
            return;
        }

    },
    //点击结束
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")
        if(!checkButtonEnable()){
            return;
        }
        this.mMainHallRoomView.onTouchEnded_g(pos);
        this.mHasDrag = false;
    },
    onTouchCancelled_g:function(pos){
        //log("onTouchCancelled--")
    }

});

HallRoomLayer.create = function () {
    var sg = new HallRoomLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
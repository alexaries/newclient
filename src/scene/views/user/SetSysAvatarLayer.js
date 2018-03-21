/**
 * Created by Administrator on 14-6-11.
 * 设置系统头像
 */
var SetSysAvatarLayer = BasePlayerInfoLayer.extend({  //BaseGameLayer  cc.Layer
    mItemShows:[],//头像集合
    mChooseItem:null,//选中的头像
    init:function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mSetSysAvatarLayer = this;
            sGameData.mCurrLayer = this;

            log("SetSysAvatarLayer start");



            var size = cc.director.getWinSize();

            var csize = cc.size(size.width-20,size.height-92-20);

            var titleSprite = cc.Sprite.create("#w_title_usercenter.png");
            this.addChild(titleSprite,3);
            titleSprite.setPosition(cc.p(size.width/2,size.height-45));


            bRet = true;
        }
        return bRet;
    },
    //退出时执行
    onExit:function(){
        this._super();
        this.removeListeners();
        sGameData.mSetSysAvatarLayer = null;
    },
    showRightInfo:function(){
        var size = cc.director.getWinSize();
        var csize = cc.size(500,417);

        var rpanelsize = cc.size(480,417);
        var panelbg = cc.Sprite.create("#user_right_bg.png");
        this.mPanelNode.addChild(panelbg);
        panelbg.setPosition(cc.p(180,0));

        var rightbasenode = cc.Node.create();
        this.mPanelNode.addChild(rightbasenode,5);
        rightbasenode.setPosition(cc.p(210,0));
        this.mRightBaseNode = rightbasenode

        var oksprite = cc.Sprite.create("#btn_u_queren.png");
        var oksprite1 = cc.Sprite.create("#btn_u_queren.png");
        oksprite1.setColor(cc.color(200,200,200));
        var oksprite2 = cc.Sprite.create("#btn_u_queren.png");
        var okItem = cc.MenuItemSprite.create(
            oksprite,
            oksprite1,
            oksprite2,
            this.clickToSubmit,this);
        okItem.setPosition(cc.p(-30,0-csize.height*0.4));


        var menu = cc.Menu.create(okItem);
        menu.x = 0;
        menu.y = 0;
        rightbasenode.addChild(menu, 3);



        this.mItemShows = [];
        for(var i = 0;i<4;i++){
            var itemAvatar = ItemAvatar.create(1,i)
            itemAvatar.setPosition(cc.p(-205+i*120,90))
            itemAvatar.setScale(0.8)
            rightbasenode.addChild(itemAvatar,5);
            if(i==0){
                itemAvatar.choose()
                this.mChooseItem = itemAvatar;
            }
            this.mItemShows.push(itemAvatar)
        }
        for(var i = 0;i<4;i++){
            var itemAvatar = ItemAvatar.create(0,i)
            itemAvatar.setPosition(cc.p(-205+i*120,-60))
            itemAvatar.setScale(0.8)
            rightbasenode.addChild(itemAvatar,5);
            this.mItemShows.push(itemAvatar)
        }
    },

    //点击提交到服务器
    clickToSubmit:function(){
        log("clickToSubmit")
        playClickSound();
        var sex = this.mChooseItem.mSex;
        var index = this.mChooseItem.mIndex;
        log("sex=="+sex+"="+index)
        var picname = "";
        if(sex == 1){
            picname = "f_"+(index+1)+".png"
        }else{
            picname = "m_"+(index+1)+".png"
        }
        sGameData.mGameNet.sendChangeUserInfo(2,picname);
        this.gotoClose();
    },
    //关闭
    gotoClose:function(){
        log("gotoClose")
        playClickSound();
        this.stopAllActions();
        var callback = cc.CallFunc.create(this.gotoPlayerInfo, this);
        var seq =cc.Sequence.create(cc.DelayTime.create(0.05),callback);
        this.runAction(seq);
       // this.gotoPlayerInfo();
    },
    //跳转到用户信息
    gotoPlayerInfo:function(){
        gotoShowViewForPlayerInfo();
    },
    //移出监听
    removeListeners:function(){
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }else if ('mouse' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }
    },
    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")

    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")
        var item = this.checkClickAvatar(pos)
        if(item){
            this.clickAvatar(item);
        }
    },

    //检测点击的头像
    checkClickAvatar:function(pos){
        //触摸点坐标
        var size = cc.director.getWinSize();
        var p = pos;
        var tp = cc.p(p.x-size.width/2-210, p.y-size.height/2+50);
        for(var i=0;i<this.mItemShows.length;i++){
            var item = this.mItemShows[i]
            if(item.checkClick(tp)){
                return item;
            }
        }
        return null;
    },
    //点击头像
    clickAvatar:function(item){
        log("clickAvatar---")
        playClickSound();
        if(this.mChooseItem){
            this.mChooseItem.unchoose();
        }
        item.choose();
        this.mChooseItem = item;
    }


});

SetSysAvatarLayer.create = function () {
    var sg = new SetSysAvatarLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
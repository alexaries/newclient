/**
 * Created by Administrator on 14-5-29.
 * 玩家信息
 */
var BasePlayerInfoLayer = BasePanelLayer.extend({  //BaseGameLayer  cc.Layer
    mUserHead:null,//头像
    mEditBox_nickname:null,// 昵称输入框
    mSexItem:null,//性别选择按钮
    mLeftBaseNode:null,
    mRightBaseNode:null,
    mPlayerInfoPanel:null,
    mBagPropsPanel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            //log("BasePlayerInfoLayer start");


            sGameData.mUILayer.showView(1);

            var size = cc.director.getWinSize();

            this.mTitle = sResWord.w_playerinfo;
            this.mBottonBarSize = cc.size(size.width,60);
            this.mPanelInnerSize = cc.size(size.width-20-20,size.height-92-46);
            this.mTopShowType = 10; //0 显示title 1显示tab（title） 2子界面自己显示
            this.mBottomShowType = 4; //0显示半透明背景； 1显示(bar,content) 2单panel 3大小panel
            this.showBaseView();
            var csize = cc.size(size.width-20,size.height-92-20);



            var panelnode = cc.Node.create();
            this.addChild(panelnode,5);
            panelnode.setPosition(cc.p(size.width/2,size.height/2-50));
            this.mPanelNode = panelnode;


            //添加按钮 tab1
            var tabsize = cc.size(170,45);
            var tcolor = cc.color(255,243,227);
            var t1color = cc.color(200,200,200);
            var changebankpwdSprite = createWordBtn(tabsize,sResWord.w_user_changebankpwd,cc.p(0.5,0.5),20,tcolor)
            var changebankpwdSprite1 = createWordBtn(tabsize,sResWord.w_user_changebankpwd,cc.p(0.5,0.5),20,t1color)
            var changebankpwdSprite2 = createWordBtn(tabsize,sResWord.w_user_changebankpwd,cc.p(0.5,0.5),20,tcolor)
            var changebankpwdItem = cc.MenuItemSprite.create(
                changebankpwdSprite,
                changebankpwdSprite1,
                changebankpwdSprite2,
                this.clickChangebankpwd,this);
            changebankpwdItem.attr({
                x:-250,
                y:-130,
                anchorX:0.5,
                anchorY:0.5
            });

            var menu = cc.Menu.create(changebankpwdItem);
            menu.x = 0;
            menu.y = 0;
            this.mPanelNode.addChild(menu, 10);

            this.showLeftInfo();
            this.showRightInfo();

            this.scheduleOnce(this.initInSecondFrame,0.05);



            bRet = true;
        }
        return bRet;
    },

    showLeftInfo:function(){
        var size = cc.director.getWinSize();
        var csize = cc.size(size.width-20,size.height-92-20);

        var lpanelsize = cc.size(300,417);
        var leftbg = cc.Sprite.create("#user_left_bg.png");
        this.mPanelNode.addChild(leftbg,1);
        leftbg.setPosition(cc.p(-260,0));

        var leftbasenode = cc.Node.create();
        this.mPanelNode.addChild(leftbasenode,5);
        this.mLeftBaseNode = leftbasenode
        leftbasenode.setPosition(cc.p(-260,0));


        //var head = BaseCircleHead.create(75,1);
        //head.attr({
        //    x:0,
        //    y:60
        //});
        //leftbasenode.addChild(head,8);

        //
        var userhead = BaseUserHead.create(true);
        userhead.setPlayer(sGameData.mUser);
        userhead.setPosition(cc.p(0,60));
        leftbasenode.addChild(userhead,2);
        this.mUserHead = userhead;

        var pictiplabel = cc.LabelTTF.create(sResWord.w_pic_clickchange,sGameData.mFontname, 20);
        pictiplabel.setPosition(cc.p(0,-22+10));
        leftbasenode.addChild(pictiplabel,2);



        var cashbg1img = cc.Sprite.create("#main_cash_bg.png")
        cashbg1img.setAnchorPoint(cc.p(0,1));
        cashbg1img.setPosition(cc.p(-94,-42))
        leftbasenode.addChild(cashbg1img);

        var scashimg = cc.Sprite.create("#softcash_1.png")
        scashimg.setAnchorPoint(cc.p(0,1));
        //scashimg.setScale(0.45);
        scashimg.setPosition(cc.p(-84,-51))
        leftbasenode.addChild(scashimg);

        var softcashshow = ShowNum.create();
        softcashshow.attr({
            x:-42,
            y:-65,
            anchorX: 0,
            anchorY: 1
        });
        softcashshow.setScale(0.8)
        leftbasenode.addChild(softcashshow,1);
        softcashshow.setValue(2,formatcash(sGameData.mUser.softCash),1,1);


        var cashbg2img = cc.Sprite.create("#main_cash_bg.png")
        cashbg2img.setAnchorPoint(cc.p(0,0.5));
        cashbg2img.setPosition(cc.p(-94,-130))
        leftbasenode.addChild(cashbg2img);


        var ibankimg = cc.Sprite.create("#icon_bank_user.png")
        ibankimg.setAnchorPoint(cc.p(0,1));
        ibankimg.setScale(0.8);
        ibankimg.setPosition(cc.p(-84,-116))
        leftbasenode.addChild(ibankimg);



    },
    showRightInfo:function(){

        var csize = cc.size(500,417);

        var lpanelsize = cc.size(300,417);
        var leftbg = createSysPanel_munu(lpanelsize);
        this.mPanelNode.addChild(leftbg,1);
        leftbg.setPosition(cc.p(-240,0));

        var rightbasenode = cc.Node.create();
        this.mPanelNode.addChild(rightbasenode,5);
        rightbasenode.setPosition(cc.p(30,0));
        this.mRightBaseNode = rightbasenode


    },

    //第2帧初始化
    initInSecondFrame:function(){
        dealClickTouch(this);
    },
    //退出时执行
    onExit:function(){
        this._super();
        this.removeListeners();
        sGameData.mBasePlayerInfoLayer = null;
    },
    //移出监听
    removeListeners:function(){
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }else if ('mouse' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }
    },


    //关闭
    gotoClose:function(){
        log("gotoClose")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        if(sGameData.mUILayer){
            sGameData.mUILayer.gotoMain();
        }
    },


    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")

    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")
        if(this.checkClickAvatar(pos)){
            this.clickAvatar();
        }
    },

    //头像的范围
    avatarRect:function(){
        var size = cc.director.getWinSize();
        var csize = this.getContentSize();
        var x = size.width/2-250;
        var y = size.height/2+10;
        var width = 120;
        var height = 120;
        return cc.rect(x-width/2,y-height/2, width, height);
    },
    //检测是否点击头像
    checkClickAvatar:function(pos){
        var touched = false;
        //触摸点坐标
        var p = pos;
        var rect = this.avatarRect();
        if(cc.rectContainsPoint(rect,p)){       //判断鼠标拖拉的区域是否在位置上
            touched = true;
        }
        return touched;
    },
    //点击头像
    clickAvatar:function(){
        log("clickAvatar---")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        this.stopAllActions();
        var callback = cc.CallFunc.create(this.gotoSetAvatar, this);
        var seq =cc.Sequence.create(cc.DelayTime.create(0.05),callback);
        this.runAction(seq);
    },
    //跳转到设置头像
    gotoSetAvatar:function(){
        log("gotoSetAvatar--"+cc.sys.isNative+"="+cc.sys.os+cc.OS_IOS)
        var onlyusesys = true;
        if(cc.sys.isNative){
            if(cc.sys.os == cc.sys.OS_ANDROID){
                onlyusesys = false;
            }else if(cc.sys.os == cc.sys.OS_IOS){
                onlyusesys = false;
            }
        }
        //onlyusesys = false;
        //if(onlyusesys){
        //    this.gotoSetSysAvatar();
        //}else{
        //    //showLittleNotice("aaa")
        //    this.showNotice()
        //}

        this.gotoSetSysAvatar();
    },
    //跳转到设置系统头像
    gotoSetSysAvatar:function(){
        if(sGameData.mCurrLayer!=sGameData.mSetSysAvatarLayer){
            sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
            sGameData.mCurrLayer = null;
            var thelayer = SetSysAvatarLayer.create();
            if(thelayer){
                sGameData.mCurrScene.addChild(thelayer,1);
            }
        }
    },
    //设置头像提示（选择系统还是照片）
    showNotice:function(){
        log("showNotice---");
        var notice = (sGameData.mCurrScene.getChildByTag(VIEW_TAG_AVATARNOTICE));
        if(!notice){
            notice = SetAvatarNotice.create();
            var size = cc.director.getWinSize();
            notice.setPosition(cc.p(size.width*0.5,size.height*0.5));
            sGameData.mCurrScene.addChild(notice,88,VIEW_TAG_AVATARNOTICE);
        }else{
            notice.setVisible(true);
        }
        if(notice){
            sGameData.mIsShowNoticeing = true;
            notice.showNotice(0);
        }
    },

    clickChangebankpwd:function(){
        log("clickChangebankpwd---");
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        gotoShowViewForBankChangePwd();
    }

});

BasePlayerInfoLayer.create = function () {
    var sg = new BasePlayerInfoLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
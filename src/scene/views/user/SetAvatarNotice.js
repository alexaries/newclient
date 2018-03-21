/**
 * Created by Administrator on 14-6-11.
 * 设置头像提示
 */
var SetAvatarNotice = cc.Layer.extend({
    mName:"",//标题
    mMsg:"",//消息
    mType:0, //0 系统或照片 1 相册或拍照
    mOkItem:null, //系统头像
    mNoItem:null, //照片
    mAlbumItem:null, // 相册
    mTakephotoItem:null, // 拍照
    init:function () { 
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
            colorlayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2));
            this.addChild(colorlayer);

            var size_notice = cc.size(700,320);
            var size_panel_inner = cc.size(696,190);
            var point_panel_close = cc.p(4,-4);//边线的高度
            var  bgimg = createSysPanel(size_notice);

            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();

            var innerimg = createSysPanel_yellow_zj(size_panel_inner);
            innerimg.setPosition(cc.p(0,16));
            this.addChild(innerimg);

            //var titlebg = cc.Sprite.create("#notice_title.png");
            //titlebg.setPosition(cc.p(0,size.height*0.5-16));
            //this.addChild(titlebg);

            //提示
            this.mName = sResWord.w_setavatar;
            var pNameLabel = cc.LabelTTF.create(this.mName,sGameData.mFontname, 28,//字体  ，字体大小
                cc.size(600,35),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pNameLabel.setPosition(cc.p(0,size.height*0.38+20-6));
            pNameLabel.setTag(8001);
            this.addChild(pNameLabel,1);

            //提示
            this.mMsg = sResWord.w_tip_setavatar;
            var pMsgLabel = cc.LabelTTF.create(this.mMsg,sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(600,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pMsgLabel.setPosition(cc.p(0,size.height*0.1));
            pMsgLabel.setTag(8002);
            this.addChild(pMsgLabel,1);
            pMsgLabel.setColor(cc.color(255,255,255))

            //添加 
            var okSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_syspic,cc.p(0.5,0.5),28);
            var okSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_syspic,cc.p(0.5,0.5),28,1);
            var okSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_syspic,cc.p(0.5,0.5),28);
            var okItem = cc.MenuItemSprite.create(
                okSprite,
                okSprite1,
                okSprite2,
                this.clickSyspic,this);
            okItem.setPosition(cc.p(-size.width*0.2, -size.height*0.3-25));//设定位置
            this.mOkItem = okItem

            //添加
            var cancelSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_photo,cc.p(0.5,0.5),28);
            var cancelSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_photo,cc.p(0.5,0.5),28,1);
            var cancelSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_photo,cc.p(0.5,0.5),28);
            var cancelItem = cc.MenuItemSprite.create(
                cancelSprite,
                cancelSprite1,
                cancelSprite2,
                this.clickPhoto,this);
            cancelItem.setPosition(cc.p(size.width*0.2, -size.height*0.3-25));//设定位置
            this.mNoItem = cancelItem


            //添加
            var takephotoSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_takephoto,cc.p(0.5,0.5),28);
            var takephotoSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_takephoto,cc.p(0.5,0.5),28,1);
            var takephotoSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_takephoto,cc.p(0.5,0.5),28);
            var takephotoItem = cc.MenuItemSprite.create(
                takephotoSprite,
                takephotoSprite1,
                takephotoSprite2,
                this.clickTakePhoto,this);
            takephotoItem.setPosition(cc.p(-size.width*0.2, -size.height*0.3-25));//设定位置
            this.mTakephotoItem = takephotoItem
            takephotoItem.setVisible(false);

            var albumSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_album,cc.p(0.5,0.5),28);
            var albumSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_album,cc.p(0.5,0.5),28,1);
            var albumSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_album,cc.p(0.5,0.5),28);
            var albumItem = cc.MenuItemSprite.create(
                albumSprite,
                albumSprite1,
                albumSprite2,
                this.clickAlbum,this);
            albumItem.setPosition(cc.p(size.width*0.2, -size.height*0.3-25));//设定位置
            this.mAlbumItem = albumItem
            albumItem.setVisible(false);



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
                x:size.width/2-8,
                y:size.height/2-6,
                anchorX:1,
                anchorY:1
            });

            var menu = cc.Menu.create(okItem,cancelItem,closeItem,takephotoItem,albumItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //进入时执行
    onEnter:function(){
        this._super();
        log("on enter notice")
    },
    //退出时执行
    onExit:function(){
        this._super();
        log("on exit notice")

    },
    //关闭
    gotoClose:function(){
        log("gotoClose--")
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
    },
    //移出监听
    removeListeners:function(){
        //cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListeners(this);
    },

    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")

    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")

    },
    //显示 提示
    showNotice:function(type){
        if(type == 0){
            this.mOkItem.setVisible(true);
            this.mNoItem.setVisible(true);
            this.mAlbumItem.setVisible(false);
            this.mTakephotoItem.setVisible(false);
        }else{
            this.mOkItem.setVisible(false);
            this.mNoItem.setVisible(false);
            this.mAlbumItem.setVisible(true);
            this.mTakephotoItem.setVisible(true);
        }
        setClickSwallows(this);
    },
    //使用系统头像
    clickSyspic:function(){
        log("click--syspic")
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
        this.gotoSetSysAvatar();

    },
    //使用照片
    clickPhoto:function(){
        log("clickPhoto--")
        playClickSound();
        this.removeListeners();
        this.showNotice(1);

    },
    //拍照
    clickTakePhoto:function(){
        log("clickTakePhoto--")
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
        sGameData.mEnterBackgroundFor = "avatar";
        if(cc.sys.isNative) {
            CallCpp.doSomeString(2, "1", sGameData.mUser.id, "", "", "");
        }
    },
    //相册
    clickAlbum:function(){
        log("clickAlbum--")
        playClickSound();
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;
        sGameData.mEnterBackgroundFor = "avatar";
        if(cc.sys.isNative) {
            CallCpp.doSomeString(2, "0", sGameData.mUser.id, "", "", "");
        }
    },
    //跳转到系统头像设置
    gotoSetSysAvatar:function(){
        if(sGameData.mCurrLayer!=sGameData.mSetSysAvatarLayer){
            sGameData.mCurrScene.removeChild(sGameData.mCurrLayer, true);
            sGameData.mCurrLayer = null;
            var thelayer = SetSysAvatarLayer.create();
            if(thelayer){
                sGameData.mCurrScene.addChild(thelayer,1);
            }
        }
    }


});
SetAvatarNotice.create = function () {
    var sg = new SetAvatarNotice();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

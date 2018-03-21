/**
 * Created by Administrator on 14-6-11.
 * 设置头像提示
 */
var SettingPanel = cc.Layer.extend({
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

            var size_notice = cc.size(572,331);
            var size_panel_inner = cc.size(552,265);
            var point_panel_close = cc.p(4,-4);//边线的高度



            var  bgimg = cc.Sprite.create("#bg_setting.png")
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();

            var innerimg = createPanel(size_panel_inner,"bg_inner_new.png");
            innerimg.setPosition(cc.p(0,-20));
            this.addChild(innerimg);

            var titlebg = cc.Sprite.create("#w_title_setting.png");
            titlebg.setPosition(cc.p(0,size.height*0.5-24));
            this.addChild(titlebg);

            var line = cc.Sprite.create("#setting_line.png");
            line.setPosition(cc.p(0,-20));
            this.addChild(line);

            var musiclabel = cc.LabelTTF.create(sResWord.w_music+":", sGameData.mFontname, 28);
            musiclabel.attr({
                x:-50,
                y:+78
            });
            this.addChild(musiclabel,3);
            musiclabel.setColor(cc.color(60,60,60))

            var soundlabel = cc.LabelTTF.create(sResWord.w_sound+":", sGameData.mFontname, 28);
            soundlabel.attr({
                x:-50,
                y:+18
            });
            this.addChild(soundlabel,3);
            soundlabel.setColor(cc.color(60,60,60))

            var musiconSprite = ButtonSpriteWithWordInner("#s_on.png","",cc.p(0.3,0.5),24,0);
            var musiconSprite1 = ButtonSpriteWithWordInner("#s_off.png","",cc.p(0.7,0.5),24,0);
            var musiconSprite2 = ButtonSpriteWithWordInner("#s_on.png","",cc.p(0.3,0.5),24,0);
            var musiconItem = cc.MenuItemSprite.create(
                musiconSprite,
                musiconSprite1,
                musiconSprite2,
                this.setMusicOn,this);
            musiconItem.attr({
                x:60,
                y:78
            });
            this.mMusicItem = musiconItem;

            var soundonSprite = ButtonSpriteWithWordInner("#s_on.png","",cc.p(0.3,0.5),24,0);
            var soundonSprite1 = ButtonSpriteWithWordInner("#s_off.png","",cc.p(0.7,0.5),24,0);
            var soundonSprite2 = ButtonSpriteWithWordInner("#s_on.png","",cc.p(0.3,0.5),24,0);
            var soundonItem = cc.MenuItemSprite.create(
                soundonSprite,
                soundonSprite1,
                soundonSprite2,
                this.setSoundOn,this);
            soundonItem.attr({
                x:60,
                y:18
            });
            this.mSoundItem = soundonItem;


            //添加 
            var okSprite = cc.Sprite.create("#btn_s_changeaccount.png");
            var okSprite1 = cc.Sprite.create("#btn_s_changeaccount.png");
            okSprite1.setColor(cc.color(200, 200, 200));
            var okSprite2 = cc.Sprite.create("#btn_s_changeaccount.png");
            var okItem = cc.MenuItemSprite.create(
                okSprite,
                okSprite1,
                okSprite2,
                this.clickChangeAccount,this);
            okItem.setPosition(cc.p(0, -size.height*0.3+10));//设定位置
            this.mOkItem = okItem



            //添加按钮 关闭
            var closeSprite = cc.Sprite.create("#btn_s_close.png");
            var closeSprite1 = cc.Sprite.create("#btn_s_close.png");
            closeSprite1.setColor(cc.color(200, 200, 200));
            var closeSprite2 = cc.Sprite.create("#btn_s_close.png");
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

            var menu = cc.Menu.create(okItem,closeItem,musiconItem,soundonItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);

            this.setButtonShow();
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
    showNotice:function(){
        this.setButtonShow();
        setClickSwallows(this);
    },
    setMusicOn:function(){

        playClickSound();

        sGameData.mMusicon = !sGameData.mMusicon;
        saveMusicSetting(sGameData.mMusicon,sGameData.mSoundon);
        if(!sGameData.mMusicon){
            SoundManager.stopBGMusic();
        }else{
            sGameData.mMainScene.playBGMusic();
        }
        this.setButtonShow();
    },
    setSoundOn:function(){

        playClickSound();

        sGameData.mSoundon = !sGameData.mSoundon;
        saveMusicSetting(sGameData.mMusicon,sGameData.mSoundon);
        this.setButtonShow();
    },
    setButtonShow:function(){
        log("setButtonShow=="+sGameData.mMusicon+"|"+sGameData.mSoundon);
        if(sGameData.mMusicon){
            this.mMusicItem.unselected();
        }else{
            this.mMusicItem.selected();
        }
        if(sGameData.mSoundon){
            this.mSoundItem.unselected();
        }else{
            this.mSoundItem.selected();
        }
    },
    clickChangeAccount:function(){
        doResetDataForLogout()
        gotoSceneByLoading(TargetSceneLogin,0)
    }



});
SettingPanel.create = function () {
    var sg = new SettingPanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

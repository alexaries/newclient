/**
 * Created by Administrator on 14-4-30.
 */
//设置
var GameSetting = cc.Node.extend({
    mIndex:0, //某位置
    mMusicItem:null,//音乐
    mSoundItem:null,//音效
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var size_notice = cc.size(350,200);
            var  bgimg = null;
            if(sGameData.mCurrScene == sGameData.mZJHGameScene){
                bgimg = createSysPanel_chatyellow(size_notice);
            }else{
                bgimg = createSysPanel(size_notice);
            }

            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();

            var musiclabel = cc.LabelTTF.create(sResWord.w_music+":", sGameData.mFontname, 28);
            musiclabel.attr({
                x:-70,
                y:50
            });
            this.addChild(musiclabel,1);

            var soundlabel = cc.LabelTTF.create(sResWord.w_sound+":", sGameData.mFontname, 28);
            soundlabel.attr({
                x:-70,
                y:-50
            });
            this.addChild(soundlabel,1);


            var musiconSprite = ButtonSpriteWithWordInner("#s_on.png","",cc.p(0.3,0.5),24,0);
            var musiconSprite1 = ButtonSpriteWithWordInner("#s_off.png","",cc.p(0.7,0.5),24,0);
            var musiconSprite2 = ButtonSpriteWithWordInner("#s_on.png","",cc.p(0.3,0.5),24,0);
            var musiconItem = cc.MenuItemSprite.create(
                musiconSprite,
                musiconSprite1,
                musiconSprite2,
                this.setMusicOn,this);
            musiconItem.attr({
                x:40,
                y:50
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
                x:40,
                y:-50
            });
            this.mSoundItem = soundonItem;

            var menu = cc.Menu.create(musiconItem,soundonItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);

            this.setButtonShow();

            bRet = true;
        }
        return bRet;
    },
    //音乐
    setMusicOn:function(){
        playClickSound();
        sGameData.mMusicon = !sGameData.mMusicon;
        saveMusicSetting(sGameData.mMusicon,sGameData.mSoundon);
        if(!sGameData.mMusicon){
            SoundManager.stopBGMusic();
        }else{
            sGameData.mCurrLayer.playBGMusic();
        }
        this.setButtonShow();
    },
    //音效
    setSoundOn:function(){
        playClickSound();
        sGameData.mSoundon = !sGameData.mSoundon;
        saveMusicSetting(sGameData.mMusicon,sGameData.mSoundon);
        this.setButtonShow();
    },
    //按钮显示
    setButtonShow:function(){
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
    }

});
GameSetting.create = function () {
    var sg = new GameSetting();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
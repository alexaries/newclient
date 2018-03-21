/**
 * Created by Administrator on 14-4-21.
 * 主界面玩家信息
 */
var MainPalyerInfo = cc.Node.extend({
    mIndex:0, //某位置
    mSoftcashshow:null, //金币显示
    mHardcashshow:null,//元宝显示
    mBaseNode:null,
    mRefreshBtn:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var tempY_a = 0;//android 文字 偏移
            if(cc.sys.os == cc.sys.OS_ANDROID){
                tempY_a = 2;
            }

            var csize = cc.size(300,100);


            var basenode = cc.Node.create();
            this.addChild(basenode);
            this.mBaseNode = basenode;


            var avatarimg = cc.Sprite.create("#main_player_avatar.png");
            avatarimg.attr({
                x:43,
                y:-44
            });
            basenode.addChild(avatarimg);
            avatarimg.setTag(9900);
            avatarimg.setScaleX(70/avatarimg.width);
            avatarimg.setScaleY(70/avatarimg.height);


            var splitSprite = cc.Sprite.create("#main_split.png");
            basenode.addChild(splitSprite)
            splitSprite.setPosition(cc.p(83,-44));
            splitSprite.setScaleX(3);
            splitSprite.setScaleY(1.5);



            var namestr = "ID:"+sGameData.mUser.id;
            var namelabel = cc.LabelTTF.create(namestr, sGameData.mFontname, 24);
            if(namelabel!=null){
                namelabel.attr({
                    x:88,
                    y:-40+16+tempY_a,
                    anchorX: 0,
                    anchorY: 0.5
                });
                basenode.addChild(namelabel,1);
                namelabel.setColor(cc.color(255,218,0));
                if(namelabel.getContentSize().width > 190){
                    namelabel.setScale(190/namelabel.getContentSize().width);
                }
                namelabel.enableStroke(cc.color(255,255,255), 1);
            }


            var cashbg1img = cc.Sprite.create("#main_cash_bg.png")
            cashbg1img.setAnchorPoint(cc.p(0,0.5));
            cashbg1img.setPosition(cc.p(46+44,-58))
            basenode.addChild(cashbg1img);
            cashbg1img.setScaleY(0.9);

            var scashimg = cc.Sprite.create("#softcash_1.png")
            scashimg.setAnchorPoint(cc.p(0,0.5));
            //scashimg.setScale(0.45);
            scashimg.setPosition(cc.p(56+44,-58))
            basenode.addChild(scashimg);


            var softcashshow = ShowNum.create();
            softcashshow.attr({
                x:98+44,
                y:-58,
                anchorX: 0,
                anchorY: 0.5
            });
            softcashshow.setScale(0.8)
            basenode.addChild(softcashshow,1);
            softcashshow.setValue(2,formatcash(sGameData.mUser.softCash),1,1);
            this.mSoftcashshow = softcashshow;


            var refreshSprite = cc.Sprite.create("#btn_refresh.png")
            var refreshSprite1 = cc.Sprite.create("#btn_refresh.png")
            refreshSprite1.setColor(cc.color(200,200,200));
            var refreshSprite2 = cc.Sprite.create("#btn_refresh.png")
            var refreshItem = cc.MenuItemSprite.create(
                refreshSprite,
                refreshSprite1,
                refreshSprite2,
                this.clickRefresh,this);
            refreshItem.attr({
                x:300,
                y:-58
            });
            this.mRefreshBtn = refreshItem;

            var menu = cc.Menu.create(refreshItem);//giftItem
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);


            this.scheduleOnce(this.initInSecondFrame,0.05);
            

            bRet = true;
        }
        return bRet;
    },
    //第2帧初始化
    initInSecondFrame:function(){
        this.loadImg();
    },
    //更新货币显示
    updateCash:function(){
        this.mSoftcashshow.setValue(2,formatcash(sGameData.mUser.softCash),1,1);
        //this.mHardcashshow.setValue(2,sGameData.mUser.hardCash,1,1);

        if(!this.mRefreshBtn.visible){
            this.mRefreshBtn.setVisible(true);
        }
    },
    clickRefresh:function(){
        log("clickRefresh--cash")
        sGameData.mGameNet.sendReqUserInfo();
        this.mRefreshBtn.setVisible(false);
    },
    //加载图片
    loadImg:function(){
        var avatar = sGameData.mUser.avatar;
        var filepath = sGameConfig.serverResWebhttp + "avatar/" + avatar;
        log("loadImg--"+avatar)
        loadImg_base(avatar,avatar,filepath,this.mBaseNode,9900,70,70,loadImgOver)
    },
    showHallTypeView:function(type){
        var img = this.mBaseNode.getChildByTag(9900);
        if(img){
            if(type == 1){
                img.setVisible(true);
            }else{
                img.setVisible(false);
            }
        }

        //var imgf = this.mBaseNode.getChildByTag(9901);
        //if(imgf){
        //    if(type == 1){
        //        imgf.setVisible(true);
        //    }else{
        //        imgf.setVisible(false);
        //    }
        //}
    },


    // 退出登录
    gotoquit:function(){
        log("gotoquit--")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();


        //showNotice(sResWord.w_notice,sResWord.w_tip_quituser,3,4);


    }

});
MainPalyerInfo.create = function () {
    var sg = new MainPalyerInfo();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
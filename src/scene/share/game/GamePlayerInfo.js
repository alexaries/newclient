/**
 * Created by apple on 14-7-17.
 * 游戏玩家信息
 */
var GamePlayerInfo = cc.Layer.extend({
    mIndex:0, //某位置
    mShowVip:1,//按vip显示
    mGameType:0,// 显示类型 1dzpk 2zjh 3dn 4ddz 5scmj 6gymj 7ddzmathc
    mShowPlayer:null,//显示玩家
    mCardshows:[],//牌显示
    mInterativeShows:[],//交互显示
    mTouchIndex:-1,//点击编号
    mAddBtn:null,//添加按钮
    mDelBtn:null,//删除按钮
    mCashBtn:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,140))
            colorlayer.setPosition(cc.p(-size.width/2,-size.height/2-13));
            this.addChild(colorlayer);

            var size_panel = cc.size(800,475);
            var size_panel_inner = cc.size(305, 435);
            var size_panel_inner1 = cc.size(435, 435);
            var point_panel_close = cc.p(-4,-4);//边线的高度
            var size_tab_size = cc.size(220,49);
            var size_tab_size1 = cc.size(220,45);
            var paneltopPosY = 78;
            this.mCardshows = [];
            this.mInterativeShows = [];
            var  bgimg = null;

            //bgimg = createSysPanel(size_panel);
            if(sGameData.mCurrScene == sGameData.mZJHGameScene){
                bgimg = createSysPanel_chatyellow(size_panel);
            }else{
                bgimg = createSysPanel(size_panel);
            }

            //bgimg.setPosition(cc.p(size.width/2,size.height/2-20));
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var csize = this.getContentSize();


            var linesprite = cc.Sprite.create("#button_small_delimeter.png");
            linesprite.setPosition(cc.p(-60,0));
            linesprite.setScaleY(465/104);
            this.addChild(linesprite);
            linesprite.setOpacity(80);


            var closestr = "#g_close_btn.png";
            if(this.mShowVip == 1) {
                closestr = "#g_close_btn.png";
            }
            ////添加按钮 关闭
            //var closesprite = cc.Sprite.create(closestr);
            //var closesprite1 = cc.Sprite.create(closestr);
            //var closesprite2 = cc.Sprite.create(closestr);
            //closesprite1.setColor(cc.color(200, 200, 200));
            //var closeItem = cc.MenuItemSprite.create(
            //    closesprite,
            //    closesprite1,
            //    closesprite2,
            //    this.clickToClose,this);
            //closeItem.setAnchorPoint(cc.p(1,1));
            //closeItem.setPosition(cc.p(csize.width/2+point_panel_close.x,csize.height/2+point_panel_close.y));
            //
            //
            //var menu = cc.Menu.create(closeItem);//tab2Item
            //menu.x = 0;
            //menu.y = 0;
            //this.addChild(menu, 1);

            this.initPlayerInfoShow();
            this.initInterative();

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //移出监听
    removeListeners:function(){
        cc.eventManager.removeListeners(this);
    },
    //点击时隐藏界面
    hiddenUIWithClick:function(pos){
        //log("hiddenUIWithClick=="+pos.x+"|"+pos.y)
        //log("this.x=="+this.x+"|"+this.y)
        //log("this.x=="+this.width+"|"+this.width)
        var tar = this;
        var size_tab_size = cc.size(220,49);
        var paneltopPosY = 78;
        var size = cc.director.getWinSize();

        //-size_panel.width*0.3,size.height/2+20-paneltopPosY

        //else if(pos.x <tar.x-tar.width*0.3+size_tab_size.width/2 && pos.x > tar.x-tar.width*0.3-size_tab_size.width/2
        //    &&pos.y<tar.y+size.height/2+20-paneltopPosY+size_tab_size.height&&pos.y>tar.y+size.height/2+20-paneltopPosY-size_tab_size.height){
        //}else if(pos.x <tar.x-tar.width*0.3 +size_tab_size.width*1.1+size_tab_size.width/2 && pos.x > tar.x-tar.width*0.3 +size_tab_size.width*1.1-size_tab_size.width/2
        //    &&pos.y<tar.y+size.height/2+20-paneltopPosY+size_tab_size.height&&pos.y>tar.y+size.height/2+20-paneltopPosY-size_tab_size.height){
        //}

        if(tar&&tar.visible){
            if(pos.x <tar.x+tar.width/2 && pos.x >tar.x-tar.width/2
                &&pos.y<tar.y+tar.height/2&&pos.y>tar.y-tar.height/2){

            }else{
                showGamePlayerInfo(false);
            }
        }

    },


    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")
        sGameData.mClickState = 1
        this.hiddenUIWithClick(pos)
        this.mTouchIndex = this.checkClickInteratve(pos)
    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")
        if(sGameData.mClickState == 1){
            sGameData.mClickState = 2;
            if(this.mTouchIndex!=-1){
                var index = this.checkClickInteratve(pos)
                if(index == this.mTouchIndex){
                    this.clickIndex(index);
                }
            }
        }
    },
    //点击某个交互
    clickIndex:function(index){
        log("clickIndex=="+index)
        if(sGameData.mIsTestNoNet){
            showGamePlayerInfo(false);
        }else{
            var now  = (new Date()).getTime();
            if(now - sGameData.mInterativeTime < sGameData.mInterativeDurTime*1000){
                showGamePlayerInfo(false);
                var durtime = sGameData.mInterativeDurTime;
                var word = sResWord.w_tip_interative_s1+durtime+sResWord.w_tip_interative_s2;
                showLittleNotice(word)
                return;
            }



            var myChairId = sGameData.mCurrLayer.mMyChairId;
            if(myChairId!=-1){
                if(this.mShowPlayer.chairId!=myChairId){
                    if(sGameData.mCurrLayer.mChairSitDown[this.mShowPlayer.chairId] == SITDOWN_YES) {//有可能已经走了
                        if (!sGameData.mIsTestNoNet) {
                            if(this.mGameType == 1) { //显示类型 1dzpk 2zjh 3dn 4ddz 5scmj 6gymj
                                sGameNetData.mDZPKNet.sendDZPKChat(2, index, "", this.mShowPlayer.chairId)
                            }else if(this.mGameType == 2) {
                                sGameNetData.mZJHNet.sendZJHChat(2, index, "", this.mShowPlayer.chairId)
                            }else if(this.mGameType == 3) {
                                sGameNetData.mDNNet.sendDNChat(2, index, "", this.mShowPlayer.chairId)
                            }else if(this.mGameType == 4) {
                                sGameData.mDDZLayer.sendChatCmd(2, index, "", this.mShowPlayer.chairId)
                            }else if(this.mGameType == 5) {
                                sGameNetData.mMJNet.sendMJChat(2, index, "", this.mShowPlayer.chairId)
                            }else if(this.mGameType == 6) {
                                sGameNetData.mGYMJNet.sendGYMJChat(2, index, "", this.mShowPlayer.chairId)
                            }else if(this.mGameType == 7) {
                                sGameNetData.mDDZMatchNet.sendDDZMatchChat(2, index, "", this.mShowPlayer.chairId)
                            }
                        }
                        sGameData.mInterativeTime = now
                    }
                }
                showGamePlayerInfo(false);
            }else{
                 showLittleNotice(sResWord.w_interative_nosit)
            }

        }
    },
    //初始化交互
    initInterative:function(){

        var size = cc.director.getWinSize();
        var csize = this.getContentSize();
        var paneltopPosY = 78+25;
        var size_panel = cc.size(800,475);
        var size_panel_inner = cc.size(305, 435);
        var size_panel_inner1 = cc.size(435, 435);

        var point_c_inter = cc.p(-size_panel.width/2+350,size.height/2- paneltopPosY-24);



        for(var i=0;i<8;i++){
            var item = ItemInterative.create(i)
            this.addChild(item,8);
            item.setPosition(cc.p(point_c_inter.x+70+140*(i%3),point_c_inter.y-45-140*Math.floor(i/3)));
            this.mInterativeShows.push(item);
        }



    },
    //初始化玩家显示
    initPlayerInfoShow:function(){
        var size = cc.director.getWinSize();
        var paneltopPosY = 78;
        var size_panel = cc.size(800,525);

        var point_c_head = cc.p(-size_panel.width/2+35,size.height/2+20- paneltopPosY-64);
        var headsprite = cc.Sprite.create("#player_avatar.png");
        headsprite.setAnchorPoint(cc.p(0, 1));
        headsprite.setPosition(point_c_head);
        this.addChild(headsprite, 5);
        headsprite.setTag(19001);

        var tempY_a = 0;//android 文字 偏移
        if(cc.sys.os == cc.sys.OS_ANDROID){
            tempY_a = 2;
        }



        var nameLabel = cc.LabelTTF.create("ABC", sGameData.mFontname,24);
        nameLabel.setAnchorPoint(cc.p(0, 1));
        nameLabel.setPosition(cc.p(point_c_head.x+130,point_c_head.y-10+tempY_a));
        this.addChild(nameLabel, 5);
        nameLabel.setTag(18001);

        var levelLabel = cc.LabelTTF.create(sResWord.w_level+":"+"15", sGameData.mFontname,24);
        levelLabel.setAnchorPoint(cc.p(0, 1));
        levelLabel.setPosition(cc.p(point_c_head.x+130,point_c_head.y-50+tempY_a));
        this.addChild(levelLabel, 5);
        levelLabel.setTag(18003);

        var scashimg = cc.Sprite.create("#softcash_1.png")
        scashimg.setAnchorPoint(cc.p(0,1));
        scashimg.setPosition(cc.p(point_c_head.x+130,point_c_head.y-90+tempY_a))
        this.addChild(scashimg,5);


        var cashLabel = cc.LabelTTF.create("100", sGameData.mFontname,24);
        cashLabel.setAnchorPoint(cc.p(0, 1));
        cashLabel.setPosition(cc.p(point_c_head.x+130+30,point_c_head.y-90+tempY_a));
        this.addChild(cashLabel, 5);
        cashLabel.setTag(18002);

        if(this.mGameType!=0) {
            var winLabel = cc.LabelTTF.create(sResWord.w_winlose + ":" + "0"+sResWord.w_win+"0"+sResWord.w_lose, sGameData.mFontname, 24);
            winLabel.setAnchorPoint(cc.p(0, 1));
            winLabel.setPosition(cc.p(point_c_head.x + 10, point_c_head.y - 130+tempY_a));
            this.addChild(winLabel, 5);
            winLabel.setTag(18004);

        }

        if(this.mGameType==1||this.mGameType==2||this.mGameType==3){

            var maxscoreLabel = cc.LabelTTF.create(sResWord.w_maxscore + ":" + "0", sGameData.mFontname, 24);
            maxscoreLabel.setAnchorPoint(cc.p(0, 1));
            maxscoreLabel.setPosition(cc.p(point_c_head.x + 10, point_c_head.y - 170+tempY_a));
            this.addChild(maxscoreLabel, 5);
            maxscoreLabel.setTag(18005);

            var maxcardLabel = cc.LabelTTF.create(sResWord.w_maxCard+":"+"", sGameData.mFontname,24);
            maxcardLabel.setAnchorPoint(cc.p(0, 1));
            maxcardLabel.setPosition(cc.p(point_c_head.x+10,point_c_head.y-210+tempY_a));
            this.addChild(maxcardLabel, 5);
            maxcardLabel.setTag(18006);
            var cardlen = 5;
            if(this.mGameType == 2){
                cardlen = 3;
            }
            for(var i=0;i<cardlen;i++){
                var cardshow = BaseCard.create();
                this.addChild(cardshow)
                cardshow.setPosition(cc.p(point_c_head.x+38+53+35*i,point_c_head.y-276))
                cardshow.setScale(0.3)
                cardshow.setVisible(false);
                this.mCardshows.push(cardshow);
            }

        }




    },

    clickCash:function(){
        log("dzpk--clickCash")
        playClickSound();
        showGamePlayerInfo(false);


    },

    //更新显示信息
    showInfo:function(){
        setClickSwallows(this);
        if(this.mShowPlayer){

            if(this.mCashBtn){
                if(this.mShowPlayer.id == sGameData.mUser.id){
                    this.mCashBtn.setVisible(true);
                }else{
                    this.mCashBtn.setVisible(false);
                }
            }

            var headsprite = this.getChildByTag(19001)
            if(headsprite){
                headsprite.setSpriteFrame("player_avatar.png")
                headsprite.setScale(1);
                headsprite.setVisible(true);
            }

            var nameLabel = this.getChildByTag(18001)
            if(nameLabel){
                nameLabel.setVisible(true);
                nameLabel.setString(this.mShowPlayer.nickName)
                if(nameLabel.getContentSize().width > 157){
                    nameLabel.setScale(157/nameLabel.getContentSize().width);
                }else{
                    nameLabel.setScale(1);
                }
            }
            var cashLabel = this.getChildByTag(18002)
            if(cashLabel){
                cashLabel.setVisible(true);
                cashLabel.setString(formatcash(this.mShowPlayer.softCash))
            }
            var levelLabel = this.getChildByTag(18003)
            if(levelLabel){
                levelLabel.setVisible(true);
                var spacestr = " ";
                if(this.mShowPlayer.id <= 1000){
                    spacestr = "";
                }//
                levelLabel.setString(sResWord.w_level+":"+spacestr+this.mShowPlayer.level)
            }
            if(this.mGameType!=0) {
                var winLabel = this.getChildByTag(18004)
                if (winLabel) {
                    winLabel.setVisible(true);
                    winLabel.setString(sResWord.w_winlose + ":" + this.mShowPlayer.winCount+sResWord.w_win+this.mShowPlayer.loseCount+sResWord.w_lose)
                }
            }
            //if(this.mShowPlayer.bFriend){
            //    this.mAddBtn.setVisible(false)
            //    this.mDelBtn.setVisible(true)
            //}else{
            //    this.mAddBtn.setVisible(true)
            //    this.mDelBtn.setVisible(false)
            //}

            if(this.mGameType!=0&&this.mGameType!=4){

                var maxscoreLabel = this.getChildByTag(18005)
                if (maxscoreLabel) {
                    maxscoreLabel.setVisible(true);
                    maxscoreLabel.setString(sResWord.w_maxscore + ":" + formatcash(this.mShowPlayer.maxScore))
                }

                if(this.mShowPlayer.maxCardType != -1&&this.mShowPlayer.maxCards.length > 0){
                    for(var i=0;i<this.mCardshows.length;i++){
                        var cardshow = this.mCardshows[i]
                        cardshow.setCardValue(this.mShowPlayer.maxCards[i])
                        cardshow.setScale(0.3)
                        cardshow.setVisible(true);
                    }
                }
            }

            this.loadImg();
        }

    },
    //关闭面板
    closePanel:function(){
        this.removeListeners();

        var headsprite = this.getChildByTag(19001)
        if(headsprite){
            headsprite.setVisible(false);
        }

        var nameLabel = this.getChildByTag(18001)
        if(nameLabel){
            nameLabel.setVisible(false);
        }
        var cashLabel = this.getChildByTag(18002)
        if(cashLabel){
            cashLabel.setVisible(false);
        }
        var levelLabel = this.getChildByTag(18003)
        if(levelLabel){
            levelLabel.setVisible(false);
        }
        if(this.mGameType!=0) {
            var winLabel = this.getChildByTag(18004)
            if (winLabel) {
                winLabel.setVisible(false);
            }
            var maxscoreLabel = this.getChildByTag(18005)
            if (maxscoreLabel) {
                maxscoreLabel.setVisible(false);
            }
        }
        if(this.mGameType!=0&&this.mGameType!=4){
            for(var i=0;i<this.mCardshows.length;i++){
                var cardshow = this.mCardshows[i]
                cardshow.setVisible(false);
            }
        }

    },
    //关闭
    clickToClose:function(){
        log("clickToClose--")
        playClickSound();
        showGamePlayerInfo(false);
    },
    clickTab1:function(){
        log("clickTab1")
        playClickSound();

    },
    clickTab2:function(){

    },

    //检测点击到哪个交互图
    checkClickInteratve:function(pos){
        //log("checkClickInteratve=="+pos.x+"|"+pos.y)
        var pos1 = cc.p(pos.x-this.x,pos.y-this.y)
        //log("pos1=="+pos1.x+"|"+pos1.y)
        var index = -1;
        for(var i = 0;i<this.mInterativeShows.length;i++){
            var itemshow = this.mInterativeShows[i];
            if(itemshow.checkClick(pos1)){
                index = i
                break;
            }
        }
        return index;
    },

    //加载图
    loadImg:function(){
        var avatar = this.mShowPlayer.avatar;
        var filepath = sGameConfig.serverResWebhttp+"avatar/"+avatar;
        //log("loadImg--"+avatar)
        loadImg_base(avatar,avatar,filepath,this,19001,120,120,loadImgOver)
    }
});
GamePlayerInfo.create = function (showvip,gtype) {
    var sg = new GamePlayerInfo();
    if (sg) {
        sg.mShowVip = showvip
        sg.mGameType = gtype;
        sg.init()
        return sg;
    }
    return null;
};

/**
 * Created by Administrator on 14-5-13.
 */
//用户头像
var ZJHUserHead = BaseUserHead.extend({
    mChairIdx:-1,//椅子号
    mDotBatch:null,//时钟 点 batchnode
    mSprites:[],//时钟 点 图集合
    mWarningSoundId:0,//报警音效id
    mCanSound:true,//能否播放声音
    mIsInGame:false,//是否在游戏中
    init:function () {
        var bRet = false;
        if (this._super()) {

            var tempY_a = 0;//android 文字 偏移
            if(cc.sys.os == cc.sys.OS_ANDROID){
                tempY_a = 2;
            }

            var itemsize = cc.size(120,168);
            var isize = cc.size(120,168);

            this.setContentSize(itemsize);

            this.width = itemsize.width;
            this.height = itemsize.height;

            //
            //var bgsprite = cc.Scale9Sprite.create();
            //bgsprite.initWithSpriteFrameName("player_shadow.png");
            //bgsprite.setContentSize(isize);
            ////var bgsprite = cc.Sprite.create("#player_shadow.png");
            //this.addChild(bgsprite, 0);
            //bgsprite.setTag(9101);
            //this.setContentSize(bgsprite.getContentSize());
            //
            //this.width = bgsprite.width;
            //this.height = bgsprite.height;

            var headsprite = cc.Sprite.create("#player_avatar.png");
            headsprite.setTag(9001);
            this.addChild(headsprite, 0);
            headsprite.setScaleX(100/headsprite.width)
            headsprite.setScaleY(100/headsprite.height)


            var bgsprite = cc.Sprite.create("#head_frame.png");
            this.addChild(bgsprite, 1);


            var blockSize = cc.size(120, 28);
            var nameLabel = cc.LabelTTF.create("user", sGameData.mFontname,24);
            nameLabel.attr({
                x : 0,
                y : this.height/2-12 +tempY_a ,
                anchorY:0.5
            });
            this.addChild(nameLabel, 5);
            nameLabel.setTag(8001);
            this.mNameLabel = nameLabel;


            var softcashshow = ShowNum.create();
            softcashshow.setPosition(cc.p(0,-this.height/2+13));
            this.addChild(softcashshow,1);
            softcashshow.setValue(4,0,3,1);
            softcashshow.setScale(1.1);
            this.mCashLabel = softcashshow;

            //var scashimg = cc.Sprite.create("#softcash_1.png")
            //scashimg.setAnchorPoint(cc.p(0,0));
            //scashimg.setScale(0.8);
            //scashimg.setPosition(cc.p(-this.width/2+0,-this.height/2+3));
            //this.addChild(scashimg);
            //scashimg.setTag(9102)

            var iconsprite = cc.Sprite.create("#zjh_zhuang.png");
            iconsprite.attr({
                x: this.width/2-2,
                y:this.height/2-24,
                anchorX:1,
                anchorY:1
            });
            iconsprite.setTag(9002);
            iconsprite.setScale(0.7);
            this.addChild(iconsprite, 1);
            //iconsprite.setVisible(false);

            var mask = cc.Scale9Sprite.create();
            mask.initWithSpriteFrameName("player_shadow.png");
            mask.setContentSize(isize);
            //cc.Sprite.create("#player_shadow.png");
            mask.setTag(9005);
            this.addChild(mask,5);
            if(this.mIsInGame){
                mask.setVisible(false);
            }else{
                mask.setVisible(true);
            }

            bRet = true;
        }
        return bRet;
    },

    changeShowSeatView:function(){
        var tempY_a = 0;//android 文字 偏移
        if(cc.sys.os == cc.sys.OS_ANDROID){
            tempY_a = 2;
        }
        var seat = sGameData.mZJHLayer.getPlayerSeatByChairId(this.mChairIdx);
        var isize = cc.size(120,168);
        var headpos = cc.p(0,0)
        var namepos = cc.p(0,isize.height/2-12+tempY_a )
        var nameanchorp = cc.p(0.5,0.5)
        var iconpos = cc.p(-isize.width/2+0,-isize.height/2+3)
        var cashpos = cc.p(0,-this.height/2+13);
        var zpos = cc.p(isize.width/2-2,isize.height/2-24);
        //if(seat == 0){
        //    isize = cc.size(240,120);
        //    headpos = cc.p(-60,0)
        //    namepos = cc.p(0,isize.height/2-22+tempY_a )
        //    nameanchorp = cc.p(0,0.5)
        //    iconpos = cc.p(0,-isize.height/2+13)
        //    cashpos = cc.p(30,-isize.height/2+23);
        //    zpos = cc.p(0-2,isize.height/2-4);
        //}
        this.setContentSize(isize);

        var bgsprite = this.getChildByTag(9101);
        if(bgsprite){
            bgsprite.setContentSize(isize);
        }

        var mask = this.getChildByTag(9005);
        if(mask){
            mask.setContentSize(isize);
        }

        var headsprite = this.getChildByTag(9001);
        if(headsprite){
            headsprite.setPosition(headpos);
        }

        var zsprite = this.getChildByTag(9002);
        if(zsprite){
            zsprite.setPosition(zpos);
        }

        var nameLabel = this.getChildByTag(8001);
        if(nameLabel){
            nameLabel.setPosition(namepos);
            nameLabel.setAnchorPoint(nameanchorp);
        }

        var scashimg = this.getChildByTag(9102);
        if(scashimg) {
            scashimg.setPosition(iconpos);
        }

        this.mCashLabel.setPosition(cashpos);
        this.updateCashInfo();

    },
    //设置坐标
    setXY:function(){
        var size = cc.director.getWinSize();
        //log("this.mSeat="+this.mChairIdx)
        var pos =  sGameData.mZJHLayer.mZJHLogic.getHeadsPos();
        var tpos = pos[this.mChairIdx]
        this.x = tpos.x
        this.y = tpos.y

        this.changeShowSeatView();
    },
    //按位置设置坐标
    setSeatXY:function(seat){
        var size = cc.director.getWinSize();
        //log("this.mSeat="+this.mChairIdx)
        var pos =  sGameData.mZJHLayer.mZJHLogic.getHeadsPos();
        var tpos = pos[seat]
        this.x = tpos.x
        this.y = tpos.y

        this.changeShowSeatView();
    },
    //按位置获取坐标
    getSeatXY:function(seat){
        var size = cc.director.getWinSize();
        //log("this.mSeat="+this.mChairIdx)
        var pos =  sGameData.mZJHLayer.mZJHLogic.getHeadsPos();
        var tpos = pos[seat]

        this.changeShowSeatView();

        return tpos;
    },
    //设置玩家
    setPlayer:function(player){
        if(player != null){
            this.mShowPlayer = player;
            var nick = getNickNameShow(this.mShowPlayer.nickName)
            if(sGameData.mUseAddressNick){
                nick = getAddressNickShow(this.mShowPlayer.ipToAddress)
            }
            this.mNameLabel.setString(nick);
            //this.mNameLabel.setString("ID"+this.mShowPlayer.id);
            this.setNameScale();
            this.updateCashInfo();//.setString(this.mShowPlayer.softCash);
            this.loadImg();
        }
    },
    //更新筹码
    updateCashInfo:function(){
        var seat = sGameData.mZJHLayer.getPlayerSeatByChairId(this.mChairIdx);
        var cash = 0;
        if(this.mShowPlayer){
            cash = formatcash(this.mShowPlayer.softCash);
        }
        this.mCashLabel.setValue(4,cash,3,1);
        //if(seat != 0){
        //    this.mCashLabel.setValue(4,cash,3,1);
        //}else{
        //    this.mCashLabel.setValue(4,cash,1,1);
        //}
    },
    //设置位置号
    setSeat:function(seat){
        this.mSeat = seat;
        if(sGameData.mIsTestNoNet&&seat!=0){
            this.mNameLabel.setString("user"+this.mSeat);
        }
    },
    //设置椅子号
    setChair:function(chairId){
        this.mChairIdx = chairId;
        if(sGameData.mIsTestNoNet&&chairId!=0){
            this.mNameLabel.setString("user"+this.mChairIdx);
        }
    },
    //显示庄type 1 显示
    showZhuang:function(type){
        var iconsprite  = this.getChildByTag(9002);
        if(type == 1){
            iconsprite.setVisible(true);
        }else{
            iconsprite.setVisible(false);
        }
    },
    //设置在游戏总
    setInGame:function(state){
        this.mIsInGame = state;
        var mask = this.getChildByTag(9005);
        if(mask){
            if( this.mIsInGame){
                mask.setVisible(false);
            }else{
                mask.setVisible(true);
            }
        }
    },
    cleanDots:function(){

        for (var i = 0; i < this.mSprites.length; ++i)
        {
            var sprite = this.mSprites[i];
            this.mDotBatch.removeChild(sprite);
        }
        this.mSprites = [];
        this.mDotBatch = null;
    },
    //显示时钟
    showClock:function(currOperateTime){
        var v = sGameData.operateTimeVector;
        var seat = sGameData.mZJHLayer.getPlayerSeatByChairId(this.mChairIdx);
        //if(seat == 0){
        //    v = sGameData.operateTimeVector1;
        //}


//        if(currOperateTime >= v.length){
//            currOperateTime = 0;
//        }
        if(currOperateTime > 0&& currOperateTime <20){
            this.mCanSound = true;
            this.closeSound();
        }

        if(this.mDotBatch==null){
            var size = this.getContentSize();
            this.mDotBatch = cc.SpriteBatchNode.create(res.clock_dot_png);
            this.mDotBatch.setTag(9003);
            this.mDotBatch.setPosition(cc.p(-size.width/2, -size.height/2));
            this.addChild(this.mDotBatch);
            this.mSprites = [];
            for (var i = 0; i < v.length; ++i)
            {
                var sprite = cc.Sprite.create(this.mDotBatch.getTexture());
                sprite.setPosition(cc.p(v[i].x,v[i].y));
                this.mDotBatch.addChild(sprite, 0); //注意这里，所有的sprite都在同一个z轴上
                this.mSprites[i] = sprite;
            }
        }

        if(this.mDotBatch!=null){
            this.mDotBatch.setVisible(true);
            for (var i = 0; i < v.length; ++i)
            {
                var sprite = this.mSprites[i]
                if(i > currOperateTime){
                    sprite.setVisible(true);
                }else{
                    sprite.setVisible(false);
                }
            }
        }
        if(currOperateTime > 450 && this.mCanSound
            && sGameData.mZJHLayer.mClockChairIdx==sGameData.mUser.chairId){//剩5秒时到计时
            this.mCanSound = false;
            this.closeSound();
            this.mWarningSoundId = SoundManager.playSound(res.warning_clock_mp3,true,SOUND_CLOCK);
        }
        var maxT = 598;
        //if(seat == 0){
        //    maxT = 740
        //}
        if(currOperateTime >= maxT){
            this.closeSound();
        }

    },
    //关闭时钟
    closeClock:function(){
        if(this.mDotBatch){
            this.mDotBatch.setVisible(false);
        }
        this.closeSound();
    },
    //关闭声音
    closeSound:function(){
        if(this.mWarningSoundId > 0){
            SoundManager.stopSound(this.mWarningSoundId)
            this.mWarningSoundId = 0;
        }
    }

});

ZJHUserHead.create = function (i) {
    var sg = new ZJHUserHead();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
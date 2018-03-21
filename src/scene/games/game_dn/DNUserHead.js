/**
 * Created by Administrator on 14-5-13.
 */
//用户头像
var DNUserHead = BaseUserHead.extend({
    mChairIdx:-1,//椅子号
    init:function () {
        var bRet = false;
        if (this._super()) {
            var tempY_a = 0;//android 文字 偏移
            if(cc.sys.os == cc.sys.OS_ANDROID){
                tempY_a = 2;
            }
            var itemsize = cc.size(120,168);

            this.setContentSize(itemsize);

            this.width = itemsize.width;
            this.height = itemsize.height;

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
                y : this.height/2-12+tempY_a ,
                anchorY:0.5
            });
            this.addChild(nameLabel, 5);
            this.mNameLabel = nameLabel;

//            var cashLabel = cc.LabelTTF.create("0", sGameData.mFontname,18, blockSize, cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
//            cashLabel.attr({
//                x : 0,
//                y : -this.height/2,
//                anchorY:0
//            });
//            this.addChild(cashLabel, 5);
//            //cashLabel.setVisible(false);
//            this.mCashLabel = cashLabel;

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

            var iconsprite = cc.Sprite.create("#dn_zhuang.png");
            iconsprite.attr({
                x: this.width/2-2,
                y:this.height/2-24,
                anchorX:1,
                anchorY:1
            });
            iconsprite.setTag(9002);
            iconsprite.setScale(0.7);
            this.addChild(iconsprite, 1);
            iconsprite.setVisible(false);



            bRet = true;
        }
        return bRet;
    },
    //设置坐标
    setXY:function(){
        var size = cc.director.getWinSize();
        var pos0 = cc.p(size.width/2 - 107,size.height/2 - 160)
        var pos1 = cc.p(size.width/2 + 407,size.height/2 - 54)
        var pos2 = cc.p(size.width/2 + 407,size.height/2 + 160)
        var pos3 = cc.p(size.width/2 - 407,size.height/2 + 160)
        var pos4 = cc.p(size.width/2 - 407,size.height/2 - 54)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        var tpos = pos[this.mChairIdx]

        if(tpos){
            this.x = tpos.x
            this.y = tpos.y
        }
    },
    //按位置设置坐标
    setSeatXY:function(seat){
        var tpos = this.getSeatXY(seat);
        this.x = tpos.x
        this.y = tpos.y
    },
    //获取位置坐标
    getSeatXY:function(seat){
        var size = cc.director.getWinSize();
        //cc.log("this.mSeat="+this.mChairIdx)
        var pos0 = cc.p(size.width/2 - 107,size.height/2 - 160)
        var pos1 = cc.p(size.width/2 + 407,size.height/2 - 54)
        var pos2 = cc.p(size.width/2 + 407,size.height/2 + 160)
        var pos3 = cc.p(size.width/2 - 407,size.height/2 + 160)
        var pos4 = cc.p(size.width/2 - 407,size.height/2 - 54)
        var pos =  [pos0,pos1,pos2,pos3,pos4];
        var tpos = pos[seat]
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
            this.mCashLabel.setValue(4,formatcash(this.mShowPlayer.softCash),3,1);//.setString(this.mShowPlayer.softCash);
            this.loadImg();
        }
    },
    //更新筹码信息
    updateCashInfo:function(){
        if(this.mShowPlayer){
            this.mCashLabel.setValue(4,formatcash(this.mShowPlayer.softCash),3,1);
        }
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
    //显示庄 type 1 显示
    showZhuang:function(type){
        var iconsprite  = this.getChildByTag(9002);
        if(type == 1){
            iconsprite.setVisible(true);
        }else{
            iconsprite.setVisible(false);
        }
    }





});

DNUserHead.create = function () {
    var sg = new DNUserHead();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};
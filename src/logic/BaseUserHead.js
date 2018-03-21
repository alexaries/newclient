/**
 * Created by Administrator on 14-4-18.
 * 基本头像
 */
var BaseUserHead = cc.Node.extend({
    mDoInit:false,
    mSeat:-1, ///座位号  自己0 逆时针增加
    mShowPlayer:null,//当前显示的用户
    mNameLabel:null,
    mCashLabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {

            var tempY_a = 0;//android 文字 偏移
            if(cc.sys.os == cc.sys.OS_ANDROID){
                tempY_a = 2;
            }

            //log("this.mDoInit=="+this.mDoInit)
            if(this.mDoInit){
                var bgsprite = cc.Sprite.create("#player_shadow.png");
                this.addChild(bgsprite, 0);
                this.setContentSize(bgsprite.getContentSize());
                bgsprite.setVisible(false);
                this.width = bgsprite.width;
                this.height = bgsprite.height;


                var headsprite = cc.Sprite.create("#player_avatar.png");
                headsprite.setTag(9001);
                this.addChild(headsprite, 0);

                var blockSize = cc.size(120, 28);
                var nameLabel = cc.LabelTTF.create("user", sGameData.mFontname,24);
                nameLabel.attr({
                    x : 0,
                    y : this.height/2-12+tempY_a
                });
                this.addChild(nameLabel, 5);
                this.mNameLabel = nameLabel;
                nameLabel.setVisible(false);

            }


            bRet = true;
        }
        return bRet;
    },
    //设置坐标
    setXY:function(){

    },
    //昵称按宽度缩放
    setNameScale:function(){
        if(this.mNameLabel.getContentSize().width > 120){
            this.mNameLabel.setScale(120/this.mNameLabel.getContentSize().width);
        }else{
            this.mNameLabel.setScale(1);
        }
    },
    //设置玩家
    setPlayer:function(player){
        if(player != null){
            this.mShowPlayer = player;
            this.mNameLabel.setString(getNickNameShow(this.mShowPlayer.nickName));
            //this.mCashLabel.setString(this.mShowPlayer.softCash);
            //this.scheduleOnce(this.loadImgInSecondFrame,0.05);
            this.setNameScale();
            this.loadImg();
        }
    },
    //设置位置
    setSeat:function(seat,chairId){
        this.mSeat = seat;
    },
    // 第2帧 操作
    loadImgInSecondFrame:function(){
        this.loadImg();
    },
    //设置默认图片（换了玩家，要重新设置下）
    setDefaultPic:function(){
        var headsprite = this.getChildByTag(9001)
        if(headsprite){
            headsprite.setSpriteFrame("player_avatar.png")
            headsprite.setScaleX(100/headsprite.width)
            headsprite.setScaleY(100/headsprite.height)
        }
    },
    //加载图片 type 1是需要重新下载
    loadImg:function(type){
        if(type == null){
            type = 0;
        }
        this.setDefaultPic();
        var avatar = this.mShowPlayer.avatar;
        var filepath = sGameConfig.serverResWebhttp + "avatar/" + avatar;
        //log("headloadImg--"+avatar)
        if(type==0){
            loadImg_base(avatar,avatar,filepath,this,9001,100,100,loadImgOver)
        }else{ //type 1强制更新下载
            removeLocallImg(avatar);
            filepath = filepath+"?random="+Math.random();
            loadImg_base(avatar,avatar,filepath,this,9001,100,100,loadImgOver,1)
        }
    }

});
BaseUserHead.create = function (doinit) {
    if(doinit == null){
        doinit = false
    }
    var sg = new BaseUserHead();
    if (sg) {
        sg.mDoInit = doinit;
        sg.init()
        return sg;
    }
    return null;
};
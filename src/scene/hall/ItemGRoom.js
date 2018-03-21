/**
 * Created by apple on 14-6-20.
 * 游戏房间 －大厅显示
 */
var ItemGRoom = cc.Node.extend({
    mRoom:null,//房间数据
    mIndex:0,//索引
    mPicname:"",//图
    mPicselname:"",//选中图
    mBasePointShow:"",//基本点
    mEnterPointShow:"",//进入限制
    mIsSelected:false,//是否选中
    mStar1Sprite:null,//星1
    mStar2Sprite:null,//星2
    mScale:0.9,//960的屏幕放不下
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var tempY_a = 0;//android 文字 偏移
            if(cc.sys.os == cc.sys.OS_ANDROID){
                tempY_a = 2;
            }

            var bgSprite = cc.Sprite.create("#room_icon_bg.png")
            this.addChild(bgSprite);
            bgSprite.setTag(9000)
            bgSprite.setScale(0.80);

            var ti = this.mIndex%4;
            var picname =  "i_room_r"+(ti+1)+".png"
            var picselname = "i_room_r4.png"
            var iconpos = cc.p(-56,24);
            var tscale = 1.2;
            if(this.mRoom.gameId == GAME_TYPE_DN){
                var ti = this.mIndex%3;
                picname = "i_room_dn_r"+(ti+1)+".png"
                picselname = picname
                iconpos = cc.p(-56,14);
                tscale = 0.7;
            }else if(this.mRoom.gameId == GAME_TYPE_ZJH){
                var ti = this.mIndex%3;
                picname = "i_room_zjh_r"+(ti+1)+".png"
                picselname = picname
                iconpos = cc.p(-56,24);
                tscale = 0.75;
            }
            this.mPicname = picname
            this.mPicselname = picselname

            var iconSprite = cc.Sprite.create("#"+picname)
            this.addChild(iconSprite);
            iconSprite.setPosition(iconpos);
            iconSprite.setTag(9001)
            iconSprite.setScale(tscale);

            //var titleSprite = cc.LabelTTF.create(this.mRoom.roomName, sGameData.mFontname,20);//cc.Sprite.create("#"+titlename)
            //this.addChild(titleSprite);
            ////titleSprite.setPosition(cc.p(-152,-50));
            //titleSprite.setPosition(cc.p(3,100));
            ////titleSprite.setScale(0.9);


            var dizhuSprite = cc.Sprite.create("#r_dizhu.png")
            this.addChild(dizhuSprite);
            dizhuSprite.setAnchorPoint(cc.p(0.5,1));
            dizhuSprite.setPosition(cc.p(70,-07));

            var basepointstr = sResWord.w_room_yuan
            var baselabel = cc.LabelTTF.create(basepointstr, sGameData.mFontname,20);
            baselabel.attr({
                x : 90,
                y : -55 +tempY_a
            });
            this.addChild(baselabel, 5);
            baselabel.setColor(cc.color(60,60,60));


            var basepointshow = ShowNum.create();
            basepointshow.attr({
                x:64,
                y:-55,
                anchorX: 0
            });
            this.addChild(basepointshow,1);
            basepointshow.setValue(3,formatcash(this.mRoom.basicPoint),2,1);
            this.mBasePointShow = basepointshow
            basepointshow.setScale(0.9);

            if(sGameData.mAppIsSubmitToAppStore){
                baselabel.setVisible(false);
                basepointshow.x = 85;
            }

            var enterlabel = cc.LabelTTF.create(formatcash(this.mRoom.enterPoint)+sResWord.w_enterpoint_ddz, sGameData.mFontname,20);
            enterlabel.attr({
                x : 95,
                y : -87+tempY_a,
                anchorX:1
            });
            this.addChild(enterlabel, 5)
            enterlabel.setColor(cc.color(252,193,114));
            enterlabel.setScale(0.9);

            var ollabel = cc.LabelTTF.create(this.mRoom.onlineCount+sResWord.w_room_online, sGameData.mFontname,20);
            ollabel.attr({
                x : -95,
                y : -87+tempY_a,
                anchorX:0
            });
            this.addChild(ollabel, 5)
            ollabel.setColor(cc.color(252,193,114));
            ollabel.setScale(0.9);


            //xxx
            bRet = true;
        }
        return bRet;
    },

    //选中
    choose:function()
    {
        this.mIsSelected = true;
        var sprite0 = this.getChildByTag(9000);
        if(sprite0){
            sprite0.setColor(cc.color(200,200,200));
        }
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(200,200,200));
        }
    },
    //取消选中
    unchoose:function()
    {
        this.mIsSelected = false;
        var sprite0 = this.getChildByTag(9000);
        if(sprite0){
            sprite0.setColor(cc.color(255,255,255));
        }
        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            sprite1.setColor(cc.color(255,255,255));
        }
    },
    //检测点击
    checkClick:function(pos){
        var cardsize = cc.size(230*sGameData.mRoomScale,240*sGameData.mRoomScale);
        var cpos = cc.p(this.x-cardsize.width/2,this.y-cardsize.height/2);
        var rect = cc.rect(cpos.x,cpos.y,cardsize.width,cardsize.height);
        if(cc.rectContainsPoint(rect,pos)){
            return true;
        }
        return false;
    },
    //显示星星 // type 1显示 2关闭
    showStar:function(type){

    }
});
ItemGRoom.create = function (index,room) {
    var sg = new ItemGRoom();
    if (sg ) {
        sg.mIndex = index;
        sg.mRoom = room;
        sg.init()
        return sg;
    }
    return null;
};

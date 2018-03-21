/**
 * Created by Administrator on 14-6-4.
 * 房间 项
 */
var ItemRoom = cc.Node.extend({
    mRoom:null,//房间信息
    mIndex:0,//索引
    mPicname:"",//房间图
    mPicselname:"",//选中时图
    mIsSelected:false,//是否选中
    mNeedDownRes:0,//是否需要下载资源
    mDownResState:0,//下载资源状态 0-5
    mNeedLoadicon:null,
    mPercentLabel:null,
    mType:0,//0 正常处理  1高度放大
    mScale:1,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var tempY_a = 0;//android 文字 偏移
            if(cc.sys.os == cc.sys.OS_ANDROID){
                tempY_a = 2;
            }

            var tbgSprite = cc.Sprite.create("#room_icon_bg.png");
            //var tbgSprite = cc.Sprite.create("res/gameicons/room_icon_bg.png");
            this.addChild(tbgSprite);
            tbgSprite.setPosition(cc.p(0,26));
            tbgSprite.setTag(9000)

            var tbgSprite1 = cc.Sprite.create("#room_title_bg.png");
            this.addChild(tbgSprite1);
            tbgSprite1.setPosition(cc.p(0,-150));
            var tempP = cc.p(0,0);
            var picname =  "gicon_ddz.png"
            var picselname = "gicon_ddz.png"
            var iconname = "room_title_icon_1.png";
            var tempiconP = cc.p(0,0);
            if(this.mRoom.gameId == GAME_TYPE_DDZ){
                picname = "gicon_ddz.png"
                picselname = "gicon_ddz.png"
                tempP = cc.p(0,14);
                tempiconP = cc.p(0,-2);
                iconname = "room_title_icon_1.png";
            }else if(this.mRoom.gameId == GAME_TYPE_ZJH){
                picname = "gicon_zjh.png"
                picselname = "gicon_zjh.png"
                tempP = cc.p(0,14);
                iconname = "room_title_icon_2.png";
            }else if(this.mRoom.gameId == GAME_TYPE_DN){
                picname = "gicon_dn.png"
                picselname = "gicon_dn.png"
                tempP = cc.p(0,14);
                iconname = "room_title_icon_3.png";
                tempiconP = cc.p(0,2);
            }
            this.mPicname = picname
            this.mPicselname = picselname

            //xxx
            var bgSprite = cc.Sprite.create("#"+picname)
            this.addChild(bgSprite);
            bgSprite.setPosition(tempP);
            bgSprite.setTag(9001)
            //if(bgSprite.getContentSize().width > bgSprite.getContentSize().height){
            //    bgSprite.setScale(195/bgSprite.getContentSize().width);
            //    bgSprite.setPosition(cc.p(0,80));
            //}

            var gamename = getGameName(this.mRoom.gameId);

            var iconSprite = cc.Sprite.create("#"+iconname)
            this.addChild(iconSprite);
            iconSprite.setPosition(cc.p(-76+tempiconP.x,-150+tempiconP.y));

            var namelabel = cc.LabelTTF.create(gamename, sGameData.mFontname, 28);
            if(namelabel!=null){
                namelabel.attr({
                    x:-40,
                    y:-150+tempY_a,
                    anchorX:0,
                });
                this.addChild(namelabel,1);
                namelabel.setColor(cc.color(119,43,1))
                //namelabel.enableStroke(cc.color(72,72,72), 1);
            }


            if(!isOpenGame(this.mRoom.gameId)){
                var notopenSprite = cc.Sprite.create("#i_room_notopen.png")
                this.addChild(notopenSprite);
                notopenSprite.setPosition(cc.p(0,26));
            }


            bRet = true;
        }
        return bRet;
    },

    //选中
    choose:function()
    {
        this.mIsSelected = true;

        var sprite = this.getChildByTag(9000);
        if(sprite){
            if(this.mPicselname == this.mPicname){
                sprite.setColor(cc.color(200,200,200));
            }else{
                sprite.setSpriteFrame(this.mPicselname)
            }
        }

        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            if(this.mPicselname == this.mPicname){
                sprite1.setColor(cc.color(200,200,200));
            }else{
                sprite1.setSpriteFrame(this.mPicselname)
            }
        }
    },
    //取消选中
    unchoose:function()
    {
        this.mIsSelected = false;

        var sprite = this.getChildByTag(9000);
        if(sprite){
            if(this.mPicselname == this.mPicname){
                sprite.setColor(cc.color(255,255,255));
            }else {
                sprite.setSpriteFrame(this.mPicname)
            }
        }

        var sprite1 = this.getChildByTag(9001);
        if(sprite1){
            if(this.mPicselname == this.mPicname){
                sprite1.setColor(cc.color(255,255,255));
            }else {
                sprite1.setSpriteFrame(this.mPicname)
            }
        }
    },
    //点击检测
    checkClick:function(pos){
        var cardsize = cc.size(288,360);
        var cpos = cc.p(this.x-288/2,this.y-cardsize.height/2);
        var rect = cc.rect(cpos.x,cpos.y,cardsize.width,cardsize.height*this.mScale);
        if(cc.rectContainsPoint(rect,pos)){
            return true;
        }
        return false;
    }
});
ItemRoom.create = function (room,type) {
    if(type == null){
        type = 0;
    }
    var sg = new ItemRoom();
    if (sg) {
        sg.mType = type
        sg.mRoom = room;
        sg.init()
        return sg;
    }
    return null;
};

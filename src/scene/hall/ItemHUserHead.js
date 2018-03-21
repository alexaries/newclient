/**
 * Created by Administrator on 14-5-27.
 */
//头像
var ItemHUserHead = BaseUserHead.extend({
    mChairIdx:0,//椅子号
    mTableType:0,//桌子类型
    mUHPos:[],//用户头像位置
    mBaseNode:null,//基本节点
    init:function () {
        var bRet = false;
        if (this._super()) {

            var tempY_a = 0;//android 文字 偏移
            if(cc.sys.os == cc.sys.OS_ANDROID){
                tempY_a = 2;
            }

            var node = cc.Node.create();
            this.addChild(node);
            this.mBaseNode = node;

            var bgsprite = cc.Sprite.create("#player_shadow.png");
            this.mBaseNode.addChild(bgsprite, 0);
            bgsprite.setTag(9002);
            this.setContentSize(bgsprite.getContentSize());
            //bgsprite.setVisible(false);

            this.width = bgsprite.width;
            this.height = bgsprite.height;

            var headsprite = cc.Sprite.create("#player_avatar.png");
            headsprite.setTag(9001);
            this.mBaseNode.addChild(headsprite, 0);

            var blockSize = cc.size(120, 28);
            var nameLabel = cc.LabelTTF.create("user", sGameData.mFontname,24);
            nameLabel.attr({
                x : 0,
                y : this.height/2-12+tempY_a ,
                anchorY:0.5
            });
            this.mBaseNode.addChild(nameLabel, 5);
            nameLabel.setTag(8001);
            this.mNameLabel = nameLabel;

            //不是当前桌用标示代替头像
            var iconsprite = cc.Sprite.create("#desks_sit_point.png");
            iconsprite.setTag(9010);
            this.addChild(iconsprite, 0);


            bRet = true;
        }
        return bRet;
    },
    //这是位置
    setXY:function(){
        var size =  cc.size(700, 450)
        if(this.mTableType == TABLE_TYPE_5){
            var pos0 = cc.p(size.width/2,size.height/2 - 120)
            var pos1 = cc.p(size.width/2 + 250,size.height/2 - 50)
            var pos2 = cc.p(size.width/2 + 210,size.height/2 + 160)
            var pos3 = cc.p(size.width/2 - 210,size.height/2 + 160)
            var pos4 = cc.p(size.width/2 - 250,size.height/2 - 50)
            var pos =  [pos0,pos1,pos2,pos3,pos4];
            this.mUHPos = pos;
        }else{
            var pos0 = cc.p(size.width/2,size.height/2 - 135);
            var pos1 = cc.p(size.width/2-170,size.height/2 - 135);
            var pos2 = cc.p(size.width/2-290,size.height/2 - 30);
            var pos3 = cc.p(size.width/2-260,size.height/2 + 130);
            var pos4 = cc.p(size.width/2-140,size.height/2 + 175);
            var pos5 = cc.p(size.width/2+140,size.height/2 + 175);
            var pos6 = cc.p(size.width/2+260,size.height/2 + 130);
            var pos7 = cc.p(size.width/2+290,size.height/2 - 30);
            var pos8 = cc.p(size.width/2+170,size.height/2 -135);
            var chairpos = [pos0,pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8];
            this.mUHPos = chairpos;
        }
        var pos = this.mUHPos[this.mChairIdx];
        this.x = pos.x;
        this.y = pos.y;
    },
    //设置玩家
    setPlayer:function(player){
        if(player != null){
            this.mShowPlayer = player;
            this.mNameLabel.setString(this.mShowPlayer.nickName);
            this.setNameScale();
            //this.loadImg();
        }
    },
    //显示头像 type 1 真实头像 2标示存在的图标
    showHead:function(type){
        var showreal = false
        if(type == 1){
            showreal = true;
        }if(type == 3){
            showreal = true;
        }
        if(showreal){
            this.loadImg();
        }

        if(type == 1){
            this.mBaseNode.stopAllActions();
            this.mBaseNode.setScale(0.1);
            var delay1 = cc.DelayTime.create(0.5);
            var scaleanim = cc.ScaleTo.create(0.3,1);
            var callback = cc.CallFunc.create(this.hiddenIcon, this);
            var actions = cc.Sequence.create(delay1,callback, scaleanim);
            this.mBaseNode.runAction(actions);

        }else if(type == 2){
            this.mBaseNode.stopAllActions();
            var iconsprite = this.getChildByTag(9010)
            iconsprite.setVisible(!showreal)
            this.mBaseNode.setVisible(showreal)
        }else if(type == 3){
            this.mBaseNode.stopAllActions();
            this.hiddenIcon();
            this.mBaseNode.setScale(1);
        }
    },
    //隐藏标示
    hiddenIcon:function(){
        var iconsprite = this.getChildByTag(9010)
        iconsprite.setVisible(false)
        this.mBaseNode.setVisible(true)
    },
    //加载头像
    loadImg:function(){
        if(this.mShowPlayer){
            this.setDefaultPic();
            var avatar = this.mShowPlayer.avatar;
            var filepath = sGameConfig.serverResWebhttp + "avatar/" + avatar;
            //log("headloadImg--"+avatar)
            loadImg_base(avatar,avatar,filepath,this.mBaseNode,9001,120,120,loadImgOver)
        }
    }

});

ItemHUserHead.create = function (tabletype) {
    var sg = new ItemHUserHead();
    if (sg) {
        sg.mTableType = tabletype;
        sg.init()
        return sg;
    }
    return null;
};
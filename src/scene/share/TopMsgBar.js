/**
 * Created by apple on 14-7-8.
 * 游戏顶部 跑马灯
 */
var TopMsgBar = cc.Node.extend({
    mMsgLabel:null,//消息显示
    mMsgs:[],//消息
    mIsShowMsging:false,//是否增加显示
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx


            var itemsize1 = cc.size(546,42);
            //var bgSprite = cc.Sprite.create("#game_notifyBar.png")
            var bgSprite = cc.Scale9Sprite.create();
            bgSprite.initWithSpriteFrameName("game_notifyBar.png",cc.rect(21,15,152,16))
            bgSprite.setContentSize(itemsize1)
            bgSprite.setAnchorPoint(cc.p(0.5,1));
            this.addChild(bgSprite);
            this.setContentSize(bgSprite.getContentSize());

            var iconsprite = cc.Sprite.create("#icon_sysmsg_msg1.png");
            this.addChild(iconsprite);
            iconsprite.setAnchorPoint(cc.p(0.5,0.5));
            iconsprite.setPosition(cc.p(-itemsize1.width/2+35,-20));

            var itemsize = bgSprite.getContentSize();

            var node = cc.Node.create();
            node.setContentSize(bgSprite.getContentSize());

            var stencil = this.shape()

            var clipingnode = cc.ClippingNode.create();
            clipingnode.setContentSize(itemsize)
            clipingnode.setStencil(stencil);
            clipingnode.addChild(node);
            this.addChild(clipingnode)

            var msg = sResWord.w_tip_welcome;
            var idlabel = cc.LabelTTF.create(msg,"STHeiti" , 24);//sGameData.mFontname
            idlabel.setAnchorPoint(cc.p(1,0.5))
            idlabel.setPosition(cc.p(0,-20))
            node.addChild(idlabel,2);

            this.mMsgLabel = idlabel;



            bRet = true;
        }
        return bRet;
    },
    //添加显示消息
    addShowMsg:function(msg){
        this.mMsgs.push(msg);
        this.showMsg();
    },
    //显示消息
    showMsg:function(){
        if(!this.mIsShowMsging){
            this.mIsShowMsging = true;

            var msg = this.mMsgs[0];
            this.mMsgs.splice(0,1);
            var msglabel = this.mMsgLabel
            if(msglabel){
                msglabel.setString(msg);
                var size = cc.director.getWinSize();

                var tsize = msglabel.getContentSize()
                var p1 = cc.p(this.width/2+tsize.width,-20);
                msglabel.setPosition(p1)
                var p2 = cc.p(-this.width/2+50,-20)
                var time = (this.width+tsize.width-50)/50.0
                var move1anim = cc.MoveTo.create(time, p2)  //17s
                var callback = cc.CallFunc.create(this.msgMoveEnd,this);
                var seq =cc.Sequence.create(move1anim,callback);
                msglabel.runAction(seq)
            }
        }
    },
    //消息移动结束
    msgMoveEnd:function(){
        this.mIsShowMsging = false;
        if(this.mMsgs.length > 0){
            this.showMsg();
        }else{
            this.setVisible(false);
        }
    },
    //显示范围
    shape:function () {
        var shape = cc.DrawNode.create();
        var triangle = [cc.p(-this.width/2+65, -this.height),cc.p(-this.width/2+65, 0), cc.p(this.width/2-15,0), cc.p(this.width/2-15, -this.height)];
        var green = cc.color(0, 0, 0, 255);
        shape.drawPoly(triangle, green, 3, green);
        return shape;
    }
});
TopMsgBar.create = function () {
    var sg = new TopMsgBar();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

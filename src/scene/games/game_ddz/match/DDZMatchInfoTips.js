/**
 * Created by apple on 14-9-10.
 */

var DDZMatchInfoTips = cc.Node.extend({
    mIndex:0, //某位置
    mInfos:[],
    mMsgLabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();


            this.mInfos = [sResWord.w_match_info1,sResWord.w_match_info2];
            var info = this.mInfos[this.mIndex];

            var tips = sResWord.w_little_tip+"："+info;


            var itemsize = cc.size(690,50)
            this.setContentSize(itemsize)

            var node = cc.Node.create();
            node.setContentSize(itemsize);

            var stencil = this.shape()

            var clipingnode = cc.ClippingNode.create();
            clipingnode.setContentSize(itemsize)
            clipingnode.setStencil(stencil);
            clipingnode.addChild(node);
            //clipingnode.setAlphaThreshold(1);
            this.addChild(clipingnode)
            //clipingnode.setInverted(true);

            var msg = sResWord.w_tip_welcome;
            var tipLabel = cc.LabelTTF.create(tips, sGameData.mFontname,24);
            tipLabel.setAnchorPoint(cc.p(0.5,0.5))
            tipLabel.setPosition(cc.p(0,0))
            node.addChild(tipLabel,2);
            tipLabel.setColor(cc.color(240,236,139))
            this.mMsgLabel = tipLabel;

            //this.showMsg();

            this.scheduleOnce(this.showMsg,3);//

            //xxx
            bRet = true;
        }
        return bRet;
    },
    showMsg:function(){
        this.mIndex++;
        if(this.mIndex>this.mInfos.length-1){
            this.mIndex = 0;
        }
        var msg = this.mInfos[this.mIndex];
        var msglabel = this.mMsgLabel
        if(msglabel){

            var size = cc.director.getWinSize();

            var tsize = msglabel.getContentSize()
            var p1 = cc.p(0,0);
            msglabel.setPosition(p1)
            var p2 = cc.p(0,50)
            var time = 0.5
            var p3 = cc.p(0,-50)
            var setNewmsg = function(){
                msglabel.setString(sResWord.w_little_tip+"："+msg)
                msglabel.setPosition(p3)
            }
            var move1anim = cc.MoveTo.create(time, p2)  //17s
            var move2anim = cc.MoveTo.create(time, p1)  //17s
            var callback1 = cc.CallFunc.create(setNewmsg,this);
            var delayanim = cc.DelayTime.create(3);
            var callback = cc.CallFunc.create(this.msgMoveEnd,this);
            var seq =cc.Sequence.create(move1anim,callback1,move2anim,delayanim,callback);

            msglabel.runAction(seq)
        }
    },
    msgMoveEnd:function(){
        this.showMsg();
    },
    stopShowAnim:function(){
        var msglabel = this.mMsgLabel
        if(msglabel){
            msglabel.stopAllActions();
        }
    },
    shape:function () {
        var shape = cc.DrawNode.create();
        var triangle = [cc.p(-this.width/2, -this.height/2),cc.p(-this.width/2, this.height/2), cc.p(this.width/2, this.height/2), cc.p(this.width/2, -this.height/2)];
        var green = cc.color(0, 0, 0, 255);
        shape.drawPoly(triangle, green, 3, green);
        return shape;
    }
});
DDZMatchInfoTips.create = function () {
    var sg = new DDZMatchInfoTips();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

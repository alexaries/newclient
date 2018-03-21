/**
 * Created by Administrator on 14-6-3.
 * 滚动条
 */
var ScrollBar = cc.Node.extend({
    mSize:null,//大小
    mBGSprite:null,//背景
    mIconSprite:null,//滚动块
    mType:null,//类型
    mShowBg:false,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            this.setContentSize(cc.size(7,this.mSize.height));

            var node = cc.Node.create();
            //node.setAnchorPoint(cc.p(0.5,1))
            node.setContentSize(cc.size(7,this.mSize.height));
            //this.addChild(node);

            var stencil = this.shape()

            var clipingnode = cc.ClippingNode.create();
            clipingnode.setContentSize(cc.size(7,this.mSize.height))
            clipingnode.setStencil(stencil);
            clipingnode.addChild(node);
            //clipingnode.setInverted(true);
            //clipingnode.setAlphaThreshold(0);
            this.addChild(clipingnode)



            var bgSprite = cc.Scale9Sprite.create();
            bgSprite.initWithSpriteFrameName("scrollbar.png")
            bgSprite.setContentSize(this.mSize)
            bgSprite.setAnchorPoint(cc.p(0.5,1))
            node.addChild(bgSprite)
            bgSprite.setOpacity(80);
            this.mBGSprite = bgSprite;
            bgSprite.setVisible(this.mShowBg);

            var barpic = "#scrollbar1.png"

            var iconsprite = cc.Sprite.create(barpic);
            iconsprite.setAnchorPoint(cc.p(0.5,1))
            node.addChild(iconsprite)
            this.mIconSprite = iconsprite;
            iconsprite.setOpacity(160);



            //xxx
            bRet = true;
        }
        return bRet;
    },
    //设置百分比
    setPercent:function(per){
        if(per > 1.08){
            per = 1.08;
        }else if(per < -0.08){
            per = -0.08
        }
        var iconheight = this.mIconSprite.getContentSize().height
        var allheight = this.mSize.height - iconheight
        var localheight = allheight*per
        //log("setPercent=="+per+"=="+localheight)
        this.mIconSprite.setPosition(cc.p(0,-localheight))

    },
    //显示范围
    shape:function () {
        var shape = cc.DrawNode.create();
        var triangle = [cc.p(-5, -this.mSize.height),cc.p(5, -this.mSize.height), cc.p(10, 0), cc.p(-10, 0)];
        var green = cc.color(0, 255, 0, 255);
        shape.drawPoly(triangle, green, 3, green);
        return shape;
    }
});
ScrollBar.create = function (size,showbg) {
    if(!showbg){
        showbg = true;
    }
    var sg = new ScrollBar();
    if (sg ) {
        sg.mSize = size;
        sg.mShowBg = showbg;
        sg.init()
        return sg;
    }
    return null;
};

/**
 * Created by mac_apple on 16/2/24.
 */

var BaseCircleHead = cc.Node.extend({
    mIndex:0, //某位置
    mRadius:60,//半径
    mPicwidth:120,
    mBaseNode:null,
    mAvatar:"",
    mType:0, //0 圆 1圆角矩形
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx

            var itemsize = cc.size(this.mRadius*2,this.mRadius*2);

            var node = cc.Node.create();
            node.setContentSize(itemsize);
            this.mBaseNode = node;

            var stencil = this.shape()

            var clipingnode = cc.ClippingNode.create();
            clipingnode.setContentSize(itemsize)
            clipingnode.setStencil(stencil);
            clipingnode.addChild(node);
            if(this.mType == 1) { //用图时设置
                clipingnode.alphaThreshold = 0.5;
            }

            this.addChild(clipingnode)


            var avatarimg = cc.Sprite.create("#main_player_avatar.png");
            avatarimg.attr({
                x:0,
                y:0
            });
            node.addChild(avatarimg);
            avatarimg.setTag(9900);
            avatarimg.setScaleX(this.mPicwidth/avatarimg.width);
            avatarimg.setScaleY(this.mPicwidth/avatarimg.height);

            this.loadImg();

            bRet = true;
        }
        return bRet;
    },
    //消息显示的区域，超出不显示 （android 要 单独 设置 gl）
    // 模版
    shape:function () {
        var shape = null;
        if(this.mType == 1){  //圆角矩形 直接 用图，（用点会莫名凹进去一块）
            var tsize = cc.size(this.mRadius*2-3 , this.mRadius*2-3);
            shape = createSysPanel_yellow(tsize);
        }else{
            var green = cc.color(0, 0, 0, 255);
            //顶点坐标个数，在需要画大圆的时候，这个值就要相应变大一点
            //显示宽高很小时，显示的点太多反而会出问题
            shape = cc.DrawNode.create();
            var vertices = setCircleArr(this.mRadius,60); //小圆60个点
            shape.drawPoly(vertices, green, 1, green);
        }
        return shape;
    },
    //加载图片
    loadImg:function(){
        var avatar = this.mAvatar;
        var filepath = sGameConfig.serverResWebhttp + "avatar/" + avatar;
        log("loadImg--"+avatar)
        loadImg_base(avatar,avatar,filepath,this.mBaseNode,9900,this.mPicwidth,this.mPicwidth,loadImgOver)
    }
});
BaseCircleHead.create = function (radius,type,avatar,picwidth) {
    if(radius == null){
        radius = 60;
    }
    if(picwidth == null){
        picwidth = radius*2+2;
    }
    if(avatar == null){
        avatar = sGameData.mUser.avatar
    }
    if(type == null){
        type = 0;
    }
    var sg = new BaseCircleHead();
    if (sg) {
        sg.mRadius = radius;
        sg.mPicwidth = picwidth;
        sg.mAvatar = avatar;
        sg.mType = type;
        sg.init()
        return sg;
    }
    return null;
};

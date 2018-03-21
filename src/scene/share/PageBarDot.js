/**
 * Created by apple on 14-6-23.
 * 分页（点显示）
 */
var PageBarDot = cc.Node.extend({
    mAllPage:0,//总页数
    mCurrPage:0,//当前页
    mShowDots:[],//显示点
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx
            var spaceX = 60;
            var starX = -(this.mAllPage-1)/2*spaceX;
            this.mShowDots = [];
            for(var i=0;i<this.mAllPage;i++){
                var pic = "#hall_dot.png";
                if(i==0){
                    pic = "#hall_dot_sel.png";
                }
                var dot = cc.Sprite.create(pic);
                this.addChild(dot);
                dot.setScale(0.8);
                dot.setPosition(cc.p(starX+spaceX*i,0));
                this.mShowDots.push(dot);
            }
            bRet = true;
        }
        return bRet;
    },
    //设置页数
    setPage:function(page){
        if(this.mCurrPage != page){
            var lastdot = this.mShowDots[this.mCurrPage];
            lastdot.setSpriteFrame("hall_dot.png");
            lastdot.setScale(0.8);
            this.mCurrPage = page;
            var nowdot = this.mShowDots[this.mCurrPage];
            nowdot.setSpriteFrame("hall_dot_sel.png");
            nowdot.setScale(0.8);
        }
    }
});
PageBarDot.create = function (allpage) {
    var sg = new PageBarDot();
    if (sg ) {
        sg.mAllPage = allpage;
        sg.init()
        return sg;
    }
    return null;
};

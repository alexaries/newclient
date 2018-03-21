/**
 * Created by apple on 14-9-11.
 */

var DDZMatchPrize = cc.Node.extend({
    mIndex:0, //某位置
    mMsgLabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var bgsize = cc.size(709,548);
            var point_panel_close = cc.p(4,-8);//边线的高度
            var bgsprite = cc.Sprite.create("#match_result_bg.png")
            this.addChild(bgsprite)

            var titleLabel = cc.LabelTTF.create(sResWord.w_match_prizes, sGameData.mFontname,30);
            titleLabel.attr({
                x : 0,
                y : 225,
                anchorY:0.5
            });
            this.addChild(titleLabel, 5);
            //titleLabel.setColor(cc.color(255,255,0))


            var msg = sResWord.w_match_prizelist;
            var msglabel = cc.LabelTTF.create(msg, sGameData.mFontname,24,
                cc.size(675,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            msglabel.attr({
                x : 0,
                y : 147,
                anchorY:0.5
            });
            this.addChild(msglabel, 5);
            this.mMsgLabel = msglabel;


            //添加按钮 关闭
            var closeSprite = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_close,cc.p(0.5,0.5),28,0);
            var closeSprite1 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_close,cc.p(0.5,0.5),28,1);
            var closeSprite2 = ButtonSpriteWithWordInner("#game_blueBtn.png",sResWord.w_close,cc.p(0.5,0.5),28,0);
            var closeItem = cc.MenuItemSprite.create(
                closeSprite,
                closeSprite1,
                closeSprite2,
                this.gotoClose,this);
            closeItem.attr({
                x:0,
                y:-bgsize.height/2+55,
                anchorX:0.5,
                anchorY:0.5
            });

            var menu = cc.Menu.create(closeItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 3);


            var vsize = cc.size(670,290);
            var scrollview = cc.ScrollView.create(vsize);
            var layer = cc.Layer.create();
            //提示
            this.mMsg = sGameData.mCurrMatch.prizeInfo;
            var msg = this.mMsg
            if(msg.length > 0){
                msg = formatMsgFromNet(msg);
                this.mMsg = msg
            }
            var pMsgLabel = cc.LabelTTF.create(this.mMsg,sGameData.mFontname, 24,//字体  ，字体大小
                cc.size(650,0),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_LEFT,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pMsgLabel.setTag(8002);
            pMsgLabel.setAnchorPoint(cc.p(0,1));
            layer.addChild(pMsgLabel,1);
            this.mMsgLabel = pMsgLabel;
            var csize = pMsgLabel.getContentSize();
            pMsgLabel.setPosition(cc.p(0,csize.height));
            layer.setContentSize(csize);
            scrollview.setContentSize(csize);
            scrollview.setViewSize(vsize);
            scrollview.setContainer(layer);
            scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            scrollview.setDelegate(this);
            scrollview.setPosition(cc.p(-vsize.width/2,-vsize.height/2-17));

            this.addChild(scrollview,8);
            scrollview.setTag(7888)
            this.mScrollView = scrollview

            scrollview.setContentOffset(cc.p(0,290-csize.height));


//            var barsize = cc.size(4,185);
//            var scroolbar0 = ScrollBar.create(barsize);
//            scroolbar0.setPosition(cc.p(-vsize.width/2-195+315,-121+186));
//            this.addChild(scroolbar0,5,15888);
//            if(csize.height>vsize.height){
//                scroolbar0.setVisible(true)
//            }else{
//                scroolbar0.setVisible(false)
//            }



            //xxx
            bRet = true;
        }
        return bRet;
    },
    gotoClose:function(){
        this.setVisible(false);
    },
    updateInfo:function(name,rank){

    },
    scrollViewDidScroll:function (view) {
        //this.checkTableScrollBar();
    },
    scrollViewDidZoom:function (view) {
    },
    //显示table的滚动条
    checkTableScrollBar:function(){
        var size = cc.director.getWinSize();

        var tsize = cc.size(670,290);
        if(this.mScrollView){
            var tableheight = this.mScrollView.getContentSize().height;
            var tableViewHeight = tsize.height
            var minOffset = tableViewHeight-tableheight;
            var value = 0;//(tableViewHeight/tableheight);
            value = (this.mScrollView.getContentOffset().y-minOffset)/(0-minOffset);
            var tableslider = this.getChildByTag(15888);
            if(tableslider){
                if(tableheight>tableViewHeight){
                    tableslider.setVisible(true)
                }else{
                    tableslider.setVisible(false)
                }
                tableslider.setPercent(value);
            }
        }
    }
});
DDZMatchPrize.create = function () {
    var sg = new DDZMatchPrize();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

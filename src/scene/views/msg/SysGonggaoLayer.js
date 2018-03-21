/**
 * Created by apple on 14-8-15.
 * 系统 公告
 */
var SysGonggaoLayer = cc.Layer.extend({
    mIndex:0, //某位置
    mName:"",//标题
    mMsg:"",//消息内容
    mType:0, //类型
    mFrom:0, //子类型
    mData:null,//传递来的数据
    mOkItem:null,//同意按钮
    mNoItem:null,//不同意按钮
    _listener:null,//监听
    mMsgLabel:null,//消息显示
    mUseRichText:true,//使用富文本
    mRichItems:[],
    mScroolbar:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var winsize = cc.director.getWinSize();

            var colorlayer = cc.LayerColor.create(cc.color(0,0,0,80))
            colorlayer.setPosition(cc.p(-winsize.width/2,-winsize.height/2));
            this.addChild(colorlayer);

            var size_panel = cc.size(600,440);
            var size_panel_inner = cc.size(596, 306);


            this.mRichItems = [];


            var  bgimg = createSysPanel(size_panel);
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            var size = this.getContentSize();

            var innerimg = createSysPanel_yellow_zj(size_panel_inner);
            innerimg.setPosition(cc.p(0,13));
            this.addChild(innerimg);

            //var titlebg = cc.Sprite.create("#notice_title.png");
            //titlebg.setPosition(cc.p(0,size.height*0.5-16));
            //this.addChild(titlebg);

            //提示
            this.mName = sResWord.w_notice;
            var pNameLabel = cc.LabelTTF.create(this.mName,sGameData.mFontname, 28,//字体  ，字体大小
                cc.size(430,35),  //设置文本的宽高
                cc.TEXT_ALIGNMENT_CENTER,//水平居右对齐
                cc.VERTICAL_TEXT_ALIGNMENT_CENTER);//垂直对齐
            pNameLabel.setPosition(cc.p(0,size.height*0.5-22-5));
            pNameLabel.setTag(8001);
            this.addChild(pNameLabel,1);

            var vsize = cc.size(591, 306)
            var scrollview = cc.ScrollView.create(vsize);
            var layer = cc.Layer.create();


            var pMsgLabel = null;
            var csize = cc.size(0,0);

            var maxheight = 0;
            this.mMsg = "notice!!!";
            var richText = ccui.RichText.create();
            richText.ignoreContentAdaptWithSize(false);
            richText.setContentSize(cc.size(550, 0));

            this.addToRichText(1,this.mMsg,cc.color.WHITE,24,richText,maxheight);

            layer.addChild(richText,1);
            var pMsgLabel = richText;
            this.mMsgLabel = richText;

            pMsgLabel.setContentSize(cc.size(750, maxheight));
            csize = cc.size(550, maxheight);
            log("msg a- csize=="+csize.width+"_"+csize.height);
            pMsgLabel.setPosition(cc.p(375,csize.height/2));//


            layer.setContentSize(csize);
            scrollview.setContentSize(csize);
            scrollview.setViewSize(vsize);
            scrollview.setContainer(layer);
            scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            scrollview.setDelegate(this);
            scrollview.setPosition(cc.p(-vsize.width/2,-141));

            this.addChild(scrollview,8);
            scrollview.setTag(7888)
            this.mScrollView = scrollview

            scrollview.setContentOffset(cc.p(0,306-csize.height));

            var barsize = cc.size(4,306);
            var scroolbar = ScrollBar.create(barsize);
            scroolbar.setPosition(cc.p(size_panel_inner.width/2-2,size_panel_inner.height/2+13));
            this.addChild(scroolbar,5,16888);
            scroolbar.setVisible(false)


            ///添加按钮 关闭
            var closeSprite = cc.Sprite.create("#g_close_btn.png");
            var closeSprite1 = cc.Sprite.create("#g_close_btn.png");
            closeSprite1.setColor(cc.color(200, 200, 200));
            var closeSprite2 = cc.Sprite.create("#g_close_btn.png");
            var closeItem = cc.MenuItemSprite.create(
                closeSprite,
                closeSprite1,
                closeSprite2,
                this.clickOK,this);
            closeItem.attr({
                x:size.width/2 -16,
                y:size.height*0.5 -50 ,
                anchorX:1,
                anchorY:0
            });

            //添加
            var okSprite = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_ok,cc.p(0.5,0.5),28);
            var okSprite1 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_ok,cc.p(0.5,0.5),28,1);
            var okSprite2 = ButtonSpriteWithWordInner("#btn_blue_1.png",sResWord.w_ok,cc.p(0.5,0.5),28);
            var okItem = cc.MenuItemSprite.create(
                okSprite,
                okSprite1,
                okSprite2,
                this.clickOK,this);
            okItem.setPosition(cc.p(0, -size.height*0.5+40));//设定位置

            var menu = cc.Menu.create(closeItem,okItem);
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);
            //xxx
            bRet = true;
        }
        return bRet;
    },
    //移出监听
    removeListeners:function(){
        //cc.eventManager.removeListener(this._listener);
        cc.eventManager.removeListeners(this);
    },

    //清除把内容添加到richtext
    addToRichText:function(tag,msg,color,fontsize,richText,maxHeight){

        var label1 = cc.LabelTTF.create(msg,sGameData.mFontname, fontsize,
            cc.size(550,0),  //设置文本的宽高
            cc.TEXT_ALIGNMENT_LEFT,//水平居右对齐
            cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        label1.setColor(color);
        label1.setAnchorPoint(cc.p(0.5,1));
        var re1 = ccui.RichElementCustomNode.create(tag,color,255,label1);
        var h1 = label1.getContentSize().height;
        log("rei height == "+h1);
        maxHeight += h1;
        richText.pushBackElement(re1);
        this.mRichItems.push(re1);
        return maxHeight;
    },
    //清除richtext
    cleanRichText:function(){
        for(var i=0;i<this.mRichItems.length;i++){
            var re = this.mRichItems[i];
            this.mMsgLabel.removeElement(re);
        }
        this.mRichItems = [];
    },

    /**
     * 显示通知
     */
    showNotice:function(name,msg,type,from,data){
        this.mName = name;
        this.mMsg = msg;
        this.mType = type;
        this.mFrom = from;
        this.mData = data

        var vsize = cc.size(591, 306)

        this.cleanRichText();
        var maxheight = 0;
        var richText = this.mMsgLabel;

        var pNameLabel = this.getChildByTag(8001);
        if(pNameLabel){
            pNameLabel.setString(this.mName);
        }

        //var t = getGameSysConfig("billboard");
        var datastr = this.mMsg;
        //datastr =  "test1[font:28]test2[color:0x63b4dC]aaaa1[font:28]aaaa2[color:0xff0000][font:25]aaaa3\naaaa4[color:0xffFF00]aaaaaa";

        var datas = dealWithColorMsg(datastr,1);
        for(var i = 0;i<datas.length;i++){
            var data = datas[i];
            var color = getMsgColor(data.color,0);
            var fontsize = Number(data.fontsize);
            maxheight = this.addToRichText(1+i,data.content,color,fontsize,richText,maxheight);
        }

        richText.setContentSize(cc.size(550, maxheight));
        var csize = cc.size(550, maxheight);
        richText.setPosition(cc.p(275+20,csize.height/2));

        var layer = this.mScrollView.getContainer();
        layer.setContentSize(csize);
        this.mScrollView.setContentSize(csize);
        if(csize.height > vsize.height){
            this.mScrollView.setContentOffset(cc.p(0,vsize.height-csize.height));
        }else{
            this.mScrollView.setContentOffset(cc.p(0,vsize.height-csize.height));
        }

        setClickSwallows(this);
    },
    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")

    },
    onTouchMoved_g:function(pos){

    },
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")

    },
    //滚动接口
    scrollViewDidScroll:function (view) {
        this.checkTableScrollBar();
    },
    scrollViewDidZoom:function (view) {
    },
    //显示table的滚动条
    checkTableScrollBar:function(){
        var size = cc.director.getWinSize();
        var tsize = cc.size(591, 306)
        if(this.mScrollView){
            var tableheight = this.mScrollView.getContentSize().height;
            var tableViewHeight = tsize.height
            var minOffset = tableViewHeight-tableheight;
            var value = 0;//(tableViewHeight/tableheight);
            value = (this.mScrollView.getContentOffset().y-minOffset)/(0-minOffset);
            var tableslider = this.getChildByTag(16888);
            if(tableslider){
                if(tableheight>tableViewHeight){
                    tableslider.setVisible(true)
                }else{
                    tableslider.setVisible(false)
                }
                tableslider.setPercent(value);
            }
        }
    },
    //确定
    clickOK:function(){
        log("clickOK--"+this.mType+"="+this.mFrom)
        playClickSound();
        sGameData.mClickState = 2;
        this.setVisible(false);
        this.removeListeners();
        sGameData.mIsShowNoticeing = false;

    }


});
SysGonggaoLayer.create = function () {
    var sg = new SysGonggaoLayer();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

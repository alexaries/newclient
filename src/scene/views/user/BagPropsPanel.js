/**
 * Created by apple on 15-12-25.
 */

var BagPropsPanel = cc.Node.extend({
    mIndex:0, //某位置
    mPageBar:null,//分页显示
    mScrollView: null,//滚动视图
    mCurrPage: 0,//当前页
    mCanDarg:false,//能否拖动
    mStartPos: cc.p(0, 0),//点击时开始坐标
    mHasDrag: false,//是否已经拖动
    mPropsShows:[],//道具显示
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var csize = cc.size(size.width-20,size.height-92-20);
            //xxx
            //添加按钮 tab1
            var rtabsize = cc.size(180,58);

            var rtabtitle = ButtonSpriteWithWordInner("#panel_t4_tab.png", sResWord.w_bagprops, cc.p(0.5,0.5),32,0);
            rtabtitle.setPosition(cc.p(350+290, size.height-97 -17-5));
            rtabtitle.setAnchorPoint(cc.p(0.5, 1));
            this.addChild(rtabtitle, 10);

            var rtab2sprite = ButtonSpriteWithWordInner("#panel_t4_tab1.png", sResWord.w_playerinfo, cc.p(0.5,0.5),32,0);
            var rtab2sprite1 = ButtonSpriteWithWordInner("#panel_t4_tab1.png", sResWord.w_playerinfo, cc.p(0.5,0.5),32,1);
            var rtab2sprite2 = ButtonSpriteWithWordInner("#panel_t4_tab1.png", sResWord.w_playerinfo, cc.p(0.5,0.5),32,0);
            var rtab2Item = cc.MenuItemSprite.create(
                rtab2sprite,
                rtab2sprite1,
                rtab2sprite2,
                this.clickTabr2,this);
            rtab2Item.setAnchorPoint(cc.p(0.5,1));
            rtab2Item.setPosition(cc.p(350+100,size.height-97 -17-6));



            var menu = null;

            menu = cc.Menu.create(rtab2Item);

            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 10);


            this.showRightInfo();

            this.scheduleOnce(this.initInSecondFrame,0.05);

            bRet = true;
        }
        return bRet;
    },
    showRightInfo:function(){
        var size = cc.director.getWinSize();
        var csize = cc.size(size.width-20,size.height-92-20);

        var tempY_a = 0;//android 文字 偏移
        if(cc.sys.os == cc.sys.OS_ANDROID){
            tempY_a = 2;
        }


        var rsize = cc.size(size.width-300-61,size.height-92-50-68);
        var rightbg = createSysPanel_t5(rsize,true);
        rightbg.setPosition(cc.p(size.width-25,size.height-97 -17-65));
        rightbg.setAnchorPoint(cc.p(1,1));
        this.addChild(rightbg);




    },
    clickTabr2:function(){
        log("clickTabr2")
        if(!checkButtonEnable()){
            return;
        }
        playClickSound();
        sGameData.mPlayerInfoLayer.showRightView(1);
    },
    //第2帧初始化
    initInSecondFrame:function(){
        dealClickTouch(this);
        this.initScene();
    },
    //退出时执行
    onExit:function(){
        this._super();
        this.removeListeners();
    },
    //移出监听
    removeListeners:function(){
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }else if ('mouse' in cc.sys.capabilities ){
            cc.eventManager.removeListeners(this);
        }
    },
    //初始化场景显示
    initScene:function(){

        var size = cc.director.getWinSize();

        var upropslen = sGameData.mUserPropsList.length
        var plist = sGameData.mUserPropsList;

        //page 12

        var allpage = Math.floor((upropslen+11)/12);

        var vsize = cc.size(size.width-300-66,400);

        var twidth = vsize.width/4;


        //var tempX = (size.width*0.92-414)/2;
        var csize = cc.size(vsize.width*allpage,400)
        log("scrollview view w=="+vsize.width);
        log("scrollview content w=="+csize.width);
        var scrollview = cc.ScrollView.create(vsize);
        var layer = cc.Layer.create();
        layer.setContentSize(csize);
        scrollview.setContentSize(csize);
        scrollview.setViewSize(vsize);
        scrollview.setContainer(layer);
        scrollview.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        scrollview.setDelegate(this);
        scrollview.setPosition(cc.p(336,(size.height-406)/2-55));
        this.mPropsShows = [];
        for (var i = 0; i <upropslen; ++i) {
            var uprops = plist[i];
            var itemprops = ItemUserProps.create(i,uprops);
            itemprops.attr({
                //x:size.width*0.155+size.width*0.3066*Math.floor(i/2),
                //y:290 - (i%2)*200
                x:twidth/2+2+twidth*(i%4)+twidth*2*Math.floor(i/12),
                y:315 - Math.floor((i%12)/4)*130
            });
            layer.addChild(itemprops)
            this.mPropsShows.push(itemprops);
        }
        this.addChild(scrollview,8);
        scrollview.setTag(7888)
        this.mScrollView = scrollview


        var pageBarDot = PageBarDot.create(allpage);
        this.addChild(pageBarDot,2);
        pageBarDot.setPosition(cc.p(336+vsize.width/2,(size.height-400)/2-70));
        this.mPageBar = pageBarDot;


    },
    //点击开始
    onTouchBegan_g:function(pos){
        //log("onTouchBegan--")
        var size = cc.director.getWinSize();
        this.mHasDrag = false;
        this.mCanDarg = false;
        this.mClickedItem = null;
        showGoodsTip(sGameData.mMainScene,false,"","","",null);
        if(pos.y > (size.height-400)/2-70 && pos.y < (size.height-400)/2-70+400){
            this.mCanDarg = true;
            this.mStartPos = pos;

            var item = this.checkClickProps(pos)
            if(item){
                this.mClickedItem = item
                this.clickProps(this.mClickedItem,pos)
            }
        }
    },
    //点击移动
    onTouchMoved_g:function(pos){
        if(this.mCanDarg){
            //log("onTouchMoved--")
            var  distance = pos.x - this.mStartPos.x;
            if(Math.abs(distance)>10&&!this.mHasDrag){
                this.mHasDrag = true;
                this.mStartDargScale = false;
            }
            if(this.mHasDrag&&!this.mStartDargScale){//移动了 把当前桌子缩小
                //log("move--1")
                this.mStartDargScale = true
            }
        }
    },
    //点击结束
    onTouchEnded_g:function(pos){
        //log("onTouchEnded--")
        if(this.mHasDrag){
            var  distance = pos.x - this.mStartPos.x;
            this.adjustScrollView(distance);
        }else{
            var size = cc.director.getWinSize();
            if(pos.y > (size.height-400)/2-70 && pos.y < (size.height-400)/2-70+400
                &&pos.x > size.width*0.04&&pos.x <size.width*0.96){
                log("is clicked----")

            }
        }
        //showGoodsTip(sGameData.mMainScene,false,"","",null);
        this.mHasDrag = false;
        this.mCanDarg = false;
    },
    onTouchCancelled:function(pos){
        //log("onTouchCancelled--")
    },
    //调整滚动视图位置
    adjustScrollView:function(offset){
        log("adjustScrollView=="+offset)
        var changepage = false;
        if(Math.abs(offset) > 50){ //移动距离超过多少就翻页
            changepage = true;
        }
        var scrollview = this.mScrollView;
        scrollview.unscheduleAll();
        var upropslen = sGameData.mUserPropsList.length
        var allpage = Math.floor((upropslen+3)/4);
        if(changepage){
            var lastPage = this.mCurrPage;
            if(offset < 0){
                this.mCurrPage ++
            }else{
                this.mCurrPage --;
            }
            if(this.mCurrPage > allpage-1){
                this.mCurrPage = allpage-1;
            }
            if(this.mCurrPage < 0){
                this.mCurrPage = 0;
            }
            log("this.mCurrPage=="+this.mCurrPage)
        }

        this.mPageBar.setPage(this.mCurrPage);
        var size = cc.director.getWinSize();
        var vsize = cc.size(size.width-300-66,400);
        var soffset = cc.p(-vsize.width*this.mCurrPage,0);
        scrollview.setContentOffsetInDuration(soffset,0.3)
    },
    checkClickProps:function(pos){

        var size = cc.director.getWinSize();

        var x = 336;
        var y = (size.height-406)/2-55;

        var offsetx = this.mScrollView.getContentOffset().x;
        var tpos = cc.p(pos.x-x-offsetx,pos.y-y)


        for(var i=0;i<this.mPropsShows.length;i++){
            var propsshow = this.mPropsShows[i];
            if(propsshow.checkClick(tpos)){
                return propsshow;
            }
        }
        return null;
    },
    clickProps:function(propsshow,pos){
        var props = propsshow.mProps
        if(props){
            log("props==="+props.name)
            var size = cc.director.getWinSize();
            var pos = cc.p(350+(size.width-350)/2,260);
            showGoodsTip(sGameData.mMainScene,true,props.name,props.info,props.tipinfo,pos);
        }
    }


});
BagPropsPanel.create = function () {
    var sg = new BagPropsPanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

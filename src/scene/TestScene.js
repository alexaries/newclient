/**
 * Created by Administrator on 14-5-27.
 * 测试用
 */
var TestScene = BaseScene.extend({
    mScrollView: null,
    mCurrPage: 0,
    mStartPos: cc.p(0, 0),
    mHasDrag: false,
    mTableShows: [],
    init: function () {
        var bRet = false;
        if (this._super()) {

            sGameData.mTestScene = this;
            sGameData.mCurrScene = this;

            log("start show TestScene");

//            cc.spriteFrameCache.addSpriteFrames(res.game_table_plist)
//            cc.spriteFrameCache.addSpriteFrames(res.game_chair_plist)
       //     cc.spriteFrameCache.addSpriteFrames(res.game_table_vip_plist)
       //     cc.spriteFrameCache.addSpriteFrames(res.game_chair_vip_plist)

            var richText = ccui.RichText.create();
            richText.ignoreContentAdaptWithSize(false);
            richText.setContentSize(cc.size(120, 100));

            var re1 = ccui.RichElementText.create(1, cc.color.WHITE, 255, "This color is white. ", "Helvetica", 24);
            var re2 = ccui.RichElementText.create(2, cc.color.YELLOW, 255, "And this is yellow. ", "Helvetica", 24);
            var re3 = ccui.RichElementText.create(3, cc.color.BLUE, 255, "This one is blue. ", "Helvetica", 24);
            richText.pushBackElement(re1);
            richText.insertElement(re2, 1);
            richText.pushBackElement(re3);
            richText.setPosition(cc.p(size.width-100, 100));

            this.addChild(richText,108);

            dealClickTouch(this);

            //this.schedule(this.update,0.05);
            bRet = true;
        }
        return bRet;
    },
    onExit: function () {
        this._super();
        sGameData.mTestScene = null;
    },
    update: function () {
        this._super();
//        if (sGameData.mGameNet) {
//            sGameData.mGameNet.update();
//        }
    },
    updateOnLoadDataInGame: function (netdata) {
        var command = netdata[0];
        switch (command) {
            case S_DZPK_OPERATE:
                break;
            default:
                log("unknown command=" + command);
                break;
        }
    },
    scrollViewDidScroll: function (view) {
        //log("aaa===")
    },
    scrollViewDidZoom: function (view) {
    },
    onTouchBegan_g: function (pos) {
        log("onTouchBegan--")
        this.mStartPos = pos;
        this.mHasDrag = true;
    },
    onTouchMoved_g: function (pos) {
        log("onTouchMoved--")
    },
    onTouchEnded_g: function (pos) {
        log("onTouchEnded--")
        if (this.mHasDrag) {
            var distance = pos.x - this.mStartPos.x;
            if (Math.abs(distance) > 50) {
                this.adjustScrollView(distance);
            }
        }
        this.mHasDrag = false;
    },
    onTouchCancelled: function (pos) {
        log("onTouchCancelled--")
    },
    adjustScrollView: function (offset) {
        log("adjustScrollView")
        var scrollview = this.mScrollView;
        scrollview.unscheduleAll();
        var lastPage = this.mCurrPage;
        if (offset < 0) {
            this.mCurrPage++
        } else {
            this.mCurrPage--;
        }
        if (this.mCurrPage > 2) {
            this.mCurrPage = 2;
        }
        if (this.mCurrPage < 0) {
            this.mCurrPage = 0;
        }
        log("this.mCurrPage==" + this.mCurrPage)
        if (lastPage != this.mCurrPage) {
            var lasttable = this.mTableShows[lastPage]
            var scaleanim = cc.ScaleTo.create(0.3, 0.7);
            lasttable.runAction(scaleanim)
            var currTable = this.mTableShows[this.mCurrPage]
            var scaleanim1 = cc.ScaleTo.create(0.3, 1);
            currTable.runAction(scaleanim1)
        }


        var soffset = cc.p(-700 * this.mCurrPage, 0);
        scrollview.setContentOffsetInDuration(soffset, 0.3)
    }



});

TestScene.create = function () {
    var sg = new TestScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

TestScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = TestScene.create();
    scene.addChild(layer);
    return scene;
};


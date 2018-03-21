/**
 * Created by Administrator on 14-5-7.
 * 菜单面板
 */
var DNTopMenuPanel = cc.Node.extend({
    mStandItem:null,//站起按钮
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            var size_top_menu_panel = cc.size(260,280);
            var size_top_menu_btn =  cc.size(255,70);
            var point_line1 = cc.p(0,70);
            var point_line2 = cc.p(0,0);
            var point_line3 = cc.p(0,-70);
            var point_top_menu_continue = cc.p(0,105);
            var point_top_menu_exitgame = cc.p(0,35);
            var point_top_menu_standup = cc.p(0,-35);
            var point_top_menu_setting = cc.p(0,-105);
            if(sGameData.mUseRandomSit) {
                size_top_menu_panel = cc.size(260,210);
                point_top_menu_continue = cc.p(0,70);
                point_top_menu_exitgame = cc.p(0,0);
                point_top_menu_setting = cc.p(0,-70);
                point_line1 = cc.p(0,35);
                point_line2 = cc.p(0,-35);
                point_line3 = cc.p(0,-35);
            }

            var bgimg = createSysPanel(size_top_menu_panel);
            this.addChild(bgimg);
            this.setContentSize(bgimg.getContentSize());
            bgimg.setColor(cc.color(200,200,200));
            var csize = this.getContentSize();

            var line1 = cc.Sprite.create("#cell_small_delimeter.png");
            line1.setPosition(point_line1);
            line1.setScale(2);
            this.addChild(line1);

            var line2 = cc.Sprite.create("#cell_small_delimeter.png");
            line2.setPosition(point_line2);
            line2.setScale(2);
            this.addChild(line2);

            var line3 = cc.Sprite.create("#cell_small_delimeter.png");
            line3.setPosition(point_line3);
            line3.setScale(2);
            this.addChild(line3);


            var continueSprite = createLightButton(sResWord.w_top_menu_continue,size_top_menu_btn,0);
            var continueSprite1 = createLightButton(sResWord.w_top_menu_continue,size_top_menu_btn,1);
            var continueSprite2 = createLightButton(sResWord.w_top_menu_continue,size_top_menu_btn,0);
            var continueItem = cc.MenuItemSprite.create(
                continueSprite,
                continueSprite1,
                continueSprite2,
                this.click_continue,this);
            continueItem.setPosition(point_top_menu_continue);

            var quitSprite = createLightButton(sResWord.w_top_menu_exitgame,size_top_menu_btn,0);
            var quitSprite1 = createLightButton(sResWord.w_top_menu_exitgame,size_top_menu_btn,1);
            var quitSprite2 = createLightButton(sResWord.w_top_menu_exitgame,size_top_menu_btn,0);
            var quitItem = cc.MenuItemSprite.create(
                quitSprite,
                quitSprite1,
                quitSprite2,
                this.click_exitgame,this);
            quitItem.setPosition(point_top_menu_exitgame);

            if(!sGameData.mUseRandomSit) {

                var standSprite = createLightButton(sResWord.w_top_menu_standup, size_top_menu_btn, 0);
                var standSprite1 = createLightButton(sResWord.w_top_menu_standup, size_top_menu_btn, 1);
                var standSprite2 = createLightButton(sResWord.w_top_menu_standup, size_top_menu_btn, 0);
                var standItem = cc.MenuItemSprite.create(
                    standSprite,
                    standSprite1,
                    standSprite2,
                    this.click_standup, this);
                standItem.setPosition(point_top_menu_standup);
                this.mStandItem = standItem;
            }

            var settingSprite = createLightButton(sResWord.w_top_menu_setting,size_top_menu_btn,0);
            var settingSprite1 = createLightButton(sResWord.w_top_menu_setting,size_top_menu_btn,1);
            var settingSprite2 = createLightButton(sResWord.w_top_menu_setting,size_top_menu_btn,0);
            var settingItem = cc.MenuItemSprite.create(
                settingSprite,
                settingSprite1,
                settingSprite2,
                this.click_setting,this);
            settingItem.setPosition(point_top_menu_setting);

            var menu = null;
            if(!sGameData.mUseRandomSit) {
                menu = cc.Menu.create(continueItem, quitItem, standItem, settingItem);
            }else{
                menu = cc.Menu.create(continueItem, quitItem, settingItem);
            }
            menu.x = 0;
            menu.y = 0;
            this.addChild(menu, 1);

            this.resetValue();

            //xxx
            bRet = true;
        }
        return bRet;
    },
    //重新设置
    resetValue:function(){
        var standItem = this.mStandItem;
        if(standItem){
            if(sGameData.mDNLayer.mMyState == MYSTATE_SITDOWN){
                standItem.setEnabled(true);
            }else{
                standItem.setEnabled(false);
            }
        }
    },
    click_none:function(){
        cc.log("click_none-")
    },
    //继续游戏
    click_continue:function(){
        playClickSound();
        sGameData.mDNLayer.showTopMenuPanel(false);
        if(sGameData.mAppCanRandomChangeTable){
            if(sGameData.mDNLayer.mMyState != MYSTATE_SITDOWN) {
                if (!sGameData.mIsTestNoNet) {
                    if (!sGameData.mIsSendingData) {
                        if(sGameData.mUser.softCash < sGameData.mCurrRoom.enterPoint){
                            //showLittleNotice(sResWord.w_softcash_notenough);
                            showNeedPayNotice(0,sResWord.w_tip_needpay)
                        }else {
                            if (sGameData.mUseRandomSit) {
                                cc.log("start -- change table random")
                                sGameNetData.mDNNet.sendDNExitTable();
                                sGameNetData.mDNNet.sendDNRandomEnterTable(-1)
                                sGameData.mChangeTableByRandom = true;
                                sGameData.mIsSendingData = true;
                            } else {

                            }
                        }

                    }
                }
            }
        }
    },
    //返回大厅
    click_exitgame:function(){
        playClickSound();
        sGameData.mDNLayer.showTopMenuPanel(false);
        sGameData.mDNLayer.op_quitgame_view();
    },
    //站起
    click_standup:function(){
        playClickSound();
        sGameData.mDNLayer.showTopMenuPanel(false);
        sGameData.mDNLayer.op_standup_view();
    },
    //设置
    click_setting:function(){
        playClickSound();
        sGameData.mDNLayer.showTopMenuPanel(false);
        sGameData.mDNLayer.showSetting();
    },
    //返回主界面
    gotoMain:function(){
        sGameData.mDNLayer.gotoMain();
    }
});
DNTopMenuPanel.create = function () {
    var sg = new DNTopMenuPanel();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

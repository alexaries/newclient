//
//  NoticeLayer.cpp
//  gamesanguo
//
//  Created by apple on 13-3-11.
//
//

#include "NoticeLayer.h"
#include "extensions/cocos-ext.h"
USING_NS_CC_EXT;
NoticeLayer::NoticeLayer(void)
{
    mType = 0;
    mFrom = 0;
}

NoticeLayer::~NoticeLayer(void)
{
    
}
bool NoticeLayer::init()
{
    bool bRet = false;
    do
    {
        
        float scale = Director::getInstance()->getContentScaleFactor();
        
        
        Vec2 size_notice = Vec2(600,320);
        Vec2 size_panel_inner = Vec2(596,190);
        
        Scale9Sprite* bgsprite = GameUtil::createPanel("bg_panel_new.png",size_notice);
        //Sprite* bgsprite = GameUtil::createFrameSprite("res/init/init_frame.png","res/init/init_panel_bg_pot.png",Vec2(550,300));
        CC_BREAK_IF(!bgsprite);
        this->addChild(bgsprite);
        this->setContentSize(Size(size_notice.x,size_notice.y));
        Size size = this->getContentSize();
        
        Scale9Sprite* innerbgsprite = GameUtil::createPanel("bg_inner1_new.png",size_panel_inner);
        CC_BREAK_IF(!innerbgsprite);
        this->addChild(innerbgsprite);
        innerbgsprite->setPosition(Vec2(0,16));
        
        
        int fontsize = 24/scale;//
        int fontsize1 = 28/scale;
        //提示
        mName = sResWord->w_notice;
        LabelTTF* pNameLabel = LabelTTF::create(mName.c_str(), "Arial", fontsize1,//字体  ，字体大小
                                                             Size(430/scale,35/scale),  //设置文本的宽高
                                                             TextHAlignment::CENTER,//水平居右对齐
                                                             TextVAlignment::CENTER);//垂直对齐
        CC_BREAK_IF(!pNameLabel);
        pNameLabel->setPosition(Vec2(0,size.height*0.37+10));
        pNameLabel->setTag(8001);
        this->addChild(pNameLabel,1);
        
        //提示
        mMsg = "";
        LabelTTF* pMsgLabel = LabelTTF::create(mMsg.c_str(), "Arial", fontsize,//字体  ，字体大小
                                                    Size(430/scale,0),  //设置文本的宽高
                                                    TextHAlignment::CENTER,//水平居右对齐
                                                    TextVAlignment::CENTER);//垂直对齐
        CC_BREAK_IF(!pMsgLabel);
        pMsgLabel->setPosition(Vec2(0,size.height*0.1));
        pMsgLabel->setTag(8002);
        this->addChild(pMsgLabel,1);
        pMsgLabel->setColor(Color3B(60,60,60));
        
        
        //同意按钮
        Sprite* oksprite = GameUtil::getMainButtonSprite1("res/init/init_button.png", sResWord->w_yes,fontsize);
        Sprite* oksprite1 = GameUtil::getMainButtonSprite1("res/init/init_button.png", sResWord->w_yes,fontsize);
        oksprite1->setColor(Color3B(200,200,200));
        MenuItemSprite *pOkItem = MenuItemSprite::create(oksprite,
                                                         oksprite1,
                                                         CC_CALLBACK_1(NoticeLayer::menuCallbackOP,this));
        CC_BREAK_IF(!pOkItem);
        pOkItem->setTag(kBtnOk);//设置按钮的 tag标识
        pOkItem->setPosition(Vec2(-size.width*0.2, -size.height*0.38));//设定位置
        
        //取消按钮
        Sprite* cancelsprite = GameUtil::getMainButtonSprite1("res/init/init_button.png", sResWord->w_no,fontsize);
        Sprite* cancelsprite1 = GameUtil::getMainButtonSprite1("res/init/init_button.png",sResWord->w_no,fontsize);
        cancelsprite1->setColor(Color3B(200,200,200));
        MenuItemSprite *pCancelItem = MenuItemSprite::create(cancelsprite,
                                                             cancelsprite1,
                                                             CC_CALLBACK_1(NoticeLayer::menuCallbackOP,this));
        CC_BREAK_IF(!pCancelItem);
        pCancelItem->setTag(kBtnCancel);//设置按钮的 tag标识
        pCancelItem->setPosition(Vec2(size.width*0.2, -size.height*0.38));//设定位置
        //pCancelItem->setVisible(false);
        
        Menu* pMenu = Menu::create(pOkItem,pCancelItem, NULL);
        CC_BREAK_IF(!pMenu);
        pMenu->setPosition(Vec2::ZERO);
        pMenu->setTag(kMenu);
        this->addChild(pMenu, 1);
        
        showButton();
        
        bRet = true;
        
    }while (0);
    return bRet;
}

//显示通知
// type 0普通 1 退出提示 2提示下载资源  //3,3G提示 //4无网络提示 //5普通更新 6强制更新
void NoticeLayer::showNotice(string name,string msg,int type,int from){
    mName = name;
    mMsg = msg;
    mType = type;
    mFrom = from;
    CCLabelTTF* pNameLabel = (CCLabelTTF*)this->getChildByTag(8001);
    if(pNameLabel){
        pNameLabel->setString(mName.c_str());
        //pNameLabel->enableShadow(CCSize(3,-3), 1,0.5, true);
        //pNameLabel->enableStroke(ccc3(255,255,0), 0.2,true);
    }
    CCLabelTTF* pMsgLabel = (CCLabelTTF*)this->getChildByTag(8002);
    if(pMsgLabel){
        pMsgLabel->setString(mMsg.c_str());
    }
    showButton();
}

void NoticeLayer::showButton(){
    
    CCSize size = this->getContentSize();
    
    CCMenu* pMenu = (CCMenu*)this->getChildByTag(kMenu);
    if(pMenu){
        CCMenuItemSprite *pOkItem = (CCMenuItemSprite *)pMenu->getChildByTag(kBtnOk);

        pOkItem->setVisible(true);
        if(mType == 1||mType == 5){
            pOkItem->setPosition(Vec2(-size.width*0.2, -size.height*0.37));//设定位置
        }else{
            pOkItem->setPosition(Vec2(0, -size.height*0.37));//设定位置
        }
        
        
        CCMenuItemSprite *pCancelItem = (CCMenuItemSprite *)pMenu->getChildByTag(kBtnCancel);
        if(mType == 1||mType == 5){
            pCancelItem->setVisible(true);
        }else{
            pCancelItem->setVisible(false);
        }
        
    
    }
}



//按钮回调
void NoticeLayer::menuCallbackOP(Ref* pSender)
{
    
    CCNode *node = (CCNode *) pSender;
	//根据按钮的tag来决定做什么操作
	int targetBtnId = node->getTag();
    switch (targetBtnId) {
        case kBtnOk:
            {
                log(" ok");
                this->setVisible(false);
                if(mType==1){
                    if(mFrom == 1){//
                        CCDirector::sharedDirector()->end();
                        #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
                            exit(0);
                        #endif
                    }
                }else if(mType == 2){//2提示下载资源 
                    sGlobal->mGameLogic->mCanStartUpdateRes = true;
                    this->setVisible(false);
                }else if(mType == 3){//3,3G提示 
                    this->setVisible(false);
                    sGlobal->mStartScene->loadVersionInfo();
                }else if(mType == 4){//4无网络提示
                    this->setVisible(false);
                    sGlobal->mStartScene->checknet();
                }else if(mType == 5){//5普通更新
                    this->setVisible(false);
                    sGlobal->mStartScene->updateTip(sResWord->w_down_install_client);
                    sGlobal->mGameLogic->gotoUrl(sGlobal->mGameLogic->mVersionData->uploadUrl);
                }else if(mType == 6){//6强制更新
                    this->setVisible(false);
                    sGlobal->mStartScene->updateTip(sResWord->w_down_install_client);
                    sGlobal->mGameLogic->gotoUrl(sGlobal->mGameLogic->mVersionData->uploadUrl);
                }
            }
            break;
        case kBtnCancel:
            {
                log(" cancel");
                this->setVisible(false);
                if(mType == 5){//5普通更新
                    sGlobal->mGameLogic->mCanNoticeResUpdate = true;
                }
            }
            break;
        default:
            break;
    }
    
}

void NoticeLayer::hiddenNotice(){
    this->setVisible(false);
}

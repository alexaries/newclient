//
//  CBaseScene.cpp
//  taxaspoker
//
//  Created by apple on 13-6-27.
//
//

#include "CBaseGScene.h"

#include "Header.h"



void CBaseGScene::setKeypadForAndroid(){
    
    //if(sGlobal->mAgent == AGENT_G10086){
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            //对手机返回键的监听
            auto listener = EventListenerKeyboard::create();
            //和回调函数绑定
            listener->onKeyReleased = CC_CALLBACK_2(CBaseGScene::onKeyReleased,this);
            //添加到事件分发器中
            Director::getInstance()->getEventDispatcher()->addEventListenerWithSceneGraphPriority(listener,this);
        #endif
        lastClickTime = 0;
    //}
}

void CBaseGScene::onKeyReleased(EventKeyboard::KeyCode keyCode,Event * pEvent)
{
    log("onKeyReleased==%d",keyCode);
    if(keyCode == EventKeyboard::KeyCode::KEY_BACK){
        log("onKeyReleased1==%d",keyCode);
        
        long time = GameUtil::getTimeNow();
        bool isdoubleclick = false;
        if(time - lastClickTime<700 && time - lastClickTime >-700){
            isdoubleclick = true;
        }
        lastClickTime = time;
        if(isdoubleclick){
            log("isdoubleclick");
            #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
                showNotice(sResWord->w_notice, sResWord->w_quitgame,1,1);
                //CCDirector::sharedDirector()->end();
            #endif
        }else{
            #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
                CallAndroid::clickBackForQuitTip();
            #endif
        }

    }
    //Director::getInstance()->end();
}

//显示消息
void CBaseGScene::showNotice(string name,string msg,int type,int from){
    log("showNotice---");
    NoticeLayer *notice = (NoticeLayer*)(this->getChildByTag(88888));
    if(!notice){
        notice = new NoticeLayer();
        notice->autorelease();
        notice->mType = type;
        notice->init();
        Size size = Director::sharedDirector()->getWinSize();
        notice->setPosition(Vec2(size.width*0.5,size.height*0.5));
        this->addChild(notice,kNoticeLayer,88888);
    }else{
        notice->setVisible(true);
    }
    if(notice){
        notice->showNotice(name,msg,type,from);
    }
}



//
//  CBaseScene.h
//  taxaspoker
//
//  Created by apple on 13-6-27.
//
//

#ifndef __taxaspoker__CBaseGScene__
#define __taxaspoker__CBaseGScene__

#include "cocos2d.h"
using namespace cocos2d;
using namespace std;

class CBaseGScene : public Layer
{
public:
//    virtual void keyBackClicked();
    virtual void onKeyReleased(EventKeyboard::KeyCode keyCode,Event * pEvent);
    
    virtual void setKeypadForAndroid();
    
    //显示消息 type 0普通 1 充值提示 2网络中断提示
    virtual void showNotice(string name,string msg,int type,int from);

public:
    int64_t lastClickTime;
};

#endif /* defined(__taxaspoker__CBaseScene__) */

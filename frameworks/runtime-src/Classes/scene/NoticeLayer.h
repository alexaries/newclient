//
//  NoticeLayer.h
//  gamesanguo
//
//  Created by apple on 13-3-11.
//
//

#ifndef __gamesanguo__NoticeLayer__
#define __gamesanguo__NoticeLayer__

#include "Header.h"
using namespace cocos2d;

class NoticeLayer: public Node
{
public:
	NoticeLayer(void);
	~NoticeLayer(void);
	//node方法会调用此函数
	virtual bool init();
    
    //显示通知
    void showNotice(string name,string msg,int type,int from);
    
    void hiddenNotice();
    
    void showButton();

    
    //按钮点击事件的回调
	void menuCallbackOP(Ref* pSender);
    
	CREATE_FUNC(NoticeLayer);
public:
    string mName;
    string mMsg;
    int mType;//1提示 确定 取消 2提示下载资源 3,3G提示 4无网络提示
    int mFrom;//mType 1时有用
    //1退出提示 
};

#endif /* defined(__gamesanguo__NoticeLayer__) */

//
//  SDKCallBack.h
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#ifndef __shuihu_downjoy__SDKCallBack__
#define __shuihu_downjoy__SDKCallBack__

#include "cocos2d.h"
#include "Header.h"

class SDKCallBackCPP
{
public:
	SDKCallBackCPP(void);
	~SDKCallBackCPP(void);
	//node方法会调用此函数
	void init();
    void loginCallBack(int code,std::string uid,std::string token);
    void payCallBack(int code,std::string orderno);
    void logoutCallBack();
    
};

#endif /* defined(__shuihu_downjoy__SDKCallBack__) */

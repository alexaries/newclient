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

class AvatarCallBackCPP
{
public:
	AvatarCallBackCPP(void);
	~AvatarCallBackCPP(void);
	//node方法会调用此函数
	void init();
    void loadPicSuc(int code,string data);
    
};

#endif /* defined(__shuihu_downjoy__SDKCallBack__) */

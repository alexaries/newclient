//
//  PurchaseCallBackCPP.h
//  gamesanguo
//
//  Created by apple on 13-3-20.
//
//

#ifndef __gamesanguo__PurchaseCallBackCPP__
#define __gamesanguo__PurchaseCallBackCPP__


#include "cocos2d.h"
#include "Header.h"

class PurchaseCallBackCPP
{
public:
	PurchaseCallBackCPP(void);
	~PurchaseCallBackCPP(void);
	//node方法会调用此函数
	void init();
    void failCallBack(std::string pid);
    void successCallBack(std::string pid);
    void restoreCallBack(std::string pid);
    void sendToServerCallBack(std::string pid,std::string msg);

};

#endif /* defined(__gamesanguo__PurchaseCallBackCPP__) */

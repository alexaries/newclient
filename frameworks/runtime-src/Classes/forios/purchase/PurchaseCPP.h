//
//  PurchaseCPP.h
//  gamesanguo
//
//  Created by apple on 13-3-13.
//
//

#ifndef __gamesanguo__PurchaseCPP__
#define __gamesanguo__PurchaseCPP__



#include "Header.h"
using namespace cocos2d;
//cocos2d-x调用这个类，这个类调用objc
class PurchaseCPP:public cocos2d::CCObject
{
public:
	PurchaseCPP(void);
	~PurchaseCPP(void);
    static void initPurchase();

    static void buy(std::string pid);
    void test();
    
    void reload();

};

#endif /* defined(__gamesanguo__PurchaseCPP__) */

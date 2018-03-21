//
//  PayLog.h
//  gamesanguo
//
//  Created by apple on 13-3-20.
//
//

#ifndef gamesanguo_PayLog_h
#define gamesanguo_PayLog_h

#include "cocos2d.h"
USING_NS_CC;
using namespace std;
//充值纪录 paylog
class Paylog: public Ref
{
public:
	Paylog(void){};
	~Paylog(void){};
    
    int idx;//
    string pid;//产品id
    string orderno;
    string msg;
    int zoneid;
    int64_t uid;
    int state;//0开始充值 1成功 2等待验证 3失败
    
    
    
};

#endif

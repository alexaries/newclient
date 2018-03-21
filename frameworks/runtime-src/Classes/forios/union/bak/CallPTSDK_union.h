//
//  CallDownjoy.h
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#ifndef __shuihu_downjoy__CallDownjoy__
#define __shuihu_downjoy__CallDownjoy__

#include "Header.h"

class CallPTSDK_union
{
public:
    
    static void init();
    
    //调用充值
    static void gotoPay(string orderNo,string einfo,int money);
    
        
};


#endif /* defined(__shuihu_downjoy__CallDownjoy__) */

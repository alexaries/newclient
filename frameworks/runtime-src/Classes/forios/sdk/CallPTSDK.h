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

class CallPTSDK
{
public:
    
    static void init();
    //调用登录
    static void gotoLogin();
    //调用充值
    static void gotoPay(string orderNo,string einfo,int money);
    //打开sdk的某界面
    //1用户中心（当乐、百度多酷）   2:退出提示
    static void gotoShowDSKView(int type);
    
    //调用登录
    static bool checkIsLogined();
        
};


#endif /* defined(__shuihu_downjoy__CallDownjoy__) */

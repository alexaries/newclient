//
//  CallPTSDK.cpp
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#include "CallPTSDK_union.h"

#include "ISDKManager_union.h"

void CallPTSDK_union::init(){ //要提前初始化
    CCLOG("CallPTSDK --- init");
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        [ISDKManager_union initISDKManager];
    #endif
}

//调用充值
void CallPTSDK_union::gotoPay(string orderNo,string einfo,int money){
    CCLOG("CallPTSDK_union --- gotoPay");
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    
    
//        UIWindow *view = [[UIApplication sharedApplication] keyWindow];
//        ISDKManager_union* sManager = [ISDKManager_union shared];
//        [view addSubview:sManager.view];

        NSString *orderNostr = [NSString stringWithUTF8String:orderNo.c_str()];
        NSString *einfostr = [NSString stringWithUTF8String:einfo.c_str()];
        NSNumber * tmoney = [NSNumber numberWithInt:money];
        [[ISDKManager_union shared] pay:orderNostr withEInfo:einfostr withMoney:tmoney];
      //  [sManager.view removeFromSuperview];
    #endif
    
}


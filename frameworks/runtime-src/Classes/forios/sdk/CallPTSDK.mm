//
//  CallPTSDK.cpp
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#include "CallPTSDK.h"

#include "ISDKManager.h"

void CallPTSDK::init(){
    CCLOG("CallPTSDK --- init");
    
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        [ISDKManager initISDKManager];
    #endif

}

void CallPTSDK::gotoLogin(){
    CCLOG("CallPTSDK --- gotoLogin");
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
        [[ISDKManager shared] startSDKLogin];
    #endif
}

//调用充值
void CallPTSDK::gotoPay(string orderNo,string einfo,int money){
    CCLOG("CallPTSDK --- gotoPay");
    
    vector<string> infos = GameUtil::split(einfo,"|");
    if (infos.size()>2){
        string info = infos.at(0);
        string pid = infos.at(1);
        string pname = infos.at(2);
        
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
            NSString *orderNostr = [NSString stringWithUTF8String:orderNo.c_str()];
            NSString *einfostr = [NSString stringWithUTF8String:info.c_str()];
            NSString *pidstr = [NSString stringWithUTF8String:pid.c_str()];
            NSString *pnamestr = [NSString stringWithUTF8String:pname.c_str()];
            NSNumber * tmoney = [NSNumber numberWithInt:money];
        [[ISDKManager shared] pay:orderNostr  withEInfo:einfostr withPid:pidstr withPname:pnamestr withMoney:tmoney];
        #endif
    }
}
//1用户中心（当乐、百度多酷）   2:退出提示
void CallPTSDK::gotoShowDSKView(int type){
    CCLOG("CallPTSDK --- gotoShowDSKView %d",type);
    if(type == 1){
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
            [[ISDKManager shared] showGameCenter];
        #endif
    }else if(type == 2){
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
                [[ISDKManager shared] showGameCenter];
        #endif
    }else if(type == 3){
        #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
                [[ISDKManager shared] gamepause];
        #endif
    }
}
bool CallPTSDK::checkIsLogined(){
    CCLOG("CallPTSDK --- checkIsLogined ");
    bool islogined = false;
    #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
            islogined = [[ISDKManager shared] checkIsLogined];
    #endif
    return islogined;
}

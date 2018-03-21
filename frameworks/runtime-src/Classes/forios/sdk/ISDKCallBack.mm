//
//  ISDKCallBack.cpp
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#include "ISDKCallBack.h"
#include "SDKCallBackCPP.h"

@implementation ISDKCallBack

- (id) init {
    if (self = [super init]) {
        callObj = new SDKCallBackCPP();
    }
    
    return self;
}

- (void) dealloc {
    if (callObj != NULL) {
        delete callObj;
        callObj = NULL;
    }
    [super dealloc];
}

- (void) objectiveFunc_loginCallBack:(NSNumber*)code withUID:(NSString*)uid withToken:(NSString*)token{
    callObj->loginCallBack([code intValue],[uid UTF8String],[token UTF8String]);
}
- (void) objectiveFunc_payCallBack:(NSNumber*)code withOrderNo:(NSString*)orderNO{
    callObj->payCallBack([code intValue],[orderNO UTF8String]);
}
- (void) objectiveFunc_loginoutCallBack{
    callObj->logoutCallBack();
}

@end
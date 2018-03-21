//
//  ISDKCallBack.cpp
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#include "ISDKCallBack_union.h"
#include "SDKCallBackCPP_union.h"

@implementation ISDKCallBack_union

- (id) init {
    if (self = [super init]) {
        callObj = new SDKCallBackCPP_union();
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

- (void) objectiveFunc_payCallBack:(NSNumber*)code withOrderNo:(NSString*)orderNO{
    callObj->payCallBack([code intValue],[orderNO UTF8String]);
}


@end
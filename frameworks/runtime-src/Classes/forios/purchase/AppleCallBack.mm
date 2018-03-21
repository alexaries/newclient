//  ObjectiveCAdaptor.m
//  MixCompileTest
//
//  Created by biosli on 11-4-30.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import "AppleCallBack.h"
#include "PurchaseCallBackCPP.h"

@implementation AppleCallBack

- (id) init {
    if (self = [super init]) {
        callObj = new PurchaseCallBackCPP();
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

- (void) objectiveFunc_failCallBack:(NSString*)pid
{
    callObj->failCallBack([pid UTF8String]);
}
- (void) objectiveFunc_succeedCallBack:(NSString*)pid  withRecepit:(NSString*)recepit
{
    callObj->successCallBack([pid UTF8String]);
}
- (void) objectiveFunc_restoreCallBack:(NSString*)pid
{
    callObj->failCallBack([pid UTF8String]);
}
- (void) objectiveFunc_sendToServerCallBack:(NSString*)pid  withMsg:(NSString*)recepit
{
    callObj->sendToServerCallBack([pid UTF8String], [recepit UTF8String]);
}

    @end
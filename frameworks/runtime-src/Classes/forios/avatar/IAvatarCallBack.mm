//
//  AvatarCallBack.cpp
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#include "IAvatarCallBack.h"
#include "AvatarCallBackCPP.h"

@implementation IAvatarCallBack

- (id) init {
    if (self = [super init]) {
        callObj = new AvatarCallBackCPP();
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


- (void) objectiveFunc_loadPicSuc:(NSNumber*)code withData:(NSString*)data{
    callObj->loadPicSuc([code intValue],[data UTF8String]);
}

@end
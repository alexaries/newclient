
//
//  ObjectiveCAdaptor.h
//  MixCompileTest
//
//  Created by biosli on 11-4-30.
//  Copyright 2011 __MyCompanyName__. All rights reserved.
//

#import <Foundation/Foundation.h>

class PurchaseCallBackCPP; //这个声明得小心，千万不要写成@class，兄弟我搞了半宿才找到这个错误。呵呵，见笑，见笑。

@interface AppleCallBack : NSObject {
@private
    PurchaseCallBackCPP *callObj;
}

- (void) objectiveFunc_failCallBack:(NSString*)pid;
- (void) objectiveFunc_succeedCallBack:(NSString*)pid  withRecepit:(NSString*)recepit;
- (void) objectiveFunc_restoreCallBack:(NSString*)pid;
- (void) objectiveFunc_sendToServerCallBack:(NSString*)pid  withMsg:(NSString*)recepit;
@end



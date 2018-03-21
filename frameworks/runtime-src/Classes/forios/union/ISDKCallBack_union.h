//
//  ISDKCallBack.h
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#ifndef __shuihu_downjoy__ISDKCallBack__
#define __shuihu_downjoy__ISDKCallBack__

#import <Foundation/Foundation.h>

class SDKCallBackCPP_union; //这个声明得小心，千万不要写成@class，兄弟我搞了半宿才找到这个错误。呵呵，见笑，见笑。

@interface ISDKCallBack_union : NSObject {
@private
    SDKCallBackCPP_union *callObj;
}

- (void) objectiveFunc_payCallBack:(NSNumber*)code withOrderNo:(NSString*)orderNO;

@end

#endif /* defined(__shuihu_downjoy__ISDKCallBack__) */

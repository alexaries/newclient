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

class SDKCallBackCPP; //这个声明得小心，千万不要写成@class，兄弟我搞了半宿才找到这个错误。呵呵，见笑，见笑。

@interface ISDKCallBack : NSObject {
@private
    SDKCallBackCPP *callObj;
}
- (void) objectiveFunc_loginCallBack:(NSNumber*)code withUID:(NSString*)uid withToken:(NSString*)token;
- (void) objectiveFunc_payCallBack:(NSNumber*)code withOrderNo:(NSString*)orderNO;
- (void) objectiveFunc_loginoutCallBack;
@end

#endif /* defined(__shuihu_downjoy__ISDKCallBack__) */

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

class AvatarCallBackCPP; //这个声明得小心，千万不要写成@class，兄弟我搞了半宿才找到这个错误。呵呵，见笑，见笑。

@interface IAvatarCallBack : NSObject {
@private
    AvatarCallBackCPP *callObj;
}

- (void) objectiveFunc_loadPicSuc:(NSNumber*)code withData:(NSString*)data;
@end

#endif /* defined(__shuihu_downjoy__ISDKCallBack__) */

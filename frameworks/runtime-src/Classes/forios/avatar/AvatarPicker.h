//
//  AvatarPicker.h
//  qpgame
//
//  Created by apple on 14-6-13.
//
//

#ifndef __shuihu_downjoy__ISDKManager__
#define __shuihu_downjoy__ISDKManager__

#import <Foundation/Foundation.h>
#include "CaptureViewController.h"
#include "PassImageDelegate.h"


//c++类调本类（objc） ios sdk 管理
@interface AvatarPicker : UIViewController<UIActionSheetDelegate,UIImagePickerControllerDelegate,UINavigationControllerDelegate,PassImageDelegate>{
    NSString* mUpUrl;
    NSString* mUid;
    UIImagePickerController * mPicker;
}

- (void)imgPicker:(NSInteger)type withShowtype:(NSInteger)stype withUrl:(NSString*)upurl withUid:(NSString*)uid;


@property(nonatomic) NSInteger mShowType;//0头像 1选择图片
@property(nonatomic,strong) NSString* mUpUrl;
@property(nonatomic,strong) NSString* mUid;
@property(nonatomic,strong) UIImagePickerController * mPicker;
@end

#endif /* defined(__shuihu_downjoy__ISDKManager__) */


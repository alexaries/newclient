//
//  AvatarPicker.cpp
//  qpgame
//
//  Created by apple on 14-6-13.
//
//

#include "AvatarPicker.h"
#include "ASIFormDataRequest.h"
#import<CommonCrypto/CommonDigest.h>
#include "IAvatarCallBack.h"

#include "cocos2d.h"
using namespace cocos2d;

@implementation AvatarPicker
@synthesize mShowType;//0头像 1选择图片
@synthesize mUpUrl;
@synthesize mUid;
@synthesize mPicker;

- (void)imgPicker:(NSInteger)type withShowtype:(NSInteger)stype withUrl:(NSString*)upurl withUid:(NSString*)uid
{
    NSLog(@"imgPicker------%ld==%@==%@==%ld",(long)type,upurl,uid,(long)stype);
    self.mUpUrl = upurl;
    self.mUid = uid;
    self.mShowType = stype;
    
    
    NSString * result = [self md5:@"abc"];
    NSLog(@" md5==%@",result);
    cocos2d::Director::getInstance()->stopAnimation();

    UIImagePickerController * picker = [[UIImagePickerController alloc] init];
    picker.delegate = self;
    self.mPicker = picker;
    switch (type) {
        case 1://Take picture
            
            if ([UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera]) {
                picker.sourceType = UIImagePickerControllerSourceTypeCamera;
                
            }else{
                NSLog(@"模拟器无法打开相机");
            }
            //[self presentModalViewController:picker animated:YES]; //ios6
            [self.view.window.rootViewController presentViewController:picker animated:YES completion:nil];
            break;
            
        case 0://From album
            picker.sourceType = UIImagePickerControllerSourceTypePhotoLibrary;
            //[self presentModalViewController:picker animated:YES]; //ios6
            [self.view.window.rootViewController presentViewController:picker animated:YES completion:nil];
            break;
            
        default:
            
            break;
    }
}
-(void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
    NSLog(@" picker cancel");
    [picker dismissViewControllerAnimated:YES completion:nil];
    //[[picker parentViewController] dismissModalViewControllerAnimated:YES]; //ios6
    [picker.view removeFromSuperview];
    cocos2d::Director::getInstance()->startAnimation();
}


#pragma 拍照选择照片协议方法
-(void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
    
    NSLog(@"choose over");
    NSLog(@"imgPicker1------%@",self.mUpUrl);
    
    //[UIApplication sharedApplication].statusBarHidden = NO;
    
    NSString *mediaType = [info objectForKey:UIImagePickerControllerMediaType];
    
    NSData *data;
    
    if ([mediaType isEqualToString:@"public.image"]){
        
        //切忌不可直接使用originImage，因为这是没有经过格式化的图片数据，可能会导致选择的图片颠倒或是失真等现象的发生，从UIImagePickerControllerOriginalImage中的Origin可以看出，很原始，哈哈
        UIImage *originImage = [info objectForKey:UIImagePickerControllerOriginalImage];
        
        if(self.mShowType == 0){
            float scale = 120/originImage.size.width;
            
            //图片压缩，因为原图都是很大的，不必要传原图
            UIImage *scaleImage = [self scaleImage:originImage toScale:scale];
            
            //以下这两步都是比较耗时的操作，最好开一个HUD提示用户，这样体验会好些，不至于阻塞界面
            if (UIImagePNGRepresentation(scaleImage) == nil) {
                //将图片转换为JPG格式的二进制数据
                data = UIImageJPEGRepresentation(scaleImage, 1);
            } else {
                //将图片转换为PNG格式的二进制数据
                data = UIImagePNGRepresentation(scaleImage);
            }
            
            //将二进制数据生成UIImage
            UIImage *image = [UIImage imageWithData:data];
            
            //将图片传递给截取界面进行截取并设置回调方法（协议）
            CaptureViewController *captureView = [[CaptureViewController alloc] init];
            captureView.delegate = self;
            captureView.image = image;
            //隐藏UIImagePickerController本身的导航栏
            picker.navigationBar.hidden = YES;
            
            [picker pushViewController:captureView animated:YES];
        }else if(self.mShowType == 1){
            float scale = 1;
            float scalew = 640/originImage.size.width;//
            float scaleh = 640/originImage.size.height;//
            if(scalew<scale){
                scale = scalew;
            }
            if(scaleh<scale){
                scale = scaleh;
            }
            
            NSLog(@"scale------%f,w=%f,h=%f",scale,originImage.size.width,originImage.size.height);
            
            //图片压缩，因为原图都是很大的，不必要传原图
            UIImage *scaleImage = [self scaleImage:originImage toScale:scale];
            
            data = UIImageJPEGRepresentation(scaleImage, 0.45);
            
            NSString *imgbase64str = [data base64Encoding];
            
            //NSLog(@"===Encoded image:\n%@", imgbase64str);
            
            
            
            NSNumber* code = [NSNumber numberWithInt:200];
            IAvatarCallBack* cbobj = [[IAvatarCallBack alloc] init];
            [cbobj objectiveFunc_loadPicSuc:code withData:imgbase64str];
            [code release];
            
            if(self.mPicker){
                [self.mPicker dismissViewControllerAnimated:YES completion:nil];
                //[[self.mPicker parentViewController] dismissModalViewControllerAnimated:YES]; //ios6
                [self.mPicker.view removeFromSuperview];
                cocos2d::Director::getInstance()->startAnimation();
            }
        }
    }
}

#pragma mark - 图片回传协议方法
-(void)passImage:(UIImage *)image
{
    if(self.mPicker){
        [self.mPicker dismissViewControllerAnimated:YES completion:nil];
        //[[self.mPicker parentViewController] dismissModalViewControllerAnimated:YES]; //ios6
        [self.mPicker.view removeFromSuperview];
        cocos2d::Director::getInstance()->startAnimation();
    }
    
    //imageView.image = image;
    //NSLog(@"passImage==%@",mUpUrl);
    [self uploadImg:image];
}

-(NSString *) md5:(NSString *)str
{
    const char *cStr = [str UTF8String];
    unsigned char result[16];
    CC_MD5( cStr, strlen(cStr),result );
    NSMutableString *hash =[NSMutableString string];
    for (int i = 0; i < 16; i++){
        [hash appendFormat:@"%02X", result[i]];
    }
    return [hash lowercaseString];
}

-(void)uploadImg:(UIImage *)image
{
    UIImage *im = image;//图片
    NSData *data = UIImagePNGRepresentation(im);//获取图片数据
    /*
     
     ios中获取图片的方法有两种，一种是UIImageJPEGRepresentation ，一种是
     UIImagePNGRepresentation
     
     前者获取到图片的数据量要比后者的小很多。。
     
     */
    NSString *key = @"iw729ka@$rt4ksfa#i2&^%7j134";
    NSString *content=[NSString stringWithFormat:@"%@%@", mUid,key];
    NSString* md5Str = [self md5:content];
    NSLog(@" content==%@",content);
    NSLog(@" md5Str==%@",md5Str);
    
    
    NSData *_data = UIImageJPEGRepresentation(image, 0.6f);
    
    NSString *imgbase64str = [_data base64Encoding];
    
    //NSLog(@"===Encoded image:\n%@", imgbase64str);

    
    //NSMutableData *imageData = [NSMutableData dataWithData:data];//ASIFormDataRequest 的setPostBody 方法需求的为NSMutableData类型
    
    
    
    NSURL *url = [NSURL URLWithString:mUpUrl];
                  
    ASIFormDataRequest *aRequest = [[ASIFormDataRequest alloc] initWithURL:url];
    [aRequest setDelegate:self];//代理
    
    [aRequest setPostValue:mUid forKey:@"userId"];
    [aRequest setPostValue:md5Str forKey:@"sign"];
    [aRequest setPostValue:imgbase64str forKey:@"file"];
  
    [aRequest setRequestMethod:@"POST"];
    //[aRequest setPostBody:imageData];
    [aRequest addRequestHeader:@"Content-Type" value:@"application/x-www-form-urlencoded"];//这里的value值 需与服务器端 一致
    [aRequest startAsynchronous];//开始。异步
    [aRequest setDidFinishSelector:@selector(headPortraitSuccess)];//当成功后会自动触发 headPortraitSuccess 方法
    [aRequest setDidFailSelector:@selector(headPortraitFail)];//如果失败会 自动触发 headPortraitFail 方法
    [aRequest release];
}
-(void )headPortraitSuccess
{
    NSLog(@" headPortraitSuccess==");
    //sGlobal->mCallJS->upAvatarEnd(1);
    NSString *data = @"";
    NSNumber* code = [NSNumber numberWithInt:1];
    IAvatarCallBack* cbobj = [[IAvatarCallBack alloc] init];
    [cbobj objectiveFunc_loadPicSuc:code withData:data];
    [code release];

}
-(void )headPortraitFail
{
    NSLog(@" headPortraitSuccess==");
    //sGlobal->mCallJS->upAvatarEnd(1);
    NSString *data = @"";
    NSNumber* code = [NSNumber numberWithInt:2];
    IAvatarCallBack* cbobj = [[IAvatarCallBack alloc] init];
    [cbobj objectiveFunc_loadPicSuc:code withData:data];
    [code release];
}

#pragma mark- 缩放图片
-(UIImage *)scaleImage:(UIImage *)image toScale:(float)scaleSize
{
    UIGraphicsBeginImageContext(CGSizeMake(image.size.width*scaleSize,image.size.height*scaleSize));
    [image drawInRect:CGRectMake(0, 0, image.size.width * scaleSize, image.size.height *scaleSize)];
    UIImage *scaledImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return scaledImage;
}





// Override to allow orientations other than the default portrait orientation.
// This method is deprecated on ios6
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return UIInterfaceOrientationIsLandscape(interfaceOrientation );
}

// For ios6, use supportedInterfaceOrientations & shouldAutorotate instead
- (NSUInteger) supportedInterfaceOrientations{
#ifdef __IPHONE_6_0
    return UIInterfaceOrientationMaskLandscape;
#endif
}

- (BOOL) shouldAutorotate {
    return YES;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

@end

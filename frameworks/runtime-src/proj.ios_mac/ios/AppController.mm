/****************************************************************************
 Copyright (c) 2010-2013 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#import <UIKit/UIKit.h>
#import "cocos2d.h"

#import "AppController.h"
#import "AppDelegate.h"
#import "RootViewController.h"
#import "CCEAGLView.h"

//#import "WXApi.h"
//#import "WXApiObject.h"

//#import<ShareSDK/ShareSDK.h>
//#import "WXApi.h"

#import "CallIOS.h"
#include "Header.h"

@implementation AppController

#pragma mark -
#pragma mark Application lifecycle

// cocos2d application instance
static AppDelegate s_sharedApplication;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

    // Override point for customization after application launch.
    //[FWPay init:@"44356441"];

    // Add the view controller's view to the window and display.
    window = [[UIWindow alloc] initWithFrame: [[UIScreen mainScreen] bounds]];
    CCEAGLView *eaglView = [CCEAGLView viewWithFrame: [window bounds]
                                     pixelFormat: kEAGLColorFormatRGBA8
                                     depthFormat: GL_DEPTH24_STENCIL8_OES
                              preserveBackbuffer: NO
                                      sharegroup: nil
                                   multiSampling: NO
                                 numberOfSamples: 0 ];

    [eaglView setMultipleTouchEnabled:YES];
    
    // Use RootViewController manage CCEAGLView
    viewController = [[RootViewController alloc] initWithNibName:nil bundle:nil];
    viewController.wantsFullScreenLayout = YES;
    viewController.view = eaglView;

    // Set RootViewController to window
    if ( [[UIDevice currentDevice].systemVersion floatValue] < 6.0)
    {
        // warning: addSubView doesn't work on iOS6
        [window addSubview: viewController.view];
    }
    else
    {
        // use this method on ios6
        [window setRootViewController:viewController];
    }
    
    [window makeKeyAndVisible];

    [[UIApplication sharedApplication] setStatusBarHidden: YES];

    // IMPORTANT: Setting the GLView should be done after creating the RootViewController
    cocos2d::GLView *glview = cocos2d::GLView::createWithEAGLView(eaglView);
    cocos2d::Director::getInstance()->setOpenGLView(glview);

    cocos2d::Application::getInstance()->run();
    
    
    //-------wxpay
    //[WXApi registerApp:@"wx00000000eb" withDescription:@"wxpay"];
    //NSLog(@"wxpay init");
    
    //-------
    
    
    //sharesdk------
    
    //导入微信类型
    //[ShareSDK importWeChatClass:[WXApi class]];
    
    //
    //sharesdk------ end
    
//    //消息推送注册
//    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:UIRemoteNotificationTypeSound|UIRemoteNotificationTypeAlert|UIRemoteNotificationTypeBadge];
    
    
    // 禁止ios设备锁屏
    [[UIApplication sharedApplication] setIdleTimerDisabled: YES];
    
    application.applicationIconBadgeNumber = 0;
    [[UIApplication sharedApplication] cancelAllLocalNotifications];//取消所有的通知
    
    return YES;
}

//- (void)onResp:(BaseResp *)resp {
//    if([resp isKindOfClass:[PayResp class]]){
//        //支付返回结果，实际支付结果需要去微信服务器端查询
//        NSString *strMsg,*strTitle = [NSString stringWithFormat:@"支付结果"];
//        
//        switch (resp.errCode) {
//            case WXSuccess:
//                strMsg = @"支付结果：成功！";
//                NSLog(@"支付成功－PaySuccess，retcode = %d", resp.errCode);
//                break;
//                
//            default:
//                strMsg = [NSString stringWithFormat:@"支付结果：失败！retcode = %d, retstr = %@", resp.errCode,resp.errStr];
//                NSLog(@"错误，retcode = %d, retstr = %@", resp.errCode,resp.errStr);
//                break;
//        }
//        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:strTitle message:strMsg delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
//        [alert show];
//        [alert release];
//    }
//}

////sharesdk------
- (BOOL)application:(UIApplication *)application
      handleOpenURL:(NSURL *)url
{
    NSString* host = [[url host] stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    BOOL isqp = [host isEqualToString:@"duole.cn"];
    if(isqp){
        NSString* query = [[url query] stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
        sGlobal->mOpenUrlData = [query UTF8String];

        return TRUE;
    }else{
        
            //[HYMergePayManager application:application openURL:url];
        
        return TRUE;
    }
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation
{

        NSString* host = [[url host] stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
        BOOL isqp = [host isEqualToString:@"duole.cn"];
        if(isqp){
            NSString* query = [[url query] stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];

            sGlobal->mOpenUrlData = [query UTF8String];
        
            return TRUE;
        }else{
           
//                if ([url.host isEqualToString:@"safepay"]) {
//                    [[AlipaySDK defaultService] processAuth_V2Result:url
//                                                     standbyCallback:^(NSDictionary *resultDic) {
//                                                         NSLog(@"ali allresluts:newopen = %@",resultDic);
//                                                         NSString *resultStr = resultDic[@"result"];
//                                                         NSString *resultCode = resultDic[@"resultStatus"];
//                                                         NSLog(@"ali resultCode = %@",resultCode);
//                                                         CallIOS::payresult_ali([resultCode UTF8String],[resultStr UTF8String]);
//                                                     }];
//                }
                
                //[HYMergePayManager application:application openURL:url];
            
            return TRUE;
        }
    
}

////sharesdk------ end

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSString *token = [NSString stringWithFormat:@"%@", deviceToken];
    //获取终端设备标识，这个标识需要通过接口发送到服务器端，服务器端推送消息到APNS时需要知道终端的标识，APNS通过注册的终端标识找到终端设备。
    NSLog(@"My token is:%@", token);
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    NSString *error_str = [NSString stringWithFormat: @"%@", error];
    NSLog(@"Failed to get token, error:%@", error_str);
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
{
    //在此处理接收到的消息。
    NSLog(@"Receive remote notification : %@",userInfo);
    application.applicationIconBadgeNumber = 0;
}


- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
    //点击提示框的打开
    application.applicationIconBadgeNumber = 0;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    /*
     Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
     Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
     */
    cocos2d::Director::getInstance()->pause();
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    /*
     Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
     */
    cocos2d::Director::getInstance()->resume();
    application.applicationIconBadgeNumber = 0;//应用程序右上角的数字=0（消失）
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    /*
     Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
     If your application supports background execution, called instead of applicationWillTerminate: when the user quits.
     */
    cocos2d::Application::getInstance()->applicationDidEnterBackground();
    cocos2d::Director::getInstance()->stopAnimation();
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    /*
     Called as part of  transition from the background to the inactive state: here you can undo many of the changes made on entering the background.
     */

    cocos2d::Application::getInstance()->applicationWillEnterForeground();
    cocos2d::Director::getInstance()->startAnimation();
    application.applicationIconBadgeNumber = 0;//应用程序右上角的数字=0（消失）
}

- (void)applicationWillTerminate:(UIApplication *)application {
    /*
     Called when the application is about to terminate.
     See also applicationDidEnterBackground:.
     */
}

#if __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_6_0

- (NSUInteger)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window
{
    return UIInterfaceOrientationMaskAll;
}

#endif


#pragma mark -
#pragma mark Memory management

- (void)applicationDidReceiveMemoryWarning:(UIApplication *)application {
    /*
     Free up as much memory as possible by purging cached data objects that can be recreated (or reloaded from disk) later.
     */
     //cocos2d::Director::getInstance()->purgeCachedData();
}


- (void)dealloc {
    [super dealloc];
}


@end


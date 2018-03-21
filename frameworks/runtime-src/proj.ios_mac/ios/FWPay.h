#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "FWPayParam.h"

@protocol FWPayDelegate <NSObject>
@required
/*
 支付的结果回调
 payid: 支付单号
 success: YES支付成功，NO支付失败
 message: 支付结果详细信息
 */
- (void)pay:(NSString*)payid result:(BOOL)success message:(NSString*)message;
@end


@interface FWPay : NSObject
/*
    初始化接口
    appId：APP的唯一标识，由凡伟提供
*/
+(void)init:(NSString *)appId;

/*
    启动支付接口
    controller 视图控制器
    params 支付参数
    delegate 支付回调对象
*/
+(void)pay:(UIViewController *)controller withParams:(FWPayParam*)params withDelegate:(id<FWPayDelegate>)delegate;

/*
 启动支付接口
 controller 视图控制器
 params 支付参数
 delegate 支付回调对象
 */
+(void)pay:(UIViewController *)controller withParams:(FWPayParam*)params withDelegate:(id<FWPayDelegate>)delegate withView:(UIView*)view;

/*
    应用进入后台
*/
+(void)applicationWillEnterForeground:(UIApplication *)application;

@end

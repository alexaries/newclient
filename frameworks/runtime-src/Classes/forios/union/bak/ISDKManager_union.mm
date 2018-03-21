//
//  DownjoySDKMan.cpp
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#include "ISDKManager_union.h"


#include "ISDKCallBack_union.h"

#import <CommonCrypto/CommonDigest.h>

#import "UPPayPluginPro.h"

//#define KBtn_width        200
//#define KBtn_height       80
//#define KXOffSet          (self.view.frame.size.width - KBtn_width) / 2
//#define KYOffSet          80
//
//#define kVCTitle          @"TN测试"
//#define kBtnFirstTitle    @"获取订单，开始测试"
//#define kWaiting          @"正在获取TN,请稍后..."
//#define kNote             @"提示"
//#define kConfirm          @"确定"
//#define kErrorNet         @"网络错误"
//#define kResult           @"支付结果：%@"
//
//
//#define kMode             @"01"
//#define kConfigTnUrl      @"http://202.101.25.178:8080/sim/app.jsp?user=%@"
//#define kNormalTnUrl      @"http://202.101.25.178:8080/sim/gettn"


@interface ISDKManager_union ()
@property (nonatomic, retain) 	NSString*	pay_orderNo;
@property (nonatomic, retain) 	NSString*	pay_tradeno;
@property (nonatomic) 	float	pay_price;

@end

@implementation ISDKManager_union
@synthesize pay_orderNo,pay_tradeno;
@synthesize pay_price;

SINGLETON_IMPLEMENTATION1(ISDKManager_union);

static ISDKManager_union *DefaultHandle_ = nil;

+ (void)initISDKManager
{
    NSLog(@"init ISDKManager");
    @synchronized(self)     {
        if (!DefaultHandle_) {
            DefaultHandle_ = [[ISDKManager_union alloc]init];

        }
    }
}
- (id)init
{
    NSLog(@"SDKM---init");
    if (self = [super init]) {
        [self initSDK];
                //
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    
//    XXXView* viewTemp = [[PrimaryView alloc] init];
//    viewTemp.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
//    [self presentViewController:viewTemp animated:YES completion:nil];
    
}


- (void)initSDK
{
    NSLog(@"SDKM - initSDK");
    
   
}

- (void)startSDKLogin
{
    NSLog(@"SDKM - startSDKLogin");

}


//string orderNo,string einfo,int money
- (void)pay:(NSString *)orderNo withEInfo:(NSString *)einfo withMoney:(NSNumber *) money
{
    NSLog(@"SDKM-union - pay ==%@ ==%@  ==%@",einfo,orderNo,money);
//    float tmoney = [money intValue];
    self.pay_orderNo = orderNo;
    self.pay_tradeno = einfo;
    //self.pay_price = tmoney;
    
    NSLog(@"tn=%@",self.pay_tradeno);
    
    UIWindow *view = [[UIApplication sharedApplication] keyWindow];
    UIViewController* ctrol =view.rootViewController;
    
    [UPPayPluginPro startPay:self.pay_tradeno mode:@"01" viewController:ctrol delegate:self];
    
}

- (void)UPPayPluginResult:(NSString *)result
{
    NSString* msg = [NSString stringWithFormat:@"支付结果：%@", result];
    //[self showAlertMessage:msg];
    NSLog(@"pay result=%@",msg);
}


- (void)dealloc
{
	[[NSNotificationCenter defaultCenter] removeObserver:self];
	[super dealloc];
}



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

//
//  DownjoySDKMan.cpp
//  shuihu_downjoy
//
//  Created by apple on 14-3-20.
//
//

#include "UPViewController.h"



#import "UPPayPlugin.h"

#import "ISDKCallBack_union.h"

#define KBtn_width        200
#define KBtn_height       80
#define KXOffSet          (self.view.frame.size.width - KBtn_width) / 2
#define KYOffSet          80

#define kVCTitle          @"TN测试"
#define kBtnFirstTitle    @"获取订单，开始测试"
#define kWaiting          @"正在获取TN,请稍后..."
#define kNote             @"提示"
#define kConfirm          @"确定"
#define kErrorNet         @"网络错误"
#define kResult           @"支付结果：%@"


#define kMode             @"01"
#define kConfigTnUrl      @"http://202.101.25.178:8080/sim/app.jsp?user=%@"
#define kNormalTnUrl      @"http://202.101.25.178:8080/sim/gettn"


@interface UPViewController ()
@property (nonatomic, retain) 	NSString*	pay_orderNo;
@property (nonatomic, retain) 	NSString*	pay_tradeno;
@property (nonatomic) 	float	pay_price;
@property(nonatomic, retain)NSString *mode;
@property(nonatomic, retain)NSString *tnURL;
@property(nonatomic, retain)NSString *configURL;
@end

@implementation UPViewController
@synthesize pay_orderNo,pay_tradeno;
@synthesize pay_price;
@synthesize mode;
@synthesize tnURL;
@synthesize configURL;




- (void)viewDidLoad
{
    [super viewDidLoad];
    
    

//    // Add the normalTn button
//    CGFloat y = KYOffSet;
//    UIButton* btnStartPay = [UIButton buttonWithType:UIButtonTypeRoundedRect];
//    [btnStartPay setTitle:kBtnFirstTitle forState:UIControlStateNormal];
//    [btnStartPay addTarget:self action:@selector(normalPayAction:) forControlEvents:UIControlEventTouchUpInside];
//    [btnStartPay setFrame:CGRectMake(KXOffSet, y, KBtn_width, KBtn_height)];
//    
//    [self.view addSubview:btnStartPay];

    
}


- (void)initSDK
{
    NSLog(@"SDKM - initSDK");
    
    
}



//string orderNo,string einfo,int money
- (void)gotoPay:(NSString *)orderNo withEInfo:(NSString *)einfo withMoney:(NSNumber *) money
{
    NSLog(@"SDKM-union - pay ==%@ ==%@  ==%@",einfo,orderNo,money);
    //    float tmoney = [money intValue];
    self.pay_orderNo = orderNo;
    self.pay_tradeno = einfo;
    //self.pay_price = tmoney;
    
    NSLog(@"tn=%@",self.pay_tradeno);
    
    UIWindow *view = [[UIApplication sharedApplication] keyWindow];
    UIViewController* ctrol =view.rootViewController;
    [UPPayPlugin startPay:self.pay_tradeno mode:@"00" viewController:ctrol delegate:self];
    
}

- (void)UPPayPluginResult:(NSString *)result
{
    NSString* msg = [NSString stringWithFormat:@"支付结果：%@", result];
    //[self showAlertMessage:msg];
    NSLog(@"pay result=%@",msg);
    int payresultcode = 0;
    if([result  isEqual: @"success"]){
        payresultcode = 1;
    }else{
        payresultcode = 2;
    }
    
    NSNumber* code = [NSNumber numberWithInt:payresultcode];
    ISDKCallBack_union *testObjectiveCObj = [[ISDKCallBack_union alloc] init];
    [testObjectiveCObj objectiveFunc_payCallBack:code withOrderNo:self.pay_orderNo];
    [testObjectiveCObj release];
    
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

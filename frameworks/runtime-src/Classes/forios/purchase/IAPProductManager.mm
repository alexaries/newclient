//
//  IAPProductManager.m
//  gamesanguo
//
//  Created by apple on 13-3-20.
//
//

#import "IAPProductManager.h"
#import "IAPHandler.h"
#import "AppleCallBack.h"
#import "SBJSON.h"
#import "GTMBase64IOS.h"

@interface IAPProductManager ()
- (void)registIapObservers;
@end

@implementation IAPProductManager

SINGLETON_IMPLEMENTATION(IAPProductManager);

static IAPProductManager *DefaultHandle_ = nil;

NSArray *products_;

+ (void)initIAPProductManager
{
    NSLog(@"initIAPProductManager");
    @synchronized(self)     {
        if (!DefaultHandle_) {
            DefaultHandle_ = [[IAPProductManager alloc]init];
        }
    }
}
- (id)init
{
    NSLog(@"IAPProductManager---init");
    if (self = [super init]) {
        [self registIapObservers];
        [IAPHandler initECPurchaseWithHandler];
    }
    return self;
}


- (void)postInit
{
    
}

- (void)loadproducts
{
    NSLog(@"---loadproducts");
    
    //iap产品编号集合，这里你需要替换为你自己的iap列表
//    NSArray *productIds = [NSArray arrayWithObjects:@"duoleyx.com.apple.gold1",
//                           @"duoleyx.com.apple.gold2",
//                           @"duoleyx.com.apple.gold3",
//                           @"duoleyx.com.apple.gold4",
//                           @"duoleyx.com.apple.gold5",
//                           @"duoleyx.com.apple.gold6",nil];
    
        NSArray *productIds = [NSArray arrayWithObjects:@"duoleyx.com.apple.gold1",nil];
    //从AppStore上获取产品信息
    [[ECPurchase shared]requestProductData:productIds];
}
  
//接收从app store抓取回来的产品，显示在表格上
-(void) receivedProducts:(NSNotification*)notification
{
    NSLog(@"---receivedProducts");
    if (products_) {
        [products_ release];
        products_ = nil;
    }
    products_ = [[NSArray alloc]initWithArray:[notification object]];
}

- (void)getedProds:(NSNotification*)notification
{
    NSLog(@"通过NSNotificationCenter收到信息：%@,", [notification object]);
}


- (void)buy:(NSString*)productIdentifier
{

    NSLog(@"购买商品：%@", productIdentifier);
    //[[ECPurchase shared]addPaymentWithProduct:product];
    [[ECPurchase shared]addPayment:productIdentifier];
}

// 注册IapHander的监听器，并不是所有监听器都需要注册，
// 这里可以根据业务需求和收据认证模式有选择的注册需要
- (void)registIapObservers
{
    NSLog(@"---registIapObservers");
    [[NSNotificationCenter defaultCenter]addObserver:self
                                            selector:@selector(receivedProducts:)
                                                name:IAPDidReceivedProducts
                                              object:nil];
    
    [[NSNotificationCenter defaultCenter]addObserver:self
                                            selector:@selector(failedTransaction:)
                                                name:IAPDidFailedTransaction
                                              object:nil];
    
    [[NSNotificationCenter defaultCenter]addObserver:self
                                            selector:@selector(restoreTransaction:)
                                                name:IAPDidRestoreTransaction
                                              object:nil];
    
    [[NSNotificationCenter defaultCenter]addObserver:self
                                            selector:@selector(completeTransaction:)
                                                name:IAPDidCompleteTransaction object:nil];
    
    [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(completeTransactionAndVerifySucceed:)
                                                name:IAPDidCompleteTransactionAndVerifySucceed
                                              object:nil];
    
    [[NSNotificationCenter defaultCenter]addObserver:self
                                            selector:@selector(completeTransactionAndVerifyFailed:)
                                                name:IAPDidCompleteTransactionAndVerifyFailed
                                              object:nil];
    [[NSNotificationCenter defaultCenter]addObserver:self
                                            selector:@selector(sendTransactionToServer:)
                                                name:IAPDidSendTransactionToServer
                                              object:nil];
}

-(void)showAlertWithMsg:(NSString*)message
{
//    UIAlertView *alert = [[UIAlertView alloc]initWithTitle:@"IAP反馈"
//                                                   message:message
//                                                  delegate:nil
//                                         cancelButtonTitle:@"OK"
//                                         otherButtonTitles:nil, nil];
//    [alert show];
//    [alert release];
}

-(void) failedTransaction:(NSNotification*)notification
{
    //[self showAlertWithMsg:[NSString stringWithFormat:@"交易取消(%@)",[notification name]]];
    NSLog(@"交易取消(%@)",[notification object]);
    NSString *proIdentifier = [notification object];
    AppleCallBack *testObjectiveCObj = [[AppleCallBack alloc] init];
    [testObjectiveCObj objectiveFunc_failCallBack:proIdentifier];
    [testObjectiveCObj release];
    
}

-(void) restoreTransaction:(NSNotification*)notification
{
    //[self showAlertWithMsg:[NSString stringWithFormat:@"交易恢复(%@)",[notification name]]];
    NSLog(@"交易恢复(%@)",[notification object]);
    NSString *proIdentifier = [notification object];
    AppleCallBack *testObjectiveCObj = [[AppleCallBack alloc] init];
    [testObjectiveCObj objectiveFunc_restoreCallBack:proIdentifier];
    [testObjectiveCObj release];
}

-(void )completeTransaction:(NSNotification*)notification
{
    //[self showAlertWithMsg:[NSString stringWithFormat:@"交易成功(%@)",[notification name]]];
    NSLog(@"交易成功(%@)",[notification object]);
//    NSString *proIdentifier = [notification object];
//    ObjectiveCAdaptor *testObjectiveCObj = [[ObjectiveCAdaptor alloc] init];
//    [testObjectiveCObj objectiveFunc_succeedCallBack:proIdentifier];
//    [testObjectiveCObj release];
    //没验证
    
}

-(void) completeTransactionAndVerifySucceed:(NSNotification*)notification
{
    NSString *proIdentifier = [notification object];
    //[self showAlertWithMsg:[NSString stringWithFormat:@"交易成功，产品编号：%@",proIdentifier]];
    NSLog(@"交易成功，产品编号：%@",proIdentifier);
    

    SKPaymentTransaction *trans = [[notification userInfo] objectForKey:@"transaction"];
    NSLog(@"交易成功，交易标志：%@",trans.transactionIdentifier);
    NSString *recepit = [GTMBase64IOS stringByEncodingData:trans.transactionReceipt];
    NSLog(@"recepit：%@",recepit);
    
    AppleCallBack *testObjectiveCObj = [[AppleCallBack alloc] init];
    [testObjectiveCObj objectiveFunc_succeedCallBack:proIdentifier withRecepit:recepit];
    [testObjectiveCObj release];
}

-(void) completeTransactionAndVerifyFailed:(NSNotification*)notification
{
    
    NSString *proIdentifier = [notification object];
    //[self showAlertWithMsg:[NSString stringWithFormat:@"产品%@交易失败",proIdentifier]];
    NSLog(@"产品%@交易失败",proIdentifier);
    AppleCallBack *testObjectiveCObj = [[AppleCallBack alloc] init];
    [testObjectiveCObj objectiveFunc_failCallBack:proIdentifier];
    [testObjectiveCObj release];
    
    
}


-(void) sendTransactionToServer:(NSNotification*)notification
{
    NSString *proIdentifier = [notification object];
    NSLog(@"sendTransactionToServer---%@",proIdentifier);
    
    NSDictionary* data = [notification userInfo];
    NSString *msg = [data objectForKey: @"msg"];
    //NSLog(@"msg---%@",msg);
    
    AppleCallBack *testObjectiveCObj = [[AppleCallBack alloc] init];
    [testObjectiveCObj objectiveFunc_sendToServerCallBack:proIdentifier withMsg:msg];
    [testObjectiveCObj release];
}

@end

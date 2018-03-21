//
//  APViewController.m
//  AliSDKDemo
//
//  Created by 方彬 on 11/29/13.
//  Copyright (c) 2013 Alipay.com. All rights reserved.
//

#import "APViewController.h"
#import "APOrder.h"
#import "DataSigner.h"
#import <AlipaySDK/AlipaySDK.h>

#import "APAuthV2Info.h"
#import "CallIOS.h"
#import "GameDef.h"

@implementation Product


@end

@interface APViewController ()

@end

@implementation APViewController


- (void)viewDidLoad
{
    [super viewDidLoad];
    //[self generateData];
}

//- (void)setUrl:(NSString *)signurl withNotify:(NSString *)notifyurl withPartner:(NSString *)partner withSeller:(NSString *)seller
//{
//    self.url_sign_ali =signurl;
//    self.url_notify_ali = notifyurl;
//    self.partner_ali = partner;
//    self.seller_ali = seller;
//    NSLog(@"SDKM-url_sign_ali  ==%@ ",self.url_sign_ali);
//    NSLog(@"SDKM-url_notify_ali  ==%@ ",self.url_notify_ali);
//    NSLog(@"SDKM-partner_ali  ==%@ ",self.partner_ali);
//    NSLog(@"SDKM-seller_ali  ==%@ ",self.seller_ali);
//}
//
//
//
//
////string orderNo,string einfo,int money
//- (void)gotoPay:(NSString *)orderNo withEInfo:(NSString *)einfo withMoney:(NSNumber *) money
//{
//    NSLog(@"SDKM-alipay - pay ==%@ ==%@  ==%@",einfo,orderNo,money);
//    /*
//     *点击获取prodcut实例并初始化订单信息
//     */
//    //Product *product = [self.productList objectAtIndex:indexPath.row];
//    
//    /*
//     *商户的唯一的parnter和seller。
//     *签约后，支付宝会为每个商户分配一个唯一的 parnter 和 seller。
//     */
//    
//    /*============================================================================*/
//    /*=======================需要填写商户app申请的===================================*/
//    /*============================================================================*/
//    NSString *partner = self.partner_ali;//[NSString stringWithFormat:@"%s", self.partner_ali];//@"2088511329133169";//
//    NSString *seller = self.seller_ali;//[NSString stringWithFormat:@"%s", self.seller_ali];;//@"cddkmvip@163.com";//
//    NSString *privateKey = @"xxx";
//    /*============================================================================*/
//    /*============================================================================*/
//    /*============================================================================*/
//    
//    //partner和seller获取失败,提示
//    if ([partner length] == 0 ||
//        [seller length] == 0 ||
//        [privateKey length] == 0)
//    {
//        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示"
//                                                        message:@"缺少partner或者seller或者私钥。"
//                                                       delegate:self
//                                              cancelButtonTitle:@"确定"
//                                              otherButtonTitles:nil];
//        [alert show];
//        return;
//    }
//    float fmoney = [money intValue];
//    //fmoney = fmoney/600.0;//pay test
//    //fmoney = fmoney/1000.0;
//    
//    
//    //String title = "金币（"+money+"元)";
//    NSString* title = [NSString stringWithFormat:@"金币（%d元)", [money intValue]];
//    
//    //NSString* notifyURL= [NSString stringWithFormat:@"%s", NOTICE_URL_ALIPAY];
//    //body 传透传参数
//    /*
//     *生成订单信息及签名
//     */
//    //将商品信息赋予AlixPayOrder的成员变量
//    APOrder *order = [[APOrder alloc] init];
//    order.partner = partner;
//    order.seller = seller;
//    order.tradeNO = orderNo; //订单ID（由商家自行制定）
//    order.productName = title; //商品标题
//    order.productDescription = einfo; //商品描述
//    order.amount = [NSString stringWithFormat:@"%.2f", fmoney]; //商品价格
//    order.notifyURL = self.url_notify_ali ; //回调URL
//    
//    order.service = @"mobile.securitypay.pay";
//    order.paymentType = @"1";
//    order.inputCharset = @"utf-8";
//    order.itBPay = @"30m";
//    order.showUrl = @"m.alipay.com";
//    
//    
//    //将商品信息拼接成字符串
//    NSString *orderSpec = [order description];
//    NSLog(@"orderSpec = %@",orderSpec);
//
//    self.payinfo_ali = orderSpec;
//   
//    CallIOS::httpSign([orderSpec UTF8String]);
//    
////    //获取私钥并将商户信息签名,外部商户可以根据情况存放私钥和签名,只需要遵循RSA签名规范,并将签名字符串base64编码和UrlEncode
////    id<DataSigner> signer = CreateRSADataSigner(privateKey);
////    NSString *signedString = [signer signString:orderSpec];
////    NSLog(@"signedString = %@",signedString);
//    
//    //[self startPay:signedString];
//    
//}

- (void)startPay:(NSString *)signedString
{
    NSString *orderSpec = self.payinfo_ali;
    
    NSString * appScheme = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"app_ali"];

    //将签名成功字符串格式化为订单字符串,请严格按照该格式
    NSString *orderString = nil;
    if (signedString != nil) {
        orderString = signedString;
        
        [[AlipaySDK defaultService] payOrder:orderString fromScheme:appScheme callback:^(NSDictionary *resultDic) {
            NSLog(@"ali allresluts = %@",resultDic);
            NSString *resultStr = resultDic[@"result"];
            NSString *resultCode = resultDic[@"resultStatus"];
            NSLog(@"ali resultCode = %@",resultCode);
            CallIOS::payresult_ali([resultCode UTF8String],[resultStr UTF8String]);
            //NSString *resultStrjson = [NSString jsonS]
        }];
        
    }
}
    
//[FWPay pay:self withParams:param withDelegate:self];


#pragma mark -
#pragma mark   ==============产生随机订单号==============


//- (NSString *)generateTradeNO
//{
//    static int kNumber = 15;
//    
//    NSString *sourceStr = @"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//    NSMutableString *resultStr = [[NSMutableString alloc] init];
//    srand(time(0));
//    for (int i = 0; i < kNumber; i++)
//    {
//        unsigned index = rand() % [sourceStr length];
//        NSString *oneStr = [sourceStr substringWithRange:NSMakeRange(index, 1)];
//        [resultStr appendString:oneStr];
//    }
//    return resultStr;
//}





@end

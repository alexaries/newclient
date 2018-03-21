//
//  APViewController.h
//  AliSDKDemo
//
//  Created by 方彬 on 11/29/13.
//  Copyright (c) 2013 Alipay.com. All rights reserved.
//

#import <UIKit/UIKit.h>

//
//测试商品信息封装在Product中,外部商户可以根据自己商品实际情况定义
//
@interface Product : NSObject{
@private
	float     _price;
	NSString *_subject;
	NSString *_body;
	NSString *_orderId;
}

@property (nonatomic, assign) float price;
@property (nonatomic, copy) NSString *subject;
@property (nonatomic, copy) NSString *body;
@property (nonatomic, copy) NSString *orderId;

@end


@interface APViewController : UIViewController<UIAlertViewDelegate>
{
    
}
//- (void)setUrl:(NSString *)signurl withNotify:(NSString *)notifyurl withPartner:(NSString *)partner withSeller:(NSString *)seller;
//- (void)gotoPay:(NSString *)orderNo withEInfo:(NSString *)einfo withMoney:(NSNumber *) money;
- (void)startPay:(NSString *)signedString;
@property (nonatomic, copy) NSString *payinfo_ali;
@property (nonatomic, copy) NSString *url_sign_ali;
@property (nonatomic, copy) NSString *url_notify_ali;
@property (nonatomic, copy) NSString *partner_ali;
@property (nonatomic, copy) NSString *seller_ali;
@end
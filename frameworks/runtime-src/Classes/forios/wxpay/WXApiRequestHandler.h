//
//  WXApiManager.h
//  SDKSample
//
//  Created by Jeason on 15/7/14.
//
//

#import <Foundation/Foundation.h>
//#import "WXApiObject.h"

@interface WXApiRequestHandler : NSObject


+ (NSString *)startPay:(NSString *)paydata ;
+ (NSString *)jumpToBizPay:(NSString *)orderNo withEInfo:(NSString *)einfo withMoney:(NSNumber *) money;

@end

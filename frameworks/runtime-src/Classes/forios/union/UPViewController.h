//
//  UPViewController.h
//  UPPayDemo
//
//  Created by liwang on 12-11-12.
//  Copyright (c) 2012年 liwang. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "UPPayPluginDelegate.h"


@interface UPViewController : UIViewController<UPPayPluginDelegate, UIAlertViewDelegate>
{

}

- (void)gotoPay:(NSString *)orderNo withEInfo:(NSString *)einfo withMoney:(NSNumber *) money;

@end

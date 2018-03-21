//
//  FMUIWebViewBridge.h
//  WebDemo
//
//  Created by yunghc on 13-5-21.
//  Copyright 2013年 __MyCompanyName__. All rights reserved.
//
#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <UIKit/UIKit.h>


@interface FMUIWebViewBridge : NSObject<UIWebViewDelegate,UIAlertViewDelegate>
{
    
        
    UIView    *mView;
    
    UIWebView *mWebView;
    
    UIActivityIndicatorView *activityIndicator;
    
    UIToolbar *mToolbar;
    
    UIBarButtonItem *mBackButton;
    
}

-(void) setLayerWebViewWithURL:(const char*) urlString withType:(int)type;

-(void) backClicked:(id)sender;

@end

//
//  FMUIWebViewBridge.cpp
//  WebDemo
//
//  Created by yunghc on 13-5-21.
//  Copyright 2013年 __MyCompanyName__. All rights reserved.
//

#import "FMUIWebViewBridge.h"
#include "Header.h"
#include "CCEAGLView.h"


@implementation FMUIWebViewBridge

- (id)init
{
    
    self = [super init];
    
    if (self)
    {
        
        // init code here.
        
    }
    
    return self;
    
}

- (void)dealloc{
    
    mWebView.delegate = nil;
    
    [mBackButton release];
    
    [mToolbar release];
    
    [mWebView release];
    
    [mView release];
    
    [activityIndicator release];
    
    [super dealloc];
    
}

- (void)removeWebView{
    [mWebView removeFromSuperview];
}

//1帮助 2公告 3用户协议 4全屏竖屏（有问题） 5全屏横屏
-(void) setLayerWebViewWithURL:(const char*) urlString withType:(int)type{
    
    //mLayerWebView = iLayerWebView;
    
    
    CGRect rect = [[UIScreen mainScreen] bounds];
    CGSize size = rect.size;
    CGFloat width = size.width;
    CGFloat height = size.height;
    if(width < height){
        width = size.height;
        height = size.width;
    }
    CGFloat twidth = width-480;
    
    CGFloat wvwidth = 0;
    CGFloat wvheight = (640-134)/2;
    if(width == 480){
        wvwidth = (960-36)/2 ;
    }else{
        wvwidth = (960-36)/2 +twidth ;
    }
    
    if(type == 2){
            wvwidth = 786/2;
            wvheight = 480/2;
        }else if(type == 3){
            if(width == 480){
                wvwidth = (960-74)/2 ;
            }else{
                wvwidth = (960-88)/2 +twidth ;
            }
            wvheight = 492/2;
        }else if(type == 4){
            wvwidth = width - 60/2 ;
            wvheight = 640/2;
        }else if(type == 5){
            wvwidth = width;
            wvheight = 640/2 - 60/2;
        }else if(type == 6){
            wvwidth = width;
            wvheight = 640/2 - 120/2;
        }
    
    //cocos2d::CCSize size = mLayerWebView-> getContentSize();
    NSLog(@"obc size1=%f--%f",width,height);
    NSLog(@"obc size=%f--%f",wvwidth,wvheight);
    
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
    
    mView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, wvwidth , wvheight)];

    mWebView = [[UIWebView alloc] initWithFrame:CGRectMake(0, 0, wvwidth, wvheight)];
    
    mWebView.delegate = self;
    
    NSString *urlBase = nil;
    NSString * url = [NSString stringWithUTF8String:urlString];
    //本地路径提供 全路径 ；网络路径 包含http
    if([url rangeOfString:@"http"].location != NSNotFound)//_roaldSearchText
    {
        NSLog(@"web url");
        urlBase = [NSString stringWithCString:urlString encoding:NSUTF8StringEncoding];
        
        [mWebView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:urlBase ]]];
    }else{
        NSLog(@"local url");
        NSURL* url11 = [NSURL fileURLWithPath:url];
        NSURLRequest* request = [NSURLRequest requestWithURL:url11] ;
        [mWebView loadRequest:request];
    }
    NSLog(@"url==%@",urlBase);
    
    [mWebView setUserInteractionEnabled:NO]; //don't let the user scroll while things are
    [mWebView setTag:50055];
    [mView addSubview:mWebView];
    cocos2d::GLView *glview = cocos2d::Director::getInstance()->getOpenGLView();
    CCEAGLView *view = (CCEAGLView*) glview->getEAGLView();
    mView.frame = CGRectMake(0, 0, wvwidth ,  wvheight);
    if(width == 480){
        mView.center = CGPointMake(width/2, height/2+24);//self.view.center;
    }else{
        mView.center = CGPointMake(width/2, height/2+24);//self.view.center;
    }
    if(type == 2){
            mView.center = CGPointMake(width/2, height/2-10);//self.view.center;
        }else if(type == 3){
            if(width == 480){
                mView.center = CGPointMake(wvwidth/2+19, wvheight/2+31);//self.view.center;
            }else{
                mView.center = CGPointMake(wvwidth/2+22, wvheight/2+31);//self.view.center;
            }
        }else if(type == 4){
            mView.center = CGPointMake(width/2+15, height/2);//self.view.center;
            //mView.transform = CGAffineTransformMakeRotation(M_PI/2);
        }else if(type == 5){
            mView.center = CGPointMake(width/2, height/2+15);//self.view.center;
        }else if(type == 6){
            mView.center = CGPointMake(width/2, height/2);//self.view.center;
        }
    [mView setTag:990055];
    [view addSubview:mView];
    
}




- (void)webViewDidStartLoad:(UIWebView *)thisWebView {
    
    
    float width = mWebView.frame.size.width;
    float height = mWebView.frame.size.height;
    
        //创建UIActivityIndicatorView背底半透明View
        UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0, 0, width, height)];
        [view setTag:108];
        [view setBackgroundColor:[UIColor blackColor]];
        [view setAlpha:0.5];
        [mWebView addSubview:view];
        
        activityIndicator = [[UIActivityIndicatorView alloc] initWithFrame:CGRectMake(0.0f, 0.0f, 32.0f, 32.0f)];
        [activityIndicator setCenter:view.center];
        [activityIndicator setActivityIndicatorViewStyle:UIActivityIndicatorViewStyleWhite];
        [view addSubview:activityIndicator];
        
        [activityIndicator startAnimating];
 
}



- (void)webViewDidFinishLoad:(UIWebView *)thisWebView{
    
    [mWebView setUserInteractionEnabled:YES];
    
    
    [activityIndicator stopAnimating];
    UIView *view = (UIView*)[mWebView viewWithTag:108];
    [view removeFromSuperview];
    
     //NSString *currentURL = [mWebView stringByEvaluatingJavaScriptFromString:@"document.location.href"];
    
    //NSLog(@"webViewDidFinishLoad---%@",currentURL);
    
}



- (void)webView:(UIWebView *)thisWebView didFailLoadWithError:(NSError *)error {
    
    if ([error code] != -999 && error != NULL) { //error -999 happens when the user clicks on something before it's done loading.
        
      
        
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Network Error" message:@"Unable to load the page. Please keep network connection."
                              
                                                       delegate:self cancelButtonTitle:nil otherButtonTitles:@"OK", nil];
        
        [alert show];
        
        [alert release];
        
        
    }
    
    [activityIndicator stopAnimating];
    UIView *view = (UIView*)[mWebView viewWithTag:108];
    [view removeFromSuperview];
    
}



@end











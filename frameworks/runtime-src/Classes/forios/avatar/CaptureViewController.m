//
//  CaptureViewController.m
//  ImagePickerDemo
//
//  Created by Ryan Tang on 13-1-5.
//  Copyright (c) 2013年 Ericsson Labs. All rights reserved.
//

#import "CaptureViewController.h"

@interface CaptureViewController ()
{
    AGSimpleImageEditorView *editorView;
}
@end

@implementation CaptureViewController
@synthesize delegate;
@synthesize image;

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    
    
    CGRect rect = [[UIScreen mainScreen] bounds];
    CGSize size = rect.size;
    CGFloat width = size.width;
    CGFloat height = size.height;
    NSLog(@"width==%f==%f",width,height);
    if(width < height){
        CGFloat temp = width;
        width = height;
        height = temp;
    }
    
    //添加导航栏和完成按钮
    UINavigationBar *naviBar = [[UINavigationBar alloc] initWithFrame:CGRectMake(0, 0, height, 44)];
    [self.view addSubview:naviBar];
    
    UINavigationItem *naviItem = [[UINavigationItem alloc] initWithTitle:@"图片裁剪"];
    [naviBar pushNavigationItem:naviItem animated:YES];
    
    //保存按钮
    UIBarButtonItem *doneItem = [[UIBarButtonItem alloc] initWithTitle:@"完成" style:UIBarButtonItemStylePlain target:self action:@selector(saveButton)];
    naviItem.rightBarButtonItem = doneItem;
        
    //image为上一个界面传过来的图片资源
    editorView = [[AGSimpleImageEditorView alloc] initWithImage:self.image];
    editorView.frame = CGRectMake(0, 0, height ,  width-44);
    editorView.center = CGPointMake(height/2, width/2+22);//self.view.center;
    
    //外边框的宽度及颜色
    editorView.borderWidth = 1.f;
    editorView.borderColor = [UIColor blackColor];
    
    //截取框的宽度及颜色
    editorView.ratioViewBorderWidth = 5.f;
    editorView.ratioViewBorderColor = [UIColor orangeColor];
    
    //截取比例，我这里按正方形1:1截取（可以写成 3./2. 16./9. 4./3.）
    editorView.ratio = 1;
    
    [self.view addSubview:editorView];
    
    

}

//完成截取
-(void)saveButton
{
    //output为截取后的图片，UIImage类型
    UIImage *resultImage = editorView.output;
    
    //通过代理回传给上一个界面显示
    [self.delegate passImage:resultImage];
    [self dismissModalViewControllerAnimated:YES];
    [self.view removeFromSuperview];
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

// Override to allow orientations other than the default portrait orientation.
// This method is deprecated on ios6
- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation {
    return UIDeviceOrientationIsValidInterfaceOrientation(interfaceOrientation );
}

// For ios6, use supportedInterfaceOrientations & shouldAutorotate instead
- (NSUInteger) supportedInterfaceOrientations{
#ifdef __IPHONE_6_0
    return UIInterfaceOrientationMaskAll;
#endif
}

- (BOOL) shouldAutorotate {
    return YES;
}

@end

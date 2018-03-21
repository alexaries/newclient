package cn.coolqp.game;

import java.io.File;
import java.io.IOException;

import com.qp.xlylc.com.R;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.ActivityNotFoundException;
import android.content.ClipData;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;  
import android.view.WindowManager;
import android.view.View.OnKeyListener;
import android.view.ViewGroup.LayoutParams;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;  
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;  

public class WebViewHengActivity extends Activity {
	
	public static final String TAG = "hqp";
	
	private static WebViewHengActivity mApp;
	static WebView m_webView;  
    //static FrameLayout m_webLayout;  
    //static LinearLayout topLayout;  
    private boolean isShowWebviewing = false;
    private ProgressDialog progressBar;
    private boolean canShowWebview = false;
    static boolean mIsClickTop = true;
    
    private ValueCallback mUploadMessage;
    private final static int FILECHOOSER_RESULTCODE = 1;
    public static final int REQUEST_SELECT_FILE = 100;
    public ValueCallback<Uri[]> uploadMessage;
	
	 @Override  
    public void onCreate(Bundle savedInstanceState) {  
        super.onCreate(savedInstanceState);  
        setContentView(R.layout.portraitscreen);  
        
        mApp = this;
        
        
        Log.d(TAG,"PortraitScreenActivity －－－－－－ show");  
        
        Intent intent = this.getIntent();        //获取已有的intent对象   
        Bundle bundle = intent.getExtras();    //获取intent里面的bundle对象   
        String url = bundle.getString("url");    //获取Bundle里面的字符串
        String title = bundle.getString("title"); 
        int type = Integer.parseInt(bundle.getString("type")); 
        
        Log.d(TAG,"title＝＝＝"+title);  
        
        TextView titleview = (TextView) findViewById(R.id.titletext);  
        titleview.setText(title);
        
        
        
        Button closebutton = (Button) findViewById(R.id.closebtn);  
          
        /* 为  Button 注册点击事件监听对象，采用了匿名内部类的方式。 */  
        closebutton.setOnClickListener(new View.OnClickListener() {  
        @Override  
        public void onClick(View v) {  
                Log.d(TAG,"close--btn");  
                closeWebViewForJNI();
                WebViewHengActivity.this.finish();
            }  
        });
        
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE |  
                WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);

       
        
        showWebViewForJNI(url,type);
    }  
	 
	
	 
	 /**
	 * 内部打开网页
	 * @param url
	 */
	public void showWebViewForJNI(final String url,final int type){
		Log.d(TAG,"showWebViewForJNI=="+type);
		
		
		canShowWebview = true;
	       
		this.runOnUiThread(new Runnable() {// 在主线程里添加别的控件  
            @SuppressLint("SetJavaScriptEnabled")  
            public void run() {  
            	Log.d(TAG,"new webView--");
            	if(!canShowWebview){
            		return;
            	}
            	
            	
            	
                // 初始化webView  
            	if(m_webView == null){
            		m_webView = (WebView) findViewById(R.id.webview); 
            		
                    
                    m_webView.getSettings().setJavaScriptEnabled(true);  
                    //m_webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
                    //m_webView.getSettings().setAppCacheEnabled(false);
                    m_webView.getSettings().setAllowFileAccess(true);  
                    //m_webView.getSettings().setBuiltInZoomControls(true);
    				//m_webView.getSettings().setDomStorageEnabled(true);//允许DCOM
                    
                      
            	}
                // 设置webView能够执行javascript脚本  
            	
            	//AndroidBug5497Workaround.setIsWebPay(true,m_webView);
            	//m_webView.setBackgroundColor(0);
            	
            	String path = url;
            	
            	if(url.indexOf("http") == -1){
            		if(url.indexOf("assets/") > -1){
            			path = url.replace("assets/","file:///android_asset/");
            		}else{
            			path = "file://"+url;
            		}
            		Log.d(TAG,"path="+path);
            	}
                
                // 载入URL  
                m_webView.loadUrl(path);  
                // 使页面获得焦点  
                m_webView.requestFocus();  
                // 如果页面中链接，如果希望点击链接继续在当前browser中响应  
               
                //progressBar = ProgressDialog.show(PortraitScreenActivity.this, null, "正在进入网页，请稍候…");

                m_webView.setOnKeyListener(new OnKeyListener() {
						@Override
						public boolean onKey(View v, int keyCode, KeyEvent event) {
							// TODO Auto-generated method stub
							if (event.getAction() == KeyEvent.ACTION_DOWN) {    
			                    if (keyCode == KeyEvent.KEYCODE_BACK) {  //表示按返回键 时的操作  
			                        return true;    //已处理    
			                    }    
            				} 
							return false;
						}
                });
                m_webView.setWebViewClient(new WebViewClient());
                
                m_webView.setWebChromeClient(new WebChromeClient() {
                    //关键代码，以下函数是没有API文档的，所以在Eclipse中会报错，如果添加了@Override关键字在这里的话。

                    // For Android 3.0+
                    public void openFileChooser(ValueCallback uploadMsg) {

                      mUploadMessage = uploadMsg;
                      Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                      i.addCategory(Intent.CATEGORY_OPENABLE);
                      i.setType("image/*");
                      WebViewHengActivity.this.startActivityForResult(Intent.createChooser(i, "File Chooser"), FILECHOOSER_RESULTCODE);

                    }

                    // For Android 3.0+
                    public void openFileChooser(ValueCallback uploadMsg, String acceptType) {
                      mUploadMessage = uploadMsg;
                      Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                      i.addCategory(Intent.CATEGORY_OPENABLE);
                      i.setType("*/*");
                      WebViewHengActivity.this.startActivityForResult(
                          Intent.createChooser(i, "File Browser"),
                          FILECHOOSER_RESULTCODE);
                    }

                    //For Android 4.1
                    public void openFileChooser(ValueCallback uploadMsg, String acceptType, String capture) {
                      mUploadMessage = uploadMsg;
                      Intent i = new Intent(Intent.ACTION_GET_CONTENT);
                      i.addCategory(Intent.CATEGORY_OPENABLE);
                      i.setType("image/*");
                      WebViewHengActivity.this.startActivityForResult(Intent.createChooser(i, "File Chooser"), WebViewHengActivity.FILECHOOSER_RESULTCODE);

                    }
                    
                  //For Android 5.0  
                    @TargetApi(Build.VERSION_CODES.LOLLIPOP)  
                    public boolean onShowFileChooser(WebView webView, ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {  
                        // make sure there is no existing message  
                        if (uploadMessage != null) {  
                        	uploadMessage.onReceiveValue(null);  
                        	uploadMessage = null;  
                        }  
                        uploadMessage = filePathCallback;  
                        Intent intent = fileChooserParams.createIntent();  
                        try {  
                        	WebViewHengActivity.this.startActivityForResult(intent, WebViewHengActivity.REQUEST_SELECT_FILE);  
                        } catch (ActivityNotFoundException e) {  
                        	uploadMessage = null;  
                            return false;  
                        }  
                        return true;  
                    }  
                    
                  });

//              		setContentView(web);
                }
                
             
        }); 
	}
	
	
	@Override
	  protected void onActivityResult(int requestCode, int resultCode,
	                  Intent intent) {
	    if (requestCode == FILECHOOSER_RESULTCODE) {
	      if (null == mUploadMessage) return;
	      Uri result = intent == null || resultCode != RESULT_OK ? null
	          : intent.getData();
	      mUploadMessage.onReceiveValue(result);
	      mUploadMessage = null;
	    }else if (requestCode == REQUEST_SELECT_FILE) {  
	        if (uploadMessage == null) return;  
	        uploadMessage.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, intent));  
	        uploadMessage = null;  
	    }  
	  }
	
//  使用activity的onTouch方法是无效的，只能使用dispatchTouchEvent  
  @Override  
  public boolean dispatchTouchEvent(MotionEvent ev) {  
      // TODO Auto-generated method stub  
      if(ev.getAction()==MotionEvent.ACTION_DOWN){  
    	  
    	  WindowManager wm = (WindowManager) getBaseContext().getSystemService(Context.WINDOW_SERVICE);
    	  int sheight = wm.getDefaultDisplay().getHeight();
    	  //AndroidBug5497Workaround.setClickPos(ev.getY(),sheight);
      }  
      return super.dispatchTouchEvent(ev);  
  }  


	/**
	 * 关闭内部网页
	 */
	public void closeWebViewForJNI(){
		Log.d(TAG,"closeWebViewForJNI");
		
		callbackCloseWebViewPortrait(1);
		
		canShowWebview = false;
		this.runOnUiThread(new Runnable() {// 在主线程里添加别的控件  
            @SuppressLint("SetJavaScriptEnabled")  
            public void run() {  
				 
		        m_webView.destroy(); 
		        m_webView = null;
//		        if(progressBar.isShowing()){
//                    progressBar.dismiss();
//                }
            }
            });
   
	}
	//
	private static native void callbackCloseWebViewPortrait(int code);
	
	
	

}



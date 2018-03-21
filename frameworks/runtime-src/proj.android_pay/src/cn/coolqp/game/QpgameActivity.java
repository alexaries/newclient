/****************************************************************************
Copyright (c) 2008-2010 Ricardo Quesada
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2011      Zynga Inc.
Copyright (c) 2013-2014 Chukong Technologies Inc.
 
http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package cn.coolqp.game;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Properties;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;
import org.json.JSONException;
import org.json.JSONObject;
import android.annotation.SuppressLint;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.Uri;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.PowerManager;
import android.os.PowerManager.WakeLock;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnKeyListener;
import android.view.ViewGroup.LayoutParams;
import android.view.WindowManager;

import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.alipay.sdk.app.PayTask;
import com.heepay.plugin.activity.Constant;
import com.heepay.plugin.api.HeepayPlugin;
import com.tencent.mm.sdk.modelpay.PayReq;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

import cn.coolqp.game.alipay.PayResult;
import cn.coolqp.game.heepay.PaymentInfo;
import com.qp.duojinyx.com.R;

public class QpgameActivity extends AvatarManager {
	
	public static final String TAG = "9qp";
	private static final String TAG_STRING = "ANYSDK";
	private static final int RQF_PAY = 1;
	private static final int RQF_LOGIN = 2;
		
	private static QpgameActivity mMainApp; //app
	
	
	private boolean m_anysdk_initok = false;//anysdk 是否初始化
	private boolean m_offerwall_initok = false;//积分墙 是否初始化
	
    
    private String jniaction = ""; //jni 操作类型 pay avatar
    
    private int m_paychannel = 0;//充值渠道
    private String m_paytype = "";//充值类型（google  银联 alipay）

    private String m_tradeno = "";//充值交易号 银联
    private String m_orderno = "";//订单号
    private String m_payinfo = "";//充值信息
    private String m_pay_pid = "";//产品id
    
    private int m_batterylevel = 50;//电量 0-100
    private int m_signallevel = 50;//信号 0-100
    

   
	//alipay ---- 
	
	//商户私钥，pkcs8格式
	public static final String RSA_PRIVATE = "xxx";
	
	private static final int SDK_PAY_FLAG = 1;
	private static final int SDK_CHECK_FLAG = 2;
	
	private String m_orderinfo_ali = "";//订单数据
	//alipay ---- end
	
	
	//wxpay--------
	private IWXAPI mWxApi;
	private boolean hasWxPayInit = false;
	//wxpay--------end 
	

	
	//webview ----
	static WebView m_webView;  //网页显示webview
    static FrameLayout m_webLayout; //webview 布局
    static LinearLayout topLayout;  //webview 布局
    private boolean isShowWebviewing = false;//是否正在显示webview
    //private ProgressDialog progressBar;//网页加载时提示
    private RelativeLayout progressBar_circle = null;  //包含圆形进度条的布局
    private boolean isAddprogressBar = false;
    private boolean canShowWebview = false;//能否显示webview
    //webview ---- end
	
	//锁屏
    WakeLock mWakeLock;  
    
	
	
    private boolean mHasInitData = false;
	
    /**
     * gl 初始化  for clippingnode error
     */
	public Cocos2dxGLSurfaceView onCreateView() { 
        Cocos2dxGLSurfaceView glSurfaceView = new Cocos2dxGLSurfaceView(this);
        glSurfaceView.setEGLConfigChooser(5, 6, 5, 0, 16, 8); // this line is required for clipping
        return glSurfaceView;
    }
	
	public static Object getInstance() { 
	    return mMainApp; 
	}
	
	protected void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		mMainApp = this;
		
		Log.d("qp","qp start--android");
		String agent = getResources().getString(R.string.app_agent);
		Log.d("jni","qp agent--"+agent);
		
		
		initData();

        
        
		if(AppConfig.mUseWXPay){
	        if(!hasWxPayInit){
	        	initPay_wxpay();
		        hasWxPayInit = true;
		    }
		}
        
        // 初始化一个空的布局  
        m_webLayout = new FrameLayout(this);   
        setWebViewSize(1); 
        addContentView(m_webLayout, new LayoutParams(LayoutParams.FILL_PARENT,  
                LayoutParams.FILL_PARENT  )); 
        
        //设置该界面的电源管理->打开禁止锁屏功能  
        PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);   
        mWakeLock = pm.newWakeLock(PowerManager.SCREEN_BRIGHT_WAKE_LOCK,"XYTEST");   
        mWakeLock.acquire();  
        
        
        //注册广播接受者java代码
  		IntentFilter intentFilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
  		//创建广播接受者对象
  		BatteryReceiver batteryReceiver = new BatteryReceiver();
  		//注册receiver
  		registerReceiver(batteryReceiver, intentFilter);
	}
	
	private void getAccountByLocal(){
		Log.d(TAG, "getAccountByLocal----");
		
		
	}
	
	/**
	 * 初始化数据（获取外部参数）
	 */
	private void initData(){
		Intent intent = getIntent();  
        String scheme = intent.getScheme();  
        Uri uri = intent.getData();  
        Log.d(TAG, "scheme:"+scheme);  
        if (uri != null) {  
            String host = uri.getHost();  
            String dataString = intent.getDataString();  
            String aid = uri.getQueryParameter("aid");  
            String path = uri.getPath();  
            String path1 = uri.getEncodedPath();  
            String queryString = uri.getQuery();  
            Log.d(TAG, "host:"+host);  
            Log.d(TAG, "dataString:"+dataString);  
//            Log.d(TAG, "aid:"+aid);  
//            Log.d(TAG, "path:"+path);  
//            Log.d(TAG, "path1:"+path1);  
            Log.d(TAG, "queryString:"+queryString);  
            callbackDoSomethingFor2dx(1,queryString);
        } 
        
        this.getConfigDataByCpp();
        
	}
	
	
	
	/**
	 * 初始化 积分墙
	 */
	private void initOfferWall(){
		Log.d(TAG, "initOfferWall----");

        Log.d(TAG, "initOfferWall----ok");
	}
	
	 private static void handleException_cmccmm(Exception e)
    {
        String msg = null;
        if (e instanceof InvocationTargetException)
        {
            Throwable targetEx = ((InvocationTargetException) e)
                    .getTargetException();
            if (targetEx != null)
            {
                msg = targetEx.getMessage();
            }
        } else
        {
            msg = e.getMessage();
        }
        Log.d(TAG, "error-"+msg);
        e.printStackTrace();
    }
	 
	 public void pay_heepay(String orderNo,String paydata) {
		 Log.d("heePay","pay_heepay===");
		 // _payType 微信支付：30 ，支付宝：22
		 JSONObject json;
			try {
					json = new JSONObject(paydata);
					if(null != json && json.has("agent_id") ){
						 //showToast(QpgameActivity.this, "has pay data"+paydata, Toast.LENGTH_SHORT);
						 PaymentInfo _paymentInfo = new PaymentInfo();
						 _paymentInfo.setAgentId(json.getString("agent_id"));
						 _paymentInfo.setTokenID(json.getString("token_id"));
						 _paymentInfo.setBillNo(orderNo);
						 String _payType = json.getString("pay_type");
						 
						 final String paramStr = _paymentInfo.getTokenID() + "," + _paymentInfo.getAgentId() + "," + _paymentInfo.getBillNo()
							+ "," + _payType;
						 Log.d("heePay","start--- heePay:");
						 runOnUiThread(new Runnable() {
					           @Override
					           public void run() {
					        	   try {
					        		   	HeepayPlugin.pay(QpgameActivity.this, paramStr);
					        	   } catch (Exception e1) {
						       			e1.printStackTrace();
						       		}
					           }
					       });
						
					}else{
			        	Log.d("heePay", "start pay error");
			        	showToast(QpgameActivity.this, "调起支付失败"+paydata, Toast.LENGTH_SHORT);
					}
			}catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				showToast(QpgameActivity.this, "error:"+e.getMessage(), Toast.LENGTH_SHORT);
			} 
	 }
	 
	 private void onActivityResult_heepay(int requestCode, int resultCode, Intent data) {
		 Log.d(TAG, "game---onActivityResult_heepay ");
		 if (resultCode == Constant.RESULTCODE) {
				String respCode = data.getExtras().getString("respCode");
				String respMessage = data.getExtras().getString("respMessage");
				if (!TextUtils.isEmpty(respCode)) {
					// 支付结果状态（01成功/00处理中/-1 失败）
					if ("01".equals(respCode)) {
						Toast.makeText(getApplicationContext(), "支付成功", Toast.LENGTH_SHORT).show();
						callbackPayFor2dx(1,m_orderno,"");
					}
					if ("00".equals(respCode)) {
						Toast.makeText(getApplicationContext(), "处理中...", Toast.LENGTH_SHORT).show();
						callbackPayFor2dx(2,m_orderno,"");
					}
					if ("-1".equals(respCode)) {
						Toast.makeText(getApplicationContext(), "支付失败", Toast.LENGTH_SHORT).show();
						callbackPayFor2dx(2,m_orderno,"");
					}
				}
				// 除支付宝sdk支付respMessage均为null
				if (!TextUtils.isEmpty(respMessage)) {
					// 同步返回的结果必须放置到服务端进行验证, 建议商户依赖异步通知
					PayResult result = new PayResult(respMessage);
					// 同步返回需要验证的信息
					String resultInfo = result.getResult();
					String resultStatus = result.getResultStatus();
					// 判断resultStatus 为“9000”则代表支付成功，具体状态码代表含义可参考接口文档
					if (TextUtils.equals(resultStatus, "9000")) {
						Toast.makeText(this, "支付成功", Toast.LENGTH_SHORT).show();
						callbackPayFor2dx(1,m_orderno,"");
					} else {
						// 判断resultStatus 为非"9000"则代表可能支付失败
						// "8000"代表支付结果因为支付渠道原因或者系统原因还在等待支付结果确认，最终交易是否成功以服务端异步通知为准（小概率状态）
						if (TextUtils.equals(resultStatus, "8000")) {
							Toast.makeText(this, "支付结果确认中", Toast.LENGTH_SHORT).show();
							callbackPayFor2dx(2,m_orderno,"");
						} else {
							// 其他值就可以判断为支付失败，包括用户主动取消支付，或者系统返回的错误
							Toast.makeText(this, "支付失败", Toast.LENGTH_SHORT).show();
							callbackPayFor2dx(2,m_orderno,"");
						}
					}

				}
			}
	 }
	
	
	
	public static void sendpayresult_wxpay(String wxpaycode){
		Log.d("WXPay","sendpayresult_wxpay==="+wxpaycode);
		mMainApp.payresult_wxpay(wxpaycode);
	}
	
	public void payresult_wxpay(String wxpaycode){
		m_orderno = AppConfig.m_orderno;
		Log.d("WXPay","payresult_wxpay==="+m_orderno);
		if("0".equals(wxpaycode)){
			Log.d("WXPay","wxpay ok --"+m_orderno);
			callbackPayFor2dx(1,m_orderno,"");
		}else{
			Log.d("WXPay","wxpay fail --");
			callbackPayFor2dx(2,"","");
		}
	}
	
	private void initPay_wxpay(){
		Log.d("WXPay","initWXPay");
		mWxApi = WXAPIFactory.createWXAPI(this, AppConfig.APPID_WX);
		Log.d("WXPay","initWXPay--end");
	}
	public void pay_new_wxpay(String paydata) {
		Log.d("WXPay","pay_new_wxpay");
		if(!AppConfig.mUseWXPay){
			Log.d("WXPay","wxpay not open");
			return;
		}
		JSONObject json;
		try {
			json = new JSONObject(paydata);
			if(null != json && !json.has("state") ){
				PayReq req = new PayReq();
				//req.appId = "wxf8b4f85f3a794e77";  // 测试用appId
				req.appId			= json.getString("appid");
				req.partnerId		= json.getString("partnerid");
				req.prepayId		= json.getString("prepayid");
				req.nonceStr		= json.getString("noncestr");
				req.timeStamp		= json.getString("timestamp");
				req.packageValue	= json.getString("package");
				req.sign			= json.getString("sign");
				req.extData			= "app data"; // optional
				showToast(QpgameActivity.this, "正常调起支付", Toast.LENGTH_SHORT);
				// 在支付之前，如果应用没有注册到微信，应该先调用IWXMsg.registerApp将应用注册到微信
				Log.d("WXPay","start--- wxpay");
				mWxApi.sendReq(req);
			}else{
	        	Log.d("WXPay", "返回错误"+json.getString("retmsg"));
	        	showToast(QpgameActivity.this, "返回错误"+json.getString("retmsg"), Toast.LENGTH_SHORT);
			}
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
	}
	
	//alipay
	private Handler mHandler_alipay = new Handler() {
		public void handleMessage(Message msg) {
			switch (msg.what) {
			case SDK_PAY_FLAG: {
				PayResult payResult = new PayResult((String) msg.obj);
				Log.d("jni","alipay--result=="+msg.obj);
				// 支付宝返回此次支付结果及加签，建议对支付宝签名信息拿签约时支付宝提供的公钥做验签
				String resultInfo = payResult.getResult();
				String resultStatus = payResult.getResultStatus();
				// 判断resultStatus 为“9000”则代表支付成功，具体状态码代表含义可参考接口文档
				if (TextUtils.equals(resultStatus, "9000")) {
					Toast.makeText(QpgameActivity.this, "支付成功",
							Toast.LENGTH_SHORT).show();
					callbackPayFor2dx(1,m_orderno,"");
				} else {
					// 判断resultStatus 为非“9000”则代表可能支付失败
					// “8000”代表支付结果因为支付渠道原因或者系统原因还在等待支付结果确认，最终交易是否成功以服务端异步通知为准（小概率状态）
					if (TextUtils.equals(resultStatus, "8000")) {
						Toast.makeText(QpgameActivity.this, "支付结果确认中",
								Toast.LENGTH_SHORT).show();
						callbackPayFor2dx(3,m_orderno,"");
					} else {
						// 其他值就可以判断为支付失败，包括用户主动取消支付，或者系统返回的错误
						Toast.makeText(QpgameActivity.this, "支付未完成",
								Toast.LENGTH_SHORT).show();
						callbackPayFor2dx(2,m_orderno,"");
					}
				}
				break;
			}
			case SDK_CHECK_FLAG: {
				Toast.makeText(QpgameActivity.this, "检查结果为：" + msg.obj,
						Toast.LENGTH_SHORT).show();
				break;
			}
			default:
				break;
			}
		};
	};
	
	public void pay_new_alipay(final String paydata){
		Log.d("jni","pay_new_alipay----");
		Runnable payRunnable = new Runnable() {
			@Override
			public void run() {
				// 构造PayTask 对象
				PayTask alipay = new PayTask(mMainApp);
				// 调用支付接口，获取支付结果
				String result = alipay.pay(paydata);
				Message msg = new Message();
				msg.what = SDK_PAY_FLAG;
				msg.obj = result;
				mMainApp.mHandler_alipay.sendMessage(msg);
			}
		};
		// 必须异步调用
		Thread payThread = new Thread(payRunnable);
		payThread.start();
	}
	/**
	 * 初始化 google pay 
	 */
	private void initGoogleIAP(){
		Log.d(TAG, "initGoogleIAP----");
	}

   
		
	
	
	/**
	 * 非官方充值 
	 * @param type   "upmp" 银联
	 * @param orderNo
	 * @param einfo
	 * @param money
	 */
	public void payByTypeForJNI(String type,String orderNo,String einfo,int money){
		Log.d("cocos2d-x jni", "payByTypeForJNI---"+type+" #|# "+orderNo+" #|# "+einfo+" #|# "+money);
		//已 停止使用
//		m_paytype = type;
//        jniaction = "pay";
//		if(type.equals("upmp")){ //银联支付
//			m_tradeno = einfo;
//			m_orderno = orderNo;
//			Log.d("cocos2d-x jni", "startPayByJAR---");
//			UPPayAssistEx.startPayByJAR(QpgameActivity.this, PayActivity.class, null, null, m_tradeno, "00"); //01 test 00正式 
//		}else if(type.equals("alipay")){//
////			m_orderno = orderNo;
////			pay_alipay(orderNo,einfo,money);
//		}else if(type.equals("wxpay")){//
////			m_orderno = orderNo;
////			AppConfig.m_orderno = orderNo;
////			pay_wxpay(orderNo,einfo,money);
//		}else if(type.equals("cmccmm")){ //cmccmm
//			//pay_cmccmm(orderNo,einfo,money);
//		}else if(type.equals("zjhmm")){ //cmccmm
//			//pay_cmccmm(orderNo,einfo,money);
//		}else if(type.equals("gymm")){ //cmccmm
//			//pay_cmccmm(orderNo,einfo,money);
//		}else if(type.equals("gymm1")){ //cmccmm
//			//pay_cmccmm(orderNo,einfo,money);
//		}
	}
	


	//充值渠道号
	private int PAY_CHANNEL_ALIPAY      = 1;
	private int PAY_CHANNEL_WXPAY       = 2;
	private int PAY_CHANNEL_CMCCMM      = 3; //(移动MM 有多个agent)
	private int PAY_CHANNEL_APPSTOTE    = 4;
	private int PAY_CHANNEL_HEEPAY       = 5;
	//新充值
	public void paynewForJNI(int channel,String payagent,String orderNo,String paydata){
		Log.d("cocos2d-x jni", "paynewForJNI---"+channel+"|"+payagent+"|"+orderNo);
		jniaction = "pay";
		m_paychannel = channel;
		m_paytype = payagent;
		m_orderno = orderNo;
		if(channel == PAY_CHANNEL_ALIPAY){
			pay_new_alipay(paydata);
		}else if(channel == PAY_CHANNEL_WXPAY){
			AppConfig.m_orderno = orderNo;
			pay_new_wxpay(paydata);
		}else if(channel == PAY_CHANNEL_HEEPAY){
			AppConfig.m_orderno = orderNo;
			pay_heepay(orderNo,paydata);
		}
		
	}
	
	
	/**
	 * 执行充值(官方平台 充值 使用 googleplay)
	 * @param orderNo 订单号
	 * @param info 附加信息
	 * @param money 充值金额
	 * //js－》server验证未完成  
	 */
	public void payForJNI(final String orderNo,String einfo,int money){
		Log.d("cocos2d-x jni", "payForJNI---"+orderNo+"="+einfo+"="+money);
        jniaction = "pay";
		String sarray[]= einfo.split("\\|");
		m_paytype = "googleplay";
		//已删除
	}
	
	/**
	 * 根据sdk 显示界面  --需要改
	 * 登录充值外 的其他界面通过此方法打开
	 * @param code --- 1:用户中心(平台中心) 2退出页  
	 */
	public void showSdkViewForJNI(int code){
		Log.d("cocos2d-x jni", "showSdkViewForJNI---"+code);
		if(code == 1001){//
			
		}else if(m_anysdk_initok){
			
		}else{
			Log.d("cocos2d-x jni", "****anysdk not init****");
		}
	}
	
	private UpdateManager mUpadteManager = null;
	public void startUpdateAppForJNI(String URL){
		Log.d("jni", "startUpdateAppForJNI="+URL);
//		if(mUpadteManager==null){
//			mUpadteManager = new UpdateManager(this);
//		}
//		int index = URL.lastIndexOf("/");
//		String name = URL.substring(index+1);
//		mUpadteManager.downloadApk(URL, name);
	}
	
	/**
    * 显示积分墙 
    * @param uidstr
    * @param type  domob 多盟 ; youmi 有米
    */
   public void showScoreWallForJNI(String uidstr,String type){
	   Log.d(TAG,"showScoreWallForJNI=="+uidstr+"|"+type);
	   if(m_offerwall_initok){
	   }else{
		   Log.d(TAG," offerwall not init");
	   }
	   
   }
   /**
    * 显示积分墙积分管理 
    * @param uidstr
    * @param type domob 多盟 ; youmi 有米
    */
   public void showScoreManagerForScoreWallForJNI(String uidstr,String type){
	   Log.d(TAG,"showScoreManagerForScoreWallForJNI=="+uidstr+"|"+type);
	   if(m_offerwall_initok){ 
	   }else{
		   Log.d(TAG," offerwall not init");
	   }
   }
   
   public void showQuitTipForJNI(){
	   Log.d("jni","showQuitTipForJNI--");
	   
	   this.runOnUiThread(new Runnable() {// 在主线程里添加别的控件  
           @SuppressLint("SetJavaScriptEnabled")  
           public void run() {  
        	 Toast.makeText(QpgameActivity.this, ResWord.W_QUITTIP,
        					Toast.LENGTH_SHORT).show();
           }
        });
   }
   
   private void showToast(final Context context, final CharSequence text,final int duration){
	   this.runOnUiThread(new Runnable() {// 在主线程里添加别的控件  
           @SuppressLint("SetJavaScriptEnabled")  
           public void run() {  
        	 Toast.makeText(context, text,duration).show();
           }
        });
   }
   
   /**
    * 设置基本数据
    * @param serverUrl 只做为 payurl使用
    */
   public void setBaseDataToAndroidForJNI(String serverUrl,String partner,String seller,String data4,String data5){
	   Log.d("jni","setBaseDataToAndroidForJNI--"+serverUrl);
	   AppConfig.mServerUrl = serverUrl;
	   if(partner.length() > 0){
		   
	   }
   }
   
	/**
	 * 获取android 的 agent 渠道
	 */
	public String getAgentForJNI(){
		Log.d("jni","getAgentForJNI--");
		String agent = getResources().getString(R.string.app_agent);
		return agent;
	}
	public String getPromoterForJNI(){
		Log.d("jni","getPromoterForJNI--");
		String agent = getResources().getString(R.string.app_promoter);
		return agent;
	}
	public String getDevicePlatfromForJNI(){
		Log.d("jni","getDevicePlatfromForJNI--");
		String deviceType = getResources().getString(R.string.app_deviceType);
		return deviceType;
	}
	/**
	 * 显示公告
	 * @param msg
	 */
	public void showNoticeForJNI(String msg){
		String title = ResWord.W_NOTICE;
		showDialog(title,msg);
	}
	/**
	 *  跳转到网页
	 * @param url
	 */
	public void gotoUrlForJNI(String url){
		Uri uri = Uri.parse(url);    
		Intent it = new Intent(Intent.ACTION_VIEW, uri);    
		startActivity(it);  
	}

	static final int NOTIFICATION_ID = 0x1123;
	public void sendLocalPushMsgForJNI(int type,String msg,int repeat,int durday,int durtime){
		Log.d(TAG,"sendLocalPushMsgForJNI=="+type+"|"+repeat+"|"+durday+"|"+durtime+"|"+msg);
		
		// SharedPreferences settings = getSharedPreferences(PREFS_NAME, Activity.MODE_PRIVATE);  
  //       SharedPreferences.Editor editor = settings.edit();  
  //       if(type == 0){
  //       	editor.putInt("pushmsg1_isopen", 0); 
  //       	editor.putInt("pushmsg2_isopen", 0); 
  //       	editor.putInt("pushmsg3_isopen", 0); 
  //       }else if(type == 1){
  //       	editor.putInt("pushmsg1_isopen", 1); 
	 //        editor.putInt("pushmsg1_durday", durday); 
	 //        editor.putInt("pushmsg1_durtime", durtime);   
	 //        editor.putInt("pushmsg1_repeat", repeat); 
	 //        editor.putInt("pushmsg1_count", 0); 
	 //        editor.putString("pushmsg1_msg",msg); 
  //       }else if(type == 2){
  //       	editor.putInt("pushmsg2_isopen", 1); 
	 //        editor.putInt("pushmsg2_durday", durday); 
	 //        editor.putInt("pushmsg2_durtime", durtime); 
	 //        editor.putInt("pushmsg2_repeat", repeat); 
	 //        editor.putInt("pushmsg2_count", 0); 
	 //        editor.putString("pushmsg2_msg",msg); 
  //       }else if(type == 3){
  //       	editor.putInt("pushmsg3_isopen", 1); 
	 //        editor.putInt("pushmsg3_durday", durday); 
	 //        editor.putInt("pushmsg3_durtime", durtime); 
	 //        editor.putInt("pushmsg3_repeat", repeat); 
	 //        editor.putInt("pushmsg3_count", 0); 
	 //        editor.putString("pushmsg3_msg",msg); 
  //       }
  //       editor.commit();
		
//			 //获取系统的NotificationManager服务
//	        NotificationManager notificationManager = (NotificationManager) 
//	          getSystemService(NOTIFICATION_SERVICE);
//			
//	        notificationManager.cancel(NOTIFICATION_ID);
//			
//			
//			String appname = getResources().getString(R.string.app_name);
//			//创建一个启动其他Activity的Intent
//			Intent intent = new Intent(QpgameActivity.this
//				, QpgameActivity.class);
//			PendingIntent pi = PendingIntent.getActivity(QpgameActivity.this
//				, 0, intent , 0);
//			//创建一个Notification
//	        Notification notify = new Notification();
//	        //为Notification设置图标，该图标显示在状态栏
//	        notify.icon = R.drawable.icon;
//	        //为Notification设置文本内容，该文本会显示在状态栏
//	        notify.tickerText = ""+msg;
//	        //为Notification设置发送时间
//	        notify.when = System.currentTimeMillis();
//	        //为Notification设置声音
//	        notify.defaults = Notification.DEFAULT_SOUND;
//	        //为Notification设置默认声音、默认振动、默认闪光灯
//	        notify.defaults = Notification.DEFAULT_ALL;
//	        //设置事件信息
//	        notify.setLatestEventInfo(QpgameActivity.this, appname,""+msg, pi);
//	       
//	        //发送通知
//	        notificationManager.notify(NOTIFICATION_ID, notify);
	}
	/**
	 * 获取网络状态
	 * NoNetWork    = 0,
	 * Conn3G       = 1,
     * ConnWiFi     = 2,
	 * @return
	 */
	public int getNetStateForJNI(){
		Log.d("cocos2d-x jni", "getNetStateForJNI---");
		ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);  
		int state = 0;
		try{
			if(GameUtil.isNetConnected(cm)){
				if(GameUtil.isWifiConnected(cm)){
					state = 2;
				}else{
					state = 1;
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		Log.d("cocos2d-x jni", "netstate=="+state);
		return state;
	}
	/**
	 * 执行登录
	 * 接平台的帐号系统时调用
	 */
	public void loginForJNI(){
		Log.d("cocos2d-x jni", "loginForJNI---");
//			if(m_anysdk_initok){
//				
//			}else{
//				Log.d("cocos2d-x jni", "****anysdk not init****");
//			}
		getAccountByLocal();
	}
	/**
	 * 获取 sdk  那些功能可用
	 * //1用户中心(平台中心)
	 * @param code
	 * @return
	 */
	public String getSdkViewCanShowForJNI(int code){
		String result = "";

		return result;
	}

	
	
	/**
	 * 广播接受者
	 */
	class BatteryReceiver extends BroadcastReceiver{
		@Override
		public void onReceive(Context context, Intent intent) {
			// TODO Auto-generated method stub
			//判断它是否是为电量变化的Broadcast Action
			if(Intent.ACTION_BATTERY_CHANGED.equals(intent.getAction())){
				//获取当前电量
				int level = intent.getIntExtra("level", 0);
				//电量的总刻度
				int scale = intent.getIntExtra("scale", 100);
				//把它转成百分比
				//tv.setText("电池电量为"++"%");
				m_batterylevel = (int)((level*100)/scale);
				Log.d("cocos2d-x jni", "m_batterylevel---"+m_batterylevel);
			}
		}
	}

	public int getBatteryInfoForJNI(){
		Log.d("cocos2d-x jni", "getBatteryInfoForJNI---"+m_batterylevel);
		return m_batterylevel;
	}
	
	
	public int getSignalInfoForJNI(){
		Log.d("cocos2d-x jni", "getSignalInfoForJNI---");
		WifiManager wifiManager=(WifiManager) getSystemService(WIFI_SERVICE);
		WifiInfo wifiInfo = wifiManager.getConnectionInfo();//当前wifi连接信息
		if(wifiInfo!=null){
			m_signallevel = 100 + wifiInfo.getRssi();
			Log.d("cocos2d-x jni", "m_signallevel---"+m_signallevel+"|"+wifiInfo.getRssi());
		}
		return m_signallevel;
	}
	
	/**
	 * 获取app版本号
	 * @return
	 */
	public String getAppBaseVersionForJNI(){
		Log.d("cocos2d-x jni", "getAppBaseVersionForJNI---");
		String ver = GameUtil.getAppBaseVersion(this);
		return ver;
	}
	
	public String getMyUUIDForJNI(){
		Log.d("jni","getMyUUIDForJNI=");
		String uuid = GameUtil.getMyUUID(this);
		return uuid;
	}
	
	/**
	 * 设置头像
	 * @param userId
	 * @param upurl 上传地址
	 * @param type 0 相册 1拍照
	 */
	public void setAvatarForJNI(String userId,String upurl,int stype,int type){
		Log.d("cocos2d-x jni","setAvatarForJNI"+userId+"|"+type);
        jniaction = "avatar";
		this.setAvatar(userId,upurl,stype,type);
	}
	
	/**
	 * 删除目录
	 * @param path
	 */
	public void delDirAndFilesForJNI(String path){
		Log.d("cocos2d-x jni", "delDirAndFilesForJNI---"+path);
		try{
			File file = new File(path);
			GameUtil.deleteDirFiles(file);
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	/**
	 * 设置webview 大小 ；在ui线程里运行
	 * @param type 1帮助 2公告 3用户协议 4全屏竖屏（有问题） 5全屏横屏 6上下有bar横屏
	 */
	private void setWebViewSize(final int type){
		Log.d(TAG,"setWebViewSize=="+type);
		
		WindowManager wm = (WindowManager) getContext().getSystemService(Context.WINDOW_SERVICE);
		int swidth = wm.getDefaultDisplay().getWidth();
		int sheight = wm.getDefaultDisplay().getHeight();
		
		Log.d(TAG,"swidth="+swidth+"|"+sheight);
		float scale = (float)(sheight/640.0);
		Log.d(TAG,"scale="+scale);
		//宽度可能有问题
		//int spacewidth = (int)(swidth*0.04)-4;
		int spacewidth = (int)(18);
	    //更新界面  
        //1帮助 2公告 3用户协议 4全屏竖屏（有问题） 5全屏横屏
		if(type == 1){
			//m_webLayout.setPadding((int)(spacewidth*scale), (int)(167*scale), (int)(spacewidth*scale), (int)(70*scale));  
			m_webLayout.setPadding((int)(spacewidth*scale), (int)(114*scale), (int)(spacewidth*scale), (int)(20*scale));  
		}else if(type == 2){
			spacewidth = (int)(swidth/scale-786)/2;
			m_webLayout.setPadding((int)(spacewidth*scale), (int)(60*scale), (int)(spacewidth*scale), (int)(100*scale));  
		}else if(type == 3){
            m_webLayout.setPadding((int)(spacewidth*scale), (int)(62*scale), (int)(spacewidth*scale), (int)(86*scale));  
        }else if(type == 4){
            m_webLayout.setPadding((int)(60*scale), 0, 0, 0);  
        }else if(type == 5){
            m_webLayout.setPadding(0, (int)(60*scale), 0, 0);  
        }else if(type == 6){
            m_webLayout.setPadding(0, (int)(60*scale), 0, (int)(60*scale));  
        }
	      
	}
	/**
	 * 内部打开网页
	 * @param url 
	 * @param type //1帮助 2公告 3用户协议 4全屏竖屏（有问题） 5全屏横屏 6上下有bar横屏
	 */
	public void showWebViewForJNI(final String url,final int type){
		Log.d("cocos2d-x jni","showWebViewForJNI");
        canShowWebview = true;
		this.runOnUiThread(new Runnable() {// 在主线程里添加别的控件  
            @SuppressLint("SetJavaScriptEnabled")  
            public void run() {  
            	Log.d("cocos2d-x jni","new webView--");
                if(!canShowWebview){
                    return;
                }
            	setWebViewSize(type);
                // 初始化webView  
            	if(m_webView == null){
            		m_webView = new WebView(mMainApp);  
            		topLayout = new LinearLayout(mMainApp);  
                    topLayout.setOrientation(LinearLayout.VERTICAL);  
                    // 设置webView能够执行javascript脚本  

                    m_webView.getSettings().setJavaScriptEnabled(true);  
                    m_webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);
                    m_webView.getSettings().setAppCacheEnabled(false);
      
                    topLayout.addView(m_webView);  
                    // 再把线性布局加入到主布局  
                    m_webLayout.addView(topLayout);  
            	}
                // 设置webView能够执行javascript脚本  
                //m_webView.setBackgroundColor(0);
                String path = url;
                // 载入URL  (本地 或 网络)
                if(url.indexOf("http") == -1){
                    if(url.indexOf("assets/") > -1){ // apk assets 里的文件
                        path = url.replace("assets/","file:///android_asset/");
                    }else{ // 本地其他路径
                        path = "file://"+url;
                    }
                    Log.d(TAG,"path="+path);
                }
                // 载入URL  
                m_webView.loadUrl(path);  
                
                // 使页面获得焦点  
                m_webView.requestFocus();  
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
                m_webView.setWebChromeClient(new WebChromeClient(){

        			@Override
        			public void onProgressChanged(WebView view, int newProgress) {
        				// TODO Auto-generated method stub
        				super.onProgressChanged(view, newProgress);
        				if(newProgress == 100){
        					progressBar_circle.setVisibility(View.GONE);
        				}else{
        					if(!isAddprogressBar){
    							progressBar_circle = (RelativeLayout) LayoutInflater.from(mMainApp).inflate(R.layout.progress_circle, null);
    							m_webLayout.addView(progressBar_circle, LayoutParams.FILL_PARENT,  LayoutParams.FILL_PARENT);
    							isAddprogressBar = true;
        					}
        					progressBar_circle.setVisibility(View.VISIBLE);
        				}
        			}
        		});
                m_webView.setWebViewClient(new WebViewClient() {  
                    @Override  
                    public boolean shouldOverrideUrlLoading(WebView view, String url) {  
                        view.loadUrl(url);  
                        return true;  
                    }  
                });  
            }  
        }); 
	}

	/**
	 * 关闭内部网页
	 */
	public void closeWebViewForJNI(){
		Log.d("cocos2d-x jni","closeWebViewForJNI");
        canShowWebview = false;
		this.runOnUiThread(new Runnable() {// 在主线程里添加别的控件  
            @SuppressLint("SetJavaScriptEnabled")  
            public void run() {  
				m_webLayout.removeView(topLayout);  
		        topLayout.destroyDrawingCache();  
		  
		        topLayout.removeView(m_webView);  
		        m_webView.destroy(); 
		        m_webView = null;
		        if(progressBar_circle!=null){
                	progressBar_circle.setVisibility(View.GONE);
                }
            }
         });
	}
	
	/**
	 * Activity结果处理（充值、设置头像、anysdk）
	 */
	@Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		Log.d(TAG, "game---onActivityResult(" + requestCode + "," + resultCode +")   type="+m_paytype+" a="+jniaction);
		Log.d(TAG, "game---onActivityResult data(" + data+") ");
        super.onActivityResult(requestCode, resultCode, data);

        if(jniaction.equals("avatar")){//设置头像
            super.onActivityResult_avatar(requestCode, resultCode, data);
        }else{
            if(m_paytype.equals("upmp")){// 银联支付结果
            	onActivityResult_upmp(requestCode, resultCode, data);
            }else if(m_paytype.equals("heeppay")){// 汇付宝支付结果
            	onActivityResult_heepay(requestCode, resultCode, data);
            }
        }
        onActivityResult_googleplay(requestCode, resultCode, data);
        
    }
	//google 支付结果
	 private void onActivityResult_googleplay(int requestCode, int resultCode, Intent data) {
	 }
	 
	 //银联 支付结果
	 private void onActivityResult_upmp(int requestCode, int resultCode, Intent data) {
		 /*
         * 支付控件返回字符串:success、fail、cancel
         *      分别代表支付成功，支付失败，支付取消
         */
		 String str = data.getExtras().getString("pay_result");
        if(str!=null&&str.length() > 0){
        	Log.d("cocos2d-x jni", "upmp play--- ActivityResult");	
            String msg = "";
	        String tradeno = data.getExtras().getString("tn");
	        Log.d("cocos2d-x jni", "payresult --tradeno---"+m_tradeno+"|"+m_orderno);
	        if (str.equalsIgnoreCase("success")) {
	        	callbackPayFor2dx(1,m_orderno,"");
	            msg = "支付成功,请等待服务端验证！";
	        } else if (str.equalsIgnoreCase("fail")) {
	        	callbackPayFor2dx(2,m_orderno,"");
	            msg = "支付失败！";
	        } else if (str.equalsIgnoreCase("cancel")) {
	        	callbackPayFor2dx(2,m_orderno,"");
	            msg = "用户取消了支付";
	        }
	        Log.d("cocos2d-x jni", "upmp msg---"+msg);	
        }
	 }
	 
	 private static int  getResourceId(String name, String type) {
	    return mMainApp.getResources().getIdentifier(name, type, mMainApp.getPackageName());
	}
		
		//private static LinearLayout myLayout;
	
	@Override
	protected void onResume() {
	    super.onResume();
	    Log.d("cocos2d-x jni","onResume");
	    
	    
	  //程序由后台转入前台的时候调用的方法onResume()中加入下边的关闭锁屏代码  
        if(mWakeLock == null) {  
           PowerManager pm = (PowerManager)getSystemService(Context.POWER_SERVICE);  
           mWakeLock = pm.newWakeLock(PowerManager.SCREEN_BRIGHT_WAKE_LOCK, "XYTEST");  
           mWakeLock.acquire();  
        }  
	}
	@Override
	public void onPause(){
	    super.onPause();
	    Log.d("cocos2d-x jni","onPause");
	    
	    
	  //程序暂停运行于后台时调用的方法，在这里加入下边的移除不锁屏功能代码。  
        if(mWakeLock != null) {  
           mWakeLock.release();  
           mWakeLock = null;  
        }
	}
	@Override
	protected void onNewIntent(Intent intent) {
	    super.onNewIntent(intent);
	}
	public static void Exit() {
		 mMainApp.finish();
		 System.exit(0);
	}
	@Override
    protected void onDestroy() {
	    // TODO Auto-generated method stub
	    super.onDestroy();
	    if(mWakeLock != null) {  
           mWakeLock.release();  
           mWakeLock = null;  
        }
    }

    private void getConfigDataByCpp(){

    	String agent = getResources().getString(R.string.app_agent);

        AppConfig.APPID_WX = getAppSecret("appid_wx",2);
	}
    
    
    //****************** java 调用 c++ 方法 *********************
    /**
     * 从c++获取密钥
     * @param agent
     * @param code  1代理(要设置cpp agent)  2其他
     * @return
     */
  	private static native String getAppSecret(String agent,int code);
  	/**
  	 * 登录回调
  	 * @param code 1成功 2失败  3取消登录
  	 * @param uid
  	 * @param session
  	 */
  	private static native void callbackLoginFor2dx(int code,String uid,String session);
  	/**
  	 * 充值回调  
  	 * @param code 1成功 2失败 
  	 * @param orderno
  	 * @param einfo (发产品id ，没有就空)
  	 */
  	private static native void callbackPayFor2dx(int code,String orderno,String einfo);
  	/**
  	 * 执行某些操作 
  	 * 1 传递 外部参数
  	 * @param code 
  	 * @param para1
  	 */
  	private static native void callbackDoSomethingFor2dx(int code,String para1);

  	/**
  	 * google pay ok
  	 * @param orderno
  	 * @param payinfo
  	 * @param purchasedata
  	 * @param dataSignature
  	 */
  	private static native void callbackGooglePayFor2dx(String orderno,String payinfo,String purchasedata,String dataSignature);
  	
  
	
}

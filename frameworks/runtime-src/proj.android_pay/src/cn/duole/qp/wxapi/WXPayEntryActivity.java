package com.qp.duojinyx.com.wxapi;


import com.qp.duojinyx.com.R;

import com.tencent.mm.sdk.constants.ConstantsAPI;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;
import cn.coolqp.game.AppConfig;
import cn.coolqp.game.QpgameActivity;

public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler{
	
	private static final String TAG = "MicroMsg.SDKSample.WXPayEntryActivity";
	
    private IWXAPI api;
	
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pay_result);
        
    	api = WXAPIFactory.createWXAPI(this, AppConfig.APPID_WX);
        api.handleIntent(getIntent(), this);
    }

	@Override
	protected void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
        api.handleIntent(intent, this);
	}

	@Override
	public void onReq(BaseReq req) {
	}

	@Override
	public void onResp(final BaseResp resp) {
		Log.d("WXPay", "onPayFinish, errCode = " + resp.errCode);


//			AlertDialog.Builder builder = new AlertDialog.Builder(this);
//			builder.setTitle(R.string.app_tip);
//			builder.setMessage(getString(R.string.pay_result_callback_msg, String.valueOf(resp.errCode)));
//			builder.show();

		
		if (resp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
			
			//Toast.makeText(WXPayEntryActivity.this, "Code = " + resp.errCode,Toast.LENGTH_SHORT).show();
			
//			Intent iLaunchMyself = getPackageManager().getLaunchIntentForPackage(getPackageName());
//			//iLaunchMyself.putExtra("code", resp.errCode);
//			Bundle bundle = new Bundle();                           //创建Bundle对象   
//			bundle.putString("wxpayresult", "1"); 
//			bundle.putString("wxpaycode", ""+resp.errCode); 
//			iLaunchMyself.putExtras(bundle); 
//			startActivity(iLaunchMyself);
			
			QpgameActivity.sendpayresult_wxpay(""+resp.errCode);
			
			finish();
		}
	}
}
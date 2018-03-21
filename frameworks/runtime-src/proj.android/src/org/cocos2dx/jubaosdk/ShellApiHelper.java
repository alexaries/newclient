package org.cocos2dx.jubaosdk;

import android.app.Activity;
import com.fanwei.jubaosdk.shell.PayOrder;
import com.fanwei.jubaosdk.shell.FWPay;
import org.cocos2dx.lib.Cocos2dxActivity;

/**
 * @author  石头
 */
public class ShellApiHelper {

	// V1.0 OLD API
	// public static void pay(String appId, String amount, String goodsName, String remark, String payId, String playerId, String channelId) {
	// V2.0 API
	public static void pay(String appId, String amount, String goodsName, String remark, String payId, String playerId) {
		PayOrder order = new PayOrder()
				.setAmount(amount)
				.setGoodsName(goodsName)
				.setRemark(remark)
				.setPayId(payId)
				.setPlayerId(playerId);
				// .setChannelId(channelId);
		FWPay.pay((Activity)Cocos2dxActivity.getContext(), order);
	}

	public static native void nativeDispatch(final int code, final String message);	
}
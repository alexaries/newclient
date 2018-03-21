package cn.coolqp.game;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGLSurfaceView;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import cn.coolqp.game.util.Base64Coder;

public class AvatarManager extends Cocos2dxActivity {
	
	//执行某些操作  100上传头像（1成功 2失败）   200(上传选图ok)  201(上传选图失败)
	private static native void callbackUpAvatarFor2dx(int code,String para1);
	
	int mShowType = 0;//0 头像 1上传
	String userId = "";
	String m_imgweburl = "";
	public void setAvatar(String auserId,String upurl,int stype,int type){
		userId = auserId;
		m_imgweburl = upurl;
		mShowType = stype;
		Log.d("jni","userId=="+userId);
		Log.d("jni","imgweburl=="+m_imgweburl);
		if(type == 0){
			setAvatarFromAlbum();
		}else{
			setAvatarFromTakePhoto();
		}
	}
	
	/**
	 * 选择提示对话框
	 */
	private void setAvatarFromAlbum() {
		Log.d("jni","setAvatarFromAlbum---1");
		/**
		 * 刚开始，我自己也不知道ACTION_PICK是干嘛的，后来直接看Intent源码，
		 * 可以发现里面很多东西，Intent是个很强大的东西，大家一定仔细阅读下
		 */
		Intent intent = new Intent(Intent.ACTION_PICK, null);
		/**
		 * 下面这句话，与其它方式写是一样的效果，如果：
		 * intent.setData(MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
		 * intent.setType(""image/*");设置数据类型
		 * 如果朋友们要限制上传到服务器的图片类型时可以直接写如："image/jpeg 、 image/png等的类型"
		 * 这个地方小马有个疑问，希望高手解答下：就是这个数据URI与类型为什么要分两种形式来写呀？有什么区别？
		 */
		intent.setDataAndType(
				MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
				"image/*");
		
		startActivityForResult(intent, 1);
		Log.d("jni","setAvatarFromAlbum---2");
	}
	
	/**
	 * 选择提示对话框
	 */
	
	private String temp_pic_name;
	private void setAvatarFromTakePhoto() {
		Log.d("jni","setAvatarFromTakePhoto---1");
		/**
		 * 下面这句还是老样子，调用快速拍照功能，至于为什么叫快速拍照，大家可以参考如下官方
		 * 文档，you_sdk_path/docs/guide/topics/media/camera.html
		 * 我刚看的时候因为太长就认真看，其实是错的，这个里面有用的太多了，所以大家不要认为
		 * 官方文档太长了就不看了，其实是错的，这个地方小马也错了，必须改正
		 */
		Date dt = new Date();;
		Long time= dt.getTime();
		temp_pic_name = "avatar_"+time+".jpg";
		Intent intent = new Intent(
				MediaStore.ACTION_IMAGE_CAPTURE);
		//下面这句指定调用相机拍照后的照片存储的路径
		intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri
				.fromFile(new File(Environment
						.getExternalStorageDirectory(),
						temp_pic_name)));
		startActivityForResult(intent, 2);
		Log.d("jni","setAvatarFromTakePhoto---2");
	}

	//设置头像返回结果
	protected void onActivityResult_avatar(int requestCode, int resultCode, Intent data) {
		Log.d("jni","avatar onActivityResult---"+requestCode+"---"+resultCode);
		switch (requestCode) {
		// 如果是直接从相册获取
		case 1:
			if(mShowType == 0){
				startPhotoZoom(data.getData());
			}else if(mShowType == 1){
				getPicBase64Data(data.getData());
			}
			break;
		// 如果是调用相机拍照时
		case 2:
			File temp = new File(Environment.getExternalStorageDirectory()
					+ "/"+temp_pic_name);
			if(mShowType == 0){
				startPhotoZoom(Uri.fromFile(temp));
			}else if(mShowType == 1){
				getPicBase64Data(Uri.fromFile(temp));
			}
			break;
		// 取得裁剪后的图片
		case 3:
			/**
			 * 非空判断大家一定要验证，如果不验证的话，
			 * 在剪裁之后如果发现不满意，要重新裁剪，丢弃
			 * 当前功能时，会报NullException，小马只
			 * 在这个地方加下，大家可以根据不同情况在合适的
			 * 地方做判断处理类似情况
			 * 
			 */
			if(data != null){
				setPicToView(data);
			}
			break;
		default:
			break;

		}
		super.onActivityResult(requestCode, resultCode, data);
		Log.d("jni","onActivityResult---1");
	}
	
	private void getPicBase64Data(Uri uri) {
		Log.d("jni","getPicBase64Data---0");
		
			Bitmap photo = null;
			try {
				photo = MediaStore.Images.Media.getBitmap(this.getContentResolver(), uri);
			
				Bitmap smallphoto = smallBitmap(photo);
				
				
				
				/**
				 * 下面注释的方法是将裁剪之后的图片以Base64Coder的字符方式上
				 * 传到服务器，QQ头像上传采用的方法跟这个类似
				 */
				ByteArrayOutputStream stream = new ByteArrayOutputStream();
				smallphoto.compress(Bitmap.CompressFormat.JPEG, 45, stream);
				byte[] b = stream.toByteArray();
				// 将图片流以字符串形式存储下来
				
				String tp = new String(Base64Coder.encodeLines(b));
				Log.d("jni","getPicBase64Data--len="+tp.length());
				//Log.d("jni","getPicBase64Data---tp="+tp);
				 
				callbackUpAvatarFor2dx(200,tp);
				photo.recycle();
				smallphoto.recycle();
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				callbackUpAvatarFor2dx(201,"");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				callbackUpAvatarFor2dx(201,"");
			}

		Log.d("jni","getPicBase64Data---2");
	}
	
	 private static Bitmap smallBitmap(Bitmap bitmap) {
		  int maxw = 640;
		  int maxh = 640;
		  float scalew = (float)(maxw*1.0/bitmap.getWidth()); 
		  float scaleh = (float)(maxh*1.0/bitmap.getHeight());
		  float minscale= 1f;
		  if(scalew < minscale){
			  minscale = scalew;
		  }
		  if(scaleh < minscale){
			  minscale = scaleh;
		  }
		  Log.d("jni","smallBitmap---"+minscale);
		  Matrix matrix = new Matrix(); 
		  matrix.postScale(minscale,minscale); //长和宽放大缩小的比例
		  Bitmap resizeBmp = Bitmap.createBitmap(bitmap,0,0,bitmap.getWidth(),bitmap.getHeight(),matrix,true);
		  return resizeBmp;
		 }
	
	
	/**
	 * 裁剪图片方法实现
	 * @param uri
	 */
	private void startPhotoZoom(Uri uri) {
		Log.d("jni","startPhotoZoom---0");
		/*
		 * 至于下面这个Intent的ACTION是怎么知道的，大家可以看下自己路径下的如下网页
		 * yourself_sdk_path/docs/reference/android/content/Intent.html
		 * 直接在里面Ctrl+F搜：CROP ，之前小马没仔细看过，其实安卓系统早已经有自带图片裁剪功能,
		 * 是直接调本地库的，小马不懂C C++  这个不做详细了解去了，有轮子就用轮子，不再研究轮子是怎么
		 * 制做的了...吼吼
		 */
		Intent intent = new Intent("com.android.camera.action.CROP");
		intent.setDataAndType(uri, "image/*");
		//下面这个crop=true是设置在开启的Intent中设置显示的VIEW可裁剪
		intent.putExtra("crop", "true");
		// aspectX aspectY 是宽高的比例
		intent.putExtra("aspectX", 1);
		intent.putExtra("aspectY", 1);
		// outputX outputY 是裁剪图片宽高
		intent.putExtra("outputX", 150);
		intent.putExtra("outputY", 150);
		intent.putExtra("return-data", true);
		startActivityForResult(intent, 3);
		Log.d("jni","startPhotoZoom---1");
	}
	
	/**
	 * 保存裁剪之后的图片数据
	 * @param picdata
	 */
	private void setPicToView(Intent picdata) {
		Log.d("jni","setPicToView---1");
		Bundle extras = picdata.getExtras();
		if (extras != null) {
			Bitmap photo = extras.getParcelable("data");
			Drawable drawable = new BitmapDrawable(photo);
			
			/**
			 * 下面注释的方法是将裁剪之后的图片以Base64Coder的字符方式上
			 * 传到服务器，QQ头像上传采用的方法跟这个类似
			 */
			
			ByteArrayOutputStream stream = new ByteArrayOutputStream();
			photo.compress(Bitmap.CompressFormat.JPEG, 60, stream);
			byte[] b = stream.toByteArray();
			// 将图片流以字符串形式存储下来
			
			String tp = new String(Base64Coder.encodeLines(b));
			
			photo.recycle();
			
			uploadAvatar(userId,tp);
			
			//Log.d("jni","setPicToView---"+tp);
			
			/*
			这个地方大家可以写下给服务器上传图片的实现，直接把tp直接上传就可以了，
			服务器处理的方法是服务器那边的事了，吼吼
			
			如果下载到的服务器的数据还是以Base64Coder的形式的话，可以用以下方式转换
			为我们可以用的图片类型就OK啦...吼吼
			Bitmap dBitmap = BitmapFactory.decodeFile(tp);
			Drawable drawable = new BitmapDrawable(dBitmap);
			*/
			
			//ib.setBackgroundDrawable(drawable);
			//iv.setBackgroundDrawable(drawable);
		}
		Log.d("jni","setPicToView---2");
	}
	/**
	 * 上传头像
	 * @param userId
	 * @param imgstr
	 */
	private void uploadAvatar(String userId,String imgstr) {
		Log.d("jni","uploadAvatar---1 url="+m_imgweburl);
		
		String md5Str = MD5(userId + "iw729ka@$rt4ksfa#i2&^%7j134");
		
		if(m_imgweburl.length() > 0){
		
			HttpClient client = new DefaultHttpClient();
	        // 设置上传参数
	        List<NameValuePair> formparams = new ArrayList<NameValuePair>();
	        formparams.add(new BasicNameValuePair("userId", userId));
	        formparams.add(new BasicNameValuePair("sign", md5Str));
	        formparams.add(new BasicNameValuePair("file", imgstr));
	        HttpPost post = new HttpPost(m_imgweburl);
	        UrlEncodedFormEntity entity;
	        try {
	
	                entity = new UrlEncodedFormEntity(formparams, "UTF-8");
	                post.addHeader("Accept",
	                                "text/javascript, textml, application/xml, text/xml");
	                post.addHeader("Accept-Charset", "GBK,utf-8;q=0.7,*;q=0.3");
	                post.addHeader("Accept-Encoding", "gzip,deflate,sdch");
	                post.addHeader("Connection", "Keep-Alive");
	                post.addHeader("Cache-Control", "no-cache");
	                post.addHeader("Content-Type", "application/x-www-form-urlencoded");
	                post.setEntity(entity);
	                Log.d("jni","uploadAvatar---22");
	                HttpResponse response = client.execute(post);
	                HttpEntity e = response.getEntity();
	                int code = response.getStatusLine().getStatusCode();
	                Log.d("jni","uploadAvatar---33 code="+code);
	                if (200 ==code) {
	                        Log.d("jni","uploadAvatar---上传完成");
	                        callbackUpAvatarFor2dx(100,"1");
	                }else{
	                        Log.d("jni","uploadAvatar---上传失败");
	                        callbackUpAvatarFor2dx(100,"2");
	                }
	                client.getConnectionManager().shutdown();
	        } catch (Exception e) {
	                e.printStackTrace();
	        }
		}
        Log.d("jni","uploadAvatar---2");
	}
	
	
	
	public  String MD5(String s) {
        char hexDigits[]={'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'};       
        try {
            byte[] btInput = s.getBytes();
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(btInput);
            // 获得密文
            byte[] md = mdInst.digest();
            // 把密文转换成十六进制的字符串形式
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

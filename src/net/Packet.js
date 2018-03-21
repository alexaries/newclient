/**
 * Created by Administrator on 14-4-24.
 * 网络通信 数据包
 */
var Packet = cc.Class.extend({
    _rpos:0,//读数据位置
    _wpos:0,//写数据位置
    _storage :null,//保存的数据
    DEFAULT_SIZE:0x2000,//包默认大小  4096
    _send:false,//是否是发送的数据包
    _sendPacket:null,//发送的数据包（根据实际长度重建了数据包）
    //发送数据时调用
    init:function (bSend) {
        this._rpos = 0;
        this._wpos = 0;
        this._storage = new ArrayBuffer(this.DEFAULT_SIZE);
        this._send = bSend;
        if(bSend){
            var numarray = new Uint32Array(this._storage,0,4); //包长度 4字节
            numarray[0] = 0;
            var ziptype = new Uint8Array(this._storage,4,1); //压缩标志 1字节
            ziptype[0] = 0;
            this._wpos += 5;
        }
        return true;
    },
    //接收到数据时调用
    initByData:function (data) {
        this._rpos = 0;
        this._wpos = 0;
        this._storage = new ArrayBuffer(data.length);
        var dataarray = new Uint8Array(this._storage);
        for(var i=0;i<data.length;i++){
            dataarray[i] = data[i];
            //log("data[i]="+data[i])
        }
        this._wpos = data.length;
        return true;
    },
    //附加数据
    appendByData:function (data) {
        var sdataarray = new Uint8Array(this._storage);
        var len = this._wpos;
        log("appendByData 3 this._wpos =" + this._wpos);
        var newstorage = new ArrayBuffer(len+data.length);
        var dataarray = new Uint8Array(newstorage);
        for(var i=0;i<len;i++){
            dataarray[i] = sdataarray[i];
        }
        for(var i=len;i<len+data.length;i++){
            dataarray[i] = data[i-len];
        }
        this._wpos = len+data.length;
        this._storage = newstorage;
        return true;
    },
    //抹去多少长度的数据
    eraseData:function (tlen) {
        var sdataarray = new Uint8Array(this._storage);
        var len = sdataarray.length;
        if(len >= tlen){
            var newstorage = new ArrayBuffer(len-tlen);
            var dataarray = new Uint8Array(newstorage);
            for(var i=len-tlen;i<len;i++){
                dataarray[i-(len-tlen)] = sdataarray[i];
            }
            this._storage = newstorage;
            this._wpos = len-tlen;
        }
        return true;
    },
    //获取多少长度的数据
    getDataByLen:function (tlen) {
        var dataarray = null;
        var len = this._wpos;
        if(len >= tlen){
            dataarray= new Uint8Array(this._storage,0,tlen);
        }else{
            dataarray = new Uint8Array();
        }
        return dataarray;
    },
    //获取当前长度
    getCurrLen:function(){
        return this._wpos;
    },
    //清除数据
    clear:function()
    {
        this._rpos = this._wpos = 0;
        this._storage = null;
        this._sendPacket = null;
    },
    //添加byte 1字节
    writeByte:function(intvalue){
        var numarray = new Uint8Array(this._storage,this._wpos,1);
        this._wpos += 1;
        numarray[0] = intvalue;
        this.checkLen();
    },
    //添加short 2字节 --未验证
    writeShort:function(intvalue){
        var numarray = new Uint8Array(this._storage,this._wpos,2);
        this._wpos += 2;
        var atmp1 = ((intvalue&0x000000FF));
        var atmp2 = ((intvalue&0x0000FF00)>>8);
        numarray[1] = atmp1;
        numarray[0] = atmp2; //高位在前
        this.checkLen();
    },
    //添加数字 整形 4字节
    writeInt:function(intvalue){
        var numarray = new Uint8Array(this._storage,this._wpos,4);
        this._wpos += 4;
        var atmp1 = ((intvalue&0x000000FF));
        var atmp2 = ((intvalue&0x0000FF00)>>8);
        var atmp3 = ((intvalue&0x00FF0000)>>16);
        var atmp4 = ((intvalue&0xFF000000)>>24);  //高位在前
        numarray[3] = atmp1;
        numarray[2] = atmp2;
        numarray[1] = atmp3;
        numarray[0] = atmp4;
        this.checkLen();
    },

    //添加数字 long 8字节
    writeLong:function(intvalue){
        //log("intvalue1="+intvalue)
        var numarray = new Uint8Array(this._storage,this._wpos,8);
        this._wpos += 8;
        var atmp1 = ((intvalue&0x00000000000000FF));
        var atmp2 = ((intvalue&0x000000000000FF00)>>8);
        var atmp3 = ((intvalue&0x0000000000FF0000)>>16);
        var atmp4 = ((intvalue&0x00000000FF000000)>>24);  //高位在前

        var intvalue1 = Math.floor((intvalue/0xFFFFFFFF)) //这里必须除一次
        var atmp5 = ((intvalue1&0x00000000000000FF));
        var atmp6 = ((intvalue1&0x000000000000FF00)>>8);
        var atmp7 = ((intvalue1&0x0000000000FF0000)>>16);
        var atmp8 = ((intvalue1&0x00000000FF000000)>>24);   //高位在前

        numarray[7] = atmp1;
        numarray[6] = atmp2;
        numarray[5] = atmp3;
        numarray[4] = atmp4;
        numarray[3] = atmp5;
        numarray[2] = atmp6;
        numarray[1] = atmp7;
        numarray[0] = atmp8;

        this.checkLen();
    },

    //添加字符串 前2个字节做长度
    writeString:function(strData){
        var pos = 0;
        var unicodestr =  this.unicodeToUtf8(strData);
        var charslen = unicodestr.length;
        var len = charslen +2
        var arrData = new Uint8Array(this._storage,this._wpos,len);
        var atmp1 = ((charslen&0x000000FF));
        var atmp2 = ((charslen&0x0000FF00)>>8);
        arrData[1] = atmp1;
        arrData[0] = atmp2;
        for(var i=0;i<unicodestr.length;i++){
            var value = unicodestr.charCodeAt(i);
            var atmp1 = ((value&0x000000FF));
            arrData[pos+2] = atmp1;
            pos++;
        }
        this._wpos += len;
        this.checkLen();
    },

    //设置包长度
    setPacketLen:function(){
        log("send PacketLen ="+this._wpos);
        if(this._send){
            var len = this._wpos;
            var numarray = new Uint8Array(this._storage,0,4);
            var atmp1 = ((len&0x000000FF));
            var atmp2 = ((len&0x0000FF00)>>8);
            var atmp3 = ((len&0x00FF0000)>>16);
            var atmp4 = ((len&0xFF000000)>>24);
            numarray[3] = atmp1;
            numarray[2] = atmp2;
            numarray[1] = atmp3;
            numarray[0] = atmp4;
        }
    },
    // 检查长度
    checkLen:function(){
        if(this._wpos > this.DEFAULT_SIZE){
            log("******error:net data max length")
        }
    },
    //发送时的数据
    data:function(){
        this.setPacketLen();
        var v2 = new Uint8Array(this._storage,0,this._wpos);
        var len = v2.length;
        //log(" p len = "+len)
//        for(var i=0;i<len;i++){
//            log(i+"="+v2[i]);
//        }
        //jsb 要转下 不然发 DEFAULT_SIZE 长度 ； html5是 len 长度
        var senddata = new ArrayBuffer(len);
        var v1 = new Uint8Array(senddata,0,len);
        for(var i=0;i<len;i++){
            v1[i] = v2[i];
        }
        this._sendPacket = senddata;
        return v1.buffer;
    },
    //读取时忽略长度
    readskip:function(num){
        this._rpos += num;
    },
    //读取byte 1字节
    readByte:function(){
        var numarray = new Uint8Array(this._storage,this._rpos,1);
        this._rpos +=1;
        var intvalue = numarray[0];
        return intvalue;
    },
    readBool:function () {
        return (0 != this.readByte());
    },
    //读取short 2字节 --未验证
    readShort:function(){
        var numarray = new Uint8Array(this._storage,this._rpos,2);
        this._rpos +=2;
        var intvalue = numarray[0];
        intvalue = (intvalue<<8) + numarray[1];
        return intvalue;
    },
    //读取int 4字节
    readInt:function(){
        var numarray = new Uint8Array(this._storage,this._rpos,4);
        this._rpos +=4;
        var intvalue = numarray[0];
        intvalue = (intvalue<<8) + numarray[1];
        intvalue = (intvalue<<8) + numarray[2];
        intvalue = (intvalue<<8) + numarray[3];
        return intvalue;
    },
    readLong:function(){
        var numarray = new Uint8Array(this._storage,this._rpos,8);
        this._rpos +=8;

        var intvalue1 = 0;

        var intvalue = numarray[0];                 //要判断首位是0（正数）还是1（负数）
        intvalue = (intvalue<<8) + numarray[1];
        intvalue = (intvalue<<8) + numarray[2];
        intvalue = (intvalue<<8) + numarray[3];

        var intvalue2 =  numarray[4] * 256* 256* 256;  //直接用256乘 不用0xFF
        intvalue2 += numarray[5] * 256* 256;
        intvalue2 += numarray[6] * 256 ;
        intvalue2 += numarray[7];

        intvalue1 = intvalue*256* 256* 256* 256 + intvalue2;

        return intvalue1;
    },


    //读取字符串
    readString:function(){
        var numarray = new Uint8Array(this._storage,this._rpos,2);
        this._rpos +=2;
        var intvalue = numarray[0];
        intvalue = (intvalue<<8) + numarray[1];
        //log("intvalue=="+intvalue);
        var strarray = new Uint8Array(this._storage,this._rpos,intvalue);
        this._rpos +=intvalue;
        var str = this.binayUtf8ToString(strarray,0);
        return str;
    },
    //2进制转 字符串
    binayUtf8ToString:function(buf, begin){
        var i = 0;
        var pos = 0;
        var str ="";
        var unicode = 0 ;
        var flag = 0;
        for (pos = begin; pos < buf.length;){
            flag= buf[pos];
            if ((flag >>>7) === 0 ) {
                str+= String.fromCharCode(buf[pos]);
                pos += 1;

            }
            else if ((flag &0xFC) === 0xFC ){
                unicode = (buf[pos] & 0x3) << 30;
                unicode |= (buf[pos+1] & 0x3F) << 24;
                unicode |= (buf[pos+2] & 0x3F) << 18;
                unicode |= (buf[pos+3] & 0x3F) << 12;
                unicode |= (buf[pos+4] & 0x3F) << 6;
                unicode |= (buf[pos+5] & 0x3F);
                str+= String.fromCharCode(unicode) ;
                pos += 6;

            }else if ((flag &0xF8) === 0xF8 ){
                unicode = (buf[pos] & 0x7) << 24;
                unicode |= (buf[pos+1] & 0x3F) << 18;
                unicode |= (buf[pos+2] & 0x3F) << 12;
                unicode |= (buf[pos+3] & 0x3F) << 6;
                unicode |= (buf[pos+4] & 0x3F);
                str+= String.fromCharCode(unicode) ;
                pos += 5;

            }
            else if ((flag &0xF0) === 0xF0 ){
                unicode = (buf[pos] & 0xF) << 18;
                unicode |= (buf[pos+1] & 0x3F) << 12;
                unicode |= (buf[pos+2] & 0x3F) << 6;
                unicode |= (buf[pos+3] & 0x3F);
                str+= String.fromCharCode(unicode) ;
                pos += 4;

            }

            else if ((flag &0xE0) === 0xE0 ){
                unicode = (buf[pos] & 0x1F) << 12;;
                unicode |= (buf[pos+1] & 0x3F) << 6;
                unicode |= (buf[pos+2] & 0x3F);
                str+= String.fromCharCode(unicode) ;
                pos += 3;

            }
            else if ((flag &0xC0) === 0xC0 ){ //110
                unicode = (buf[pos] & 0x3F) << 6;
                unicode |= (buf[pos+1] & 0x3F);
                str+= String.fromCharCode(unicode) ;
                pos += 2;

            }
            else{
                str+= String.fromCharCode(buf[pos]);
                pos += 1;
            }
        }
        return str;

    },
    //字符串 转 unicode  （字符串含中文）
    unicodeToUtf8:function(str){
        var i, len, ch;
        var utf8Str = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            ch = str.charCodeAt(i);

            if ((ch >= 0x0) && (ch <= 0x7F)) {
                utf8Str += str.charAt(i);

            } else if ((ch >= 0x80) && (ch <= 0x7FF)){
                utf8Str += String.fromCharCode(0xc0 | ((ch >> 6) & 0x1F));
                utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));

            } else if ((ch >= 0x800) && (ch <= 0xFFFF)){
                utf8Str += String.fromCharCode(0xe0 | ((ch >> 12) & 0xF));
                utf8Str += String.fromCharCode(0x80 | ((ch >> 6) & 0x3F));
                utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));

            } else if ((ch >= 0x10000) && (ch <= 0x1FFFFF)){
                utf8Str += String.fromCharCode(0xF0 | ((ch >> 18) & 0x7));
                utf8Str += String.fromCharCode(0x80 | ((ch >> 12) & 0x3F));
                utf8Str += String.fromCharCode(0x80 | ((ch >> 6) & 0x3F));
                utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));

            } else if ((ch >= 0x200000) && (ch <= 0x3FFFFFF)){
                utf8Str += String.fromCharCode(0xF8 | ((ch >> 24) & 0x3));
                utf8Str += String.fromCharCode(0x80 | ((ch >> 18) & 0x3F));
                utf8Str += String.fromCharCode(0x80 | ((ch >> 12) & 0x3F));
                utf8Str += String.fromCharCode(0x80 | ((ch >> 6) & 0x3F));
                utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));

            } else if ((ch >= 0x4000000) && (ch <= 0x7FFFFFFF)){
                utf8Str += String.fromCharCode(0xFC | ((ch >> 30) & 0x1));
                utf8Str += String.fromCharCode(0x80 | ((ch >> 24) & 0x3F));
                utf8Str += String.fromCharCode(0x80 | ((ch >> 18) & 0x3F));
                utf8Str += String.fromCharCode(0x80 | ((ch >> 12) & 0x3F));
                utf8Str += String.fromCharCode(0x80 | ((ch >> 6 ) & 0x3F));
                utf8Str += String.fromCharCode(0x80 | (ch & 0x3F));

            }
        }
        return utf8Str;
    }

});
Packet.create = function (bSend) {
    var sg = new Packet();
    if (sg && sg.init(bSend)) {
        return sg;
    }
    return null;
};
Packet.createByData = function (data) {
    var sg = new Packet();
    if (sg && sg.initByData(data)) {
        return sg;
    }
    return null;
};

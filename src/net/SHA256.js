///**
// * Created by ban on 30/12/16.
// */
///*
// * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
// * in FIPS 180-2
// * Version 2.2 Copyright Angel Marin, Paul Johnston 2000 - 2009.
// * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
// * Distributed under the BSD License
// * See http://pajhome.org.uk/crypt/md5 for details.
// * Also http://anmar.eu.org/projects/jssha2/
// */
//
///*
// * Configurable variables. You may need to tweak these to be compatible with
// * the server-side, but the defaults work in most cases.
// */
//var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase    */
//var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance  */
//
///*
// * These are the functions you'll usually want to call
// * They take string arguments and return either hex or base-64 encoded strings
// */
////var b64_sha256 = function(s){return rstr2b64(rstr_sha256(str2rstr_utf8(s)));};
//
////function hex_sha256(s)  { return rstr2hex(rstr_sha256(str2rstr_utf8(s))); }
////function b64_sha256(s)  { return rstr2b64(rstr_sha256(str2rstr_utf8(s))); }
////function any_sha256(s, e) { return rstr2any(rstr_sha256(str2rstr_utf8(s)), e); }
////function hex_hmac_sha256(k, d)
////{ return rstr2hex(rstr_hmac_sha256(str2rstr_utf8(k), str2rstr_utf8(d))); }
////function b64_hmac_sha256(k, d)
////{ return rstr2b64(rstr_hmac_sha256(str2rstr_utf8(k), str2rstr_utf8(d))); }
////function any_hmac_sha256(k, d, e)
////{ return rstr2any(rstr_hmac_sha256(str2rstr_utf8(k), str2rstr_utf8(d)), e); }
//
///*
// * Perform a simple self-test to see if the VM is working
// */
//function sha256_vm_test()
//{
//    return hex_sha256("abc").toLowerCase() ==
//        "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
//}
//
///*
// * Calculate the sha256 of a raw string
// */
//function rstr_sha256(s)
//{
//    return binb2rstr(binb_sha256(rstr2binb(s), s.length * 8));
//}
//
///*
// * Calculate the HMAC-sha256 of a key and some data (raw strings)
// */
//function rstr_hmac_sha256(key, data)
//{
//    var bkey = rstr2binb(key);
//    if(bkey.length > 16) bkey = binb_sha256(bkey, key.length * 8);
//
//    var ipad = Array(16), opad = Array(16);
//    for(var i = 0; i < 16; i++)
//    {
//        ipad[i] = bkey[i] ^ 0x36363636;
//        opad[i] = bkey[i] ^ 0x5C5C5C5C;
//    }
//
//    var hash = binb_sha256(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
//    return binb2rstr(binb_sha256(opad.concat(hash), 512 + 256));
//}
//
///*
// * Convert a raw string to a hex string
// */
//function rstr2hex(input)
//{
//    try { hexcase } catch(e) { hexcase=0; }
//    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
//    var output = "";
//    var x;
//    for(var i = 0; i < input.length; i++)
//    {
//        x = input.charCodeAt(i);
//        output += hex_tab.charAt((x >>> 4) & 0x0F)
//            + hex_tab.charAt( x    & 0x0F);
//    }
//    return output;
//}
//
///*
// * Convert a raw string to a base-64 string
// */
//function rstr2b64(input)
//{
//    try { b64pad } catch(e) { b64pad=''; }
//    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
//    var output = "";
//    var len = input.length;
//    for(var i = 0; i < len; i += 3)
//    {
//        var triplet = (input.charCodeAt(i) << 16)
//            | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
//            | (i + 2 < len ? input.charCodeAt(i+2)   : 0);
//        for(var j = 0; j < 4; j++)
//        {
//            if(i * 8 + j * 6 > input.length * 8) output += b64pad;
//            else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
//        }
//    }
//    return output;
//}
//
///*
// * Convert a raw string to an arbitrary string encoding
// */
//function rstr2any(input, encoding)
//{
//    var divisor = encoding.length;
//    var remainders = Array();
//    var i, q, x, quotient;
//
//    /* Convert to an array of 16-bit big-endian values, forming the dividend */
//    var dividend = Array(Math.ceil(input.length / 2));
//    for(i = 0; i < dividend.length; i++)
//    {
//        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
//    }
//
//    /*
//     * Repeatedly perform a long division. The binary array forms the dividend,
//     * the length of the encoding is the divisor. Once computed, the quotient
//     * forms the dividend for the next step. We stop when the dividend is zero.
//     * All remainders are stored for later use.
//     */
//    while(dividend.length > 0)
//    {
//        quotient = Array();
//        x = 0;
//        for(i = 0; i < dividend.length; i++)
//        {
//            x = (x << 16) + dividend[i];
//            q = Math.floor(x / divisor);
//            x -= q * divisor;
//            if(quotient.length > 0 || q > 0)
//                quotient[quotient.length] = q;
//        }
//        remainders[remainders.length] = x;
//        dividend = quotient;
//    }
//
//    /* Convert the remainders to the output string */
//    var output = "";
//    for(i = remainders.length - 1; i >= 0; i--)
//        output += encoding.charAt(remainders[i]);
//
//    /* Append leading zero equivalents */
//    var full_length = Math.ceil(input.length * 8 /
//        (Math.log(encoding.length) / Math.log(2)))
//    for(i = output.length; i < full_length; i++)
//        output = encoding[0] + output;
//
//    return output;
//}
//
///*
// * Encode a string as utf-8.
// * For efficiency, this assumes the input is valid utf-16.
// */
//function str2rstr_utf8(input)
//{
//    var output = "";
//    var i = -1;
//    var x, y;
//
//    while(++i < input.length)
//    {
//        /* Decode utf-16 surrogate pairs */
//        x = input.charCodeAt(i);
//        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
//        if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
//        {
//            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
//            i++;
//        }
//
//        /* Encode output as utf-8 */
//        if(x <= 0x7F)
//            output += String.fromCharCode(x);
//        else if(x <= 0x7FF)
//            output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
//                0x80 | ( x     & 0x3F));
//        else if(x <= 0xFFFF)
//            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
//                0x80 | ((x >>> 6 ) & 0x3F),
//                0x80 | ( x     & 0x3F));
//        else if(x <= 0x1FFFFF)
//            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
//                0x80 | ((x >>> 12) & 0x3F),
//                0x80 | ((x >>> 6 ) & 0x3F),
//                0x80 | ( x     & 0x3F));
//    }
//    return output;
//}
//
///*
// * Encode a string as utf-16
// */
//function str2rstr_utf16le(input)
//{
//    var output = "";
//    for(var i = 0; i < input.length; i++)
//        output += String.fromCharCode( input.charCodeAt(i)    & 0xFF,
//            (input.charCodeAt(i) >>> 8) & 0xFF);
//    return output;
//}
//
//function str2rstr_utf16be(input)
//{
//    var output = "";
//    for(var i = 0; i < input.length; i++)
//        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
//            input.charCodeAt(i)    & 0xFF);
//    return output;
//}
//
///*
// * Convert a raw string to an array of big-endian words
// * Characters >255 have their high-byte silently ignored.
// */
//function rstr2binb(input)
//{
//    var output = Array(input.length >> 2);
//    for(var i = 0; i < output.length; i++)
//        output[i] = 0;
//    for(var i = 0; i < input.length * 8; i += 8)
//        output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
//    return output;
//}
//
///*
// * Convert an array of big-endian words to a string
// */
//function binb2rstr(input)
//{
//    var output = "";
//    for(var i = 0; i < input.length * 32; i += 8)
//        output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
//    return output;
//}
//
///*
// * Main sha256 function, with its support functions
// */
//function sha256_S (X, n) {return ( X >>> n ) | (X << (32 - n));}
//function sha256_R (X, n) {return ( X >>> n );}
//function sha256_Ch(x, y, z) {return ((x & y) ^ ((~x) & z));}
//function sha256_Maj(x, y, z) {return ((x & y) ^ (x & z) ^ (y & z));}
//function sha256_Sigma0256(x) {return (sha256_S(x, 2) ^ sha256_S(x, 13) ^ sha256_S(x, 22));}
//function sha256_Sigma1256(x) {return (sha256_S(x, 6) ^ sha256_S(x, 11) ^ sha256_S(x, 25));}
//function sha256_Gamma0256(x) {return (sha256_S(x, 7) ^ sha256_S(x, 18) ^ sha256_R(x, 3));}
//function sha256_Gamma1256(x) {return (sha256_S(x, 17) ^ sha256_S(x, 19) ^ sha256_R(x, 10));}
//function sha256_Sigma0512(x) {return (sha256_S(x, 28) ^ sha256_S(x, 34) ^ sha256_S(x, 39));}
//function sha256_Sigma1512(x) {return (sha256_S(x, 14) ^ sha256_S(x, 18) ^ sha256_S(x, 41));}
//function sha256_Gamma0512(x) {return (sha256_S(x, 1) ^ sha256_S(x, 8) ^ sha256_R(x, 7));}
//function sha256_Gamma1512(x) {return (sha256_S(x, 19) ^ sha256_S(x, 61) ^ sha256_R(x, 6));}
//
//var sha256_K = new Array
//(
//    1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993,
//    -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987,
//    1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
//    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
//    -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585,
//    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
//    1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885,
//    -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344,
//    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
//    1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872,
//    -1866530822, -1538233109, -1090935817, -965641998
//);
//
//function binb_sha256(m, l)
//{
//    var HASH = new Array(1779033703, -1150833019, 1013904242, -1521486534,
//        1359893119, -1694144372, 528734635, 1541459225);
//    var W = new Array(64);
//    var a, b, c, d, e, f, g, h;
//    var i, j, T1, T2;
//
//    /* append padding */
//    m[l >> 5] |= 0x80 << (24 - l % 32);
//    m[((l + 64 >> 9) << 4) + 15] = l;
//
//    for(i = 0; i < m.length; i += 16)
//    {
//        a = HASH[0];
//        b = HASH[1];
//        c = HASH[2];
//        d = HASH[3];
//        e = HASH[4];
//        f = HASH[5];
//        g = HASH[6];
//        h = HASH[7];
//
//        for(j = 0; j < 64; j++)
//        {
//            if (j < 16) W[j] = m[j + i];
//            else W[j] = safe_add(safe_add(safe_add(sha256_Gamma1256(W[j - 2]), W[j - 7]),
//                sha256_Gamma0256(W[j - 15])), W[j - 16]);
//
//            T1 = safe_add(safe_add(safe_add(safe_add(h, sha256_Sigma1256(e)), sha256_Ch(e, f, g)),
//                sha256_K[j]), W[j]);
//            T2 = safe_add(sha256_Sigma0256(a), sha256_Maj(a, b, c));
//            h = g;
//            g = f;
//            f = e;
//            e = safe_add(d, T1);
//            d = c;
//            c = b;
//            b = a;
//            a = safe_add(T1, T2);
//        }
//
//        HASH[0] = safe_add(a, HASH[0]);
//        HASH[1] = safe_add(b, HASH[1]);
//        HASH[2] = safe_add(c, HASH[2]);
//        HASH[3] = safe_add(d, HASH[3]);
//        HASH[4] = safe_add(e, HASH[4]);
//        HASH[5] = safe_add(f, HASH[5]);
//        HASH[6] = safe_add(g, HASH[6]);
//        HASH[7] = safe_add(h, HASH[7]);
//    }
//    return HASH;
//}
//
//function safe_add (x, y)
//{
//    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
//    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
//    return (msw << 16) | (lsw & 0xFFFF);
//}
//
//var b64_sha256 = function(s){return rstr2b64(rstr_sha256(str2rstr_utf8(s)));};

/*
 * A JavaScript implementation of the SHA256 hash function.
 *
 * FILE:	sha256.js
 * VERSION:	0.8
 * AUTHOR:	Christoph Bichlmeier <informatik@zombiearena.de>
 *
 * NOTE: This version is not tested thoroughly!
 *
 * Copyright (c) 2003, Christoph Bichlmeier
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * ======================================================================
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHORS ''AS IS'' AND ANY EXPRESS
 * OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHORS OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* SHA256 logical functions */
function rotateRight(n,x) {
    return ((x >>> n) | (x << (32 - n)));
}
function choice(x,y,z) {
    return ((x & y) ^ (~x & z));
}
function majority(x,y,z) {
    return ((x & y) ^ (x & z) ^ (y & z));
}
function sha256_Sigma0(x) {
    return (rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x));
}
function sha256_Sigma1(x) {
    return (rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x));
}
function sha256_sigma0(x) {
    return (rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3));
}
function sha256_sigma1(x) {
    return (rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10));
}
function sha256_expand(W, j) {
    return (W[j&0x0f] += sha256_sigma1(W[(j+14)&0x0f]) + W[(j+9)&0x0f] +
        sha256_sigma0(W[(j+1)&0x0f]));
}

/* Hash constant words K: */
var K256 = new Array(
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
);

/* global arrays */
var ihash, count, buffer;
var sha256_hex_digits = "0123456789abcdef";

/* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters:
 overflow) */
function safe_add(x, y)
{
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
}

/* Initialise the SHA256 computation */
function sha256_init() {
    ihash = new Array(8);
    count = new Array(2);
    buffer = new Array(64);
    count[0] = count[1] = 0;
    ihash[0] = 0x6a09e667;
    ihash[1] = 0xbb67ae85;
    ihash[2] = 0x3c6ef372;
    ihash[3] = 0xa54ff53a;
    ihash[4] = 0x510e527f;
    ihash[5] = 0x9b05688c;
    ihash[6] = 0x1f83d9ab;
    ihash[7] = 0x5be0cd19;
}

/* Transform a 512-bit message block */
function sha256_transform() {
    var a, b, c, d, e, f, g, h, T1, T2;
    var W = new Array(16);

    /* Initialize registers with the previous intermediate value */
    a = ihash[0];
    b = ihash[1];
    c = ihash[2];
    d = ihash[3];
    e = ihash[4];
    f = ihash[5];
    g = ihash[6];
    h = ihash[7];

    /* make 32-bit words */
    for(var i=0; i<16; i++)
        W[i] = ((buffer[(i<<2)+3]) | (buffer[(i<<2)+2] << 8) | (buffer[(i<<2)+1]
        << 16) | (buffer[i<<2] << 24));

    for(var j=0; j<64; j++) {
        T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j];
        if(j < 16) T1 += W[j];
        else T1 += sha256_expand(W, j);
        T2 = sha256_Sigma0(a) + majority(a, b, c);
        h = g;
        g = f;
        f = e;
        e = safe_add(d, T1);
        d = c;
        c = b;
        b = a;
        a = safe_add(T1, T2);
    }

    /* Compute the current intermediate hash value */
    ihash[0] += a;
    ihash[1] += b;
    ihash[2] += c;
    ihash[3] += d;
    ihash[4] += e;
    ihash[5] += f;
    ihash[6] += g;
    ihash[7] += h;
}

/* Read the next chunk of data and update the SHA256 computation */
function sha256_update(data, inputLen) {
    var i, index, curpos = 0;
    /* Compute number of bytes mod 64 */
    index = ((count[0] >> 3) & 0x3f);
    var remainder = (inputLen & 0x3f);

    /* Update number of bits */
    if ((count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
    count[1] += (inputLen >> 29);

    /* Transform as many times as possible */
    for(i=0; i+63<inputLen; i+=64) {
        for(var j=index; j<64; j++)
            buffer[j] = data.charCodeAt(curpos++);
        sha256_transform();
        index = 0;
    }

    /* Buffer remaining input */
    for(var j=0; j<remainder; j++)
        buffer[j] = data.charCodeAt(curpos++);
}

/* Finish the computation by operations such as padding */
function sha256_final() {
    var index = ((count[0] >> 3) & 0x3f);
    buffer[index++] = 0x80;
    if(index <= 56) {
        for(var i=index; i<56; i++)
            buffer[i] = 0;
    } else {
        for(var i=index; i<64; i++)
            buffer[i] = 0;
        sha256_transform();
        for(var i=0; i<56; i++)
            buffer[i] = 0;
    }
    buffer[56] = (count[1] >>> 24) & 0xff;
    buffer[57] = (count[1] >>> 16) & 0xff;
    buffer[58] = (count[1] >>> 8) & 0xff;
    buffer[59] = count[1] & 0xff;
    buffer[60] = (count[0] >>> 24) & 0xff;
    buffer[61] = (count[0] >>> 16) & 0xff;
    buffer[62] = (count[0] >>> 8) & 0xff;
    buffer[63] = count[0] & 0xff;
    sha256_transform();
}

/* Split the internal hash values into an array of bytes */
function sha256_encode_bytes() {
    var j=0;
    var output = new Array(32);
    for(var i=0; i<8; i++) {
        output[j++] = ((ihash[i] >>> 24) & 0xff);
        output[j++] = ((ihash[i] >>> 16) & 0xff);
        output[j++] = ((ihash[i] >>> 8) & 0xff);
        output[j++] = (ihash[i] & 0xff);
    }
    return output;
}

/* Get the internal hash as a hex string */
function sha256_encode_hex() {
    var output = new String();
    for(var i=0; i<8; i++) {
        for(var j=28; j>=0; j-=4)
            output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f);
    }
    return output;
}

/* Main function: returns a hex string representing the SHA256 value of the
 given data */
function sha256_digest(data) {
    sha256_init();
    sha256_update(data, data.length);
    sha256_final();
    return sha256_encode_hex();
}

/* test if the JS-interpreter is working properly */
function sha256_self_test()
{
    return sha256_digest("message digest") ==
        "f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";
}


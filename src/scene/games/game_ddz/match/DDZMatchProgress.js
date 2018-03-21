/**
 * Created by apple on 14-9-11.
 */

var DDZMatchProgress = cc.Node.extend({
    mIndex:0, //某位置
    mMatchNameLabel:null,
    mCountLabel:null,
    mDifenLabel:null,
    mRankLabel:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();
            //xxx

            var matchnameLabel = cc.LabelTTF.create("", sGameData.mFontname,30);
            matchnameLabel.attr({
                x : 0,
                y : 0,
                anchorY:0.5
            });
            this.addChild(matchnameLabel, 5);
            matchnameLabel.setColor(cc.color(255,255,0))
            this.mMatchNameLabel = matchnameLabel;

            var countLabel = cc.LabelTTF.create("", sGameData.mFontname,24);
            countLabel.attr({
                x : -200,
                y : -50,
                anchorY:0.5
            });
            this.addChild(countLabel, 5);
            countLabel.setColor(cc.color(255,208,12))
            this.mCountLabel = countLabel;

            var difenLabel = cc.LabelTTF.create("", sGameData.mFontname,24);
            difenLabel.attr({
                x : 0,
                y : -50,
                anchorY:0.5
            });
            this.addChild(difenLabel, 5);
            difenLabel.setColor(cc.color(255,208,12))
            this.mDifenLabel = difenLabel;

            var rankLabel = cc.LabelTTF.create("", sGameData.mFontname,24);
            rankLabel.attr({
                x : 200,
                y : -50,
                anchorY:0.5
            });
            this.addChild(rankLabel, 5);
            rankLabel.setColor(cc.color(255,208,12))
            this.mRankLabel = rankLabel;

            this.updateInfo();

            bRet = true;
        }
        return bRet;
    },
    updateInfo:function(){
        if(this.mMatchNameLabel){
            this.mMatchNameLabel.setString(sGameData.mCurrMatch.name)
        }

        if(this.mCountLabel){
            //sResWord.w_match_currju_s1+" "+sGameData.mCurrMatch.currPlayCount+" "+sResWord.w_match_currju_s2
            var data = sGameData.mCurrMatch.lundatas[sGameData.mCurrMatch.currPlayLun-1];
            var msg = sResWord.w_match_currju_s1+sGameData.mCurrMatch.currPlayLun+sResWord.w_match_lun+sResWord.w_match_currju_s1+sGameData.mCurrMatch.currLunPlayCount+"/"+data.playcount+sResWord.w_match_ju;
            this.mCountLabel.setString(msg)
        }

        if(this.mDifenLabel){
            this.mDifenLabel.setString(sResWord.w_match_currdifen+": "+sGameData.mCurrMatch.basicGScore)
        }

        if(this.mRankLabel){
            var rank = "-";
            if(sGameData.mCurrMatch.rank > 0){
                rank = sGameData.mCurrMatch.rank
            }
            this.mRankLabel.setString(sResWord.w_match_currrank+": "+rank)
        }

    }

});
DDZMatchProgress.create = function () {
    var sg = new DDZMatchProgress();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

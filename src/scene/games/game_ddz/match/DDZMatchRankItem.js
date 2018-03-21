/**
 * Created by apple on 14-9-11.
 */

var DDZMatchRankItem = cc.TableViewCell.extend({
    mIndex:0, //某位置
    mRankData:null,
    init:function () {
        var bRet = false;
        if (this._super()) {
            var size = cc.director.getWinSize();

            var rankLabel = cc.LabelTTF.create(""+this.mRankData.rank, sGameData.mFontname,24);
            this.addChild(rankLabel)
            rankLabel.setPosition(cc.p(130,30))
            rankLabel.setTag(8001)

            var nameLabel = cc.LabelTTF.create(""+this.mRankData.nickName, sGameData.mFontname,24);
            this.addChild(nameLabel)
            nameLabel.setPosition(cc.p(278,30))
            nameLabel.setTag(8002)

            var countLabel = cc.LabelTTF.create(""+this.mRankData.playCount, sGameData.mFontname,24);
            this.addChild(countLabel)
            countLabel.setPosition(cc.p(420,30))
            countLabel.setTag(8003)

            var scoreLabel = cc.LabelTTF.create(""+this.mRankData.matchScore, sGameData.mFontname,24);
            this.addChild(scoreLabel)
            scoreLabel.setPosition(cc.p(540,30))
            scoreLabel.setTag(8004)
            this.setNameScale();

            //xxx
            bRet = true;
        }
        return bRet;
    },
    updateInfo:function(){

        var rankLabel = this.getChildByTag(8001)
        if(rankLabel){
            rankLabel.setString(""+this.mRankData.rank)
        }

        var nameLabel = this.getChildByTag(8002)
        if(nameLabel){
            nameLabel.setString(""+this.mRankData.nickName)
        }
        this.setNameScale();

        var countLabel = this.getChildByTag(8003)
        if(countLabel){
            countLabel.setString(""+this.mRankData.playCount)
        }

        var scoreLabel = this.getChildByTag(8004)
        if(scoreLabel){
            scoreLabel.setString(""+this.mRankData.matchScore)
        }

    },
    setNameScale:function(){
        var nameLabel = this.getChildByTag(8002)
        if(nameLabel) {
            if (nameLabel.getContentSize().width > 170) {
                nameLabel.setScale(170 / nameLabel.getContentSize().width);
            }else{
                nameLabel.setScale(1);
            }
        }
    },
    choose:function(){

    },
    unchoose:function(){

    }
});
DDZMatchRankItem.create = function (data,index) {
    var sg = new DDZMatchRankItem();
    if (sg) {
        sg.mRankData = data;
        sg.mIndex = index
        sg.init()
        return sg;
    }
    return null;
};

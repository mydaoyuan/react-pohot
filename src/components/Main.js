import 'normalize.css/normalize.css';
import 'styles/App.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './ImgFigure'
import ImgControl from './ImgControl'
import imageJsonDatas from '../data/imageDatas.json';
import {getRangeRandom, get30degRandom} from '../util/util'

const imageDatas = imageJsonDatas.map((image) => {
  image.imgUrl = require(`../images/${image.fileName}`);
  return image;
});

// 舞台组件
class AppComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      imgsArrangeArr: []
    };
    this.Constant = {
      centPos: {
        left: 0,
        right: 0
      },
      hPosRange: {    // 水平方向取值范围
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    }
    // 重新布局图片方法
    this.rearrange = (centerIndex) => {
      var centPos = this.Constant.centPos,
          hPosRange = this.Constant.hPosRange,
          vPosRange = this.Constant.vPosRange,
          hPosRangeLeftSecX = hPosRange.leftSecX,
          hposRangeRightSecX = hPosRange.rightSecX,
          hPosRangeY = hPosRange.y,
          vPosRangeTopY = vPosRange.topY,
          vPosRangeX = vPosRange.x,
          imgsArrangeArr = this.state.imgsArrangeArr,

          imgsArrangeTopArr = [],
          topImgNum = Math.ceil(Math.random() * 2),
          topImgSpliceIndex = 0,
          imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

      // 居中 centerIndex 图片
      imgsArrangeCenterArr[0] = {
        pos: centPos,
        rorate: 0,
        isInverse: false,
        isCenter: true
      }

      // 取出要布局上侧的图片状态信息
      topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum))
      imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

      // 布局位于上册的图片
      imgsArrangeTopArr.forEach((v, i)=>{
        imgsArrangeTopArr[i] = {
          pos: {
            top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
            left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
          },
          rotate: get30degRandom(),
          isInverse: false,
          isCenter: false
        }
      })

      // 布局左右两侧
      for( var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
        var hPosRangeLORX = null;
        // 前半部分布局左边， 右半部分布局右边
        if (i < k) {
          hPosRangeLORX = hPosRangeLeftSecX;
        } else {
          hPosRangeLORX = hposRangeRightSecX
        }

        imgsArrangeArr[i] = {
          pos: {
            top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
            left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
          },
          rotate: get30degRandom(),
          isInverse: false,
          isCenter: false
        }
      }


      if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
        for (let topImg of imgsArrangeTopArr) {
          imgsArrangeArr.splice(topImgSpliceIndex, 0, topImg)
        }
      }

      imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0])

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      })
    }
    // 闭包函数，绑定index数值
    this.rangeHand = (index) => {
      return function() {
        this.rearrange(index);
      }.bind(this);
    }

    this.inverseHand = (index) => {
      return function() {
        var imgsArrangeArr = this.state.imgsArrangeArr;
        imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

        this.setState({
          imgsArrangeArr: imgsArrangeArr
        })
      }.bind(this);
    }
  }

// 初始化舞台数据
  componentDidMount() {
    // 舞台大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.img0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2);

    this.Constant.centPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }
    // 计算左侧右侧图片排布取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW
    this.Constant.hPosRange.y[0] = -halfImgH
    this.Constant.hPosRange.y[1] = stageH - halfImgH
    // 计算上侧图片排布取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW

    this.rearrange(0); // 定位第一张图片
  }

  render() {
    var controllerUntils = [],
        imgFigure = [];
    imageDatas.forEach((data, index)=>{
      if (!this.state.imgsArrangeArr[index]) {
          this.state.imgsArrangeArr[index] = {
            pos: {
              left: 0,
              top: 0
            },
            rotate: 0,
            isInverse: false,
            isCenter: false
          }
      }
      // 图片组件
      imgFigure.push(
        <ImgFigure
        data={data}
        key={index}
        ref={'img' + index}
        arrange={this.state.imgsArrangeArr[index]}
        center={this.rangeHand(index)}
        inverse={this.inverseHand(index)}
        />
      );

      // 控制器组件
      controllerUntils.push(
        <ImgControl
          key={index}
          arrange={this.state.imgsArrangeArr[index]}
          center={this.rangeHand(index)}
          inverse={this.inverseHand(index)}
        />
      )
    })

    return (
      <section className="stage" ref="stage">
        <div className="iconfont icon--surprised"></div>
        <section className="img-sec">
          {imgFigure}
        </section>
        <nav className="controller-nav">
          {controllerUntils}
        </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

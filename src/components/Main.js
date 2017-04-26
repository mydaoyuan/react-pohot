require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

let imageDatas = require('../data/imageDatas.json');

// get img url
imageDatas = ((imgArr) => {
  for (let img of imgArr) {
    img.imgUrl = `../images/${img.fileName}`
  }
  return imgArr
})(imageDatas)

let ImgFigure = React.createClass({
  render() {
    return <figure className="imgFigure">
             <img src={this.props.data.imgUrl}
                  alt={this.props.data.title}
                  className="img"
              />
              <figcaption>
                <h2 className="imgTitle">{this.props.data.title}</h2>
              </figcaption>
           </figure>
  }
})


class AppComponent extends React.Component {

  getInitialState() {
    return {
      // imgsArrangeArr: [
      //   {
      //     pos: {
      //       left: 0,
      //       top: 0
      //     }
      //   }
      // ]
      like: '123'
    }
  }

  Constant: {
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

  componentDidMount() {
    // this.setStates
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
    this.Constant.hPosRange.leftSecY[1] = halfStageW - halfImgW * 3
    this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW
    this.Constant.hPosRange.rightSecY[0] = stageW - halfImgW
    this.Constant.hPosRange.y[0] = -halfImgH
    this.Constant.hPosRange.y[1] = stageH - halfImgH
    // 计算上侧图片排布取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3
    this.Constant.vPosRange.x[0] = halfImgW - imgW;
    this.Constant.vPosRange.x[1] = halfImgW

  }
  // 重新布局图片
  rearrange() {

  }
  render() {
    var controllerUntils = [],
        imgFigure = [];
        console.log(this)
        imageDatas.forEach((data, index)=>{
          // if (!this.state.imgsArrangeArr[index]) {
          //     this.state.imgsArrangeArr[index] = {
          //       pos: {
          //         left: 0,
          //         top: 0
          //       }
          //     }
          // }
          imgFigure.push(<ImgFigure data={data} key={data.fileName} ref={'img' + index} />);
        })
    return (
      <section className="stage" ref="stage">
        <h1>{this.state.like}</h1>
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

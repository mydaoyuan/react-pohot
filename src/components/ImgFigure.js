import React from 'react';

// 图片组件
class ImgFigure extends React.Component {

  render() {
    let styleObj = {};
    let clickHand = null;

    // 如果props指定位置则使用
    if (this.props.arrange.pos) {
        styleObj = this.props.arrange.pos
    }
    // 如果指定旋转角度
    if (this.props.arrange.rotate) {
      (['', 'WebKit', 'ms', 'Moz']).forEach((v)=>{
          styleObj[v + 'transform'] = 'rotate(' + this.props.arrange.rotate + ')';
      })
    }
    // 如果为中心图片
    if (this.props.arrange.isCenter) {
      clickHand = this.props.inverse;
      styleObj['zIndex'] = '100';
    } else {
      clickHand = this.props.center;
    }
    // 指定类名
    let imgClassName = 'imgFigure';
    imgClassName += this.props.arrange.isInverse ? ' isInverse': '';

    let data = this.props.data;

    return (
      <figure
        className={imgClassName}
        style={styleObj}
        onClick={clickHand}
        >
        <img
          src={data.imgUrl}
          alt={data.title}
          className='img'
          />
        <figcaption>
          <h2
            className='imgTitle'
            >
            {data.title}
          </h2>
        </figcaption>
        <div
          className='imgBack'
          >
          <p>{data.desc}</p>
        </div>
      </figure>
    )
  }
}

ImgFigure.propTypes = {
  data: React.PropTypes.object.isRequired,      // 每张图片的信息
  arrange: React.PropTypes.object.isRequired,   // 每张图片的位置信息
  inverse: React.PropTypes.func.isRequired,     // 翻转当前图片的回调函数
  center: React.PropTypes.func.isRequired       // 将当前图片设为中心图片，同时调整所有图片位置的回调函数
};

export default ImgFigure;

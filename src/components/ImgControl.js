import React from 'react';

class ImgControl extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(e){
    e.stopPropagation();
    e.preventDefault();

    if(this.props.arrange.isCenter){
        this.props.inverse();
    }else {
        this.props.center();
    }
  }

  render () {
    let spanClass = 'controller-unit iconfont ' + (this.props.arrange.isCenter ? ' is-center':'') + (this.props.arrange.isInverse? ' is-inverse' : '');

    return(
      <span className={spanClass} onClick={this.handleClick.bind(this)}> </span>
    )
  }
}

ImgControl.propTypes = {
  arrange: React.PropTypes.object.isRequired,
  inverse: React.PropTypes.func.isRequired,
  center: React.PropTypes.func.isRequired
}

export default ImgControl;

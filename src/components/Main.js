require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let imageDatas = require('../data/imageDatas.json');

// get img url
imageDatas = ((imgArr) => {
  for (let img of imgArr) {
    img.imgUrl = `../images/${img.fileName}`
  }
  return imgArr
})(imageDatas)

class AppComponent extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

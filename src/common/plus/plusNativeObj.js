import storage from '../data/storage'

class plusNativeObj {
  static view = null;

  constructor() {

  }

  createView(list,h) {
    const top = new storage().getBarHeight()+47;
    this.view = new plus.nativeObj.ImageSlider('view', {
      top:top+'px',
      left: '0px',
      height: h,
      width: '100%',
      images: list
    });
    return this.view
  }
  closeView(){
    this.view.close();
    this.view = null;
  }
}

export default plusNativeObj

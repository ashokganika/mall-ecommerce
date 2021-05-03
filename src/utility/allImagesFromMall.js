const allImagesFromMall = (mall) => {
  const allShopImages = mall?.shops?.reduce((arr, shop) => {
    const imgs = shop?.shopsImages?.reduce((imgArr, img) => {
      imgArr.push(img.urlName);
      return imgArr;
    }, []);
    arr = [...arr, ...imgs];
    return arr;
  }, []);
  return [...allShopImages, mall.mallImage.imageName];
};

export default allImagesFromMall;

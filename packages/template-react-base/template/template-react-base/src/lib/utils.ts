export const screenWidth = 1920;
export const screenHeight = 1080;
export const onResize = () => {
  const winWidth = window.innerWidth; // 屏幕宽
  const winHeight = window.innerHeight; // 屏幕高
  const scaleX = winWidth / screenWidth; // 实际宽 / 设计图宽
  const scaleY = winHeight / screenHeight; // 实际高 / 设计图高
  const scale = scaleX > scaleY ? scaleY : scaleX;
  return {
    width: winWidth,
    height: winHeight,
    scale,
    left: (winWidth - screenWidth * scale) / 2,
    top: (winHeight - screenHeight * scale) / 2,
  };
};
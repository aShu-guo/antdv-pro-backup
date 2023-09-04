export default eventHandler((event) => {
  setResponseStatus(event, 401);
  return {
    bizCode: 401,
    message: '请先登录',
  };
});

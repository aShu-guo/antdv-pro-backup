export default eventHandler((event) => {
  setResponseStatus(event, 403);
  return {
    bizCode: 403,
    message: '请先登录',
  };
});

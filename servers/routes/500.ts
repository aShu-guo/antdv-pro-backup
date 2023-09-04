export default eventHandler((event) => {
  setResponseStatus(event, 500);
  return {
    bizCode: 500,
    message: '服务器错误',
  };
});

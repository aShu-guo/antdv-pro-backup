export default eventHandler((event) => {
  const id = event.context.params.id;
  if (typeof id !== 'number') {
    setResponseStatus(event, 403);
    return {
      bizCode: 403,
      message: '删除失败',
    };
  }
  return {
    bizCode: 200,
    message: '删除成功',
  };
});

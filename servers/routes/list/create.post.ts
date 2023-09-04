export default eventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  return {
    bizCode: 200,
    message: '创建成功',
  };
});

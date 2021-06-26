const Koa = require('koa');
const app = new Koa();

const PORT = process.env.PORT || 5000;

// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(PORT, () => {
    console.log(`listenining on port: ${PORT}`);
});
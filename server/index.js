const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-body-parser');
const cors = require('@koa/cors');

const app = new Koa();
const router = new KoaRouter();

const PORT = process.env.PORT || 5000;

app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

// router.post('/register', ctx => ctx.body = 'Hello Test');

router.post('/register', function*(next) {
    console.log('\n------ post:/game/questions ------');
    console.log(this.request.body);
    // this.status = 200;
    // this.body = 'some jade output for post requests';
    yield(next);
});

// app.use(ctx => {
//     ctx.body = { msg: 'Hello Koa' };
// });

app.listen(PORT, () => {
    console.log(`listenining on port: ${PORT}`);
});
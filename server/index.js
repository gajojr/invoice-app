require('dotenv').config({ path: '../.env' });
const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-body-parser');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const serve = require('koa-static');
const multer = require('@koa/multer');

const { registerUser } = require('./routes/registerUser');
const { getAvatar } = require('./routes/getAvatar');
const { userLogIn } = require('./routes/logIn');
const { getInvoices } = require('./routes/getInvoices');
const { getInvoice } = require('./routes/getInvoice');
const { deleteInvoice } = require('./routes/deleteInvoice');
const { createInvoice } = require('./routes/createInvoice');
const { createServices } = require('./routes/createServices');
const { getInvoiceToUpdate } = require('./routes/getInvoiceToUpdate');
const { updateInvoice } = require('./routes/updateInvoice');
const { deleteUser } = require('./routes/deleteUser');
const { promoteUserToAdmin } = require('./routes/promoteUser');

const app = new Koa();
const router = new KoaRouter();
app.use(serve(__dirname));
app.use(bodyParser());
app.use(cors());
app.use(helmet());
app.use(router.routes()).use(router.allowedMethods());
const upload = multer({ dest: './uploads' });

const PORT = process.env.PORT || 5000;

router.post('/register', upload.single('avatar'), (ctx) => registerUser(ctx));

router.get('/avatar', (ctx) => getAvatar(ctx));

router.post('/log-in', ctx => userLogIn(ctx));

router.get('/invoices', (ctx) => getInvoices(ctx));

router.get('/invoices/:id', ctx => getInvoice(ctx));

router.delete('/invoices/:id', ctx => deleteInvoice(ctx));

router.post('/create-invoice', (ctx) => createInvoice(ctx));

router.post('/create-services/:id', (ctx) => createServices(ctx));

router.get('/invoices-to-update/:id', (ctx) => getInvoiceToUpdate(ctx));

router.post('/update-invoice/:id', (ctx) => updateInvoice(ctx));

router.delete('/delete-user', (ctx) => deleteUser(ctx));

router.post('/promote-user', (ctx) => promoteUserToAdmin(ctx));

app.listen(PORT, () => {
    console.log(`listenining on port: ${PORT}`);
});
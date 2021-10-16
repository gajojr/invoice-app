"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var helmet_1 = __importDefault(require("helmet"));
var AppRouter_1 = require("./AppRouter");
require("./controllers/LoginController");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(AppRouter_1.AppRouter.getInstance());
app.use((0, helmet_1.default)());
app.listen(PORT, function () {
    console.log("Listening on port " + PORT);
});

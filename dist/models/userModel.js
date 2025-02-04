"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserModel {
    static create(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            yield database_1.default.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        });
    }
    static findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('SELECT id, username, password FROM users WHERE username = $1', [username]);
            return result.rows.length > 0 ? result.rows[0] : null;
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('SELECT id, username FROM users');
            return result.rows;
        });
    }
}
exports.default = UserModel;

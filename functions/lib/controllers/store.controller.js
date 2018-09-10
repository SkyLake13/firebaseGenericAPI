"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("./base.controller");
class StoreController extends base_controller_1.BaseController {
    constructor(storeService) {
        super('Store controller');
        this.storeService = storeService;
        this.setUp();
    }
    setUp() {
        this.router.get('/:type', this.getAllByType.bind(this));
        this.router.get('/:type/:id', this.getByTypeId.bind(this));
        this.router.post('/:type', this.post.bind(this));
        this.router.put('/:type/:id', this.put.bind(this));
        this.router.delete('/:type/:id', this.delete.bind(this));
    }
    getAllByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = req.params.type;
            const items = yield this.storeService.get(type);
            res.send(items);
        });
    }
    getByTypeId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = req.params.type;
            const id = req.params.id;
            const item = yield this.storeService.getById(type, id);
            res.send(item);
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = req.params.type;
            const data = req.body;
            const id = yield this.storeService.add(type, data);
            res.send(id);
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const type = req.params.type;
            const data = req.body;
            const writeTime = yield this.storeService.update(type, id, data);
            res.send(writeTime);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = req.params.type;
            const id = req.params.id;
            const writeTime = yield this.storeService.delete(type, id);
            res.send(writeTime);
        });
    }
}
exports.default = StoreController;
//# sourceMappingURL=store.controller.js.map
import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import StoreService from '../services/store.service';

export default class StoreController extends BaseController {
    constructor(private storeService: StoreService) {
        super('Store controller');
        this.setUp();
    }

    protected setUp() {
        this.router.get('/:type', this.getAllByType.bind(this));
        this.router.get('/:type/:id', this.getByTypeId.bind(this));
        this.router.post('/:type', this.post.bind(this));
        this.router.put('/:type/:id', this.put.bind(this));
        this.router.delete('/:type/:id', this.delete.bind(this));
    }

    private async getAllByType(req: Request, res: Response) {
        const type = req.params.type;

        const items = await this.storeService.get(type);

        res.send(items);
    }

    private async getByTypeId(req: Request, res: Response) {
        const type = req.params.type;
        const id = req.params.id;
        
        const item = await this.storeService.getById(type, id);

        res.send(item);
    }

    private async post(req: Request, res: Response) {
        const type = req.params.type;
        const data = req.body;

        const id = await this.storeService.add(type, data);

        res.send(id);
    }

    private async put(req: Request, res: Response) {
        const id = req.params.id;
        const type = req.params.type;
        const data = req.body;

        const writeTime = await this.storeService.update(type, id, data);

        res.send(writeTime);
    }

    private async delete(req: Request, res: Response) {
        const type = req.params.type;
        const id = req.params.id;
    
        const writeTime = await this.storeService.delete(type, id);

        res.send(writeTime);
    }
}
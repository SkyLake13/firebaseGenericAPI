class BaseItemModel {
    Id: string;
    CreateTime: string;
    UpdateTime: string;
    
    constructor(id: string, createTime: string, updateTime: string) {
        this.Id = id;
        this.CreateTime = createTime;
        this.UpdateTime = updateTime;
        
    }
}

export default class Item extends BaseItemModel {
    Data: any;

    constructor(id: string, createTime: string, updateTime: string, data: any) {
        super(id, createTime, updateTime);
        this.Data = data;
    }
}
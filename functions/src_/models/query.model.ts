export default class Query {
    fieldPath: string;
    operation: FirebaseFirestore.WhereFilterOp;
    value: string;

    constructor(fieldPath, operation, value) {
        this.fieldPath = fieldPath;
        this.operation = operation;
        this.value = value;
    }
}
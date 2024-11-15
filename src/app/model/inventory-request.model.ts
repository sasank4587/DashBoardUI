export class InventoryRequest {
    category: string;
    entry: string;
    count: number;
    createdDate?: Date; // Optional parameter

    constructor(category: string, entry: string, count: number, createdDate?: Date) {
        this.category = category;
        this.entry = entry;
        this.count = count;

        // Assign createdDate only if it is provided
        if (createdDate) {
            this.createdDate = createdDate;
        } else {
            this.createdDate = new Date(); // Or some other default logic
        }
    }
}

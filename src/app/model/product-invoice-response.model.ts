export class ProductInvoiceResponse{
    invoiceId : string;
    invoiceDate : Date;
    vendorName : string;
    brandName : string;
    productName : string;
    productSize : string;
    productQuantity : number;
    expirationDate : Date;
    invoiceStatus : string;
    

    constructor(invoiceId, invoiceDate, vendorName, brandName, productName, productSize, productQuantity, expirationDate, invoiceStatus){
        this.invoiceId = invoiceId;
        this.invoiceDate = invoiceDate;
        this.vendorName = vendorName;
        this.brandName = brandName;
        this.productName = productName;
        this.productSize = productSize;
        this.productQuantity = productQuantity;
        this.expirationDate = expirationDate;
        this.invoiceStatus = invoiceStatus;
    }
}
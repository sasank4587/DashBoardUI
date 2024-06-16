export class InformationObject {
    id : number
    invoiceId : string;
    invoiceDate : Date;
    vendorName : string;
    brandName : string;
    productName : string;
    productSize : string;
    productQuantity : number;
    expirationDate : Date;
    

    constructor(id, invoiceId, invoiceDate, vendorName, brandName, productName, productSize, productQuantity, expirationDate){
        this.id = id;
        this.invoiceId = invoiceId;
        this.invoiceDate = invoiceDate;
        this.vendorName = vendorName;
        this.brandName = brandName;
        this.productName = productName;
        this.productSize = productSize;
        this.productQuantity = productQuantity;
        this.expirationDate = expirationDate;
    }
  }
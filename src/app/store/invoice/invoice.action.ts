// src/app/store/invoice/invoice.actions.ts
import { createAction, props } from '@ngrx/store';
import { ProductInvoiceResponse } from '../../model/product-invoice-response.model';

// Set Invoice Data
export const setInvoiceData = createAction(
  '[Invoice] Set Invoice Data',
  props<{ 
    invoiceId: string; 
    showProducts: boolean; 
    invoiceProductsList: Array<ProductInvoiceResponse>; 
  }>()
);

// Clear Invoice Data
export const clearInvoiceData = createAction('[Invoice] Clear Invoice Data');

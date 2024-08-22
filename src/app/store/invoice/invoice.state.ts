// invoice.state.ts
import { createAction, props } from '@ngrx/store';
import { ProductInvoiceResponse } from 'src/app/model/product-invoice-response.model';

export interface InvoiceState {
  invoiceId: string;
  showProducts: boolean;
  invoiceProductsList: Array<ProductInvoiceResponse>;
}

export const initialInvoiceState: InvoiceState = {
  invoiceId: '',
  showProducts: false,
  invoiceProductsList: []
};

export const setInvoiceData = createAction(
  '[Invoice] Set Invoice Data',
  props<{ invoiceId: string, showProducts: boolean, invoiceProductsList: Array<ProductInvoiceResponse> }>()
);

export const clearInvoiceData = createAction('[Invoice] Clear Invoice Data');

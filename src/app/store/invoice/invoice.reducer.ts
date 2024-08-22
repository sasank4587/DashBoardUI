// invoice.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { setInvoiceData, clearInvoiceData, initialInvoiceState } from './invoice.state';

export const invoiceReducer = createReducer(
  initialInvoiceState,
  on(setInvoiceData, (state, { invoiceId, showProducts, invoiceProductsList }) => ({
    ...state,
    invoiceId,
    showProducts,
    invoiceProductsList
  })),
  on(clearInvoiceData, () => initialInvoiceState)
);

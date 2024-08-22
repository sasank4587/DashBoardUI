// invoice.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from './invoice.state';

export const selectInvoiceState = createFeatureSelector<InvoiceState>('invoice');

export const selectInvoiceId = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.invoiceId
);

export const selectShowProducts = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.showProducts
);

export const selectInvoiceProductsList = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.invoiceProductsList
);

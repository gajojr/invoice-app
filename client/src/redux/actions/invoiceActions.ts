import { InvoiceInterface } from '../reducers/invoiceReducer';

// export const LOAD_INVOICES = 'LOAD_INVOICES';
// export const CREATE_INVOICE = 'CREATE_INVOICE';

export enum actionEnum {
    LOAD_INVOICES = 'LOAD_INVOICES',
    CREATE_INVOICE = 'CREATE_INVOICE'
};

export const setInvoices = (invoices: InvoiceInterface[]) => {
    return {
        type: actionEnum.LOAD_INVOICES,
        payload: invoices
    }
};
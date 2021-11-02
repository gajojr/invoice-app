import axios from 'axios';
import { message } from 'antd';
import { actionEnum, setInvoices } from '../actions/invoiceActions';

export interface InvoiceInterface {
    id: number;
    name: number;
    address: string;
    city: string;
    pib: string;
}

export interface InvoiceState {
    invoices: InvoiceInterface[]
}

const initialState = {
    invoices: []
}

type Action = { type: actionEnum, payload: any }

export const invoiceReducer = (state: InvoiceState = initialState, action: Action) => {
    switch (action.type) {
        case actionEnum.CREATE_INVOICE: {
            return { ...state, invoices: [...state.invoices, action.payload] }
        }
        case actionEnum.LOAD_INVOICES: {
            return { ...state, invoices: action.payload };
        }
        default:
            return state;
    }
}

export const loadInvoices = () => async (dispatch: any) => {
    (async () => {
        try {
            const response = await axios.get('/invoices', {
                params: {
                    username: sessionStorage.getItem('username')
                },
                headers: {
                    'x-access-token': sessionStorage.getItem('token')
                }
            });
            dispatch(setInvoices(response.data));
        } catch (err: any) {
            if (err?.response?.status === 401) {
                message.error('Auth failed');
            } else {
                message.error('Server error occurred');
            }

            sessionStorage.clear();
            window.location.href = '/';
        }
    })();
}
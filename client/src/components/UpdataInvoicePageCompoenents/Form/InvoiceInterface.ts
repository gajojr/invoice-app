export default interface InvoiceInterface {
    to_address: string;
    to_city: string;
    to_pib: string;
    closing_date: string;
    from_company: string;
    id: number;
    invoice_name: string;
    pdv: boolean;
    sign_needed: boolean;
    stamp_needed: boolean;
    user_id: number;
}
export default interface InvoiceInterface {
    client_address: string;
    client_city: string;
    client_pib: string;
    closing_date: string;
    company_name: string;
    id: number;
    name: string;
    pdv: boolean;
    sign_needed: boolean;
    stamp_needed: boolean;
    user_id: number;
}
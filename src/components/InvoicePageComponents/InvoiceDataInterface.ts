export default interface InvoiceDataInterface {
    closing_date: string;
    date_of_making: string;
    from_address: string;
    from_city: string;
    from_company: string;
    from_email: string;
    from_giro_account: string;
    from_lastname: string;
    from_name: string;
    from_pib: string;
    from_postal_code: string;
    from_username: string;
    invoice_name: string;
    pdv: boolean;
    sign_needed: boolean;
    stamp_needed: boolean;
    to_address: string;
    to_city: string;
    to_company: string;
    to_pib: string;
}
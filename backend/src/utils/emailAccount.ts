import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendLeavingEmail = (email: string, username: string) => {
    const msg = {
        to: email,
        from: 'andreccccc12@gmail.com',
        subject: 'Invoice app',
        text: `We are sorry you are leaving us ${username}, your account is now deleted.`
    }

    sgMail
        .send(msg)
        .then(() => {}, (error: any) => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        });
}
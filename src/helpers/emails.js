import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logoPath = path.join(__dirname, '../public/assets/logo.png');

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos;

    // Enviar el email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu Cuenta en BienesRaices.com',
        text: 'Confirma tu Cuenta en BienesRaices.com',
        html: `
            <div style="flex: auto; text-align: center;">
                <img src = "cid:logo" style="height:100px; border-radius: 50px;"/>

                <p style="font-size: 22px; font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;">Hola ${nombre},</p>
                <p style="font-size: 18px">Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:</p>

                <div>
                    <a 
                        href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/api/users/confirmar/${token}"
                        style="cursor: pointer; padding-top: 8px; padding-bottom: 8px; padding-left: 20%; padding-right: 20%; width: 100%; border-radius: 12px; font-size: 22px; background-color: #7630f3; color: white; text-decoration: none;"
                    >Confirmar email
                    </a>
                </div>
            </div>
        `,
        attachments: [{
            filename: 'BienesRaices.png',
            path: logoPath,
            cid: 'logo'
        }]
    });
}

const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos;

    // Enviar el email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Reestablece tu Password en BienesRaices.com',
        text: 'Reestablece tu Password en BienesRaices.com',
        html: `
            <div style="flex: auto; text-align: center;">
                <img src = "cid:logo" style="height:100px; border-radius: 50px;"/>
                <p style="font-size: 22px; font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;">Hola ${nombre},</p>
                <p style="font-size: 18px">Has solicitado reestablecer tu password en bienesRaices.com</p>

                <p style="font-size: 18px">Sigue el siguiente enlace para generar un password nuevo:</p>

                <div>
                    <a 
                    href="${process.env.FRONTEND_URL}/reset-password/${token}"
                        style="cursor: pointer; padding-top: 8px; padding-bottom: 8px; padding-left: 20%; padding-right: 20%; width: 100%; border-radius: 12px; font-size: 22px; background-color: #7630f3; color: white; text-decoration: none;"
                    >Reestablecer Password
                    </a>
                </div>

                <p style="font-size: 18px">Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>
            </div>
        `,
        attachments: [{
            filename: 'BienesRaices.png',
            path: logoPath,
            cid: 'logo'
        }]
    });
}


export {
    emailRegistro,
    emailOlvidePassword
}
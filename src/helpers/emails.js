import nodemailer from 'nodemailer'

const emailRegistro = async(datos)=>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      }
    );

    console.log(datos);
    // console.log(process.env.EMAIL_HOST);
    // console.log(process.env.EMAIL_PORT);
    // console.log(process.env.EMAIL_USER);
    // console.log(process.env.EMAIL_PASS);

    const { nombre, email, token} = datos

    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta de BienesRaices.com',
        text: 'Confirma tu cuenta de BienesRaices.com',
        html: `
            <p>Hola ${nombre}, confirma tu cuenta de BienesRaices con tu correo ${email}.</p>

            <p>Lo unico que debes hacer es confirmarla dando click en el siguiente enlace:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/api/users/confirmar-cuenta/${token}">---Confirmar cuenta aqui---</a></p>

            <p>Si no has creado una cuenta con nosotros, ignora este mensaje.</p>
        `
    })
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

    const { email, nombre, token } = datos

    // Enviar el email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Reestablece tu Password en BienesRaices.com',
        text: 'Reestablece tu Password en BienesRaices.com',
        html: `
            <p>Hola ${nombre}, has solicitado reestablecer tu password en BienesRaices.com</p>

            <p>Sigue el siguiente enlace para generar un password nuevo: 
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/api/users/forgot-password/${token}">Reestablecer Password</a> </p>

            <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje</p>
        `
    })
}

export {
    emailRegistro,
    emailOlvidePassword
}
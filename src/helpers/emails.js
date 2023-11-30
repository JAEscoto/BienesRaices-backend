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

    const { nombre, email, token} = datos

    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta de BienesRaices.com',
        text: 'Confirma tu cuenta de BienesRaices.com',
        html: `
            <p>Hola ${nombre}, confirma tu cuenta de BienesRaices.com con tu correo ${email}</p>

            <p>Lo unico que debes hacer es confirmarla dando click en el siguiente enlace:
            <a href="${process.env.URL}:${process.env.PORT ?? 3000}/auth/registro/confirmar/${token}">---Confirmar cuenta aqui---</a></p>

            <p>Si usted no ha creado una cuenta con nosotros, ignore este mensaje</p>
        `
    })

}

export {
    emailRegistro
}
const enviarEmail = async (destinatario, asunto, contenido) => {
    const respuesta = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': process.env.BREVO_API_KEY
        },
        body: JSON.stringify({
            sender: { name: 'Finanzas', email: process.env.BREVO_SENDER_EMAIL },
            to: [{ email: destinatario }],
            subject: asunto,
            htmlContent: contenido
        })
    })

    if (!respuesta.ok) {
        const detalle = await respuesta.text()
        throw new Error(`Error al enviar email (${respuesta.status}): ${detalle}`)
    }
}

module.exports = { enviarEmail }
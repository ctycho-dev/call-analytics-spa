// app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { name, company, phone, email } = await request.json();

        console.log(name, company, phone, email)
        console.log(process.env.EMAIL_USER)
        console.log(process.env.EMAIL_APP_PASS)

        // Create a Transporter (using Gmail as example)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,  // e.g., your@gmail.com
                pass: process.env.EMAIL_APP_PASS, // App Password (not regular password)
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `Новая заявка с сайта от ${name}`,
            text: `
            Вы получили новую заявку:

            Имя: ${name}
            Компания: ${company}
            Телефон: ${phone}
            Email: ${email}

            Дата и время: ${new Date().toString()}
                `,
                        html: `
            <h2>Новая заявка с сайта</h2>
            <ul>
            <li><strong>Имя:</strong> ${name}</li>
            <li><strong>Компания:</strong> ${company}</li>
            <li><strong>Телефон:</strong> ${phone}</li>
            <li><strong>Email:</strong> ${email}</li>
            </ul>
            <p><strong>Дата и время:</strong> ${new Date().toString()}</p>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Письмо успешно отправлено!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Не удалось отправить письмо.' },
            { status: 500 }
        );
    }
}
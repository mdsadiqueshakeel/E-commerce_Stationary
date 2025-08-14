const crypto = require('crypto');
const bcrypt = require('bcrypt'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');



async function createResetPasswordToken(userId) {
    const token = crypto.randomBytes(32).toString('hex');

    // console.log("Prisma models available:", Object.keys(prisma));
    console.log("token:", token);
    console.log("userId:", userId);

    await prisma.resetPasswordToken.create({
        data: {
            userId,
            token,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Token valid for 1 hour
            used: false // explicitly mark as unused
        }
    });

    return token;  // send this in email link
}


async function verifyResetPasswordToken(token) {
    const record = await prisma.resetPasswordToken.findUnique({
        where: { token },
        include: { user: true }
    });

    if (!record) throw new Error("Invalid token");
    if (record.used) throw new Error("Token already used");
    if (record.expiresAt < new Date()) throw new Error("Token expired");

    return record.user;  // return user to reset password
}


async function resetPassword(token, newPassword) {
    const user = await verifyResetPasswordToken(token);
    const userId = user.id;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
        prisma.user.update({
            where: { id: userId },
            data: { passwordHash: hashedPassword }
        }),
        prisma.resetPasswordToken.update({
            where: { token },
            data: { used: true }
        })
    ]);

    return { success: true, message: "Password reset successfully" };
}


async function sendEmail(to, subject, htmlContent) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,   
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html: htmlContent
    });

}





module.exports = {
    createResetPasswordToken, verifyResetPasswordToken, resetPassword, sendEmail
};
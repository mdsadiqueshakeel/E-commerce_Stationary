const crypto = require('crypto');
const bcrypt = require('bcrypt'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function createResetPasswordToken(userId) {
    const token = crypto.randomBytes(32).toString('hex');

    await prisma.resetPasswordToken.create({
        data: {
            userId,
            token,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Token valid for 1 hour
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



module.exports = {
    createResetPasswordToken, verifyResetPasswordToken, resetPassword
};
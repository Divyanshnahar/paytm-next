"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function CreateOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const token = Math.random().toString(36).substring(2, 15); // Generate a random token
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const transaction = await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: amount,
            provider: provider,
            status: "Processing",
            startTime: new Date(),
            token: token
        }
    });   
    // Send request to webhook after transaction is created
    const response = await fetch("http://localhost:3003/hdfcWebhook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token,
            user_identifier: userId,
            amount: amount
        })
    });

    if (response.ok) {
        return { success: true, message: "Transaction created successfully!" };
    } else {
        return { success: false, message: "Failed to create transaction." };
    }
}

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
}

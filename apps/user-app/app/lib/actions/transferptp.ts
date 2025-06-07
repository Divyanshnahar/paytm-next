"use server";

export async function TransferPtp(receiverId: number, amount: number){
    // Here you would typically call a service or API to handle the transfer
    // For demonstration, we will just log the transfer details
    console.log(`Transferring ${amount} to user with ID ${receiverId}`);

    // Simulate a successful transfer
    return {
        success: true,
        message: `Successfully transferred ${amount} to user with ID ${receiverId}`
    };
}
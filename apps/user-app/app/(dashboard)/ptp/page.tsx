import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/sendCard" 
import { authOptions } from "../../lib/auth";
import { PtpTxnCard } from "../../../components/ptpTxnCard";
import prisma from "@repo/db/client";

export default async function() {
    // const balance = await getBalance();
    const transactions = await getptpTransaction();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendCard />
            </div>
            <div>
                
                <div className="pt-4">
                    <PtpTxnCard transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}



async function getptpTransaction() {
    const session = await getServerSession(authOptions);
    
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    });

    return txns
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .map(t => ({
            time: t.timestamp,
            amount: t.amount,
        }));
}

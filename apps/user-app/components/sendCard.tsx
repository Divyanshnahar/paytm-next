"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { TransferPtp } from "../app/lib/actions/transferptp";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return <div className="h-[90vh]">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            if (!number || !amount) {
                                alert("Please enter both number and amount");
                                return;
                            }
                            const response = await TransferPtp(Number(number), Number(amount))
                            if (response.success) {
                                alert(response.message);
                            } else {
                                alert("Transaction failed: " + response.message);
                            }   
                            
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}
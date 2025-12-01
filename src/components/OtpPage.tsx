import React from "react";
import GetStartedLayout from "./GetStartedLayout";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardTitle, CardDescription } from "./ui/card";
import { Route as dashboardRoute} from '@/routes/dashboard';
import { verifyOtp } from "@/core/api";
import { Route } from "@/routes/verify-otp";

import "./OtpPage.scss";

const OtpPage = () => {
    const { userId } = Route.useSearch();
    const router = useRouter();
    const [otp, setOtp] = useState("")
    const [error, setError] = useState<boolean>(false);
    const OTP_LENGTH = 6;
    const onOtpChange = async(value: string) => {
        setOtp(value);
        if (value.length === OTP_LENGTH) {
            const response = await verifyOtp(userId, value);
            if(!response.success) {
                setError(response.error);
                return;
            }
            router.navigate({ to: dashboardRoute.id }) 
        }
    }
    return (
        <GetStartedLayout>
            <Card className="otp-card px-3">
                <CardTitle>Verification Code </CardTitle>
                <CardDescription>A verification code has been sent to your email. Please enter the code to proceed</CardDescription>
                <CardContent className="mt-4">
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={otp} onChange={(value) => onOtpChange(value)}>
                        <InputOTPGroup 
                        >
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    { error &&
                        <span className="text-red-500">OTP Verification Failed</span>
                    }
                </CardContent>

            </Card>
            
        </GetStartedLayout>
      );
};

export default OtpPage;
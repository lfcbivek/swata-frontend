
import GetStartedLayout from "./GetStartedLayout";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { LoginSchema } from "@/schemas/LoginSchema"
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router";
import "./LoginForm.scss";

const OtpPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
    });
    
    const { handleSubmit } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
      })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values)
    }
    return (
        <GetStartedLayout>
            <h1 id="tagline" className="text-white text-3xl md:text-4xl text-center mb-10 leading-tight">Automate. Convert. Grow.</h1>
            <div className="LoginForm">
                <Form {...form} >
                    
                <Card className="login-card">
                    <CardTitle className="flex flex-col gap-2 px-6 text-lg">
                        Login
                        <span className="text-gray-400 text-sm"> Welcome back! Sign in to your workspace. </span>
                    </CardTitle>
                    <CardContent className="mt-4 card-content">
                        <button className="google-btn">
                            <img src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw" className="w-5 h-5" />
                            <span className="text-sm">Continue with Google</span>
                        </button>

                        <div className="flex items-center my-2">
                            <div className="flex-1 border-t border-gray-700"></div>
                            <span className="px-3 text-gray-400 text-sm">OR</span>
                            <div className="flex-1 border-t border-gray-700"></div>
                        </div>

                        <div className="login-content">
                            <form 
                                onSubmit={form.handleSubmit(onSubmit)} 
                                className="space-y-6"
                            >
                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">Email</FormLabel>
                                        <FormControl>
                                        <Input type="email" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                /> 

                                {/* Password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base">Password</FormLabel>
                                        <FormControl>
                                        <div className="password-field">
                                            <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            {...field}
                                            />
                                            <button
                                                type="button"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                                className="password-toggle"
                                                onClick={() => setShowPassword((v) => !v)}
                                            >
                                            {showPassword ? <EyeOff /> : <Eye />}
                                            </button>
                                        </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />

                                <Button type="button" size="sm" className="submit-button" onClick={handleSubmit(onSubmit)}>
                                    Sign In
                                </Button>
                                
                            </form>
                        </div>
                        <p className="text-gray-400 md:text-base text-center mt-4">Don't have account? <Link to='/get-started' className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">Sign Up</Link></p>
                    </CardContent>
                </Card>

                </Form>
            </div>
            
        </GetStartedLayout>
      );
};

export default OtpPage;
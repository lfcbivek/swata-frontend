import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignUpSchema } from "@/schemas/SignUpSchema";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import countryList from 'react-select-country-list';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Route as otpRoute} from '../routes/verify-otp.tsx';
import { useRouter } from '@tanstack/react-router';
import { checkSubDomainAvailability } from '@/core/api';


import './SignUpForm.scss';
import { SpinnerGif } from "@/common/SpinnerGif";

const SignUpDefaultValues = {
  "firstName": "",
  "lastName": "",
  "email": "",
  "password": "",
  "confirmPassword": "",
  "subDomain": "",
  "companyName": "",
  "country": "",
  "phone": "",
  "website": "",
  "industry": ""

}

const SignUpForm = () => {
  const [formGroup, setFormGroup] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isSignUpSubmitted, setIsSignUpSubmitted] = useState<boolean>(false);
  const countryOptions = useMemo(() => countryList().getData(), []);


  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: SignUpDefaultValues
  })

  const router = useRouter();
  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setIsSignUpSubmitted(true);
    console.log("submitted", values)
    router.navigate({ to: otpRoute.id }) 
  }

  const onNextClick = async () => {
    // Validate only the fields shown in step 0
    const isStepValid = await form.trigger([
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword",
      "subDomain",
    ])
    
    if (!isStepValid) return

    const subDomain = form.watch("subDomain");
    const isSubDomainAvailable = await checkSubDomainAvailability(subDomain);
    const isAvailable = isSubDomainAvailable.available;

    if(!isAvailable) {
      form.setError("subDomain", {
        type: "manual",
        message: "The workspace is already taken. Please try a new one."
      })
      return
    }
    
    
    // Check if passwords match
    const { password, confirmPassword } = form.getValues()
    if (password !== confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords don't match"
      })
      return
    }
    
    setFormGroup(formGroup + 1)
  }

  const onPrevClick = () => {
    setFormGroup(formGroup - 1);
  }

  return (
    <div className="SignUpForm">
      <Form {...form} >
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-8"
        >
          <Card className="signup-card">
            <CardContent>
              <div className="form-fields">
                { formGroup === 0 && (
                  <>
                    {/* First Name */}
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="First Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Last Name */}
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Last Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
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
                        <FormLabel>Password</FormLabel>
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

                  {/* Confirm Password */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="password-field">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              {...field}
                            />
                            <button
                              type="button"
                              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                              className="password-toggle"
                              onClick={() => setShowConfirmPassword((v) => !v)}
                            >
                              {showConfirmPassword ? <EyeOff /> : <Eye />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> 

                  {/* Sub Domain */}
                  <FormField
                    control={form.control}
                    name="subDomain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Workspace</FormLabel>
                        <FormControl>
                          <div className="subdomain">
                            <Input placeholder="subdomain" {...field} className="subdomain-input" />
                            <h1>.swata-tech.com</h1>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> 
                </>
              )}
              {formGroup ===1 && (
                <>
                  {/* Company Name */}
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Company Name" {...field} className="subdomain-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Country */}
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                            <div className="countries-select">
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <SelectTrigger className="w-[100%] select-trigger">
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {countryOptions.map((country: { label: string; value: string }) => (
                                      <SelectItem key={country.value} value={country.value}>
                                        {country.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Phone Number */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput
                            placeholder="Enter phone number"
                            defaultCountry="NP"
                            international
                            withCountryCallingCode
                            value={field.value || ""}
                            onChange={(v) => field.onChange(v ?? "")}
                            onBlur={field.onBlur}
                            className="phone-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Website*/}
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                            <Input placeholder="https://google.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              </div>
            </CardContent>
            <CardFooter className="form-footer">
              <div className="nav-actions">
                {formGroup === 0 ? (
                  <Button type="button" size="sm" className="next-button" onClick={onNextClick}>
                    Next <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button type="button" size="sm" className="previous-button" onClick={onPrevClick}>
                    <ArrowLeft className="size-4" /> Previous
                  </Button>
                )}
              </div>

              {formGroup !== 0 && (
                <div className="submit-row">
                  <Button type="submit" size="lg" className="submit-button">
                    {isSignUpSubmitted && 
                      <SpinnerGif />
                    }
                    Get Started
                  </Button> 
                </div>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default SignUpForm;

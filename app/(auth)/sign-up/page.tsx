'use client'
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import SelectWithSearch from "@/components/forms/SelectWithSearch";
import { Button } from "@/components/ui/button";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import CountriesList from "@/components/CountriesList";
import FooterLink from "@/components/forms/FooterLink";

const SignUp = () => {

  const {
    register,
    handleSubmit,
    control,
    formState: {errors, isSubmitting}
    } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: '',
      investmentGoals: '',
      riskTolerance: '',
      preferredIndustry: ''
    },
    mode: "onBlur"
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data: SignUpFormData) => {
    try {
      console.log(data)
    } catch (e) {
      console.error(e);
    }
  }; 

  return (
    <>
     <h1 className="form-title">Sign Up & Personalize</h1>

     <form onSubmit={handleSubmit(onSubmit)} >

        <InputField 
          name="fullName"
          label="Full Name"
          placeholder="Ronen Barel"
          register={register}
          error={errors.fullName}
          validation={{required: 'Name is required', minLength: {value: 2, message: "Please enter more then 2 characters"}}}
        />

        <InputField 
          name="email"
          label="Email"
          placeholder="something@gmail.com"
          register={register}
          error={errors.email}
          validation={{required: 'Email is required', pattern: {value: /^\w+@\w+\.\w+$/, message: 'Email address is not valid'}}}
        />


        <CountriesList 
          name="country"
          label="Country"
          placeholder="select your country"
          control={control}
          error={errors.country}
          />

        <p>Helps us show you market data and news relevant to you.</p>        

        <InputField 
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{required: 'Pasword is required', minLength: {value: 8, message: "Please enter more then 8 characters"}}}
        />
        
        <SelectField 
          name="investmentGoals"
          label="Investment Goals"
          placeholder="select an investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          // required
        />
        
        <SelectField 
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="select your risk Level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          // required
        />

        <SelectField 
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          // required
        />

        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? 'Creating account' : 'Start your investing journey'}
        </Button>

        <FooterLink text="Already have an account?" linkText="Sign in" href="/sign-in" />

     </form>
    </>
  )
}

export default SignUp
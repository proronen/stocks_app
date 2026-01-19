'use client'
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form"
import FooterLink from "@/components/forms/FooterLink";

const SignIn = () => {

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
    } = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
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
     <h1 className="form-title">Welcome back</h1>

     <form onSubmit={handleSubmit(onSubmit)} >
        <InputField 
          name="email"
          label="Email"
          placeholder="something@gmail.com"
          register={register}
          error={errors.email}
          validation={{required1: 'Email is required', pattern: {value: /^\w+@\w+\.\w+$/, message: 'Email address is not valid'}}}
        />

        <InputField 
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{required1: 'Pasword is required', minLength: {value: 8, message: "Please enter more then 8 characters"}}}
        />
        

        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? 'Signing in' : 'Sign in'}
        </Button>

        <FooterLink text="Dont have an account?" linkText="Sign up now" href="/sign-up" />

     </form>
    </>
  )
}

export default SignIn
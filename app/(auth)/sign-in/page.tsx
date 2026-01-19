'use client'
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form"
import FooterLink from "@/components/forms/FooterLink";
import { sigInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting}
    } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: "onBlur"
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data: SignInFormData) => {
    try {
      const result = await sigInWithEmail(data);
      if(result?.success) router.push('/')
    } catch (e) {
      console.error(e);
      toast.error('Sign in failed', {description: e instanceof Error ? e.message : 'failed to sign in, please check your credentials or contact support'});
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
          validation={{required: 'Email is required', pattern: {value: /^\w+@\w+\.\w+$/, message: 'Email address is not valid'}}}
        />

        <InputField 
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{required: 'Pasword is required', minLength: {value: 8, message: "Please enter more then 8 characters"}}}
        />
        

        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? 'Signing in' : 'Sign in'}
        </Button>

        <FooterLink text="Still don't have an account?" linkText="Sign up now" href="/sign-up" />

     </form>
    </>
  )
}

export default SignIn
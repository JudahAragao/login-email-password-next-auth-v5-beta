'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from '@/components/ui/use-toast'
import { useFormState } from 'react-dom'
import { login } from '@/lib/actions'

const loginInitialState = {
  message: '',
  errors: {
    email: '',
    password: '',
    credentials: '',
    unknown: '',
  },
}

export function AuthForm() {
  // const form = useForm()

  // const handleSubmit = form.handleSubmit(async (data) => {
  //   try {
  //     await signIn('crendentials', { email: data.email, redirect: false })

  //     toast({
  //       title: 'Magic Link Sent',
  //       description: 'Check your email for the magic link to login',
  //     })
  //   } catch (error) {
  //     toast({
  //       title: 'Error',
  //       description: 'An error occurred. Please try again.',
  //     })
  //   }
  // })

  const [formState, formAction] = useFormState(login, loginInitialState);

  return (
    <div className="mx-auto max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your email below to login to your account
        </p>
      </div>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="m@example.com"
            required
            name='email'
            type="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Senha</Label>
          <Input
            id="senha"
            placeholder="password"
            required
            name='password'
            type="password"
          />
        </div>
        <Button
          className="w-full"
          type="submit"
          // disabled={form.formState.isSubmitting}
        >
          {/* {form.formState.isSubmitting ? 'Sending...' : 'Send Magic Link'} */}
          Login
        </Button>
      </form>
    </div>
  )
}

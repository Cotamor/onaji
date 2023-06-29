'use client'
import { FC, useState } from 'react'
import { Button } from './Button'
import { signOut } from 'next-auth/react'
import { toast } from './Toast'

interface SignOutButtonProps {
  
}

const SignOutButton: FC<SignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signOutWithGoogle = async() => {
    try {
      setIsLoading(true)
      await signOut()
    } catch (error) {
      toast({
        title: 'Error signing out',
        message: 'Please try again later',
        type: 'error'
      })
    }
  }

  return (
    <Button onClick={signOutWithGoogle} isLoading={isLoading}>Sign out</Button>
  )
}

export default SignOutButton
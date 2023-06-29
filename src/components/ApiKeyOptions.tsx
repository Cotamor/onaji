'use client'

import { FC, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/DropdownMenu'
import { Button } from './ui/Button'
import { Loader2 } from 'lucide-react'
import { toast } from './ui/Toast'
import { useRouter } from 'next/navigation'
import { createApiKey } from '@/helpers/create-api-key'
import { revokeApiKey } from '@/helpers/revoke-api-key'

interface ApiKeyOptionsProps {
  apiKeyKey: string
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyKey }) => {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isRevoking, setIsRevoking] = useState<boolean>(false)

  const createNewApiKey = async () => {
    setIsCreating(true)
    try {
      await revokeApiKey()
      await createApiKey()
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error creating new API key',
        message: 'Please try again later',
        type: 'error',
      })
    } finally {
      setIsCreating(false)
    }
  }
  const revokeCurrentApiKey = async () => {
    setIsRevoking(true)
    try {
      await revokeApiKey()
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error revoking your API key',
        message: 'Please try again later.',
        type: 'error'
      })
    } finally {
      setIsRevoking(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="subtle" className="flex items-center gap-2">
          <p>
            {isCreating
              ? 'Creating new key'
              : isRevoking
              ? 'Revoking key'
              : 'Options'}
          </p>
          {isCreating || isRevoking ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(apiKeyKey)
            toast({
              title: 'Copied',
              message: 'API key copied to clipboard',
              type: 'success',
            })
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create new Key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ApiKeyOptions

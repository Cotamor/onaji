import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import { Input } from './ui/Input'
import LargeHeading from './ui/LargeHeading'
import Paragraph from './ui/Paragraph'
import { formatDistance } from 'date-fns'
import Table from './ui/Table'
import ApiKeyOptions from './ApiKeyOptions'

const ApiDashboard = async ({}) => {
  const user = await getServerSession(authOptions)

  if (!user) return notFound()

  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.user.id },
  })

  const activeApiKey = await apiKeys.find((key) => key.enabled)

  if (!activeApiKey) return notFound()

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map((key) => key.id),
      },
    },
  })

  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }))

  return (
    <div className="container flex flex-col gap-6 max-w-5xl">
      <LargeHeading>Wellcome Back, {user.user.name}</LargeHeading>
      <div className="flex flex-col gap-4 md:flex-row justify-center items-center lg:justify-start">
        <Paragraph>Your API Key:</Paragraph>
        <Input className="w-fit truncate" readOnly value={activeApiKey.key} />
        {/* add options to create new or revoke */}
        <ApiKeyOptions apiKeyKey={activeApiKey.key} />
      </div>
      <Paragraph className="text-center lg:text-start mt-4 -mb-4">
        Your API history
      </Paragraph>

      <Table userRequests={serializableRequests} />
    </div>
  )
}

export default ApiDashboard

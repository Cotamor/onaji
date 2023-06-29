'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { DataGrid, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid'
import { ApiRequest } from '@prisma/client'
import { useTheme } from 'next-themes'
import { FC } from 'react'

type ModifiedRequestType<K extends keyof ApiRequest> = Omit<ApiRequest, K> & {
  timestamp: string
}

interface TableProps {
  userRequests: ModifiedRequestType<'timestamp'>[]
}

const columnsDraft: GridColDef[] = [
  {
    field: 'col1',
    headerName: 'API key used',
    width: 240,
    renderHeader(params) {
      return (
        <strong className="font-semibold">{params.colDef.headerName} 🗝️</strong>
      )
    },
  },
  { field: 'col2', headerName: 'Path', width: 180 },
  { field: 'col3', headerName: 'Recenty', width: 180 },
  { field: 'col4', headerName: 'Duration', width: 120 },
  { field: 'col5', headerName: 'Status', width: 120 },
]

const columns = columnsDraft.map((col) => {
  if (col.field === 'col1') {
    return col
  }

  return {
    ...col,
    renderHeader(params: GridColumnHeaderParams<any, any, any>) {
      return (
        <strong className="font-semibold">{params.colDef.headerName}</strong>
      )
    },
  }
})

const Table: FC<TableProps> = ({ userRequests }) => {
  const { theme: applicationTheme } = useTheme()
  const darkTheme = createTheme({
    palette: {
      mode: applicationTheme === 'light' ? 'light' : 'dark',
    },
  })

  const rows = userRequests.map((request) => ({
    id: request.id,
    col1: request.usedApiKey,
    col2: request.path,
    col3: `${request.timestamp} ago`,
    col4: `${request.duration} ms`,
    col5: request.status,
  }))

  return (
    <ThemeProvider theme={darkTheme}>
      <DataGrid
        style={{
          backgroundColor: applicationTheme === 'light' ? 'light' : 'dakr',
        }}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        disableRowSelectionOnClick
        autoHeight
        rows={rows}
        columns={columns}
      />
    </ThemeProvider>
  )
}

export default Table

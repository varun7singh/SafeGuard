import { Box, Flex, Stack, Group, Grid, Table, Paper, Badge, Text, Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import classes from './index.module.css'

const data = [
  {
    status: 'Success',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Failed',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Success',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  },
  {
    status: 'Failed',
    timeStamp: 'Jan 4, 2022',
    appliedGroup: 'Web Servers',
    module: ['SSH', 'UFW', 'APP Armor']
  }
]

function Chip({ children }: { children: string }): JSX.Element {
  return (
    <Box bg="#F6F6F6" p="0.125rem 0.5rem" style={{ display: 'inline-block', borderRadius: '1rem' }}>
      <Text fz="0.75rem" fw={500} c="#475467">
        {children}
      </Text>
    </Box>
  )
}

function CustomScriptCard({
  scriptName,
  description
}: {
  scriptName: string
  description: string
}): JSX.Element {
  return (
    <Paper className={classes.card} p="xl">
      <Stack justify="flex-start" gap="0.75rem">
        <Text c="#101828" fz="1.125rem" fw={600} lh="1.50rem">
          {scriptName}
        </Text>
        <Text c="#475467" fz="1rem" fw={400} lh="1.25rem">
          {description}
        </Text>
        <Group gap="0.5rem">
          <Chip>SSH</Chip>
          <Chip>UFW</Chip>
          <Chip>APP Armor</Chip>
        </Group>
        <Button
          className={classes.btn}
          c="rgba(0, 0, 0, 0.90)"
          variant="outline"
          size="md"
          mt="0.5rem"
          fullWidth
        >
          Use Script
        </Button>
      </Stack>
    </Paper>
  )
}

function Dashboard(): JSX.Element {
  const navigate = useNavigate()

  const rows = data.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        {row.status === 'Success' ? (
          <Badge variant="light">Success</Badge>
        ) : (
          <Badge color="red" variant="light">
            Failed
          </Badge>
        )}
      </Table.Td>
      <Table.Td>{row.timeStamp}</Table.Td>
      <Table.Td>{row.appliedGroup}</Table.Td>
      <Table.Td>
        <Group gap="0.5rem">
          {row.module.map((module, idx) => (
            <Chip key={idx}>{module}</Chip>
          ))}
        </Group>
      </Table.Td>
      <Table.Td>
        <Button variant="outline" color="blue" size="xs">
          View Log
        </Button>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Box p="md">
      <Flex justify="space-between" align="center">
        <Text fz="2.25rem" fw="600" lh="2.75rem">
          Dashboard
        </Text>
        <Button bg="#005FB8" size="md" onClick={() => navigate('/custom-script')}>
          Build Custom Script
        </Button>
      </Flex>

      <Box mt="3rem">
        <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
          <Grid.Col span={6}>
            <CustomScriptCard
              scriptName="Script Name"
              description="Short description - where we can use this (Recommended target)"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <CustomScriptCard
              scriptName="Script Name"
              description="Short description - where we can use this (Recommended target)"
            />
          </Grid.Col>
        </Grid>
      </Box>

      <Box mt="4rem">
        <Flex justify="space-between" align="center">
          <Text c="#101828" fz="1.125rem" fw={600} lh="1.75rem">
            Last Execution Scripts
          </Text>
          <Button bg="#005FB8">See all Logs</Button>
        </Flex>
        <Table.ScrollContainer minWidth={800} mt="2rem">
          <Table verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Status</Table.Th>
                <Table.Th>Time Stamp</Table.Th>
                <Table.Th>Applied Group</Table.Th>
                <Table.Th>Module</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Box>
    </Box>
  )
}

export default Dashboard

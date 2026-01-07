import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Colgroup, Col, Caption, ExpandableRow } from './index'

const meta: Meta<typeof Table> = {
  title: 'Core/Table/Atoms',
  component: Table,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', amount: 1250.0 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: 890.5 },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', amount: 2100.75 },
]

export const BasicTable: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    setup: () => ({ data: sampleData }),
    template: `
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id">
            <Td main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const StripedTable: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    setup: () => ({ data: sampleData }),
    template: `
      <Table striped>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="(row, index) in data" :key="row.id" :even="index % 2 === 1">
            <Td main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const BorderedTable: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    setup: () => ({ data: sampleData }),
    template: `
      <Table bordered>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id">
            <Td main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const CompactTable: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    setup: () => ({ data: sampleData }),
    template: `
      <Table compact>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id">
            <Td main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const SortableHeaders: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    setup: () => {
      return {
        data: sampleData,
        sortBy: 'name',
        sortDirection: 'asc' as const,
      }
    },
    template: `
      <Table>
        <Thead>
          <Tr>
            <Th sortable :sorted="sortBy === 'name'" :sort-direction="sortDirection">Name</Th>
            <Th sortable :sorted="sortBy === 'email'" :sort-direction="sortDirection">Email</Th>
            <Th sortable :sorted="sortBy === 'amount'" :sort-direction="sortDirection" align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id">
            <Td main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const ClickableRows: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    setup: () => ({
      data: sampleData,
      handleClick: (row: Record<string, unknown>) => alert(`Clicked: ${row.name}`),
    }),
    template: `
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id" clickable @click="handleClick(row)">
            <Td main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const SelectableRows: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    setup: () => ({
      data: sampleData,
      selectedId: 2,
    }),
    template: `
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id" :selected="row.id === selectedId">
            <Td main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const WithFooter: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tfoot, Tr, Th, Td },
    setup: () => {
      const total = sampleData.reduce((sum, row) => sum + row.amount, 0)
      return { data: sampleData, total }
    },
    template: `
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id">
            <Td main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colspan="2"><strong>Total</strong></Td>
            <Td align="right"><strong>{{ total.toFixed(2) }}</strong></Td>
          </Tr>
        </Tfoot>
      </Table>
    `,
  }),
}

export const ColumnWidths: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    setup: () => ({ data: sampleData }),
    template: `
      <Table>
        <Thead>
          <Tr>
            <Th width="50px">#</Th>
            <Th width="200px">Name</Th>
            <Th>Email</Th>
            <Th width="120px" align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id">
            <Td width="50px">{{ row.id }}</Td>
            <Td width="200px" main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td width="120px" align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const TruncatedCells: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    setup: () => ({
      data: [
        { id: 1, name: 'John Doe', description: 'This is a very long description that should be truncated with an ellipsis to prevent table layout issues' },
        { id: 2, name: 'Jane Smith', description: 'Another long description that demonstrates the truncation feature in table cells' },
      ],
    }),
    template: `
      <Table>
        <Thead>
          <Tr>
            <Th width="150px">Name</Th>
            <Th width="300px">Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id">
            <Td width="150px" main>{{ row.name }}</Td>
            <Td width="300px" truncate>{{ row.description }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const DisabledRows: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    setup: () => ({ data: sampleData }),
    template: `
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id" :disabled="row.id === 2">
            <Td main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const ColspanRowspan: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    template: `
      <Table bordered>
        <Thead>
          <Tr>
            <Th rowspan="2">Item</Th>
            <Th colspan="2" align="center">Price</Th>
            <Th rowspan="2" align="right">Stock</Th>
          </Tr>
          <Tr>
            <Th align="right">Retail</Th>
            <Th align="right">Wholesale</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td main>Widget A</Td>
            <Td align="right">$29.99</Td>
            <Td align="right">$19.99</Td>
            <Td align="right">150</Td>
          </Tr>
          <Tr>
            <Td main>Widget B</Td>
            <Td align="right">$49.99</Td>
            <Td align="right">$34.99</Td>
            <Td align="right">75</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const MultipleTheadTbody: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    template: `
      <Table bordered>
        <Thead>
          <Tr>
            <Th colspan="3">Q1 2024 Sales</Th>
          </Tr>
          <Tr>
            <Th>Product</Th>
            <Th align="right">Units</Th>
            <Th align="right">Revenue</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td main>Product A</Td>
            <Td align="right">1,250</Td>
            <Td align="right">$37,500</Td>
          </Tr>
          <Tr>
            <Td main>Product B</Td>
            <Td align="right">890</Td>
            <Td align="right">$44,500</Td>
          </Tr>
        </Tbody>
        <Thead>
          <Tr>
            <Th colspan="3">Q2 2024 Sales</Th>
          </Tr>
          <Tr>
            <Th>Product</Th>
            <Th align="right">Units</Th>
            <Th align="right">Revenue</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td main>Product A</Td>
            <Td align="right">1,450</Td>
            <Td align="right">$43,500</Td>
          </Tr>
          <Tr>
            <Td main>Product B</Td>
            <Td align="right">1,020</Td>
            <Td align="right">$51,000</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const RowGrouping: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td },
    template: `
      <Table bordered>
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Product</Th>
            <Th align="right">Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          <!-- Electronics Group -->
          <Tr>
            <Th rowspan="3" scope="rowgroup" class="bg-gray-50 dark:bg-gray-800 align-top">Electronics</Th>
            <Td main>Laptop</Td>
            <Td align="right">$999</Td>
          </Tr>
          <Tr>
            <Td main>Phone</Td>
            <Td align="right">$699</Td>
          </Tr>
          <Tr>
            <Td main>Tablet</Td>
            <Td align="right">$499</Td>
          </Tr>
          <!-- Furniture Group -->
          <Tr>
            <Th rowspan="2" scope="rowgroup" class="bg-gray-50 dark:bg-gray-800 align-top">Furniture</Th>
            <Td main>Desk</Td>
            <Td align="right">$350</Td>
          </Tr>
          <Tr>
            <Td main>Chair</Td>
            <Td align="right">$150</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const WithColgroup: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td, Colgroup, Col },
    template: `
      <Table bordered>
        <Colgroup>
          <Col width="200px" />
          <Col width="150px" class="bg-yellow-50 dark:bg-yellow-900/20" />
          <Col width="150px" class="bg-green-50 dark:bg-green-900/20" />
          <Col width="100px" />
        </Colgroup>
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th align="right">Jan</Th>
            <Th align="right">Feb</Th>
            <Th align="right">Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td main>Widget A</Td>
            <Td align="right">$1,250</Td>
            <Td align="right">$1,450</Td>
            <Td align="right">$2,700</Td>
          </Tr>
          <Tr>
            <Td main>Widget B</Td>
            <Td align="right">$890</Td>
            <Td align="right">$1,020</Td>
            <Td align="right">$1,910</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const ComplexLayout: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tfoot, Tr, Th, Td },
    template: `
      <Table bordered striped>
        <Thead>
          <Tr>
            <Th rowspan="2">Region</Th>
            <Th colspan="2" align="center">Sales</Th>
            <Th colspan="2" align="center">Expenses</Th>
            <Th rowspan="2" align="right">Profit</Th>
          </Tr>
          <Tr>
            <Th align="right">Q1</Th>
            <Th align="right">Q2</Th>
            <Th align="right">Q1</Th>
            <Th align="right">Q2</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td main>North</Td>
            <Td align="right">$45,000</Td>
            <Td align="right">$52,000</Td>
            <Td align="right">$12,000</Td>
            <Td align="right">$14,000</Td>
            <Td align="right">$71,000</Td>
          </Tr>
          <Tr :even="true">
            <Td main>South</Td>
            <Td align="right">$38,000</Td>
            <Td align="right">$41,000</Td>
            <Td align="right">$10,000</Td>
            <Td align="right">$11,000</Td>
            <Td align="right">$58,000</Td>
          </Tr>
          <Tr>
            <Td main>East</Td>
            <Td align="right">$62,000</Td>
            <Td align="right">$68,000</Td>
            <Td align="right">$18,000</Td>
            <Td align="right">$20,000</Td>
            <Td align="right">$92,000</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Td align="right">$145,000</Td>
            <Td align="right">$161,000</Td>
            <Td align="right">$40,000</Td>
            <Td align="right">$45,000</Td>
            <Td align="right"><strong>$221,000</strong></Td>
          </Tr>
        </Tfoot>
      </Table>
    `,
  }),
}

export const WithCaption: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td, Caption },
    setup: () => ({ data: sampleData }),
    template: `
      <Table>
        <Caption>Monthly Sales Report - Q1 2024</Caption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id">
            <Td main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const CaptionBottom: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td, Caption },
    setup: () => ({ data: sampleData }),
    template: `
      <Table>
        <Caption position="bottom">Table 1: Sales figures for Q1 2024</Caption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr v-for="row in data" :key="row.id">
            <Td main>{{ row.name }}</Td>
            <Td>{{ row.email }}</Td>
            <Td align="right">{{ row.amount.toFixed(2) }}</Td>
          </Tr>
        </Tbody>
      </Table>
    `,
  }),
}

export const ScreenReaderOnlyCaption: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td, Caption },
    setup: () => ({ data: sampleData }),
    template: `
      <div>
        <p class="mb-2 text-sm text-gray-500">The caption below is visually hidden but accessible to screen readers:</p>
        <Table>
          <Caption sr-only>Sales data for John Doe, Jane Smith, and Bob Wilson</Caption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th align="right">Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr v-for="row in data" :key="row.id">
              <Td main>{{ row.name }}</Td>
              <Td>{{ row.email }}</Td>
              <Td align="right">{{ row.amount.toFixed(2) }}</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    `,
  }),
}

export const ExpandableRows: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td, ExpandableRow },
    setup: () => {
      const data = [
        { id: 1, name: 'John Doe', email: 'john@example.com', amount: 1250.0, details: 'Senior Developer at Tech Corp. Has been with the company for 5 years.' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: 890.5, details: 'Project Manager overseeing the mobile team. Recently led a successful product launch.' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', amount: 2100.75, details: 'Lead Designer responsible for the UI/UX of all client-facing applications.' },
      ]
      return { data }
    },
    template: `
      <Table>
        <Thead>
          <Tr>
            <Th width="40px"></Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th align="right">Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          <template v-for="row in data" :key="row.id">
            <ExpandableRow :colspan="3">
              <template #row>
                <Td main>{{ row.name }}</Td>
                <Td>{{ row.email }}</Td>
                <Td align="right">\${{ row.amount.toFixed(2) }}</Td>
              </template>
              <template #expanded>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Details:</strong> {{ row.details }}
                </div>
              </template>
            </ExpandableRow>
          </template>
        </Tbody>
      </Table>
    `,
  }),
}

export const ExpandableRowsControlled: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td, ExpandableRow },
    setup: () => {
      const data = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com' },
      ]
      const expandedIds = ref<number[]>([1]) // First row expanded by default

      const isExpanded = (id: number) => expandedIds.value.includes(id)
      const toggleExpanded = (id: number, value: boolean) => {
        if (value) {
          expandedIds.value.push(id)
        } else {
          expandedIds.value = expandedIds.value.filter(i => i !== id)
        }
      }

      const expandAll = () => {
        expandedIds.value = data.map(d => d.id)
      }

      const collapseAll = () => {
        expandedIds.value = []
      }

      return { data, isExpanded, toggleExpanded, expandAll, collapseAll }
    },
    template: `
      <div>
        <div class="mb-4 flex gap-2">
          <button
            class="px-3 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600"
            @click="expandAll"
          >
            Expand All
          </button>
          <button
            class="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            @click="collapseAll"
          >
            Collapse All
          </button>
        </div>
        <Table>
          <Thead>
            <Tr>
              <Th width="40px"></Th>
              <Th>Name</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            <template v-for="row in data" :key="row.id">
              <ExpandableRow
                :colspan="2"
                :expanded="isExpanded(row.id)"
                @update:expanded="toggleExpanded(row.id, $event)"
              >
                <template #row>
                  <Td main>{{ row.name }}</Td>
                  <Td>{{ row.email }}</Td>
                </template>
                <template #expanded>
                  <div class="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                    <p class="text-sm">Expanded content for {{ row.name }}</p>
                    <p class="text-xs text-gray-500 mt-1">This row's expanded state is controlled externally.</p>
                  </div>
                </template>
              </ExpandableRow>
            </template>
          </Tbody>
        </Table>
      </div>
    `,
  }),
}

export const ExpandableRowsOnRowClick: Story = {
  render: () => ({
    components: { Table, Thead, Tbody, Tr, Th, Td, ExpandableRow },
    setup: () => {
      const data = [
        { id: 1, name: 'John Doe', email: 'john@example.com', notes: 'Click anywhere on the row to expand' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', notes: 'The expand button also works' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', notes: 'Click the row again to collapse' },
      ]
      return { data }
    },
    template: `
      <Table>
        <Thead>
          <Tr>
            <Th width="40px"></Th>
            <Th>Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          <template v-for="row in data" :key="row.id">
            <ExpandableRow :colspan="2" expand-on-row-click>
              <template #row>
                <Td main>{{ row.name }}</Td>
                <Td>{{ row.email }}</Td>
              </template>
              <template #expanded>
                <div class="text-sm italic text-gray-600 dark:text-gray-400">
                  {{ row.notes }}
                </div>
              </template>
            </ExpandableRow>
          </template>
        </Tbody>
      </Table>
    `,
  }),
}

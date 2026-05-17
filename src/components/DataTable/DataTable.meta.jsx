import DataTable from './DataTable'

const COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', render: (v) => (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
      v === 'Active' ? 'bg-success/10 text-success' :
      v === 'Inactive' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
    }`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"/>
      {v}
    </span>
  )},
  { key: 'joined', label: 'Joined', sortable: true, align: 'right' },
]

const ROWS = [
  { id: 1, name: 'Alice Chen', role: 'Designer', status: 'Active', joined: '2022-03-14' },
  { id: 2, name: 'Bob Kim', role: 'Engineer', status: 'Active', joined: '2021-11-02' },
  { id: 3, name: 'Carol Smith', role: 'PM', status: 'Inactive', joined: '2020-07-19' },
  { id: 4, name: 'Dan Park', role: 'Engineer', status: 'Active', joined: '2023-01-08' },
  { id: 5, name: 'Eva Torres', role: 'Designer', status: 'Pending', joined: '2023-09-22' },
]

export default {
  name: 'DataTable',
  category: 'Display',
  description: 'Sortable, selectable data table with pagination, custom cell renderers, and row click support.',
  variants: [
    { label: 'Default', props: { columns: COLUMNS, rows: ROWS } },
    { label: 'Selectable', props: { columns: COLUMNS, rows: ROWS, selectable: true } },
    { label: 'Empty', props: { columns: COLUMNS, rows: [], emptyMessage: 'No team members yet.' } },
  ],
}

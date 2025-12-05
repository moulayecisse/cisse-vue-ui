/**
 * Composable for exporting data to CSV format
 */
export function useExportCSV() {
  const escapeCSV = (value: unknown): string => {
    if (value === null || value === undefined) return ''
    const str = String(value)
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  const exportToCSV = <T extends Record<string, unknown>>(
    data: T[],
    columns: { key: keyof T; label: string }[],
    filename: string = 'export.csv',
  ) => {
    if (!data || data.length === 0) {
      console.warn('No data to export')
      return
    }

    // Create header row
    const headers = columns.map((col) => escapeCSV(col.label)).join(',')

    // Create data rows
    const rows = data.map((item) =>
      columns.map((col) => escapeCSV(item[col.key])).join(','),
    )

    // Combine header and rows
    const csv = [headers, ...rows].join('\n')

    // Create and trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return {
    exportToCSV,
    escapeCSV,
  }
}

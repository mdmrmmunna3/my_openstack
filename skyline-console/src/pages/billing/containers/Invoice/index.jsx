import React from 'react';
import { Card, Button, DatePicker, Space, Table, Tag } from 'antd';
import {
  ReloadOutlined,
  DownloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import styles from './index.less';

const { RangePicker } = DatePicker;

const columns = [
  { title: 'Invoice No.', dataIndex: 'invoice_no' },
  { title: 'Contract', dataIndex: 'contract' },
  { title: 'Issue Date', dataIndex: 'issue_date' },
  { title: 'Due Date', dataIndex: 'due_date' },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => {
      const color = status === 'PAID' ? 'green' : 'orange';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  { title: 'Invoiced Amount (BDT)', dataIndex: 'amount' },
  {
    title: 'Actions',
    dataIndex: 'actions',
    render: () => <a>View</a>,
  },
];

// ✅ Dummy Data
const dataSource = [
  {
    invoice_no: 'INV-1001',
    contract: 'Cloud Service Contract A',
    issue_date: '01-12-2025',
    due_date: '10-12-2025',
    status: 'PAID',
    amount: '15,000',
  },
  {
    invoice_no: 'INV-1002',
    contract: 'Cloud Service Contract B',
    issue_date: '05-12-2025',
    due_date: '15-12-2025',
    status: 'PENDING',
    amount: '22,500',
  },
  {
    invoice_no: 'INV-1003',
    contract: 'Cloud Storage Contract',
    issue_date: '08-12-2025',
    due_date: '18-12-2025',
    status: 'PENDING',
    amount: '9,800',
  },
];

const Invoice = () => {
  return (
    <div className={styles.invoicePage}>
      {/* Header */}
      <Card bordered={false} className={styles.headerCard}>
        <div className={styles.headerLeft}>
          <h2>INVOICES</h2>
        </div>

        <div className={styles.headerRight}>
          <Button icon={<ReloadOutlined />}>Refresh</Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            Export CSV
          </Button>
          <Button disabled icon={<DownloadOutlined />}>
            Export Invoice
          </Button>
        </div>
      </Card>

      {/* Filter */}
      <Card bordered={false} className={styles.filterCard}>
        <Space>
          <RangePicker />
          <Button icon={<SearchOutlined />}>Search</Button>
        </Space>
      </Card>

      {/* Table */}
      <Card bordered={false}>
        <Table className={styles.tableData}
          columns={columns}
          dataSource={dataSource}
          rowKey="invoice_no"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Invoice;

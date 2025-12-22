import React, { useState } from 'react'
import styles from './index.less';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export default function TransactionLogs() {
    /* -------------------- FILTER STATE -------------------- */
    const [method, setMethod] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    /* -------------------- PAGINATION -------------------- */
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = 5; // demo

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.headerRow}>
                <h2 className={styles.header}>Transaction Logs</h2>
                <button className={styles.refreshBtn}>⟳ Refresh</button>
            </div>


            {/* Top Section */}
            <div className={styles.topSection}>
                {/* Chart */}
                <div className={styles.chartBox}>
                    <p className={styles.chartTitle}>Transactions Overview</p>
                    <div className={styles.chartPlaceholder}>
                        Chart will appear here
                    </div>
                </div>

                {/* Summary */}
                <div className={styles.summaryCard}>
                    <p className={styles.summaryLabel}>Total Expenditure</p>
                    <h3 className={styles.amount}>BDT 0.00</h3>
                    <span className={styles.growth}>↑ 0% from last 30 days</span>
                </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                {/* <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} /> */}
                <RangePicker />
                <input
                    type="number"
                    placeholder="Min Amount"
                    value={minAmount}
                    onChange={e => setMinAmount(e.target.value)}
                />
                <select value={method} onChange={e => setMethod(e.target.value)}>
                    <option value="">All Methods</option>
                    <option value="bkash">Bkash</option>
                    <option value="nagad">Nagad</option>
                    <option value="card">Card</option>
                </select>
                <button className={styles.applyBtn}>Apply</button>
            </div>

            {/* Table */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Contract</th>
                            <th>Date</th>
                            <th>Method</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={styles.emptyRow}>
                            <td colSpan="5">No transaction records found</td>
                        </tr>
                    </tbody>
                </table>

                {/* Pagination */}
                <div className={styles.pagination}>
                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                        Prev
                    </button>

                    {[1, 2, "...", totalPages].map((p, i) => (
                        <button
                            key={i}
                            className={p === page ? styles.activePage : ""}
                            disabled={p === "..."}
                            onClick={() => typeof p === "number" && setPage(p)}
                        >
                            {p}
                        </button>
                    ))}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>

                    <select>
                        <option>10 items/page</option>
                        <option>20 items/page</option>
                        <option>50 items/page</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

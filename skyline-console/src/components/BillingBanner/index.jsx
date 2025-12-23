import React from 'react';
import { Alert } from 'antd';

const BillingBanner = () => (
    <Alert
        message="Payment Required"
        description="Please pay your outstanding invoices to unlock all features."
        type="warning"
        showIcon
        style={{ marginBottom: 16 }}
    />
);

export default BillingBanner;

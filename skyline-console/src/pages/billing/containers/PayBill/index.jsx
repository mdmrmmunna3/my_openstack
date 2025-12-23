import React, { useState } from 'react';
import { Button, Input, message, Typography, Space, Radio, Divider } from 'antd';
import {
  DollarOutlined,
  CreditCardOutlined,
  SafetyCertificateOutlined,
  CheckCircleFilled
} from '@ant-design/icons';
import styles from './index.less';

const { Title, Text } = Typography;

const PayBill = (props) => {
  const { rootStore } = props;
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('bKash'); // Default selection

  // পেমেন্ট মেথড লিস্ট
  const paymentMethods = [
    { label: 'bKash', value: 'bKash', color: '#D12053' },
    { label: 'Nagad', value: 'Nagad', color: '#F7941D' },
    { label: 'Rocket', value: 'Rocket', color: '#8C3494' },
    { label: 'SSLCommerz', value: 'SSLCommerz', color: '#005BAA' },
  ];

  const handlePay = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      message.error('Please enter a valid payment amount!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('paymentExpired', 'false');

      if (rootStore && rootStore.setPaymentSuccess) {
        rootStore.setPaymentSuccess();
      }

      setLoading(false);

      // সফল মেসেজে পেমেন্ট মেথড এর নাম দেখানো
      message.success({
        content: `Payment Successful via ${selectedMethod}! Refreshing system...`,
        duration: 3,
        icon: <CheckCircleFilled style={{ color: '#52c41a' }} />
      });

      setTimeout(() => {
        window.location.href = '/base/overview';
      }, 2000);

    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.paymentWrapper}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>

        <div className={styles.paymentCard}>
          <div className={styles.iconWrapper}>
            <DollarOutlined />
          </div>

          <Title level={2} className={styles.title}>Secure Payment</Title>
          <Text type="secondary" className={styles.subtitle}>
            Choose your preferred method and settle the bill.
          </Text>

          {/* Payment Method Selection */}
          <div className={styles.methodSection}>
            <div className={styles.inputLabel}>Select Payment Method</div>
            <Radio.Group
              onChange={(e) => setSelectedMethod(e.target.value)}
              value={selectedMethod}
              className={styles.methodGroup}
            >
              {paymentMethods.map(method => (
                <Radio.Button
                  key={method.value}
                  value={method.value}
                  className={styles.methodButton}
                  style={{ '--active-color': method.color }}
                >
                  {method.label}
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>

          <Divider />

          <div className={styles.inputSection}>
            <div className={styles.inputLabel}>Payment Amount</div>
            <Input
              prefix={<span className={styles.currency}>৳</span>}
              placeholder="0.00"
              size="large"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.customInput}
            />
          </div>

          <Button
            type="primary"
            size="large"
            loading={loading}
            icon={<CreditCardOutlined />}
            onClick={handlePay}
            className={styles.gradientBtn}
          >
            Pay with {selectedMethod}
          </Button>

          <div className={styles.footer}>
            <Space>
              <SafetyCertificateOutlined />
              <Text type="secondary">Secured by SSL Encryption</Text>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayBill;
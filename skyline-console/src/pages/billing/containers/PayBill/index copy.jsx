import React, { useState } from 'react';
import { Button, Input, message, Typography, Space } from 'antd';
import { DollarOutlined, CreditCardOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Title, Text } = Typography;

const PayBill = (props) => {
  const { rootStore, history } = props;
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // const handlePay = () => {
  //   if (!amount || isNaN(amount) || amount <= 0) {
  //     message.error('Please enter a valid payment amount!');
  //     return;
  //   }

  //   setLoading(true);
  //   // Simulate API Call
  //   setTimeout(() => {
  //     localStorage.setItem('paymentExpired', 'false');
  //     message.success('Payment successful! Your features are now unlocked.');
  //     setAmount('');
  //     setLoading(false);
  //     // Optional: window.location.reload();
  //   }, 1500);
  // };

  const handlePay = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      message.error('Please enter a valid payment amount!');
      return;
    }

    setLoading(true);

    // পেমেন্ট প্রসেসিং সিমুলেশন
    setTimeout(() => {
      // ১. ডাটা আপডেট (লোকাল স্টোরেজ এবং রুট স্টোর)
      localStorage.setItem('paymentExpired', 'false');

      if (rootStore && rootStore.setPaymentSuccess) {
        rootStore.setPaymentSuccess();
      }

      setLoading(false);

      // ২. সাকসেস মেসেজ দেখানো
      message.success({
        content: 'Payment Successful! Refreshing system...',
        duration: 2,
      });

      // ৩. ১.৫ সেকেন্ড পর পেজ রিলোড দিয়ে ড্যাশবোর্ডে নিয়ে যাওয়া
      setTimeout(() => {
        // history.push এর বদলে window.location ব্যবহার করলে পেজটি রিলোড হয়ে আসবে
        // এতে সব মেনু এবং সাব-মেনু কন্টেন্ট একদম ফ্রেশ ভাবে লোড হবে
        window.location.href = '/base/overview';
      }, 1500);

    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.paymentWrapper}>
        {/* Decorative background element */}
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>

        <div className={styles.paymentCard}>
          <div className={styles.iconWrapper}>
            <DollarOutlined />
          </div>

          <Title level={2} className={styles.title}>Secure Payment</Title>
          <Text type="secondary" className={styles.subtitle}>
            Enter the amount to settle your outstanding invoices.
          </Text>

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
            Confirm & Pay Now
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
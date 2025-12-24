import React, { useState, useMemo } from 'react';
import { Radio, Slider, Switch, Button, Card, Typography, Modal, InputNumber, message } from 'antd';
import { CheckCircleFilled, LeftOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import styles from './index.less';

const { Text, Title } = Typography;

const BuyCredit = (props) => {
  // শুরুতে কোনো অ্যামাউন্ট সিলেক্ট থাকবে না
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customInputValue, setCustomInputValue] = useState(null);

  // ডিফল্ট ক্রেডিট লিস্ট
  const [creditOptions, setCreditOptions] = useState([
    { credit: 2000, amount: 2000 },
    { credit: 3000, amount: 3000 },
    { credit: 4000, amount: 4000 },
    { credit: 5000, amount: 5000 },
    { credit: 10000, amount: 10000 },
    { credit: 20000, amount: 20000 },
  ]);

  // Estimator States
  const [storageType, setStorageType] = useState('SAS');
  const [cpu, setCpu] = useState(1);
  const [ram, setRam] = useState(1);
  const [extraStorage, setExtraStorage] = useState(0);
  const [isUsd, setIsUsd] = useState(false);

  // কাস্টম ক্রেডিট লিস্টে যোগ করা
  const handleAddCustomCredit = () => {
    if (!customInputValue || customInputValue <= 0) {
      message.warning("Please enter a valid credit amount!");
      return;
    }
    const newOption = { credit: customInputValue, amount: customInputValue };
    setCreditOptions([...creditOptions, newOption]);
    setSelectedAmount(customInputValue); // অটো সিলেক্ট
    setIsModalVisible(false);
    setCustomInputValue(null);
    message.success("Custom credit added and selected!");
  };

  const handleBuyNow = () => {
    if (selectedAmount) {
      props.history.push({
        pathname: '/billing/paybill',
        state: { amount: selectedAmount }
      });
    }
  };

  const estimatedCost = useMemo(() => {
    let cost = (cpu * 400) + (ram * 100) + (extraStorage * 1.5);
    if (storageType === 'SSD') cost *= 1.5;
    if (storageType === 'NVME') cost *= 2.5;
    return isUsd ? (cost / 122).toFixed(2) : cost.toFixed(2);
  }, [cpu, ram, extraStorage, storageType, isUsd]);

  return (
    <div className={styles.container}>
      {/* বাম পাশের প্যানেল */}
      <div className={styles.leftPanel}>
        <Card className={styles.mainCard}>
          <div className={styles.cardHeader}>
            <Title level={4}>Buy Credit</Title>
            <div className={styles.headerBtns}>
              <Button
                size="small"
                icon={<CheckCircleFilled />}
                className={styles.customBtn}
                onClick={() => setIsModalVisible(true)}
              >
                CUSTOM
              </Button>
              <Button
                size="small"
                className={selectedAmount ? styles.buyBtnActive : styles.buyBtnTop}
                disabled={!selectedAmount}
                onClick={handleBuyNow}
              >
                BUY
              </Button>
            </div>
          </div>

          <div className={styles.scrollContainer}>
            <div className={styles.creditTable}>
              <div className={styles.tableHead}>
                <div className={styles.col}>Select</div>
                <div className={styles.col}>Credit</div>
                <div className={styles.col}>Amount (৳)</div>
              </div>

              <div className={styles.tableBody}>
                {creditOptions.map((item, index) => (
                  <div
                    key={index}
                    className={`${styles.tableRow} ${selectedAmount === item.amount ? styles.activeRow : ''}`}
                    onClick={() => setSelectedAmount(item.amount)}
                  >
                    <div className={styles.col}>
                      <Radio checked={selectedAmount === item.amount} />
                    </div>
                    <div className={styles.col}>{item.credit.toLocaleString()}</div>
                    <div className={styles.col}>{item.amount.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ডান পাশের প্যানেল */}
      <div className={styles.rightPanel}>
        <Card className={styles.mainCard}>
          <Title level={4} className={styles.centerTitle}>Price Estimator</Title>

          <div className={styles.estimatorSection}>
            <Text strong className={styles.label}>Storage Type</Text>
            <Radio.Group
              value={storageType}
              onChange={e => setStorageType(e.target.value)}
              className={styles.storageGroup}
            >
              <Radio.Button value="SAS">SAS</Radio.Button>
              <Radio.Button value="SSD">SSD</Radio.Button>
              <Radio.Button value="NVME">NVME</Radio.Button>
            </Radio.Group>

            {/* CPU Slider */}
            <div className={styles.sliderBox}>
              <Text className={styles.sliderLabel}>CPU</Text>
              <Title level={3} className={styles.sliderVal}>{cpu}</Title>
              <Slider
                min={1} max={128}
                marks={{ 1: '1', 8: '8', 16: '16', 32: '32', 48: '48', 64: '64', 82: '82', 96: '96', 112: '112', 128: '128' }}
                value={cpu} onChange={setCpu}
                tooltip={{ open: false }}
              />
            </div>

            {/* RAM Slider */}
            <div className={styles.sliderBox}>
              <Text className={styles.sliderLabel}>RAM</Text>
              <Title level={3} className={styles.sliderVal}>{ram} GB</Title>
              <Slider
                min={1} max={64}
                marks={{ 1: '1', 8: '8', 16: '16', 24: '24', 32: '32', 40: '40', 48: '48', 56: '56', 64: '64' }}
                value={ram} onChange={setRam}
                tooltip={{ open: false }}
              />
            </div>

            {/* Additional Storage Slider */}
            <div className={styles.sliderBox}>
              <Text className={styles.sliderLabel}>Additional Storage</Text>
              <Title level={3} className={styles.sliderVal}>{extraStorage} GB</Title>
              <Slider
                min={0} max={1000} step={50}
                marks={{ 0: '0', 50: '50', 100: '100', 200: '200', 300: '300', 400: '400', 500: '500', 600: '600', 700: '700', 800: '800', 900: '900', 1000: '1000' }}
                value={extraStorage} onChange={setExtraStorage}
              />
            </div>

            {/* Blue Result Box */}
            <div className={styles.resultBox}>
              <div className={styles.currencySwitch}>
                <span>BDT</span> <Switch size="small" onChange={setIsUsd} /> <span>USD</span>
              </div>
              <div className={styles.resultContent}>
                <Text className={styles.resLabel}>Estimated Cost</Text>
                <Title level={1} className={styles.resPrice}>
                  {isUsd ? '$' : '৳'}{estimatedCost}
                </Title>
                <Text className={styles.resPkg}>Package Name</Text>
                <Title level={4} className={styles.resPkgName}>Computant-C1</Title>

                <div className={styles.resFooter}>
                  <div><Text className={styles.dimText}>Storage</Text><br /><strong>50 GB</strong></div>
                  <div><Text className={styles.dimText}>BandWidth</Text><br /><strong>30 Mbps</strong></div>
                </div>
              </div>
            </div>

            {/* <div className={styles.actionBtns}>
              <Button icon={<LeftOutlined />}>BACK</Button>
              <Button type="primary" className={styles.nextBtn}>NEXT <RightOutlined /></Button>
            </div> */}
            <Text type="danger" className={styles.vatText}>*Prices are inclusive of 5% VAT</Text>
          </div>
        </Card>
      </div>

      {/* Custom Credit Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusOutlined style={{ color: '#1a3353' }} />
            <span>Create Custom Credit</span>
          </div>
        }
        visible={isModalVisible}
        onOk={handleAddCustomCredit}
        onCancel={() => setIsModalVisible(false)}
        okText="Add to List"
        cancelText="Cancel"
        centered
        className={styles.customModal} // কাস্টম ক্লাস যোগ করা হয়েছে
        width={400}
      >
        <div className={styles.modalBody}>
          <Text strong className={styles.modalLabel}>Enter Credit/Amount (৳):</Text>
          <InputNumber
            className={styles.modalInput}
            placeholder="e.g. 1500"
            value={customInputValue}
            onChange={setCustomInputValue}
            min={1}
            autoFocus
            formatter={value => `৳ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/৳\s?|(,*)/g, '')}
          />
          <p className={styles.modalHint}>Note: Amount and credit will be same value.</p>
        </div>
      </Modal>
    </div>
  );
};

export default withRouter(BuyCredit);
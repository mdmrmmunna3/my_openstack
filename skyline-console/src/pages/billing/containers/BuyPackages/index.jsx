import React, { useState, useMemo } from 'react';
import { Modal, InputNumber, Typography, Button, Space, Divider } from 'antd';
import { PlusCircleFilled, ThunderboltOutlined, ClockCircleOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './index.less';
import { withRouter } from 'react-router-dom';

const { Text, Title } = Typography;

const PACKAGE_LIST = [
  { id: 1, name: 'Standant-S256', core: 128, ram: 256, basePrice: 121065 },
  { id: 2, name: 'Megant-M32', core: 4, ram: 32, basePrice: 10185 },
  { id: 3, name: 'Extran-E96', core: 32, ram: 96, basePrice: 25200 },
  { id: 4, name: 'Fastant-F4', core: 1, ram: 4, basePrice: 1575 },
  { id: 5, name: 'Fastant-F8', core: 2, ram: 8, basePrice: 3045 },
  { id: 6, name: 'Fastant-F16', core: 4, ram: 16, basePrice: 5985 },
  { id: 7, name: 'Fastant-F32', core: 8, ram: 32, basePrice: 11865 },
  { id: 8, name: 'Fastant-F64', core: 16, ram: 64, basePrice: 23625 },
  { id: 9, name: 'Fastant-F128', core: 32, ram: 128, basePrice: 47145 },
  { id: 10, name: 'Megant-M8', core: 1, ram: 8, basePrice: 2625 },
  { id: 11, name: 'Megant-M16', core: 2, ram: 16, basePrice: 5145 },
  { id: 12, name: 'Megant-M64', core: 8, ram: 64, basePrice: 20265 },
  { id: 13, name: 'Megant-M128', core: 16, ram: 128, basePrice: 40425 },
  { id: 14, name: 'Megant-M256', core: 32, ram: 256, basePrice: 80745 },
  { id: 15, name: 'Standant-S2', core: 1, ram: 2, basePrice: 1050 },
  { id: 16, name: 'Standant-S4', core: 2, ram: 4, basePrice: 1995 },
  { id: 17, name: 'Standant-S8', core: 4, ram: 8, basePrice: 3885 },
  { id: 18, name: 'Standant-S16', core: 8, ram: 16, basePrice: 7665 },
  { id: 19, name: 'Standant-S32', core: 16, ram: 32, basePrice: 15225 },
  { id: 20, name: 'Standant-S64', core: 32, ram: 64, basePrice: 30345 },
  { id: 21, name: 'Standant-S96', core: 48, ram: 96, basePrice: 45465 },
  { id: 22, name: 'Standant-S128', core: 64, ram: 128, basePrice: 60585 },
  { id: 23, name: 'Standant-F32', core: 32, ram: 96, basePrice: 38745 },
  { id: 24, name: 'Extrant-E12', core: 4, ram: 12, basePrice: 4935 },
  { id: 25, name: 'Extrant-E16', core: 96, ram: 96, basePrice: 9345 },
  { id: 26, name: 'Extrant-E24', core: 8, ram: 24, basePrice: 9765 },
  { id: 27, name: 'Extrant-EC24', core: 12, ram: 24, basePrice: 11445 },
  { id: 28, name: 'Extrant-EC32', core: 12, ram: 32, basePrice: 13545 },
  { id: 29, name: 'Extrant-E32', core: 24, ram: 32, basePrice: 18585 },
  { id: 30, name: 'Extrant-E48', core: 16, ram: 48, basePrice: 19425 },
  { id: 31, name: 'Extrant-EC48', core: 24, ram: 48, basePrice: 22785 },
  { id: 32, name: 'Extrant-EE48', core: 48, ram: 48, basePrice: 32865 },
  { id: 33, name: 'Extrant-E64', core: 24, ram: 64, basePrice: 26985 },
  { id: 34, name: 'Extrant-E128', core: 8, ram: 128, basePrice: 37065 },
  { id: 35, name: 'Extrant-E192', core: 24, ram: 192, basePrice: 60585 },
  { id: 36, name: 'Extrant-E256', core: 16, ram: 256, basePrice: 74025 },
  { id: 37, name: 'Extrant-E384', core: 24, ram: 384, basePrice: 110985 },
  { id: 38, name: 'Computant-C1', core: 1, ram: 1, basePrice: 787.5 },
  { id: 39, name: 'Computant-C2', core: 2, ram: 2, basePrice: 1470 },
  { id: 40, name: 'Computant-C4', core: 4, ram: 4, basePrice: 2835 },
  { id: 41, name: 'Computant-C8', core: 8, ram: 8, basePrice: 5565 },
  { id: 42, name: 'Computant-C16', core: 16, ram: 16, basePrice: 11025 },
  { id: 43, name: 'Computant-C32', core: 32, ram: 32, basePrice: 21945 },
  { id: 44, name: 'Computant-C64', core: 64, ram: 64, basePrice: 43785 },
];

const STORAGE_CONFIG = {
  SAS: { multiplier: 1 },
  SSD: { multiplier: 1.5 },
  NVME: { multiplier: 2.5 },
};

const BuyPackages = (props) => {
  const [activeTab, setActiveTab] = useState('SAS');
  const [cart, setCart] = useState({});
  const { history } = props;

  // Custom Package States
  const [isCustomModal, setIsCustomModal] = useState(false);
  // Default values set to include storageType
  const [customSpecs, setCustomSpecs] = useState({
    time: 1,
    core: 1,
    ram: 1,
    storageType: 'SAS'
  });

  const calculatePrice = (basePrice, type) => Math.round(basePrice * STORAGE_CONFIG[type].multiplier);

  // Custom Price Calculation Logic based on Modal's internal storageType
  const customPrice = useMemo(() => {
    const hourlyBaseRate = 0.5;
    const resourceBase = (customSpecs.core * 300) + (customSpecs.ram * 150);
    const multiplier = STORAGE_CONFIG[customSpecs.storageType].multiplier;
    return Math.round(resourceBase * customSpecs.time * multiplier * hourlyBaseRate);
  }, [customSpecs]);

  const updateQuantity = (pkg, type, delta) => {
    const key = `${pkg.name}-${type}`;
    const price = pkg.isCustom ? pkg.price : calculatePrice(pkg.basePrice, type);

    setCart((prev) => {
      const current = prev[key] || { ...pkg, storageType: type, quantity: 0, price };
      const newQty = Math.max(0, current.quantity + delta);

      if (newQty === 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: { ...current, quantity: newQty } };
    });
  };

  const handleAddCustomToCart = () => {
    const customPkg = {
      name: `Custom-${customSpecs.core}C-${customSpecs.ram}R`,
      core: customSpecs.core,
      ram: customSpecs.ram,
      price: customPrice,
      isCustom: true
    };
    // Adds to the specific storage column selected in modal
    updateQuantity(customPkg, customSpecs.storageType, 1);
    setIsCustomModal(false);
  };

  const totalPrice = useMemo(() =>
    Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const handleProceedToPay = () => {
    history.push({
      pathname: '/billing/paybill',
      state: { amount: totalPrice }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.panelWrapper}>
        <div className={styles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 className={styles.headerTitle} style={{ margin: 0 }}>Buy Packages</h2>
            <Button
              type="primary"
              icon={<PlusCircleFilled />}
              className={styles.customAddBtn}
              onClick={() => setIsCustomModal(true)}
            >
              CUSTOM PACKAGE
            </Button>
          </div>

          <div className={styles.scrollArea}>
            {/* <div className={styles.headerInfo}>
              <h3 className={styles.subTitle}>Virtual Machines</h3>
              <ul>
                <li>- Storage capacity: <span>50GB</span>.</li>
                <li>- No data cap on transfers.</li>
                <li className={styles.redText}>**Includes 5% VAT.</li>
              </ul>
            </div> */}

            <div className={styles.tabs}>
              <div>
                <h2 className={styles.monthlyPackage}>Monthly Packages List</h2>
              </div>
              <div>
                {Object.keys(STORAGE_CONFIG).map((type) => (
                  <button key={type} className={activeTab === type ? styles.active : ''} onClick={() => setActiveTab(type)}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th><th>Core</th><th>RAM</th><th>Price (৳)</th><th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {PACKAGE_LIST.map((pkg) => {
                  const currentPrice = calculatePrice(pkg.basePrice, activeTab);
                  const cartKey = `${pkg.name}-${activeTab}`;
                  return (
                    <tr key={pkg.id}>
                      <td>{pkg.name}</td><td>{pkg.core}</td><td>{pkg.ram} GB</td>
                      <td>{currentPrice.toLocaleString()}</td>
                      <td>
                        <div className={styles.counter}>
                          <button onClick={() => updateQuantity(pkg, activeTab, -1)}>-</button>
                          <span>{cart[cartKey]?.quantity || 0}</span>
                          <button onClick={() => updateQuantity(pkg, activeTab, 1)}>+</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles.panelWrapper}>
        <div className={`${styles.card} ${styles.reviewCard}`}>
          <h2 className={styles.headerTitle}>Review Package Details</h2>
          <div className={styles.scrollArea}>
            <table className={styles.reviewTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>SAS</th>
                  <th>SSD</th>
                  <th>NVME</th>
                  <th>Subtotal</th>
                  <th>Remove</th> {/* নতুন কলাম */}
                </tr>
              </thead>
              <tbody>
                {Object.values(cart).map((item, idx) => {
                  const cartKey = `${item.name}-${item.storageType}`; // আইটেম রিমুভ করার জন্য key
                  return (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.storageType === 'SAS' ? item.quantity : 0}</td>
                      <td>{item.storageType === 'SSD' ? item.quantity : 0}</td>
                      <td>{item.storageType === 'NVME' ? item.quantity : 0}</td>
                      <td>৳{(item.price * item.quantity).toLocaleString()}</td>
                      <td>
                        <button
                          className={styles.removeBtn}
                          onClick={() => {
                            const { [cartKey]: _, ...rest } = cart;
                            setCart(rest);
                          }}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.summaryFooter}>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>৳ {totalPrice.toLocaleString()}</span>
            </div>
            <button
              className={styles.buyButton}
              onClick={handleProceedToPay}
              disabled={totalPrice === 0}
            >
              BUY PACKAGE (৳{totalPrice.toLocaleString()})
            </button>
          </div>
        </div>
      </div>

      <Modal
        title={
          <Space>
            <SettingOutlined style={{ color: '#1890ff' }} />
            <span>Customize Your Resources</span>
          </Space>
        }
        visible={isCustomModal}
        onCancel={() => setIsCustomModal(false)}
        onOk={handleAddCustomToCart}
        okText="Add to Cart"
        okButtonProps={{ style: { background: '#1a3353', border: 'none', height: '38px', borderRadius: '6px' } }}
        cancelButtonProps={{ style: { height: '38px', borderRadius: '6px' } }}
        centered
        width={480}
      >
        <div className={styles.modalBodyWrapper}>
          <div className={styles.inputFieldRow}>
            <Text strong style={{ marginBottom: '8px', display: 'block' }}>Select Storage Type</Text>
            <div className={styles.customStorageTabs}>
              {Object.keys(STORAGE_CONFIG).map((type) => (
                <div
                  key={type}
                  className={`${styles.storageOption} ${customSpecs.storageType === type ? styles.activeOption : ''}`}
                  onClick={() => setCustomSpecs({ ...customSpecs, storageType: type })}
                >
                  {type}
                  {customSpecs.storageType === type && <div className={styles.checkDot} />}
                </div>
              ))}
            </div>
          </div>

          <Divider style={{ margin: '16px 0' }} />

          <div className={styles.inputFieldRow}>
            <div className={styles.labelSection}>
              <ClockCircleOutlined /> <Text strong>Usage Duration (Hours)</Text>
            </div>
            <InputNumber min={1} value={customSpecs.time} onChange={(v) => setCustomSpecs({ ...customSpecs, time: v })} className={styles.fullWidthInput} />
          </div>

          <div className={styles.resourceGrid}>
            <div className={styles.inputFieldRow}>
              <Text strong>CPU Cores</Text>
              <InputNumber min={1} max={128} value={customSpecs.core} onChange={(v) => setCustomSpecs({ ...customSpecs, core: v })} className={styles.fullWidthInput} />
            </div>
            <div className={styles.inputFieldRow}>
              <Text strong>RAM (GB)</Text>
              <InputNumber min={1} max={256} value={customSpecs.ram} onChange={(v) => setCustomSpecs({ ...customSpecs, ram: v })} className={styles.fullWidthInput} />
            </div>
          </div>

          <div className={styles.modernPriceCard}>
            <div className={styles.priceTag}>
              <ThunderboltOutlined style={{ marginRight: 8 }} />
              Estimated Cost ({customSpecs.storageType})
            </div>
            <div className={styles.priceValue}>৳ {customPrice.toLocaleString()}</div>
            <Text type="secondary" style={{ fontSize: '11px' }}>*Final price includes storage multiplier</Text>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default withRouter(BuyPackages);
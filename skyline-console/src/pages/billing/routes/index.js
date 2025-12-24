import BaseLayout from 'layouts/Basic';
import E404 from 'pages/base/containers/404';
import Invoice from '../containers/Invoice';
import TransactionLogs from '../containers/TransactionLogs';
import PayBill from '../containers/PayBill';
import BuyPackages from '../containers/BuyPackages';

const PATH = '/billing';
export default [
  {
    path: PATH,
    component: BaseLayout,
    routes: [
      {
        path: `${PATH}/buypackages`,
        component: BuyPackages,
        exact: true,
      },
      {
        path: `${PATH}/paybill`,
        component: PayBill,
        exact: true,
      },

      {
        path: `${PATH}/invoices`,
        component: Invoice,
        exact: true,
      },
      {
        path: `${PATH}/transaction_logs`,
        component: TransactionLogs,
        exact: true,
      },

      { path: '*', component: E404 },
    ],
  },
];

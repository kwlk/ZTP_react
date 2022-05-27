/**
 * Asynchronously loads the component for DashboardPage
 */

import { lazyLoad } from 'utils/loadable';

export const AdminDashboardPage = lazyLoad(
  () => import('./index'),
  module => module.AdminDashboardPage,
);

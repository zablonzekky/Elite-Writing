import React from 'react';
import DashboardShell from '../components/layout/DashboardShell';

const AdminDashboard = () => (
  <DashboardShell title="Admin Dashboard" subtitle="Monitor users, coaches, and transactions.">
    <div className="col-md-4"><div className="card card-body"><h2 className="h6">Total Users</h2><p className="display-6 mb-0">1,248</p></div></div>
    <div className="col-md-4"><div className="card card-body"><h2 className="h6">Active Coaches</h2><p className="display-6 mb-0">132</p></div></div>
    <div className="col-md-4"><div className="card card-body"><h2 className="h6">Revenue</h2><p className="display-6 mb-0">$84k</p></div></div>
    <div className="col-12"><div className="card card-body"><h2 className="h6">Moderation Queue</h2><p className="mb-0">3 accounts awaiting review.</p></div></div>
  </DashboardShell>
);

export default AdminDashboard;

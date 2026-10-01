// src/features/admin/user-management/pages/UserManagementPage.jsx
// TODO: Adjust path

import { useState } from 'react';
import { useUserList } from '../hooks/useUserList';
import GlobalSearchBar from '../components/GlobalSearchBar';
import UserDeepProfileModal from '../components/UserDeepProfileModal';

// Reusable Components
import { Card, Input, Select, Button, Badge, Table, Skeleton } from '../../../../shared/components/ui'; // TODO: Adjust path

export default function UserManagementPage() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUserUuid, setSelectedUserUuid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const limit = 20;

  const { data, isLoading, isError, error } = useUserList({
    search: search || undefined,
    role: role || undefined,
    limit,
    offset: (page - 1) * limit,
  });
//alert(JSON.stringify(data), null, 0);

  const handleViewProfile = (uuid) => {
    setSelectedUserUuid(uuid);
    setIsModalOpen(true);
  };

  const columns = [
    { 
      key: 'user', 
      title: 'User',
      render: (row) => (
        <div>
          <div className="font-semibold text-gray-900">{row.full_name}</div>
          <div className="text-xs text-gray-500">{row.email}</div>
        </div>
      )
    },
    { 
      key: 'role', 
      title: 'Role',
      render: (row) => {
        const variant = row.role === 'agent' ? 'warning' : row.role === 'vendor' ? 'info' : row.role === 'api_user' ? 'gray' : 'primary';
        return <Badge variant={variant} size="sm">{row.role.replace('_', ' ').toUpperCase()}</Badge>;
      }
    },
    { 
      key: 'kyc_status', 
      title: 'KYC',
      render: (row) => (
        <Badge variant={row.kyc_status === 'verified' ? 'success' : 'warning'} size="sm">
          {row.kyc_status.toUpperCase()}
        </Badge>
      )
    },
    { 
      key: 'balance', 
      title: 'Balance',
      render: (row) => <span className="font-mono font-semibold text-gray-900">₦{row.total_balance}</span>
    },
    { 
      key: 'created_at', 
      title: 'Joined',
      render: (row) => new Date(row.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    },
    { 
      key: 'actions', 
      title: 'Actions',
      cellClassName: "text-right",
      render: (row) => (
        <Button variant="primary" size="sm" onClick={() => handleViewProfile(row.uuid)}>
          View Profile
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-500 mt-1">Manage users, view deep profiles, and monitor platform activity.</p>
      </div>

      {/* Global Search */}
      <GlobalSearchBar />

      {/* User List Card */}
      <Card padding={false}>
        {/* Toolbar */}
        <div className="flex flex-col gap-4 p-5 border-b border-gray-100 sm:flex-row sm:items-center">
          <div className="w-full sm:w-72">
            <Input 
              placeholder="Search name, email, or phone..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select 
              value={role} 
              onChange={(e) => { setRole(e.target.value); setPage(1); }}
              className="w-full"
            >
              <option value="">All Roles</option>
              <option value="user">Customer</option>
              <option value="agent">Agent</option>
              <option value="vendor">Vendor</option>
              <option value="api_user">API User</option>
            </Select>
          </div>
        </div>

        {/* Reusable Table */}
        <Table 
          columns={columns}
          data={data?.data?.users || []} // Adjust based on exact backend response shape
          loading={isLoading}
          emptyMessage={isError ? (error?.response?.data?.message || 'Failed to load users.') : "No users found matching your criteria."}
          rowKey="uuid"
          striped={true}
          hover={true}
          className="border-0 rounded-none"
        />

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4 bg-gray-50/50">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{data?.data?.users?.length || 0}</span> of{' '}
            <span className="font-semibold text-gray-900">{data?.data?.count || 0}</span> users
          </p>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="sm" 
              disabled={page === 1 || isLoading}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              disabled={!data || data.data?.users?.length < limit || isLoading}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Deep Profile Modal */}
      {selectedUserUuid && (
        <UserDeepProfileModal 
          open={isModalOpen}
          onClose={() => { setIsModalOpen(false); setSelectedUserUuid(null); }}
          userUuid={selectedUserUuid}
        />
      )}
    </div>
  );
}
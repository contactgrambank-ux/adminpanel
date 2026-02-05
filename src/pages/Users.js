import { useEffect, useState, useMemo } from "react";
import {
  Search,
  Eye,
  Lock,
  Unlock,
  X
} from "lucide-react";
import { getAllUsers } from "../api/user.api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers(page, 10);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!search) return users;
    return users.filter(user =>
      [
        user.name,
        user._id,
        user.email,
        user.accountNumber
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, users]);

  if (loading) return <div>Loading users...</div>;

  return (
    <>
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-1">User Management</h1>
      <p className="text-muted mb-6">Manage and monitor user accounts</p>

      {/* SEARCH */}
      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, ID, or email..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-card dark:bg-darkcard rounded-xl border overflow-x-auto">
        <table className="table min-w-[1100px]">
          <thead>
            <tr>
              <th className="th">USER ID</th>
              <th className="th">NAME</th>
              <th className="th">CONTACT</th>
              <th className="th">BALANCE</th>
              <th className="th">STATUS</th>
              <th className="th text-right">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td className="td">{user._id.slice(-6)}</td>
                <td className="td font-medium">{user.name}</td>

                <td className="td text-sm text-muted">
                  {user.email}
                  <br />
                  {user.phoneNumber}
                </td>

                <td className="td font-semibold">₹{user.balance}</td>

                <td className="td">
                  <span className={`badge badge-green`}>
                    Active
                  </span>
                </td>

                {/* ACTIONS */}
                  <td className="td">
                    <div className=" gap-9">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Eye size={18} />
                      </button>

                      {user.status === "Active" ? (
                        <button style={{paddingLeft : 30}} className="text-red-500 hover:text-red-600">
                          <Lock size={18} />
                        </button>
                      ) : (
                        <button style={{marginLeft : 30}} className="text-green-500 hover:text-green-600">
                          <Unlock size={18} />
                        </button>
                      )}
                    </div>
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* USER DETAILS DRAWER */}
      {selectedUser && (
        <UserDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
}

/* ================= USER DRAWER ================= */
function UserDrawer({ user, onClose }) {
  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* DRAWER */}
      <div className="fixed right-0 top-0 h-full w-[380px] bg-white z-50 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">User Details</h2>
            <p className="text-sm text-muted">{user._id.slice(-6)}</p>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <Info label="Name" value={user.name} />
        <Info label="Phone" value={user.phoneNumber} />
        <Info label="Balance" value={`₹${user.balance}`} bold />
        <Info
          label="Status"
          value={
            <span className={`badge  badge-green`}>
              {'Active'}
            </span>
          }
        />
        <Info label="Join Date" value={new Date(user.createdAt).toLocaleDateString()} />

        {/* RECENT TRANSACTIONS (static placeholder) */}
        <h3 className="mt-6 mb-2 font-semibold">Recent Transactions</h3>
        <div className="border rounded-lg p-3 text-sm">
          TRX-45281
          <div className="text-muted">31/01/2026</div>
          <div className="text-green-600 font-semibold">+₹2,500 completed</div>
        </div>

        {/* FREEZE BUTTON */}
        <button className="mt-6 w-full py-3 rounded-xl bg-red-500 text-white font-medium">
          Freeze Account
        </button>
      </div>
    </>
  );
}

/* INFO ROW */
function Info({ label, value, bold }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-muted">{label}</p>
      <div className={bold ? "text-lg font-semibold" : ""}>{value}</div>
    </div>
  );
}

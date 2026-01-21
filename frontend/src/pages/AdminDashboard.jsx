import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('analytics');
    const [loading, setLoading] = useState(false);

    // Data States
    const [analytics, setAnalytics] = useState(null);
    const [users, setUsers] = useState([]);
    const [hotelOwners, setHotelOwners] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [superusers, setSuperusers] = useState([]);

    // Filter States
    const [userFilter, setUserFilter] = useState('all');
    const [userSearch, setUserSearch] = useState('');
    const [bookingFilter, setBookingFilter] = useState('all');

    // UI States
    const [showCreateSuperuser, setShowCreateSuperuser] = useState(false);
    const [newSuperuser, setNewSuperuser] = useState({ username: '', email: '', password: '' });

    useEffect(() => {
        fetchData();
    }, [activeTab, userFilter, bookingFilter]);

    const fetchData = async () => {
        setLoading(true);
        try {
            switch (activeTab) {
                case 'analytics':
                    const analyticsData = await adminAPI.getAnalytics();
                    setAnalytics(analyticsData.data);
                    break;
                case 'users':
                    const usersData = await adminAPI.getAllUsers({ role: userFilter, search: userSearch });
                    setUsers(usersData.data);
                    break;
                case 'hotelOwners':
                    const ownersData = await adminAPI.getAllHotelOwners();
                    setHotelOwners(ownersData.data);
                    break;
                case 'hotels':
                    const hotelsData = await adminAPI.getAllHotels();
                    setHotels(hotelsData.data);
                    break;
                case 'rooms':
                    const roomsData = await adminAPI.getAllRooms();
                    setRooms(roomsData.data);
                    break;
                case 'bookings':
                    const bookingsData = await adminAPI.getAllBookings({ status: bookingFilter });
                    setBookings(bookingsData.data);
                    break;
                case 'superusers':
                    const superusersData = await adminAPI.getSuperusers();
                    setSuperusers(superusersData.data);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await adminAPI.deleteUser(id);
            fetchData();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleUpdateBookingStatus = async (id, status) => {
        try {
            await adminAPI.updateBookingStatus(id, status);
            fetchData();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCreateSuperuser = async (e) => {
        e.preventDefault();
        try {
            await adminAPI.createSuperuser(newSuperuser);
            setShowCreateSuperuser(false);
            setNewSuperuser({ username: '', email: '', password: '' });
            fetchData();
        } catch (error) {
            alert(error.message);
        }
    };

    const tabs = [
        { id: 'analytics', name: 'Overview', icon: '⚡' },
        { id: 'users', name: 'Users', icon: '👥' },
        { id: 'hotelOwners', name: 'Owners', icon: '🔑' },
        { id: 'hotels', name: 'Properties', icon: '🏨' },
        { id: 'bookings', name: 'Bookings', icon: '📅' },
        { id: 'superusers', name: 'Admins', icon: '👑' }
    ];

    const glassStyle = {
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
    };

    return (
        <div className="min-h-screen bg-[#f8faff] pt-24 pb-12 px-4 md:px-8">
            {/* Dynamic Background Blurs */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50 z-[-1]"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50 z-[-1]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Control <span className="text-blue-600">Center</span>
                        </h1>
                        <p className="text-gray-500 mt-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Platform status: Healthy • Admin: {user?.username}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 rounded-2xl bg-white text-gray-700 font-bold shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center gap-2"
                        >
                            🚀 View Site
                        </button>
                    </div>
                </div>

                {/* glass-morphism Tabs */}
                <div style={glassStyle} className="p-2 rounded-3xl mb-10 overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-[1.02]'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                {tab.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="min-h-[500px]">
                    {loading && !analytics && users.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[400px]">
                            <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                            <p className="mt-4 text-gray-400 font-medium">Synchronizing data...</p>
                        </div>
                    ) : (
                        <div>
                            {/* Analytics Dashboard */}
                            {activeTab === 'analytics' && analytics && (
                                <div className="space-y-8 animate-fadeIn">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { label: 'Platform Revenue', val: `₹${analytics.overview.totalRevenue.toLocaleString()}`, icon: '💰', color: 'bg-green-50', text: 'text-green-600' },
                                            { label: 'Active Users', val: analytics.overview.totalUsers, icon: '🛡️', color: 'bg-blue-50', text: 'text-blue-600' },
                                            { label: 'Managed Hotels', val: analytics.overview.totalHotels, icon: '🏢', color: 'bg-purple-50', text: 'text-purple-600' },
                                            { label: 'Total Bookings', val: analytics.overview.totalBookings, icon: '✨', color: 'bg-orange-50', text: 'text-orange-600' }
                                        ].map((stat, i) => (
                                            <div key={i} style={glassStyle} className="p-6 rounded-[32px] hover:scale-[1.02] transition-transform duration-300">
                                                <div className={`w-12 h-12 ${stat.color} ${stat.text} rounded-2xl flex items-center justify-center text-xl mb-4`}>
                                                    {stat.icon}
                                                </div>
                                                <p className="text-gray-500 font-semibold text-sm uppercase tracking-wider">{stat.label}</p>
                                                <h3 className={`text-3xl font-black mt-2 ${stat.text}`}>{stat.val}</h3>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Booking Activity */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div style={glassStyle} className="lg:col-span-2 p-8 rounded-[40px]">
                                            <h3 className="text-xl font-black mb-6">Recent Platform Activity</h3>
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="text-left text-gray-400 text-xs uppercase font-bold tracking-widest border-b border-gray-50">
                                                            <th className="pb-4">Client</th>
                                                            <th className="pb-4">Destination</th>
                                                            <th className="pb-4 text-center">Status</th>
                                                            <th className="pb-4 text-right">Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {analytics.recentBookings.map((booking) => (
                                                            <tr key={booking._id} className="group hover:bg-gray-50/50 transition-colors">
                                                                <td className="py-4 text-sm">
                                                                    <div className="font-bold text-gray-900">{booking.user?.username}</div>
                                                                    <div className="text-xs text-gray-400">{booking.user?.email}</div>
                                                                </td>
                                                                <td className="py-4 text-sm">
                                                                    <div className="font-semibold text-gray-700">{booking.hotel?.name}</div>
                                                                </td>
                                                                <td className="py-4">
                                                                    <div className="flex justify-center">
                                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                                            }`}>
                                                                            {booking.status}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-4 text-right font-black text-gray-900">₹{booking.totalPrice}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div style={glassStyle} className="p-8 rounded-[40px] flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xl font-black mb-6">Status Quo</h3>
                                                <div className="space-y-6">
                                                    {[
                                                        { label: 'Confirmed', count: analytics.bookings.confirmed, color: 'bg-green-500' },
                                                        { label: 'Pending', count: analytics.bookings.pending, color: 'bg-yellow-500' },
                                                        { label: 'Cancelled', count: analytics.bookings.cancelled, color: 'bg-red-500' }
                                                    ].map((item, i) => (
                                                        <div key={i}>
                                                            <div className="flex justify-between items-center mb-2">
                                                                <span className="font-bold text-gray-700">{item.label}</span>
                                                                <span className="font-black text-blue-600">{item.count}</span>
                                                            </div>
                                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full ${item.color}`}
                                                                    style={{ width: `${(item.count / (analytics.overview.totalBookings || 1)) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mt-8 p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-lg shadow-blue-100">
                                                <p className="text-xs font-bold opacity-80 uppercase mb-1">Growth Prediction</p>
                                                <h4 className="text-lg font-black">+14% Expected next month</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Users & Lists */}
                            {['users', 'hotelOwners', 'hotels', 'bookings', 'superusers'].includes(activeTab) && (
                                <div style={glassStyle} className="p-8 rounded-[40px] animate-fadeIn">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                        <h2 className="text-2xl font-black text-gray-900 capitalize">{activeTab} Management</h2>
                                        <div className="flex flex-wrap gap-4">
                                            {activeTab === 'users' && (
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Search users..."
                                                        className="px-4 py-2 bg-gray-50 border-none rounded-2xl font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 text-sm"
                                                        value={userSearch}
                                                        onChange={(e) => setUserSearch(e.target.value)}
                                                    />
                                                    <select
                                                        value={userFilter}
                                                        onChange={(e) => setUserFilter(e.target.value)}
                                                        className="px-4 py-2 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 text-sm"
                                                    >
                                                        <option value="all">All Roles</option>
                                                        <option value="user">Clients</option>
                                                        <option value="hotelOwner">Owners</option>
                                                        <option value="admin">System Admins</option>
                                                    </select>
                                                </div>
                                            )}
                                            {activeTab === 'bookings' && (
                                                <select
                                                    value={bookingFilter}
                                                    onChange={(e) => setBookingFilter(e.target.value)}
                                                    className="px-4 py-2 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 focus:ring-2 focus:ring-blue-500 text-sm"
                                                >
                                                    <option value="all">Every Status</option>
                                                    <option value="pending">Waiting</option>
                                                    <option value="confirmed">Approved</option>
                                                    <option value="cancelled">Declined</option>
                                                    <option value="completed">Finished</option>
                                                </select>
                                            )}
                                            {activeTab === 'superusers' && (
                                                <button
                                                    onClick={() => setShowCreateSuperuser(!showCreateSuperuser)}
                                                    className="px-6 py-2 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all text-sm"
                                                >
                                                    {showCreateSuperuser ? 'Close' : '+ New Admin'}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Superuser Form */}
                                    {showCreateSuperuser && activeTab === 'superusers' && (
                                        <div className="mb-10 p-8 bg-gray-50 rounded-[32px] border border-gray-100 shadow-inner">
                                            <h4 className="font-black mb-6 flex items-center gap-2">
                                                <span className="p-2 bg-blue-100 text-blue-600 rounded-lg text-sm">👑</span>
                                                Add System Administrator
                                            </h4>
                                            <form onSubmit={handleCreateSuperuser} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <input
                                                    placeholder="Username"
                                                    className="px-5 py-4 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                                    value={newSuperuser.username}
                                                    onChange={(e) => setNewSuperuser({ ...newSuperuser, username: e.target.value })}
                                                    required
                                                />
                                                <input
                                                    placeholder="Email"
                                                    type="email"
                                                    className="px-5 py-4 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                                    value={newSuperuser.email}
                                                    onChange={(e) => setNewSuperuser({ ...newSuperuser, email: e.target.value })}
                                                    required
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Password"
                                                    className="px-5 py-4 rounded-2xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                                                    value={newSuperuser.password}
                                                    onChange={(e) => setNewSuperuser({ ...newSuperuser, password: e.target.value })}
                                                    required
                                                    minLength={6}
                                                />
                                                <div className="md:col-span-3">
                                                    <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                                                        Deploy New Admin
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="text-left text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-gray-50">
                                                    <th className="pb-4">Entity Details</th>
                                                    <th className="pb-4">Status / Role</th>
                                                    <th className="pb-4">Metadata</th>
                                                    <th className="pb-4 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50/50">
                                                {activeTab === 'users' && users.map((u) => (
                                                    <tr key={u._id} className="group hover:bg-gray-50/50 transition-colors">
                                                        <td className="py-5">
                                                            <div className="font-bold text-gray-900">{u.username}</div>
                                                            <div className="text-xs text-gray-400">{u.email}</div>
                                                        </td>
                                                        <td className="py-5">
                                                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                                u.role === 'hotelOwner' ? 'bg-indigo-100 text-indigo-700' : 'bg-blue-100 text-blue-700'
                                                                }`}>{u.role}</span>
                                                        </td>
                                                        <td className="py-5 text-xs font-medium text-gray-500">Provider: <span className="text-gray-900">{u.authProvider}</span></td>
                                                        <td className="py-5 text-right">
                                                            <button onClick={() => handleDeleteUser(u._id)} className="p-2.5 rounded-xl text-red-400 hover:text-red-700 hover:bg-red-50 transition-all">
                                                                🗑️
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}

                                                {activeTab === 'bookings' && bookings.map((b) => (
                                                    <tr key={b._id} className="group hover:bg-gray-50/50 transition-colors">
                                                        <td className="py-5">
                                                            <div className="font-bold text-gray-900">{b.hotel?.name || 'Deleted Property'}</div>
                                                            <div className="text-xs text-gray-400">Client: {b.user?.username}</div>
                                                        </td>
                                                        <td className="py-5">
                                                            <select
                                                                value={b.status}
                                                                onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                                                                className="text-[10px] font-black border-none bg-blue-50 text-blue-700 rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-blue-100"
                                                            >
                                                                <option value="pending">WAIT</option>
                                                                <option value="confirmed">APPROVE</option>
                                                                <option value="cancelled">DENY</option>
                                                                <option value="completed">DONE</option>
                                                            </select>
                                                        </td>
                                                        <td className="py-5 font-black text-gray-900">₹{b.totalPrice}</td>
                                                        <td className="py-5 text-right">
                                                            <button className="p-2.5 opacity-30 cursor-not-allowed">🛡️</button>
                                                        </td>
                                                    </tr>
                                                ))}

                                                {activeTab === 'hotels' && hotels.map((h) => (
                                                    <tr key={h._id} className="group hover:bg-gray-50/50 transition-colors">
                                                        <td className="py-5">
                                                            <div className="font-bold text-gray-900">{h.name}</div>
                                                            <div className="text-xs text-gray-400">{h.city}</div>
                                                        </td>
                                                        <td className="py-5">
                                                            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[9px] font-black tracking-wider uppercase">PROPERTY</span>
                                                        </td>
                                                        <td className="py-5 text-xs text-gray-500">Owner: <span className="text-gray-900 font-bold">{h.owner?.username}</span></td>
                                                        <td className="py-5 text-right">
                                                            <button className="px-4 py-1.5 rounded-lg text-red-500 hover:bg-red-50 text-xs font-bold transition-all">Revoke</button>
                                                        </td>
                                                    </tr>
                                                ))}

                                                {activeTab === 'hotelOwners' && hotelOwners.map((o) => (
                                                    <tr key={o._id} className="group hover:bg-gray-50/50 transition-colors">
                                                        <td className="py-5">
                                                            <div className="font-bold text-gray-900">{o.username}</div>
                                                            <div className="text-xs text-gray-400">{o.email}</div>
                                                        </td>
                                                        <td className="py-5">
                                                            <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-[9px] font-black tracking-wider uppercase">PARTNER</span>
                                                        </td>
                                                        <td className="py-5 text-xs text-gray-500">Managed: <span className="text-gray-900 font-bold">{o.hotelCount || 0} Hotels</span></td>
                                                        <td className="py-5 text-right">
                                                            <button className="px-4 py-1.5 rounded-lg text-blue-500 hover:bg-blue-50 text-xs font-bold transition-all">Inspect</button>
                                                        </td>
                                                    </tr>
                                                ))}

                                                {activeTab === 'superusers' && superusers.map((s) => (
                                                    <tr key={s._id} className="group hover:bg-gray-50/50 transition-colors">
                                                        <td className="py-5">
                                                            <div className="font-bold text-gray-900">{s.username}</div>
                                                            <div className="text-xs text-gray-400">{s.email}</div>
                                                        </td>
                                                        <td className="py-5">
                                                            <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-[9px] font-black tracking-wider uppercase">SUPERADMIN</span>
                                                        </td>
                                                        <td className="py-5 text-xs text-gray-500">Privileged Session</td>
                                                        <td className="py-5 text-right">
                                                            {s.email !== user.email && <button className="px-4 py-1.5 rounded-lg text-red-500 hover:bg-red-50 text-xs font-bold transition-all">Revoke</button>}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {((activeTab === 'users' && users.length === 0) || (activeTab === 'bookings' && bookings.length === 0)) && !loading && (
                                            <div className="text-center py-20">
                                                <p className="text-gray-400 font-medium">No records found for this criteria.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Global Animation Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            ` }} />
        </div>
    );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { usersAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const { user, isSignedIn, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        image: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (!isSignedIn) {
            navigate('/');
            return;
        }
        if (user) {
            setProfileData({
                username: user.username || '',
                email: user.email || '',
                image: user.image || ''
            });
        }
    }, [user, isSignedIn, navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const formData = new FormData();
            formData.append('username', profileData.username);
            formData.append('email', profileData.email);

            // If image is a File object (from file input), append as file
            // Otherwise append as string (URL)
            if (profileData.image instanceof File) {
                formData.append('image', profileData.image);
            } else {
                formData.append('image', profileData.image);
            }

            const response = await usersAPI.updateProfile(formData);
            updateUser(response.data);
            setSuccess('Profile updated successfully!');
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await usersAPI.updatePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setSuccess('Password updated successfully!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setError(err.message || 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    const profilePictures = [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Bella'
    ];

    return (
        <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 pb-16 min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-playfair text-4xl mb-8">Settings</h1>

                {success && <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">{success}</div>}
                {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Side Navigation */}
                    <div className="lg:col-span-1 space-y-2">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="relative group">
                                    <img
                                        src={profileData.image}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-50 shadow-lg"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{user?.username}</h2>
                                    <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Settings Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Section */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg text-sm">👤</span>
                                Profile Information
                            </h3>
                            <form onSubmit={handleProfileUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                                    <input
                                        type="text"
                                        value={profileData.username}
                                        onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-4">Choose Avatar</label>
                                    <div className="flex flex-wrap gap-4">
                                        {profilePictures.map((pic, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => setProfileData({ ...profileData, image: pic })}
                                                className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all ${profileData.image === pic ? 'border-blue-600 scale-110 shadow-md' : 'border-transparent hover:scale-105'
                                                    }`}
                                            >
                                                <img src={pic} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex flex-col gap-2">
                                        <label className="block text-sm font-semibold text-gray-700">Custom Profile Photo</label>
                                        <div className="flex items-center gap-4">
                                            <label className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group">
                                                <span className="text-xl group-hover:scale-110 transition-transform">📸</span>
                                                <span className="text-sm font-bold text-gray-500 group-hover:text-blue-600">
                                                    {profileData.image instanceof File ? profileData.image.name : 'Choose a photo...'}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) setProfileData({ ...profileData, image: file });
                                                    }}
                                                />
                                            </label>
                                            {profileData.image instanceof File && (
                                                <button
                                                    type="button"
                                                    onClick={() => setProfileData({ ...profileData, image: user.image })}
                                                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Supports JPG, PNG, WEBP (Max 5MB)</p>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Updating...' : 'Save Profile Changes'}
                                </button>
                            </form>
                        </div>

                        {/* Password Section */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="p-2 bg-purple-50 text-purple-600 rounded-lg text-sm">🔒</span>
                                Security & Password
                            </h3>
                            <form onSubmit={handlePasswordUpdate} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                        <input
                                            type="password"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-all disabled:opacity-50"
                                >
                                    {loading ? 'Changing...' : 'Update Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

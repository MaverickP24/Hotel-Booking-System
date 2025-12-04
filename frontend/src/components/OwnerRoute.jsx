import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OwnerRoute = ({ children }) => {
  const { user, loading, openSignIn } = useAuth();
  const navigate = useNavigate();
  const [promptedAuth, setPromptedAuth] = useState(false);

  useEffect(() => {
    if (!loading && !user && !promptedAuth) {
      openSignIn();
      setPromptedAuth(true);
    }
  }, [loading, user, promptedAuth, openSignIn]);

  if (loading) {
    return (
      <div className="pt-28 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-semibold mb-4">Sign in required</h1>
        <p className="text-gray-600 mb-6 max-w-xl">
          Please sign in and choose the &quot;Hotel Owner&quot; account type to access the owner dashboard.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Go back home
        </button>
      </div>
    );
  }

  if (user.role !== 'hotelOwner' && user.role !== 'admin') {
    return (
      <div className="pt-28 px-4 md:px-16 lg:px-24 xl:px-32 min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
        <h1 className="text-3xl font-semibold mb-4">Owner access only</h1>
        <p className="text-gray-600 mb-6 max-w-2xl">
          The hotel owner dashboard is reserved for users who signed up as hotel owners. Please contact support if you believe this is a mistake.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Return to homepage
        </button>
      </div>
    );
  }

  return children;
};

export default OwnerRoute;


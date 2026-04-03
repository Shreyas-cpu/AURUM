import React, { useState } from 'react';
import { User, Bell, Shield, Smartphone } from 'lucide-react';

export default function Settings() {
  const [profile, setProfile] = useState({
    name: 'Operator Prime',
    email: 'op.prime@aurum.gov',
    role: 'Level 4 Dispatcher'
  });

  return (
    <div className="p-8 max-w-4xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">System Preferences</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your terminal profile and interface protocols.</p>
      </div>

      <div className="space-y-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center bg-slate-50">
            <User className="h-5 w-5 text-slate-500 mr-2" />
            <h3 className="font-semibold text-slate-800">Operator Profile</h3>
          </div>
          <div className="p-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Authorization Role</label>
                  <input type="text" value={profile.role} readOnly className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Secure Email</label>
                <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 outline-none transition" />
              </div>
              <div className="pt-2">
                <button type="button" className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition font-medium text-sm">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center bg-slate-50">
            <Bell className="h-5 w-5 text-slate-500 mr-2" />
            <h3 className="font-semibold text-slate-800">Alert Preferences</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-slate-800">Critical Dispatch Sounds</h4>
                <p className="text-xs text-slate-500">Play an audio chime for Level 4+ emergencies.</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-slate-800">Desktop Notifications</h4>
                <p className="text-xs text-slate-500">Show native browser popups.</p>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl border border-rose-200 border-t-4 border-t-rose-500 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-rose-100 flex items-center bg-rose-50">
            <Shield className="h-5 w-5 text-rose-600 mr-2" />
            <h3 className="font-semibold text-rose-800">Station Security</h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 mb-4">Change your terminal passcode. Requires biometric verification.</p>
            <button className="px-4 py-2 border border-rose-300 text-rose-700 bg-white rounded-lg hover:bg-rose-50 transition font-medium text-sm">
              Reset Passcode
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Trash2, Plus, LogOut, Image as ImageIcon } from 'lucide-react';

const AdminPanel = () => {
  const { unrealPhotos, unityPhotos, addPhoto, removePhoto } = usePortfolio();
  const [newUnrealUrl, setNewUnrealUrl] = useState('');
  const [newUnityUrl, setNewUnityUrl] = useState('');
  const [activeTab, setActiveTab] = useState('unreal');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple default password
      setIsAuthenticated(true);
    } else {
      alert('Invalid Password');
    }
  };

  const handleAdd = (engine) => {
    const url = engine === 'unreal' ? newUnrealUrl : newUnityUrl;
    if (url) {
      addPhoto(engine, url);
      engine === 'unreal' ? setNewUnrealUrl('') : setNewUnityUrl('');
    }
  };

  const handleLogout = () => {
    window.location.hash = '';
    window.location.reload();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/[0.02] border border-white/10 p-12 rounded-sm backdrop-blur-xl"
        >
          <h2 className="text-2xl font-black uppercase tracking-[10px] mb-8 text-center">Security <span className="text-accent-red">Check</span></h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="System Access Key" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 py-4 px-6 focus:outline-none focus:border-accent-red transition-all text-center tracking-[10px]"
            />
            <button className="w-full py-4 bg-accent-red text-white font-black uppercase tracking-[5px] text-[10px] hover:bg-accent-red/80 transition-all">
              Initialize Access
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-[10px] mb-2">Admin <span className="text-accent-red">Panel</span></h1>
            <p className="text-white/40 text-xs tracking-[4px] uppercase font-bold">System Configuration & Asset Management</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-accent-red/20 border border-white/10 hover:border-accent-red transition-all duration-300 rounded-sm text-[10px] uppercase tracking-[4px] font-bold"
          >
            <LogOut size={16} /> Exit System
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('unreal')}
            className={`px-8 py-4 rounded-sm text-[10px] uppercase tracking-[4px] font-black transition-all duration-500 border ${activeTab === 'unreal' ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'}`}
          >
            Unreal Engine
          </button>
          <button 
            onClick={() => setActiveTab('unity')}
            className={`px-8 py-4 rounded-sm text-[10px] uppercase tracking-[4px] font-black transition-all duration-500 border ${activeTab === 'unity' ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'}`}
          >
            Unity Engine
          </button>
        </div>

        {/* Content */}
        <div className="bg-white/[0.02] border border-white/5 p-8 backdrop-blur-xl rounded-sm">
          <div className="mb-8">
            <h2 className="text-xl font-bold uppercase tracking-[6px] mb-6 flex items-center gap-3">
              <Plus className="text-accent-red" size={20} /> Add New Asset
            </h2>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="text" 
                  placeholder="Enter Image URL (e.g. /images/new-project.jpg)" 
                  value={activeTab === 'unreal' ? newUnrealUrl : newUnityUrl}
                  onChange={(e) => activeTab === 'unreal' ? setNewUnrealUrl(e.target.value) : setNewUnityUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 focus:outline-none focus:border-accent-red transition-colors text-sm"
                />
              </div>
              <button 
                onClick={() => handleAdd(activeTab)}
                className="px-10 py-4 bg-accent-red text-white font-black uppercase tracking-[4px] text-[10px] hover:bg-accent-red/80 transition-all active:scale-95"
              >
                Upload
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(activeTab === 'unreal' ? unrealPhotos : unityPhotos).map((photo, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group aspect-video bg-white/5 border border-white/10 overflow-hidden"
              >
                <img src={photo} alt="Asset" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => removePhoto(activeTab, i)}
                    className="p-4 bg-red-600 rounded-full hover:bg-red-500 transition-colors transform hover:scale-110"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="absolute top-4 left-4 text-[8px] tracking-[4px] uppercase font-bold text-white/40">
                  {activeTab}.asset_{i+1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Button } from '../../../components/ui/Button';

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    logoUrl: '',
    companyName: '',
    brandName: '',
    tagline: '',
    contactNumber: '',
    whatsappNumber: '',
    emailAddress: '',
    businessAddress: '',
    googleMapsEmbed: '',
    businessHours: '',
    gstin: '',
    socialFacebook: '',
    socialInstagram: '',
    socialLinkedIn: '',
    socialYoutube: '',
    socialX: '',
    themeColorPrimary: '#059669', // Emerald 600 default
    heroText: '',
    footerContent: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    googleAnalyticsId: '',
    facebookPixelId: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'site');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1048576) { // 1MB limit for Firestore document size
        alert("Image must be smaller than 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSettings(prev => ({ ...prev, logoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'site'), {
        ...settings,
        updatedAt: Date.now()
      }, { merge: true });
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your website's global configuration.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Branding & Logo</h2>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-32 h-32 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden relative group shrink-0">
              {settings.logoUrl ? (
                <img src={settings.logoUrl} alt="Logo Preview" className="w-full h-full object-contain p-2" />
              ) : (
                <div className="text-slate-400 flex flex-col items-center">
                  <span className="text-xs font-medium text-center px-2">No Logo<br/>Uploaded</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="cursor-pointer text-white text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700">
                  Change
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>
            <div className="space-y-3 flex-grow">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">Upload New Logo</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer" />
              </div>
              <p className="text-xs text-slate-500">Supported formats: PNG, JPG, SVG, WEBP. Max size: 1MB.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
              <input type="text" name="companyName" value={settings.companyName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Brand Name</label>
              <input type="text" name="brandName" value={settings.brandName} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
              <input type="text" name="tagline" value={settings.tagline} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
              <input type="text" name="contactNumber" value={settings.contactNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label>
              <input type="text" name="whatsappNumber" value={settings.whatsappNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input type="email" name="emailAddress" value={settings.emailAddress} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GSTIN</label>
              <input type="text" name="gstin" value={settings.gstin} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Business Address</label>
              <textarea name="businessAddress" value={settings.businessAddress} onChange={handleChange} rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">SEO & Analytics</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Meta Title</label>
              <input type="text" name="seoTitle" value={settings.seoTitle} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
              <textarea name="seoDescription" value={settings.seoDescription} onChange={handleChange} rows={2} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={saving} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
}

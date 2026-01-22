// src/pages/Transfer/components/TransferForm.jsx

import React, { useState } from 'react';
import { Send, Star, Bookmark } from 'lucide-react';

const TransferForm = ({ onSubmit, favorites = [], templates = [], scheduled = [] }) => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    accountName: '',
    bank: '',
    amount: '',
    message: '',
    templateId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFavoriteSelect = (e) => {
    const value = e.target.value;
    if (!value) return;
    const fav = favorites.find((f) => f.id === value);
    if (fav) {
      setFormData((prev) => ({
        ...prev,
        accountNumber: fav.noRekening,
        accountName: fav.nama,
        bank: fav.bank,
      }));
    }
  };

  const handleTemplateSelect = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, templateId: value }));
    const tpl = templates.find((t) => t.id === value);
    if (tpl) {
      setFormData({
        accountNumber: tpl.recipientAccount,
        accountName: tpl.recipientName,
        bank: tpl.bank,
        amount: tpl.amount.toString(),
        message: tpl.note,
        templateId: tpl.id,
      });
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Send className="text-blue-500" />
            Transfer Uang
          </h2>
          <p className="text-sm text-gray-500">Pilih rekening favorit atau template</p>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rekening Favorit</label>
            <select
              onChange={handleFavoriteSelect}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Pilih dari favorit</option>
              {favorites.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.nama} - {acc.noRekening} ({acc.bank})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Template Transfer</label>
            <select
              value={formData.templateId}
              onChange={handleTemplateSelect}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Pilih template</option>
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.name} - {tpl.recipientName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Penerima <span className="text-red-500">*</span>
            </label>
            <input
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="Nama pemilik rekening"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank <span className="text-red-500">*</span>
            </label>
            <input
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              placeholder="Contoh: BCA"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nomor Rekening <span className="text-red-500">*</span>
            </label>
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Masukkan nomor rekening"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nominal Transfer <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Minimal Rp 1.000"
              min="1000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Minimal transfer Rp 1.000</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Catatan (Opsional)</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tambahkan catatan transfer"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {scheduled.length > 0 && (
          <div className="border border-dashed border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <Bookmark size={16} /> Jadwal Transfer (simulasi)
            </div>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
              {scheduled.slice(0, 4).map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                  <div className="font-semibold text-gray-800 text-base">{item.name}</div>
                  <p className="text-sm">{item.recipientName} • {item.bank}</p>
                  <p className="text-sm text-gray-500">{item.frequency === 'weekly' ? 'Mingguan' : 'Bulanan'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center justify-center gap-2"
        >
          <Send size={20} />
          Transfer Sekarang
        </button>
      </div>
    </div>
  );
};

export default TransferForm;
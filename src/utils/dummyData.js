// src/utils/dummyData.js

// ============================================
// USER DATA
// ============================================

// Dummy user untuk login
export const dummyUser = {
  email: "admintransaksiku@gmail.com",
  password: "123456",
  name: "Daffa Afaf Firmansyah",
  saldo: 15000000,
  accountNumber: "1234567890",
};

// ============================================
// DUMMY DATA REQUIREMENTS - 50+ TRANSACTIONS
// ============================================

// Fungsi helper untuk generate tanggal
const generateDateDaysAgo = (daysAgo, hours = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hours);
  return date.toISOString();
};

// Status transaksi yang mungkin
const statusTypes = ['Berhasil', 'Pending', 'Gagal', 'Dibatalkan'];

// Minimal 50 transaksi dengan berbagai status dan tanggal
export const transactions = [
  // Hari ini - 8 transaksi
  { id: 'TRX001', tanggal: generateDateDaysAgo(0, 1), tujuan: 'Budi Santoso', noRekening: '1234567891', bank: 'BCA', nominal: 500000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar utang' },
  { id: 'TRX002', tanggal: generateDateDaysAgo(0, 2), tujuan: 'Helga Lorenza', noRekening: '1234567892', bank: 'Mandiri', nominal: 2000000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Transfer pulsa' },
  { id: 'TRX003', tanggal: generateDateDaysAgo(0, 3), tujuan: 'Dompet Digital', noRekening: '0812345678', bank: 'GoPay', nominal: 1000000, kategori: 'Top Up', tipe: 'incoming', status: 'Berhasil', catatan: 'Top up saldo' },
  { id: 'TRX004', tanggal: generateDateDaysAgo(0, 4), tujuan: 'PLN', noRekening: '521234567890', bank: 'PLN', nominal: 150000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar listrik' },
  { id: 'TRX005', tanggal: generateDateDaysAgo(0, 5), tujuan: 'Ahmad Fauzi', noRekening: '1234567893', bank: 'BNI', nominal: 5000000, kategori: 'Transfer', tipe: 'outgoing', status: 'Pending', catatan: 'Biaya kuliah' },
  { id: 'TRX006', tanggal: generateDateDaysAgo(0, 6), tujuan: 'Rina Wijaya', noRekening: '1234567894', bank: 'BRI', nominal: 250000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Transfer dana' },
  { id: 'TRX007', tanggal: generateDateDaysAgo(0, 7), tujuan: 'Uciha Bahlil', noRekening: '1234567895', bank: 'BCA', nominal: 300000, kategori: 'Transfer', tipe: 'outgoing', status: 'Gagal', catatan: 'Saldo tidak cukup' },
  { id: 'TRX008', tanggal: generateDateDaysAgo(0, 8), tujuan: 'Cashback Promo', noRekening: '1234567890', bank: 'BCA', nominal: 500000, kategori: 'Top Up', tipe: 'incoming', status: 'Berhasil', catatan: 'Cashback belanja' },

  // 1 hari yang lalu - 7 transaksi
  { id: 'TRX009', tanggal: generateDateDaysAgo(1, 1), tujuan: 'Gaji Bulanan', noRekening: '1234567890', bank: 'BCA', nominal: 8000000, kategori: 'Top Up', tipe: 'incoming', status: 'Berhasil', catatan: 'Gaji bulan Januari' },
  { id: 'TRX010', tanggal: generateDateDaysAgo(1, 2), tujuan: 'Shopee', noRekening: '089876543210', bank: 'ShopeePay', nominal: 300000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Belanja online' },
  { id: 'TRX011', tanggal: generateDateDaysAgo(1, 3), tujuan: 'Fajar Nugroho', noRekening: '1234567896', bank: 'Mandiri', nominal: 450000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar arisan' },
  { id: 'TRX012', tanggal: generateDateDaysAgo(1, 4), tujuan: 'PDAM', noRekening: '621234567890', bank: 'PDAM', nominal: 100000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar air' },
  { id: 'TRX013', tanggal: generateDateDaysAgo(1, 5), tujuan: 'Indah Permata', noRekening: '1234567897', bank: 'BRI', nominal: 600000, kategori: 'Transfer', tipe: 'outgoing', status: 'Dibatalkan', catatan: 'Transfer dibatalkan' },
  { id: 'TRX014', tanggal: generateDateDaysAgo(1, 6), tujuan: 'Netflix', noRekening: 'netflix@email.com', bank: 'Credit Card', nominal: 186000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Langganan Premium' },
  { id: 'TRX015', tanggal: generateDateDaysAgo(1, 7), tujuan: 'Rudi Hartono', noRekening: '1234567898', bank: 'BCA', nominal: 850000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar sewa kos' },

  // 2 hari yang lalu - 6 transaksi
  { id: 'TRX016', tanggal: generateDateDaysAgo(2, 1), tujuan: 'Tokopedia', noRekening: '088765432109', bank: 'OVO', nominal: 450000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Beli elektronik' },
  { id: 'TRX017', tanggal: generateDateDaysAgo(2, 2), tujuan: 'Refund Tokopedia', noRekening: '1234567890', bank: 'BCA', nominal: 500000, kategori: 'Top Up', tipe: 'incoming', status: 'Berhasil', catatan: 'Refund barang' },
  { id: 'TRX018', tanggal: generateDateDaysAgo(2, 3), tujuan: 'Andi Saputra', noRekening: '1234567899', bank: 'Mandiri', nominal: 1200000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar laptop' },
  { id: 'TRX019', tanggal: generateDateDaysAgo(2, 4), tujuan: 'Maya Sari', noRekening: '1234567800', bank: 'BNI', nominal: 350000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar buku' },
  { id: 'TRX020', tanggal: generateDateDaysAgo(2, 5), tujuan: 'Telkom', noRekening: '1081234567890', bank: 'Telkom', nominal: 350000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar internet' },
  { id: 'TRX021', tanggal: generateDateDaysAgo(2, 6), tujuan: 'Bonus Referral', noRekening: '1234567890', bank: 'BCA', nominal: 700000, kategori: 'Top Up', tipe: 'incoming', status: 'Berhasil', catatan: 'Bonus ajak teman' },

  // 3 hari yang lalu - 5 transaksi
  { id: 'TRX022', tanggal: generateDateDaysAgo(3, 1), tujuan: 'Bukalapak', noRekening: '087654321098', bank: 'Dana', nominal: 275000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Belanja fashion' },
  { id: 'TRX023', tanggal: generateDateDaysAgo(3, 2), tujuan: 'Hendra Wijaya', noRekening: '1234567801', bank: 'BRI', nominal: 500000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar utang' },
  { id: 'TRX024', tanggal: generateDateDaysAgo(3, 3), tujuan: 'Lazada', noRekening: '086543210987', bank: 'LinkAja', nominal: 650000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Pending', catatan: 'Order elektronik' },
  { id: 'TRX025', tanggal: generateDateDaysAgo(3, 4), tujuan: 'Sinta Dewi', noRekening: '1234567802', bank: 'Mandiri', nominal: 900000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar jasa desain' },
  { id: 'TRX026', tanggal: generateDateDaysAgo(3, 5), tujuan: 'Spotify', noRekening: 'spotify@email.com', bank: 'Credit Card', nominal: 55000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Langganan Premium' },

  // 4-7 hari yang lalu - 24 transaksi
  { id: 'TRX027', tanggal: generateDateDaysAgo(4, 1), tujuan: 'Toni Suryanto', noRekening: '1234567803', bank: 'BCA', nominal: 750000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar proyek' },
  { id: 'TRX028', tanggal: generateDateDaysAgo(4, 2), tujuan: 'YouTube Premium', noRekening: 'youtube@email.com', bank: 'Credit Card', nominal: 59000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Langganan bulanan' },
  { id: 'TRX029', tanggal: generateDateDaysAgo(4, 3), tujuan: 'Nita Puspita', noRekening: '1234567804', bank: 'BNI', nominal: 425000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar katering' },
  { id: 'TRX030', tanggal: generateDateDaysAgo(4, 4), tujuan: 'GrabFood', noRekening: '085432109876', bank: 'GoPay', nominal: 125000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Pesan makanan' },
  
  { id: 'TRX031', tanggal: generateDateDaysAgo(5, 1), tujuan: 'Transfer Masuk', noRekening: '1234567890', bank: 'BCA', nominal: 2000000, kategori: 'Top Up', tipe: 'incoming', status: 'Berhasil', catatan: 'Transfer dari Ayah' },
  { id: 'TRX032', tanggal: generateDateDaysAgo(5, 2), tujuan: 'Budi Santoso', noRekening: '1234567891', bank: 'BCA', nominal: 350000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Patungan hadiah' },
  { id: 'TRX033', tanggal: generateDateDaysAgo(5, 3), tujuan: 'Blibli', noRekening: '084321098765', bank: 'DANA', nominal: 890000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Beli gadget' },
  { id: 'TRX034', tanggal: generateDateDaysAgo(5, 4), tujuan: 'Dian Purnama', noRekening: '1234567805', bank: 'Mandiri', nominal: 550000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar freelance' },
  
  { id: 'TRX035', tanggal: generateDateDaysAgo(6, 1), tujuan: 'Cashback Shopee', noRekening: '1234567890', bank: 'BCA', nominal: 800000, kategori: 'Top Up', tipe: 'incoming', status: 'Berhasil', catatan: 'Cashback belanja' },
  { id: 'TRX036', tanggal: generateDateDaysAgo(6, 2), tujuan: 'Gojek', noRekening: '083210987654', bank: 'GoPay', nominal: 85000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Naik Gojek' },
  { id: 'TRX037', tanggal: generateDateDaysAgo(6, 3), tujuan: 'Eko Prasetyo', noRekening: '1234567806', bank: 'BRI', nominal: 650000, kategori: 'Transfer', tipe: 'outgoing', status: 'Gagal', catatan: 'Rekening tidak aktif' },
  { id: 'TRX038', tanggal: generateDateDaysAgo(6, 4), tujuan: 'Indomaret', noRekening: '082109876543', bank: 'OVO', nominal: 145000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Belanja bulanan' },
  
  { id: 'TRX039', tanggal: generateDateDaysAgo(7, 1), tujuan: 'Rina Wijaya', noRekening: '1234567894', bank: 'BRI', nominal: 700000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar kursus' },
  { id: 'TRX040', tanggal: generateDateDaysAgo(7, 2), tujuan: 'Alfamart', noRekening: '081098765432', bank: 'DANA', nominal: 95000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Belanja harian' },
  { id: 'TRX041', tanggal: generateDateDaysAgo(7, 3), tujuan: 'Budi Santoso', noRekening: '1234567891', bank: 'BCA', nominal: 550000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Cicilan motor' },
  { id: 'TRX042', tanggal: generateDateDaysAgo(7, 4), tujuan: 'Bonus Kinerja', noRekening: '1234567890', bank: 'BCA', nominal: 1500000, kategori: 'Top Up', tipe: 'incoming', status: 'Berhasil', catatan: 'Bonus pekerjaan' },
  
  // 8-14 hari yang lalu - 8 transaksi
  { id: 'TRX043', tanggal: generateDateDaysAgo(8, 1), tujuan: 'Ahmad Fauzi', noRekening: '1234567893', bank: 'BNI', nominal: 900000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar jasa konsultan' },
  { id: 'TRX044', tanggal: generateDateDaysAgo(9, 1), tujuan: 'Helga Lorenza', noRekening: '1234567892', bank: 'Mandiri', nominal: 400000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Transfer rutin' },
  { id: 'TRX045', tanggal: generateDateDaysAgo(10, 1), tujuan: 'Budi Santoso', noRekening: '1234567891', bank: 'BCA', nominal: 600000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Bayar supplier' },
  { id: 'TRX046', tanggal: generateDateDaysAgo(11, 1), tujuan: 'PLN', noRekening: '521234567890', bank: 'PLN', nominal: 200000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Token listrik' },
  { id: 'TRX047', tanggal: generateDateDaysAgo(12, 1), tujuan: 'Rina Wijaya', noRekening: '1234567894', bank: 'BRI', nominal: 850000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Investasi bisnis' },
  { id: 'TRX048', tanggal: generateDateDaysAgo(13, 1), tujuan: 'Spotify', noRekening: 'spotify@email.com', bank: 'Credit Card', nominal: 55000, kategori: 'Pembayaran', tipe: 'outgoing', status: 'Berhasil', catatan: 'Langganan musik' },
  { id: 'TRX049', tanggal: generateDateDaysAgo(14, 1), tujuan: 'Ahmad Fauzi', noRekening: '1234567893', bank: 'BNI', nominal: 1200000, kategori: 'Transfer', tipe: 'outgoing', status: 'Berhasil', catatan: 'Pembelian aset' },
  { id: 'TRX050', tanggal: generateDateDaysAgo(14, 2), tujuan: 'Cashback Promo', noRekening: '1234567890', bank: 'BCA', nominal: 1200000, kategori: 'Top Up', tipe: 'incoming', status: 'Berhasil', catatan: 'Promo spesial' },
];

// Legacy support - untuk komponen yang masih menggunakan transaksiList
export const transaksiList = transactions.slice(0, 10).map(t => ({
  id: t.id,
  tanggal: t.tanggal.split('T')[0],
  tujuan: t.tujuan,
  nominal: t.nominal,
  catatan: t.catatan,
  status: t.status,
}));

// ============================================
// DUMMY DATA REQUIREMENTS - 20+ SAVED ACCOUNTS
// ============================================

// Minimal 20 rekening tersimpan dengan berbagai bank
export const savedAccounts = [
  { id: 'ACC001', nama: 'Budi Santoso', noRekening: '1234567891', bank: 'BCA', favorite: true, lastUsed: generateDateDaysAgo(0) },
  { id: 'ACC002', nama: 'Helga Lorenza', noRekening: '1234567892', bank: 'Mandiri', favorite: true, lastUsed: generateDateDaysAgo(0) },
  { id: 'ACC003', nama: 'Ahmad Fauzi', noRekening: '1234567893', bank: 'BNI', favorite: true, lastUsed: generateDateDaysAgo(0) },
  { id: 'ACC005', nama: 'Uciha Bahlil', noRekening: '1234567895', bank: 'BCA', favorite: false, lastUsed: generateDateDaysAgo(1) },
  { id: 'ACC006', nama: 'Fajar Nugroho', noRekening: '1234567896', bank: 'Mandiri', favorite: false, lastUsed: generateDateDaysAgo(2) },
  { id: 'ACC007', nama: 'Indah Permata', noRekening: '1234567897', bank: 'BRI', favorite: false, lastUsed: generateDateDaysAgo(2) },
  { id: 'ACC008', nama: 'Rudi Hartono', noRekening: '1234567898', bank: 'BCA', favorite: true, lastUsed: generateDateDaysAgo(3) },
  { id: 'ACC009', nama: 'Andi Saputra', noRekening: '1234567899', bank: 'Mandiri', favorite: false, lastUsed: generateDateDaysAgo(3) },
  { id: 'ACC010', nama: 'Maya Sari', noRekening: '1234567800', bank: 'BNI', favorite: false, lastUsed: generateDateDaysAgo(4) },
  { id: 'ACC011', nama: 'Hendra Wijaya', noRekening: '1234567801', bank: 'BRI', favorite: false, lastUsed: generateDateDaysAgo(4) },
  { id: 'ACC012', nama: 'Sinta Dewi', noRekening: '1234567802', bank: 'Mandiri', favorite: false, lastUsed: generateDateDaysAgo(5) },
  { id: 'ACC013', nama: 'Toni Suryanto', noRekening: '1234567803', bank: 'BCA', favorite: false, lastUsed: generateDateDaysAgo(5) },
  { id: 'ACC014', nama: 'Nita Puspita', noRekening: '1234567804', bank: 'BNI', favorite: false, lastUsed: generateDateDaysAgo(6) },
  { id: 'ACC015', nama: 'Dian Purnama', noRekening: '1234567805', bank: 'Mandiri', favorite: false, lastUsed: generateDateDaysAgo(6) },
  { id: 'ACC016', nama: 'Eko Prasetyo', noRekening: '1234567806', bank: 'BRI', favorite: false, lastUsed: generateDateDaysAgo(7) },
  { id: 'ACC017', nama: 'Wati Rahayu', noRekening: '1234567807', bank: 'BCA', favorite: false, lastUsed: generateDateDaysAgo(8) },
  { id: 'ACC018', nama: 'Joni Iskandar', noRekening: '1234567808', bank: 'BNI', favorite: false, lastUsed: generateDateDaysAgo(9) },
  { id: 'ACC019', nama: 'Linda Kusuma', noRekening: '1234567809', bank: 'Mandiri', favorite: false, lastUsed: generateDateDaysAgo(10) },
  { id: 'ACC020', nama: 'Rudi Tabuti', noRekening: '1234567810', bank: 'BRI', favorite: false, lastUsed: generateDateDaysAgo(11) },
  { id: 'ACC021', nama: 'Ani Yudhoyono', noRekening: '1234567811', bank: 'BCA', favorite: false, lastUsed: generateDateDaysAgo(12) },
  { id: 'ACC022', nama: 'Bambang Pamungkas', noRekening: '1234567812', bank: 'Mandiri', favorite: false, lastUsed: generateDateDaysAgo(13) },
  { id: 'ACC023', nama: 'Citra Kirana', noRekening: '1234567813', bank: 'BNI', favorite: false, lastUsed: generateDateDaysAgo(14) },
];

// Legacy support - untuk komponen yang masih menggunakan mahasiswaList
export const mahasiswaList = savedAccounts.slice(0, 10).map((acc, idx) => ({
  nim: `202110${String(idx + 1).padStart(2, '0')}`,
  nama: acc.nama,
}));

// ============================================
// DUMMY DATA REQUIREMENTS - DASHBOARD STATS
// ============================================

// Data statistik untuk dashboard (computed dari transactions)
export const dashboardStats = {
  totalSaldo: 2500000,
  totalTransaksi: transactions.length,
  transaksiHariIni: transactions.filter(t => {
    const today = new Date();
    const txDate = new Date(t.tanggal);
    return txDate.toDateString() === today.toDateString();
  }).length,
  transaksiMingguIni: transactions.filter(t => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const txDate = new Date(t.tanggal);
    return txDate >= weekAgo;
  }).length,
  totalIncoming: transactions
    .filter(t => t.tipe === 'incoming' && t.status === 'Berhasil')
    .reduce((sum, t) => sum + t.nominal, 0),
  totalOutgoing: transactions
    .filter(t => t.tipe === 'outgoing' && t.status === 'Berhasil')
    .reduce((sum, t) => sum + t.nominal, 0),
  transaksiPending: transactions.filter(t => t.status === 'Pending').length,
  transaksiGagal: transactions.filter(t => t.status === 'Gagal').length,
  transaksiBerhasil: transactions.filter(t => t.status === 'Berhasil').length,
  transaksiDibatalkan: transactions.filter(t => t.status === 'Dibatalkan').length,
  kategoriBreakdown: {
    transfer: transactions.filter(t => t.kategori === 'Transfer').length,
    topUp: transactions.filter(t => t.kategori === 'Top Up').length,
    pembayaran: transactions.filter(t => t.kategori === 'Pembayaran').length,
  },
  bankBreakdown: {
    bca: transactions.filter(t => t.bank === 'BCA').length,
    mandiri: transactions.filter(t => t.bank === 'Mandiri').length,
    bni: transactions.filter(t => t.bank === 'BNI').length,
    bri: transactions.filter(t => t.bank === 'BRI').length,
    others: transactions.filter(t => !['BCA', 'Mandiri', 'BNI', 'BRI'].includes(t.bank)).length,
  },
  lastUpdated: new Date().toISOString(),
};

// ============================================
// DUMMY DATA REQUIREMENTS - TRANSFER TEMPLATES
// ============================================

// Template transfer untuk transaksi cepat
export const transferTemplates = [
  {
    id: 'TPL001',
    name: 'Bayar Kos Bulanan',
    description: 'Transfer rutin untuk pembayaran kos',
    recipientName: 'Rudi Hartono',
    recipientAccount: '1234567898',
    bank: 'BCA',
    amount: 850000,
    note: 'Bayar sewa kos',
    category: 'Transfer',
    frequency: 'monthly', // monthly, weekly, once
    icon: '🏠',
    isActive: true,
  },
  {
    id: 'TPL002',
    name: 'Uang Jajan Adik',
    description: 'Transfer mingguan untuk adik',
    recipientName: 'Helga Lorenza',
    recipientAccount: '1234567892',
    bank: 'BCA',
    amount: 250000,
    note: 'Uang jajan mingguan',
    category: 'Transfer',
    frequency: 'weekly',
    icon: '👨‍👩‍👧',
    isActive: true,
  },
  {
    id: 'TPL003',
    name: 'Cicilan Motor',
    description: 'Pembayaran cicilan motor bulanan',
    recipientName: 'Budi Santoso',
    recipientAccount: '1234567891',
    bank: 'BCA',
    amount: 550000,
    note: 'Cicilan motor',
    category: 'Transfer',
    frequency: 'monthly',
    icon: '🏍️',
    isActive: true,
  },
  {
    id: 'TPL004',
    name: 'Bayar Kursus',
    description: 'Pembayaran kursus programming',
    recipientName: 'Rina Wijaya',
    recipientAccount: '1234567894',
    bank: 'BRI',
    amount: 700000,
    note: 'Bayar kursus',
    category: 'Transfer',
    frequency: 'monthly',
    icon: '📚',
    isActive: true,
  },
  {
    id: 'TPL005',
    name: 'Listrik Bulanan',
    description: 'Token listrik bulanan',
    recipientName: 'PLN',
    recipientAccount: '521234567890',
    bank: 'PLN',
    amount: 200000,
    note: 'Token listrik',
    category: 'Pembayaran',
    frequency: 'monthly',
    icon: '⚡',
    isActive: true,
  },
  {
    id: 'TPL006',
    name: 'Internet Bulanan',
    description: 'Bayar internet rumah',
    recipientName: 'Telkom',
    recipientAccount: '1081234567890',
    bank: 'Telkom',
    amount: 350000,
    note: 'Bayar internet',
    category: 'Pembayaran',
    frequency: 'monthly',
    icon: '🌐',
    isActive: true,
  },
  {
    id: 'TPL007',
    name: 'Netflix Premium',
    description: 'Langganan Netflix',
    recipientName: 'Netflix',
    recipientAccount: 'netflix@email.com',
    bank: 'Credit Card',
    amount: 186000,
    note: 'Langganan Premium',
    category: 'Pembayaran',
    frequency: 'monthly',
    icon: '📺',
    isActive: true,
  },
  {
    id: 'TPL008',
    name: 'Spotify Premium',
    description: 'Langganan musik Spotify',
    recipientName: 'Spotify',
    recipientAccount: 'spotify@email.com',
    bank: 'Credit Card',
    amount: 55000,
    note: 'Langganan Premium',
    category: 'Pembayaran',
    frequency: 'monthly',
    icon: '🎵',
    isActive: true,
  },
  {
    id: 'TPL009',
    name: 'Investasi Bisnis',
    description: 'Transfer investasi rutin',
    recipientName: 'Rina Wijaya',
    recipientAccount: '1234567894',
    bank: 'BRI',
    amount: 850000,
    note: 'Investasi bisnis',
    category: 'Transfer',
    frequency: 'monthly',
    icon: '💼',
    isActive: false,
  },
  {
    id: 'TPL010',
    name: 'Patungan Arisan',
    description: 'Iuran arisan keluarga',
    recipientName: 'Fajar Nugroho',
    recipientAccount: '1234567896',
    bank: 'Mandiri',
    amount: 450000,
    note: 'Bayar arisan',
    category: 'Transfer',
    frequency: 'monthly',
    icon: '🎰',
    isActive: true,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Helper function untuk format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Helper function untuk format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Helper function untuk format date short
export const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

// Helper function untuk generate random transaction ID
export const generateTransactionId = () => {
  const prefix = 'TRX';
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}${timestamp}${random}`;
};

// ============================================
// ANALYTICS & DASHBOARD FUNCTIONS
// ============================================

// Legacy support untuk analyticsTransactions (masih digunakan di dashboard lama)
export const analyticsTransactions = transactions;

// Data statistik dashboard (dihitung dari transaksi)
export const getDashboardStats = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Transaksi hari ini
  const todayTransactions = transactions.filter(t => {
    const txDate = new Date(t.tanggal);
    txDate.setHours(0, 0, 0, 0);
    return txDate.getTime() === today.getTime();
  });
  
  // Total incoming vs outgoing (hanya yang berhasil)
  const incomingTotal = transactions
    .filter(t => t.tipe === 'incoming' && t.status === 'Berhasil')
    .reduce((sum, t) => sum + t.nominal, 0);
  
  const outgoingTotal = transactions
    .filter(t => t.tipe === 'outgoing' && t.status === 'Berhasil')
    .reduce((sum, t) => sum + t.nominal, 0);
  
  // Hitung saldo (saldo awal + incoming - outgoing)
  const saldoAwal = 15000000;
  const totalSaldo = saldoAwal + incomingTotal - outgoingTotal;
  
  return {
    totalSaldo,
    transaksiHariIni: todayTransactions.length,
    incomingCount: transactions.filter(t => t.tipe === 'incoming' && t.status === 'Berhasil').length,
    outgoingCount: transactions.filter(t => t.tipe === 'outgoing' && t.status === 'Berhasil').length,
    incomingTotal,
    outgoingTotal,
    pendingCount: transactions.filter(t => t.status === 'Pending').length,
    gagalCount: transactions.filter(t => t.status === 'Gagal').length,
  };
};

// Data untuk grafik transaksi 7 hari terakhir
export const getTransaksi7Hari = () => {
  const last7Days = [];
  
  for (let i = 6; i >= 0; i--) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - i);
    targetDate.setHours(0, 0, 0, 0);
    
    const dayTransactions = transactions.filter(t => {
      const txDate = new Date(t.tanggal);
      txDate.setHours(0, 0, 0, 0);
      return txDate.getTime() === targetDate.getTime() && t.status === 'Berhasil';
    });
    
    const incoming = dayTransactions
      .filter(t => t.tipe === 'incoming')
      .reduce((sum, t) => sum + t.nominal, 0);
    
    const outgoing = dayTransactions
      .filter(t => t.tipe === 'outgoing')
      .reduce((sum, t) => sum + t.nominal, 0);
    
    // Format tanggal untuk display
    const dayName = targetDate.toLocaleDateString('id-ID', { weekday: 'short' });
    
    last7Days.push({
      tanggal: dayName,
      incoming: incoming / 1000000, // Konversi ke juta
      outgoing: outgoing / 1000000,
      total: (incoming + outgoing) / 1000000,
      count: dayTransactions.length,
    });
  }
  
  return last7Days;
};

// Top 5 rekening tujuan (berdasarkan jumlah nominal)
export const getTop5Rekening = () => {
  const rekeningMap = {};
  
  // Aggregate transaksi per rekening
  transactions
    .filter(t => t.tipe === 'outgoing' && t.kategori === 'Transfer' && t.status === 'Berhasil')
    .forEach(t => {
      if (rekeningMap[t.tujuan]) {
        rekeningMap[t.tujuan].total += t.nominal;
        rekeningMap[t.tujuan].count += 1;
      } else {
        rekeningMap[t.tujuan] = {
          total: t.nominal,
          count: 1,
          bank: t.bank,
        };
      }
    });
  
  // Convert to array dan sort
  const sortedRekening = Object.entries(rekeningMap)
    .map(([nama, data]) => ({ 
      nama, 
      total: data.total / 1000000, // Konversi ke juta
      count: data.count,
      bank: data.bank,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
  
  return sortedRekening;
};

// Data untuk Pie Chart kategori transaksi
export const getKategoriTransaksi = () => {
  const kategoriMap = {
    'Transfer': 0,
    'Top Up': 0,
    'Pembayaran': 0,
  };
  
  transactions
    .filter(t => t.status === 'Berhasil')
    .forEach(t => {
      kategoriMap[t.kategori] += t.nominal;
    });
  
  return Object.entries(kategoriMap).map(([name, value]) => ({
    name,
    value: value / 1000000, // Konversi ke juta
    count: transactions.filter(t => t.kategori === name && t.status === 'Berhasil').length,
    percentage: (value / Object.values(kategoriMap).reduce((a, b) => a + b, 0) * 100).toFixed(1),
  }));
};

// Get transaksi by status
export const getTransaksiByStatus = (status) => {
  return transactions.filter(t => t.status === status);
};

// Get transaksi by kategori
export const getTransaksiByKategori = (kategori) => {
  return transactions.filter(t => t.kategori === kategori);
};

// Get transaksi by date range
export const getTransaksiByDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return transactions.filter(t => {
    const txDate = new Date(t.tanggal);
    return txDate >= start && txDate <= end;
  });
};

// Get favorite accounts
export const getFavoriteAccounts = () => {
  return savedAccounts.filter(acc => acc.favorite);
};

// Get recently used accounts
export const getRecentlyUsedAccounts = (limit = 5) => {
  return savedAccounts
    .sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed))
    .slice(0, limit);
};

// Get active templates
export const getActiveTemplates = () => {
  return transferTemplates.filter(tpl => tpl.isActive);
};

// Get templates by frequency
export const getTemplatesByFrequency = (frequency) => {
  return transferTemplates.filter(tpl => tpl.frequency === frequency && tpl.isActive);
};
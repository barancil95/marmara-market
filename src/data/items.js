// Örnek ilan verisi. Backend eklendiğinde bu modülün yerini API çağrıları alacak.
export const ITEMS = [
  {
    id: 1,
    title: 'Kalkülüs 1 ders kitabı + notlar',
    price: '₺180',
    p: 180,
    icon: 'menu_book',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80'
    ],
    cat: 'Ders kitabı',
    sub: 'Mühendislik',
    campus: 'Göztepe',
    campusShort: 'Göztepe',
    cond: 'İyi',
    swap: true,
    blurb: '2 dönem kullanıldı, içinde el yazısı özet notlar var.',
    desc: 'Kalkülüs 1 ders kitabı ve 2 dönem boyunca tuttuğum özet notlar birlikte. Kitapta yazı veya çizgi yok, notlar ayrı defterde. Vize–final soru çözümleri de dahil. Göztepe kampüsünde kütüphane önünde teslim edebilirim, kargo da olur.'
  },
  {
    id: 2,
    title: 'MacBook Air M1 2020',
    price: '₺14.500',
    p: 14500,
    icon: 'laptop_mac',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ],
    cat: 'Elektronik',
    sub: 'Laptop',
    campus: 'Göztepe',
    campusShort: 'Göztepe',
    cond: 'Az kullanılmış',
    swap: false,
    blurb: '256 GB, 41 şarj döngüsü, kutulu ve faturalı.',
    desc: '256 GB SSD / 8 GB RAM. Pil sağlığı %94, 41 şarj döngüsü. Kutusu, kablosu ve faturası mevcut. Yeni model aldığım için satıyorum.'
  },
  {
    id: 3,
    title: 'Çalışma masası + sandalye',
    price: '₺750',
    p: 750,
    icon: 'chair',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580481077197-227699139828?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'
    ],
    cat: 'Ev eşyası',
    sub: 'Mobilya',
    campus: 'RTE Başıbüyük',
    campusShort: 'RTE Başıbüyük',
    cond: 'İyi',
    swap: false,
    blurb: 'Yurttan taşınıyorum, 120 cm masa ve döner sandalye.',
    desc: '120x60 cm çalışma masası ve yükseklik ayarlı döner sandalye. Yüzeyde birkaç çizik var. Taşıma alıcıya ait, RTE kampüsü yakınında teslim.'
  },
  {
    id: 4,
    title: 'Yamaha F310 akustik gitar',
    price: '₺2.100',
    p: 2100,
    icon: 'music_note',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80'
    ],
    cat: 'Müzik & spor',
    sub: 'Enstrüman',
    campus: 'Göztepe',
    campusShort: 'Göztepe',
    cond: 'Az kullanılmış',
    swap: true,
    blurb: 'Kılıf ve pena dahil, yeni tel takıldı.',
    desc: '2 yıllık Yamaha F310. Yeni tel takıldı, klavye temiz. Yumuşak kılıf, pena ve akort cihazı dahil. Bas gitarla takas düşünürüm.'
  },
  {
    id: 5,
    title: 'Kışlık mont (M beden)',
    price: '₺320',
    p: 320,
    icon: 'apparel',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80'
    ],
    cat: 'Kıyafet',
    sub: 'Dış giyim',
    campus: 'RTE Başıbüyük',
    campusShort: 'RTE Başıbüyük',
    cond: 'İyi',
    swap: false,
    blurb: 'Su geçirmez, bir kış kullanıldı.',
    desc: 'M beden su geçirmez kışlık mont. Bir kış kullanıldı, yıpranma yok. Fermuar ve cepler sağlam.'
  },
  {
    id: 6,
    title: 'Oda arkadaşı aranıyor · Kadıköy',
    price: '₺6.500/ay',
    p: 6500,
    icon: 'bed',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'
    ],
    cat: 'Ev/oda arkadaşı',
    sub: '2+1 daire',
    campus: 'Göztepe',
    campusShort: 'Göztepe',
    cond: '—',
    swap: false,
    blurb: '2+1 dairede boş oda, kampüse 10 dk yürüme.',
    desc: 'Kadıköy 2+1 dairede boş oda. Kira kişi başı 6.500 TL, faturalar hariç. Göztepe kampüsüne 10 dakika yürüme mesafesinde. Sigara içilmiyor.'
  }
];

export const CATS = [
  { label: 'Ders kitabı', icon: 'menu_book', key: 'Ders kitabı' },
  { label: 'Elektronik', icon: 'laptop_mac', key: 'Elektronik' },
  { label: 'Ev eşyası', icon: 'chair', key: 'Ev eşyası' },
  { label: 'Kıyafet', icon: 'apparel', key: 'Kıyafet' },
  { label: 'Müzik & spor', icon: 'music_note', key: 'Müzik & spor' },
  { label: 'Ev arkadaşı', icon: 'bed', key: 'Ev/oda arkadaşı' }
];

export const CAMPUS_DATA = {
  'Göztepe': {
    name: 'Göztepe Kampüsü',
    fullName: 'Marmara Üniversitesi Göztepe Yerleşkesi',
    district: 'Kadıköy, İstanbul',
    address: 'Eğitim Mah. Fahrettin Kerim Gökay Cd. 34722 Kadıköy / İstanbul',
    embedUrl: 'https://maps.google.com/maps?q=Marmara%20%C3%9Cniversitesi%20G%C3%B6ztepe%20Yerle%C5%9Fkesi&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Marmara+Üniversitesi+Göztepe+Yerleşkesi',
    mapPreview: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    deliveryPoints: [
      { name: 'Merkez Kütüphane önü', hint: '09:00–22:00 · Güvenlik kamerası mevcut', icon: 'local_library' },
      { name: 'Merkez Kafeterya girişi', hint: '11:00–16:00 · Yoğun saatler', icon: 'local_cafe' },
      { name: 'Mühendislik B Blok', hint: '08:00–19:00', icon: 'apartment' }
    ]
  },
  'RTE Başıbüyük': {
    name: 'RTE Başıbüyük Kampüsü',
    fullName: 'Marmara Üniversitesi Recep Tayyip Erdoğan Külliyesi',
    district: 'Maltepe / Başıbüyük, İstanbul',
    address: 'Başıbüyük Mah. Sağlık Bilimleri Yerleşkesi 34854 Maltepe / İstanbul',
    embedUrl: 'https://maps.google.com/maps?q=Marmara%20%C3%9Cniversitesi%20Recep%20Tayyip%20Erdo%C4%9Fan%20K%C3%BClliyesi%20Ba%C5%9F%C4%B1b%C3%BCy%C3%BCk&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Marmara+Üniversitesi+Recep+Tayyip+Erdoğan+Külliyesi+Başıbüyük',
    mapPreview: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80',
    deliveryPoints: [
      { name: 'Yaşam Merkezi girişi', hint: '09:00–21:00 · Güvenlik yanı', icon: 'storefront' },
      { name: 'Kütüphane danışma', hint: '09:00–18:00', icon: 'local_library' }
    ]
  }
};

export const PICKUPS = [
  {
    g: 'Göztepe Kampüsü',
    pts: [
      { label: 'Merkez Kütüphane önü', hint: '09:00–22:00 · kamera var', icon: 'local_library' },
      { label: 'Merkez kafeterya girişi', hint: '11:00–16:00 · yoğun saatler', icon: 'local_cafe' },
      { label: 'Mühendislik B blok girişi', hint: '08:00–19:00', icon: 'apartment' }
    ]
  },
  {
    g: 'RTE Başıbüyük Kampüsü',
    pts: [
      { label: 'Yaşam merkezi girişi', hint: '09:00–21:00 · güvenlik yanı', icon: 'storefront' },
      { label: 'Kütüphane danışma', hint: '09:00–18:00', icon: 'local_library' }
    ]
  }
];

export const SAVED_SEARCHES = [
  { q: 'MacBook · Göztepe', meta: 'Elektronik · ₺10.000–15.000', new: '4 yeni' },
  { q: 'Kalkülüs kitabı', meta: 'Ders kitabı · tüm kampüsler', new: '2 yeni' },
  { q: 'Çalışma masası', meta: 'Ev eşyası · RTE Başıbüyük', new: '1 yeni' }
];

export const FAV_SELLERS = [
  { name: 'Elif Yıldırım', meta: 'İşletme Fak. · 4.8 puan', count: 6, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80' },
  { name: 'Burak Şen', meta: 'Mühendislik Fak. · 4.5 puan', count: 3, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80' },
  { name: 'Zeynep Aras', meta: 'Fen-Edebiyat Fak. · 5.0 puan', count: 2, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80' }
];

export const THREADS = [
  {
    name: 'Elif Yıldırım',
    item: 'Kalkülüs 1 ders kitabı',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
    itemImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=160&q=80',
    last: 'Yarın kampüste teslim alabilir miyim?',
    time: '09:24',
    unread: true,
    bg: '#fffdf5'
  },
  {
    name: 'Burak Şen',
    item: 'MacBook Air M1 2020',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    itemImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=160&q=80',
    last: 'Faturası da var, kutusunda duruyor.',
    time: 'Dün',
    unread: false,
    bg: '#ffffff'
  },
  {
    name: 'Zeynep Aras',
    item: 'Yamaha F310 gitar',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    itemImage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=160&q=80',
    last: 'Takas için bas gitar düşünür müsün?',
    time: 'Dün',
    unread: false,
    bg: '#ffffff'
  },
  {
    name: 'Ahmet Can',
    item: 'Çalışma masası + sandalye',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    itemImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=160&q=80',
    last: 'Teslim noktası olarak yaşam merkezi olur.',
    time: 'Pzt',
    unread: false,
    bg: '#ffffff'
  }
];

export const DELIVERY_OPTIONS = [
  { label: 'Kampüs içi elden teslim', hint: 'Belirlediğin teslim noktasında', icon: 'directions_walk' },
  { label: 'Kargo', hint: 'Alıcı kargo ücretini öder', icon: 'local_shipping' },
  { label: 'Takas', hint: 'Ürün karşılığı değişim', icon: 'swap_horiz' }
];

export const INITIAL_CHAT = [
  { me: false, text: 'Merhaba! Kitap hâlâ satılık mı?' },
  { me: true, text: 'Evet, satılık. Notlar da dahil.' },
  { me: false, text: 'Yarın kampüste teslim alabilir miyim?' }
];

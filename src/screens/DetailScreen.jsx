import { useState } from 'react';
import Icon from '../components/Icon';
import { NAVY, YEL } from '../constants';
import { CAMPUS_DATA } from '../data/items';
import { heart } from '../utils';

const TABS = ['Detaylar', 'Açıklama', 'Konum'];

export default function DetailScreen({ nav, item, detailTab, setDetailTab, liked, toggleLike }) {
  const [activeImg, setActiveImg] = useState(0);
  const { heartColor, heartFill } = heart(liked, item.id);
  const images = item.images && item.images.length > 0 ? item.images : (item.image ? [item.image] : []);
  const campusInfo = CAMPUS_DATA[item.campusShort] || CAMPUS_DATA['Göztepe'];

  const badges = [
    { label: item.cond, icon: 'sell', bg: '#f6f3f2', fg: '#434652', bd: '#e5e2e1' },
    { label: 'Kargo var', icon: 'local_shipping', bg: '#f6f3f2', fg: '#434652', bd: '#e5e2e1' },
    ...(item.swap
      ? [{ label: 'Takasa açık', icon: 'swap_horiz', bg: '#fff8e1', fg: '#6d3a00', bd: '#f3dfa5' }]
      : [])
  ];

  const specs = [
    ['Fiyat', item.price],
    ['Kategori', `${item.cat} › ${item.sub}`],
    ['Durum', item.cond],
    ['Kampüs', item.campus],
    ['Teslim', 'Elden teslim · Kargo'],
    ['İlan tarihi', '28.08.2026'],
    ['İlan no', '18274845882']
  ].map((r, i) => ({ k: r[0], v: r[1], bg: i % 2 ? '#ffffff' : '#f6f3f2' }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Üst çubuk */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 5,
          background: '#fff',
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          borderBottom: '1px solid #f0edec'
        }}
      >
        <button
          onClick={nav.back}
          aria-label="Geri"
          style={{
            width: 38,
            height: 38,
            border: 0,
            background: 'transparent',
            color: '#1c1b1b',
            cursor: 'pointer'
          }}
        >
          <Icon name="arrow_back" size={22} />
        </button>
        <div style={{ display: 'flex' }}>
          <button
            aria-label="Paylaş"
            style={{
              width: 38,
              height: 38,
              border: 0,
              background: 'transparent',
              color: '#1c1b1b',
              cursor: 'pointer'
            }}
          >
            <Icon name="share" size={20} />
          </button>
          <button
            onClick={() => toggleLike(item.id)}
            aria-label="Favorilere ekle"
            style={{
              width: 38,
              height: 38,
              border: 0,
              background: 'transparent',
              cursor: 'pointer',
              color: heartColor
            }}
          >
            <Icon name="favorite" size={20} fill={heartFill} />
          </button>
          <button
            aria-label="Diğer"
            style={{
              width: 38,
              height: 38,
              border: 0,
              background: 'transparent',
              color: '#1c1b1b',
              cursor: 'pointer'
            }}
          >
            <Icon name="more_vert" size={20} />
          </button>
        </div>
      </div>

      <div style={{ background: '#fff', padding: '12px 16px 24px', flex: 1 }}>
        {/* Görsel galerisi */}
        <div
          style={{
            height: 230,
            borderRadius: 12,
            background: '#f0edec',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '1px solid #ebe7e7',
            overflow: 'hidden'
          }}
        >
          {images.length > 0 ? (
            <>
              <img
                src={images[activeImg % images.length]}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'opacity .2s'
                }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                    aria-label="Önceki fotoğraf"
                    style={{
                      position: 'absolute',
                      left: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,.85)',
                      boxShadow: '0 2px 6px rgba(0,0,0,.15)',
                      border: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#1c1b1b'
                    }}
                  >
                    <Icon name="chevron_left" size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImg((prev) => (prev + 1) % images.length)}
                    aria-label="Sonraki fotoğraf"
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 32,
                      height: 32,
                      borderRadius: 999,
                      background: 'rgba(255,255,255,.85)',
                      boxShadow: '0 2px 6px rgba(0,0,0,.15)',
                      border: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#1c1b1b'
                    }}
                  >
                    <Icon name="chevron_right" size={20} />
                  </button>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      background: 'rgba(0,0,0,.65)',
                      color: '#fff',
                      padding: '3px 8px',
                      borderRadius: 12,
                      fontSize: 10.5,
                      fontWeight: 600,
                      letterSpacing: '.04em'
                    }}
                  >
                    {(activeImg % images.length) + 1}/{images.length}
                  </div>
                </>
              )}
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: '#b9b6b6' }}>
              <Icon name={item.icon} size={44} />
              <span style={{ fontSize: 10, letterSpacing: '.08em', fontWeight: 600 }}>
                ÜRÜN FOTOĞRAFI
              </span>
            </div>
          )}
        </div>

        {/* Çoklu fotoğraf indikatörü / thumbnail çubuğu */}
        {images.length > 1 && (
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            {images.map((img, i) => {
              const isActive = (activeImg % images.length) === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Fotoğraf ${i + 1}`}
                  style={{
                    flex: 1,
                    height: 42,
                    borderRadius: 6,
                    border: `2px solid ${isActive ? NAVY : '#e5e2e1'}`,
                    padding: 0,
                    overflow: 'hidden',
                    background: '#f0edec',
                    cursor: 'pointer',
                    opacity: isActive ? 1 : 0.6,
                    transition: 'all .2s'
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Kırıntı yolu */}
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            fontSize: 12,
            fontWeight: 600,
            color: NAVY
          }}
        >
          <span>{item.cat}</span>
          <span style={{ color: '#c3c6d4' }}>›</span>
          <span>{item.sub}</span>
          <span style={{ color: '#c3c6d4' }}>›</span>
          <span>{item.title}</span>
        </div>

        <h1
          style={{
            margin: '8px 0 2px',
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: '#1c1b1b',
            lineHeight: 1.2
          }}
        >
          {item.title}
        </h1>
        <div
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: NAVY
          }}
        >
          {item.price}
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
          {badges.map((b) => (
            <span
              key={b.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                border: `1px solid ${b.bd}`,
                background: b.bg,
                color: b.fg,
                borderRadius: 6,
                padding: '5px 9px',
                fontSize: 11,
                fontWeight: 600
              }}
            >
              <Icon name={b.icon} size={14} />
              {b.label}
            </span>
          ))}
        </div>

        {/* Satıcı kartı */}
        <div
          onClick={nav.seller}
          style={{
            marginTop: 16,
            padding: 12,
            border: '1px solid #e5e2e1',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 11,
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: '#f0edec',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c3c6d4',
              flex: 'none',
              overflow: 'hidden'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80"
              alt="Elif Yıldırım"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1c1b1b' }}>Elif Yıldırım</span>
              <Icon name="verified" size={15} fill={1} color="#1b6d24" />
            </div>
            <div style={{ fontSize: 10.5, color: '#737783', fontWeight: 500 }}>
              İşletme Fakültesi · Göztepe
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#1c1b1b' }}>4.8</span>
              <Icon name="star" size={13} fill={1} color={YEL} />
              <span style={{ fontSize: 10.5, color: '#737783' }}>26 değerlendirme</span>
            </div>
          </div>
          <Icon name="chevron_right" size={20} color="#737783" />
        </div>

        {/* Sekmeler */}
        <div style={{ display: 'flex', gap: 6, marginTop: 18 }}>
          {TABS.map((label, i) => (
            <button
              key={label}
              onClick={() => setDetailTab(i)}
              style={{
                flex: 1,
                padding: '9px 0',
                border: 0,
                borderRadius: 8,
                background: detailTab === i ? NAVY : '#f6f3f2',
                color: detailTab === i ? '#ffffff' : '#434652',
                fontSize: 12.5,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer'
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {detailTab === 0 && (
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column' }}>
            {specs.map((s) => (
              <div
                key={s.k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '11px 12px',
                  borderRadius: 8,
                  background: s.bg
                }}
              >
                <span style={{ fontSize: 12.5, fontWeight: 600, color: '#1c1b1b' }}>{s.k}</span>
                <span style={{ fontSize: 12.5, color: '#434652' }}>{s.v}</span>
              </div>
            ))}
          </div>
        )}

        {detailTab === 1 && (
          <p style={{ margin: '14px 0 0', fontSize: 13, lineHeight: 1.6, color: '#434652' }}>
            {item.desc}
          </p>
        )}

        {detailTab === 2 && (
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Google Maps Harita Çerçevesi */}
            <div
              style={{
                position: 'relative',
                height: 200,
                borderRadius: 12,
                overflow: 'hidden',
                border: '1px solid #d0d7de',
                background: '#e5e3df',
                boxShadow: '0 2px 8px rgba(0,0,0,.06)'
              }}
            >
              <iframe
                title={`${campusInfo.name} Google Haritası`}
                src={campusInfo.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Harita Üst Rozeti */}
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 10px',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  boxShadow: '0 2px 6px rgba(0,0,0,.15)',
                  fontSize: 11,
                  fontWeight: 700,
                  color: NAVY
                }}
              >
                <Icon name="pin_drop" size={14} color="#d93025" />
                Google Maps · {campusInfo.name}
              </div>
            </div>

            {/* Kampüs Adres Kartı */}
            <div
              style={{
                padding: 12,
                borderRadius: 10,
                background: '#f8fafc',
                border: '1px solid #e5e2e1',
                display: 'flex',
                flexDirection: 'column',
                gap: 6
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="account_balance" size={18} color={NAVY} />
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: '#1c1b1b' }}>
                    {campusInfo.fullName}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#434652', lineHeight: 1.4, display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                <Icon name="location_on" size={15} color="#737783" />
                <span>{campusInfo.address}</span>
              </div>

              <a
                href={campusInfo.mapUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  marginTop: 6,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#1a73e8',
                  textDecoration: 'none'
                }}
              >
                <Icon name="open_in_new" size={14} />
                Google Haritalar'da Aç & Yol Tarifi Al
              </a>
            </div>

            {/* Kampüs İçi Teslimat Noktaları */}
            <div style={{ marginTop: 4 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '.04em',
                  color: '#737783',
                  marginBottom: 8,
                  textTransform: 'uppercase'
                }}
              >
                Bu Kampüsteki Güvenli Teslim Noktaları
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {campusInfo.deliveryPoints.map((pt) => (
                  <div
                    key={pt.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 12px',
                      background: '#fff',
                      border: '1px solid #e5e2e1',
                      borderRadius: 8
                    }}
                  >
                    <Icon name={pt.icon} size={18} color={NAVY} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1c1b1b' }}>
                        {pt.name}
                      </div>
                      <div style={{ fontSize: 10.5, color: '#737783' }}>{pt.hint}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nav.pickup}
              style={{
                marginTop: 6,
                width: '100%',
                height: 44,
                border: `1px solid ${NAVY}`,
                background: '#fff',
                color: NAVY,
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6
              }}
            >
              <Icon name="place" size={18} />
              Teslim Noktalarını Yönet & Seç
            </button>
          </div>
        )}
      </div>

      {/* Alt eylem çubuğu — orijinalde absolute, burada sticky (responsive) */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          background: '#fff',
          borderTop: '1px solid #ebe7e7',
          padding: '12px 16px 16px',
          display: 'flex',
          gap: 10
        }}
      >
        <button
          aria-label="Ara"
          style={{
            width: 52,
            height: 48,
            border: '1px solid #c3c6d4',
            borderRadius: 10,
            background: '#fff',
            color: NAVY,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flex: 'none'
          }}
        >
          <Icon name="call" size={21} />
        </button>
        <button
          onClick={nav.chat}
          style={{
            flex: 1,
            height: 48,
            border: 0,
            borderRadius: 10,
            background: NAVY,
            color: '#ffffff',
            fontSize: 14.5,
            fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer'
          }}
        >
          Mesaj Gönder
        </button>
      </div>
    </div>
  );
}

import Icon from '../components/Icon';
import { NAVY, YEL, CONDITIONS, CONDITION_HINTS } from '../constants';
import { CATS, DELIVERY_OPTIONS } from '../data/items';
import { chip } from '../utils';

const PRICE_HINT = '₺120 – ₺260';

const SECTION_LABEL = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '.04em',
  color: '#737783',
  margin: '20px 0 8px'
};

const FIELD = {
  width: '100%',
  border: '1px solid #c3c6d4',
  borderRadius: 8,
  fontSize: 13.5,
  fontFamily: 'Inter, sans-serif',
  background: '#f8fafc',
  outline: 'none',
  color: '#1c1b1b'
};

export default function PostScreen({
  nav,
  postStep,
  setPostStep,
  postCat,
  setPostCat,
  postTitle,
  setPostTitle,
  postDesc,
  setPostDesc,
  postPrice,
  setPostPrice,
  postCond,
  setPostCond,
  swapOn,
  setSwapOn,
  delivery,
  setDelivery,
  pickup,
  onFinish
}) {
  const next = () => (postStep < 3 ? setPostStep(postStep + 1) : onFinish());
  const back = () => (postStep > 1 ? setPostStep(postStep - 1) : nav.back());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Başlık + ilerleme çubuğu */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: '#fff',
          zIndex: 5,
          borderBottom: '1px solid #ebe7e7'
        }}
      >
        <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 8px' }}>
          <button
            onClick={back}
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
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1c1b1b', marginLeft: 4 }}>
            İlan ver
          </span>
          <span
            style={{
              marginLeft: 'auto',
              marginRight: 12,
              fontSize: 11.5,
              fontWeight: 600,
              color: '#737783'
            }}
          >
            Adım {postStep}/3
          </span>
        </div>
        <div style={{ height: 3, background: '#f0edec' }}>
          <div
            style={{
              height: 3,
              background: NAVY,
              width: `${Math.round((postStep / 3) * 100)}%`,
              transition: 'width .25s'
            }}
          />
        </div>
      </div>

      {/* Adım 1: ne satıyorsun */}
      {postStep === 1 && (
        <div style={{ padding: '18px 16px 24px', flex: 1 }}>
          <h1
            style={{
              margin: '0 0 4px',
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 21,
              fontWeight: 700,
              color: '#1c1b1b'
            }}
          >
            Ne satıyorsun?
          </h1>
          <p style={{ margin: '0 0 18px', fontSize: 12.5, color: '#737783' }}>
            Fotoğraf ve kategori ile başla.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            <div
              style={{
                aspectRatio: '1',
                border: `1.5px dashed ${NAVY}`,
                borderRadius: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                color: NAVY,
                cursor: 'pointer'
              }}
            >
              <Icon name="add_a_photo" size={22} />
              <span style={{ fontSize: 8.5, fontWeight: 600 }}>EKLE</span>
            </div>
            {['#f0edec', '#f6f3f2', '#f6f3f2'].map((bg, i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '1',
                  border: '1px solid #e5e2e1',
                  borderRadius: 8,
                  background: bg
                }}
              />
            ))}
          </div>

          <div style={SECTION_LABEL}>KATEGORİ</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {CATS.map((c) => {
              const s = chip(postCat === c.key);
              return (
                <button
                  key={c.key}
                  onClick={() => setPostCat(c.key)}
                  style={{
                    border: `1px solid ${s.bd}`,
                    background: s.bg,
                    color: s.fg,
                    borderRadius: 6,
                    padding: '8px 11px',
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer'
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div style={SECTION_LABEL}>BAŞLIK</div>
          <input
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="ör. Kalkülüs 1 ders kitabı + notlar"
            style={{ ...FIELD, height: 44, padding: '0 12px' }}
          />

          <div style={{ ...SECTION_LABEL, margin: '16px 0 8px' }}>AÇIKLAMA</div>
          <textarea
            value={postDesc}
            onChange={(e) => setPostDesc(e.target.value)}
            placeholder="Ürünün durumu, kullanım süresi, teslim tercihi..."
            style={{ ...FIELD, height: 96, padding: '10px 12px', fontSize: 13, resize: 'none' }}
          />
        </div>
      )}

      {/* Adım 2: fiyat ve durum */}
      {postStep === 2 && (
        <div style={{ padding: '18px 16px 24px', flex: 1 }}>
          <h1
            style={{
              margin: '0 0 4px',
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 21,
              fontWeight: 700,
              color: '#1c1b1b'
            }}
          >
            Fiyat ve durum
          </h1>
          <p style={{ margin: '0 0 18px', fontSize: 12.5, color: '#737783' }}>
            Benzer ilanlar {PRICE_HINT} arasında satılıyor.
          </p>

          <div
            style={{
              border: '1px solid #c3c6d4',
              borderRadius: 10,
              padding: 14,
              background: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: NAVY
              }}
            >
              ₺
            </span>
            <input
              value={postPrice}
              onChange={(e) => setPostPrice(e.target.value)}
              placeholder="0"
              inputMode="numeric"
              style={{
                flex: 1,
                border: 0,
                background: 'transparent',
                outline: 'none',
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 26,
                fontWeight: 700,
                color: '#1c1b1b',
                minWidth: 0
              }}
            />
          </div>

          <div style={SECTION_LABEL}>DURUM</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CONDITIONS.map((label, i) => {
              const on = postCond === i;
              return (
                <button
                  key={label}
                  onClick={() => setPostCond(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    border: `1px solid ${on ? NAVY : '#e5e2e1'}`,
                    background: on ? '#f2f6fd' : '#ffffff',
                    borderRadius: 8,
                    padding: 12,
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 999,
                      border: `2px solid ${on ? NAVY : '#c3c6d4'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 'none'
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: on ? NAVY : 'transparent'
                      }}
                    />
                  </span>
                  <span style={{ flex: 1 }}>
                    <span
                      style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1c1b1b' }}
                    >
                      {label}
                    </span>
                    <span style={{ display: 'block', fontSize: 11, color: '#737783' }}>
                      {CONDITION_HINTS[i]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Takas anahtarı */}
          <div
            style={{
              marginTop: 20,
              border: '1px solid #e5e2e1',
              borderRadius: 10,
              padding: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              background: '#fff'
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1c1b1b' }}>Takasa açık</div>
              <div style={{ fontSize: 11, color: '#737783' }}>
                Başka bir ürünle değişim teklifi alabilirsin.
              </div>
            </div>
            <button
              onClick={() => setSwapOn(!swapOn)}
              role="switch"
              aria-checked={swapOn}
              aria-label="Takasa açık"
              style={{
                width: 46,
                height: 26,
                border: 0,
                borderRadius: 999,
                background: swapOn ? NAVY : '#c3c6d4',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background .2s',
                flex: 'none'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 3,
                  left: swapOn ? 23 : 3,
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  background: '#fff',
                  transition: 'left .2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,.3)'
                }}
              />
            </button>
          </div>
        </div>
      )}

      {/* Adım 3: teslim */}
      {postStep === 3 && (
        <div style={{ padding: '18px 16px 24px', flex: 1 }}>
          <h1
            style={{
              margin: '0 0 4px',
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 21,
              fontWeight: 700,
              color: '#1c1b1b'
            }}
          >
            Teslim
          </h1>
          <p style={{ margin: '0 0 18px', fontSize: 12.5, color: '#737783' }}>
            Alıcının nasıl teslim alacağını seç.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {DELIVERY_OPTIONS.map((d, i) => {
              const on = delivery === i;
              return (
                <button
                  key={d.label}
                  onClick={() => setDelivery(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 11,
                    border: `1px solid ${on ? NAVY : '#e5e2e1'}`,
                    background: on ? '#f2f6fd' : '#ffffff',
                    borderRadius: 8,
                    padding: 13,
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <Icon name={d.icon} size={21} color={on ? NAVY : '#737783'} />
                  <span style={{ flex: 1 }}>
                    <span
                      style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1c1b1b' }}
                    >
                      {d.label}
                    </span>
                    <span style={{ display: 'block', fontSize: 11, color: '#737783' }}>
                      {d.hint}
                    </span>
                  </span>
                  <Icon name="check_circle" size={18} color={on ? NAVY : '#e5e2e1'} />
                </button>
              );
            })}
          </div>

          <div style={SECTION_LABEL}>TESLİM NOKTASI</div>
          <button
            onClick={nav.pickup}
            style={{
              width: '100%',
              border: '1px solid #c3c6d4',
              borderRadius: 8,
              padding: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              textAlign: 'left'
            }}
          >
            <Icon name="location_on" size={20} color={NAVY} />
            <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: '#1c1b1b' }}>
              {pickup}
            </span>
            <Icon name="chevron_right" size={18} color="#737783" />
          </button>

          {/* Ön izleme */}
          <div
            style={{
              marginTop: 22,
              border: '1px solid #e5e2e1',
              borderRadius: 10,
              padding: 12,
              display: 'flex',
              gap: 12,
              background: '#fff'
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 8,
                background: '#f0edec',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c3c6d4',
                flex: 'none'
              }}
            >
              <Icon name="menu_book" size={24} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '.05em',
                  color: '#737783'
                }}
              >
                ÖN İZLEME
              </div>
              <div
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: NAVY,
                  marginTop: 2
                }}
              >
                {postPrice ? `₺${postPrice}` : '₺—'}
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1c1b1b' }}>
                {postTitle || 'Başlık girilmedi'}
              </div>
              <div style={{ fontSize: 10.5, color: '#737783', marginTop: 2 }}>{pickup}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: '0 16px 24px' }}>
        <button
          onClick={next}
          style={{
            width: '100%',
            height: 50,
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
          {postStep === 3 ? 'İlanı yayınla' : 'Devam et'}
        </button>
      </div>
    </div>
  );
}

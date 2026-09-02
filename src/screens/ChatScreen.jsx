import { useEffect, useRef } from 'react';
import Icon from '../components/Icon';
import { NAVY } from '../constants';

const QUICK_REPLIES = ['Teslim noktası öner', 'Fiyatta esneklik var mı?', 'Bugün müsaitim'];

export default function ChatScreen({ nav, chat, setChat, draft, setDraft }) {
  const endRef = useRef(null);

  // Yeni mesaj gelince en alta kaydır
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chat]);

  const push = (text) => setChat((c) => [...c, { me: true, text }]);

  const send = () => {
    if (!draft.trim()) return;
    push(draft);
    setDraft('');
  };

  return (
    <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Sohbet başlığı */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: '#fff',
          zIndex: 5,
          borderBottom: '1px solid #ebe7e7',
          padding: '0 8px',
          height: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}
      >
        <button
          onClick={nav.back}
          aria-label="Geri"
          style={{
            width: 36,
            height: 36,
            border: 0,
            background: 'transparent',
            color: '#1c1b1b',
            cursor: 'pointer',
            flex: 'none'
          }}
        >
          <Icon name="arrow_back" size={22} />
        </button>
        <div
          style={{
            width: 36,
            height: 36,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: '#1c1b1b' }}>Elif Yıldırım</span>
            <Icon name="verified" size={14} fill={1} color="#1b6d24" />
          </div>
          <div style={{ fontSize: 10.5, color: '#737783' }}>
            İşletme Fak. · genelde 2 saatte yanıtlar
          </div>
        </div>
      </div>

      {/* Konuşulan ilan */}
      <div
        onClick={nav.detail}
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid #f0edec',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          background: '#f6f3f2',
          cursor: 'pointer'
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 8,
            background: '#e5e2e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#b9b6b6',
            flex: 'none',
            overflow: 'hidden'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=160&q=80"
            alt="Kalkülüs 1"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#1c1b1b' }}>
            Kalkülüs 1 ders kitabı + notlar
          </div>
          <div
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              color: NAVY
            }}
          >
            ₺180
          </div>
        </div>
        <Icon name="chevron_right" size={18} color="#737783" />
      </div>

      {/* Mesaj baloncukları */}
      <div
        style={{
          flex: 1,
          padding: '14px 16px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 9
        }}
      >
        {chat.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.me ? 'flex-end' : 'flex-start' }}>
            <div
              style={{
                maxWidth: '78%',
                background: m.me ? NAVY : '#ffffff',
                color: m.me ? '#ffffff' : '#1c1b1b',
                border: `1px solid ${m.me ? NAVY : '#e5e2e1'}`,
                borderRadius: 12,
                padding: '9px 12px',
                fontSize: 13,
                lineHeight: 1.45
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Hazır yanıtlar */}
      <div
        className="no-scrollbar"
        style={{ padding: '0 16px 10px', display: 'flex', gap: 6, overflowX: 'auto' }}
      >
        {QUICK_REPLIES.map((label) => (
          <button
            key={label}
            onClick={() => push(label)}
            style={{
              flex: 'none',
              border: '1px solid #c3c6d4',
              background: '#fff',
              color: NAVY,
              borderRadius: 999,
              padding: '7px 12px',
              fontSize: 11.5,
              fontWeight: 600,
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Mesaj yazma çubuğu */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          borderTop: '1px solid #ebe7e7',
          background: '#fff',
          padding: '10px 12px 14px',
          display: 'flex',
          gap: 8,
          alignItems: 'center'
        }}
      >
        <button
          aria-label="Ekle"
          style={{
            width: 38,
            height: 38,
            border: 0,
            borderRadius: 8,
            background: '#f6f3f2',
            color: '#434652',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none'
          }}
        >
          <Icon name="add" size={20} />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Mesaj yaz"
          style={{
            flex: 1,
            height: 40,
            border: '1px solid #c3c6d4',
            borderRadius: 999,
            padding: '0 14px',
            fontSize: 13,
            fontFamily: 'Inter, sans-serif',
            outline: 'none',
            background: '#f8fafc',
            color: '#1c1b1b',
            minWidth: 0
          }}
        />
        <button
          onClick={send}
          aria-label="Gönder"
          style={{
            width: 40,
            height: 40,
            border: 0,
            borderRadius: 999,
            background: NAVY,
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none'
          }}
        >
          <Icon name="send" size={19} />
        </button>
      </div>
    </div>
  );
}

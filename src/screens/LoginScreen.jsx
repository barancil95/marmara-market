import Icon from '../components/Icon';
import { NAVY, YEL } from '../constants';
import logo from '../assets/logo-white.png';

const DEMO_CODE = ['3', '9', '4', '1', '8', '2'];

const LABEL = {
  fontSize: 10.5,
  fontWeight: 600,
  letterSpacing: '.05em',
  color: 'rgba(255,255,255,.6)',
  marginBottom: 8
};

export default function LoginScreen({ nav, email, setEmail, code, setCode, onVerified }) {
  const complete = code.every((c) => c);

  // Kod eksikse önce kodu doldurur (demo), tamsa doğrulamayı tamamlar
  const verifyNow = () => (complete ? onVerified() : setCode(DEMO_CODE));

  return (
    <div
      style={{
        minHeight: '100%',
        background: NAVY,
        padding: '28px 22px 24px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}
    >
      <button
        onClick={nav.back}
        aria-label="Kapat"
        style={{
          width: 36,
          height: 36,
          border: 0,
          background: 'transparent',
          color: 'rgba(255,255,255,.8)',
          cursor: 'pointer',
          marginBottom: 26,
          alignSelf: 'flex-start'
        }}
      >
        <Icon name="close" size={22} />
      </button>

      <div>
        <img
          src={logo}
          alt="marmarket"
          style={{ height: 32, width: 'auto', display: 'block' }}
        />
      </div>

      <h1
        style={{
          margin: '22px 0 8px',
          fontFamily: "'Hanken Grotesk', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.25
        }}
      >
        Marmara e-postanla
        <br />
        doğrula
      </h1>
      <p
        style={{
          margin: '0 0 24px',
          fontSize: 13,
          color: 'rgba(255,255,255,.72)',
          lineHeight: 1.55
        }}
      >
        Pazar yeri yalnızca Marmara Üniversitesi öğrencilerine açıktır. Adresin doğrulandıktan sonra
        profilinde rozet görünür.
      </p>

      <div style={LABEL}>ÜNİVERSİTE E-POSTASI</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,.1)',
          border: '1px solid rgba(255,255,255,.22)',
          borderRadius: 8,
          height: 50,
          padding: '0 12px'
        }}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ogrenci.no"
          style={{
            flex: 1,
            background: 'transparent',
            border: 0,
            outline: 'none',
            color: '#fff',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            minWidth: 0
          }}
        />
        <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,.62)', fontWeight: 500 }}>
          @marun.edu.tr
        </span>
      </div>

      <div style={{ ...LABEL, margin: '22px 0 8px' }}>DOĞRULAMA KODU</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {code.map((v, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 52,
              border: `1px solid ${v ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,.22)'}`,
              background: 'rgba(255,255,255,.08)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: '#fff'
            }}
          >
            {v}
          </div>
        ))}
      </div>

      <button
        onClick={() => setCode(DEMO_CODE)}
        style={{
          marginTop: 14,
          background: 'transparent',
          border: 0,
          padding: 0,
          color: YEL,
          fontSize: 12,
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          cursor: 'pointer',
          alignSelf: 'flex-start'
        }}
      >
        Kodu tekrar gönder
      </button>

      <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            display: 'flex',
            gap: 9,
            alignItems: 'flex-start',
            background: 'rgba(255,255,255,.08)',
            borderRadius: 10,
            padding: 12
          }}
        >
          <Icon name="lock" size={18} color={YEL} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,.78)', lineHeight: 1.5 }}>
            E-posta adresin ilanlarında görünmez; yalnızca doğrulama için kullanılır.
          </span>
        </div>
        <button
          onClick={verifyNow}
          style={{
            height: 52,
            border: 0,
            borderRadius: 10,
            background: '#ffffff',
            color: NAVY,
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer'
          }}
        >
          {complete ? 'Doğrula ve devam et' : 'Doğrulama kodu gönder'}
        </button>
      </div>
    </div>
  );
}

import { useState, useCallback, useMemo } from 'react';
import { ITEMS, INITIAL_CHAT } from './data/items';
import { NAVY, MUTED } from './constants';
import { decorate, filterItems } from './utils';
import BottomNav from './components/BottomNav';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import DetailScreen from './screens/DetailScreen';
import SellerScreen from './screens/SellerScreen';
import FavScreen from './screens/FavScreen';
import PostScreen from './screens/PostScreen';
import PickupScreen from './screens/PickupScreen';
import MessagesScreen from './screens/MessagesScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';

// Alt navigasyonun göründüğü ekranlar
const NAV_SCREENS = ['home', 'search', 'fav', 'messages', 'profile'];

export default function App() {
  // --- Navigasyon ---
  const [screen, setScreen] = useState('home');
  const [hist, setHist] = useState([]);
  const [detailId, setDetailId] = useState(1);
  const [detailTab, setDetailTab] = useState(0);

  // --- Arama & filtreler ---
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState(null);
  const [campusFilter, setCampusFilter] = useState('Tüm kampüsler');
  const [cond, setCond] = useState(null);
  const [priceMax, setPriceMax] = useState(20000);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // --- Favoriler ---
  const [favTab, setFavTab] = useState(0);
  const [liked, setLiked] = useState({ 2: true, 4: true });

  // --- İlan verme sihirbazı ---
  const [postStep, setPostStep] = useState(1);
  const [postCat, setPostCat] = useState('Ders kitabı');
  const [postTitle, setPostTitle] = useState('');
  const [postDesc, setPostDesc] = useState('');
  const [postPrice, setPostPrice] = useState('');
  const [postCond, setPostCond] = useState(1);
  const [swapOn, setSwapOn] = useState(true);
  const [delivery, setDelivery] = useState(0);
  const [pickup, setPickup] = useState('Göztepe · Merkez Kütüphane önü');

  // --- Mesajlaşma ---
  const [draft, setDraft] = useState('');
  const [chat, setChat] = useState(INITIAL_CHAT);

  // --- Giriş / doğrulama ---
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['3', '9', '4', '1', '', '']);
  const [verified, setVerified] = useState(false);

  // --- Navigasyon yardımcıları ---
  const go = useCallback((s) => {
    setScreen((cur) => {
      setHist((h) => [...h, cur]);
      return s;
    });
    setFiltersOpen(false);
  }, []);

  const back = useCallback(() => {
    setHist((h) => {
      if (!h.length) {
        setScreen('home');
        return h;
      }
      setScreen(h[h.length - 1]);
      return h.slice(0, -1);
    });
    setFiltersOpen(false);
  }, []);

  const openItem = useCallback(
    (id) => {
      setDetailId(id);
      setDetailTab(0);
      go('detail');
    },
    [go]
  );

  const toggleLike = useCallback((id) => {
    setLiked((l) => ({ ...l, [id]: !l[id] }));
  }, []);

  const goPost = useCallback(() => {
    setPostStep(1);
    go('post');
  }, [go]);

  const nav = useMemo(
    () => ({
      home: () => go('home'),
      search: () => go('search'),
      post: goPost,
      fav: () => go('fav'),
      profile: () => go('profile'),
      seller: () => go('seller'),
      messages: () => go('messages'),
      chat: () => go('chat'),
      login: () => go('login'),
      pickup: () => go('pickup'),
      detail: () => openItem(detailId),
      back
    }),
    [go, goPost, back, openItem, detailId]
  );

  // Kategori chip'ine basınca hem filtre uygulanır hem arama ekranına geçilir
  const pickCategory = useCallback(
    (key) => {
      setCat((c) => (c === key ? null : key));
      go('search');
    },
    [go]
  );

  // --- Türetilmiş veri ---
  const deco = useMemo(() => ({ liked, openItem, toggleLike }), [liked, openItem, toggleLike]);

  const results = useMemo(
    () =>
      filterItems(ITEMS, { query, cat, campusFilter, cond, priceMax }).map((it) =>
        decorate(it, deco)
      ),
    [query, cat, campusFilter, cond, priceMax, deco]
  );

  const item = useMemo(() => ITEMS.find((i) => i.id === detailId) || ITEMS[0], [detailId]);

  const navItems = useMemo(() => {
    const def = [
      { icon: 'home', label: 'Anasayfa', k: 'home', on: nav.home },
      { icon: 'search', label: 'Arama', k: 'search', on: nav.search },
      { icon: '', label: '', k: '', on: null }, // FAB boşluğu
      { icon: 'favorite', label: 'Favoriler', k: 'fav', on: nav.fav },
      { icon: 'chat_bubble', label: 'Mesajlar', k: 'messages', on: nav.messages }
    ];
    return def.map((n) => ({
      ...n,
      onClick: n.on,
      color: screen === n.k ? NAVY : MUTED,
      fill: screen === n.k ? 1 : 0
    }));
  }, [screen, nav]);

  const showNav = NAV_SCREENS.includes(screen);

  // Ekranlara ortak geçen paket
  const shared = { nav, liked, toggleLike, openItem, deco };

  return (
    <div className="app-shell">
      <div className="app-body">
        {screen === 'home' && (
          <HomeScreen
            {...shared}
            items={ITEMS.slice(0, 4).map((it) => decorate(it, deco))}
            onPickCategory={pickCategory}
            activeCat={cat}
          />
        )}

        {screen === 'search' && (
          <SearchScreen
            {...shared}
            results={results}
            query={query}
            setQuery={setQuery}
            cat={cat}
            setCat={setCat}
            campusFilter={campusFilter}
            setCampusFilter={setCampusFilter}
            cond={cond}
            setCond={setCond}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            filtersOpen={filtersOpen}
            setFiltersOpen={setFiltersOpen}
          />
        )}

        {screen === 'detail' && (
          <DetailScreen {...shared} item={item} detailTab={detailTab} setDetailTab={setDetailTab} />
        )}

        {screen === 'seller' && (
          <SellerScreen {...shared} items={ITEMS.slice(0, 4).map((it) => decorate(it, deco))} />
        )}

        {screen === 'fav' && (
          <FavScreen
            {...shared}
            favTab={favTab}
            setFavTab={setFavTab}
            listings={[...new Set([...ITEMS.filter((i) => liked[i.id]), ...ITEMS.slice(0, 2)])]
              .slice(0, 4)
              .map((it) => decorate(it, deco))}
          />
        )}

        {screen === 'post' && (
          <PostScreen
            {...shared}
            postStep={postStep}
            setPostStep={setPostStep}
            postCat={postCat}
            setPostCat={setPostCat}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postDesc={postDesc}
            setPostDesc={setPostDesc}
            postPrice={postPrice}
            setPostPrice={setPostPrice}
            postCond={postCond}
            setPostCond={setPostCond}
            swapOn={swapOn}
            setSwapOn={setSwapOn}
            delivery={delivery}
            setDelivery={setDelivery}
            pickup={pickup}
            onFinish={() => {
              setPostStep(1);
              setScreen('home');
              setHist([]);
            }}
          />
        )}

        {screen === 'pickup' && <PickupScreen {...shared} pickup={pickup} setPickup={setPickup} />}

        {screen === 'messages' && <MessagesScreen {...shared} />}

        {screen === 'chat' && (
          <ChatScreen {...shared} chat={chat} setChat={setChat} draft={draft} setDraft={setDraft} />
        )}

        {screen === 'profile' && <ProfileScreen {...shared} verified={verified} pickup={pickup} />}

        {screen === 'login' && (
          <LoginScreen
            {...shared}
            email={email}
            setEmail={setEmail}
            code={code}
            setCode={setCode}
            onVerified={() => {
              setVerified(true);
              setScreen('profile');
              setHist([]);
            }}
          />
        )}
      </div>

      {showNav && <BottomNav items={navItems} onPost={nav.post} />}
    </div>
  );
}


import { useEffect, useState } from 'react';
import './App.css';

const STORAGE_KEY = 'makuri-save-v1';

function loadSavedGame() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};
    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

const initialPet = {
  name: 'Лунтик',
  level: 1,
  happiness: 90,
  hunger: 70,
  energy: 85,
  xp: 12,
};

const tabs = [
  { id: 'home', icon: '⌂', label: 'Дом' },
  { id: 'pet', icon: '✿', label: 'Питомец' },
  { id: 'games', icon: '🎮', label: 'Игры' },
  { id: 'shop', icon: '▤', label: 'Магазин' },
  { id: 'travel', icon: '♧', label: 'Путешествия' },
  { id: 'settings', icon: '⚙', label: 'Настройки' },
];

function Creature({ happy = false, onClick }) {
  return (
    <button
      className={`creature ${happy ? 'creature-happy' : ''}`}
      onClick={onClick}
      aria-label="Погладить Лунтика"
      title="Погладить питомца"
    >
      <span className="creature-aura" />
      <span className="creature-tail" />
      <span className="creature-ear creature-ear-left" />
      <span className="creature-ear creature-ear-right" />
      <span className="creature-body">
        <span className="creature-spots spot-one" />
        <span className="creature-spots spot-two" />
        <span className="creature-face">
          <span className="creature-eye eye-one" />
          <span className="creature-eye eye-two" />
          <span className="creature-blush blush-one" />
          <span className="creature-blush blush-two" />
          <span className="creature-nose" />
          <span className="creature-mouth" />
        </span>
        <span className="creature-belly" />
        <span className="creature-leg leg-one" />
        <span className="creature-leg leg-two" />
      </span>
      <span className="creature-sparkle sparkle-one">✦</span>
      <span className="creature-sparkle sparkle-two">✧</span>
      <span className="creature-sparkle sparkle-three">♥</span>
    </button>
  );
}

function StatBar({ icon, label, value, color }) {
  return (
    <div className="stat-row">
      <div className="stat-heading">
        <span className="stat-name">
          <span className={`stat-icon ${color}`}>{icon}</span>
          {label}
        </span>
        <span className="stat-number">{value}%</span>
      </div>
      <div className="stat-track">
        <div
          className={`stat-progress ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Room() {
  return (
    <div className="room">
      <div className="room-ceiling">
        <div className="fairy-lights">
          {Array.from({ length: 13 }, (_, i) => (
            <span key={i} className={`fairy-light light-${i % 4}`} />
          ))}
        </div>
      </div>

      <div className="room-wall">
        <div className="bookshelf">
          <div className="shelf-top">
            <span className="plant-pot">♣</span>
            <span className="book book-pink" />
            <span className="book book-blue" />
            <span className="book book-gold" />
            <span className="book book-lilac" />
          </div>
          <div className="shelf-middle">
            <span className="book book-blue" />
            <span className="book book-pink" />
            <span className="book book-gold" />
            <span className="plant-pot plant-small">♧</span>
          </div>
          <div className="shelf-bottom">
            <span className="plant-pot">✿</span>
            <span className="book book-lilac" />
            <span className="book book-blue" />
            <span className="book book-pink" />
          </div>
        </div>

        <div className="wall-picture">
          <span>✦</span>
          <span>♡</span>
          <span>✧</span>
        </div>

        <div className="window-frame">
          <div className="window-sky">
            <div className="sky-moon" />
            <div className="sky-cloud cloud-a" />
            <div className="sky-cloud cloud-b" />
            <div className="floating-island island-a">
              <div className="island-castle">♜</div>
              <div className="island-grass" />
              <div className="island-rock" />
            </div>
            <div className="floating-island island-b">
              <div className="island-tree">♣</div>
              <div className="island-grass" />
              <div className="island-rock" />
            </div>
            <div className="floating-island island-c">
              <div className="island-tree">♧</div>
              <div className="island-grass" />
              <div className="island-rock" />
            </div>
            <div className="waterfall" />
            <div className="sky-star sky-star-a">✦</div>
            <div className="sky-star sky-star-b">✧</div>
            <div className="sky-star sky-star-c">·</div>
            <div className="window-cross vertical-cross" />
            <div className="window-cross horizontal-cross" />
          </div>
        </div>

        <div className="hanging-vines vine-one">♧ ♧ ♧</div>
        <div className="hanging-vines vine-two">♣ ♧</div>

        <div className="hanging-lantern lantern-one">
          <span />
        </div>
        <div className="hanging-lantern lantern-two">
          <span />
        </div>

        <div className="wall-shelf">
          <span className="tiny-plant">♣</span>
          <span className="tiny-candle">✦</span>
          <span className="tiny-plant">♧</span>
        </div>

        <div className="fireplace">
          <div className="fireplace-top" />
          <div className="fireplace-opening">
            <span className="fire">♨</span>
          </div>
          <div className="fireplace-base" />
        </div>

        <div className="hanging-chair">
          <div className="chair-chain" />
          <div className="chair-frame">
            <div className="chair-pillow">★</div>
          </div>
        </div>

        <div className="side-table">
          <div className="table-plant">♣</div>
          <div className="table-top" />
          <div className="table-leg" />
        </div>

        <div className="bed">
          <div className="bed-headboard" />
          <div className="bed-pillow pillow-one">✦</div>
          <div className="bed-pillow pillow-two">♡</div>
          <div className="bed-blanket">
            <span>✧</span><span>★</span><span>✦</span>
          </div>
          <div className="bed-frame" />
        </div>

        <div className="floor">
          <div className="floor-lines" />
          <div className="rug">
            <div className="rug-inner">
              <span>✦</span><span>★</span><span>✧</span>
            </div>
          </div>
          <div className="plant-floor plant-left">♣</div>
          <div className="plant-floor plant-right">♧</div>
          <div className="food-bowl">♥</div>
          <div className="toy-ball">✿</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  // Загружаем сохранение один раз при открытии приложения.
  const [savedGame] = useState(loadSavedGame);

  const [pet, setPet] = useState(() => ({
    ...initialPet,
    ...(savedGame.pet && typeof savedGame.pet === 'object' ? savedGame.pet : {}),
  }));
  const [coins, setCoins] = useState(() =>
    Number.isFinite(savedGame.coins) ? savedGame.coins : 0
  );
  const [gems] = useState(50);
  const [activeTab, setActiveTab] = useState(() =>
    tabs.some((tab) => tab.id === savedGame.activeTab) ? savedGame.activeTab : 'home'
  );
  const [toast, setToast] = useState('');
  const [petName, setPetName] = useState(() =>
    savedGame.petName || savedGame.pet?.name || initialPet.name
  );
  const [nameEditing, setNameEditing] = useState(false);
  const [newName, setNewName] = useState(() =>
    savedGame.petName || savedGame.pet?.name || initialPet.name
  );
  const [inventory, setInventory] = useState(() =>
    Array.isArray(savedGame.inventory) ? savedGame.inventory : []
  );
  const [gameCount, setGameCount] = useState(() =>
    Number.isFinite(savedGame.gameCount) ? savedGame.gameCount : 0
  );

  // Автоматически сохраняем прогресс после каждого изменения.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ pet, coins, activeTab, petName, inventory, gameCount })
      );
    } catch (error) {
      console.error('Не удалось сохранить прогресс Makuri:', error);
    }
  }, [pet, coins, activeTab, petName, inventory, gameCount]);

  function notify(message) {
    setToast(message);
  }

  function care(action) {
    setPet((current) => {
      const next = { ...current };
      let message = '';

      if (action === 'pet') {
        next.happiness = Math.min(100, current.happiness + 8);
        next.xp += 3;
        message = 'Лунтик мурлычет от счастья! 💗';
      } else if (action === 'feed') {
        next.hunger = Math.min(100, current.hunger + 18);
        next.energy = Math.min(100, current.energy + 3);
        message = 'Ням-ням! Очень вкусно! 🍓';
      } else if (action === 'hug') {
        next.happiness = Math.min(100, current.happiness + 12);
        next.energy = Math.min(100, current.energy + 4);
        next.xp += 5;
        message = 'Крепкие объятия для вас двоих! 🫶';
      } else if (action === 'play') {
        next.happiness = Math.min(100, current.happiness + 10);
        next.energy = Math.max(0, current.energy - 8);
        next.hunger = Math.max(0, current.hunger - 5);
        next.xp += 10;
        message = 'Как весело играть вместе! ✨';
      }

      if (next.xp >= next.level * 100) {
        next.xp -= next.level * 100;
        next.level += 1;
        message = `Ура! Лунтик достиг уровня ${next.level}! 🎉`;
        setCoins((value) => value + 20);
      }

      setToast(message);
      return next;
    });
  }

  function renamePet(event) {
    event.preventDefault();
    const name = newName.trim().slice(0, 18);
    if (!name) return;
    setPetName(name);
    setPet((current) => ({ ...current, name }));
    setNameEditing(false);
    notify(`Теперь нашего питомца зовут ${name}! 💖`);
  }

  function buyItem(item) {
    if (inventory.includes(item)) {
      notify('Этот предмет уже у вас! ✨');
      return;
    }
    if (coins < 30) {
      notify('Пока не хватает монет. Поиграйте с питомцем! 🪙');
      return;
    }
    setCoins((value) => value - 30);
    setInventory((value) => [...value, item]);
    notify(`${item} теперь украшает ваш дом! 🏡`);
  }

  function playMiniGame() {
    const reward = 5 + Math.floor(Math.random() * 11);
    setCoins((value) => value + reward);
    setGameCount((value) => value + 1);
    notify(`Вы нашли ${reward} монет в волшебном шаре! 🪙`);
  }

  return (
    <main className="makuri-app">
      <header className="topbar">
        <button className="brand" onClick={() => setActiveTab('home')}>
          <span className="brand-icon">✿</span>
          <span>
            <strong>Makuri<span className="brand-heart"> ♥</span></strong>
            <small>Твой цифровой мир ♡</small>
          </span>
        </button>

        <div className="wallet">
          <div className="wallet-item">
            <span className="gem-icon">◆</span>{gems}
          </div>
          <div className="wallet-item">
            <span className="coin-icon">◉</span>{coins}
          </div>
          <button
            className="settings-shortcut"
            onClick={() => setActiveTab('settings')}
            aria-label="Настройки"
          >
            ⚙
          </button>
        </div>
      </header>

      <div className="game-layout">
        <aside className="pet-panel">
          <div className="pet-summary">
            <div className="pet-avatar">
              <Creature onClick={() => care('pet')} />
            </div>
            <div className="pet-summary-info">
              <strong>{petName}</strong>
              <span>Уровень {pet.level}</span>
              <div className="xp-row">
                <div className="xp-track">
                  <div
                    className="xp-fill"
                    style={{ width: `${pet.xp}%` }}
                  />
                </div>
                <small>{pet.xp} / 100</small>
              </div>
            </div>
          </div>

          <div className="pet-stats">
            <StatBar icon="♥" label="Счастье" value={pet.happiness} color="pink" />
            <StatBar icon="♜" label="Голод" value={pet.hunger} color="gold" />
            <StatBar icon="✦" label="Энергия" value={pet.energy} color="blue" />
          </div>

          <div className="bond-card">
            <span className="bond-icon">♡</span>
            <div>
              <strong>Ваша связь</strong>
              <p>Растите вместе каждый день</p>
            </div>
          </div>
        </aside>

        <section className="world-area">
          <div className="world-heading">
            <span className="world-kicker">✦ ВАШ МАЛЕНЬКИЙ МИР ✦</span>
            <h1>{activeTab === 'home' ? 'Наш уютный дом' : tabs.find((tab) => tab.id === activeTab)?.label}</h1>
            <p>Место, где растёт ваша история.</p>
          </div>

          {activeTab === 'home' && (
            <>
              <div className="room-wrap">
                <Room />
                <div className="room-pet">
                  <Creature happy={pet.happiness > 80} onClick={() => care('pet')} />
                </div>
                <div className="pet-speech">
                  <span>♥</span> {toast || `${petName} рад(а), что вы дома!`}
                </div>
                <div className="room-hint">✧ Нажми на питомца, чтобы погладить ✧</div>
              </div>

              <div className="quick-actions">
                <button onClick={() => care('feed')}>
                  <span>🍓</span><strong>Покормить</strong>
                </button>
                <button onClick={() => care('hug')}>
                  <span>💗</span><strong>Обнять</strong>
                </button>
                <button onClick={() => care('play')}>
                  <span>🪄</span><strong>Играть</strong>
                </button>
              </div>
            </>
          )}

          {activeTab === 'pet' && (
            <div className="feature-card pet-detail">
              <div className="detail-creature">
                <Creature happy={pet.happiness > 80} onClick={() => care('pet')} />
              </div>
              <span className="world-kicker">ВАШ ВОЛШЕБНЫЙ ДРУГ</span>
              {nameEditing ? (
                <form className="rename-form" onSubmit={renamePet}>
                  <input value={newName} onChange={(e) => setNewName(e.target.value)} maxLength={18} autoFocus />
                  <button className="pixel-button" type="submit">Сохранить</button>
                </form>
              ) : (
                <>
                  <h2>{petName}</h2>
                  <p>Маленькое существо, которое растёт от вашей заботы.</p>
                  <button className="pixel-button" onClick={() => { setNewName(petName); setNameEditing(true); }}>
                    ✎ Изменить имя
                  </button>
                </>
              )}
              <div className="detail-stats">
                <StatBar icon="♥" label="Счастье" value={pet.happiness} color="pink" />
                <StatBar icon="♜" label="Голод" value={pet.hunger} color="gold" />
                <StatBar icon="✦" label="Энергия" value={pet.energy} color="blue" />
              </div>
              <div className="quick-actions">
                <button onClick={() => care('feed')}><span>🍓</span><strong>Покормить</strong></button>
                <button onClick={() => care('hug')}><span>💗</span><strong>Обнять</strong></button>
              </div>
            </div>
          )}

          {activeTab === 'games' && (
            <div className="feature-card">
              <div className="feature-illustration">🔮</div>
              <span className="world-kicker">МАЛЕНЬКАЯ ИГРА</span>
              <h2>Волшебный шар</h2>
              <p>Ищите спрятанные монетки вместе. Каждая игра приносит небольшой сюрприз.</p>
              <div className="game-reward">🪙 Награда: 5–15 монет</div>
              <button className="pixel-button" onClick={playMiniGame}>Открыть шар ✨</button>
              <p className="muted-note">Сыграно игр: {gameCount}</p>
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="feature-card">
              <div className="feature-illustration">🛍️</div>
              <span className="world-kicker">УЮТНЫЕ МЕЛОЧИ</span>
              <h2>Магазин дома</h2>
              <p>Покупайте первые украшения за монетки, найденные во время игр.</p>
              <div className="shop-items">
                {[
                  { name: 'Волшебный цветок', icon: '🌸' },
                  { name: 'Маленькая лампа', icon: '🏮' },
                  { name: 'Звёздная подушка', icon: '🌟' },
                ].map((item) => (
                  <div className="shop-item" key={item.name}>
                    <span>{item.icon}</span>
                    <strong>{item.name}</strong>
                    <small>30 🪙</small>
                    <button onClick={() => buyItem(item.name)}>
                      {inventory.includes(item.name) ? 'Куплено ✓' : 'Купить'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'travel' && (
            <div className="feature-card">
              <div className="feature-illustration">🏝️</div>
              <span className="world-kicker">ЗА ГОРИЗОНТОМ</span>
              <h2>Парящие острова</h2>
              <p>Впереди новые места, тайные тропинки и воспоминания для вашей пары.</p>
              <div className="locked-location">
                <span>🌙</span>
                <div><strong>Лунная долина</strong><small>Скоро откроется</small></div>
                <span>🔒</span>
              </div>
              <div className="locked-location">
                <span>🌷</span>
                <div><strong>Сад светлячков</strong><small>Скоро откроется</small></div>
                <span>🔒</span>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="feature-card">
              <div className="feature-illustration">⚙️</div>
              <span className="world-kicker">ВАШ МИР — ВАШИ ПРАВИЛА</span>
              <h2>Настройки</h2>
              <p>Прогресс сохраняется автоматически в этом браузере. При следующем открытии ваши монеты, питомец и покупки останутся с вами.</p>
              <button className="pixel-button" onClick={() => { setNewName(petName); setNameEditing(true); setActiveTab('pet'); }}>
                ✎ Имя питомца
              </button>
              <div className="settings-note">Версия Makuri · Demo 0.1</div>
            </div>
          )}
        </section>

        <aside className="right-panel">
          <div className="notification-card">
            <span className="notification-heart">♥</span>
            <div>
              <strong>{petName} чувствует себя {pet.happiness > 65 ? 'отлично' : 'немного грустно'}!</strong>
              <p>{pet.happiness > 65 ? 'Поиграй с ним, чтобы он был ещё счастливее!' : 'Подарите ему немного любви и внимания.'} 💜</p>
            </div>
          </div>
          <div className="daily-card">
            <span className="daily-sparkle">✦</span>
            <strong>Маленький момент</strong>
            <p>Даже самый большой мир начинается с маленького «мы».</p>
            <span className="daily-heart">♡</span>
          </div>
          <div className="inventory-card">
            <span>🎁</span>
            <div>
              <strong>Коллекция</strong>
              <p>{inventory.length} предметов найдено</p>
            </div>
          </div>
        </aside>
      </div>

      <nav className="bottom-nav" aria-label="Навигация">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'nav-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      {toast && (
        <button className="toast-message" onClick={() => setToast('')}>
          {toast} <span>×</span>
        </button>
      )}

      <footer className="game-footer">
        MAKURI · YOUR WORLD, YOUR STORY ♡
      </footer>
    </main>
  );
}

export default App;

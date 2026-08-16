import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(47 * 60 + 23);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [joinError, setJoinError] = useState("");
  const [createRoom, setCreateRoom] = useState(null);
  const [creatorName, setCreatorName] = useState("");
  const [generatedRoomCode, setGeneratedRoomCode] = useState("");
  const [roomCreated, setRoomCreated] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  /*joinModalOpen: Katılma penceresini açıp kapatır.
  playerName: Yazılan oyuncu adını tutar.
  roomCode: Yazılan oda kodunu tutar.
  joinError: Eksik bilgi varsa uyarı gösterir.*/
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 47 * 60 + 23));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const rooms = [
  {
    icon: "🏛️",
    tag: "En popüler",
    title: "Müze Cinayeti",
    image: "/src/assets/muze-cinayeti.png",
    time: "60 dk",
    players: "2–6 oyuncu",
    stars: "★★★★☆",
    difficulty: "Orta",
    description:
      "Ünlü bir koleksiyoncu müzede ölü bulundu. Güvenlik kayıtlarını ve gizli ipuçlarını inceleyerek katili bulmalısınız.",
  },
  {
    icon: "🚀",
    tag: "Yeni",
    title: "Uzay İstasyonu",
    image: "/src/assets/uzay-istasyonu.png",
    time: "75 dk",
    players: "3–8 oyuncu",
    stars: "★★★★★",
    difficulty: "Zor",
    description:
      "Uzay istasyonunun sistemleri arızalandı. Oksijen tükenmeden enerji sistemini onarmalı ve Dünya ile bağlantı kurmalısınız.",
  },
  {
    icon: "🌙",
    tag: "Çok zor",
    title: "Vampir Şatosu",
    image: "/src/assets/vampir-satosu.png",
    time: "90 dk",
    players: "2–5 oyuncu",
    stars: "★★★★★",
    difficulty: "Çok zor",
    description:
      "Terk edilmiş şatoda uyuyan vampir gün batımında uyanacak. Gizli geçidi bulup şatodan zamanında kaçmalısınız.",
  },
  {
    icon: "🗺️",
    tag: "Kolay",
    title: "Kayıp Hazine",
    image: "/src/assets/kayip-hazine.png",
    time: "45 dk",
    players: "2–4 oyuncu",
    stars: "★★★☆☆",
    difficulty: "Kolay",
    description:
      "Eski bir korsan haritasının parçalarını birleştirin, şifreleri çözün ve kayıp hazineye herkesten önce ulaşın.",
  },
];
const handleJoinRoom = (event) => {
  event.preventDefault();

  if (!playerName.trim() || !roomCode.trim()) {
    setJoinError("Lütfen oyuncu adını ve oda kodunu gir.");
    return;
  }

  if (roomCode.trim().length < 6) {
    setJoinError("Oda kodu en az 6 karakter olmalıdır.");
    return;
  }

  setJoinError("");
  alert(
    `${playerName}, ${roomCode.toUpperCase()} kodlu odaya katılma isteğin alındı!`
  );

  setJoinModalOpen(false);
  setPlayerName("");
  setRoomCode("");
};
const generateRoomCode = (room) => {
  const roomPrefixes = {
    "Müze Cinayeti": "MUZE",
    "Uzay İstasyonu": "UZAY",
    "Vampir Şatosu": "VAMP",
    "Kayıp Hazine": "HAZN",
  };

  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  const prefix = roomPrefixes[room.title] || "ROOM";

  return `${prefix}${randomNumber}`;
};

const openCreateRoomModal = (room) => {
  setSelectedRoom(null);
  setCreateRoom(room);
  setCreatorName("");
  setGeneratedRoomCode(generateRoomCode(room));
  setRoomCreated(false);
  setCopyMessage("");
};

const handleCreateRoom = (event) => {
  event.preventDefault();

  if (!creatorName.trim()) {
    return;
  }

  setRoomCreated(true);
};

const copyRoomCode = async () => {
  try {
    await navigator.clipboard.writeText(generatedRoomCode);
    setCopyMessage("Kod kopyalandı!");
  } catch {
    setCopyMessage("Kod kopyalanamadı.");
  }
};

  return (
    <>
      <nav>
        <div className="logo">
          ESCAPE <span>ROOMS</span>
        </div>

        <ul className="nav-links">
        <li>
          <a href="#ana-sayfa">Ana Sayfa</a>
        </li>

        <li>
          <a href="#odalar">Odalar</a>
        </li>

        <li>
          <a href="#liderlik">Liderlik</a>
        </li>

        <li>
          <a href="#nasil-oynanir">Nasıl Oynanır</a>
        </li>
      </ul>

        <button className="nav-login">Giriş Yap</button>
      </nav>

      <main className="hero" id="ana-sayfa">
        <section className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-white">GİZEMİ ÇÖZ.</span>
            <span className="hero-title-gold">KAÇIŞI TAMAMLA.</span>
          </h1>

          <p>
            Arkadaşlarınla birlikte ipuçlarını keşfet, şifreleri çöz ve süre
            dolmadan odadan kaç.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => {
                setJoinError("");
                setJoinModalOpen(true);
              }}
            >
              👥 Odaya Katıl
            </button>
            <button
              className="secondary-btn"
              onClick={() =>
                document
                  .getElementById("nasil-oynanir")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              ▷ Nasıl Oynanır?
            </button>
          </div>
        </section>

        <section className="rooms-section compact" id="odalar">
          <p className="section-label">🏆 POPÜLER ODALAR</p>

          <div className="rooms-grid">
            {rooms.map((room) => (
              <div className="room-card" key={room.title}>
                <div
                  className="room-image"
                  style={{ backgroundImage: `url(${room.image})` }}
                ></div>

                <h3>{room.title}</h3>

                <div className="room-meta">
                  <span>🕒 {room.time}</span>
                  <span>👥 {room.players}</span>
                </div>

                <div className="stars">
                  <span className="difficulty-text">Zorluk:</span>
                  <span className="star-text">{room.stars}</span>
                </div>

                <button onClick={() => setSelectedRoom(room)}>Detay</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <section className="stats">
        <div>
          <strong>4</strong>
          <p>Farklı senaryo</p>
        </div>

        <div>
          <strong>45–90 dk</strong>
          <p>Oyun süresi</p>
        </div>

        <div>
          <strong>2–8</strong>
          <p>Oyuncu kapasitesi</p>
        </div>

        <div>
          <strong>3</strong>
          <p>Zorluk seviyesi</p>
        </div>
      </section>
      <section className="rooms-section">
        <p className="section-label">Popüler odalar</p>
        <h2>Hangi gizemi çözeceksin?</h2>

        <div className="rooms-grid">
          {rooms.map((room) => (
            <div className="room-card" key={room.title}>
              <div className="room-icon">{room.icon}</div>
              <span className="room-tag">{room.tag}</span>

              <h3>{room.title}</h3>

              <div className="room-meta">
                <span>🕒 {room.time}</span>
                <span>👥 {room.players}</span>
              </div>

              <div className="stars">{room.stars}</div>

              <button onClick={() => setSelectedRoom(room)}>Detay →</button>
            </div>
          ))}
        </div>
      </section>

      <section className="how-section" id="nasil-oynanir">
        <p className="section-label">Nasıl oynanır</p>
        <h2>Üç adımda başla</h2>

        <div className="steps">
          <div>
            <span>1</span>
            <h3>Oda seç</h3>
            <p>Zorluk seviyene göre istediğin odayı seç.</p>
          </div>

          <div>
            <span>2</span>
            <h3>Arkadaşlarını davet et</h3>
            <p>Oda kodunu paylaş ve arkadaşlarınla aynı lobiye gir.</p>
          </div>

          <div>
            <span>3</span>
            <h3>İpuçlarını çöz</h3>
            <p>Şifreleri bul, kapıyı aç ve süre dolmadan kaç.</p>
          </div>
        </div>
      </section>
{selectedRoom && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedRoom(null)}
  >
    <div
      className="room-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setSelectedRoom(null)}
        aria-label="Pencereyi kapat"
      >
        ×
      </button>

      <div
        className="modal-image"
        style={{ backgroundImage: `url(${selectedRoom.image})` }}
      />

      <div className="modal-content">
        <span className="modal-tag">{selectedRoom.tag}</span>

        <h2>{selectedRoom.title}</h2>

        <p className="modal-description">
          {selectedRoom.description}
        </p>

        <div className="modal-details">
          <div>
            <span>Süre</span>
            <strong>🕒 {selectedRoom.time}</strong>
          </div>

          <div>
            <span>Oyuncu</span>
            <strong>👥 {selectedRoom.players}</strong>
          </div>

          <div>
            <span>Zorluk</span>
            <strong>{selectedRoom.difficulty}</strong>
          </div>
        </div>

        <div className="modal-stars">{selectedRoom.stars}</div>

        <button
          className="create-room-btn"
          onClick={() => openCreateRoomModal(selectedRoom)}
        >
          Bu Odayı Seç
        </button>
      </div>
    </div>
  </div>
)}
{joinModalOpen && (
  <div
    className="modal-overlay"
    onClick={() => setJoinModalOpen(false)}
  >
    <div
      className="join-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setJoinModalOpen(false)}
        aria-label="Pencereyi kapat"
      >
        ×
      </button>

      <div className="join-modal-header">
        <span>ÇOK OYUNCULU OYUN</span>
        <h2>Odaya Katıl</h2>
        <p>
          Arkadaşının paylaştığı oda kodunu girerek lobiye katıl.
        </p>
      </div>

      <form className="join-form" onSubmit={handleJoinRoom}>
        <label htmlFor="player-name">Oyuncu adı</label>

        <input
          id="player-name"
          type="text"
          placeholder="İlayda"
          value={playerName}
          onChange={(event) => setPlayerName(event.target.value)}
          autoComplete="off"
        />

        <label htmlFor="room-code">Oda kodu</label>

        <input
          id="room-code"
          className="room-code-input"
          type="text"
          placeholder="Örneğin: MUSE42"
          value={roomCode}
          maxLength={8}
          onChange={(event) =>
            setRoomCode(
              event.target.value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "")
            )
          }
          autoComplete="off"
        />

        {joinError && (
          <p className="form-error">{joinError}</p>
        )}

        <button className="join-submit-btn" type="submit">
          Odaya Katıl
        </button>
      </form>

      <p className="join-help">
        Oda kodun yok mu? Önce bir oda seçerek yeni oda oluşturabilirsin.
      </p>
    </div>
  </div>
)}

{createRoom && (
  <div
    className="modal-overlay"
    onClick={() => setCreateRoom(null)}
  >
    <div
      className="create-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="modal-close"
        onClick={() => setCreateRoom(null)}
        aria-label="Pencereyi kapat"
      >
        ×
      </button>

      {!roomCreated ? (
        <>
          <div className="create-modal-header">
            <span>YENİ ODA</span>
            <h2>Oda Oluştur</h2>
            <p>
              Takımını kur ve arkadaşlarını oyuna davet et.
            </p>
          </div>

          <div className="selected-room-summary">
            <div
              className="selected-room-image"
              style={{
                backgroundImage: `url(${createRoom.image})`,
              }}
            />

            <div>
              <span>Seçilen senaryo</span>
              <h3>{createRoom.title}</h3>
              <p>
                🕒 {createRoom.time} · 👥 {createRoom.players}
              </p>
            </div>
          </div>

          <form
            className="create-room-form"
            onSubmit={handleCreateRoom}
          >
            <label htmlFor="creator-name">
              Oda sahibinin adı
            </label>

            <input
              id="creator-name"
              type="text"
              placeholder="Örneğin: İlayda"
              value={creatorName}
              onChange={(event) =>
                setCreatorName(event.target.value)
              }
              autoComplete="off"
            />

            <button type="submit">
              Odayı Oluştur
            </button>
          </form>
        </>
      ) : (
        <div className="room-created">
          <div className="success-icon">✓</div>

          <span>ODA HAZIR</span>
          <h2>{createRoom.title}</h2>

          <p>
            Odan oluşturuldu, {creatorName}! Arkadaşlarının
            katılabilmesi için aşağıdaki kodu paylaş.
          </p>

          <div className="generated-code">
            {generatedRoomCode}
          </div>

          <button
            className="copy-code-btn"
            onClick={copyRoomCode}
          >
            Kodu Kopyala
          </button>

          {copyMessage && (
            <p className="copy-message">{copyMessage}</p>
          )}

          <button
            className="go-lobby-btn"
            onClick={() =>
              alert("Lobi ekranını sonraki aşamada ekleyeceğiz.")
            }
          >
            Lobiye Git
          </button>
        </div>
      )}
    </div>
  </div>
)}
      <footer>© 2026 Escape Rooms. Tüm hakları saklıdır.</footer>
    </>
  );
}

export default App;
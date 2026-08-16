import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(47 * 60 + 23);

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
    },
    {
      icon: "🚀",
      tag: "Yeni",
      title: "Uzay İstasyonu",
      image: "/src/assets/uzay-istasyonu.png",
      time: "75 dk",
      players: "3–8 oyuncu",
      stars: "★★★★★",
    },
    {
      icon: "🌙",
      tag: "Çok zor",
      title: "Vampir Şatosu",
      image: "/src/assets/vampir-satosu.png",
      time: "90 dk",
      players: "2–5 oyuncu",
      stars: "★★★★★",
    },
    {
      icon: "🗺️",
      tag: "Kolay",
      title: "Kayıp Hazine",
      image: "/src/assets/kayip-hazine.png",
      time: "45 dk",
      players: "2–4 oyuncu",
      stars: "★★★☆☆",
    },
  ];

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
            <button className="primary-btn">👥 Odaya Katıl</button>
            <button className="secondary-btn">▷ Nasıl Oynanır?</button>
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

                <button>Detay</button>
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

              <button>Detay →</button>
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

      <footer>© 2026 Escape Rooms. Tüm hakları saklıdır.</footer>
    </>
  );
}

export default App;
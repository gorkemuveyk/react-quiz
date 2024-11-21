import React, { useEffect, useState } from "react";
import { useAppContext } from "./context/AppContext";

const KullaniciBilgileri = ({ setSorulardami }) => {
  const [dateTime, setDateTime] = useState("");
  const [adsoyad, setAdSoyad] = useState("");
  const [yas, setYas] = useState("");
  const [ogretmenAdi, setOgretmenadi] = useState("");

  const [tarih, setTarih] = useState("");
  const { values, updateValues } = useAppContext();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = `${now.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })} / ${now.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}`;
      setDateTime(formattedDateTime);
    };

    // Başlangıç güncellemesi ve her saniyede bir güncelleme
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Bileşen unmount olduğunda interval'i temizle
    return () => clearInterval(interval);
  }, []);

  const sorularaGec = (e) => {
    e.preventDefault();
    setTarih(dateTime);
    if (adsoyad == "") {
      alert("Ad soyad boş olamaz");
      return;
    }
    if (yas == "") {
      alert("Yaş boş olamaz");
      return;
    }
    if (ogretmenAdi == "") {
      alert("Öğretmen adı boş olamaz");
      return;
    }
    updateValues({ adsoyad, yas, ogretmenAdi, dateTime });
    setSorulardami(true);
  };

  return (
    <div className="w-11/12 max-w-[500px] bg-white p-10 text-black rounded shadow">
      <form onSubmit={sorularaGec} className="flex flex-col gap-3">
        <input
          type="text"
          className="border outline-none placeholder:text-gray-600 text-gray-600 border-orange-300 focus:border-orange-500 p-2"
          placeholder="Ad Soyad"
          onChange={(e) => {
            setAdSoyad(e.target.value);
          }}
          value={adsoyad}
        />
        <select
          onChange={(e) => setYas(e.target.value)}
          className="w-full !bg-white !border !outline-none !text-gray-600 !border-orange-300 !focus:border-orange-500 !p-2 appearance-none"
        >
          <option disabled selected>
            Yaşınız
          </option>
          <option value="4-yas">4 Yaş</option>
          <option value="5-yas">5 Yaş</option>
        </select>

        <input
          type="text"
          className="border outline-none placeholder:text-gray-600 text-gray-600 border-orange-300 focus:border-orange-500 p-2"
          placeholder="Öğretmen adı"
          onChange={(e) => {
            setOgretmenadi(e.target.value);
          }}
          value={ogretmenAdi}
        />
        <input
          type="text"
          className="border outline-none placeholder:text-gray-600 text-gray-600 border-orange-300 focus:border-orange-500 p-2"
          value={dateTime}
          readOnly
        />
        <button className="bg-orange-500 p-2 hover:bg-orange-600 transition-colors rounded text-white">
          Başla
        </button>
      </form>
    </div>
  );
};

export default KullaniciBilgileri;

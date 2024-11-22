import React, { useState, useEffect } from "react";
import { useAppContext } from "./context/AppContext";

const CoktanSecmeliSorular = () => {
  const { values, updateValues } = useAppContext();

  const kategoriler = [
    {
      kategori: "1Kategori 1",
      sorular: [
        { id: 1, soru: "Soru 1.1", cevaplar: ["A", "B", "C", "D"], dogru: "A" },
        { id: 2, soru: "Soru 1.2", cevaplar: ["A", "B", "C", "D"], dogru: "B" },
        { id: 3, soru: "Soru 1.3", cevaplar: ["A", "B", "C", "D"], dogru: "C" },
      ],
    },
    {
      kategori: "2Kategori 2",
      sorular: [
        { id: 4, soru: "Soru 2.1", cevaplar: ["A", "B", "C", "D"], dogru: "A" },
        { id: 5, soru: "Soru 2.2", cevaplar: ["A", "B", "C", "D"], dogru: "B" },
        { id: 6, soru: "Soru 2.3", cevaplar: ["A", "B", "C", "D"], dogru: "C" },
      ],
    },
    {
      kategori: "3Kategori 3",
      sorular: [
        { id: 7, soru: "Soru 3.1", cevaplar: ["A", "B", "C", "D"], dogru: "A" },
        { id: 8, soru: "Soru 3.2", cevaplar: ["A", "B", "C", "D"], dogru: "B" },
        { id: 9, soru: "Soru 3.3", cevaplar: ["A", "B", "C", "D"], dogru: "C" },
        {
          id: 9,
          soru: "2Soru 3.3",
          cevaplar: ["A", "B", "C", "D"],
          dogru: "C",
        },
      ],
    },
  ];

  const kategoriler2 = [
    {
      kategori: "2Kategori 1",
      sorular: [
        {
          id: 1,
          soru: "2Soru 1.1",
          cevaplar: ["A", "B", "C", "D"],
          dogru: "A",
        },
        { id: 2, soru: "Soru 1.2", cevaplar: ["A", "B", "C", "D"], dogru: "B" },
        { id: 3, soru: "Soru 1.3", cevaplar: ["A", "B", "C", "D"], dogru: "C" },
      ],
    },
    {
      kategori: "2Kategori 2",
      sorular: [
        {
          id: 4,
          soru: "2Soru 2.1",
          cevaplar: ["A", "B", "C", "D"],
          dogru: "A",
        },
        {
          id: 5,
          soru: "2Soru 2.2",
          cevaplar: ["A", "B", "C", "D"],
          dogru: "B",
        },
        {
          id: 6,
          soru: "2Soru 2.3",
          cevaplar: ["A", "B", "C", "D"],
          dogru: "C",
        },
      ],
    },
    {
      kategori: "2Kategori 3",
      sorular: [
        {
          id: 7,
          soru: "2Soru 3.1",
          cevaplar: ["A", "B", "C", "D"],
          dogru: "A",
        },
        {
          id: 8,
          soru: "2Soru 3.2",
          cevaplar: ["A", "B", "C", "D"],
          dogru: "B",
        },
        {
          id: 9,
          soru: "2Soru 3.3",
          cevaplar: ["A", "B", "C", "D"],
          dogru: "C",
        },
        {
          id: 9,
          soru: "2Soru 3.3",
          cevaplar: ["A", "B", "C", "D"],
          dogru: "C",
        },
      ],
    },
  ];

  const [aktifKategori, setAktifKategori] = useState(0);
  const [aktifSoruIndex, setAktifSoruIndex] = useState(0);
  const [cevaplar, setCevaplar] = useState({});
  const [sureler, setSureler] = useState({
    "Kategori 1": 0,
    "Kategori 2": 0,
    "Kategori 3": 0,
  });
  const [toplamSura, setToplamSura] = useState(0);

  const [baslangicZamani, setBaslangicZamani] = useState(Date.now());

  const aktifSorular =
    values.yas.slice("-")[0] == 4
      ? kategoriler[aktifKategori].sorular
      : kategoriler2[aktifKategori].sorular;
  const aktifSoru = aktifSorular[aktifSoruIndex];

  const handleCevapSec = (cevap) => {
    setCevaplar((prevCevaplar) => {
      const currentCevaplar = prevCevaplar[aktifSoru.id] || [];

      // Toggle the answer: if it's already selected, remove it; if not, add it
      const updatedCevaplar = currentCevaplar.includes(cevap)
        ? currentCevaplar.filter((item) => item !== cevap)
        : [...currentCevaplar, cevap];

      return {
        ...prevCevaplar,
        [aktifSoru.id]: updatedCevaplar,
      };
    });
  };
  const handleIleri = () => {
    if (!cevaplar[aktifSoru.id]) {
      alert("Lütfen bir cevap seçin!");
      return;
    }

    const gecenSure = (Date.now() - baslangicZamani) / 1000;
    setSureler((prev) => ({
      ...prev,
      [kategoriler[aktifKategori].kategori]:
        (prev[kategoriler[aktifKategori].kategori] || 0) + gecenSure,
    }));
    setToplamSura((prev) => prev + gecenSure);
    setBaslangicZamani(Date.now());

    if (aktifSoruIndex < aktifSorular.length - 1) {
      setAktifSoruIndex(aktifSoruIndex + 1);
    } else if (aktifKategori < kategoriler.length - 1) {
      setAktifKategori(aktifKategori + 1);
      setAktifSoruIndex(0);
    }
  };

  const handleGeri = () => {
    if (aktifSoruIndex > 0) {
      setAktifSoruIndex(aktifSoruIndex - 1);
    } else if (aktifKategori > 0) {
      setAktifKategori(aktifKategori - 1);
      setAktifSoruIndex(kategoriler[aktifKategori - 1].sorular.length - 1);
    }
  };

  const sorularBitti =
    aktifKategori === kategoriler.length - 1 &&
    aktifSoruIndex === aktifSorular.length - 1;

  const toplamDogruSayisi = Object.keys(cevaplar).filter(
    (id) =>
      cevaplar[id] ===
      kategoriler
        .flatMap((kat) => kat.sorular)
        .find((soru) => soru.id === parseInt(id)).dogru
  ).length;

  const toplamYanlisSayisi = Object.keys(cevaplar).length - toplamDogruSayisi;

  return (
    <div className="w-11/12 relative max-w-[600px] bg-white py-10 pb-5 px-3 text-black rounded shadow">
      {!sorularBitti ? (
        <>
          <div className="border-b mb-4">
            <span className="absolute left-3 top-3 text-xs font-bold opacity-50">
              Kategori: {kategoriler[aktifKategori].kategori}
            </span>
          </div>

          <div>
            <p className="text-lg font-medium mb-4">{aktifSoru.soru}</p>
            <div className="mt-5 space-y-3">
              {aktifSoru.cevaplar.map((cevap, index) => {
                const isSelected = cevaplar[aktifSoru.id]?.includes(cevap);
                return (
                  <button
                    key={index}
                    className={`w-full p-2 text-sm border rounded-lg transition-all duration-300 
                  ${
                    isSelected
                      ? "bg-orange-100 border-orange-500 text-orange-800"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                    onClick={() => handleCevapSec(cevap)}
                  >
                    {cevap}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between mt-6">
              <button
                className={`p-2 bg-orange-500 text-white rounded ${
                  aktifKategori === 0 && aktifSoruIndex === 0
                    ? "!bg-gray-400 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleGeri}
                disabled={aktifKategori === 0 && aktifSoruIndex === 0}
              >
                Geri
              </button>
              <button
                className="p-2 bg-orange-500 text-white rounded"
                onClick={handleIleri}
              >
                İleri
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Sonuçlar</h2>
          <div className="text-center mb-4">
            <p>
              <strong>Ad Soyad:</strong> {values.adsoyad}
            </p>
            <p>
              <strong>Yaş:</strong> {values.yas.slice("-")[0]}
            </p>
            <p>
              <strong>Öğretmen Adı:</strong> {values.ogretmenAdi}
            </p>
            <p>
              <strong>Tarih:</strong> {values.dateTime}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {kategoriler.map((kategori) => (
              <div
                key={kategori.kategori}
                className="p-4 border rounded-lg shadow hover:shadow-lg transition-all"
              >
                <h3 className="text-md font-semibold mb-2">
                  {kategori.kategori}
                </h3>
                <p className="text-sm mb-1">
                  Doğru:{" "}
                  <span className="font-bold text-green-600">
                    {
                      kategori.sorular.filter(
                        (soru) => cevaplar[soru.id] === soru.dogru
                      ).length
                    }
                  </span>
                </p>
                <p className="text-sm mb-1">
                  Yanlış:{" "}
                  <span className="font-bold text-red-600">
                    {
                      kategori.sorular.filter(
                        (soru) =>
                          cevaplar[soru.id] && cevaplar[soru.id] !== soru.dogru
                      ).length
                    }
                  </span>
                </p>
                <p className="text-sm">
                  Süre:{" "}
                  <span className="font-bold">
                    {sureler[kategori.kategori]
                      ? sureler[kategori.kategori].toFixed(2)
                      : 0}{" "}
                    saniye
                  </span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <p className="text-sm font-medium text-gray-600">
              Toplam Süre:{" "}
              <span className="font-bold text-yellow-600">
                {toplamSura.toFixed(2)} saniye
              </span>
            </p>
            <p className="ml-6 text-sm font-medium text-gray-600">
              Doğru Cevaplar:{" "}
              <span className="font-bold text-green-600">
                {toplamDogruSayisi}
              </span>
            </p>
            <p className="ml-6 text-sm font-medium text-gray-600">
              Yanlış Cevaplar:{" "}
              <span className="font-bold text-red-600">
                {toplamYanlisSayisi}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoktanSecmeliSorular;

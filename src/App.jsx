import { useState } from "react";
import KullaniciBilgileri from "./KullaniciBilgileri";
import { useAppContext } from "./context/AppContext";
import SorularPencere from "./SorularPencere";

function App() {
  const [sorulardaMi, setSorulardami] = useState(true);
  const { values, updateValues } = useAppContext();

  return (
    <div className="flex justify-center items-center h-screen bg-orange-500 text-white">
      {sorulardaMi ? (
        <SorularPencere />
      ) : (
        <KullaniciBilgileri setSorulardami={setSorulardami} />
      )}
    </div>
  );
}

export default App;

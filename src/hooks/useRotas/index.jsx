import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { listarRotas } from "../../services/Rotas";
import useLoadingStore from "../useLoadingStore";
import { toast } from "react-toastify";

const RotasContext = createContext();

export const RotasProvider = ({ children }) => {
  const { setIsLoading } = useLoadingStore();
  const [rotaSelecionada, setRotaSelecionada] = useState(null);
  const [listaRotas, setListaRotas] = useState([]);

  const buscarRotas = async () => {
    try {
      setIsLoading(true);
      const response = await listarRotas();
      setListaRotas(response);
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    buscarRotas();
  }, []);

  const values = useMemo(
    () => ({
      listaRotas,
      setListaRotas,
      rotaSelecionada,
      setRotaSelecionada,
      buscarRotas,
    }),
    [listaRotas, rotaSelecionada]
  );

  return (
    <RotasContext.Provider value={values}>{children}</RotasContext.Provider>
  );
};

export const useRotas = () => useContext(RotasContext);

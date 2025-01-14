import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { listarMotoristas } from "../../services/Motoristas";
import useLoadingStore from "../useLoadingStore";
import { toast } from "react-toastify";

const MotoristasContext = createContext();

export const MotoristasProvider = ({ children }) => {
  const { setIsLoading } = useLoadingStore();
  const [motoristaSelecionada, setMotoristaSelecionada] = useState(null);
  const [listaMotoristas, setListaMotoristas] = useState([]);

  const buscarMotoristas = async () => {
    try {
      setIsLoading(true);
      const response = await listarMotoristas();
      setListaMotoristas(response);
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    buscarMotoristas();
  }, []);

  const values = useMemo(
    () => ({
      listaMotoristas,
      setListaMotoristas,
      motoristaSelecionada,
      setMotoristaSelecionada,
      buscarMotoristas,
    }),
    [listaMotoristas, motoristaSelecionada]
  );

  return (
    <MotoristasContext.Provider value={values}>
      {children}
    </MotoristasContext.Provider>
  );
};

export const useMotoristas = () => useContext(MotoristasContext);

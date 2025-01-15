import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  listarLiquidacoes,
  reabrirLiquidacao,
} from "../../services/Liquidacoes";
import useLoadingStore from "../useLoadingStore";
import { toast } from "react-toastify";

const LiquidacoesContext = createContext();

export const LiquidacoesProvider = ({ children }) => {
  const { setIsLoading } = useLoadingStore();
  const formFiltrosRef = useRef(null);
  const [listaLiquidacoes, setListaLiquidacoes] = useState([]);

  const buscarLiquidacoes = async () => {
    const {
      tipo,
      status,
      dataEmissaoInicial,
      dataEmissaoFinal,
      dataLiberacaoInicial,
      dataLiberacaoFinal,
      rota,
      motorista,
    } = formFiltrosRef.current.getData();

    try {
      setIsLoading(true);
      const response = await listarLiquidacoes(
        tipo ? tipo : 1,
        status ? status : 1,
        dataEmissaoInicial,
        dataEmissaoFinal,
        dataLiberacaoInicial,
        dataLiberacaoFinal,
        rota,
        motorista
      );
      setListaLiquidacoes(response);
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const lidarComReabrirLiquidacao = async (id) => {
    try {
      setIsLoading(true);
      await reabrirLiquidacao(id);
      await buscarLiquidacoes();
      toast.success("Liquidação reaberta com sucesso!");
    } catch (err) {
      toast.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    buscarLiquidacoes();
  }, []);

  const values = useMemo(
    () => ({
      formFiltrosRef,
      listaLiquidacoes,
      setListaLiquidacoes,
      buscarLiquidacoes,
      lidarComReabrirLiquidacao,
    }),
    [listaLiquidacoes]
  );

  return (
    <LiquidacoesContext.Provider value={values}>
      {children}
    </LiquidacoesContext.Provider>
  );
};

export const useLiquidacoes = () => useContext(LiquidacoesContext);

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
  const [liquidacaoSelecionada, setLiquidacaoSelecionada] = useState(null);
  const [listaLiquidacoes, setListaLiquidacoes] = useState([]);

  const buscarLiquidacoes = async () => {
    const formElements = new FormData(formFiltrosRef.current);
    const values = Object.fromEntries(formElements.entries());
    const { tipo, status, dataEmissao, dataLiberacao, rota, motorista } =
      values;
    try {
      setIsLoading(true);
      const response = await listarLiquidacoes(
        tipo ? tipo : 1,
        status ? status : 1,
        dataEmissao,
        dataLiberacao,
        rota,
        motorista
      );
      setListaLiquidacoes(response);
      console.log(listaLiquidacoes);
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
      setLiquidacaoSelecionada,
      liquidacaoSelecionada,
      buscarLiquidacoes,
      lidarComReabrirLiquidacao,
    }),
    [listaLiquidacoes, liquidacaoSelecionada]
  );

  return (
    <LiquidacoesContext.Provider value={values}>
      {children}
    </LiquidacoesContext.Provider>
  );
};

export const useLiquidacoes = () => useContext(LiquidacoesContext);

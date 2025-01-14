import Close from "../../assets/close.svg";
import Search from "../../assets/search.svg";
import CustomizeSelect from "../../components/CustomizeSelect/CustomizeSelect";
import CustomizeCheckbox from "../CustomizeCheckbox/CustomizeCheckbox";
import CustomizeGrid from "../CustomizeGrid/CustomizeGrid";
import CustomizeInput from "../CustomizeInput/CustomizeInput";
import styles from "./Main.module.css";
import undoArrow from "../../assets/undo-arrow.svg";
import { useLiquidacoes } from "../../hooks/useLiquidacoes";
import { useRotas } from "../../hooks/useRotas";
import { useMotoristas } from "../../hooks/useMotoristas";

const Main = () => {
  const { listaMotoristas, setMotorista } = useMotoristas();
  const { listaRotas, setRotaSelecionada } = useRotas();
  const { formFiltrosRef, listaLiquidacoes, lidarComReabrirLiquidacao } =
    useLiquidacoes();

  const tipos = [
    { id: 0, label: "Pré-Venda", value: 1 },
    { id: 1, label: "Pronta-Entrega", value: 2 },
    { id: 2, label: "Balcão", value: 3 },
  ];

  const status = [
    { id: 0, value: 0, name: "Aberta" },
    { id: 1, value: 1, name: "Fechada" },
    { id: 2, value: 2, name: "Ambas" },
  ];

  const gridLiquidacoesDef = [
    {
      headerName: "Ação",
      field: "",
      cellRenderer: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            title="REABRIR LIQUIDAÇÃO" //
            onClick={() => lidarComReabrirLiquidacao(params.data.id)}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              paddingTop: 5,
            }}
          >
            <img
              src={undoArrow}
              alt="Reabrir"
              style={{ width: 20, height: 20 }}
            />
          </button>
        </div>
      ),
    },
    { headerName: "Código", field: "id" },
    {
      headerName: "Tipo",
      field: "tipo",
      valueFormatter: (params) => {
        const tipoMap = {
          1: "Pré-Venda",
          2: "Pronta-Entrega",
          3: "Balcão",
        };
        return tipoMap[params.value] || params.value;
      },
    },
    { headerName: "Motorista", field: "motorista" },
    { headerName: "Ajudante", field: "ajudante" },
    { headerName: "Emissão", field: "emissao" },
    { headerName: "Saída", field: "saida" },
    { headerName: "Liberação", field: "liberacao" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>REABERTURA LIQUIDAÇÃO</h1>
        <button>
          <img className={styles.close} src={Close} alt="Fechar" />
        </button>
      </div>
      <div className={styles.search_container}>
        <button>
          <img className={styles.search} src={Search} alt="Procurar" />
        </button>
      </div>
      <div className={styles.form_container}>
        <form ref={formFiltrosRef} className={styles.form_sub_container}>
          <CustomizeSelect
            name="rota"
            list={listaRotas}
            readOnly={false}
            label="Rota:"
            isRequired={false}
          />
          <CustomizeSelect
            name="motorista"
            list={listaMotoristas}
            readOnly={false}
            label="Motorista:"
            isRequired={false}
          />
          <CustomizeSelect
            name="tipo"
            list={tipos}
            readOnly={true}
            label="Tipos:"
            isRequired={true}
            defaultValue={tipos[0]}
          />
          <CustomizeCheckbox
            list={status}
            label="Status:"
            name="status"
            allowMultiple={false}
            readOnly={true}
            defaultValue={status[1]}
          />
          <CustomizeInput
            name="dataEmissao"
            label="Data de Emissão:"
            type="date"
            isRequired={false}
            readOnly={false}
          />
          <CustomizeInput
            name="dataLiberacao"
            label="Data de Liberação:"
            type="date"
            isRequired={false}
            readOnly={false}
          />
        </form>
      </div>
      <div className={styles.grid_container}>
        <CustomizeGrid
          rowData={listaLiquidacoes}
          columsData={gridLiquidacoesDef}
        />
      </div>
    </div>
  );
};

export default Main;

import styles from "./CustomizeGrid.module.css";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { useEffect, useState } from "react";
ModuleRegistry.registerModules([AllCommunityModule]);

const CustomizeGrid = ({ columsData, rowData, width, height }) => {
  const [rowDataState, setRowDataState] = useState([]);
  const [colunsDataState, setColunsDataState] = useState([]);

  useEffect(() => {
    setRowDataState(rowData || []);
    setColunsDataState(columsData || []);
  }, [columsData, rowData]);

  const theme = themeQuartz.withParams({
    borderColor: "#c6c3c3",
    accentColor: "purple",
    fontFamily: "Roboto",
  });

  const localeText = {
    noRowsToShow: "Nenhum item para ser exibido",
  };

  const defaultColDef = {
    flex: 1,
  };

  return (
    <div className={styles.grid_container}>
      <AgGridReact
        rowData={rowDataState}
        columnDefs={colunsDataState}
        theme={theme}
        localeText={localeText}
        defaultColDef={defaultColDef}
        enableBrowserTooltips={true}
      />
    </div>
  );
};

export default CustomizeGrid;

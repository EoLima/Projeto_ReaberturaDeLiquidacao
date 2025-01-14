import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { useEffect, useState } from "react";
ModuleRegistry.registerModules([AllCommunityModule]);

const CustomizeGrid = ({ columsData, rowData, width, height, maxHeight }) => {
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
    <div
      style={{
        width: width ? width : "95%",
        height: height ? height : 500,
        maxHeight: maxHeight ? maxHeight : 500,
        margin: 20,
        textTransform: "uppercase",
      }}
    >
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

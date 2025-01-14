import { LiquidacoesProvider } from "./useLiquidacoes";
import { MotoristasProvider } from "./useMotoristas";
import { RotasProvider } from "./useRotas";

const Providers = ({ children }) => (
  <LiquidacoesProvider>
    <RotasProvider>
      <MotoristasProvider>
        {children}
      </MotoristasProvider>
    </RotasProvider>
  </LiquidacoesProvider>
);

export default Providers;

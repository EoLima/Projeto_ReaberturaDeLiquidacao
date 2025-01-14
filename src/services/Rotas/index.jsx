import { mockRotas } from "../../mocks/Rotas";

export const listarRotas = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRotas);
    }, 1000);
  });
};

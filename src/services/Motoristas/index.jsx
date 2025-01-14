import { mockMotoristas } from "../../mocks/Motoristas";

export const listarMotoristas = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMotoristas);
    }, 1000);
  });
};

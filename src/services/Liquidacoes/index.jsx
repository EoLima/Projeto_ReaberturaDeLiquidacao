import { mockLiquidacoes } from "../../mocks/Liquidacoes";

export const listarLiquidacoes = (
  tipo,
  status,
  dataEmissaoInicial,
  dataEmissaoFinal,
  dataLiberacaoInicial,
  dataLiberacaoFinal,
  rota,
  motorista
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const liquidacoes = mockLiquidacoes.filter((liquidacao) => {
        return (
          liquidacao.tipo === Number(tipo) &&
          liquidacao.status === Number(status) &&
          (!dataEmissaoInicial ||
            (liquidacao.emissao >= dataEmissaoInicial &&
              (dataEmissaoFinal
                ? liquidacao.emissao <= dataEmissaoFinal
                : true))) &&
          (!dataLiberacaoInicial ||
            (liquidacao.liberacao >= dataLiberacaoInicial &&
              (dataLiberacaoFinal
                ? liquidacao.liberacao <= dataLiberacaoFinal
                : true))) &&
          (!rota || liquidacao.rota === rota) &&
          (!motorista || liquidacao.id_motorista === motorista)
        );
      });
      resolve(liquidacoes);
    }, 1000);
  });
};

export const reabrirLiquidacao = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const liquidacaoIndex = mockLiquidacoes.findIndex(
        (liquidacao) => liquidacao.id === id
      );
      if (
        liquidacaoIndex !== -1 &&
        mockLiquidacoes[liquidacaoIndex].status === 1
      ) {
        mockLiquidacoes[liquidacaoIndex].status = 0;
        resolve(mockLiquidacoes[liquidacaoIndex]);
      } else if (
        liquidacaoIndex !== -1 &&
        mockLiquidacoes[liquidacaoIndex].status === 0
      ) {
        reject("Liquidação não está fechada!");
      } else {
        reject("Liquidação não encontrada!");
      }
    }, 1000);
  });
};

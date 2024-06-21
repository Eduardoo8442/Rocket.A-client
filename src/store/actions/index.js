export const socket = (novoDado) => {
    return {
      type: 'SOCKET',
      payload: novoDado,
    };
  };
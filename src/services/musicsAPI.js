const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;

/* O arquivo musicsAPI.js contém uma função que faz uma requisição à uma API e retorna os as
músicas de um álbum, ela recebe como parâmetro uma string, que deve ser o id do álbum. O
retorno dessa função, quando encontra as informações, é um array onde o primeiro elemento é
um objeto com informações do álbum e o restante dos elementos são as músicas do álbum.
Atenção: caso não encontre nenhuma informação, a API retornará um array vazio.
 */

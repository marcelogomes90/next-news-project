import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { NewsData, NewsResponse } from '@/interfaces/news';
import { getNews, getNewsById } from './news';

const { getMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
}));

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: getMock,
    })),
  },
}));

const fakeNews: NewsData = {
  id: 10,
  tipo: 'Noticia',
  titulo: 'Titulo teste',
  introducao: 'Intro teste',
  data_publicacao: '2026-01-10 12:00:00',
  produto_id: 1,
  produtos: '',
  editorias: 'Economia',
  imagens: '',
  produtos_relacionados: '',
  destaque: false,
  link: 'https://example.com',
};

describe('news process', () => {
  beforeEach(() => {
    getMock.mockReset();
  });

  it('fetches news list with params', async () => {
    const response: NewsResponse = {
      count: 1,
      page: 1,
      totalPages: 1,
      nextPage: 0,
      previousPage: 0,
      showingFrom: 1,
      showingTo: 1,
      items: [fakeNews],
    };

    getMock.mockResolvedValueOnce({ data: response });

    const result = await getNews({
      busca: 'ibge',
      qtd: 6,
      page: 1,
      introsize: 1500,
    });

    expect(getMock).toHaveBeenCalledWith('/noticias', {
      params: {
        busca: 'ibge',
        qtd: 6,
        page: 1,
        introsize: 1500,
      },
    });
    expect(result).toEqual(response);
  });

  it('returns first item when details endpoint returns array', async () => {
    getMock.mockResolvedValueOnce({ data: [fakeNews] });

    const result = await getNewsById(10);

    expect(getMock).toHaveBeenCalledWith('/noticias/10');
    expect(result).toEqual(fakeNews);
  });

  it('returns first item when details endpoint returns object with items', async () => {
    getMock.mockResolvedValueOnce({
      data: {
        items: [fakeNews],
      },
    });

    const result = await getNewsById(10);

    expect(result).toEqual(fakeNews);
  });

  it('returns object directly when endpoint returns a single item', async () => {
    getMock.mockResolvedValueOnce({ data: fakeNews });

    const result = await getNewsById(10);

    expect(result).toEqual(fakeNews);
  });

  it('returns null on request failure', async () => {
    getMock.mockRejectedValueOnce(new Error('network'));

    const result = await getNewsById(10);

    expect(result).toBeNull();
  });
});

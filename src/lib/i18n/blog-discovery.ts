import type { Locale } from './config';

export interface BlogDiscoveryLabels {
  searchLabel: string;
  searchPlaceholder: string;
  filterLabel: string;
  all: string;
  resultOne: string;
  resultMany: string;
  noMatch: string;
  noMatchDescription: string;
  showAll: string;
  pagination: string;
  previous: string;
  next: string;
  page: string;
  of: string;
  readArticle: string;
}

const labels: Record<Locale, BlogDiscoveryLabels> = {
  en: {
    searchLabel: 'Search the library', searchPlaceholder: 'Try “FBAR”, “FEIE”, or a country',
    filterLabel: 'Filter articles by category', all: 'All', resultOne: 'resource found',
    resultMany: 'resources found', noMatch: 'No exact match',
    noMatchDescription: 'Try a broader phrase or reset the category filter.', showAll: 'Show all resources',
    pagination: 'Blog pagination', previous: 'Previous', next: 'Next', page: 'Page', of: 'of', readArticle: 'Read article',
  },
  es: {
    searchLabel: 'Buscar en la biblioteca', searchPlaceholder: 'Prueba “FBAR”, “FEIE” o un país',
    filterLabel: 'Filtrar artículos por categoría', all: 'Todos', resultOne: 'recurso encontrado',
    resultMany: 'recursos encontrados', noMatch: 'Sin coincidencia exacta',
    noMatchDescription: 'Prueba una frase más amplia o restablece el filtro de categoría.', showAll: 'Mostrar todos los recursos',
    pagination: 'Paginación del blog', previous: 'Anterior', next: 'Siguiente', page: 'Página', of: 'de', readArticle: 'Leer artículo',
  },
  pt: {
    searchLabel: 'Pesquisar na biblioteca', searchPlaceholder: 'Tente “FBAR”, “FEIE” ou um país',
    filterLabel: 'Filtrar artigos por categoria', all: 'Todos', resultOne: 'recurso encontrado',
    resultMany: 'recursos encontrados', noMatch: 'Nenhuma correspondência exata',
    noMatchDescription: 'Tente uma frase mais ampla ou redefina o filtro de categoria.', showAll: 'Mostrar todos os recursos',
    pagination: 'Paginação do blog', previous: 'Anterior', next: 'Próxima', page: 'Página', of: 'de', readArticle: 'Ler artigo',
  },
  fr: {
    searchLabel: 'Rechercher dans la bibliothèque', searchPlaceholder: 'Essayez « FBAR », « FEIE » ou un pays',
    filterLabel: 'Filtrer les articles par catégorie', all: 'Tous', resultOne: 'ressource trouvée',
    resultMany: 'ressources trouvées', noMatch: 'Aucune correspondance exacte',
    noMatchDescription: 'Essayez une expression plus large ou réinitialisez le filtre de catégorie.', showAll: 'Afficher toutes les ressources',
    pagination: 'Pagination du blog', previous: 'Précédent', next: 'Suivant', page: 'Page', of: 'sur', readArticle: 'Lire l’article',
  },
  de: {
    searchLabel: 'Bibliothek durchsuchen', searchPlaceholder: 'Versuchen Sie „FBAR“, „FEIE“ oder ein Land',
    filterLabel: 'Artikel nach Kategorie filtern', all: 'Alle', resultOne: 'Ressource gefunden',
    resultMany: 'Ressourcen gefunden', noMatch: 'Keine genaue Übereinstimmung',
    noMatchDescription: 'Versuchen Sie einen allgemeineren Begriff oder setzen Sie den Kategoriefilter zurück.', showAll: 'Alle Ressourcen anzeigen',
    pagination: 'Blog-Seitennavigation', previous: 'Zurück', next: 'Weiter', page: 'Seite', of: 'von', readArticle: 'Artikel lesen',
  },
  it: {
    searchLabel: 'Cerca nella raccolta', searchPlaceholder: 'Prova “FBAR”, “FEIE” o un paese',
    filterLabel: 'Filtra gli articoli per categoria', all: 'Tutti', resultOne: 'risorsa trovata',
    resultMany: 'risorse trovate', noMatch: 'Nessuna corrispondenza esatta',
    noMatchDescription: 'Prova una frase più ampia o reimposta il filtro della categoria.', showAll: 'Mostra tutte le risorse',
    pagination: 'Paginazione del blog', previous: 'Precedente', next: 'Successiva', page: 'Pagina', of: 'di', readArticle: 'Leggi l’articolo',
  },
  nl: {
    searchLabel: 'Doorzoek de bibliotheek', searchPlaceholder: 'Probeer “FBAR”, “FEIE” of een land',
    filterLabel: 'Filter artikelen op categorie', all: 'Alles', resultOne: 'bron gevonden',
    resultMany: 'bronnen gevonden', noMatch: 'Geen exacte overeenkomst',
    noMatchDescription: 'Probeer een bredere zoekterm of herstel het categoriefilter.', showAll: 'Alle bronnen tonen',
    pagination: 'Blogpaginering', previous: 'Vorige', next: 'Volgende', page: 'Pagina', of: 'van', readArticle: 'Artikel lezen',
  },
  ja: {
    searchLabel: '記事を検索', searchPlaceholder: '「FBAR」「FEIE」または国名で検索',
    filterLabel: 'カテゴリーで記事を絞り込む', all: 'すべて', resultOne: '件の資料が見つかりました',
    resultMany: '件の資料が見つかりました', noMatch: '完全に一致する記事はありません',
    noMatchDescription: 'より広い語句で検索するか、カテゴリーフィルターをリセットしてください。', showAll: 'すべての資料を表示',
    pagination: 'ブログのページ移動', previous: '前へ', next: '次へ', page: 'ページ', of: '/', readArticle: '記事を読む',
  },
  zh: {
    searchLabel: '搜索文章库', searchPlaceholder: '尝试搜索“FBAR”“FEIE”或国家名称',
    filterLabel: '按类别筛选文章', all: '全部', resultOne: '项资源',
    resultMany: '项资源', noMatch: '没有完全匹配的结果',
    noMatchDescription: '请尝试更宽泛的关键词或重置类别筛选。', showAll: '显示全部资源',
    pagination: '博客分页', previous: '上一页', next: '下一页', page: '第', of: '页，共', readArticle: '阅读文章',
  },
};

export function getBlogDiscoveryLabels(locale: Locale): BlogDiscoveryLabels {
  return labels[locale];
}

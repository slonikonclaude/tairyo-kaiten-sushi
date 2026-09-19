/**
 * Отзывы для витрины: 6 испанских и 5 английских, в оригинале и целиком
 * (_data/reviews-selected.json; корпус — Maps hl=es / hl=en, 400 отзывов, 18–19.09.2026).
 * Взяты только оригиналы на языке страницы (без «Traducido por Google»), без обрезки «…»,
 * за последний год. Один 4★ оставлен намеренно (в нём и «algo caro si vas en finde»).
 * Автор — имя и инициал; дата — месяц (Google даёт только «hace N meses»).
 */
export type Review = { id: string; author: string; stars: number; month: string; text: string };

export const reviews: Record<"es" | "en", Review[]> = {
  "es": [
    {
      "id": "Ci9DQUlRQUNvZENodHljRjlvT2pkaGVFOVlVV2RpVDFGNmRYbGZka1V6U1ZsVlVWRRAB",
      "author": "Eli",
      "stars": 5,
      "month": "2026-09",
      "text": "De los mejores bufés asiáticos a los que he ido.\nLas camareras muy amables, el ambiente super acogedor y la comida deliciosa.\nEl tren que te trae las bebidas le da un toque futurista, pero la estética del local es muy tradicional.\nLos precios son los esperados de un bufé.\nY si alguien está dudando en ir porque no le gusta el sushi, que no se preocupe, hay de todo y es imposible no salir lleno."
    },
    {
      "id": "Ci9DQUlRQUNvZENodHljRjlvT2podFFrbG9NelZxWDNocmNHOUVNMmxWVHpWNk5GRRAB",
      "author": "Vic P.",
      "stars": 5,
      "month": "2026-03",
      "text": "Comida de calidad, sushi bastante bueno,buffet de cinta recomendado en pleno centro de valencia. Una de las ventajas que tienen es que a parte de la cinta, puedes pedir lo que sea de la carta, te lo trae un trenecito y te lo incluyen en el buffet, por lo que es una mezcla perfecta entre buffet de cinta y buffet de carta."
    },
    {
      "id": "Ci9DQUlRQUNvZENodHljRjlvT2xWSVVIZHVjR2xSYjI1dGJrbHNaVFozUm1ZNGRuYxAB",
      "author": "Alejandro",
      "stars": 4,
      "month": "2026-02",
      "text": "Muy chulo decorado, a los niños les gustó mucho por el tema de la cinta para ir cogiendo la comida y que la bebida o platos de carta te los sirviera un tren hasta tú mesa. De precio, algo caro si vas en finde o festivo."
    },
    {
      "id": "Ci9DQUlRQUNvZENodHljRjlvT2paT1ZFaFpYemhTY1ZKS0xWcFpWRnBWV2tOU2JtYxAB",
      "author": "Rafa A.",
      "stars": 5,
      "month": "2026-08",
      "text": "Buffet oriental muy original y curioso, cinta con platos de pequeñas cantidades de comida muy variada y vistosa. La comida esta muy buena y el local tiene el ambiente perfecto. Muy buen servicio y atención al detalle. Muy curioso el sistema de trenes que hay para traerte las bebidas. Muy recomendable."
    },
    {
      "id": "Ci9DQUlRQUNvZENodHljRjlvT21RdFFYaENXV00yWW1GNGRXTkVjblo0WnpWMU5VRRAB",
      "author": "Vero G.",
      "stars": 5,
      "month": "2026-06",
      "text": "Estaba todo buenísimo, la atención espectacular. Sin reserva a las 14 un sábado esperamos 15 minutos. Todo un detalle que te sirvan la bebida y la comida especial con los trenes. Y aunque la bebida va a parte merece la pena. Lo disfrutamos mucho tanto mi marido como mi hija y yo. Volveremos."
    },
    {
      "id": "Ci9DQUlRQUNvZENodHljRjlvT25kblkwbElUSFpmU1ZkRllrcGhNVVI0T0RKWlkyYxAB",
      "author": "Estefania M.",
      "stars": 5,
      "month": "2026-08",
      "text": "Un sushi muy original para ir con niños o jóvenes por la cinta, les resulta muy divertido ir cogiendo ellos los platos. Aunq se repiten mucho los platos algunos días.\nTienen carta de cosas pero a veces tardan mucho en traerlo. Recomendable!"
    }
  ],
  "en": [
    {
      "id": "Ci9DQUlRQUNvZENodHljRjlvT2tsRlYxaERYemxsZFY5c2MzbElTVFp5VjFkYU0xRRAB",
      "author": "Bruna V.",
      "stars": 5,
      "month": "2026-09",
      "text": "Words can’t explain how much I love this place. It was my first time on a running sushi restaurant and I must say My expectations were high and I was not disappointed. The price is very fair and the selection and variety of dishes is amazing. Staff is attentive and friendly. You will be seeing me again!"
    },
    {
      "id": "Ci9DQUlRQUNvZENodHljRjlvT2tRNE5tZFdSa0V5WmtGc2NWaHhNVGw0ZGpKSGVIYxAB",
      "author": "Salvatore D.",
      "stars": 5,
      "month": "2026-05",
      "text": "We love this place. So much fun and we love the variety in food. In so many \"all you can eat\" places they fill you up with rice but this place actually gives the option of some sashimi dishes too. Plus the drinks come on a little choo choo train! Cant wait to go back!"
    },
    {
      "id": "Ci9DQUlRQUNvZENodHljRjlvT2w4dGRFNVBibWN6UzBWaWVXMVVNRVpNWmxodVUxRRAB",
      "author": "Amy D.",
      "stars": 5,
      "month": "2026-06",
      "text": "My first time trying this type of restaurant after wanting to do it for a long time and i must say i am so happy i came here.\nAmazing sushi, desserts and service, fun trains and cars bringing your drinks and the prices are really good !"
    },
    {
      "id": "Ci9DQUlRQUNvZENodHljRjlvT20wemVtUkpjVEp5UVU1Q2QyOWpUbkJxYlhWdFJHYxAB",
      "author": "Ferran",
      "stars": 5,
      "month": "2026-03",
      "text": "Tairyo Kaiten Sushi is a fun, casual conveyor-belt sushi restaurant where you grab whatever looks good as it passes by.  Quality is solid for the price —  fresh and satisfying."
    },
    {
      "id": "Ci9DQUlRQUNvZENodHljRjlvT2pkb09IRnZZM2hIWTNwRU1XTnBabGxxWkhaS1oyYxAB",
      "author": "Svetlana E.",
      "stars": 5,
      "month": "2025-11",
      "text": "A wonderful place. Very tasty, the seafood is fresh, and the desserts are interesting. Good concept and cute little trains. We recommend it!"
    }
  ]
};

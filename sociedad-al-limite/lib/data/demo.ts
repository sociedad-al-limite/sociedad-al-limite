// CONTENIDO DE DEMOSTRACIÓN — se usa cuando no hay base de datos ni APIs configuradas.
// Ninguna de estas noticias describe hechos reales. Los nombres de personas son ficticios.
// "h" = horas desde la publicación (para que la demo siempre parezca reciente).

export const DEMO_CATEGORIES = {
  "nacional": {
    "name": "Nacional",
    "desc": "Lo que pasa en República Dominicana."
  },
  "local": {
    "name": "Locales",
    "desc": "Noticias de Consuelo, San Pedro de Macorís y otras comunidades."
  },
  "politica": {
    "name": "Política",
    "desc": "Noticias y acontecimientos políticos."
  },
  "sociedad": {
    "name": "Sociedad",
    "desc": "Historias y acontecimientos sociales."
  },
  "educacion": {
    "name": "Educación",
    "desc": "Noticias relacionadas con educación."
  },
  "religion": {
    "name": "Religión",
    "desc": "Actualidad y debates religiosos."
  },
  "entrevistas": {
    "name": "Entrevistas",
    "desc": "Entrevistas exclusivas de Sociedad al Límite."
  },
  "opinion": {
    "name": "Opinión",
    "desc": "Análisis y comentarios."
  },
  "denuncias": {
    "name": "Denuncias",
    "desc": "Situaciones comunitarias y denuncias ciudadanas."
  }
} as const;

export const DEMO_NEWS = [
  {
    "id": 1,
    "slug": "vaguada-alerta-provincias",
    "cat": "nacional",
    "type": "noticia",
    "featured": true,
    "developing": true,
    "priority": 3,
    "h": 1.2,
    "title": "Vaguada mantiene a varias provincias en alerta; autoridades piden precaución",
    "sub": "Los organismos de emergencia recomiendan evitar cruzar ríos y cañadas mientras continúen las lluvias.",
    "summary": "Las lluvias de las últimas horas provocaron acumulaciones en zonas bajas. Los organismos de socorro mantienen equipos desplegados y piden seguir solo información oficial.",
    "body": [
      "Las lluvias asociadas a una vaguada mantienen en alerta a varias provincias del país, de acuerdo con los avisos publicados por los organismos de emergencia. En el este, residentes de zonas bajas reportaron acumulación de agua en calles y patios.",
      "Los equipos de socorro recomendaron no cruzar ríos, arroyos ni cañadas con corriente, y pidieron a la población mantenerse informada únicamente por canales oficiales.",
      "Sociedad al Límite seguirá actualizando esta información a medida que se publiquen nuevos boletines. Esta noticia está en desarrollo."
    ],
    "author": "Redacción SAL (demo)",
    "places": [
      "San Pedro de Macorís",
      "Consuelo"
    ],
    "tags": [
      "lluvias",
      "emergencia",
      "clima"
    ],
    "views": 18420,
    "video": 1
  },
  {
    "id": 2,
    "slug": "consuelo-calles-lluvias",
    "cat": "denuncias",
    "type": "denuncia",
    "status": "no-confirmado",
    "priority": 3,
    "h": 3.5,
    "title": "Residentes de Consuelo piden reparación de calles tras las lluvias",
    "sub": "Vecinos afirman que los hoyos dificultan el paso de vehículos y peatones.",
    "summary": "Un grupo de residentes contactó a Sociedad al Límite para denunciar el estado de varias calles. Las autoridades municipales no habían respondido al cierre de esta publicación.",
    "body": [
      "Un grupo de residentes de Consuelo contactó a Sociedad al Límite para denunciar el deterioro de varias calles del municipio tras las lluvias recientes.",
      "Según los vecinos, los hoyos dificultan el paso de motores, vehículos y peatones, especialmente en horas de la noche. Las fotografías compartidas por los residentes no han sido verificadas de forma independiente.",
      "Sociedad al Límite solicitó una reacción a las autoridades municipales. Al cierre de esta publicación no se había recibido respuesta. Actualizaremos esta nota si la recibimos."
    ],
    "author": "Equipo de Denuncias (demo)",
    "places": [
      "Consuelo"
    ],
    "tags": [
      "calles",
      "ayuntamiento",
      "comunidad"
    ],
    "views": 12960
  },
  {
    "id": 3,
    "slug": "spm-limpieza-malecon",
    "cat": "local",
    "type": "noticia",
    "priority": 2,
    "h": 5,
    "title": "San Pedro de Macorís prepara jornada de limpieza en el malecón",
    "sub": "Voluntarios, juntas de vecinos y estudiantes participarán el próximo sábado.",
    "summary": "La jornada iniciará a las 7:00 a. m. y busca recoger desechos plásticos de la orilla. Los organizadores invitan a llevar guantes y agua.",
    "body": [
      "Organizaciones comunitarias de San Pedro de Macorís convocaron una jornada de limpieza en el malecón para el próximo sábado a partir de las 7:00 de la mañana.",
      "Los organizadores explicaron que la actividad busca recoger desechos plásticos acumulados en la orilla y concienciar sobre el cuidado de la costa.",
      "Las personas interesadas pueden presentarse en el punto de encuentro con guantes, gorra y agua."
    ],
    "author": "Redacción Local (demo)",
    "places": [
      "San Pedro de Macorís"
    ],
    "tags": [
      "medio ambiente",
      "voluntariado",
      "malecón"
    ],
    "views": 7310
  },
  {
    "id": 4,
    "slug": "concejo-presupuesto-participativo",
    "cat": "politica",
    "type": "noticia",
    "priority": 2,
    "h": 7,
    "title": "Concejo municipal discute presupuesto participativo para 2027",
    "sub": "Los regidores evaluarán las obras propuestas por las juntas de vecinos.",
    "summary": "La sesión incluirá la presentación de propuestas comunitarias. Las juntas de vecinos piden que se prioricen calles, alumbrado y drenaje.",
    "body": [
      "El concejo municipal inició la discusión del presupuesto participativo correspondiente a 2027, en una sesión abierta a las juntas de vecinos.",
      "Las organizaciones comunitarias presentaron propuestas enfocadas en reparación de calles, alumbrado público y drenaje pluvial.",
      "La aprobación final está prevista para las próximas semanas, según el calendario presentado en la sesión."
    ],
    "author": "Redacción Política (demo)",
    "places": [
      "San Pedro de Macorís"
    ],
    "tags": [
      "presupuesto",
      "concejo",
      "juntas de vecinos"
    ],
    "views": 5120
  },
  {
    "id": 5,
    "slug": "escuelas-consuelo-materiales",
    "cat": "educacion",
    "type": "noticia",
    "priority": 1,
    "h": 9,
    "title": "Escuelas de Consuelo reciben materiales para el año escolar",
    "sub": "Docentes valoran la entrega, aunque piden reforzar el mantenimiento de las aulas.",
    "summary": "La entrega incluye cuadernos, pupitres y material didáctico. Directores señalan que algunas aulas aún necesitan reparaciones.",
    "body": [
      "Varios centros educativos de Consuelo recibieron cuadernos, pupitres y material didáctico como parte del inicio del año escolar.",
      "Directores consultados por Sociedad al Límite valoraron la entrega, pero indicaron que algunas aulas todavía necesitan reparaciones en techos y ventanas.",
      "Las familias pueden consultar en cada centro el calendario de entrega de libros."
    ],
    "author": "Redacción Educación (demo)",
    "places": [
      "Consuelo"
    ],
    "tags": [
      "escuelas",
      "año escolar",
      "docentes"
    ],
    "views": 6440
  },
  {
    "id": 6,
    "slug": "encuentro-interreligioso-paz",
    "cat": "religion",
    "type": "noticia",
    "priority": 1,
    "h": 13,
    "title": "Iglesias de la provincia organizan encuentro interreligioso por la paz",
    "sub": "Líderes de distintas congregaciones compartirán un espacio de oración y diálogo.",
    "summary": "El encuentro reunirá a congregaciones católicas y evangélicas. Los organizadores lo presentan como un llamado a la convivencia.",
    "body": [
      "Congregaciones católicas y evangélicas de la provincia anunciaron un encuentro de oración y diálogo por la paz y la convivencia comunitaria.",
      "Los organizadores explicaron que la actividad estará abierta al público y tendrá un espacio para jóvenes.",
      "El evento se realizará en un parque céntrico; la fecha exacta será confirmada por las iglesias participantes."
    ],
    "author": "Redacción (demo)",
    "places": [
      "San Pedro de Macorís"
    ],
    "tags": [
      "iglesias",
      "paz",
      "comunidad"
    ],
    "views": 3980
  },
  {
    "id": 7,
    "slug": "opinion-respuestas-claras",
    "cat": "opinion",
    "type": "opinion",
    "priority": 1,
    "h": 16,
    "title": "La comunidad merece respuestas claras",
    "sub": "Una columna sobre la importancia de rendir cuentas a nivel municipal.",
    "summary": "El autor sostiene que la transparencia en las obras municipales debe ser una práctica habitual y no una excepción.",
    "body": [
      "En cada comunidad hay preguntas que se repiten: cuándo empieza una obra, cuánto cuesta y quién la supervisa. Responderlas con claridad no debería ser un favor, sino una práctica habitual.",
      "La rendición de cuentas fortalece la confianza. Publicar avances, presupuestos y cronogramas ayuda a que la ciudadanía participe con información y no con rumores.",
      "Las cosas como son: una comunidad informada es una comunidad que exige mejor."
    ],
    "author": "Columnista invitado (demo)",
    "places": [],
    "tags": [
      "transparencia",
      "municipios"
    ],
    "views": 4410
  },
  {
    "id": 8,
    "slug": "biblioteca-comunitaria-jovenes",
    "cat": "sociedad",
    "type": "noticia",
    "priority": 2,
    "h": 20,
    "title": "Jóvenes de San Pedro crean biblioteca comunitaria en su barrio",
    "sub": "El espacio funciona con libros donados y ofrece tutorías los sábados.",
    "summary": "Un grupo de jóvenes habilitó un local con libros donados. Ya cuentan con más de 600 ejemplares y piden más voluntarios.",
    "body": [
      "Un grupo de jóvenes de San Pedro de Macorís habilitó una biblioteca comunitaria en un local prestado por una junta de vecinos.",
      "El espacio cuenta con más de 600 libros donados y ofrece tutorías gratuitas los sábados para estudiantes de primaria y secundaria.",
      "Los organizadores buscan voluntarios y donaciones de libros en buen estado."
    ],
    "author": "Redacción Sociedad (demo)",
    "places": [
      "San Pedro de Macorís"
    ],
    "tags": [
      "jóvenes",
      "lectura",
      "voluntariado"
    ],
    "views": 9020
  },
  {
    "id": 9,
    "slug": "entrevista-agua-potable-consuelo",
    "cat": "entrevistas",
    "type": "entrevista",
    "priority": 2,
    "h": 26,
    "title": "Líder comunitario habla sobre el agua potable en Consuelo",
    "sub": "Conversamos sobre el servicio de agua en varios sectores del municipio.",
    "summary": "En entrevista con Sociedad al Límite, el dirigente describió la situación del servicio en su sector y las gestiones realizadas por los vecinos.",
    "body": [
      "En entrevista con Sociedad al Límite, el dirigente comunitario Rafael Méndez (nombre ficticio) describió la situación del servicio de agua potable en su sector.",
      {
        "quote": "Los vecinos llevamos meses organizándonos para que el agua llegue de forma regular.",
        "cite": "Rafael Méndez (ficticio), dirigente comunitario — declaración"
      },
      "Méndez afirmó que la junta de vecinos ha enviado comunicaciones a las autoridades correspondientes. Sociedad al Límite no ha verificado de forma independiente los plazos mencionados en la entrevista.",
      "La entrevista completa está disponible en nuestro canal de YouTube."
    ],
    "author": "Sociedad al Límite (demo)",
    "places": [
      "Consuelo"
    ],
    "tags": [
      "agua",
      "entrevista",
      "servicios"
    ],
    "views": 8850,
    "video": 2
  },
  {
    "id": 10,
    "slug": "vecinos-alumbrado-sector",
    "cat": "denuncias",
    "type": "denuncia",
    "status": "no-confirmado",
    "priority": 2,
    "h": 30,
    "title": "Vecinos denuncian falta de alumbrado en un sector de San Pedro",
    "sub": "Residentes dicen sentirse inseguros al regresar a sus casas de noche.",
    "summary": "Residentes reportaron a Sociedad al Límite que varias lámparas están apagadas. La información no ha sido confirmada por la empresa distribuidora.",
    "body": [
      "Residentes de un sector de San Pedro de Macorís informaron a Sociedad al Límite que varias lámparas del alumbrado público permanecen apagadas.",
      "Los vecinos afirman sentirse inseguros al regresar a sus hogares en horas de la noche. Esta información corresponde a una denuncia ciudadana y no ha sido confirmada por la empresa distribuidora.",
      "Sociedad al Límite solicitó información a las autoridades responsables y publicará su respuesta."
    ],
    "author": "Equipo de Denuncias (demo)",
    "places": [
      "San Pedro de Macorís"
    ],
    "tags": [
      "alumbrado",
      "seguridad"
    ],
    "views": 6020
  },
  {
    "id": 11,
    "slug": "operativo-salud-zonas-afectadas",
    "cat": "nacional",
    "type": "noticia",
    "priority": 2,
    "h": 34,
    "title": "Anuncian operativo de salud en zonas afectadas por las lluvias",
    "sub": "Incluirá vacunación, consultas generales y orientación sobre el agua de consumo.",
    "summary": "Las jornadas de salud se realizarán en comunidades con acumulación de agua. Se recomienda hervir o clorar el agua de consumo.",
    "body": [
      "Las autoridades de salud anunciaron jornadas de atención en comunidades afectadas por las lluvias recientes.",
      "Las jornadas incluirán vacunación, consultas generales y orientación sobre el manejo del agua de consumo.",
      "Se recomienda a la población hervir o clorar el agua y eliminar recipientes con agua estancada."
    ],
    "author": "Redacción SAL (demo)",
    "places": [
      "San Pedro de Macorís",
      "Consuelo"
    ],
    "tags": [
      "salud",
      "lluvias"
    ],
    "views": 7560
  },
  {
    "id": 12,
    "slug": "feria-artesanal-consuelo",
    "cat": "local",
    "type": "noticia",
    "priority": 1,
    "h": 40,
    "title": "Feria artesanal reúne emprendedores en el parque de Consuelo",
    "sub": "Más de 30 emprendedores locales ofrecieron artesanías, dulces y productos agrícolas.",
    "summary": "La feria contó con música en vivo y talleres para niños. Los organizadores planean repetirla cada mes.",
    "body": [
      "El parque central de Consuelo acogió una feria artesanal con más de 30 emprendedores locales.",
      "Los asistentes encontraron artesanías, dulces típicos y productos agrícolas, además de música en vivo y talleres para niños.",
      "Los organizadores anunciaron que esperan repetir la actividad cada mes."
    ],
    "author": "Redacción Local (demo)",
    "places": [
      "Consuelo"
    ],
    "tags": [
      "emprendedores",
      "cultura",
      "feria"
    ],
    "views": 5390
  },
  {
    "id": 13,
    "slug": "regidor-obras-acueducto",
    "cat": "politica",
    "type": "declaracion",
    "priority": 1,
    "h": 47,
    "title": "Regidor afirma que obras del acueducto avanzan; vecinos esperan resultados",
    "sub": "El funcionario aseguró que los trabajos concluirán este año.",
    "summary": "Según declaraciones de un regidor, la obra avanza según lo previsto. Vecinos consultados dicen que todavía no ven mejoras en el servicio.",
    "body": [
      {
        "quote": "Los trabajos avanzan y esperamos concluir antes de fin de año.",
        "cite": "Regidor municipal (ficticio) — declaración"
      },
      "La afirmación corresponde a una declaración del funcionario y no a una verificación de Sociedad al Límite.",
      "Vecinos consultados indicaron que todavía no perciben mejoras en el servicio de agua. Sociedad al Límite solicitó el cronograma oficial de la obra."
    ],
    "author": "Redacción Política (demo)",
    "places": [
      "Consuelo"
    ],
    "tags": [
      "acueducto",
      "agua",
      "obras"
    ],
    "views": 4870
  },
  {
    "id": 14,
    "slug": "universidad-becas-convocatoria",
    "cat": "educacion",
    "type": "noticia",
    "priority": 1,
    "h": 56,
    "title": "Universidad regional abre convocatoria de becas",
    "sub": "Los estudiantes interesados pueden aplicar durante las próximas tres semanas.",
    "summary": "La convocatoria incluye becas completas y parciales para carreras de grado. Los requisitos están disponibles en la institución.",
    "body": [
      "Una universidad de la región abrió su convocatoria de becas completas y parciales para carreras de grado.",
      "Los estudiantes interesados deben presentar récord de notas, carta de motivación y documentos de identidad.",
      "La convocatoria estará abierta durante las próximas tres semanas."
    ],
    "author": "Redacción Educación (demo)",
    "places": [
      "San Pedro de Macorís"
    ],
    "tags": [
      "becas",
      "universidad",
      "estudiantes"
    ],
    "views": 6210
  }
];

export const DEMO_VIDEOS = [
  {
    "id": 1,
    "title": "Lluvias en el este: lo que sabemos hasta ahora",
    "h": 2,
    "dur": "12:48",
    "views": 15400,
    "cat": "nacional"
  },
  {
    "id": 2,
    "title": "ENTREVISTA | El agua potable en Consuelo",
    "h": 25,
    "dur": "34:10",
    "views": 9800,
    "cat": "entrevistas"
  },
  {
    "id": 3,
    "title": "Al Límite: el debate de la semana",
    "h": 50,
    "dur": "58:22",
    "views": 21300,
    "cat": "opinion"
  },
  {
    "id": 4,
    "title": "Recorrido por las calles de Consuelo",
    "h": 74,
    "dur": "08:35",
    "views": 7200,
    "cat": "denuncias"
  },
  {
    "id": 5,
    "title": "Jóvenes que leen: la biblioteca del barrio",
    "h": 98,
    "dur": "06:12",
    "views": 5100,
    "cat": "sociedad"
  },
  {
    "id": 6,
    "title": "Presupuesto participativo explicado",
    "h": 122,
    "dur": "14:05",
    "views": 4300,
    "cat": "politica"
  }
];

export const DEMO_INTERVIEWS = [
  {
    "id": 1,
    "name": "Rafael Méndez",
    "role": "Dirigente comunitario",
    "topic": "El agua potable en Consuelo",
    "h": 26,
    "video": 2,
    "news": "entrevista-agua-potable-consuelo"
  },
  {
    "id": 2,
    "name": "Ana Lucía Peña",
    "role": "Docente",
    "topic": "Retos del nuevo año escolar",
    "h": 80,
    "video": null
  },
  {
    "id": 3,
    "name": "Pastor Daniel Ruiz",
    "role": "Líder religioso",
    "topic": "Fe y convivencia en la comunidad",
    "h": 130,
    "video": null
  },
  {
    "id": 4,
    "name": "Carmen Rosario",
    "role": "Emprendedora",
    "topic": "Emprender en San Pedro de Macorís",
    "h": 170,
    "video": null
  }
];

export const DEMO_PODCAST = [
  {
    "ep": 12,
    "title": "Las cosas como son: semana de lluvias y respuestas",
    "dur": "42 min",
    "h": 30
  },
  {
    "ep": 11,
    "title": "¿Qué pasa con las calles de nuestras comunidades?",
    "dur": "38 min",
    "h": 200
  },
  {
    "ep": 10,
    "title": "Juventud, lectura y futuro",
    "dur": "35 min",
    "h": 370
  },
  {
    "ep": 9,
    "title": "Fe, comunidad y debate público",
    "dur": "47 min",
    "h": 540
  }
];

export const DEMO_GALLERY = [
  {
    "cap": "Grabación de entrevista en estudio",
    "cat": "entrevistas"
  },
  {
    "cap": "Jornada comunitaria en Consuelo",
    "cat": "local"
  },
  {
    "cap": "Equipo de Sociedad al Límite en la calle",
    "cat": "denuncias"
  },
  {
    "cap": "Encuentro con estudiantes",
    "cat": "educacion"
  },
  {
    "cap": "Sesión del concejo municipal",
    "cat": "politica"
  },
  {
    "cap": "Malecón de San Pedro de Macorís",
    "cat": "sociedad"
  },
  {
    "cap": "Preparando la transmisión en vivo",
    "cat": "nacional"
  },
  {
    "cap": "Feria de emprendedores",
    "cat": "local"
  }
];

export const DEMO_FB_POSTS = [
  {
    "text": "🔴 Seguimos atentos a las lluvias en el este. Comparte solo información de fuentes oficiales. #LasCosasComoSon",
    "h": 1.5,
    "likes": 842,
    "comments": 131,
    "shares": 96
  },
  {
    "text": "¿Hay un problema en tu comunidad? Escríbenos con fotos, lugar y fecha. Verificamos antes de publicar.",
    "h": 22,
    "likes": 1204,
    "comments": 310,
    "shares": 188
  },
  {
    "text": "Ya está disponible la entrevista completa sobre el agua potable en Consuelo. Míralo en nuestro canal de YouTube.",
    "h": 27,
    "likes": 655,
    "comments": 74,
    "shares": 59
  }
];

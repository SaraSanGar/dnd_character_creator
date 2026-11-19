/*
 * Datos extraídos de https://dnd5e.wikidot.com (traducidos al castellano).
 * Razas: versión Player's Handbook (PHB) o Monsters of the Multiverse (MPMM).
 * Clases: páginas de clase de la wiki.
 * Trasfondos: páginas de trasfondo de la wiki.
 */

const RACES = [
  {
    id: "dragonborn", name: "Dracónido", en: "Dragonborn", source: "PHB", glyph: "D",
    intro: "Nacidos de dragones, como proclama su nombre, los dracónidos caminan con orgullo por un mundo que los recibe con temor e incomprensión. Moldeados por dioses dracónicos o por los propios dragones, combinan los mejores atributos de los dragones y de los humanoides. Algunos son fieles servidores de dragones auténticos, otros forman filas de soldados en grandes guerras, y otros se encuentran a la deriva, sin una vocación clara.",
    asi: "Fuerza +2, Carisma +1",
    size: "Mediano (bastante más de 1,80 m, casi 115 kg)",
    speed: "9 m (30 pies)",
    traits: [
      { n: "Ascendencia dracónica", d: "Estás emparentado de lejos con un tipo de dragón. Elige uno: determina el daño y el área de tu arma de aliento y el tipo de resistencia que obtienes." },
      { n: "Arma de aliento", d: "Con tu acción exhalas energía destructiva. Las criaturas en el área hacen una tirada de salvación (CD 8 + mod. de Constitución + bonificador de competencia). Reciben 2d6 de daño si fallan y la mitad si superan. El daño aumenta a 3d6 a nivel 6, 4d6 a nivel 11 y 5d6 a nivel 16. Se recupera con un descanso corto o largo." },
      { n: "Resistencia al daño", d: "Tienes resistencia al tipo de daño asociado a tu ascendencia." },
      { n: "Idiomas", d: "Común y dracónico." }
    ],
    choiceLabel: "Ascendencia dracónica",
    choices: [
      { id: "black", name: "Negro", d: "Ácido · línea de 1,5 × 9 m (salv. DES)" },
      { id: "blue", name: "Azul", d: "Relámpago · línea de 1,5 × 9 m (salv. DES)" },
      { id: "brass", name: "Latón", d: "Fuego · línea de 1,5 × 9 m (salv. DES)" },
      { id: "bronze", name: "Bronce", d: "Relámpago · línea de 1,5 × 9 m (salv. DES)" },
      { id: "copper", name: "Cobre", d: "Ácido · línea de 1,5 × 9 m (salv. DES)" },
      { id: "gold", name: "Oro", d: "Fuego · cono de 4,5 m (salv. DES)" },
      { id: "green", name: "Verde", d: "Veneno · cono de 4,5 m (salv. CON)" },
      { id: "red", name: "Rojo", d: "Fuego · cono de 4,5 m (salv. DES)" },
      { id: "silver", name: "Plata", d: "Frío · cono de 4,5 m (salv. CON)" },
      { id: "white", name: "Blanco", d: "Frío · cono de 4,5 m (salv. CON)" }
    ]
  },
  {
    id: "dwarf", name: "Enano", en: "Dwarf", source: "PHB", glyph: "E",
    intro: "Reinos llenos de grandeza antigua, salones tallados en las raíces de las montañas, el eco de picos y martillos en minas profundas y forjas ardientes, el compromiso con el clan y la tradición, y un odio ardiente hacia goblins y orcos: estos hilos comunes unen a todos los enanos.",
    asi: "Constitución +2",
    size: "Mediano (entre 1,20 y 1,50 m, unos 70 kg)",
    speed: "7,5 m (25 pies); no se reduce por llevar armadura pesada",
    traits: [
      { n: "Visión en la oscuridad", d: "Ves en luz tenue a 18 m como si fuera luz brillante, y en la oscuridad como si fuera luz tenue (sin colores, solo tonos de gris)." },
      { n: "Resistencia enana", d: "Ventaja en las tiradas de salvación contra veneno y resistencia al daño de veneno." },
      { n: "Entrenamiento de combate enano", d: "Competencia con hacha de batalla, hacha de mano, martillo ligero y martillo de guerra." },
      { n: "Competencia con herramientas", d: "Herramientas de artesano a elegir: de herrero, de cervecero o de albañil." },
      { n: "Afinidad con la piedra", d: "En pruebas de Inteligencia (Historia) sobre el origen de trabajos en piedra, se te considera competente y sumas el doble de tu bonificador de competencia." },
      { n: "Idiomas", d: "Común y enano." }
    ],
    subraces: [
      { id: "hill", name: "Enano de las colinas", en: "Hill Dwarf", intro: "Tienes sentidos agudos, una intuición profunda y una resistencia notable.", asi: "Sabiduría +1",
        traits: [{ n: "Dureza enana", d: "Tus puntos de golpe máximos aumentan en 1, y aumentan en 1 cada vez que subes de nivel." }] },
      { id: "mountain", name: "Enano de las montañas", en: "Mountain Dwarf", intro: "Eres fuerte y robusto, acostumbrado a una vida difícil en terreno escarpado.", asi: "Fuerza +2",
        traits: [{ n: "Entrenamiento con armaduras enano", d: "Competencia con armaduras ligeras y medias." }] }
    ]
  },
  {
    id: "elf", name: "Elfo", en: "Elf", source: "PHB", glyph: "E",
    intro: "Los elfos son un pueblo mágico de gracia sobrenatural, que vive en lugares de belleza etérea, en medio de bosques antiguos o en agujas plateadas que brillan con luz feérica, donde la música suave flota en el aire. Los elfos aman la naturaleza y la magia, el arte, la música y la poesía.",
    asi: "Destreza +2",
    size: "Mediano (de menos de 1,50 a más de 1,80 m, complexión esbelta)",
    speed: "9 m (30 pies)",
    traits: [
      { n: "Visión en la oscuridad", d: "Ves en luz tenue a 18 m como si fuera luz brillante, y en la oscuridad como si fuera luz tenue (solo tonos de gris)." },
      { n: "Ascendencia feérica", d: "Ventaja en las tiradas de salvación contra ser hechizado, y la magia no puede dormirte." },
      { n: "Trance", d: "Los elfos no duermen: meditan profundamente 4 horas al día, semiconscientes, y obtienen el mismo beneficio que un humano tras 8 horas de sueño." },
      { n: "Sentidos agudos", d: "Competencia en la habilidad Percepción." },
      { n: "Idiomas", d: "Común y élfico." }
    ],
    subraces: [
      { id: "high", name: "Alto elfo", en: "High Elf", intro: "Tienes una mente aguda y dominas al menos lo básico de la magia.", asi: "Inteligencia +1",
        traits: [
          { n: "Truco", d: "Conoces un truco a tu elección de la lista de conjuros de mago. Inteligencia es tu característica para lanzarlo." },
          { n: "Entrenamiento con armas élficas", d: "Competencia con espada larga, espada corta, arco corto y arco largo." },
          { n: "Idioma adicional", d: "Hablas, lees y escribes un idioma adicional a tu elección." }
        ] },
      { id: "wood", name: "Elfo de los bosques", en: "Wood Elf", intro: "Tienes sentidos agudos e intuición, y tus pies veloces te llevan rápida y sigilosamente por tus bosques natales.", asi: "Sabiduría +1",
        traits: [
          { n: "Entrenamiento con armas élficas", d: "Competencia con espada larga, espada corta, arco corto y arco largo." },
          { n: "Pies ligeros", d: "Tu velocidad base aumenta a 10,5 m (35 pies)." },
          { n: "Máscara de la naturaleza", d: "Puedes intentar esconderte incluso si solo te oculta ligeramente el follaje, la lluvia intensa, la nieve, la niebla u otros fenómenos naturales." }
        ] },
      { id: "drow", name: "Elfo oscuro (drow)", en: "Dark Elf", intro: "Desterrados del mundo de la superficie por seguir a la diosa Lolth, los drow construyeron su civilización en la Infraoscuridad. Consulta con tu DM si puedes jugar un drow.", asi: "Carisma +1",
        traits: [
          { n: "Visión en la oscuridad superior", d: "Tu visión en la oscuridad alcanza 36 m en lugar de 18 m." },
          { n: "Sensibilidad a la luz solar", d: "Desventaja en tiradas de ataque y pruebas de Sabiduría (Percepción) basadas en la vista cuando tú, tu objetivo o lo que intentas percibir está bajo luz solar directa." },
          { n: "Magia drow", d: "Conoces el truco Luces danzantes. A nivel 3 puedes lanzar Fuego feérico una vez por descanso largo; a nivel 5, Oscuridad una vez por descanso largo. Usas Carisma." },
          { n: "Entrenamiento con armas drow", d: "Competencia con estoques, espadas cortas y ballestas de mano." }
        ] }
    ]
  },
  {
    id: "gnome", name: "Gnomo", en: "Gnome", source: "PHB", glyph: "G",
    intro: "Un zumbido constante de actividad llena las madrigueras y barrios donde los gnomos forman sus comunidades. Se oyen engranajes, alguna pequeña explosión, gritos de sorpresa o triunfo y, sobre todo, carcajadas. Los gnomos disfrutan de cada momento de invención, exploración, investigación, creación y juego.",
    asi: "Inteligencia +2",
    size: "Pequeño (entre 90 cm y 1,20 m, unos 18 kg)",
    speed: "7,5 m (25 pies)",
    traits: [
      { n: "Visión en la oscuridad", d: "Ves en luz tenue a 18 m como si fuera luz brillante, y en la oscuridad como si fuera luz tenue (solo tonos de gris)." },
      { n: "Astucia gnoma", d: "Ventaja en todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma contra la magia." },
      { n: "Idiomas", d: "Común y gnomo." }
    ],
    subraces: [
      { id: "forest", name: "Gnomo de los bosques", en: "Forest Gnome", intro: "Tienes un don natural para la ilusión y una rapidez y sigilo innatos.", asi: "Destreza +1",
        traits: [
          { n: "Ilusionista nato", d: "Conoces el truco Ilusión menor. Inteligencia es tu característica para lanzarlo." },
          { n: "Hablar con bestias pequeñas", d: "Mediante sonidos y gestos puedes comunicar ideas simples a bestias Pequeñas o menores." }
        ] },
      { id: "rock", name: "Gnomo de las rocas", en: "Rock Gnome", intro: "Tienes una inventiva natural y una robustez superior a la de otros gnomos.", asi: "Constitución +1",
        traits: [
          { n: "Saber de artífice", d: "En pruebas de Inteligencia (Historia) sobre objetos mágicos, alquímicos o tecnológicos, sumas el doble de tu bonificador de competencia." },
          { n: "Manitas", d: "Competencia con herramientas de manitas. Con 1 hora y 10 po de materiales puedes construir un pequeño artilugio mecánico (juguete, encendedor o caja de música) que funciona 24 horas." }
        ] }
    ]
  },
  {
    id: "half-elf", name: "Semielfo", en: "Half-Elf", source: "PHB", glyph: "S",
    intro: "Caminan entre dos mundos sin pertenecer del todo a ninguno. Los semielfos combinan lo que algunos llaman las mejores cualidades de sus padres elfos y humanos: la curiosidad, inventiva y ambición humanas, templadas por los sentidos refinados, el amor a la naturaleza y el gusto artístico de los elfos.",
    asi: "Carisma +2 y otras dos características a tu elección +1",
    size: "Mediano (entre 1,50 y 1,80 m)",
    speed: "9 m (30 pies)",
    traits: [
      { n: "Visión en la oscuridad", d: "Ves en luz tenue a 18 m como si fuera luz brillante, y en la oscuridad como si fuera luz tenue (solo tonos de gris)." },
      { n: "Ascendencia feérica", d: "Ventaja en las tiradas de salvación contra ser hechizado, y la magia no puede dormirte." },
      { n: "Versatilidad semielfa", d: "Elige un rasgo: competencia en dos habilidades a tu elección; o, según tu herencia élfica, entrenamiento con armas élficas, un truco de mago, pies ligeros, máscara de la naturaleza, magia drow o velocidad nadando de 9 m." },
      { n: "Idiomas", d: "Común, élfico y un idioma a tu elección." }
    ]
  },
  {
    id: "half-orc", name: "Semiorco", en: "Half-Orc", source: "PHB", glyph: "S",
    intro: "Cuando las alianzas entre humanos y orcos se sellan con matrimonios, nacen los semiorcos. Algunos llegan a ser orgullosos jefes de tribus orcas; otros se aventuran por el mundo para demostrar su valía entre los humanos. Muchos se hacen aventureros, logrando grandeza por sus hazañas.",
    asi: "Fuerza +2, Constitución +1",
    size: "Mediano (de 1,50 a más de 1,80 m, más corpulentos que los humanos)",
    speed: "9 m (30 pies)",
    traits: [
      { n: "Visión en la oscuridad", d: "Ves en luz tenue a 18 m como si fuera luz brillante, y en la oscuridad como si fuera luz tenue (solo tonos de gris)." },
      { n: "Amenazador", d: "Competencia en la habilidad Intimidación." },
      { n: "Aguante incansable", d: "Cuando tus puntos de golpe bajan a 0 pero no mueres en el acto, puedes quedarte con 1 punto de golpe. Se recupera con un descanso largo." },
      { n: "Ataques salvajes", d: "Cuando haces un crítico con un arma cuerpo a cuerpo, tiras uno de los dados de daño del arma una vez más y lo sumas al daño extra." },
      { n: "Idiomas", d: "Común y orco." }
    ]
  },
  {
    id: "halfling", name: "Mediano", en: "Halfling", source: "PHB", glyph: "M",
    intro: "Las comodidades del hogar son la meta de la vida de casi todos los medianos: un lugar donde asentarse en paz y tranquilidad, lejos de monstruos y ejércitos. Otros forman bandas nómadas que viajan sin cesar. Son leales a sus amigos y pueden mostrar una ferocidad notable cuando amenazan a los suyos.",
    asi: "Destreza +2",
    size: "Pequeño (unos 90 cm, unos 18 kg)",
    speed: "7,5 m (25 pies)",
    traits: [
      { n: "Afortunado", d: "Cuando sacas un 1 en una tirada de ataque, prueba de característica o tirada de salvación, puedes repetir el dado y debes usar el nuevo resultado." },
      { n: "Valiente", d: "Ventaja en las tiradas de salvación contra ser asustado." },
      { n: "Agilidad de mediano", d: "Puedes moverte a través del espacio de cualquier criatura de un tamaño mayor que el tuyo." },
      { n: "Idiomas", d: "Común y mediano." }
    ],
    subraces: [
      { id: "lightfoot", name: "Piesligeros", en: "Lightfoot", intro: "Te escondes con facilidad, incluso usando a otras personas como cobertura. Sueles ser afable y llevarte bien con los demás.", asi: "Carisma +1",
        traits: [{ n: "Sigiloso por naturaleza", d: "Puedes intentar esconderte incluso cuando solo te oculta una criatura al menos un tamaño mayor que tú." }] },
      { id: "stout", name: "Fornido", en: "Stout", intro: "Eres más resistente de lo normal y tienes cierta resistencia al veneno.", asi: "Constitución +1",
        traits: [{ n: "Resistencia de los fornidos", d: "Ventaja en las tiradas de salvación contra veneno y resistencia al daño de veneno." }] }
    ]
  },
  {
    id: "human", name: "Humano", en: "Human", source: "PHB", glyph: "H",
    intro: "En la mayoría de mundos, los humanos son la más joven de las razas comunes y viven poco comparados con enanos, elfos y dragones. Quizá por eso se esfuerzan en lograr todo lo posible en los años que tienen. Sea lo que sea lo que los impulsa, los humanos son los innovadores, los triunfadores y los pioneros de los mundos.",
    asi: "Todas las características +1",
    size: "Mediano (de 1,50 a más de 1,80 m)",
    speed: "9 m (30 pies)",
    traits: [
      { n: "Idiomas", d: "Común y un idioma adicional a tu elección." }
    ],
    subraces: [
      { id: "standard", name: "Humano estándar", en: "Human", intro: "La versión básica del Player's Handbook.", asi: "Todas las características +1", traits: [] },
      { id: "variant", name: "Humano variante", en: "Variant Human", intro: "Si tu campaña usa las dotes opcionales, tu DM puede permitir estos rasgos, que sustituyen el aumento de características normal.", asi: "Dos características distintas a tu elección +1",
        traits: [
          { n: "Habilidades", d: "Competencia en una habilidad a tu elección." },
          { n: "Dote", d: "Obtienes una dote a tu elección." }
        ] }
    ]
  },
  {
    id: "tiefling", name: "Tiefling", en: "Tiefling", source: "PHB", glyph: "T",
    intro: "Ser recibido con miradas y susurros, sufrir insultos en la calle, ver desconfianza en cada mirada: esa es la suerte del tiefling. Un pacto de hace generaciones infundió la esencia de Asmodeo, señor de los Nueve Infiernos, en su linaje. Su aspecto y su naturaleza no son culpa suya, sino fruto de un antiguo pecado.",
    asi: "Carisma +2",
    size: "Mediano (tamaño y complexión similares a los humanos)",
    speed: "9 m (30 pies)",
    traits: [
      { n: "Visión en la oscuridad", d: "Ves en luz tenue a 18 m como si fuera luz brillante, y en la oscuridad como si fuera luz tenue (solo tonos de gris)." },
      { n: "Resistencia infernal", d: "Tienes resistencia al daño de fuego." },
      { n: "Idiomas", d: "Común e infernal." }
    ],
    subraces: [
      { id: "asmodeus", name: "Linaje de Asmodeo", en: "Bloodline of Asmodeus", intro: "Los tieflings vinculados a Neso dominan el fuego y la oscuridad, guiados por un intelecto más agudo de lo normal.", asi: "Inteligencia +1",
        traits: [{ n: "Legado infernal", d: "Conoces el truco Taumaturgia. A nivel 3 puedes lanzar Reprensión infernal como conjuro de nivel 2; a nivel 5, también Oscuridad. Una vez cada uno por descanso largo. Usas Carisma." }] }
    ]
  },
  {
    id: "aasimar", name: "Aasimar", en: "Aasimar", source: "MPMM", glyph: "A",
    intro: "Ya desciendan de un ser celestial o estén imbuidos de poder divino, los aasimar son mortales que llevan una chispa de los Planos Superiores en el alma. Pueden avivar esa chispa para dar luz, aliviar heridas y desatar la furia de los cielos. Viven hasta 160 años.",
    asi: "Una característica +2 y otra +1, o tres características distintas +1",
    size: "Mediano o Pequeño (a tu elección)",
    speed: "9 m (30 pies)",
    traits: [
      { n: "Visión en la oscuridad", d: "Ves en luz tenue a 18 m como si fuera luz brillante, y en la oscuridad como si fuera luz tenue (solo tonos de gris)." },
      { n: "Resistencia celestial", d: "Resistencia al daño necrótico y radiante." },
      { n: "Manos sanadoras", d: "Con una acción tocas a una criatura y tiras tantos d4 como tu bonificador de competencia: recupera esos puntos de golpe. Una vez por descanso largo." },
      { n: "Portador de luz", d: "Conoces el truco Luz. Carisma es tu característica para lanzarlo." },
      { n: "Revelación celestial", d: "A nivel 3 eliges una revelación (Mortaja necrótica, Consunción radiante o Alma radiante) y puedes transformarte con una acción adicional durante 1 minuto, una vez por descanso largo." },
      { n: "Idiomas", d: "Común y otro idioma que acuerdes con tu DM." }
    ]
  },
  {
    id: "goliath", name: "Goliat", en: "Goliath", source: "MPMM", glyph: "G",
    intro: "Los primeros goliats vivieron en las cumbres más altas, muy por encima de los árboles, donde el aire es fino y aúllan vientos helados. Emparentados de lejos con los gigantes, miden entre 2,10 y 2,40 m y tienen tonos de piel que recuerdan a distintos tipos de piedra.",
    asi: "Una característica +2 y otra +1, o tres características distintas +1",
    size: "Mediano",
    speed: "9 m (30 pies)",
    traits: [
      { n: "Pequeño gigante", d: "Competencia en Atletismo, y cuentas como un tamaño mayor para tu capacidad de carga y el peso que puedes empujar, arrastrar o levantar." },
      { n: "Nacido de la montaña", d: "Resistencia al daño de frío y te aclimatas de forma natural a las grandes alturas." },
      { n: "Aguante de la piedra", d: "Cuando recibes daño, puedes usar tu reacción para tirar 1d12 + mod. de Constitución y reducir el daño en ese total. Tantas veces como tu bonificador de competencia por descanso largo." },
      { n: "Idiomas", d: "Común y otro idioma que acuerdes con tu DM." }
    ]
  },
  {
    id: "tabaxi", name: "Tabaxi", en: "Tabaxi", source: "MPMM", glyph: "T",
    intro: "Creados por el Señor de los Gatos, un ser divino de los Planos Superiores, para unir las cualidades de los humanoides y los felinos. Algunos viven como los gatos a los que se parecen, curiosos y juguetones; otros viven como cualquier otro pueblo. Su pelaje puede parecerse al de un tigre, un jaguar o un gato doméstico.",
    asi: "Una característica +2 y otra +1, o tres características distintas +1",
    size: "Mediano o Pequeño (a tu elección)",
    speed: "9 m (30 pies) y velocidad trepando igual",
    traits: [
      { n: "Garras felinas", d: "Puedes hacer ataques desarmados con tus garras: 1d6 + mod. de Fuerza de daño cortante." },
      { n: "Talento felino", d: "Competencia en Percepción y Sigilo." },
      { n: "Visión en la oscuridad", d: "Ves en luz tenue a 18 m como si fuera luz brillante, y en la oscuridad como si fuera luz tenue (solo tonos de gris)." },
      { n: "Agilidad felina", d: "Cuando te mueves en tu turno en combate, puedes duplicar tu velocidad hasta el final del turno. No puedes volver a usarlo hasta que en un turno te muevas 0 m." },
      { n: "Idiomas", d: "Común y otro idioma que acuerdes con tu DM." }
    ]
  },
  {
    id: "firbolg", name: "Firbolg", en: "Firbolg", source: "MPMM", glyph: "F",
    intro: "Primos lejanos de los gigantes, los primeros firbolgs vagaron por los bosques primigenios del multiverso, y la magia de esos bosques se entrelazó con sus almas. Pueden comunicarse con la flora y la fauna, y viven hasta 500 años.",
    asi: "Una característica +2 y otra +1, o tres características distintas +1",
    size: "Mediano",
    speed: "9 m (30 pies)",
    traits: [
      { n: "Magia firbolg", d: "Puedes lanzar Detectar magia y Disfrazarse (pudiendo parecer hasta 90 cm más bajo o alto), una vez cada uno por descanso largo. Usas Inteligencia, Sabiduría o Carisma (eliges al crear el personaje)." },
      { n: "Paso oculto", d: "Con una acción adicional te vuelves invisible hasta el inicio de tu siguiente turno o hasta que ataques, hagas una tirada de daño u obligues a alguien a hacer una salvación. Tantas veces como tu bonificador de competencia por descanso largo." },
      { n: "Constitución poderosa", d: "Cuentas como un tamaño mayor para tu capacidad de carga y el peso que puedes empujar, arrastrar o levantar." },
      { n: "Habla de bestia y hoja", d: "Puedes comunicarte de forma limitada con bestias y plantas, y tienes ventaja en las pruebas de Carisma para influir en ellas." },
      { n: "Idiomas", d: "Común y otro idioma que acuerdes con tu DM." }
    ]
  },
  {
    id: "tortle", name: "Tortle", en: "Tortle", source: "MPMM", glyph: "T",
    intro: "Los tortles tienen un dicho: «Llevamos la casa a cuestas». Este pueblo tortuga recorre costas, ríos y mares de muchos mundos, y siente una conexión mística con el mundo natural. Muchos disfrutan decorando su caparazón de formas únicas.",
    asi: "Una característica +2 y otra +1, o tres características distintas +1",
    size: "Mediano o Pequeño (a tu elección)",
    speed: "9 m (30 pies)",
    traits: [
      { n: "Garras", d: "Puedes hacer ataques desarmados con tus garras: 1d6 + mod. de Fuerza de daño cortante." },
      { n: "Aguantar la respiración", d: "Puedes aguantar la respiración hasta 1 hora." },
      { n: "Armadura natural", d: "Tu caparazón te da una CA base de 17 (tu Destreza no la modifica). No puedes llevar armaduras, pero sí usar escudo." },
      { n: "Intuición natural", d: "Competencia en una habilidad a elegir: Trato con animales, Medicina, Naturaleza, Percepción, Sigilo o Supervivencia." },
      { n: "Defensa del caparazón", d: "Con una acción te metes en el caparazón: +4 a la CA y ventaja en salvaciones de Fuerza y Constitución, pero quedas tumbado, con velocidad 0 y sin reacciones. Sales con una acción adicional." },
      { n: "Idiomas", d: "Común y otro idioma que acuerdes con tu DM." }
    ]
  },
  {
    id: "harengon", name: "Harengon", en: "Harengon", source: "MPMM", glyph: "H",
    intro: "Los harengon surgieron en el Feywild, donde encarnaban el espíritu de la libertad y el viaje. Con el tiempo, este pueblo conejo saltó a otros mundos llevando consigo la exuberancia feérica. Tienen los sentidos agudos y las patas poderosas de las liebres, y una pizca de suerte feérica.",
    asi: "Una característica +2 y otra +1, o tres características distintas +1",
    size: "Mediano o Pequeño (a tu elección)",
    speed: "9 m (30 pies)",
    traits: [
      { n: "Gatillo de liebre", d: "Sumas tu bonificador de competencia a tus tiradas de iniciativa." },
      { n: "Sentidos leporinos", d: "Competencia en Percepción." },
      { n: "Pies afortunados", d: "Cuando fallas una salvación de Destreza, puedes usar tu reacción para tirar 1d4 y sumarlo." },
      { n: "Salto de conejo", d: "Con una acción adicional saltas tantos metros como 1,5 × tu bonificador de competencia sin provocar ataques de oportunidad. Tantas veces como tu bonificador de competencia por descanso largo." },
      { n: "Idiomas", d: "Común y otro idioma que acuerdes con tu DM." }
    ]
  }
];

const CLASSES = [
  {
    id: "artificer", name: "Artífice", en: "Artificer", glyph: "A",
    intro: "Maestros de la invención, los artífices usan el ingenio y la magia para desbloquear capacidades extraordinarias en los objetos. Ven la magia como un sistema complejo que espera ser descifrado y aprovechado en sus conjuros e inventos.",
    primary: "Inteligencia", hitDie: "d8", saves: "Constitución, Inteligencia", caster: true,
    armor: "Ligeras, medias, escudos", weapons: "Sencillas",
    tools: "Herramientas de ladrón, de manitas y un tipo de herramientas de artesano",
    skills: "Elige 2: Arcanos, Historia, Investigación, Medicina, Naturaleza, Percepción, Juego de manos",
    features: ["Trasteo mágico", "Lanzamiento de conjuros"]
  },
  {
    id: "barbarian", name: "Bárbaro", en: "Barbarian", glyph: "B",
    intro: "Para algunos, su furia brota de una comunión con feroces espíritus animales. Otros la sacan de un pozo de ira contra un mundo lleno de dolor. Para todo bárbaro, la furia es un poder que alimenta no solo el frenesí de batalla, sino también reflejos asombrosos, aguante y proezas de fuerza.",
    primary: "Fuerza", hitDie: "d12", saves: "Fuerza, Constitución", caster: false,
    armor: "Ligeras, medias, escudos", weapons: "Sencillas y marciales", tools: "Ninguna",
    skills: "Elige 2: Trato con animales, Atletismo, Intimidación, Naturaleza, Percepción, Supervivencia",
    features: ["Furia", "Defensa sin armadura"]
  },
  {
    id: "bard", name: "Bardo", en: "Bard", glyph: "B",
    intro: "Ya sea erudito, escaldo o sinvergüenza, el bardo teje magia con palabras y música para inspirar a sus aliados, desmoralizar a sus enemigos, manipular mentes, crear ilusiones e incluso curar heridas. Es maestro del canto, del discurso y de la magia que contienen.",
    primary: "Carisma", hitDie: "d8", saves: "Destreza, Carisma", caster: true,
    armor: "Ligeras", weapons: "Sencillas, ballestas de mano, espadas largas, estoques, espadas cortas",
    tools: "Tres instrumentos musicales a tu elección",
    skills: "Elige 3 cualesquiera",
    features: ["Lanzamiento de conjuros", "Inspiración bárdica (d6)"]
  },
  {
    id: "cleric", name: "Clérigo", en: "Cleric", glyph: "C",
    intro: "Los clérigos son intermediarios entre el mundo mortal y los lejanos planos de los dioses. Tan variados como los dioses a los que sirven, se esfuerzan por encarnar la obra de sus deidades. No son simples sacerdotes: están imbuidos de magia divina.",
    primary: "Sabiduría", hitDie: "d8", saves: "Sabiduría, Carisma", caster: true,
    armor: "Ligeras, medias, escudos", weapons: "Sencillas", tools: "Ninguna",
    skills: "Elige 2: Historia, Perspicacia, Medicina, Persuasión, Religión",
    features: ["Lanzamiento de conjuros", "Dominio divino"]
  },
  {
    id: "druid", name: "Druida", en: "Druid", glyph: "D",
    intro: "Ya invoquen las fuerzas elementales de la naturaleza o imiten a las criaturas del mundo animal, los druidas encarnan la resistencia, la astucia y la furia de la naturaleza. No dicen dominarla: se ven como una extensión de su voluntad indomable.",
    primary: "Sabiduría", hitDie: "d8", saves: "Inteligencia, Sabiduría", caster: true,
    armor: "Ligeras, medias, escudos (nunca de metal)",
    weapons: "Garrotes, dagas, dardos, jabalinas, mazas, bastones, cimitarras, hoces, hondas, lanzas",
    tools: "Útiles de herborista",
    skills: "Elige 2: Arcanos, Trato con animales, Perspicacia, Medicina, Naturaleza, Percepción, Religión, Supervivencia",
    features: ["Druídico", "Lanzamiento de conjuros"]
  },
  {
    id: "fighter", name: "Guerrero", en: "Fighter", glyph: "G",
    intro: "Los guerreros comparten una maestría sin igual con las armas y armaduras, y un conocimiento profundo de las técnicas de combate. Conocen bien la muerte, tanto al repartirla como al mirarla de frente con desafío.",
    primary: "Fuerza o Destreza", hitDie: "d10", saves: "Fuerza, Constitución", caster: false,
    armor: "Todas, escudos", weapons: "Sencillas y marciales", tools: "Ninguna",
    skills: "Elige 2: Acrobacias, Trato con animales, Atletismo, Historia, Perspicacia, Intimidación, Percepción, Supervivencia",
    features: ["Estilo de combate", "Tomar aliento"]
  },
  {
    id: "monk", name: "Monje", en: "Monk", glyph: "M",
    intro: "Los monjes están unidos por su capacidad de canalizar mágicamente la energía que fluye por sus cuerpos. Ya sea en una impresionante muestra de destreza en combate o en una defensa y velocidad más sutiles, esa energía impregna todo lo que hace un monje.",
    primary: "Destreza y Sabiduría", hitDie: "d8", saves: "Fuerza, Destreza", caster: false,
    armor: "Ninguna", weapons: "Sencillas, espadas cortas",
    tools: "Un tipo de herramientas de artesano o un instrumento musical",
    skills: "Elige 2: Acrobacias, Atletismo, Historia, Perspicacia, Religión, Sigilo",
    features: ["Defensa sin armadura", "Artes marciales"]
  },
  {
    id: "paladin", name: "Paladín", en: "Paladin", glyph: "P",
    intro: "Ya sea jurado ante el altar de un dios, en un claro sagrado ante espíritus de la naturaleza, o en un momento de desesperación con los muertos como únicos testigos, el juramento de un paladín es un vínculo poderoso.",
    primary: "Fuerza y Carisma", hitDie: "d10", saves: "Sabiduría, Carisma", caster: true,
    armor: "Todas, escudos", weapons: "Sencillas y marciales", tools: "Ninguna",
    skills: "Elige 2: Atletismo, Perspicacia, Intimidación, Medicina, Persuasión, Religión",
    features: ["Sentido divino", "Imposición de manos"]
  },
  {
    id: "ranger", name: "Explorador", en: "Ranger", glyph: "E",
    intro: "Lejos del bullicio de las ciudades, más allá de los setos que protegen las granjas más alejadas de los terrores de la naturaleza, entre los árboles de bosques sin senderos y a través de llanuras vacías, los exploradores mantienen su vigilancia eterna.",
    primary: "Destreza y Sabiduría", hitDie: "d10", saves: "Fuerza, Destreza", caster: true,
    armor: "Ligeras, medias, escudos", weapons: "Sencillas y marciales", tools: "Ninguna",
    skills: "Elige 3: Trato con animales, Atletismo, Perspicacia, Investigación, Naturaleza, Percepción, Sigilo, Supervivencia",
    features: ["Enemigo predilecto", "Explorador nato"]
  },
  {
    id: "rogue", name: "Pícaro", en: "Rogue", glyph: "P",
    intro: "Los pícaros confían en su habilidad, su sigilo y las debilidades de sus enemigos para tomar ventaja en cualquier situación. Tienen un don para encontrar solución a casi cualquier problema: su ingenio es la piedra angular de cualquier grupo de aventureros.",
    primary: "Destreza", hitDie: "d8", saves: "Destreza, Inteligencia", caster: false,
    armor: "Ligeras", weapons: "Sencillas, ballestas de mano, espadas largas, estoques, espadas cortas",
    tools: "Herramientas de ladrón",
    skills: "Elige 4: Acrobacias, Atletismo, Engaño, Perspicacia, Intimidación, Investigación, Percepción, Interpretación, Persuasión, Juego de manos, Sigilo",
    features: ["Pericia", "Ataque furtivo (1d6)", "Jerga de ladrones"]
  },
  {
    id: "sorcerer", name: "Hechicero", en: "Sorcerer", glyph: "H",
    intro: "Los hechiceros llevan un don mágico de nacimiento, otorgado por un linaje exótico, alguna influencia de otro mundo o la exposición a fuerzas cósmicas desconocidas. Nadie elige la hechicería: el poder elige al hechicero.",
    primary: "Carisma", hitDie: "d6", saves: "Constitución, Carisma", caster: true,
    armor: "Ninguna", weapons: "Dagas, dardos, hondas, bastones, ballestas ligeras", tools: "Ninguna",
    skills: "Elige 2: Arcanos, Engaño, Perspicacia, Intimidación, Persuasión, Religión",
    features: ["Lanzamiento de conjuros", "Origen hechicero"]
  },
  {
    id: "warlock", name: "Brujo", en: "Warlock", glyph: "B",
    intro: "Los brujos buscan el conocimiento oculto en el tejido del multiverso. Mediante pactos con seres misteriosos de poder sobrenatural, desbloquean efectos mágicos tanto sutiles como espectaculares.",
    primary: "Carisma", hitDie: "d8", saves: "Sabiduría, Carisma", caster: true,
    armor: "Ligeras", weapons: "Sencillas", tools: "Ninguna",
    skills: "Elige 2: Arcanos, Engaño, Historia, Intimidación, Investigación, Naturaleza, Religión",
    features: ["Patrón de otro mundo", "Magia del pacto"]
  },
  {
    id: "wizard", name: "Mago", en: "Wizard", glyph: "M",
    intro: "Los magos son los usuarios supremos de la magia, definidos por los conjuros que lanzan. Recurriendo al sutil tejido de magia que impregna el cosmos, lanzan conjuros de fuego explosivo, relámpagos, engaños sutiles, control mental y mucho más.",
    primary: "Inteligencia", hitDie: "d6", saves: "Inteligencia, Sabiduría", caster: true,
    armor: "Ninguna", weapons: "Dagas, dardos, hondas, bastones, ballestas ligeras", tools: "Ninguna",
    skills: "Elige 2: Arcanos, Historia, Perspicacia, Investigación, Medicina, Religión",
    features: ["Lanzamiento de conjuros", "Recuperación arcana"]
  }
];

const BACKGROUNDS = [
  {
    id: "acolyte", name: "Acólito", en: "Acolyte", source: "PHB", glyph: "A",
    intro: "Has pasado tu vida al servicio de un templo dedicado a un dios o a un panteón. Actúas como intermediario entre lo sagrado y el mundo mortal, realizando ritos sagrados. No eres necesariamente un clérigo: realizar ritos no es lo mismo que canalizar poder divino.",
    skills: "Perspicacia, Religión", tools: "Ninguna", languages: "Dos a tu elección",
    equipment: "Un símbolo sagrado, un libro o rueda de oraciones, 5 varitas de incienso, vestiduras, ropa común y una bolsa con 15 po",
    feature: { n: "Refugio de los fieles", d: "Quienes comparten tu fe te respetan. Tú y tus compañeros podéis recibir curación y cuidados gratuitos en un templo o santuario de tu fe, y sus fieles te mantendrán (solo a ti) con un estilo de vida modesto." }
  },
  {
    id: "charlatan", name: "Charlatán", en: "Charlatan", source: "PHB", glyph: "C",
    intro: "Siempre has tenido don de gentes. Sabes qué mueve a las personas y, con unas pocas preguntas, las lees como un libro infantil. Sabes lo que la gente quiere y se lo das… o, mejor dicho, prometes dárselo.",
    skills: "Engaño, Juego de manos", tools: "Útiles de disfraz, útiles de falsificación", languages: "Ninguno",
    equipment: "Ropa fina, útiles de disfraz, herramientas de estafa a elegir (diez botellas con líquido de colores, dados trucados, una baraja marcada o el anillo de sello de un duque imaginario) y una bolsa con 15 po",
    feature: { n: "Identidad falsa", d: "Has creado una segunda identidad con documentos, conocidos y disfraces. Además, puedes falsificar documentos si has visto un ejemplo del tipo de documento o de la letra que intentas copiar." }
  },
  {
    id: "criminal", name: "Criminal", en: "Criminal", source: "PHB", glyph: "C",
    intro: "Eres un criminal con experiencia y un historial de saltarte la ley. Has pasado mucho tiempo entre otros criminales y aún tienes contactos en los bajos fondos. Has sobrevivido hasta ahora burlando las normas de la sociedad.",
    skills: "Engaño, Sigilo", tools: "Un tipo de juego, herramientas de ladrón", languages: "Ninguno",
    equipment: "Una palanca, ropa común oscura con capucha y una bolsa con 15 po",
    feature: { n: "Contacto criminal", d: "Tienes un contacto fiable que te conecta con una red de criminales. Sabes cómo enviarle y recibir mensajes, incluso a gran distancia, a través de mensajeros, caravaneros corruptos y marineros de mala fama." }
  },
  {
    id: "entertainer", name: "Artista", en: "Entertainer", source: "PHB", glyph: "A",
    intro: "Prosperas frente a un público. Sabes cautivarlo, entretenerlo e incluso inspirarlo. Tu poesía conmueve corazones, tu música levanta el ánimo, tus pasos de baile cautivan y tu humor da en el clavo. Sea cual sea tu técnica, tu arte es tu vida.",
    skills: "Acrobacias, Interpretación", tools: "Útiles de disfraz, un instrumento musical", languages: "Ninguno",
    equipment: "Un instrumento musical a elegir, el regalo de un admirador (carta de amor, mechón de pelo o baratija), un disfraz y una bolsa con 15 po",
    feature: { n: "A petición del público", d: "Siempre encuentras dónde actuar: una posada, un circo, un teatro o una corte. Recibes alojamiento y comida gratis mientras actúes cada noche, y te conviertes en una figura local querida." }
  },
  {
    id: "folk-hero", name: "Héroe del pueblo", en: "Folk Hero", source: "PHB", glyph: "H",
    intro: "Vienes de una condición social humilde, pero tu destino es mucho mayor. La gente de tu aldea ya te considera su campeón, y tu destino te llama a enfrentarte a los tiranos y monstruos que amenazan a la gente común.",
    skills: "Trato con animales, Supervivencia", tools: "Un tipo de herramientas de artesano, vehículos (terrestres)", languages: "Ninguno",
    equipment: "Herramientas de artesano a elegir, una pala, una olla de hierro, ropa común y una bolsa con 10 po",
    feature: { n: "Hospitalidad rústica", d: "Encajas con facilidad entre la gente común. Puedes encontrar dónde esconderte, descansar o recuperarte entre ellos, salvo que te hayas mostrado peligroso. Te protegerán de la ley, aunque no arriesgarán la vida por ti." }
  },
  {
    id: "guild-artisan", name: "Artesano gremial", en: "Guild Artisan", source: "PHB", glyph: "A",
    intro: "Eres miembro de un gremio de artesanos, experto en un oficio concreto. Aprendiste como aprendiz de un maestro artesano, bajo el patrocinio de tu gremio, hasta convertirte en maestro por derecho propio.",
    skills: "Perspicacia, Persuasión", tools: "Un tipo de herramientas de artesano", languages: "Uno a tu elección",
    equipment: "Herramientas de artesano a elegir, una carta de presentación de tu gremio, ropa de viaje y una bolsa con 15 po",
    feature: { n: "Miembro del gremio", d: "Tus compañeros de gremio te darán alojamiento y comida si lo necesitas, y pagarán tu funeral. El gremio te apoyará si te acusan injustamente y puede darte acceso a figuras políticas. Pagas una cuota de 5 po al mes." }
  },
  {
    id: "hermit", name: "Ermitaño", en: "Hermit", source: "PHB", glyph: "E",
    intro: "Viviste en reclusión —en una comunidad apartada como un monasterio, o completamente sola— durante una parte importante de tu vida. Lejos del ruido de la sociedad, encontraste silencio, soledad y quizá algunas de las respuestas que buscabas.",
    skills: "Medicina, Religión", tools: "Útiles de herborista", languages: "Uno a tu elección",
    equipment: "Un estuche de pergaminos lleno de notas de tus estudios u oraciones, una manta de invierno, ropa común, útiles de herborista y 5 po",
    feature: { n: "Descubrimiento", d: "Tu retiro te dio acceso a un descubrimiento único y poderoso: una gran verdad sobre el cosmos o los dioses, un lugar que nadie ha visto, o una reliquia que podría reescribir la historia. Decide los detalles con tu DM." }
  },
  {
    id: "noble", name: "Noble", en: "Noble", source: "PHB", glyph: "N",
    intro: "Entiendes de riqueza, poder y privilegio. Tienes un título nobiliario y tu familia posee tierras, cobra impuestos y tiene gran influencia política. Puedes ser una aristócrata mimada, una antigua mercader recién ennoblecida, o una terrateniente honesta que se preocupa por su gente.",
    skills: "Historia, Persuasión", tools: "Un tipo de juego", languages: "Uno a tu elección",
    equipment: "Ropa fina, un anillo de sello, un pergamino con tu linaje y una bolsa con 25 po",
    feature: { n: "Posición privilegiada", d: "Gracias a tu noble cuna, la gente tiende a pensar lo mejor de ti. Eres bienvenida en la alta sociedad, la gente común intenta complacerte y puedes conseguir audiencia con un noble local si lo necesitas." }
  },
  {
    id: "outlander", name: "Forastero", en: "Outlander", source: "PHB", glyph: "F",
    intro: "Creciste en tierras salvajes, lejos de la civilización. Has visto migrar manadas más grandes que bosques, has sobrevivido a climas extremos y has disfrutado de la soledad de ser la única criatura pensante en kilómetros. Lo salvaje corre por tus venas.",
    skills: "Atletismo, Supervivencia", tools: "Un instrumento musical", languages: "Uno a tu elección",
    equipment: "Un bastón, una trampa de caza, un trofeo de un animal que cazaste, ropa de viaje y una bolsa con 10 po",
    feature: { n: "Trotamundos", d: "Tienes una memoria excelente para mapas y geografía. Además, puedes encontrar comida y agua para ti y hasta otras cinco personas cada día, si el terreno lo permite." }
  },
  {
    id: "sage", name: "Sabio", en: "Sage", source: "PHB", glyph: "S",
    intro: "Pasaste años aprendiendo el saber del multiverso. Rebuscaste en manuscritos, estudiaste pergaminos y escuchaste a los mayores expertos en los temas que te interesan. Tus esfuerzos te han convertido en maestra de tus campos de estudio.",
    skills: "Arcanos, Historia", tools: "Ninguna", languages: "Dos a tu elección",
    equipment: "Un frasco de tinta, una pluma, un cuchillo pequeño, una carta de un colega fallecido con una pregunta que aún no has podido responder, ropa común y una bolsa con 10 po",
    feature: { n: "Investigador", d: "Cuando intentas recordar o aprender algo que no sabes, a menudo sabes dónde y de quién obtenerlo: una biblioteca, un scriptorium, una universidad o un sabio." }
  },
  {
    id: "sailor", name: "Marinero", en: "Sailor", source: "PHB", glyph: "M",
    intro: "Navegaste durante años en un barco de alta mar. Te enfrentaste a tormentas, monstruos de las profundidades y a quienes querían hundir tu nave. Tu primer amor es la línea lejana del horizonte, pero ha llegado el momento de probar algo nuevo.",
    skills: "Atletismo, Percepción", tools: "Herramientas de navegante, vehículos (acuáticos)", languages: "Ninguno",
    equipment: "Una cabilla (garrote), 15 m de cuerda de seda, un amuleto de la suerte, ropa común y una bolsa con 10 po",
    feature: { n: "Pasaje en barco", d: "Cuando lo necesitas, puedes conseguir pasaje gratis en un velero para ti y tus compañeros, a cambio de ayudar a la tripulación durante el viaje. No puedes garantizar horarios ni rutas." }
  },
  {
    id: "soldier", name: "Soldado", en: "Soldier", source: "PHB", glyph: "S",
    intro: "La guerra ha sido tu vida desde que tienes memoria. Te entrenaste de joven, estudiaste el uso de armas y armaduras y aprendiste a sobrevivir en el campo de batalla. Quizá formaste parte de un ejército, una compañía mercenaria o una milicia local.",
    skills: "Atletismo, Intimidación", tools: "Un tipo de juego, vehículos (terrestres)", languages: "Ninguno",
    equipment: "Una insignia de rango, un trofeo de un enemigo caído (daga, hoja rota o trozo de estandarte), dados de hueso o una baraja, ropa común y una bolsa con 10 po",
    feature: { n: "Rango militar", d: "Los soldados leales a tu antigua organización reconocen tu autoridad. Puedes requisar equipo sencillo o caballos para uso temporal y acceder a campamentos y fortalezas aliadas." }
  },
  {
    id: "urchin", name: "Huérfano", en: "Urchin", source: "PHB", glyph: "H",
    intro: "Creciste en las calles, sola, huérfana y pobre. Nadie te cuidaba, así que aprendiste a valerte por ti misma. Peleaste por comida, dormiste en tejados y callejones y sobreviviste contra todo pronóstico.",
    skills: "Juego de manos, Sigilo", tools: "Útiles de disfraz, herramientas de ladrón", languages: "Ninguno",
    equipment: "Un cuchillo pequeño, un mapa de la ciudad donde creciste, un ratón mascota, un recuerdo de tus padres, ropa común y una bolsa con 10 po",
    feature: { n: "Secretos de la ciudad", d: "Conoces los pasajes y el ritmo secreto de las ciudades. Fuera de combate, tú y quienes guíes podéis viajar entre dos puntos de la ciudad al doble de velocidad." }
  },
  {
    id: "haunted-one", name: "Atormentado", en: "Haunted One", source: "Curse of Strahd", glyph: "A",
    intro: "Te persigue algo tan terrible que no te atreves a hablar de ello. Has intentado enterrarlo y huir, sin éxito. Eso que te atormenta no puede matarse con una espada ni desterrarse con un conjuro: una sombra en la pared, una pesadilla, un recuerdo que se niega a morir.",
    skills: "Elige 2: Arcanos, Investigación, Religión o Supervivencia", tools: "Ninguna",
    languages: "Dos a tu elección, uno de ellos exótico (abisal, celestial, habla profunda, dracónico, infernal, primordial, silvano o infracomún)",
    equipment: "Un equipo de cazador de monstruos (con agua bendita y antorchas), una baratija de especial significado, ropa común y 1 pp",
    feature: { n: "Corazón de oscuridad", d: "Quien te mira a los ojos ve que has afrontado horrores inimaginables. La gente común te tratará con toda cortesía y hará lo posible por ayudarte; incluso tomará las armas a tu lado si te enfrentas sola a un enemigo." }
  },
  {
    id: "far-traveler", name: "Viajero lejano", en: "Far Traveler", source: "Sword Coast Adventurer's Guide", glyph: "V",
    intro: "Vienes de un lugar tan remoto que poca gente sabe que existe. Has venido a esta parte del mundo por tus propios motivos, que quizá compartas o no. Encontrarás costumbres extrañas, pero también maravillas que nunca habías visto, y allá donde vayas despertarás interés.",
    skills: "Perspicacia, Percepción", tools: "Un instrumento musical o un tipo de juego (probablemente típico de tu tierra)",
    languages: "Uno a tu elección",
    equipment: "Ropa de viaje, un instrumento musical o juego, mapas toscos de tu tierra, una joya pequeña de 10 po al estilo de tu tierra y una bolsa con 5 po",
    feature: { n: "Todas las miradas sobre ti", d: "Tu acento y costumbres te delatan como extranjera. Eso atrae miradas, pero también el interés de eruditos, nobles y gente curiosa por oír historias de tu tierra, lo que te abre puertas." }
  },
  {
    id: "feylost", name: "Perdido en lo feérico", en: "Feylost", source: "The Wild Beyond the Witchlight", glyph: "P",
    intro: "Creciste en el Feywild tras desaparecer de tu plano natal siendo niña: quizá te llevaron hadas amables, quizá cruzaste por casualidad, quizá escapaste de feéricos malvados. Al volver, no volviste igual: tu corazón se llena de miedo y alegría ante la idea de regresar algún día.",
    skills: "Engaño, Supervivencia", tools: "Un instrumento musical",
    languages: "Uno a elegir entre élfico, gnomo, goblin o silvano",
    equipment: "Un instrumento musical a elegir, ropa de viaje, tres baratijas feéricas y una bolsa con 8 po",
    feature: { n: "Conexión feérica", d: "Los nativos del Feywild reconocen tus modales y tu conocimiento de sus costumbres y te ven como una de los suyos. Las criaturas feéricas amistosas tienden a ayudarte si te pierdes o necesitas ayuda allí." }
  }
];

const SOURCES = {
  PHB: "Player's Handbook",
  MPMM: "Monsters of the Multiverse"
};

/*
 * Equipo inicial de cada clase (se suma al del trasfondo).
 * Cada línea es un texto fijo o una lista de opciones entre las que elegir.
 */
const CLASS_EQUIPMENT = {
  artificer: {
    items: [
      "Dos armas sencillas cualesquiera",
      "Una ballesta ligera y 20 virotes",
      ["Armadura de cuero tachonado", "Cota de escamas"],
      "Herramientas de ladrón y un equipo de explorador de mazmorras"
    ],
    alt: "O bien, en lugar de este equipo, empiezas con 5d4 × 10 po."
  },
  barbarian: { items: [
    ["Una gran hacha", "Cualquier arma marcial cuerpo a cuerpo"],
    ["Dos hachas de mano", "Cualquier arma sencilla"],
    "Un equipo de explorador y cuatro jabalinas"
  ] },
  bard: { items: [
    ["Un estoque", "Una espada larga", "Cualquier arma sencilla"],
    ["Un equipo de diplomático", "Un equipo de artista"],
    ["Un laúd", "Cualquier otro instrumento musical"],
    "Armadura de cuero y una daga"
  ] },
  cleric: { items: [
    ["Una maza", "Un martillo de guerra (si eres competente)"],
    ["Cota de escamas", "Armadura de cuero", "Cota de malla (si eres competente)"],
    ["Una ballesta ligera y 20 virotes", "Cualquier arma sencilla"],
    ["Un equipo de sacerdote", "Un equipo de explorador"],
    "Un escudo y un símbolo sagrado"
  ] },
  druid: { items: [
    ["Un escudo de madera", "Cualquier arma sencilla"],
    ["Una cimitarra", "Cualquier arma sencilla cuerpo a cuerpo"],
    "Armadura de cuero, un equipo de explorador y un canalizador druídico"
  ] },
  fighter: { items: [
    ["Cota de malla", "Armadura de cuero, arco largo y 20 flechas"],
    ["Un arma marcial y un escudo", "Dos armas marciales"],
    ["Una ballesta ligera y 20 virotes", "Dos hachas de mano"],
    ["Un equipo de explorador de mazmorras", "Un equipo de explorador"]
  ] },
  monk: { items: [
    ["Una espada corta", "Cualquier arma sencilla"],
    ["Un equipo de explorador de mazmorras", "Un equipo de explorador"],
    "10 dardos"
  ] },
  paladin: { items: [
    ["Un arma marcial y un escudo", "Dos armas marciales"],
    ["Cinco jabalinas", "Cualquier arma sencilla cuerpo a cuerpo"],
    ["Un equipo de sacerdote", "Un equipo de explorador"],
    "Cota de malla y un símbolo sagrado"
  ] },
  ranger: { items: [
    ["Cota de escamas", "Armadura de cuero"],
    ["Dos espadas cortas", "Dos armas sencillas cuerpo a cuerpo"],
    ["Un equipo de explorador de mazmorras", "Un equipo de explorador"],
    "Un arco largo y un carcaj con 20 flechas"
  ] },
  rogue: { items: [
    ["Un estoque", "Una espada corta"],
    ["Un arco corto y un carcaj con 20 flechas", "Una espada corta"],
    ["Un equipo de ladrón", "Un equipo de explorador de mazmorras", "Un equipo de explorador"],
    "Armadura de cuero, dos dagas y herramientas de ladrón"
  ] },
  sorcerer: { items: [
    ["Una ballesta ligera y 20 virotes", "Cualquier arma sencilla"],
    ["Una bolsa de componentes", "Un canalizador arcano"],
    ["Un equipo de explorador de mazmorras", "Un equipo de explorador"],
    "Dos dagas"
  ] },
  warlock: { items: [
    ["Una ballesta ligera y 20 virotes", "Cualquier arma sencilla"],
    ["Una bolsa de componentes", "Un canalizador arcano"],
    ["Un equipo de erudito", "Un equipo de explorador de mazmorras"],
    "Armadura de cuero, cualquier arma sencilla y dos dagas"
  ] },
  wizard: { items: [
    ["Un bastón", "Una daga"],
    ["Una bolsa de componentes", "Un canalizador arcano"],
    ["Un equipo de erudito", "Un equipo de explorador"],
    "Un libro de conjuros"
  ] }
};

/*
 * Tablas de personalidad de cada trasfondo (rasgos, ideales, vínculos y defectos),
 * traducidas de las páginas de trasfondo de https://dnd5e.wikidot.com.
 * Entre paréntesis, el alineamiento al que apunta cada ideal.
 */
const PERSONALITY = {
  acolyte: {
    traits: [
      "Idolatro a un héroe concreto de mi fe y menciono constantemente sus hazañas y su ejemplo.",
      "Sé encontrar puntos en común entre los peores enemigos, empatizo con ellos y siempre busco la paz.",
      "Veo presagios en cada suceso y cada acción. Los dioses intentan hablarnos; solo hay que escuchar.",
      "Nada puede quebrar mi optimismo.",
      "Cito (o cito mal) textos sagrados y proverbios en casi cualquier situación.",
      "Soy tolerante (o intolerante) con otras fes y respeto (o condeno) el culto a otros dioses.",
      "He disfrutado de buena comida, buena bebida y la alta sociedad de la élite de mi templo. La vida dura me irrita.",
      "He pasado tanto tiempo en el templo que tengo poca experiencia práctica tratando con la gente de fuera."
    ],
    ideals: [
      "Tradición. Las antiguas tradiciones de culto y sacrificio deben preservarse y respetarse. (Legal)",
      "Caridad. Siempre intento ayudar a quien lo necesita, cueste lo que me cueste. (Bueno)",
      "Cambio. Debemos ayudar a provocar los cambios que los dioses obran constantemente en el mundo. (Caótico)",
      "Poder. Espero llegar algún día a lo más alto de la jerarquía de mi fe. (Legal)",
      "Fe. Confío en que mi deidad guiará mis actos. Tengo fe en que, si me esfuerzo, todo irá bien. (Legal)",
      "Aspiración. Quiero demostrar que merezco el favor de mi dios ajustando mis actos a sus enseñanzas. (Cualquiera)"
    ],
    bonds: [
      "Moriría por recuperar una antigua reliquia de mi fe que se perdió hace mucho.",
      "Algún día me vengaré de la jerarquía corrupta del templo que me tachó de hereje.",
      "Le debo la vida al sacerdote que me acogió cuando murieron mis padres.",
      "Todo lo que hago es por la gente común.",
      "Haré lo que sea por proteger el templo en el que serví.",
      "Busco preservar un texto sagrado que mis enemigos consideran herético y quieren destruir."
    ],
    flaws: [
      "Juzgo a los demás con dureza, y a mí aún con más severidad.",
      "Confío demasiado en quienes tienen poder en la jerarquía de mi templo.",
      "Mi devoción a veces me lleva a confiar a ciegas en quien dice profesar fe en mi dios.",
      "Mi forma de pensar es inflexible.",
      "Desconfío de los desconocidos y espero lo peor de ellos.",
      "Cuando me marco un objetivo, me obsesiono con él a costa de todo lo demás en mi vida."
    ]
  },
  charlatan: {
    traits: [
      "Me enamoro y me desenamoro con facilidad, y siempre estoy persiguiendo a alguien.",
      "Tengo un chiste para cada ocasión, sobre todo para aquellas en las que el humor está fuera de lugar.",
      "La adulación es mi truco preferido para conseguir lo que quiero.",
      "Soy jugador nato y no puedo resistirme a arriesgarme si hay posible recompensa.",
      "Miento sobre casi todo, incluso cuando no hay ningún motivo.",
      "El sarcasmo y los insultos son mis armas preferidas.",
      "Llevo encima varios símbolos sagrados e invoco a la deidad que me convenga en cada momento.",
      "Me guardo cualquier cosa que vea que pueda tener algún valor."
    ],
    ideals: [
      "Independencia. Soy un espíritu libre: nadie me dice lo que tengo que hacer. (Caótico)",
      "Justicia. Nunca engaño a quien no puede permitirse perder unas monedas. (Legal)",
      "Caridad. Reparto el dinero que consigo entre quienes de verdad lo necesitan. (Bueno)",
      "Creatividad. Nunca repito la misma estafa. (Caótico)",
      "Amistad. Los bienes materiales van y vienen. Los lazos de amistad duran para siempre. (Bueno)",
      "Aspiración. Estoy decidido a llegar a ser alguien. (Cualquiera)"
    ],
    bonds: [
      "Estafé a la persona equivocada y debo asegurarme de que nunca se cruce conmigo ni con quienes me importan.",
      "Se lo debo todo a quien me enseñó: una persona horrible que probablemente se esté pudriendo en alguna cárcel.",
      "En algún lugar tengo un hijo o una hija que no me conoce. Intento hacer el mundo mejor para esa criatura.",
      "Vengo de una familia noble, y algún día recuperaré mis tierras y mi título de quienes me los robaron.",
      "Alguien poderoso mató a un ser querido. Muy pronto me vengaré.",
      "Estafé y arruiné a alguien que no lo merecía. Busco expiar mis faltas, aunque quizá nunca me lo perdone."
    ],
    flaws: [
      "No puedo resistirme a una cara bonita.",
      "Siempre tengo deudas. Gasto mis ganancias ilícitas en lujos más rápido de lo que entran.",
      "Estoy convencido de que nadie podría engañarme como yo engaño a los demás.",
      "Soy demasiado avaricioso. No puedo resistirme a correr un riesgo si hay dinero de por medio.",
      "No puedo resistirme a estafar a gente más poderosa que yo.",
      "Odio admitirlo y me odiaré por ello, pero si las cosas se ponen feas, huiré para salvar el pellejo."
    ]
  },
  criminal: {
    traits: [
      "Siempre tengo un plan para cuando las cosas salen mal.",
      "Mantengo la calma pase lo que pase. Nunca alzo la voz ni dejo que las emociones me controlen.",
      "Lo primero que hago en un sitio nuevo es fijarme en dónde está todo lo valioso, o dónde podría esconderse.",
      "Prefiero hacer un nuevo amigo que un nuevo enemigo.",
      "Me cuesta muchísimo confiar. Quienes parecen más honrados suelen ser quienes más tienen que ocultar.",
      "No presto atención a los riesgos. No me digas las probabilidades.",
      "La mejor forma de conseguir que haga algo es decirme que no puedo hacerlo.",
      "Exploto al menor insulto."
    ],
    ideals: [
      "Honor. No le robo a la gente del oficio. (Legal)",
      "Libertad. Las cadenas están para romperse, igual que quienes las forjan. (Caótico)",
      "Caridad. Robo a los ricos para poder ayudar a quien lo necesita. (Bueno)",
      "Codicia. Haré lo que haga falta para hacerme rico. (Malvado)",
      "Gente. Soy leal a mis amigos, no a ningún ideal; los demás, por mí, que se los lleve la corriente. (Neutral)",
      "Redención. Hay una chispa de bondad en todo el mundo. (Bueno)"
    ],
    bonds: [
      "Intento saldar una vieja deuda con alguien que fue generoso conmigo.",
      "Mis ganancias ilícitas sirven para mantener a mi familia.",
      "Me arrebataron algo importante y pienso robarlo de vuelta.",
      "Seré el mayor ladrón que haya existido.",
      "Soy culpable de un crimen terrible. Espero poder redimirme.",
      "Alguien a quien quería murió por un error mío. Eso no volverá a pasar."
    ],
    flaws: [
      "Cuando veo algo valioso, no puedo pensar en otra cosa que en cómo robarlo.",
      "Si tengo que elegir entre el dinero y mis amigos, suelo elegir el dinero.",
      "Si hay un plan, lo olvidaré. Y si no lo olvido, lo ignoraré.",
      "Tengo un gesto que me delata cuando miento.",
      "Doy media vuelta y huyo cuando las cosas pintan mal.",
      "Hay una persona inocente en prisión por un crimen que cometí yo. Y me parece bien."
    ]
  },
  entertainer: {
    traits: [
      "Conozco una historia adecuada para casi cualquier situación.",
      "Cada vez que llego a un sitio nuevo, recojo rumores locales y difundo cotilleos.",
      "Soy un romántico empedernido, siempre en busca de esa persona especial.",
      "Nadie sigue enfadado conmigo, ni cerca de mí, por mucho tiempo: sé rebajar cualquier tensión.",
      "Me encanta un buen insulto, aunque vaya dirigido a mí.",
      "Me amargo si no soy el centro de atención.",
      "No me conformo con nada que no sea la perfección.",
      "Cambio de humor o de opinión tan rápido como cambio de tono en una canción."
    ],
    ideals: [
      "Belleza. Cuando actúo, dejo el mundo mejor de lo que estaba. (Bueno)",
      "Tradición. Las historias, leyendas y canciones del pasado no deben olvidarse nunca: nos enseñan quiénes somos. (Legal)",
      "Creatividad. El mundo necesita ideas nuevas y acciones audaces. (Caótico)",
      "Codicia. Solo me interesan el dinero y la fama. (Malvado)",
      "Gente. Me gusta ver sonrisas en las caras del público. Es lo único que importa. (Neutral)",
      "Honestidad. El arte debe reflejar el alma; debe salir de dentro y mostrar quiénes somos de verdad. (Cualquiera)"
    ],
    bonds: [
      "Mi instrumento es mi posesión más preciada y me recuerda a alguien a quien quiero.",
      "Alguien robó mi precioso instrumento, y algún día lo recuperaré.",
      "Quiero ser famoso, cueste lo que cueste.",
      "Idolatro a un héroe de las viejas historias y comparo mis hazañas con las suyas.",
      "Haré lo que sea por demostrar que soy mejor que mi odiado rival.",
      "Haría cualquier cosa por los miembros de mi antigua compañía."
    ],
    flaws: [
      "Haré lo que sea por conseguir fama y renombre.",
      "Me pierden las caras bonitas.",
      "Un escándalo me impide volver a casa. Ese tipo de problemas parece perseguirme.",
      "Una vez me burlé de un noble que todavía quiere mi cabeza. Fue un error que probablemente repita.",
      "Me cuesta ocultar lo que siento de verdad. Mi lengua afilada me mete en líos.",
      "Por mucho que lo intento, no soy de fiar para mis amigos."
    ]
  },
  "folk-hero": {
    traits: [
      "Juzgo a la gente por sus actos, no por sus palabras.",
      "Si alguien tiene problemas, siempre estoy dispuesto a echar una mano.",
      "Cuando me propongo algo, lo llevo a cabo pase lo que pase.",
      "Tengo un fuerte sentido de la justicia y siempre busco la solución más equitativa a las discusiones.",
      "Confío en mis capacidades y hago lo que puedo para dar confianza a los demás.",
      "Pensar es cosa de otros. Yo prefiero la acción.",
      "Uso mal las palabras largas para parecer más listo.",
      "Me aburro con facilidad. ¿Cuándo voy a cumplir de una vez mi destino?"
    ],
    ideals: [
      "Respeto. Todo el mundo merece ser tratado con dignidad y respeto. (Bueno)",
      "Justicia. Nadie debe tener trato de favor ante la ley, y nadie está por encima de ella. (Legal)",
      "Libertad. No hay que permitir que los tiranos opriman al pueblo. (Caótico)",
      "Fuerza. Si me hago fuerte, podré tomar lo que quiera, lo que merezco. (Malvado)",
      "Sinceridad. No sirve de nada fingir ser lo que no soy. (Neutral)",
      "Destino. Nada ni nadie puede apartarme de mi vocación superior. (Cualquiera)"
    ],
    bonds: [
      "Tengo familia, pero no sé dónde está. Espero volver a verla algún día.",
      "Trabajé la tierra, amo la tierra y protegeré la tierra.",
      "Un noble orgulloso me dio una paliza terrible, y me vengaré de cualquier abusón que me encuentre.",
      "Mis herramientas simbolizan mi vida pasada, y las llevo para no olvidar nunca mis raíces.",
      "Protejo a quienes no pueden protegerse.",
      "Ojalá mi amor de la infancia hubiera venido conmigo a perseguir mi destino."
    ],
    flaws: [
      "El tirano que gobierna mi tierra no se detendrá ante nada hasta verme muerto.",
      "Estoy convencido de la importancia de mi destino y no veo mis defectos ni el riesgo de fracasar.",
      "Quienes me conocieron de joven saben mi vergonzoso secreto, así que nunca podré volver a casa.",
      "Me pierden los vicios de la ciudad, sobre todo la bebida fuerte.",
      "En secreto, creo que todo iría mejor si yo fuera un tirano que gobernara estas tierras.",
      "Me cuesta confiar en mis aliados."
    ]
  },
  "guild-artisan": {
    traits: [
      "Creo que lo que merece la pena hacerse, merece hacerse bien. No puedo evitarlo: soy perfeccionista.",
      "Soy un esnob que menosprecia a quien no sabe apreciar el buen arte.",
      "Siempre quiero saber cómo funcionan las cosas y qué mueve a las personas.",
      "Estoy lleno de ingeniosos aforismos y tengo un refrán para cada ocasión.",
      "Soy grosero con quien no comparte mi compromiso con el trabajo duro y el juego limpio.",
      "Me encanta hablar largo y tendido de mi oficio.",
      "No suelto el dinero fácilmente y regateo sin descanso para conseguir el mejor trato.",
      "Mi trabajo es muy conocido y quiero que todo el mundo lo aprecie. Me sorprende que alguien no haya oído hablar de mí."
    ],
    ideals: [
      "Comunidad. Es deber de toda persona civilizada reforzar los lazos de la comunidad y la seguridad de la civilización. (Legal)",
      "Generosidad. Mis talentos me fueron dados para usarlos en beneficio del mundo. (Bueno)",
      "Libertad. Todo el mundo debería poder ganarse la vida como quiera. (Caótico)",
      "Codicia. Solo me interesa el dinero. (Malvado)",
      "Gente. Me comprometo con las personas que me importan, no con ideales. (Neutral)",
      "Aspiración. Trabajo duro para ser el mejor en mi oficio. (Cualquiera)"
    ],
    bonds: [
      "El taller donde aprendí mi oficio es el lugar más importante del mundo para mí.",
      "Creé una gran obra para alguien y luego descubrí que no la merecía. Sigo buscando a alguien digno de ella.",
      "Tengo una gran deuda con mi gremio por hacerme quien soy hoy.",
      "Busco riqueza para asegurarme el amor de alguien.",
      "Algún día volveré a mi gremio y demostraré que soy el mejor artesano de todos.",
      "Me vengaré de las fuerzas malignas que destruyeron mi negocio y arruinaron mi sustento."
    ],
    flaws: [
      "Haré lo que sea por hacerme con algo raro o de valor incalculable.",
      "Enseguida supongo que alguien intenta engañarme.",
      "Nadie debe saber nunca que una vez robé dinero de las arcas del gremio.",
      "Nunca estoy satisfecho con lo que tengo: siempre quiero más.",
      "Mataría por conseguir un título nobiliario.",
      "Tengo unos celos horribles de cualquiera que supere mi trabajo. Allá donde voy, me rodean rivales."
    ]
  },
  hermit: {
    traits: [
      "He estado aislado tanto tiempo que apenas hablo; prefiero los gestos y algún gruñido ocasional.",
      "Mantengo una serenidad absoluta, incluso ante el desastre.",
      "Quien guiaba mi comunidad tenía algo sabio que decir sobre cualquier tema, y estoy deseando compartir esa sabiduría.",
      "Siento una empatía enorme por todos los que sufren.",
      "No tengo ni idea de etiqueta ni de lo que se espera de mí socialmente.",
      "Relaciono todo lo que me pasa con un gran plan cósmico.",
      "A menudo me pierdo en mis pensamientos y me olvido de lo que me rodea.",
      "Estoy trabajando en una gran teoría filosófica y me encanta compartir mis ideas."
    ],
    ideals: [
      "Bien común. Mis dones están para compartirlos con todos, no para mi propio beneficio. (Bueno)",
      "Lógica. Las emociones no deben nublar nuestro sentido de lo correcto y verdadero, ni nuestro pensamiento lógico. (Legal)",
      "Libre pensamiento. La curiosidad y la investigación son los pilares del progreso. (Caótico)",
      "Poder. La soledad y la contemplación son caminos hacia el poder místico o mágico. (Malvado)",
      "Vive y deja vivir. Entrometerse en los asuntos ajenos solo causa problemas. (Neutral)",
      "Autoconocimiento. Si te conoces a ti mismo, no queda nada más que saber. (Cualquiera)"
    ],
    bonds: [
      "Nada es más importante que los demás miembros de mi ermita, orden o hermandad.",
      "Me aislé para esconderme de quienes quizá todavía me buscan. Algún día tendré que enfrentarme a ellos.",
      "Sigo buscando la iluminación que perseguía en mi retiro, y aún se me escapa.",
      "Me aislé porque amaba a alguien que no podía tener.",
      "Si mi descubrimiento saliera a la luz, podría traer la ruina al mundo.",
      "Mi aislamiento me hizo comprender un gran mal que solo yo puedo destruir."
    ],
    flaws: [
      "Ahora que he vuelto al mundo, disfruto demasiado de sus placeres.",
      "Albergo pensamientos oscuros y sanguinarios que ni el aislamiento ni la meditación lograron calmar.",
      "Soy dogmático en mis ideas y mi filosofía.",
      "Mi necesidad de ganar las discusiones pesa más que la amistad y la armonía.",
      "Arriesgaría demasiado por desenterrar un conocimiento perdido.",
      "Me gusta guardar secretos y no los comparto con nadie."
    ]
  },
  noble: {
    traits: [
      "Mis elocuentes halagos hacen que cualquiera con quien hablo se sienta la persona más maravillosa e importante del mundo.",
      "La gente común me adora por mi amabilidad y mi generosidad.",
      "Nadie que vea mi porte regio puede dudar de que estoy muy por encima de la plebe.",
      "Me esfuerzo mucho por estar siempre impecable y seguir la última moda.",
      "No me gusta ensuciarme las manos, y jamás me verán en un alojamiento indigno.",
      "A pesar de mi noble cuna, no me pongo por encima de los demás. Todos tenemos la misma sangre.",
      "Si pierdes mi favor, lo pierdes para siempre.",
      "Si me haces daño, te aplastaré, arruinaré tu nombre y sembraré de sal tus campos."
    ],
    ideals: [
      "Respeto. Mi posición merece respeto, pero toda persona, sea cual sea su condición, merece ser tratada con dignidad. (Bueno)",
      "Responsabilidad. Es mi deber respetar la autoridad de quienes están por encima de mí, igual que quienes están por debajo deben respetar la mía. (Legal)",
      "Independencia. Debo demostrar que sé valerme sin los mimos de mi familia. (Caótico)",
      "Poder. Si consigo más poder, nadie me dirá lo que tengo que hacer. (Malvado)",
      "Familia. La sangre tira mucho. (Cualquiera)",
      "Obligación nobiliaria. Es mi deber proteger y cuidar de la gente que está a mi cargo. (Bueno)"
    ],
    bonds: [
      "Me enfrentaré a cualquier reto para ganarme la aprobación de mi familia.",
      "La alianza de mi casa con otra familia noble debe mantenerse a toda costa.",
      "Nada es más importante que los demás miembros de mi familia.",
      "Estoy enamorado del heredero o la heredera de una familia que la mía desprecia.",
      "Mi lealtad a mi soberano es inquebrantable.",
      "La gente común debe verme como un héroe del pueblo."
    ],
    flaws: [
      "En secreto, creo que todo el mundo está por debajo de mí.",
      "Oculto un secreto verdaderamente escandaloso que podría arruinar a mi familia para siempre.",
      "Demasiado a menudo oigo insultos y amenazas velados en todo lo que me dicen, y me enfado enseguida.",
      "Tengo un deseo insaciable de placeres carnales.",
      "De hecho, el mundo sí gira a mi alrededor.",
      "Con mis palabras y mis actos, a menudo avergüenzo a mi familia."
    ]
  },
  outlander: {
    traits: [
      "Me mueve un ansia de viajar que me alejó de mi hogar.",
      "Cuido de mis amigos como si fueran una camada de cachorros recién nacidos.",
      "Una vez corrí cuarenta kilómetros sin parar para avisar a mi clan de que se acercaba una horda de orcos. Volvería a hacerlo si hiciera falta.",
      "Tengo una lección para cada situación, sacada de observar la naturaleza.",
      "No me fío de la gente rica ni de los buenos modales. Ni el dinero ni la educación te salvan de un oso lechuza hambriento.",
      "Siempre estoy cogiendo cosas, toqueteándolas distraído y a veces rompiéndolas sin querer.",
      "Me siento mucho más a gusto con los animales que con las personas.",
      "Me criaron los lobos. De verdad."
    ],
    ideals: [
      "Cambio. La vida es como las estaciones, en cambio constante, y debemos cambiar con ella. (Caótico)",
      "Bien común. Es responsabilidad de cada cual procurar la mayor felicidad para toda la tribu. (Bueno)",
      "Honor. Si me deshonro, deshonro a todo mi clan. (Legal)",
      "Fuerza. Los más fuertes están hechos para gobernar. (Malvado)",
      "Naturaleza. El mundo natural es más importante que todas las construcciones de la civilización. (Neutral)",
      "Gloria. Debo ganar gloria en la batalla, para mí y para mi clan. (Cualquiera)"
    ],
    bonds: [
      "Mi familia, clan o tribu es lo más importante de mi vida, aunque esté lejos.",
      "Un daño a la naturaleza virgen de mi hogar es un daño a mí.",
      "Desataré una ira terrible sobre los malhechores que destruyeron mi tierra.",
      "Soy el último de mi tribu, y me toca asegurar que sus nombres pasen a la leyenda.",
      "Sufro visiones terribles de un desastre que se avecina y haré lo que sea por evitarlo.",
      "Es mi deber tener descendencia para que mi tribu perdure."
    ],
    flaws: [
      "Me gustan demasiado la cerveza, el vino y otras bebidas.",
      "En una vida vivida al máximo no hay sitio para la prudencia.",
      "Recuerdo cada insulto que he recibido y guardo un rencor silencioso a quien me haya hecho daño.",
      "Me cuesta confiar en gente de otras razas, tribus y sociedades.",
      "La violencia es mi respuesta a casi cualquier problema.",
      "No esperes que salve a quien no sabe salvarse. Es ley de la naturaleza que los fuertes prosperen y los débiles perezcan."
    ]
  },
  sage: {
    traits: [
      "Uso palabras polisílabas que dan impresión de gran erudición.",
      "He leído todos los libros de las mayores bibliotecas del mundo… o eso me gusta presumir.",
      "Estoy acostumbrado a ayudar a quienes no son tan listos como yo, y lo explico todo con paciencia.",
      "No hay nada que me guste más que un buen misterio.",
      "Escucho todas las posturas de una discusión antes de formarme mi propia opinión.",
      "Hablo… muy… despacio… a los… tontos…, que… comparados… conmigo… son… casi… todos.",
      "Soy terriblemente, terriblemente torpe en situaciones sociales.",
      "Estoy convencido de que la gente siempre intenta robarme mis secretos."
    ],
    ideals: [
      "Conocimiento. El camino al poder y a la superación personal pasa por el conocimiento. (Neutral)",
      "Belleza. Lo bello nos lleva más allá de sí mismo, hacia lo verdadero. (Bueno)",
      "Lógica. Las emociones no deben nublar nuestro pensamiento lógico. (Legal)",
      "Sin límites. Nada debería encadenar las infinitas posibilidades de la existencia. (Caótico)",
      "Poder. El conocimiento es el camino al poder y la dominación. (Malvado)",
      "Superación. El objetivo de una vida de estudio es mejorar uno mismo. (Cualquiera)"
    ],
    bonds: [
      "Es mi deber proteger a mis estudiantes.",
      "Tengo un texto antiguo con secretos terribles que no deben caer en malas manos.",
      "Trabajo para preservar una biblioteca, universidad, scriptorium o monasterio.",
      "La obra de mi vida es una serie de tomos sobre un campo concreto del saber.",
      "Llevo toda la vida buscando la respuesta a cierta pregunta.",
      "Vendí mi alma a cambio de conocimiento. Espero hacer grandes hazañas y recuperarla."
    ],
    flaws: [
      "La promesa de información me distrae con facilidad.",
      "La mayoría de la gente grita y huye al ver un demonio. Yo me paro a tomar notas sobre su anatomía.",
      "Desvelar un misterio antiguo bien vale el precio de una civilización.",
      "Paso por alto las soluciones obvias en favor de las complicadas.",
      "Hablo sin pensar bien lo que digo, y siempre acabo ofendiendo a alguien.",
      "No sé guardar un secreto aunque mi vida, o la de otra persona, dependa de ello."
    ]
  },
  sailor: {
    traits: [
      "Mis amigos saben que pueden contar conmigo, pase lo que pase.",
      "Trabajo duro para poder divertirme a lo grande cuando acabo.",
      "Me encanta llegar a puertos nuevos y hacer amigos con una jarra de cerveza.",
      "Exagero la verdad para contar una buena historia.",
      "Para mí, una pelea de taberna es una buena forma de conocer una ciudad nueva.",
      "Nunca rechazo una apuesta amistosa.",
      "Hablo más mal que un nido de otyugh.",
      "Me gusta el trabajo bien hecho, sobre todo si consigo que lo haga otra persona."
    ],
    ideals: [
      "Respeto. Lo que mantiene unido un barco es el respeto mutuo entre capitán y tripulación. (Bueno)",
      "Justicia. Todos trabajamos, así que todos compartimos la recompensa. (Legal)",
      "Libertad. El mar es libertad: la libertad de ir a cualquier parte y hacer cualquier cosa. (Caótico)",
      "Dominio. Soy un depredador, y los demás barcos del mar son mis presas. (Malvado)",
      "Gente. Me comprometo con mis compañeros de tripulación, no con ideales. (Neutral)",
      "Aspiración. Algún día tendré mi propio barco y trazaré mi propio destino. (Cualquiera)"
    ],
    bonds: [
      "Soy leal primero a mi capitán; todo lo demás va después.",
      "Lo más importante es el barco: tripulantes y capitanes van y vienen.",
      "Siempre recordaré mi primer barco.",
      "En una ciudad portuaria tengo un amor cuya mirada casi me aparta del mar.",
      "Me estafaron mi parte justa del botín y quiero lo que me corresponde.",
      "Unos piratas despiadados asesinaron a mi capitán y a mis compañeros, saquearon nuestro barco y me dejaron por muerto. Me vengaré."
    ],
    flaws: [
      "Obedezco las órdenes aunque crea que son un error.",
      "Diré lo que sea con tal de no hacer trabajo de más.",
      "Si alguien pone en duda mi valor, no me echo atrás por peligroso que sea.",
      "Cuando empiezo a beber, me cuesta parar.",
      "No puedo evitar guardarme las monedas sueltas y baratijas que encuentro.",
      "Mi orgullo probablemente acabe siendo mi perdición."
    ]
  },
  soldier: {
    traits: [
      "Siempre soy educado y respetuoso.",
      "Me persiguen los recuerdos de la guerra. No puedo quitarme de la cabeza las imágenes de violencia.",
      "He perdido demasiados amigos y tardo en hacer nuevos.",
      "Tengo historias inspiradoras y aleccionadoras de mi vida militar para casi cualquier situación de combate.",
      "Puedo sostenerle la mirada a un perro infernal sin pestañear.",
      "Me gusta ser fuerte y romper cosas.",
      "Tengo un sentido del humor bastante bruto.",
      "Afronto los problemas de cara. Una solución simple y directa es el mejor camino al éxito."
    ],
    ideals: [
      "Bien común. Nuestro destino es dar la vida en defensa de los demás. (Bueno)",
      "Responsabilidad. Hago lo que debo y obedezco a la autoridad justa. (Legal)",
      "Independencia. Quien obedece órdenes a ciegas abraza una forma de tiranía. (Caótico)",
      "Fuerza. En la vida, como en la guerra, gana el más fuerte. (Malvado)",
      "Vive y deja vivir. Ningún ideal merece que se mate o se vaya a la guerra por él. (Neutral)",
      "Nación. Mi ciudad, mi nación o mi pueblo es lo único que importa. (Cualquiera)"
    ],
    bonds: [
      "Aún daría la vida por la gente con la que serví.",
      "Alguien me salvó la vida en el campo de batalla. Desde entonces, nunca abandono a un amigo.",
      "Mi honor es mi vida.",
      "Nunca olvidaré la aplastante derrota que sufrió mi compañía ni a los enemigos que la causaron.",
      "Quienes luchan a mi lado son quienes merecen que muera por ellos.",
      "Lucho por quienes no pueden luchar."
    ],
    flaws: [
      "El monstruoso enemigo al que nos enfrentamos en batalla todavía me hace temblar de miedo.",
      "Respeto poco a quien no sea un guerrero probado.",
      "Cometí un error terrible en batalla que costó muchas vidas, y haría lo que fuera por mantenerlo en secreto.",
      "Mi odio a mis enemigos es ciego e irracional.",
      "Obedezco la ley aunque cause sufrimiento.",
      "Antes me comería mi armadura que admitir que me he equivocado."
    ]
  },
  urchin: {
    traits: [
      "Escondo restos de comida y baratijas en los bolsillos.",
      "Hago muchas preguntas.",
      "Me gusta meterme en sitios pequeños donde nadie más puede alcanzarme.",
      "Duermo con la espalda contra una pared o un árbol, abrazado a un hatillo con todo lo que tengo.",
      "Como como un cerdo y tengo malos modales.",
      "Creo que quien es amable conmigo esconde malas intenciones.",
      "No me gusta bañarme.",
      "Digo sin rodeos lo que los demás insinúan o callan."
    ],
    ideals: [
      "Respeto. Todas las personas, ricas o pobres, merecen respeto. (Bueno)",
      "Comunidad. Tenemos que cuidarnos unos a otros, porque nadie más lo va a hacer. (Legal)",
      "Cambio. Los de abajo se alzan, y los altos y poderosos caen. El cambio es la naturaleza de las cosas. (Caótico)",
      "Desquite. Hay que enseñar a los ricos cómo es la vida y la muerte en el arroyo. (Malvado)",
      "Gente. Ayudo a quienes me ayudan: eso es lo que nos mantiene con vida. (Neutral)",
      "Aspiración. Voy a demostrar que merezco una vida mejor. (Cualquiera)"
    ],
    bonds: [
      "Mi pueblo o mi ciudad es mi hogar, y lucharé por defenderlo.",
      "Mantengo un orfanato para que otros no tengan que pasar lo que yo pasé.",
      "Le debo la supervivencia a otro huérfano que me enseñó a vivir en la calle.",
      "Tengo una deuda impagable con la persona que se apiadó de mí.",
      "Escapé de la pobreza robando a alguien importante, y me buscan por ello.",
      "Nadie debería tener que soportar las penurias por las que he pasado."
    ],
    flaws: [
      "Si me superan en número, huyo de la pelea.",
      "El oro me parece muchísimo dinero, y haría casi cualquier cosa por tener más.",
      "Nunca confiaré del todo en nadie más que en mí.",
      "Prefiero matar a alguien mientras duerme antes que luchar limpiamente.",
      "No es robar si lo necesito más que otra persona.",
      "Quien no sabe cuidar de sí mismo tiene lo que se merece."
    ]
  },
  "haunted-one": {
    traits: [
      "Yo no huyo del mal. El mal huye de mí.",
      "Me gusta leer y memorizar poesía. Me calma y me da breves momentos de felicidad.",
      "Gasto el dinero sin miramientos y vivo al máximo, sabiendo que mañana podría morir.",
      "Vivo por la emoción de la caza.",
      "No hablo de lo que me atormenta. Prefiero no cargar a nadie con mi maldición.",
      "Espero peligro en cada esquina.",
      "Me niego a ser una víctima, y no permitiré que otros lo sean.",
      "No confío en los seres divinos."
    ],
    ideals: [
      "Altruismo. Intento ayudar a quien lo necesita, cueste lo que me cueste. (Bueno)",
      "Determinación. Detendré a los espíritus que me atormentan o moriré en el intento. (Cualquiera)",
      "Bien común. Mato monstruos para hacer el mundo más seguro y para exorcizar mis propios demonios. (Bueno)",
      "Libertad. Tengo una vocación oscura que me sitúa por encima de la ley. (Caótico)",
      "Lógica. Me gusta conocer las capacidades y debilidades de mi enemigo antes de lanzarme a la batalla. (Legal)",
      "Destrucción. Soy un monstruo que destruye a otros monstruos, y a cualquier cosa que se interponga. (Malvado)"
    ],
    bonds: [
      "Escribo mis pensamientos y descubrimientos en un diario. Mi diario es mi legado.",
      "Sacrificaría mi vida y mi alma por proteger a los inocentes.",
      "Mi tormento alejó a la persona que amo. Lucho por recuperar el amor perdido.",
      "Me consume una culpa terrible. Espero encontrar la redención a través de mis actos.",
      "Hay maldad en mí, lo noto. Nunca debe liberarse.",
      "Tengo a alguien pequeño a quien proteger. Debo hacer el mundo más seguro para esa criatura."
    ],
    flaws: [
      "Tengo ciertos rituales que debo seguir cada día. Nunca puedo saltármelos.",
      "Siempre pienso lo peor de la gente.",
      "No siento compasión por los muertos. Ellos son los afortunados.",
      "Tengo una adicción.",
      "Soy un agorero que vive en un mundo sin esperanza.",
      "Hablo con espíritus que nadie más puede ver."
    ]
  },
  "far-traveler": {
    traits: [
      "Tengo ideas distintas sobre el espacio personal: invado el de los demás sin darme cuenta, o reacciono cuando invaden el mío por ignorancia.",
      "Tengo mis propias ideas sobre lo que es comida y lo que no, y los hábitos alimenticios de esta gente me fascinan, me confunden o me dan asco.",
      "Tengo un fuerte código de honor o de decoro que los demás no comprenden.",
      "Expreso el cariño o el desprecio de formas que aquí no se conocen.",
      "Honro a mis deidades con prácticas que son extrañas en esta tierra.",
      "Empiezo o termino el día con pequeños rituales tradicionales que los demás no conocen."
    ],
    ideals: [
      "Apertura. Tengo mucho que aprender de la buena gente que encuentro por el camino. (Bueno)",
      "Reserva. Como recién llegado a estas tierras extrañas, soy prudente y respetuoso en mis tratos. (Legal)",
      "Aventura. ¡Estoy lejos de casa, y todo es extraño y maravilloso! (Caótico)",
      "Astucia. Puede que yo no conozca sus costumbres, pero ellos tampoco conocen las mías, y eso me da ventaja. (Malvado)",
      "Curiosidad. Todo es nuevo, pero tengo sed de aprender. (Neutral)",
      "Recelo. Debo tener cuidado, porque aquí no sé distinguir a un amigo de un enemigo. (Cualquiera)"
    ],
    bonds: [
      "Mientras tenga este recuerdo de mi tierra, puedo afrontar cualquier adversidad en este lugar extraño.",
      "Los dioses de mi pueblo me consuelan tan lejos de casa.",
      "No tengo causa más grande que servir a mi pueblo.",
      "Mi libertad es mi posesión más preciada. Nunca dejaré que nadie me la vuelva a quitar.",
      "Me fascinan la belleza y las maravillas de esta nueva tierra.",
      "Aunque no tuve elección, lamento haber dejado atrás a mis seres queridos. Espero volver a verlos algún día."
    ],
    flaws: [
      "En secreto (o no tanto) estoy convencido de que mi cultura es superior a la de esta tierra extranjera.",
      "Finjo no entender el idioma local para evitar conversaciones que prefiero no tener.",
      "Me pierden las nuevas bebidas y otros placeres de esta tierra.",
      "No llevo bien algunos actos y motivos de la gente de aquí, porque son distintos a mí.",
      "Considero que quienes siguen a otros dioses son, en el mejor caso, ingenuos engañados y, en el peor, necios ignorantes.",
      "Me pierde la belleza exótica de la gente de estas tierras."
    ]
  },
  feylost: {
    traits: [
      "Me persigue una risa feérica que solo yo oigo, aunque sé que es mi mente jugándome una mala pasada.",
      "Como un nómada, no puedo quedarme mucho tiempo en un mismo sitio.",
      "La buena música me hace llorar como un bebé.",
      "Allá donde voy, intento llevar conmigo un poco de la calidez y la calma del hogar.",
      "Nunca he perdido mi capacidad de asombro infantil.",
      "Cuando tengo una idea nueva, me entusiasmo muchísimo con ella hasta que se me ocurre otra mejor.",
      "Vivo según mis propias normas, raras y maravillosas.",
      "No soy capaz de confiar en la mayoría de los adultos."
    ],
    ideals: [
      "Amistad. Nunca abandono a un amigo. (Bueno)",
      "Empatía. Ninguna criatura debería sufrir. (Bueno)",
      "Ansia de viajar. Prefiero el camino menos transitado. (Caótico)",
      "Mutabilidad. El cambio es bueno; por eso vivo según unas normas que cambian sin parar. (Caótico)",
      "Honor. Un trato es un trato, y nunca rompería uno. (Legal)",
      "Regla de tres. Todo en el multiverso ocurre de tres en tres. Veo la «regla de tres» por todas partes. (Legal)",
      "Obsesión. No olvido un rencor. (Malvado)",
      "Codicia. Haré lo que haga falta para conseguir lo que quiero, sin importar el daño que cause. (Malvado)"
    ],
    bonds: [
      "Nunca rompería mi palabra.",
      "La magia, en todas sus formas, me fascina. Cuanto más mágico es un lugar, más me atrae.",
      "Hago lo que puedo por proteger el mundo natural.",
      "Un amigo de confianza es lo más importante del multiverso para mí.",
      "Soy incapaz de hacer daño a una criatura feérica, ya sea porque me considero una de ellas o porque temo las consecuencias.",
      "El Carnaval Luz de Bruja (Witchlight Carnival) es como mi hogar.",
      "El Feywild me atrae y anhelo volver allí, aunque sea por poco tiempo.",
      "Siento que les debo mucho a Mister Witch y Mister Light por darme un hogar y un propósito."
    ],
    flaws: [
      "Pierdo la noción del tiempo con facilidad. Por eso siempre llego tarde.",
      "Creo que el multiverso entero va a por mí.",
      "Siempre voy con el tiempo justo y me obsesiona que todo vaya según lo previsto.",
      "Soy cleptómano y codicio los tesoros brillantes y relucientes.",
      "Soy olvidadizo. A veces no recuerdo ni las cosas más sencillas.",
      "Nunca regalo nada y siempre espero algo a cambio.",
      "Tengo muchos vicios y suelo darme el gusto.",
      "Siempre estoy cambiando de opinión… bueno, casi siempre."
    ]
  }
};

/* Alineamientos (Player's Handbook) */
const ALIGNMENTS = [
  ["LB", "Legal bueno", "Hace lo correcto según lo que la sociedad espera."],
  ["NB", "Neutral bueno", "Hace lo mejor que puede para ayudar a los demás según sus necesidades."],
  ["CB", "Caótico bueno", "Actúa según su conciencia, sin importarle lo que esperen los demás."],
  ["LN", "Legal neutral", "Actúa según la ley, la tradición o sus códigos personales."],
  ["N", "Neutral", "Prefiere evitar los extremos y no tomar partido."],
  ["CN", "Caótico neutral", "Sigue sus caprichos y valora su libertad por encima de todo."],
  ["LM", "Legal malvado", "Toma lo que quiere de forma metódica, dentro de los límites de un código."],
  ["NM", "Neutral malvado", "Hace lo que le conviene, sin compasión ni escrúpulos."],
  ["CM", "Caótico malvado", "Actúa con violencia arbitraria, movido por la codicia o el odio."]
];

/* Idiomas (Player's Handbook) */
const LANGUAGES = {
  standard: ["Común", "Enano", "Élfico", "Gigante", "Gnomo", "Goblin", "Mediano", "Orco"],
  exotic: ["Abisal", "Celestial", "Dracónico", "Habla profunda", "Infernal", "Primordial", "Silvano", "Infracomún"]
};

export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const chapters: Chapter[] = [
  {
    id: "chap1",
    title: "Chapitre 1 : Concepts fondamentaux",
    description: "Explorez les bases de l'éducation et de l'enseignement.",
    questions: [
      {
        id: "c1_q1",
        text: "Quelle est la principale différence entre l'éducation et l'enseignement ?",
        options: [
          { id: "a", text: "Ce sont deux termes identiques" },
          { id: "b", text: "L'enseignement englobe l'éducation" },
          { id: "c", text: "L'éducation est plus large et vise le développement global de l'individu" },
          { id: "d", text: "L'enseignement concerne uniquement les valeurs morales" }
        ],
        correctAnswer: "c"
      },
      {
        id: "c1_q2",
        text: "Quelle finalité de l'éducation met l'accent sur l'intégration de l'individu dans la communauté ?",
        options: [
          { id: "a", text: "La finalité sociale" },
          { id: "b", text: "La finalité économique" },
          { id: "c", text: "La finalité individuelle" },
          { id: "d", text: "La finalité philosophique" }
        ],
        correctAnswer: "a"
      },
      {
        id: "c1_q3",
        text: "En plus des enseignants, qui est considéré comme le premier acteur et partenaire indispensable du système éducatif ?",
        options: [
          { id: "a", text: "Les entreprises locales" },
          { id: "b", text: "La famille des apprenants" },
          { id: "c", text: "Les médias sociaux" },
          { id: "d", text: "Les associations sportives" }
        ],
        correctAnswer: "b"
      },
      {
        id: "c1_q4",
        text: "Comment définit-on la notion de « compétence » dans le domaine pédagogique ?",
        options: [
          { id: "a", text: "La capacité à mémoriser un long texte" },
          { id: "b", text: "Le nombre d'années d'études réalisées" },
          { id: "c", text: "La capacité à mobiliser des ressources (savoirs, savoir-faire) pour résoudre une situation complexe" },
          { id: "d", text: "Une note obtenue lors d'un examen final" }
        ],
        correctAnswer: "c"
      },
      {
        id: "c1_q5",
        text: "Selon la taxonomie de Bloom, quel est le niveau cognitif de base ?",
        options: [
          { id: "a", text: "L'évaluation" },
          { id: "b", text: "L'analyse" },
          { id: "c", text: "La création" },
          { id: "d", text: "La connaissance / mémorisation" }
        ],
        correctAnswer: "d"
      }
    ]
  },
  {
    id: "chap2",
    title: "Chapitre 2 : Les approches pédagogiques",
    description: "Découvrez les différentes approches pour transmettre le savoir.",
    questions: [
      {
        id: "c2_q1",
        text: "En quoi consiste principalement l'approche par compétences (APC) ?",
        options: [
          { id: "a", text: "À accumuler des connaissances théoriques" },
          { id: "b", text: "À appliquer des savoirs dans des situations complexes et inédites" },
          { id: "c", text: "À mémoriser des faits historiques" },
          { id: "d", text: "À évaluer uniquement le comportement en classe" }
        ],
        correctAnswer: "b"
      },
      {
        id: "c2_q2",
        text: "Quel est l'objectif principal de la pédagogie différenciée ?",
        options: [
          { id: "a", text: "Donner le même exercice à tous les élèves en même temps" },
          { id: "b", text: "Séparer les élèves par niveau d'intelligence" },
          { id: "c", text: "Adapter les méthodes et les rythmes d'apprentissage à la diversité des élèves" },
          { id: "d", text: "Évaluer tous les élèves avec le même examen final strict" }
        ],
        correctAnswer: "c"
      }
    ]
  },
  {
    id: "chap3",
    title: "Chapitre 3 : Les théories de l'apprentissage",
    description: "Comprenez comment les élèves acquièrent des connaissances.",
    questions: [
      {
        id: "c3_q1",
        text: "Quel théoricien est principalement associé au constructivisme ?",
        options: [
          { id: "a", text: "B.F. Skinner" },
          { id: "b", text: "Jean Piaget" },
          { id: "c", text: "Ivan Pavlov" },
          { id: "d", text: "John B. Watson" }
        ],
        correctAnswer: "b"
      },
      {
        id: "c3_q2",
        text: "Selon le socioconstructivisme, quel facteur est essentiel dans l'apprentissage ?",
        options: [
          { id: "a", text: "Le conditionnement opérant" },
          { id: "b", text: "L'interaction sociale et le conflit sociocognitif" },
          { id: "c", text: "La répétition mécanique" },
          { id: "d", text: "L'apprentissage solitaire et autonome" }
        ],
        correctAnswer: "b"
      }
    ]
  },
  {
    id: "chap4",
    title: "Chapitre 4 : Les pédagogies contemporaines",
    description: "Étudiez les nouvelles méthodes pédagogiques modernes.",
    questions: [
      {
        id: "c4_q1",
        text: "Quel est le principe fondamental de la classe inversée (flipped classroom) ?",
        options: [
          { id: "a", text: "Faire les devoirs en classe et découvrir la théorie à la maison" },
          { id: "b", text: "Inverser les rôles entre l'enseignant et l'élève" },
          { id: "c", text: "Commencer la journée par l'après-midi" },
          { id: "d", text: "Ne donner aucun devoir à la maison" }
        ],
        correctAnswer: "a"
      },
      {
        id: "c4_q2",
        text: "La pédagogie de projet met l'accent sur :",
        options: [
          { id: "a", text: "La réussite individuelle aux examens standardisés" },
          { id: "b", text: "L'apprentissage par la réalisation de tâches concrètes et collaboratives" },
          { id: "c", text: "La transmission magistrale du savoir" },
          { id: "d", text: "La mémorisation de dates et d'événements" }
        ],
        correctAnswer: "b"
      }
    ]
  },
  {
    id: "chap5",
    title: "Chapitre 5 : Le système éducatif",
    description: "Analysez l'organisation du système éducatif et du curriculum.",
    questions: [
      {
        id: "c5_q1",
        text: "Que désigne le terme 'curriculum' dans le contexte éducatif ?",
        options: [
          { id: "a", text: "Le CV de l'enseignant" },
          { id: "b", text: "Le règlement intérieur de l'école" },
          { id: "c", text: "L'ensemble des parcours de formation, des objectifs et des contenus d'enseignement" },
          { id: "d", text: "L'emploi du temps hebdomadaire" }
        ],
        correctAnswer: "c"
      },
      {
        id: "c5_q2",
        text: "Quelle est la fonction principale de l'évaluation formative ?",
        options: [
          { id: "a", text: "Sanctionner l'élève en fin de trimestre" },
          { id: "b", text: "Classer les élèves par ordre de mérite" },
          { id: "c", text: "Aider l'élève à repérer ses erreurs et l'enseignant à adapter sa pédagogie" },
          { id: "d", text: "Délivrer un diplôme officiel" }
        ],
        correctAnswer: "c"
      }
    ]
  }
];

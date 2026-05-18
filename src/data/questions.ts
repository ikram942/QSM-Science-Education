export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
}

export const questions: Question[] = [
  {
    id: "q1",
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
    id: "q2",
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
    id: "q3",
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
    id: "q4",
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
    id: "q5",
    text: "Selon la taxonomie de Bloom (objectifs pédagogiques), quel est le niveau cognitif de base ?",
    options: [
      { id: "a", text: "L'évaluation" },
      { id: "b", text: "L'analyse" },
      { id: "c", text: "La création" },
      { id: "d", text: "La connaissance / mémorisation" }
    ],
    correctAnswer: "d"
  }
];

import { Solution } from '../types/solutions';

export const solutionsData: Solution[] = [
  {
    id: 'firmy-korporacje',
    title: 'Firmy i korporacje',
    description: 'Profesjonalne znakowanie odzieży służbowej i gadżetów firmowych.',
    icon: '🏢',
    services: [
      'Uniformy pracownicze',
      'Koszulki polo z logo',
      'Bluzy firmowe',
      'Gadżety reklamowe'
    ]
  },
  {
    id: 'sport-rekreacja',
    title: 'Sport i rekreacja',
    description: 'Znakowanie strojów sportowych, klubowych i eventowych.',
    icon: '⚽',
    services: [
      'Stroje drużynowe',
      'Koszulki eventowe',
      'Odzież treningowa',
      'Akcesoria sportowe'
    ]
  },
  {
    id: 'wydarzenia-promocje',
    title: 'Wydarzenia i promocje',
    description: 'Materiały promocyjne i pamiątkowe na wydarzenia specjalne.',
    icon: '🎉',
    services: [
      'Koszulki eventowe',
      'Gadżety promocyjne',
      'Odzież pamiątkowa',
      'Materiały targowe'
    ]
  },
  {
    id: 'gastronomia-horeca',
    title: 'Gastronomia i HoReCa',
    description: 'Specjalistyczna odzież dla branży gastronomicznej i hotelarskiej.',
    icon: '👨‍🍳',
    services: [
      'Fartuchy kuchenne',
      'Koszule kelnerskie',
      'Czapki szefów kuchni',
      'Uniformy hotelowe'
    ]
  },
  {
    id: 'szkoly-uczelnie',
    title: 'Szkoły i uczelnie',
    description: 'Odzież dla instytucji edukacyjnych i organizacji studenckich.',
    icon: '🎓',
    services: [
      'Bluzy szkolne',
      'Koszulki studenckie',
      'Odzież dla kadry',
      'Gadżety uczelnii'
    ]
  },
  {
    id: 'przemysl-produkcja',
    title: 'Przemysł i produkcja',
    description: 'Odzież robocza i BHP dla zakładów przemysłowych.',
    icon: '🏭',
    services: [
      'Odzież robocza',
      'Kamizelki odblaskowe',
      'Kombinezony ochronne',
      'Czapki i rękawice'
    ]
  }
];

export const solutionsSectionContent = {
  badgeText: 'Wybierz najlepszą opcję dla siebie',
  title: 'Kompleksowe rozwiązania',
  subtitle: 'Niezależnie od wielkości Twojego biznesu, mamy rozwiązanie które pomoże Ci osiągnąć cele'
};
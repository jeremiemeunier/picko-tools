# Picko Tools

Bibliothèque de composants React pour afficher des statistiques de surveillance depuis la plateforme [Picko](https://picko.jeremiemeunier.fr).

## Installation

```bash
npm install @jeremiemeunier/picko-package
```

Assurez‑vous d'avoir configuré l'accès au registre GitHub Packages pour le scope `@jeremiemeunier`.

## Utilisation rapide

```tsx
import { PickoProvider, PickoCard } from "@jeremiemeunier/picko-package";

export default function App() {
  return (
    <PickoProvider>
      <PickoCard>
        <PickoCard.Live color="cyan" />
        <PickoCard.History color={{ positive: "green", negative: "red" }} />
        <PickoCard.Tracker />
        <PickoCard.Spark color="cyan" />
      </PickoCard>
    </PickoProvider>
  );
}
```

`PickoProvider` se charge de récupérer les données de votre domaine et met ces informations à disposition des composants `PickoCard`.

## Développement

```bash
npm install
npm run build
```

La commande `npm run build` utilise [tsup](https://github.com/egoist/tsup) pour générer les fichiers compilés dans `dist/`.

## Licence

Ce projet est publié sous licence [ISC](./LICENSE).


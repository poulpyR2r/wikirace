# Instructions Setup SEO pour WikiRace 🚀

## 🎯 Configuration Google Search Console

### Étape 1 : Ajouter la propriété

1. Allez sur [Google Search Console](https://search.google.com/search-console/)
2. Cliquez sur "Ajouter une propriété"
3. Choisissez "Préfixe d'URL"
4. Entrez : `https://games.wikirace.taylora.fr/`

### Étape 2 : Vérification du domaine

**Méthode recommandée : Balise HTML**

1. Copiez le code de vérification fourni par Google
2. Remplacez `[VOTRE_CODE_VERIFICATION_GOOGLE]` dans `client/public/google-site-verification.html`
3. Déployez le site
4. Cliquez sur "Vérifier" dans Google Search Console

### Étape 3 : Soumettre le sitemap

1. Dans Google Search Console, allez dans "Sitemaps"
2. Ajoutez l'URL : `https://games.wikirace.taylora.fr/sitemap.xml`
3. Cliquez sur "Envoyer"

---

## 📊 Configuration Google Analytics 4

### Étape 1 : Créer une propriété GA4

1. Allez sur [Google Analytics](https://analytics.google.com/)
2. Créez un nouveau compte "WikiRace"
3. Créez une propriété "WikiRace Game"
4. Configurez un flux de données web pour `games.wikirace.taylora.fr`

### Étape 2 : Obtenir l'ID de mesure

1. Copiez votre ID de mesure (format : G-XXXXXXXXXX)
2. Créez un fichier `.env` dans le dossier `client/` :

```
REACT_APP_GA_TRACKING_ID=G-VOTRE-ID-ICI
```

### Étape 3 : Vérifier le tracking

1. Déployez avec la nouvelle configuration
2. Allez dans GA4 > Rapports > Temps réel
3. Naviguez sur votre site pour voir les données en direct

---

## 🤖 Configuration Bing Webmaster Tools

### Ajout du site

1. Allez sur [Bing Webmaster Tools](https://www.bing.com/webmasters/)
2. Ajoutez `https://games.wikirace.taylora.fr/`
3. Vérifiez via balise HTML (similaire à Google)
4. Soumettez le sitemap : `https://games.wikirace.taylora.fr/sitemap.xml`

---

## 🔍 Outils SEO à Configurer

### Ahrefs / SEMrush

- Ajoutez le domaine `games.wikirace.taylora.fr` à votre compte
- Configurez le tracking des mots-clés cibles
- Activez les alertes backlinks

### PageSpeed Insights

- Testez : https://pagespeed.web.dev/analysis?url=https://games.wikirace.taylora.fr/
- Optimisez pour obtenir 95+ sur mobile et desktop

---

## 📱 Configuration Réseaux Sociaux

### Facebook / Meta

1. Créez une page Facebook "WikiRace"
2. Ajoutez le domaine dans Business Manager
3. Vérifiez les Open Graph tags avec le [Debugger Facebook](https://developers.facebook.com/tools/debug/)

### Twitter / X

1. Créez le compte @wikirace_game
2. Vérifiez les Twitter Cards avec le [Card Validator](https://cards-dev.twitter.com/validator)

### LinkedIn

1. Créez une page entreprise "WikiRace"
2. Testez le partage avec le [Post Inspector LinkedIn](https://www.linkedin.com/post-inspector/)

---

## 🎯 Mots-clés à Tracker

### Google Search Console

Ajoutez ces mots-clés dans le suivi des performances :

- jeu wikipedia
- course wikipedia
- jeu éducatif multijoueur
- wikipedia game
- jeu culture générale
- comment jouer wikipedia
- créer partie wikipedia
- jeu gratuit éducatif

### Ahrefs Position Tracking

Configurez le suivi pour la France avec ces mots-clés :

```
jeu wikipedia
course wikipedia
jeu éducatif multijoueur
wikipedia game français
jeu culture générale en ligne
multijoueur éducatif gratuit
comment jouer au jeu wikipedia
créer partie wikipedia game
règles jeu course wikipedia
meilleur jeu éducatif ligne
```

---

## 📈 KPIs à Surveiller (Hebdomadaire)

### Google Analytics 4

- **Utilisateurs uniques** : Objectif +20% semaine
- **Sessions** : Durée moyenne >3 minutes
- **Pages par session** : >2.5 pages
- **Taux de rebond** : <60%
- **Conversions** : Parties créées/rejointes

### Google Search Console

- **Impressions** : Croissance constante
- **Clics** : CTR moyen >3%
- **Position moyenne** : Amélioration mensuelle
- **Couverture** : 100% pages indexées

### Performance Web

- **Core Web Vitals** : Toutes métriques "Good"
- **PageSpeed Score** : >95 mobile/desktop
- **Accessibilité** : Score >95 (Lighthouse)

---

## 🚨 Alertes à Configurer

### Google Search Console

- Erreurs d'exploration
- Problèmes de couverture
- Problèmes Core Web Vitals
- Problèmes de sécurité

### Ahrefs

- Nouveaux backlinks
- Backlinks perdus
- Mentions de marque
- Nouveaux mots-clés dans top 100

### Google Analytics

- Chute de trafic >20%
- Spike de trafic inhabituel
- Erreurs 404 fréquentes
- Problèmes de conversion

---

## 📝 Checklist Déploiement SEO

### Avant le lancement

- [ ] ✅ Sitemap.xml généré et accessible
- [ ] ✅ Robots.txt optimisé
- [ ] ✅ Meta tags sur toutes les pages
- [ ] ✅ Schema markup implémenté
- [ ] ✅ Open Graph configuré
- [ ] ✅ Canonical URLs définies
- [ ] ✅ Alt texts sur toutes les images
- [ ] ✅ Liens internes optimisés

### Après le lancement

- [ ] Google Search Console configuré
- [ ] Google Analytics 4 actif
- [ ] Bing Webmaster Tools ajouté
- [ ] Sitemap soumis aux moteurs
- [ ] Social media configuré
- [ ] Tracking des mots-clés actif
- [ ] Monitoring performance en place

---

## 🎊 Prochaines Étapes (30 jours)

1. **Semaine 1** : Configuration complète outils
2. **Semaine 2** : Création contenu blog (5 articles)
3. **Semaine 3** : Campagne de link building
4. **Semaine 4** : Optimisation basée sur premières données

**Objectif 30 jours** : 1,000 visiteurs organiques/mois et position top 10 sur "jeu wikipedia" 🚀

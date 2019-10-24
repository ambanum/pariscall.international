# ParisCall
Public website for the Paris Call for Trust and Security in Cyberspace / Site public de l'Appel de Paris pour la confiance et la sécurité dans le cyberespace

## How to add a language

Add the language in `_config.yml`:

```
available_languages: [ "en", "fr" ]
```

Add translations for the language in the `data/translations.yml`:

```
lang:
  en: "English"
  fr: "Français"
  es: "Español"
menu:
  home:
    en: "Home"
    fr: "Accueil"
    es: "Inicio"
```

Duplicate `_pages/en` content in `_pages/$language_code` and translate its content.
Its important to change all `lang` and `permalink` in all front matter.

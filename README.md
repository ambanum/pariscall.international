# ParisCall
Public website for the Paris Call for Trust and Security in Cyberspace / Site public de l'Appel de Paris pour la confiance et la sécurité dans le cyberespace

## How to add a language

Add the language in `_config.yml`:

```
available_languages: [ en, fr ]
```

Add translations for the language in the `data/translations` files:

```
lang:
  en: English
  fr: Français
menu:
  home:
    en: Home
    fr: Accueil
```

Duplicate `_pages/en` content in `_pages/$language_code` and translate its content.
Change all `permalink` attributes in front matters.
Duplicate `_supporters_en` content in `_supporters_$language_code`.

- - -

[ENGLISH]
## How to embed supporters counters

Copy and paste the following code into your HTML page where you want the counters:

```html
<iframe id="paris-call-iframe-counters" src="https://fb234666.ngrok.io/fr/embed/counters" style="width:100%;border:none;"></iframe><script>window.onmessage=function(e){e.data.hasOwnProperty("frameHeight")&&(document.getElementById("paris-call-iframe-counters").style.height=`${e.data.frameHeight}px`)}</script>
```

_Note_: The piece of script is used to correctly size the iframe height according to the size of its content, so that all its content is visible but it does not take up more space than necessary.

[FRANÇAIS]
## Comment intégrer des compteurs de supporters dans sa page

Copiez et collez le code suivant dans votre page HTML à l'endroit ou vous souhaitez avoir les compteurs :

```html
<iframe id="paris-call-iframe-counters" src="https://fb234666.ngrok.io/fr/embed/counters" style="width:100%;border:none;"></iframe><script>window.onmessage=function(e){e.data.hasOwnProperty("frameHeight")&&(document.getElementById("paris-call-iframe-counters").style.height=`${e.data.frameHeight}px`)}</script>
```

_Note_: Le morceau de script sert à dimensionner correctement l'iframe en hauteur en fonction de la taille de son contenu, de sorte que l'ensemble de son contenu soit visible mais qu'elle ne prenne pas plus de place que nécessaire.

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

Create assets `assets/images/logo-circle-$language_code.png`, `assets/images/full-logo-$language_code.png` and `assets/images/logo-title-$language_code.png` for the new language.

Create forms for the new language in Typeform interface. Duplicate the english version of the form to ensure structure and questions references are the same.

Add webhooks on theses new forms to connect them to the server. In the admin typeform interface when you are on your form, click on the tab `CONNECT` then the tab `WEBHOOKS` and on the button `Add a webhook`. Enter the url after replacing `$event_or_supporter` and `$language_code` with the proper values: `https://pariscall.international/api/webhook/$event_or_supporter?lang=$language_code`. Also add the secret key in the corresponding field.

Add the newly created Typeforms forms urls in `_config.yml`:

```
typeform_urls:
  support:
    en: https://ambanum.typeform.com/to/nsd98d
    fr: https://ambanum.typeform.com/to/Kg6GFs
  event:
    en: https://ambanum.typeform.com/to/BSLKjs
    fr: https://ambanum.typeform.com/to/jkHAEH
```

See [ambanum/pariscall.international-backend](https://github.com/ambanum/pariscall.international-backend) readme for adding new language support also on the backend side.

- - -

## How to embed supporters counters in your website

Copy and paste the following code into your HTML page where you want the counters:

```html
<iframe id="paris-call-iframe-counters" src="https://pariscall.international/en/embed/counters" style="width:100%;border:none;"></iframe>
```

You can choose the language by modifying the URL of the iframe. For example:

- French: `https://pariscall.international/en/embed/counters`
- English: `https://pariscall.international/fr/embed/counters`

The list of available languages is available [here](https://github.com/ambanum/ParisCall/blob/master/_config.yml#L9).

In order to make the iframe reactive (i.e. to correctly size its height according to the size of the screen), uou can add the following script in the host page, for example right after the closing `</iframe>`:

```html
<script>window.addEventListener('message',function(e){e.origin==="https://pariscall.international"&&e.data.hasOwnProperty("parisCallFrameHeight")&&(document.getElementById("paris-call-iframe-counters").style.height=`${e.data.parisCallFrameHeight}px`)});</script>
```

## Comment intégrer les compteurs de signataires dans son site Web

Copiez et collez le code suivant dans votre page HTML à l'endroit ou vous souhaitez faire apparaître les compteurs :

```html
<iframe id="paris-call-iframe-counters" src="https://pariscall.international/fr/embed/counters" style="width:100%;border:none;"></iframe>
```

Vous pouvez choisir la langue en modifiant l'URL de l'iframe, par exemple :

- français : `https://pariscall.international/en/embed/counters`
- anglais : `https://pariscall.international/fr/embed/counters`

La liste des langues disponibles est disponible [ici](https://github.com/ambanum/ParisCall/blob/master/_config.yml#L9).

Pour rendre l'iframe réactive (çàd la dimensionner correctement en hauteur en fonction de la taille de l'écran), vous pouvez ajouter le script suivant dans la page hôte, par exemple immédiatement après le tag fermant `</iframe>` :

```html
<script>window.addEventListener('message',function(e){e.origin==="https://pariscall.international"&&e.data.hasOwnProperty("parisCallFrameHeight")&&(document.getElementById("paris-call-iframe-counters").style.height=`${e.data.parisCallFrameHeight}px`)});</script>
```

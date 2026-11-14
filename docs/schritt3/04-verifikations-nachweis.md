# Verifikations-Nachweis (Schritt 3, Aufgabe E)

**Testdatum:** 14.11.2026  
**Testumgebung:** Chrome, statischer Build (`npm run generate`) auf lokalem HTTP-Server; Lighthouse 11.7.1 für die PWA-Kategorie. Lighthouse 13 bietet diese Kategorie nicht mehr an.

## Einordnung (ca. 170 Wörter)

Der Produktionsbuild wurde mit `npm run generate` erstellt. Er enthält die Startseite, „Mein Programm“, 20 Session- und 18 Speaker-Detailseiten sowie `sw.js`. Im Browser wurde die Service-Worker-Registrierung unter `/sw.js` bestätigt; der Cache `frontendnow-cache-v1` enthielt nach der Installation 43 Einträge. Nach einmaligem Online-Laden ließen sich die Startseite, eine Session-Detailseite und „Mein Programm“ über die App-Navigation im Offline-Modus anzeigen. Eine zuvor gespeicherte Session blieb dabei sichtbar; die Auswahl stammt aus dem localStorage und nicht aus einem SW-Datencache. Beim Erstbesuch auf einer frischen Origin ohne vorherigen Cache scheiterte der Aufruf erwartungsgemäß mit `ERR_INTERNET_DISCONNECTED`. Ein direkter Offline-Neuaufruf von `/user-program` scheiterte im verwendeten statischen Testserver jedoch mit `ERR_FAILED`, weil dieser die Route auf einen Slash-Pfad umleitet und der Cache die Redirect-Antwort enthält. Außerdem schlugen während der Offline-Navigation einzelne Nuxt-Payload-Prefetches fehl; die getesteten Seiten blieben sichtbar, aber diese Requests sind eine Lücke. Lighthouse meldete einen PWA-Score von 0,25; Installierbarkeit scheiterte vor allem daran, dass kein Manifest gefunden wurde. Das Manifest und die Shell-Assets liegen außerhalb dieses Teilnachweises und müssen ergänzt bzw. gegengeprüft werden.

## Szenarien und Ergebnis

| Szenario | Ergebnis | Beobachtung |
|---|---|---|
| Nach Online-Laden offline zur Programmübersicht und Session navigieren | Bestanden, mit Einschränkung | Inhalte waren sichtbar; einzelne Nuxt-Payload-Prefetches schlugen fehl. |
| „Mein Programm“ nach vorherigem Speichern offline öffnen | Bestanden über App-Navigation | Die gespeicherte Session blieb sichtbar. Direkter Offline-Neuaufruf der Route schlug im Testserver fehl. |
| Erstbesuch ohne vorheriges Online-Laden im Offline-Zustand | Erwartete Grenze bestätigt | Kein Cache vorhanden; der Browser meldete `ERR_INTERNET_DISCONNECTED`. |

## Belege

- [Offline-Aufnahme von „Mein Programm“](./assets/offline-user-program.png)
- [Lighthouse-PWA-Bericht (HTML)](./assets/lighthouse-pwa.html)

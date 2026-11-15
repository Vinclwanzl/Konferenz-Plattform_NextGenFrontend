# Verifikations-Nachweis (Schritt 3, Aufgabe E)

**Testzeitraum:** 14.–15.11.2026
**Testumgebung:** Chrome, statischer Build (`npm run generate`) auf lokalem HTTP-Server; Lighthouse 11.7.1 für die PWA-Kategorie. Lighthouse 13 bietet diese Kategorie nicht mehr an.

## Einordnung

Der Produktionsbuild wurde mit `npm run generate` erstellt. Er enthält die Startseite, „Mein Programm“, 20 Session- und 18 Speaker-Detailseiten sowie `sw.js`. Im Browser wurde die Service-Worker-Registrierung unter `/sw.js` bestätigt; der Cache `frontendnow-cache-v1` enthielt nach der Installation 43 Einträge. Nach einmaligem Online-Laden ließen sich die Startseite, eine Session-Detailseite und „Mein Programm“ über die App-Navigation im Offline-Modus anzeigen. Eine zuvor gespeicherte Session blieb dabei sichtbar; die Auswahl stammt aus dem localStorage und nicht aus einem SW-Datencache. Beim Erstbesuch auf einer frischen Origin ohne vorherigen Cache scheiterte der Aufruf erwartungsgemäß mit `ERR_INTERNET_DISCONNECTED`. Ein direkter Offline-Neuaufruf von `/user-program` scheiterte im verwendeten statischen Testserver jedoch mit `ERR_FAILED`, weil dieser die Route auf einen Slash-Pfad umleitet und der Cache die Redirect-Antwort enthält. Außerdem schlugen während der Offline-Navigation einzelne Nuxt-Payload-Prefetches fehl; die getesteten Seiten blieben sichtbar, aber diese Requests sind eine Lücke.

Der erste Lighthouse-Lauf ergab einen PWA-Score von 0,25, da kein Manifest gefunden wurde. Nach Ergänzung des Manifest-Links, gültiger Farben und eines vorhandenen 192×192-Icons wurde `npm run generate` erneut ausgeführt und Lighthouse 11.7.1 wiederholt: Der PWA-Score beträgt nun 0,88 und die Installierbarkeitsprüfung besteht. Als verbleibender PWA-Auditpunkt wird die Viewport-Breite (`content-width`) beanstandet; der Audit ist daher nicht vollständig fehlerfrei.

## Szenarien und Ergebnis

| Szenario | Ergebnis | Beobachtung |
|---|---|---|
| Nach Online-Laden offline zur Programmübersicht und Session navigieren | Bestanden, mit Einschränkung | Inhalte waren sichtbar; einzelne Nuxt-Payload-Prefetches schlugen fehl. |
| „Mein Programm“ nach vorherigem Speichern offline öffnen | Bestanden über App-Navigation | Die gespeicherte Session blieb sichtbar. Direkter Offline-Neuaufruf der Route schlug im Testserver fehl. |
| Erstbesuch ohne vorheriges Online-Laden im Offline-Zustand | Erwartete Grenze bestätigt | Kein Cache vorhanden; der Browser meldete `ERR_INTERNET_DISCONNECTED`. |

## Belege

- [Offline-Aufnahme von „Mein Programm“ (Vincent)](./assets/Vincent/Scenario-II-Mein_Programm-offline.png)
- [Erster Lighthouse-PWA-Bericht (HTML)](./assets/Vincent/lighthouse-pwa.html)
- [Aktualisierter Lighthouse-PWA-Bericht nach Manifest-Fix (HTML)](./assets/Vincent/lighthouse-pwa-after-fix.html)

## Separater Testlauf Vincent (15.11.2026)

Die drei Szenarien wurden zusätzlich auf dem Windows-Workspace mit einem frischen statischen Produktionsbuild geprüft. Der Workbox-Precache enthielt 118 Einträge; bei den Offline-Aufrufen blieben die Seiten sichtbar, während einzelne Nuxt-Payload-Anfragen fehlschlugen.

- [Szenario I - Übersicht offline](./assets/Vincent/Scenario-I-offline-session-overview.png)
- [Szenario I - Übersicht Cache](./assets/Vincent/Scenario-I-supporting-evidence–filled-cache.png)
- [Szenario II - Mein Programm offline](./assets/Vincent/Scenario-II-Mein_Programm-offline.png)
- [Szenario III - Erster Besuch offline](./assets/Vincent/Scenario-III-first-visit-offline.png)

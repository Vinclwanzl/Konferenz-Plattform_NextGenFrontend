# Entscheidungsprotokoll: Rendering- (Schritt 2) und Offline-/Caching-Strategie (Schritt 3)

## Kontext

Bewertungsgrundlage sind die Entscheidungen aus Schritt 2 (Rendering-Strategie pro Anwendungsteil, siehe `docs/schritt2/01-rendering-strategie-adr.md`) und Schritt 3 (Offline- und Caching-Strategie). Ausgangspunkt ist die reale Nutzungssituation der Konferenz: Vortragssäle mit unzuverlässigem WLAN, Flugmodus zwischen Sessions. Die App muss offline die Kernfunktionen liefern: Programmübersicht, Session-Details, Speaker-Profile und das persönliche Programm.

## Optionen (Schritt 3: Caching-Strategien je Datentyp)

Für jeden Datentyp standen grundsätzlich zur Wahl: Cache First, Network First, Stale-While-Revalidate, Cache Only, Network Only, sowie die Option, Daten gar nicht über den Service-Worker-Cache, sondern über clientseitige Persistenz (localStorage) zu führen. Da alle Programmdaten per SSG im Build vorliegen und zur Laufzeit keine Daten-Requests existieren, entfielen Network First und Stale-While-Revalidate für den Ist-Zustand; Stale-While-Revalidate bleibt dokumentierte Reserve für ein künftiges Backend (z. B. kurzfristige Raumänderungen).

## Entscheidungen

**Schritt 2 (zusammengefasst):** SSG für Übersichts-, Speaker- und Session-Detailseiten; CSR mit localStorage-Persistenz für „Mein Programm" (Begründungen im Rendering-ADR, Status: akzeptiert).

**Schritt 3:**

1. **Sessions-/Speaker-Daten (vorerzeugte Seiten): Cache First über den Precache.** Veraltete Daten sind fast harmlos (Programm steht nach Veröffentlichung fest); fehlende Daten offline wären inakzeptabel.
2. **App-Shell (Layout, Icons, Fonts, Token-CSS): Cache First / Precache.** Assets ändern sich während der Veranstaltung nicht; die Shell ist Voraussetzung für alle Offline-Funktionen.
3. **„Mein Programm": localStorage statt SW-Cache.** Die Auswahl ist ohnehin clientseitig persistiert (State-Management-Konzept); der Service-Worker cached nur die darstellende Seite und Shell.

Umsetzung über `@vite-pwa/nuxt` mit `generateSW`-Strategie; der Navigation-Fallback beantwortet Offline-Navigationen mit der precachten Startseite.

## Konsequenzen

- Alle drei Datentypen sind nach einmal-Online-Laden vollständig offline nutzbar.
- Programmänderungen erfordern Rebuild + Deployment; installierte Apps aktualisieren sich beim nächsten Start (autoUpdate).
- Erstbesuch im Offline-Zustand ist technisch nicht offline-fähig (kein Cache vorhanden); akzeptiertes Grenzverhalten mit Offline-Hinweis.
- Bei einem künftigen Live-Backend müssten Entscheidung 1 zugunsten von Stale-While-Revalidate und die Rendering-Entscheidungen (SSR/ISR) revidiert werden, bewusste, dokumentierte Grenze statt stillschweigender Wechsel.

## Testszenarien

Beide Teammitglieder haben die Szenarien unabhängig auf eigenen Rechnern durchgeführt (Chrome DevTools, Network-Tab „Offline"; statischer Build via `npm run generate` auf lokalem HTTP-Server).

### Szenario i: Online geladen, dann Flugmodus, Session-Übersicht erneut geöffnet

- **Ausgangslage:** App wurde mindestens einmal online geladen; Service Worker aktiv, Precache gefüllt 117 Einträgen.
- **Aktion:** DevTools Network „Offline" aktiviert, anschließend Startseite und Session-Übersicht über die Navigation aufgerufen.
    Katharina, 15.11.2026, Chrome 157.0.8103.52, macOS: Startseite und Session-Übersicht luden offline aus dem Precache, keine Fehlerseite
- **Beobachtetes Verhalten:** Seiten laden aus dem Precache, keine Browser-Fehlerseite. Anfangs aufgetretene Fehler (`non-precached-url` für `/`) wurden durch explizite `globPatterns`-Erweiterung behoben und im zweiten Durchlauf bestätigt — Dokumentation des Fix-Zyklus zeigt iterative Entwicklung.

### Szenario ii: „Mein Programm" offline geöffnet, nachdem Sessions hinzugefügt wurden

- **Ausgangslage:** Mindestens eine Session wurde online zum persönlichen Programm hinzugefügt (localStorage), App einmal geladen.
- **Aktion:** Offline-Modus aktiviert, „Mein Programm" geöffnet — einmal über App-Navigation, einmal durch direkten Aufruf der Route.
- **Beobachtetes Verhalten:** [Ergebnis einsetzen: gespeicherte Sessions bleiben sichtbar; Auswahl stammt aus localStorage, nicht aus dem SW-Datencache. Der direkte Offline-Aufruf der Route schlug im ersten Test am statischen Server fehl (Redirect-Antwort im Cache, `ERR_FAILED`); nach Einführung des Navigation-Fallbacks wurde der direkte Aufruf nachgebaut und [Ergebnis des Re-Tests vom Teamkollegen einsetzen].]

### Szenario iii: Erstbesuch ohne vorheriges Online-Laden im Offline-Zustand

- **Ausgangslage:** Frische Origin ohne Cache und Service-Worker-Registrierung; Gerät offline.
- **Aktion:** App-Adresse im Offline-Zustand aufgerufen.
- **Beobachtetes Verhalten:** Browser meldet `ERR_INTERNET_DISCONNECTED`. Bewertung: akzeptables Verhalten, es existiert schlicht kein gespeicherter Inhalt auf dem Gerät; die App kann offline nichts anzeigen, was sie nie laden konnte. Verbesserungsoption (Offline-Statusseite als Precache-Fallback) wurde erwogen, da sie den Erstbesuch-Offline-Fall technisch nicht abdecken kann (kein Cache vorhanden), wurde sie nicht umgesetzt.

## Verifikation

Screenshots und Lighthouse-Auszug je Szenario: siehe `04-verifikations-nachweis.md` und `assets/`.
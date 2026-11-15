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

Die Szenarien wurden von beiden Teammitgliedern unabhängig auf eigenen Rechnern geprüft (Chrome DevTools, Network-Tab „Offline“; generierte App auf lokalem HTTP-Server). Die Screenshots dokumentieren die jeweiligen Browserzustände. Beim direkten Offline-Aufruf von „Mein Programm“ unterschieden sich die Ergebnisse je nach verwendetem lokalen Server; dieser Unterschied wird bei Szenario ii festgehalten und nicht als uneingeschränkt bestanden gewertet.

### Szenario i: Online geladen, dann Flugmodus, Session-Übersicht erneut geöffnet

- **Ausgangslage und Aktion:** Die generierte App wurde online auf `localhost:4173` geöffnet und der Service Worker installiert. Im Chrome-Network-Tab wurde danach „Offline“ aktiviert; die Startseite beziehungsweise Session-Übersicht wurde erneut geöffnet.
- **Beobachtetes Verhalten:** Die Seite zeigte die Konferenzübersicht mit 20 Sessions statt einer Browser-Fehlerseite. Die DevTools-Aufnahme zeigt erfolgreiche Antworten aus dem Service-Worker-/Cache-Kontext. Eine ergänzende Cache-Aufnahme zeigt 118 Einträge, darunter die Startseite, Session- und Speaker-Routen sowie „Mein Programm“. Ein erster Testlauf hatte noch `non-precached-url` für `/` gemeldet; nach Anpassung der Precaching-Konfiguration wurde der Ablauf erneut geprüft und die Übersicht offline angezeigt.
- **Ergebnis:** Bestanden für die getestete Produktionsvorschau. Der Screenshot belegt das Verhalten dieser Origin; er sagt nichts über eine frische Installation ohne vorherigen Cache aus.
- **Belege:** [Offline-Übersicht (Katharina)](./assets/Katharina/Scenario-I-offline-session-overview.png), [Cache-Einträge (Katharina)](./assets/Katharina/Scenario-I-supporting-evidence–filled-cache.png), [Offline-Übersicht (Vincent)](./assets/Vincent/Scenario-I-offline-session-overview.png), [Cache-Einträge (Vincent)](./assets/Vincent/Scenario-I-supporting-evidence–filled-cache.png)

### Szenario ii: „Mein Programm" offline geöffnet, nachdem Sessions hinzugefügt wurden

- **Ausgangslage und Aktion:** Online wurden zwei Sessions zum persönlichen Programm hinzugefügt. Danach wurde Chrome auf „Offline“ gestellt und `/user-program` in der Produktionsvorschau direkt geöffnet.
- **Beobachtetes Verhalten:** Beide Sessions samt Entfernen-Schaltflächen blieben sichtbar. Das passt zur Speicherung der IDs in `localStorage`; die Auswahl wird nicht aus einem SW-Datencache rekonstruiert. Der Screenshot auf `localhost:4173` belegt den direkten Offline-Aufruf. In einem separaten Test mit Pythons statischem Server scheiterte derselbe Aufruf wegen dessen Slash-Redirect (`ERR_FAILED`), obwohl die Seite über App-Navigation offline verfügbar war.
- **Ergebnis:** In der Produktionsvorschau bestanden. Der abweichende Testserver-Befund bleibt eine Einschränkung und ist beim Cross-Review erneut zu prüfen.
- **Belege:** [„Mein Programm“ offline (Katharina)](./assets/Katharina/Scenario-II-Mein_Programm-offline.png), [„Mein Programm“ offline (Vincent)](./assets/Vincent/Scenario-II-Mein_Programm-offline.png)

### Szenario iii: Erstbesuch ohne vorheriges Online-Laden im Offline-Zustand

- **Ausgangslage und Aktion:** Verwendet wurde eine frische Origin ohne Service Worker und App-Cache. In Chrome DevTools wurde „Offline“ aktiviert, bevor die App-Adresse erstmals aufgerufen wurde.
- **Beobachtetes Verhalten:** Die App konnte nicht laden; Chrome zeigte `ERR_INTERNET_DISCONNECTED`. Es gab keine gespeicherten Programmseiten, aus denen der Service Worker hätte antworten können. Der Screenshot zeigt den fehlgeschlagenen Dokument-Request im Network-Tab.
- **Ergebnis und Bewertung:** Das ist die erwartete Grenze: Ein Service Worker kann nur zuvor gespeicherte Inhalte bereitstellen. Eine Offline-Statusseite im Precache könnte spätere Verbindungsabbrüche verständlicher machen, aber nicht diesen Erstbesuch ohne vorherige Verbindung abdecken. Der Grenzfall ist daher akzeptabel und transparent dokumentiert.
- **Belege:** [Erstbesuch offline (Katharina)](./assets/Katharina/Scenario-III-first-visit-offline.png), [Erstbesuch offline (Vincent)](./assets/Vincent/Scenario-III-first-visit-offline.png)

## Verifikation

Screenshots zu den drei Szenarien und der Lighthouse-Bericht sind im [Verifikations-Nachweis](./04-verifikations-nachweis.md) sowie im Ordner `assets/` abgelegt.
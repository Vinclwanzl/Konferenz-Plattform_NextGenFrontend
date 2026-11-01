# ADR: Rendering-Strategie — SSG, CSR, SSR und ISR pro Anwendungsteil

- Status: Vorgeschlagen (im Team-Review)
- Datum: 2026-11-01
- Entscheidungspunkte 1–2: Katharina (Übersicht + Filter, Speaker-Profile)
- Entscheidungspunkte 3–4: Vincent (Session-Detailseiten, „Mein Programm")

## Einleitung

Für die FrontendNow-Plattform wählen wir die Rendering-Strategie bewusst pro Anwendungsteil, statt einen impliziten Framework-Default zu übernehmen. Die wichtigsten Auswahlkriterien folgen aus den Dateneigenschaften zur Laufzeit: Ändert sich der Inhalt nie, genügt Static Site Generation zum Build-Zeitpunkt (SSG). Ist der Inhalt rein personalisiert und nur clientseitig verfügbar, wie der localStorage-State des persönlichen Programms-, ist CSR die passende Strategie. Kann sich der Inhalt zwischen Deployments ändern, etwa bei Zeitplanänderungen durch das Organisationsteam, wären SSR oder ISR nötig. Unser Konferenzdatensatz liegt als statische JSON-Datei im Build; die meisten Teile fallen daher auf SSG. Abweichungen von den im Szenario nahegelegten Zuordnungen werden pro Entscheidungspunkt explizit begründet.

## Entscheidungspunkt 1: Session-Übersicht mit Filtern

### Kontext

Die Übersicht zeigt alle 20 Sessions und erlaubt Filterung nach Track, Konferenztag und Level mit UND-Verknüpfung. Die Session-Daten sind zum Build-Zeitpunkt vollständig bekannt (statischer JSON-Datensatz) und ändern sich zur Laufzeit nicht. Was sich dynamisch verhält, ist allein der Filterzustand: Er entsteht aus der Interaktion der Nutzerin bzw. des Nutzers und existiert damit ausschließlich clientseitig.

### Optionen

**Option 1: SSR pro Request.** Jede Anfrage rendert die Übersicht serverseitig neu. Das wäre erforderlich, wenn die Session-Daten pro Request von einem Backend kämen oder sich häufig änderten. Für einen statischen, im Build eingecheckten Datensatz bedeutet es jedoch unnötige Serverlast ohne aktuellen Daten zu gewinnen; SSR wäre hier nie die Begründung, nur der Aufwand.

**Option 2: SSG mit clientseitiger Filterung (CSR).** Die Übersichtsseite inklusive aller 20 Sessions wird zum Build-Zeitpunkt statisch erzeugt. Die Filterung läuft als reine Client-Logik im Composable `useSessionFilter()`, da der gefilterte Zustand ohnehin nur im Browser existiert.

**Option 3: ISR.** Regenerierung im Hintergrund wäre bei sich änderndem Zeitplan relevant. Mit eingechecktem JSON ändert sich der Datensatz ausschließlich per Deployment — dann ist ohnehin ein neuer Build der natürliche Aktualisierungspfad, und ISR hätte zwischen Deployments nichts zu regenerieren.

### Entscheidung

Wir kombinieren SSG für die Seite mit CSR für die Filterlogik. `nuxt generate` prerendert die Übersicht; `useSessionFilter()` filtert die im geteilten State vorhandenen Sessions clientseitig, ohne Netzwerkroundtrips.

### Konsequenzen

Positiv: schnellster Erst-Content, kein Serverlaufzeitbetrieb für die Übersicht, Filter reagieren ohne Round-Trips, und die Filterlogik bleibt wie in ADR 02 festgelegt headless und damit separat testbar. Negativ: Änderungen am Zeitplan erfordern einen Rebuild statt einer Backend-Aktualisierung; bei einem künftigen echten Backend müsste dieser Punkt zugunsten von SSR/ISR revidiert werden. Diese Abweichung würden wir hier nachtragen statt sie stillschweigend umzusetzen. Die Session-Detail-Routen sind bis zur Fertigstellung von Teil C in der Prerender-Konfiguration auskommentiert.

## Entscheidungspunkt 2: Speaker-Profilseiten

### Kontext

Für alle 18 Speaker gibt es eine eigene Profilroute (`/speakers/[id]`) mit Name, Titel, Firma, Bio und den verlinkten Sessions. Sämtliche Inhalte sind im statischen Datensatz enthalten und ändern sich zur Laufzeit nicht. Im Gegensatz zur Übersicht gibt es keinen interaktiven Anteil: Die Profilseite ist reiner Content ohne nutzerabhängigen Zustand.

### Optionen

**Option 1: SSG.** Alle 18 Profilseiten werden beim Build erzeugt, da die IDs und Inhalte statisch bekannt sind; Nuxt löst die dynamischen Routen aus dem Datensatz auf (`nitro.prerender.routes`).

**Option 2: CSR (SPA-Modus).** Es wird eine einzige Shell ausgeliefert, jede Profilseite erst im Browser gerendert. Das hätte Nachteile bei Ladezeit, SEO-Indizierung und Teilbarkeit von Profil-Links, ohne dass irgendein Datenmerkmal es verlangt.

**Option 3: SSR pro Request.** Würde jeden Profilaufruf serverseitig rendern — dasselbe Ergebnis wie SSG, nur mit wiederholtem Aufwand pro Request; bei statischen Daten ist SSG in jeder Dimension mindestens gleich gut.

**Option 4: ISR.** Die Mittelwahl, falls sich Profile zwischen Deployments ändern könnten. Im aktuellen Szenario gäbe es damit nichts zu regenerieren; ISR bliebe eine Reserve für ein späteres Redaktionssystem.

### Entscheidung

Wir entscheiden uns für SSG. Die Profilrouten werden über die in `nuxt.config.ts` konfigurierten Prerender-Routen aus dem Datensatz erzeugt; unbekannte IDs führen über `createError` zu einem vorgerenderten 404-Fehler statt im Client zu scheitern.

### Konsequenzen

Positiv: maximale Performance, vollständige SEO- und Link-Teilbarkeit der Profil-URLs, keine Serverlaufzeit, definierte 404-Semantik. Negativ: Ein neues Speaker-Profil oder eine Bio-Korrektur erfordert einen Rebuild — im Konferenzkontext akzeptabel, da das Programm vor der Veranstaltung feststeht; bei Redaktion zur Laufzeit müsste auf ISR oder SSR mit Backend migriert werden (Nachtrag im ADR).

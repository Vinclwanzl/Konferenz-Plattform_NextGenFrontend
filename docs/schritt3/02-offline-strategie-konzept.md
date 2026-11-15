# Konzept: Offline- und Caching-Strategie (Schritt 3, Aufgabe B)

## Kontext und Nutzungssituation

Die reale Nutzungssituation der FrontendNow-Konferenz ist der Ausgangspunkt aller Entscheidungen: Besucher:innen stehen in Vortragssälen mit unzuverlässigem Konferenz-WLAN und überbrücken mit der App die Zeit zwischen zwei Sessions, teils im Flugmodus. Die App muss in dieser Situation die Kernfunktionen liefern: Programm, Session-Details, Speaker-Profile und das persönliche Programm.

Voraussetzung ist unsere Rendering-Entscheidung aus Schritt 2: Sessions, Speaker- und Detailseiten werden per Static Site Generation zum Build-Zeitpunkt vorerzeugt; der Datensatz liegt statisch als `conference-data.json` im Build. „Mein Programm" ist clientseitig im localStorage persistiert (State-Management-Konzept). Daraus ergibt sich die Caching-Strategie je Datentyp wie folgt.

## Datentyp 1: Sessions- und Speaker-Daten (vorerzeugte Seiten)

**Entscheidung: Cache First, umgesetzt über den Precache.**

Begründung über die beiden Leitfragen: (1) Wie schlimm sind leicht veraltete Daten? Fast harmlos, nach Programm-Veröffentlichung ändern sich die Daten nicht mehr. (2) Wie schlimm sind keine Daten offline? Inakzeptabel, ohne Programmübersicht ist die App in der Konferenzsituation wertlos.

Weil die Daten im Build eingecheckt sind, gibt es zur Laufzeit keine Daten-Requests, denen eine Strategie zugeordnet werden müsste: Die vorerzeugten Seiten selbst werden beim ersten Besuch im Precache gespeichert und ab dann bevorzugt aus dem Cache ausgeliefert. Das entspricht funktional Cache First für Sessions- und Speaker-Daten.

**Alternative Stale-While-Revalidate:** relevant, falls Programmdaten künftig zur Laufzeit von einem Backend kämen, etwa bei kurzfristigen Raumänderungen. Der Kompromiss wäre, dass Nutzer:innen beim ersten Laden den Stand vom letzten Besuch sehen; im Hintergrund würde die Daten beim nächsten Zugriff aktualisiert. Solange Änderungen nur per Rebuild und Deployment ausgeliefert werden, hat Stale-While-Revalidate keine Laufzeit-Requests zum Aktualisieren; die aktualisierten Seiten kommen dann über das Service-Worker-Update (autoUpdate) beim nächsten Besuch an. 

## Datentyp 2: App-Shell (Layout, Icons, Fonts, Token-CSS)

**Entscheidung: Cache First / Precache.**

Diese Assets ändern sich während der Veranstaltung gar nicht, veraltete Kopien sind ausgeschlossen. Die Shell ist zugleich Voraussetzung für alles andere: Nur wenn Layout und Stylings offline laden, können auch die Programmseiten und „Mein Programm" angezeigt werden.

## Datentyp 3: „Mein Programm"

**Entscheidung: keine SW-Cache-Strategie für die Daten selbst — sie liegen im localStorage.**

Die Auswahl (Session-IDs) ist nach unserem State-Konzept ohnehin auf dem Gerät gespeichert. Die Caching-Entscheidung betrifft nur die darstellende Seite und Shell: Sie muss im Precache liegen, damit die lokal gespeicherten Daten offline angezeigt werden können. Die Precache-Liste enthält daher auch „Mein Programm“; die Session-Detail-Routen werden beim Build vorgerendert und offline verfügbar gemacht. Die Auswahl selbst wird weiterhin aus dem localStorage gelesen und nicht im Service-Worker-Cache gespeichert.

## Worst Case: vollständiger Verbindungsabbruch

Wurde die App einmal online geladen, bleiben Precache und localStorage nutzbar; die getesteten Kernseiten können offline angezeigt werden. Beim allerersten Aufruf im Offline-Zustand existiert noch kein Cache und der Browser kann die App nicht laden. Das ist der akzeptierte Grenzfall: Nutzer:innen müssen die App einmal online öffnen. Eine Offline-Statusseite könnte bei späteren Verbindungsabbrüchen helfen, aber nicht bei diesem Erstbesuch ohne gespeicherte Inhalte.
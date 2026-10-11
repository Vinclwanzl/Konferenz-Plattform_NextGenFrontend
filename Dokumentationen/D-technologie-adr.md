ADR D: Technologieentscheidung – Nuxt als Projekt-Setup
Status: Akzeptiert
Datum: 2026-10-11
Kontext
Für die Konferenz-App FrontendNow muss ein Projekt-Setup gewählt werden, das die Anforderungen an mehrere Seiten, eine kleine, aber strukturierte Anwendung, Routing, Composables und schnelle Iteration berücksichtigt. Die App benötigt eine einfache, aber skalierbare Frontend-Architektur mit mehreren Ansichten: Startseite, Speaker-Übersicht, Session-Übersicht und persönlichem Programm.

Die Entscheidung betrifft nicht die Renderstrategie im Detail, sondern die grundlegende Technologiebasis für die Anwendung.

Alternativen
Option 1: Nuxt 3
Nuxt 3 basiert auf Vue 3 und bietet File-based Routing, automatische Layout-/Page-Struktur, Composables und eine produktionsreife Toolchain.

Vorteile:

schnelle Einrichtung für mehrere Seiten
geringe Einstiegshürde bei Routing und Projektstruktur
gute Passung zur Vue-/Composition-API-Architektur
gute Grundlage für spätere Erweiterungen
direkte Integration mit Nuxt-Patterns wie useState, Composables und Layouts
Nachteile:

stärkerer Rahmen als ein reines Vite-Setup
Architektur muss sauber eingehalten werden, um nicht unstrukturiert zu werden
Option 2: Vue + Vite + vue-router
Ein reinem Vue-basierter Setup mit Vite und eigenem Router.

Vorteile:

hoher Grad an Freiheit im Aufbau
leicht verständlich bei kleinen Projekten
sehr flexibel in der Projektorganisation
Nachteile:

mehr manuelle Einrichtung nötig
Routing, Struktur und State-Handling müssen selbst organisiert werden
für mehrere Seiten und späteren Umfang weniger konsistent
weniger geeignet, wenn die Projektstruktur von Anfang an sauber und skalierbar sein soll
Entscheidung
Wir wählen Nuxt 3 als Grundgerüst.

Die Entscheidung basiert auf dem klaren Routing-Bedarf, der vorhandenen Vue-Erfahrung und der erwarteten späteren Erweiterbarkeit. Nuxt passt hervorragend zu einer Content- und Konferenz-App mit mehreren Seiten, gemeinsamen Layouts und dynamischer Datenpräsentation. Die file-based Routing-Struktur unterstützt eine saubere, nachvollziehbare Projektorganisation.

Konsequenzen
Positiv
schneller Start mit strukturierter Projektbasis
gute Passung zu multiplen Seiten und freigegebenen Layouts
Composables und useState vereinfachen gemeinsame Datenmodelle
spätere Erweiterungen, z. B. Detailseiten oder Dashboard-Features, lassen sich sauber einbauen
Negativ
die Anwendung ist durch Nuxt-Conventionen etwas stärker vorgegeben
Entscheidungen zu Architektur und Struktur müssen bewusst getroffen werden
Ein unorganisierter Aufbau würde Nuxt-Mechaniken nicht optimal nutzen
Ergebnis
Nuxt 3 ist die passende Grundlage für dieses Projekt. Die Kombination aus Vue 3, file-based Routing, Composables und Nuxt-Layouts schafft die richtige Balance aus Produktivität, Struktur und Erweiterbarkeit. Die Entscheidung bildet die technische Grundlage für die in ADR 02 und dem State-Konzept beschriebenen Architekturen.

flowchart LR
    A[Nuxt 3] --> B[Pages]
    A --> C[Layouts]
    A --> D[Composables]
    A --> E[Assets / Data]
    B --> F[Session-Overview]
    B --> G[Speaker-Overview]
    B --> H[My Program]
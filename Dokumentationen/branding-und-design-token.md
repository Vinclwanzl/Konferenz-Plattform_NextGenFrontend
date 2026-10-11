01 Branding und Design Tokens

Team: Rule of fun
Projekt: FrontendNow Konferenz Website
Schritt 1, Aufgabe A

### Markenkonzept

FrontendNow ist eine zweitägige Frontend-Konferenz in Wien mit 20 Sessions, 5 Tracks und 18 Speakern. Die Zielgruppe sind Frontend-Profis, die Handwerk schätzen und Buzzwords ablehnen. Unsere Tagline lautet: „Zwei Tage Web-Frontend, ohne Buzzword-Bingo". Die Marke ist selbstbewusst, aber nicht laut.

Die Design-Richtung ist „Expressives Editorial": eine ruhige Basis aus Off-White und Grau, Track-Farben als einziges großes Farbmoment, charaktervolle Display-Typografie und Monospace-Details als Referenz zum Tech-Thema. Das Fundament ist reduziert und rasterbasiert, damit das Programm mit bis zu drei parallelen Sessions scanbar bleibt. Expressivität sitzt gezielt dort, wo sie Funktion hat: bei Track-Identität, Marke und Microinteractions. Die menschliche Ebene der Frontend-Arbeit wird später durch sparsam eingesetzte handgezeichnete Elemente sichtbar.

Abgewogene Alternativen waren „Neon-Tech" (dunkler Grund, leuchtende Verläufe) und „Editorial-Minimalismus" (Schwarz-Weiß, eine Akzentfarbe). Ersteres widerspricht der Scanbarkeit und dem Anti-Buzzword-Anspruch, letzteres nimmt den fünf Tracks die visuelle Identität. „Expressives Editorial" verbindet Scanbarkeit und charaktervolle Markenbildung.

### Begründung der Token-Architektur

Die Tokens sind in drei Schichten organisiert: Core (Rohwerte, z. B. --color-purple-500), Semantic (Verwendungszweck, z. B. --color-text-primary) und Component (z. B. --button-primary-bg). Kernregeln: Core beschreibt, was ein Wert ist; Semantic beschreibt, wofür er verwendet wird; jede Schicht referenziert nur die Schicht darunter, nie weiter.

Wartbarkeit. Eine Design-Änderung wird an genau einer Stelle gemacht. Soll die Markenfarbe dunkler werden, ändert sich eine Zeile (--color-accent-brand: var(--color-purple-600) statt 500), und die gesamte Website folgt. Komponenten greifen nie direkt auf Rohwerte zu, dadurch gibt es keine verstreuten Hex-Werte im Code.

Theming-Erweiterbarkeit. Der spätere Dark Mode erfordert keine Strukturänderung: Die Semantic-Schicht existiert als eigene Datei pro Modus (tokens.semantic.light.css, später tokens.semantic.dark.css) mit identischen Token-Namen und anderen Referenzen auf dieselben Rohwerte. Nur die Zuordnung dreht sich um, das System bleibt stabil.

Konsistenz. Feste Namensregeln (keine Dopplungen, eine Rolle = ein Wort, einheitliche Präfixe für color, space, radius, font, border) und berechenbare Skalen sichern die Gleichmäßigkeit: Alle Abstände folgen der Formel space-N = N × 4px, alle Radien einer festen Stufenreihe. Kein Freihand-Wert im Layout.

Track-Farben als bewusste Ausnahme: Track-Tokens dürfen Farbnamen enthalten (--color-track-purple-text), weil der Farbname hier Teil der Bedeutung ist (der Track heißt so). Jeder Track hat drei Slots: surface (Fläche), accent (Streifen, aktive Zustände) und text, jeweils kontrastgeprüft.

###  WCAG-AA-Kontrastprüfung

Alle Text-/Hintergrund-Paare wurden mit dem WebAIM Contrast Checker geprüft (Grenze 4.5:1 für Text, 3:1 für UI-Komponenten-Grenzen).

Der Haupttext auf Standardflächen erfüllt die AA-Anforderung mit deutlichem Abstand: text-primary (neutral-900) erreicht auf surface-default 17.1:1 und auf surface-canvas 16.2:1. Der sekundäre Text (neutral-700) liegt auf surface-default bei 7.6:1, der gedämpfte Text (neutral-600) bei 5.0:1 und auf surface-canvas bei 4.7:1. Ebenfalls deutlich über der Grenze liegen die Statusfarben: text-danger (red-700) bei 8.3:1, text-warning (yellow-800) bei 6.5:1, text-success (green-700) bei 4.8:1 und text-link (blue-800) bei 9.8:1, jeweils auf surface-default. Invertierte Flächen und gefärbte Hintergründe sind ebenfalls konform: text-on-inverted auf surface-inverted erreicht 17.1:1, text-danger auf surface-danger 6.5:1 und text-warning auf surface-warning 6.2:1. Der Text auf dem Marken-Button (text-primary auf accent-brand) liegt bei 6.3:1, der Focus-Ring (purple-600) auf surface-canvas bei 3.9:1 und damit über der 3:1-Grenze für UI-Komponenten. Die Track-Texte auf ihren Track-Flächen erreichen je nach Track zwischen 6.0:1 und 7.2:1.

Zwei bewusste Entscheidungen aus der Prüfung: text-muted liegt auf neutral-600 statt neutral-500, weil 500 die 4.5:1-Grenze verfehlt. Der Focus-Ring nutzt purple-600 statt purple-500, damit die 3:1-Grenze für UI-Komponenten eingehalten wird. Hinweis: text-success auf surface-success erreicht 4.26:1; für Text auf grünem Grund wird daher text-primary oder green-800 verwendet, als Icon-Badge-Kombination ist das Paar zulässig.

### Token-Dateien

Die Tokens liegen als CSS Custom Properties in tokens.css mit den Schichten Core, Semantic (Light Mode) und Component (Datei im Repository unter /tokens/tokens.css). Farb-Statusreserven: red und green sind primär Statusfarben (error/success); die Track-Slots sind so angelegt, dass jede der sieben Tracks einen visuelle Abgrenzung erhält. Die finale Auswahl der fünf Track-Farben wird im weiteren Design-Prozess getroffen; die Architektur erfordert dafür nur das Entfernen überzähliger Track-Slots, keine Strukturänderung.
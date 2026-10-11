KI-Log: Aufgabe A und D

Team: Rule of fun
KI-Tool: Mistral Vibe (GLM)

1. Zweck dieses Logs

Dokumentation der KI-Unterstützung gemäß Kursrichtlinie: welche Bereiche der Aufgabe wurden mit KI-Unterstützung erarbeitet, in welcher Form, und was der menschliche Beitrag war. Grundprinzip: KI als Werkzeug für Feedback, Erklärung und Prüfung; Design- und inhaltliche Entscheidungen wurden vom Team getroffen.

2. Übersicht der KI-Unterstützung

Die Analyse der vorhandenen Figma-Tokens (primitive, semantische und Komponenten-Ebene) wurde von der KI als Review der exportierten CSS-Dateien unterstützt: Sie identifizierte Strukturprobleme wie fehlende :root-Selektoren, Namensdopplungen, Tippfehler und doppelte Skalenwerte. Das Team bewertete die Funde und entschied, welche Fixes übernommen werden.

Beim Umbau der Token-Architektur in Core / Semantic / Component erklärte die KI das Drei-Schichten-Prinzip, schlug ein Namensschema vor (Rollen statt Farbnamen auf semantischer Ebene) und begleitete die schrittweise Einarbeitung mit Verständnisfragen. Die Lernfragen (z. B. zur Behandlung von Core-Werten, Halb-Pixel-Werten und dem Kontrastreparatur-Pfad) wurden eigenständig beantwortet; die Umbenennungen wurden vom Team in Figma umgesetzt.

Für die Spacing-Skala gab die KI die N × 4-Formel vor und reviewte die selbst erstellte Zuordnung. Die Spacing-Liste wurde eigenständig erstellt und nach dem Review korrigiert.

Bei der WCAG-AA-Kontrastprüfung berechnete die KI automatisch die Kontrastwerte für Text- und Flächen-Paare aus den konkreten Hex-Werten und identifizierte die Paare unter 4.5:1. Über die Korrekturen entschied das Team (Ummapping auf dunklere Stufen statt Änderung der Rohwerte); als Gegenprüfung ist der WebAIM Contrast Checker geplant.

Den Merge der vier Token-Dateien in eine tokens.css führte die KI durch, inklusive Fehlerkorrekturen (font-weight-Einheiten, line-height-Werte, invalides var(--size-0,5)), Sortierung und Kommentierung. Das Team stellte die exportierten Dateien bereit und nahm das Ergebnis ab.

Zum Markenkonzept und zum Dokument 01-branding-design-tokens.md gab die KI Feedback zum selbst verfassten Design-ADR (Struktur, Begründungstiefe, fehlende Token-Kriterien) und erstellte aus den im Gespräch erarbeiteten Inhalten einen Dokumententwurf. Das Design-ADR wurde eigenständig ausgearbeitet (Optionen, Abwägung, Entscheidung); den Entwurf prüfte und überarbeitete das Team inhaltlich.

Für das Technologie-ADR (Aufgabe D) erklärte die KI die Begriffe (ADR, Routing, Nuxt vs. Vue + Vite + vue-router), erläuterte sie an Codebeispielen und entwarf den ADR-Text. Die Entscheidung für Nuxt traf das Team, das den Entwurf anpasste und die Abstimmung mit der Teamkollegin (ausstehend bzw. durchgeführt) vornahm.

3. Wesentliche KI-gestützte Erkenntnisse, die ins Ergebnis eingeflossen sind

Trennung der Schichten mit der Regel: jede Schicht referenziert nur die darunterliegende (Komponenten nie direkt auf Rohwerte)

Kontrastkorrekturen auf der semantischen Ebene (text-muted auf neutral-600, Focus-Ring auf purple-600, Status-Texte auf 700/800er-Stufen) statt Änderung der Primitives

Namensregeln: keine Dopplungspräfixe, Zweck statt Farbname auf semantischer Ebene, Track-Farben als begründete Ausnahme

Figma-Export-Artefakte (Einheiten an einheitenlosen Werten, Float-Präzision, invalides Komma) müssen manuell nachgepflegt werden; dokumentiert als fester Post-Export-Schritt

4. Grenzen der KI-Unterstützung

Kontrastwerte wurden von der KI berechnet; die formell geforderte Prüfung mit dem WebAIM Contrast Checker wird vom Team selbst durchgeführt und dokumentiert

Design-Entscheidungen (Brand-Richtung, Track-Farben-Auswahl, Typografie) liegen beim Team

Der Entwurf des Dokuments wurde inhaltlich geprüft, angepasst und vom Team freigegeben

5. Vereinbarung im Team

Cross-Review vor Abgabe: Teamkollegin prüft Dokument und Token-Datei gegen die Aufgabenstellung.
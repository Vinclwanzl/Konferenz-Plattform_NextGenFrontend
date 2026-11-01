# AI-LOG — Katharina Ramer (Schritt 2)

Tool: Vibe (Mistral AI), Chat-Agent mit GitHub-Zugriff
Arbeitsbereich: Teil B (Session-Übersicht mit Filterung) + Teil D (Speaker-Profilseiten),
ADR-Federführung für Entscheidungspunkt 1 (Session-Übersicht) und 2 (Speaker-Profile)

---

## 2026-10-31

### Eintrag 1

- **Tool:** Vibe (Mistral AI)
- **Prompt (Wortlaut):** „Help me with following assignment (pdf). I have to focus on: Person 1: B (Übersicht + Filter) + D (Speaker-Profile). Here is the current state of the project: https://github.com/Vinclwanzl/Konferenz-Plattform_NextGenFrontend"
- **Zweck:** Ist-Analyse des Repos gegen die Aufgabenstellung (PDF): Welche Teile von B und D fehlen (Tag-/Level-Filter, Speaker-Routen), was existiert schon (useConferenceData, Track-Filter). Ziel war ein Umsetzungsplan in Inkrementen, bevor Code geschrieben wird.

### Eintrag 2

- **Tool:** Vibe (Mistral AI)
- **Prompt (Wortlaut):** „Can you walk me through your solution? I would like to understand it and implement myself. Can you explain me the existing code and collaborate with me to the final solution?"
- **Zweck:** Bewusste Entscheidung, die Lösung nicht als fertigen Code zu übernehmen, sondern die bestehende Architektur (useState, Composables, feature-basierte Struktur aus ADR 02) zu verstehen und die Änderungen selbst zu implementieren.

### Eintrag 3

- **Tool:** Vibe (Mistral AI)
- **Prompt (Wortlaut):** „Can we go through each step together. One increment at the time? So first start with composable"
- **Zweck:** Aufteilung in 8 Inkremente (Composable → FilterBar → Page → SessionCard → Datenlayer → Speaker-Seiten → Prerender-Config → Doku), um jeden Schritt selbst zu bauen und zu prüfen. Inkrement 1: useSessionFilter um Tag und Level erweitern (UND-Verknüpfung).


### Eintrag 4

- **Tool:** Vibe (Mistral AI)
- **Prompt (Wortlaut):** [eigener Code-Stand von useSessionFilter.ts eingefügt] „sanity check"
- **Zweck:** Review meiner eigenen Implementierung von Inkrement 1 vor dem Commit. 

### Eintrag 5

- **Tool:** Vibe (Mistral AI)
- **Prompt (Wortlaut):** [Inhalt von src/components/base/Select.vue eingefügt]
- **Zweck:** Verifizieren, dass die geforderte Optionen-Form ({ label, value }) und das modelValue-/update:modelValue-Muster zur geplanten FilterBar-Erweiterung passen, bevor die zwei neuen Selects eingebaut werden.

### Eintrag 6

- **Tool:** Vibe (Mistral AI)
- **Prompt (Wortlaut):** „How is this done?" (Kontext: Reset-Button in der FilterBar)
- **Zweck:** Verständnis des Emit-Musters (defineEmits + @clear) für den Reset-Button: Die Bar besitzt keinen Filterstate, sie signalisiert nur; das Zurücksetzen passiert über clearFilters() im Composable auf der Seite.


### Eintrag 7

- **Tool:** Vibe (Mistral AI)
- **Prompt (Wortlaut):** [Screenshot einer Fehlermeldung aus localhost hochgeladen]
- **Zweck:** Fehlerdiagnose „At least one `<template>` or `<script>` is required" für speakers/[id].vue — Ursache war die noch leere Datei, nicht das Routing.

### Eintrag 8

- **Tool:** Vibe (Mistral AI)
- **Prompt (Wortlaut):** „is this a new file, placed in speakers folder?"
- **Zweck:** Klären des Nuxt-File-based-Routing (speakers/index.vue + speakers/[id].vue) inklusive der Falle, dass eine flache speakers.vue neben dem Ordner zur Parent-Route würde und das Profil ohne <NuxtPage/> nicht rendern würde.

## 2026-11-01

### Eintrag 9

- **Tool:** Vibe (Mistral AI)
- **Prompt (Wortlaut):** „can you help me write the adr?"
- **Zweck:** Aufbau des Rendering-Strategie-ADRs im geforderten Schema (Kontext → Optionen → Entscheidung → Konsequenzen) verstehen; insbesondere, wie Optionen an tatsächlichen Dateneigenschaften statt an Strohmann-Argumenten abgewogen werden.

export const orderFormContent = {
    de: {

        title: "Auftragsfragebogen",
        subtitle:
            "Jede individuelle Arbeit beginnt mit einer Idee.\n\n" +
            "Bitte beantworte die folgenden Fragen möglichst vollständig und lade bei Bedarf Referenzbilder hoch." +
            "\nSo entsteht ein klares Bild Deiner Vorstellungen.",

        submit: "Anfrage absenden",
        submitting: "Wird gesendet...",
        error: "Deine Anfrage konnte leider nicht übermittelt werden. Bitte versuche es erneut.",

        sections: {
            timeline: {
                title: "Gewünschter Zeitraum",
            },
            colors: {
                title: "Farbvorlieben",
            },
            motif: {
                title: "Motiv & Stil",
            },
            formatAndSize: {
                title: "Format & Größe",
            },
            references: {
                title: "Referenzbilder",
            },
            wishes: {
                title: "Sonstige Wünsche",
            },
            contact: {
                title: "Rückfragen",
            },
        },

        timeline: {
            question: "Wann möchtest Du Dein Kunstwerk erhalten?",

            options: {
                within4Weeks: "Innerhalb der nächsten 4 Wochen",
                within2to3Months: "In den nächsten 2–3 Monaten",
                specificOccasion: "Zu einem bestimmten Anlass",
            },

            occasionLabel: "Anlass / gewünschter Termin",
        },
        colors: {
            question: "Welche Farben sollen im Kunstwerk dominieren?",

            placeholder:
                "Nenne bitte bis zu drei Hauptfarben oder beschreibe eine gewünschte Farbstimmung.",

            avoidLabel: "Gibt es Farben, die Du vermeiden möchtest?",
        },
        motif: {
            interpretationQuestion:
                "Wie stark darf das Motiv künstlerisch interpretiert werden?",

            realistic: "Realistisch",

            abstract: "Abstrakt",

            representationQuestion:
                "Wie soll das Motiv dargestellt werden?",

            representationOptions: {
                full: "Das gesamte Motiv",

                detail: "Ein Ausschnitt oder Detail",

                surprise:
                    "Künstlerische Interpretation (Überrasche mich)",
            },
        },
        formatAndSize: {
            question: "Welches Format bevorzugst Du?",

            options: {
                square: "Quadrat",
                landscape: "Querformat",
                portrait: "Hochformat",
            },

            sizeLabel: "Gewünschte Größe",

            sizeHelper:
                "Bei quadratischen Arbeiten werden häufig 80 × 80 cm verwendet,\nbei rechteckigen Arbeiten 70 × 100 cm.",
        },
        references: {
            title: "Referenzbilder",

            question:
                "Lade hier die Bilder hoch, die als Vorlage dienen sollen.",

            helper:
                "Du kannst bis zu 5 Bilder auswählen.\nUnterstützt werden JPG, PNG und WebP.\nEin Bild darf maximal 5 MB groß sein.",

            button: "Bilder auswählen",

            empty:
                "Noch keine Bilder ausgewählt.",

            errors: {
                invalidType:
                    "Bitte lade nur JPG, PNG oder WebP Bilder hoch.",

                maxSize:
                    "Ein Bild darf maximal {size} MB groß sein.",
            },
        },
        wishes: {
            question:
                "Hast du weitere Wünsche oder Informationen?",

            placeholder:
                "Besondere Details, gewünschte Stimmung, persönliche Bedeutung oder alles, was für die Gestaltung hilfreich sein könnte.",
        },
        contact: {
            question:
                "Falls Rückfragen entstehen oder Details schneller abgestimmt werden sollen, kannst du gerne eine Telefonnummer hinterlassen.",
            phoneLabel:
                "Telefonnummer (optional)",
        },
    },

    en: {

        title: "Order Questionnaire",
        subtitle:
            "Every custom artwork begins with an idea.\n\n" +
            "Please answer the following questions as thoroughly as possible and upload reference images if helpful.\n" +
            "This helps create a clear understanding of your vision.",

        submit: "Submit request",
        submitting: "Sending...",
        error: "Your request could not be submitted. Please try again.",

        sections: {
            timeline: {
                title: "Preferred Timeline",
            },
            colors: {
                title: "Color Preferences",
            },
            motif: {
                title: "Motif & Style",
            },
            formatAndSize: {
                title: "Format & Size",
            },
            references: {
                title: "Reference Images",
            },
            wishes: {
                title: "Additional Wishes",
            },
            contact: {
                title: "Questions",
            },
        },

        timeline: {
            question: "When would you like to receive your artwork?",

            options: {
                within4Weeks: "Within the next 4 weeks",
                within2to3Months: "Within the next 2–3 months",
                specificOccasion: "For a specific occasion",
            },

            occasionLabel: "Occasion / preferred date",
        },
        colors: {
            question: "Which colors should dominate the artwork?",

            placeholder:
                "Please name up to three main colors or describe a general color mood.",

            avoidLabel: "Are there any colors you would like to avoid?",
        },
        motif: {
            interpretationQuestion:
                "How strongly may the motif be artistically interpreted?",

            realistic: "Realistic",

            abstract: "Abstract",

            representationQuestion:
                "How should the motif be represented?",

            representationOptions: {
                full: "The complete motif",

                detail: "A specific detail or section",

                surprise:
                    "Artistic interpretation (Surprise me)",
            },
        },
        formatAndSize: {
            question: "Which format do you prefer?",

            options: {
                square: "Square",
                landscape: "Landscape",
                portrait: "Portrait",
            },

            sizeLabel: "Preferred size",

            sizeHelper:
                "For square artworks, 80 × 80 cm is often used;\nfor rectangular artworks, 70 × 100 cm.",
        },
        references: {
            title: "Reference Images",

            question:
                "Upload the images that should be used as references.",

            helper:
                "You can upload up to 5 reference images.\nJPG, PNG and WebP are supported.\nEach image may be up to 5 MB.",

            button: "Choose images",

            empty:
                "No images selected yet.",

            errors: {
                invalidType:
                    "Please upload JPG, PNG or WebP images only.",

                maxSize:
                    "Each image may be up to {size} MB.",
            },
        },
        wishes: {
            question:
                "Do you have any additional wishes or information?",

            placeholder:
                "Special details, desired mood, personal significance, or anything else that may help with the creative process.",
        },
        contact: {
            question:
                "If any questions arise or details need to be clarified more quickly, you are welcome to leave a phone number.",

            phoneLabel:
                "Phone number (optional)",
        },
    },
};
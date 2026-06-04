export const nav = {
    de: {
        home: "Home",
        about: "Über mich",
        series: "Serien",
        moments: "Momente",
        contact: "Kontakt",
    },
    en: {
        home: "Home",
        about: "About",
        series: "Series",
        moments: "Moments",
        contact: "Contact",
    },
};

export const footerContent = {
    de: {
        imprint: "Impressum",
        privacy: "Datenschutz"
    },
    en: {
        imprint: "Imprint",
        privacy: "Privacy"
    },
};


export const contactForm = {
    de: {
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail",
        message: "Nachricht",
        submit: "Senden",
        sending: "Wird gesendet ...",

        success: {
            general: "Vielen Dank für Deine Nachricht.\nIch melde mich so bald wie möglich.",
            artwork: "Vielen Dank für Deine Nachricht.\nIch melde mich so bald wie möglich.",
            order: "Vielen Dank für Deine Anfrage.\n\n" +
                "Du hast eine E-Mail mit einem Link zum Auftragsfragebogen erhalten.\n\n" +
                "Sobald ich Deinen ausgefüllten Fragebogen erhalten habe, " +
                "nehme ich mir Zeit für Deine Idee und melde mich anschließend mit einem " +
                "unverbindlichen Vorschlag oder einem individuellen und unverbindlichen Angebot bei Dir.",
        },

        successButton: "Zurück zum Kontakt",

        error:
            "Deine Nachricht konnte im Moment nicht gesendet werden. Bitte versuche es in wenigen Minuten erneut.",

        inquiryType: "Art der Anfrage",

        inquiryOptions: {
            general: "Allgemeine Anfrage",
            artwork: "Interesse an einem Werk",
            order: "Unverbindliche Auftragsanfrage",
        },

        orderHint: {
            paragraph1:
                "Individuelle Arbeiten entstehen in enger Abstimmung und basieren auf einer fotografischen Vorlage, die künstlerisch interpretiert wird.",
            paragraph2:
                "Nach dem Absenden erhältst Du per E-Mail einen Link zu einem kurzen Fragebogen, den Du in Ruhe ausfüllen kannst, sobald alle Informationen und Referenzbilder bereitliegen.",
        },
    },

    en: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        message: "Message",
        submit: "Send",
        sending: "Sending ...",

        success: {
            general: "Thank you for your message.\nI will get back to you as soon as possible.",
            artwork: "Thank you for your message.\nI will get back to you as soon as possible.",
            order: "Thank you for your inquiry.\n\n" +
                "You have received an email containing a link to " +
                "the commission questionnaire.\n\n" +
                "Once I have received your completed questionnaire, " +
                "I will take the time to review your ideas and " +
                "get back to you with either a non-binding proposal " +
                "or a personalized, non-binding quote.",
        },

        successButton: "Back to Contact",

        error:
            "Your message could not be sent at the moment. Please try again in a few minutes.",

        inquiryType: "Type of inquiry",

        inquiryOptions: {
            general: "General inquiry",
            artwork: "Interest in an artwork",
            order: "Non-binding order inquiry",
        },

        orderHint: {
            paragraph1:
                "Custom artwork is created in close collaboration and based on a photographic reference that is interpreted artistically.",
            paragraph2:
                "After submitting the form, you will receive an email with a link to a short questionnaire that you can complete whenever all information and reference images are ready.",
        },
    },
};


export const contactFormFieldErrors = {
    de: {
        firstNameError: "Bitte Vornamen eingeben",
        lastNameError: "Bitte Nachnamen eingeben",
        emailError: "Bitte eine gültige E-Mail eingeben",
        messageError: "Bitte eine Nachricht eingeben",
    },
    en: {
        firstNameError: "Please enter your first name",
        lastNameError: "Please enter your last name",
        emailError: "Please enter a valid email address.",
        messageError: "Please enter a message",
    }
};
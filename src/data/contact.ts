/**
 * Hard contact facts that do not change between languages (phone numbers, email,
 * partner URL). Kept out of the translation dictionaries so there is a single
 * source of truth — only the localicity label ("Doha, Qatar") is translated,
 * inside each i18n dictionary's `contact.city`.
 *
 * Only fields explicitly verified by the practice are populated — an unset field
 * renders nothing rather than a placeholder value.
 */
export const contactFacts = {
  address: undefined as string | undefined,
  phones: ["+974 5595 1904", "+974 6667 8241"] as string[],
  email: "soukayna.awdeh@summit-smc.com" as string | undefined,
  hours: undefined as string | undefined,
  mapUrl: undefined as string | undefined,
};

export const COLLABORATION_URL = "https://maniarlaw.com/";

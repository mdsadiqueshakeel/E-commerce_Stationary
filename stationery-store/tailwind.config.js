/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-schemes-color-scheme-1-background":
          "var(--color-schemes-color-scheme-1-background)",
        "color-schemes-color-scheme-2-foreground":
          "var(--color-schemes-color-scheme-2-foreground)",
        "color-schemes-color-scheme-4-foreground":
          "var(--color-schemes-color-scheme-4-foreground)",
        "color-schemes-color-scheme-5-accent":
          "var(--color-schemes-color-scheme-5-accent)",
        "color-schemes-color-scheme-5-border":
          "var(--color-schemes-color-scheme-5-border)",
        "color-schemes-color-scheme-5-foreground":
          "var(--color-schemes-color-scheme-5-foreground)",
        "color-schemes-color-scheme-6-foreground":
          "var(--color-schemes-color-scheme-6-foreground)",
        "color-schemes-color-scheme-7-accent":
          "var(--color-schemes-color-scheme-7-accent)",
        "color-schemes-color-scheme-7-border":
          "var(--color-schemes-color-scheme-7-border)",
        "color-schemes-color-scheme-7-foreground":
          "var(--color-schemes-color-scheme-7-foreground)",
        "primitives-color-azure-radiance":
          "var(--primitives-color-azure-radiance)",
        "primitives-color-azure-radiance-dark":
          "var(--primitives-color-azure-radiance-dark)",
        "primitives-color-azure-radiance-darker":
          "var(--primitives-color-azure-radiance-darker)",
        "primitives-color-azure-radiance-darkest":
          "var(--primitives-color-azure-radiance-darkest)",
        "primitives-color-azure-radiance-light":
          "var(--primitives-color-azure-radiance-light)",
        "primitives-color-azure-radiance-lighter":
          "var(--primitives-color-azure-radiance-lighter)",
        "primitives-color-california": "var(--primitives-color-california)",
        "primitives-color-california-darker":
          "var(--primitives-color-california-darker)",
        "primitives-color-california-darkest":
          "var(--primitives-color-california-darkest)",
        "primitives-color-california-light":
          "var(--primitives-color-california-light)",
        "primitives-color-eucalyptus": "var(--primitives-color-eucalyptus)",
        "primitives-color-eucalyptus-dark":
          "var(--primitives-color-eucalyptus-dark)",
        "primitives-color-eucalyptus-darker":
          "var(--primitives-color-eucalyptus-darker)",
        "primitives-color-eucalyptus-darkest":
          "var(--primitives-color-eucalyptus-darkest)",
        "primitives-color-eucalyptus-light":
          "var(--primitives-color-eucalyptus-light)",
        "primitives-color-eucalyptus-lighter":
          "var(--primitives-color-eucalyptus-lighter)",
        "primitives-color-eucalyptus-lightest":
          "var(--primitives-color-eucalyptus-lightest)",
        "primitives-color-neutral": "var(--primitives-color-neutral)",
        "primitives-color-neutral-dark": "var(--primitives-color-neutral-dark)",
        "primitives-color-neutral-darker":
          "var(--primitives-color-neutral-darker)",
        "primitives-color-neutral-light":
          "var(--primitives-color-neutral-light)",
        "primitives-color-neutral-lighter":
          "var(--primitives-color-neutral-lighter)",
        "primitives-color-sunset-orange":
          "var(--primitives-color-sunset-orange)",
        "primitives-color-sunset-orange-dark":
          "var(--primitives-color-sunset-orange-dark)",
        "primitives-color-sunset-orange-darker":
          "var(--primitives-color-sunset-orange-darker)",
        "primitives-color-sunset-orange-darkest":
          "var(--primitives-color-sunset-orange-darkest)",
        "primitives-color-sunset-orange-light":
          "var(--primitives-color-sunset-orange-light)",
        "primitives-color-sunset-orange-lightest":
          "var(--primitives-color-sunset-orange-lightest)",
        "primitives-opacity-neutral-darkest-10":
          "var(--primitives-opacity-neutral-darkest-10)",
        "primitives-opacity-neutral-darkest-20":
          "var(--primitives-opacity-neutral-darkest-20)",
        "primitives-opacity-neutral-darkest-30":
          "var(--primitives-opacity-neutral-darkest-30)",
        "primitives-opacity-neutral-darkest-40":
          "var(--primitives-opacity-neutral-darkest-40)",
        "primitives-opacity-neutral-darkest-5":
          "var(--primitives-opacity-neutral-darkest-5)",
        "primitives-opacity-neutral-darkest-50":
          "var(--primitives-opacity-neutral-darkest-50)",
        "primitives-opacity-neutral-darkest-60":
          "var(--primitives-opacity-neutral-darkest-60)",
        "primitives-opacity-transparent":
          "var(--primitives-opacity-transparent)",
        "primitives-opacity-white-10": "var(--primitives-opacity-white-10)",
        "primitives-opacity-white-15": "var(--primitives-opacity-white-15)",
        "primitives-opacity-white-30": "var(--primitives-opacity-white-30)",
        "primitives-opacity-white-40": "var(--primitives-opacity-white-40)",
        "primitives-opacity-white-5": "var(--primitives-opacity-white-5)",
        "primitives-opacity-white-50": "var(--primitives-opacity-white-50)",
        "primitives-opacity-white-60": "var(--primitives-opacity-white-60)",
      },
      fontFamily: {
        "heading-h1": "var(--heading-h1-font-family)",
        "heading-h2": "var(--heading-h2-font-family)",
        "heading-h3": "var(--heading-h3-font-family)",
        "heading-h4": "var(--heading-h4-font-family)",
        "heading-h5": "var(--heading-h5-font-family)",
        "heading-h6": "var(--heading-h6-font-family)",
        "heading-tagline": "var(--heading-tagline-font-family)",
        "text-large-bold": "var(--text-large-bold-font-family)",
        "text-large-extra-bold": "var(--text-large-extra-bold-font-family)",
        "text-large-light": "var(--text-large-light-font-family)",
        "text-large-link": "var(--text-large-link-font-family)",
        "text-large-medium": "var(--text-large-medium-font-family)",
        "text-large-normal": "var(--text-large-normal-font-family)",
        "text-large-semi-bold": "var(--text-large-semi-bold-font-family)",
        "text-medium-bold": "var(--text-medium-bold-font-family)",
        "text-medium-extra-bold": "var(--text-medium-extra-bold-font-family)",
        "text-medium-light": "var(--text-medium-light-font-family)",
        "text-medium-link": "var(--text-medium-link-font-family)",
        "text-medium-medium": "var(--text-medium-medium-font-family)",
        "text-medium-normal": "var(--text-medium-normal-font-family)",
        "text-medium-semi-bold": "var(--text-medium-semi-bold-font-family)",
        "text-regular-bold": "var(--text-regular-bold-font-family)",
        "text-regular-extra-bold": "var(--text-regular-extra-bold-font-family)",
        "text-regular-light": "var(--text-regular-light-font-family)",
        "text-regular-link": "var(--text-regular-link-font-family)",
        "text-regular-medium": "var(--text-regular-medium-font-family)",
        "text-regular-normal": "var(--text-regular-normal-font-family)",
        "text-regular-semi-bold": "var(--text-regular-semi-bold-font-family)",
        "text-small-bold": "var(--text-small-bold-font-family)",
        "text-small-extra-bold": "var(--text-small-extra-bold-font-family)",
        "text-small-light": "var(--text-small-light-font-family)",
        "text-small-link": "var(--text-small-link-font-family)",
        "text-small-medium": "var(--text-small-medium-font-family)",
        "text-small-normal": "var(--text-small-normal-font-family)",
        "text-small-semi-bold": "var(--text-small-semi-bold-font-family)",
        "text-tiny-bold": "var(--text-tiny-bold-font-family)",
        "text-tiny-extra-bold": "var(--text-tiny-extra-bold-font-family)",
        "text-tiny-light": "var(--text-tiny-light-font-family)",
        "text-tiny-link": "var(--text-tiny-link-font-family)",
        "text-tiny-medium": "var(--text-tiny-medium-font-family)",
        "text-tiny-normal": "var(--text-tiny-normal-font-family)",
        "text-tiny-semi-bold": "var(--text-tiny-semi-bold-font-family)",
      },
      boxShadow: {
        large: "var(--large)",
        medium: "var(--medium)",
        small: "var(--small)",
        xlarge: "var(--xlarge)",
        xsmall: "var(--xsmall)",
        xxlarge: "var(--xxlarge)",
        xxsmall: "var(--xxsmall)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

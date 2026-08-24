export const AREA_OF_INTEREST_OPTIONS = [
  "Innovate Healthcare",
  "Transform Finance",
  "Revolutionize Education",
  "Enhance Retail",
  "Optimize Manufacturing",
  "Modernize Transportation",
  "Improve Agriculture",
  "Advance Energy",
] as const;

export type AreaOfInterestOption = (typeof AREA_OF_INTEREST_OPTIONS)[number];

export const getAreaOfInterestDropdownOptions = () => {
  return AREA_OF_INTEREST_OPTIONS.map((option) => ({
    value: option.toLowerCase().replace(/\s+/g, "-"),
    label: option,
  }));
};

export const CONTACT_AREA_OF_INTEREST_OPTIONS = [
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'technology', label: 'Technology' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
];


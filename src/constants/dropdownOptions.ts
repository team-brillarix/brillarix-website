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

// Helper function to convert options array to dropdown format
export const getAreaOfInterestDropdownOptions = () => {
  return AREA_OF_INTEREST_OPTIONS.map((option) => ({
    value: option.toLowerCase().replace(/\s+/g, "-"),
    label: option,
  }));
};


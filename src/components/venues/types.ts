export type VenueFilters = {
  location: string[];
  eventTypes: string[];
};

export type Venue = {
  id: string;
  name: string;
  location: string;
  eventTypes: string[];
  capacity: number;
  imageUrl: string;
  description: string;
  amenities: string[];
  host?: {
    name: string;
    email: string;
    phone: string;
  };
};
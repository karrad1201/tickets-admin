export interface OrgApplication {
  id: string;
  applicantUserId: string;
  organizationName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

export interface VenueApplication {
  id: string;
  organizationId: string;
  applicantUserId: string;
  name: string;
  cityLabel: string;
  subjectLabel: string;
  address: string;
  description?: string;
  documentUrls: string[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  venueId?: string;
}

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
}

export interface OrgMember {
  id: string;
  organizationId: string;
  userId: string;
  role: "OWNER" | "MANAGER" | "STAFF";
  venueId?: string;
}

export interface Venue {
  id: string;
  label: string;
  address?: string;
  organizationId?: string;
}

export interface Event {
  id: string;
  label: string;
  description: string;
  venueId: string;
  categoryId: string;
  time: string;
  organizationId?: string;
  salesClosedAt?: string;
  imageUrl?: string;
  minPrice?: number;
  ageRating?: string;
  hasSeatMap: boolean;
}

export interface Category {
  id: string;
  code: string;
  label: string;
}

export interface User {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
  role: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

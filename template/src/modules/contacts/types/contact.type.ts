export interface IContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: Date;
  status?: 'active' | 'inactive' | 'away';
}

export interface IContactGroup {
  id: string;
  name: string;
  contacts: IContact[];
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactSearchResult {
  contacts: IContact[];
  total: number;
  hasMore: boolean;
}

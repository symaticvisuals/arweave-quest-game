export interface ShareData {
  initialShares: Record<string, number>; // Mapping user addresses to their respective share percentages
  // You can add more fields related to share management if necessary
}

export interface Asset {
  file: File;
  title: string;
  description: string;
  license: string; // License type
  payment: string; // Payment details
  tags: Tag[]; // Tags for categorizing or describing the asset
  creatorName: string; // Name of the creator
  creatorId: string; // ID of the creator
  shareData: ShareData; // Data related to share distribution
}
interface Tag {
  name?: string;
  value: string;
}

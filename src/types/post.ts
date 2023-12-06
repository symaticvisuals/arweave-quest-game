export interface ShareData {
  initialShares: Record<string, number>; // Mapping user addresses to their respective share percentages
  totalShares: number; // Total number of shares
  sharesSold: number; // Total number of shares sold
  sharesRemaining: number; // Total number of shares remaining
}

export interface Asset {
  file: File;
  title: string;
  description: string;
  license: string; // License type
  tags: Tag[]; // Tags for categorizing or describing the asset
  creatorId: string; // ID of the creator wallet address
  shareData: ShareData; // Data related to share distribution
}
interface Tag {
  name?: string;
  value: string;
}

export interface BranchItem {
  id: string;
  city: 'Katihar' | 'Jaipur' | 'Udaipur' | 'New Delhi' | 'Mumbai' | 'Goa';
  branchName: string;
  type: 'Headquarters Atelier' | 'Regional Executive Office' | 'Destination Concierge Hub';
  managerName: string;
  phone: string;
  email: string;
  address: string;
  activeWeddingsCount: number;
  ytdRevenueInr: number;
  leadPipelineCount: number;
  teamSize: number;
  flagshipVenues: string[];
}

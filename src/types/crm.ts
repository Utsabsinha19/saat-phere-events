export type MessageSequenceType =
  | 'Instant Digital Brochure Welcome'
  | 'Consultation Slot Confirmation'
  | '3D Decor Moodboard Signoff Alert'
  | 'Payment Milestone Escrow Reminder'
  | 'Guest RSVP Countdown Sync';

export interface WhatsAppLogItem {
  id: string;
  leadId: string;
  recipientName: string;
  phone: string;
  sequenceType: MessageSequenceType;
  status: 'Delivered & Read' | 'Delivered' | 'Queued' | 'Failed';
  timestamp: string;
  contentSnippet: string;
  triggerSource: 'Automated Event Trigger' | 'Executive Manual Dispatch';
}

export interface CrmCampaignStats {
  totalDispatches: number;
  deliveryRate: string;
  readRate: string;
  responseRate: string;
  activeFollowUps: number;
}

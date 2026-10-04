import { WhatsAppLogItem, CrmCampaignStats } from '@/types/crm';

export const INITIAL_WHATSAPP_LOGS: WhatsAppLogItem[] = [
  {
    id: 'wa-msg-901',
    leadId: 'lead-1004',
    recipientName: 'Shreya Mittal & Aryan Jindal',
    phone: '+91 99200 44332',
    sequenceType: 'Instant Digital Brochure Welcome',
    status: 'Delivered & Read',
    timestamp: '2026-09-28T18:22:15.000Z',
    contentSnippet:
      'Namaste Shreya ji! Thank you for inquiring with Saat Phere Events. Here is your private link to our 2026 Royal Wedding Lookbook and Palace Availability Guide.',
    triggerSource: 'Automated Event Trigger',
  },
  {
    id: 'wa-msg-902',
    leadId: 'lead-1003',
    recipientName: 'Vikram Malhotra',
    phone: '+91 97690 55443',
    sequenceType: 'Consultation Slot Confirmation',
    status: 'Delivered & Read',
    timestamp: '2026-09-27T08:15:00.000Z',
    contentSnippet:
      'Hello Vikram ji, your design deck review consultation with Senior Director Vikramaditya Rathore is confirmed for Thursday at 4:00 PM IST.',
    triggerSource: 'Automated Event Trigger',
  },
  {
    id: 'wa-msg-903',
    leadId: 'lead-1001',
    recipientName: 'Ananya & Siddharth Singhania',
    phone: '+91 98201 12345',
    sequenceType: '3D Decor Moodboard Signoff Alert',
    status: 'Delivered & Read',
    timestamp: '2026-09-26T14:10:00.000Z',
    contentSnippet:
      'Dear Ananya & Siddharth, your updated 3D Lakeside Lotus Mandap render is ready for your review. Please sign off on flower density.',
    triggerSource: 'Executive Manual Dispatch',
  },
  {
    id: 'wa-msg-904',
    leadId: 'lead-1001',
    recipientName: 'Ananya & Siddharth Singhania',
    phone: '+91 98201 12345',
    sequenceType: 'Payment Milestone Escrow Reminder',
    status: 'Delivered',
    timestamp: '2026-09-28T10:00:00.000Z',
    contentSnippet:
      'Production Update: Stage 2 load-in milestone escrow has been initiated with Acoustic Symphony & Light Systems. GST Invoice #SPE-INV-2026-8812 is available upon request.',
    triggerSource: 'Automated Event Trigger',
  },
];

export const INITIAL_CRM_STATS: CrmCampaignStats = {
  totalDispatches: 1840,
  deliveryRate: '99.4%',
  readRate: '94.2%',
  responseRate: '68.5%',
  activeFollowUps: 14,
};

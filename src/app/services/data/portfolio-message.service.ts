// src/app/services/portfolio-messages.service.ts
import { Injectable } from '@angular/core';
import { FirestoreWrapper } from './firestore.service';
import { ContactFormValue } from '../form/contact-form.service';

/**
 * A single message stored in `portfolioMessages`.
 */
export interface PortfolioMessage extends ContactFormValue {
  id: string;
  sentAt: Date;
  acknowledged: false;
}

@Injectable({ providedIn: 'root' })
export class PortfolioMessagesService {
  private readonly COLLECTION = 'portfolioMessages';

  /**
   * @param wrapper Thin Firestore helper for adds/queries
   */
  constructor(private readonly wrapper: FirestoreWrapper) {}

  /**
   * Sends (writes) a new contact‐form message to Firestore.
   *
   * @param payload The data from your ContactFormService
   * @returns Promise resolving to the new document's ID
   */
  async sendMessage(payload: ContactFormValue): Promise<string> {
    const docData = {
      ...payload,
      sentAt: new Date(),
    };
    return this.wrapper.addDocument(this.COLLECTION, docData);
  }
}

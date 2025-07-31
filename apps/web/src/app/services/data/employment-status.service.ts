// src/app/services/employment-status.service.ts
import { Injectable } from '@angular/core';
import { FirestoreWrapper } from './firestore.service';

/**
 * The shape of a single employment-status document.
 */
export interface EmploymentStatus {
  /** Firestore document ID */
  id: string;
  /** Whether this is the “current” / active status */
  active: boolean;
  /** Your location at the time */
  location: string;
  /** Your job title at the time */
  title: string;
}

@Injectable({ providedIn: 'root' })
export class EmploymentStatusService {
  private readonly COLLECTION = 'employmentStatus';

  /**
   * @param wrapper A thin layer around Firestore for querying collections
   */
  constructor(private readonly wrapper: FirestoreWrapper) {}

  /**
   * Fetches all documents in `employmentStatus` where `active == true`,
   * logs a warning if more than one is found, and returns the first one.
   *
   * @returns A promise resolving to the first active status, or `undefined` if none exist.
   */
  async getFirstActiveStatus(): Promise<EmploymentStatus | undefined> {
    // fetch all active statuses
    const statuses = await this.wrapper.getByFieldEquals<
      Omit<EmploymentStatus, 'id'>
    >(this.COLLECTION, 'active', '==', true);

    if (statuses.length > 1) {
      // extract ids for the warning
      const ids = statuses.map(s => s.id).join(', ');
      console.warn(
        `Multiple active statuses found (${statuses.length}): ${ids}`
      );
    }

    // return the first (or undefined if array is empty)
    return statuses[0];
  }
}

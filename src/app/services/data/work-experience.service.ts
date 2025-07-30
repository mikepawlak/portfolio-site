// src/app/services/work-experience.service.ts
import { Injectable } from '@angular/core';
import { FirestoreWrapper } from './firestore.service';
import { Timestamp } from 'firebase/firestore';

/**
 * The shape of a single work-experience document.
 */
export interface WorkExperience {
  /** Firestore document ID */
  id: string;
  /** Company or organization name */
  company: string;
  /** Your job title */
  title: string;
  /** Location */
  location: string;
  /** A brief description of responsibilities or achievements */
  description: string;
  /** Start date as ts */
  startDate: Timestamp;
  /** End date as ts */
  endDate: Timestamp;
  /** Technologies used for skill pills */
  skills: string[];
  /** highlights */
  highlights: string[];
}

@Injectable({ providedIn: 'root' })
export class WorkExperienceService {
  private readonly COLLECTION = 'workExperiences';

  /**
   * @param wrapper A thin layer around Firestore for querying collections
   */
  constructor(private readonly wrapper: FirestoreWrapper) {}

  /**
   * Fetches all documents in the `workExperiences` collection.
   *
   * @returns A promise resolving to an array of work experience documents.
   */
  async getAllExperiences(): Promise<WorkExperience[]> {
    return await this.wrapper.getOrderedDocuments<WorkExperience>(
      this.COLLECTION,
      'startDate',
      'desc'
    );
  }
}

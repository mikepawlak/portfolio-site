// https://github.com/angular/angularfire/discussions/18
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  CollectionReference,
  QueryConstraint,
  QuerySnapshot,
  DocumentData,
  orderBy,
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreWrapper {
  private firestore = inject(Firestore);

  async getByFieldEquals<D>(
    path: string,
    field: string,
    op: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains',
    value: unknown
    // eslint-disable-next-line @typescript-eslint/array-type
  ): Promise<Array<D & { id: string }>> {
    const col: CollectionReference<DocumentData> = collection(
      this.firestore,
      path
    );
    const q = query(col, where(field, op, value) as QueryConstraint);
    const snap: QuerySnapshot<DocumentData> = await getDocs(q);
    return snap.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as D),
    }));
  }

  /**
   * Add a new document to the given collection.
   *
   * @param path The Firestore collection path (e.g. 'portfolioMessages')
   * @param data An object of type D to store
   * @returns The newly created document's ID
   */
  async addDocument<D>(path: string, data: D): Promise<string> {
    const col: CollectionReference<DocumentData> = collection(
      this.firestore,
      path
    );
    const ref = await addDoc(col, data as DocumentData);
    return ref.id;
  }

  /**
   * Fetch all documents from a Firestore collection.
   *
   * @param path The Firestore collection path (e.g. 'workExperiences')
   * @returns A promise resolving to an array of documents with their IDs.
   */
  async getAllDocuments<D>(path: string): Promise<(D & { id: string })[]> {
    const col: CollectionReference<DocumentData> = collection(
      this.firestore,
      path
    );
    const snap: QuerySnapshot<DocumentData> = await getDocs(col);
    return snap.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as D),
    }));
  }

  /**
   * Fetch all documents in a collection ordered by a field.
   *
   * @param path Firestore collection path
   * @param field Field name to order by
   * @param direction 'asc' or 'desc'
   */
  async getOrderedDocuments<D>(
    path: string,
    field: string,
    direction: 'asc' | 'desc'
  ): Promise<(D & { id: string })[]> {
    const colRef = collection(this.firestore, path);
    const q = query(colRef, orderBy(field, direction));
    const snap = await getDocs(q);
    return snap.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as D),
    }));
  }
}

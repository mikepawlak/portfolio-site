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
} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreWrapper {
  /** Pull Firestore out of the injector with the new `inject()` helper */
  private firestore = inject(Firestore);

  /**
   * Same JSDoc as above...
   */
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
}

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
}

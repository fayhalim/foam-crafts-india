import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function main() {
  const docRef = doc(db, 'settings', 'site');
  await updateDoc(docRef, {
    brandName: 'Foam Crafts India'
  });
  console.log('Restored brandName to Foam Crafts India');
}

main().catch(console.error);

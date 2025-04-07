import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {
  
  constructor(private auth: Auth, private firestore: Firestore) { }

  // Método  para registrar usuario
  async register({ email, password, displayName }: any) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      const usersCollection = collection(this.firestore, 'users');
      await addDoc(usersCollection, {
        uid: user.uid,
        email: user.email,
        displayName: displayName || "Usuario",
        createdAt: new Date()
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  //método 'registerUser' con 'fullName'
  async registerUser(fullName: string, email: string, password: string) {
    try {
      // Crear usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      // Guardar usuario en Firestore
      const usersCollection = collection(this.firestore, 'users');
      await addDoc(usersCollection, {
        uid: user.uid,
        fullName,
        email,
        createdAt: new Date()
      });

      return { success: true, user };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return { success: false };
    }
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}

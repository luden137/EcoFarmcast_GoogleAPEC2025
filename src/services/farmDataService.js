import { firestore } from './firebase';
import { 
  collection, doc, addDoc, getDoc, updateDoc, 
  deleteDoc, query, where, getDocs, serverTimestamp 
} from 'firebase/firestore';

/**
 * Save basic information about a farm
 * @param {string} userId - The user ID who owns this farm data
 * @param {Object} formData - The farm basic information data
 * @returns {Promise<string>} - The ID of the created document
 */
export const saveFarmBasicInfo = async (userId, formData) => {
  try {
    // Reference to the user's farms collection
    const userFarmsRef = collection(firestore, 'users', userId, 'farms');
    
    // Prepare data with timestamps
    const farmData = {
      ...formData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Add the document to Firestore
    const docRef = await addDoc(userFarmsRef, farmData);
    
    return docRef.id;
  } catch (error) {
    console.error('Error saving farm basic info:', error);
    throw error;
  }
};

/**
 * Get basic information about a farm
 * @param {string} userId - The user ID who owns this farm data
 * @param {string} farmId - The farm ID to retrieve
 * @returns {Promise<Object|null>} - The farm data or null if not found
 */
export const getFarmBasicInfo = async (userId, farmId) => {
  try {
    // Reference to the specific farm document
    const farmDocRef = doc(firestore, 'users', userId, 'farms', farmId);
    
    // Get the document
    const farmDoc = await getDoc(farmDocRef);
    
    if (farmDoc.exists()) {
      return { id: farmDoc.id, ...farmDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting farm basic info:', error);
    throw error;
  }
};

/**
 * Get all farms for a user
 * @param {string} userId - The user ID who owns the farms
 * @returns {Promise<Array>} - Array of farm data objects
 */
export const getAllFarms = async (userId) => {
  try {
    // Reference to the user's farms collection
    const userFarmsRef = collection(firestore, 'users', userId, 'farms');
    
    // Get all documents in the collection
    const querySnapshot = await getDocs(userFarmsRef);
    
    // Map the documents to an array of farm data objects
    const farms = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return farms;
  } catch (error) {
    console.error('Error getting all farms:', error);
    throw error;
  }
};

/**
 * Update basic information about a farm
 * @param {string} userId - The user ID who owns this farm data
 * @param {string} farmId - The farm ID to update
 * @param {Object} formData - The updated farm basic information data
 * @returns {Promise<void>}
 */
export const updateFarmBasicInfo = async (userId, farmId, formData) => {
  try {
    // Reference to the specific farm document
    const farmDocRef = doc(firestore, 'users', userId, 'farms', farmId);
    
    // Prepare data with updated timestamp
    const updatedData = {
      ...formData,
      updatedAt: serverTimestamp()
    };
    
    // Update the document in Firestore
    await updateDoc(farmDocRef, updatedData);
  } catch (error) {
    console.error('Error updating farm basic info:', error);
    throw error;
  }
};

/**
 * Delete a farm
 * @param {string} userId - The user ID who owns this farm data
 * @param {string} farmId - The farm ID to delete
 * @returns {Promise<void>}
 */
export const deleteFarm = async (userId, farmId) => {
  try {
    // Reference to the specific farm document
    const farmDocRef = doc(firestore, 'users', userId, 'farms', farmId);
    
    // Delete the document from Firestore
    await deleteDoc(farmDocRef);
  } catch (error) {
    console.error('Error deleting farm:', error);
    throw error;
  }
};

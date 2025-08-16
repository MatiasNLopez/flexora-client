import { useState } from 'react';
import { userService, CreateUserData, UpdateUserData } from '../services/userService';
import { User } from '../models/user';

interface UseUserActionsReturn {
  // Estados de carga
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  
  // Estados de error
  createError: string | null;
  updateError: string | null;
  deleteError: string | null;
  
  // Funciones de acción
  createUser: (userData: CreateUserData) => Promise<User | null>;
  updateUser: (id: number, userData: UpdateUserData) => Promise<User | null>;
  deleteUser: (id: number) => Promise<boolean>;
  
  // Funciones para limpiar errores
  clearCreateError: () => void;
  clearUpdateError: () => void;
  clearDeleteError: () => void;
}

export function useUserActions(): UseUserActionsReturn {
  // Estados de carga
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Estados de error
  const [createError, setCreateError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Función para crear usuario
  const createUser = async (userData: CreateUserData): Promise<User | null> => {
    setIsCreating(true);
    setCreateError(null);
    
    try {
      const newUser = await userService.createUser(userData);
      return newUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al crear usuario';
      setCreateError(errorMessage);
      return null;
    } finally {
      setIsCreating(false);
    }
  };

  // Función para actualizar usuario
  const updateUser = async (id: number, userData: UpdateUserData): Promise<User | null> => {
    setIsUpdating(true);
    setUpdateError(null);
    
    try {
      const updatedUser = await userService.updateUser(id, userData);
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al actualizar usuario';
      setUpdateError(errorMessage);
      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  // Función para eliminar usuario
  const deleteUser = async (id: number): Promise<boolean> => {
    setIsDeleting(true);
    setDeleteError(null);
    
    try {
      await userService.deleteUser(id);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al eliminar usuario';
      setDeleteError(errorMessage);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  // Funciones para limpiar errores
  const clearCreateError = () => setCreateError(null);
  const clearUpdateError = () => setUpdateError(null);
  const clearDeleteError = () => setDeleteError(null);

  return {
    // Estados de carga
    isCreating,
    isUpdating,
    isDeleting,
    
    // Estados de error
    createError,
    updateError,
    deleteError,
    
    // Funciones de acción
    createUser,
    updateUser,
    deleteUser,
    
    // Funciones para limpiar errores
    clearCreateError,
    clearUpdateError,
    clearDeleteError,
  };
}

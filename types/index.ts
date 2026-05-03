import { Timestamp } from 'firebase/firestore';
import { ReactNode } from 'react';

export interface ChildProps {
  children: ReactNode;
}

export interface IFolder {
  id: string;
  name: string;
  uid: string;
  timestamp: Timestamp;
  isStar: boolean;
  isTrash: boolean;
  parentFolder: string;
}

export interface IFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uid: string;
  parentFolder: string;
  fileUrl: string;
  isStar: boolean;
  isTrash: boolean;
  timestamp: Timestamp;
}

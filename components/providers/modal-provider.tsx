'use client';

import React from 'react';
import FolderModal from '../modals/folder-modal';
import UploadModal from '../modals/upload-modal';
import RenameModal from '../modals/rename-modal';

const ModalProvider = () => {
  return (
    <>
      <FolderModal />
      <UploadModal />
      <RenameModal />
    </>
  );
};

export default ModalProvider;

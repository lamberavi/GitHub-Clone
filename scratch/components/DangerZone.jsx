import React, { useState } from 'react';
import Button from './common/Button';
import DeleteRepositoryModal from './DeleteRepositoryModal';

export default function DangerZone({ repo, onDeleteSuccess, disabled }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="border border-[#F85149]/30 rounded-xl overflow-hidden mt-6">
      <div className="bg-[#F85149]/5 p-4 border-b border-[#F85149]/20">
        <h4 className="text-sm font-black text-[#F85149] uppercase tracking-wider">Danger Zone</h4>
      </div>
      <div className="p-4 bg-[#161b22] space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="space-y-0.5">
            <div className="text-xs font-black text-[#e6edf3]">Delete this repository</div>
            <div className="text-[10px] text-[#8b949e] font-bold leading-normal">
              Once you delete a repository, there is no going back. Please be certain.
            </div>
          </div>
          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={disabled}
            className="font-bold text-xs"
          >
            Delete Repository
          </Button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteRepositoryModal
          repo={repo}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDeleteSuccess={onDeleteSuccess}
        />
      )}
    </div>
  );
}

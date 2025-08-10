"use client";

import SidebarMenu from "@/components/SidebarMenu";

export default function SidebarExamplePage() {
  return (
    <div className="min-h-screen">
      <SidebarMenu />
      {/* Contenido de ejemplo */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50">Box</div>
            <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50">Box</div>
            <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50">Box</div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50">Large</div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">A</div>
            <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">B</div>
            <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">C</div>
            <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">D</div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50">Large</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">E</div>
            <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">F</div>
            <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">G</div>
            <div className="flex items-center justify-center rounded-sm bg-gray-50 h-28">H</div>
          </div>
        </div>
      </div>
    </div>
  );
}